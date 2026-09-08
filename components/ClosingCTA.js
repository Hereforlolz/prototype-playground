// components/ClosingCTA.js
import { safeTrack } from '../lib/analytics';
import { CTA_ACTIONS } from '../lib/cta';

export default function ClosingCTA() {
  const { discussRole, resume, linkedin } = CTA_ACTIONS;

  return (
    <section className="max-w-2xl border-t border-border pt-8">
      <p className="font-display font-semibold text-lg text-text mb-1">
        Have a technical problem — AI or otherwise — that needs a second pair of eyes?
      </p>
      <p className="text-muted text-sm mb-4">Let&apos;s talk.</p>
      <div className="flex flex-wrap gap-3 text-sm">
        <a
          href={discussRole.href}
          onClick={() => safeTrack(discussRole.event, { channel: 'email' })}
          className="font-display font-semibold bg-accent text-surface px-4 py-2 rounded-md hover:opacity-90 transition-opacity duration-150"
        >
          {discussRole.label}
        </a>
        <a
          href={resume.href}
          onClick={() => safeTrack(resume.event, { channel: 'resume' })}
          className="font-display font-semibold border border-border text-text px-4 py-2 rounded-md hover:border-accent hover:text-accent transition-colors duration-150"
        >
          {resume.label}
        </a>
        <a
          href={linkedin.href}
          target="_blank"
          rel="noreferrer"
          onClick={() => safeTrack(linkedin.event, { channel: 'linkedin' })}
          className="font-display font-semibold border border-border text-text px-4 py-2 rounded-md hover:border-accent hover:text-accent transition-colors duration-150"
        >
          {linkedin.label}
          <span className="sr-only"> (opens in new tab)</span>
        </a>
      </div>
    </section>
  );
}
