// components/ClosingCTA.js
import Button from './Button';
import { safeTrack } from '../lib/analytics';
import { CTA_ACTIONS } from '../lib/cta';

export default function ClosingCTA() {
  const { contact, linkedin } = CTA_ACTIONS;

  return (
    <section className="max-w-2xl border-t border-border pt-8">
      <p className="font-display font-semibold text-lg text-text mb-1">
        Have a technical problem — AI or otherwise — that needs a second pair of eyes?
      </p>
      <p className="text-muted text-sm mb-4">Let&apos;s talk.</p>
      <div className="flex flex-wrap gap-3 text-sm">
        <Button href={contact.href} onClick={() => safeTrack(contact.event, { channel: 'contact' })}>
          {contact.label}
        </Button>
        <Button
          href={linkedin.href}
          external
          variant="secondary"
          onClick={() => safeTrack(linkedin.event, { channel: 'linkedin' })}
        >
          {linkedin.label}
        </Button>
      </div>
    </section>
  );
}
