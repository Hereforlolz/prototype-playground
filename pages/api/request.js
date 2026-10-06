// pages/api/request.js
//
// Receives contact / résumé requests and forwards them to the owner's inbox
// via Resend. The owner's address (NOTIFY_EMAIL) and API key only ever exist
// as server-side env vars, so nothing personal ships in the page or repo.
// Requester's address is set as reply-to so a plain reply reaches them.
import { validateRequest, createRateLimiter } from '../../lib/request';

const allow = createRateLimiter();

const SUBJECTS = {
  resume: 'Résumé request',
  role: 'Role opportunity',
};

function escapeHtml(text) {
  return text.replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const result = validateRequest(req.body);
  if (!result.ok) {
    // Bots get a fake success so they don't learn the honeypot.
    if (result.spam) return res.status(200).json({ ok: true });
    return res.status(400).json({ error: result.error });
  }

  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket?.remoteAddress || 'unknown';
  if (!allow(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  const { RESEND_API_KEY, NOTIFY_EMAIL, RESEND_FROM } = process.env;
  if (!RESEND_API_KEY || !NOTIFY_EMAIL) {
    console.error('Request form is not configured: set RESEND_API_KEY and NOTIFY_EMAIL.');
    return res.status(503).json({ error: 'This form is temporarily unavailable. Please reach out via LinkedIn.' });
  }

  const { type, email, name, message } = result.value;
  const lines = [
    `Type: ${type}`,
    `From: ${name || '(no name given)'} <${email}>`,
    message ? `\nMessage:\n${message}` : '',
  ].join('\n');

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: RESEND_FROM || 'Portfolio <onboarding@resend.dev>',
        to: [NOTIFY_EMAIL],
        reply_to: email,
        subject: `${SUBJECTS[type]} — ${email}`,
        text: lines,
        html: `<pre style="font-family:inherit;white-space:pre-wrap">${escapeHtml(lines)}</pre>`,
      }),
    });
    if (!response.ok) {
      console.error('Resend rejected request:', response.status, await response.text());
      return res.status(502).json({ error: 'Could not send your request. Please try again later.' });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Request form send failed:', err);
    return res.status(502).json({ error: 'Could not send your request. Please try again later.' });
  }
}
