// components/ClosingCTA.js
import { track } from '@vercel/analytics';

export default function ClosingCTA() {
  return (
    <section className="max-w-2xl border-t border-border pt-8">
      <p className="font-display font-semibold text-lg text-text mb-1">
        Have an ambiguous AI workflow or prototype that needs direction?
      </p>
      <p className="text-muted text-sm mb-4">Let&apos;s talk.</p>
      <div className="flex flex-wrap gap-3 text-sm">
        <a
          href="mailto:svedartham92@gmail.com"
          onClick={() => track('closing_cta_click', { channel: 'email' })}
          className="font-display font-semibold bg-accent text-surface px-4 py-2 rounded-md hover:opacity-90 transition-opacity duration-150"
        >
          Email me
        </a>
        <a
          href="https://www.linkedin.com/in/sreenidhivedartham"
          target="_blank"
          rel="noreferrer"
          onClick={() => track('closing_cta_click', { channel: 'linkedin' })}
          className="font-display font-semibold border border-border text-text px-4 py-2 rounded-md hover:border-accent hover:text-accent transition-colors duration-150"
        >
          Connect on LinkedIn
          <span className="sr-only"> (opens in new tab)</span>
        </a>
      </div>
    </section>
  );
}
