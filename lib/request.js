// lib/request.js
//
// Validation + rate limiting for the contact/résumé request form, kept as
// plain data/functions (no Next.js imports) so it's testable with Node's
// built-in test runner. The API route in pages/api/request.js wires this to
// the actual email delivery.
'use strict';

const REQUEST_TYPES = ['resume', 'role'];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_MESSAGE_LENGTH = 1000;

// Returns { ok: true, value } or { ok: false, error }. A filled honeypot
// field ("website") is reported as ok:false with spam:true so the caller can
// pretend success without sending anything.
function validateRequest(body) {
  const input = body && typeof body === 'object' ? body : {};
  if (typeof input.website === 'string' && input.website.trim() !== '') {
    return { ok: false, spam: true, error: 'Rejected' };
  }
  const type = REQUEST_TYPES.includes(input.type) ? input.type : 'resume';
  const email = typeof input.email === 'string' ? input.email.trim() : '';
  if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    return { ok: false, error: 'Please enter a valid email address.' };
  }
  const name = typeof input.name === 'string' ? input.name.trim().slice(0, 100) : '';
  const message = typeof input.message === 'string' ? input.message.trim().slice(0, MAX_MESSAGE_LENGTH) : '';
  return { ok: true, value: { type, email, name, message } };
}

// Best-effort per-instance limiter (serverless instances don't share memory,
// so this only blunts casual abuse; the honeypot + validation do the rest).
function createRateLimiter({ max = 5, windowMs = 10 * 60 * 1000, now = Date.now } = {}) {
  const hits = new Map();
  return function allow(key) {
    const t = now();
    const recent = (hits.get(key) || []).filter(ts => t - ts < windowMs);
    if (recent.length >= max) {
      hits.set(key, recent);
      return false;
    }
    recent.push(t);
    hits.set(key, recent);
    return true;
  };
}

module.exports = { REQUEST_TYPES, EMAIL_PATTERN, validateRequest, createRateLimiter };
