// 📁 /pages/contact.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import SeoHead from '../components/SeoHead';
import { safeTrack } from '../lib/analytics';

const COPY = {
  resume: {
    heading: 'Request my résumé',
    intro: 'Leave your email and I’ll send my résumé over personally. I keep it off the public site to protect my contact details.',
    button: 'Request résumé',
    event: 'resume_request',
  },
  role: {
    heading: 'Discuss a role',
    intro: 'Tell me a bit about the role or problem and where to reach you. I’ll reply from my own inbox.',
    button: 'Send message',
    event: 'role_request',
  },
};

export default function Contact() {
  const { query } = useRouter();
  const type = query.type === 'role' ? 'role' : 'resume';
  const copy = COPY[type];

  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState('');

  async function onSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setStatus('sending');
    setError('');
    try {
      const response = await fetch('/api/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          email: form.get('email'),
          name: form.get('name'),
          message: form.get('message'),
          website: form.get('website'),
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || 'Something went wrong.');
      safeTrack(copy.event, { source: 'contact_page' });
      setStatus('sent');
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  }

  const fieldClass =
    'w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent';

  return (
    <Layout>
      <SeoHead
        title="Contact — Nidhi Vedartham"
        description="Request Nidhi's résumé or start a conversation about a role."
        path="/contact"
      />
      <div className="max-w-xl">
        <h1 className="font-display [text-wrap:balance] text-2xl sm:text-3xl font-bold text-text mb-3">
          {copy.heading}
        </h1>
        <p className="text-muted text-sm mb-6">{copy.intro}</p>

        {status === 'sent' ? (
          <p role="status" className="text-text font-medium">
            Thanks — your request is in. I’ll be in touch soon.
          </p>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text mb-1">
                Your email
              </label>
              <input id="email" name="email" type="email" required autoComplete="email" className={fieldClass} />
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-text mb-1">
                Name <span className="text-muted font-normal">(optional)</span>
              </label>
              <input id="name" name="name" type="text" autoComplete="name" maxLength={100} className={fieldClass} />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-text mb-1">
                Message <span className="text-muted font-normal">(optional)</span>
              </label>
              <textarea id="message" name="message" rows={4} maxLength={1000} className={fieldClass} />
            </div>
            {/* Honeypot: hidden from people, tempting to bots. */}
            <div aria-hidden="true" className="hidden">
              <label htmlFor="website">Website</label>
              <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>
            <button
              type="submit"
              disabled={status === 'sending'}
              className="font-display font-semibold bg-accent text-surface px-4 py-2 rounded-md hover:opacity-90 transition-opacity duration-150 disabled:opacity-60"
            >
              {status === 'sending' ? 'Sending…' : copy.button}
            </button>
            {status === 'error' && (
              <p role="alert" className="text-sm text-red-600">
                {error}
              </p>
            )}
          </form>
        )}
      </div>
    </Layout>
  );
}
