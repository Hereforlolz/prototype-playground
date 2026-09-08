// components/CaseStudy.js
import Link from 'next/link';
import Layout from './Layout';
import SeoHead from './SeoHead';
import TerminalFrame from './TerminalFrame';
import ClosingCTA from './ClosingCTA';
import { safeTrack } from '../lib/analytics';

function Section({ title, items }) {
  return (
    <section className="mb-8">
      <h2 className="font-display text-lg font-bold text-text mb-3">{title}</h2>
      <ul className="space-y-3 text-sm text-muted list-disc list-inside">
        {items.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

function repoLabel(repoUrl) {
  try {
    const host = new URL(repoUrl).hostname;
    if (host.includes('gitlab')) return 'View on GitLab';
    if (host.includes('github')) return 'View on GitHub';
  } catch {
    // fall through to the generic label below
  }
  return 'View repository';
}

export default function CaseStudy({ study }) {
  const { slug, title, subtitle, tagline, repoUrl, devpostUrl, analyticsEvent, stack, problem, approach, whatBroke, outcome, scope } = study;

  return (
    <Layout>
      <SeoHead
        title={`${title} case study — Nidhi Vedartham`}
        description={`${subtitle} — problem, approach, what broke, and honest scope.`}
        path={`/projects/${slug}`}
      />
      <div className="max-w-3xl">
        <p className="text-sm mb-2">
          <Link href="/projects" className="text-accent hover:opacity-80 underline">← Back to Projects &amp; Experiments</Link>
        </p>
        <h1 className="font-display [text-wrap:balance] text-2xl sm:text-3xl font-bold text-text mb-2">
          {title}
        </h1>
        <p className="text-muted mb-1">{subtitle}</p>
        <p className="text-muted text-xs italic mb-6">{tagline}</p>

        <div className="flex flex-wrap gap-3 mb-8 text-sm">
          <a
            href={repoUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => safeTrack(analyticsEvent, { source: 'case_study' })}
            className="font-display font-semibold bg-accent text-surface px-4 py-2 rounded-md hover:opacity-90 transition-opacity duration-150"
          >
            {repoLabel(repoUrl)}
            <span className="sr-only"> (opens in new tab)</span>
          </a>
          {devpostUrl && (
            <a
              href={devpostUrl}
              target="_blank"
              rel="noreferrer"
              className="font-display font-semibold border border-border text-text px-4 py-2 rounded-md hover:border-accent hover:text-accent transition-colors duration-150"
            >
              View on Devpost
              <span className="sr-only"> (opens in new tab)</span>
            </a>
          )}
        </div>

        <section className="mb-8">
          <h2 className="font-display text-lg font-bold text-text mb-3">Stack</h2>
          <TerminalFrame label="Stack">
            <dl className="text-sm space-y-2">
              {stack.map(([layer, tech]) => (
                <div key={layer} className="flex flex-wrap gap-2">
                  <dt className="text-muted font-semibold min-w-32">{layer}</dt>
                  <dd className="text-text">{tech}</dd>
                </div>
              ))}
            </dl>
          </TerminalFrame>
        </section>

        <Section title="The problem" items={problem} />
        <Section title="The approach" items={approach} />
        <Section title="What broke (and how it got fixed)" items={whatBroke} />
        <Section title="Outcome" items={outcome} />

        <section className="mb-12">
          <h2 className="font-display text-lg font-bold text-text mb-3">Honest scope</h2>
          <p className="text-muted text-sm border border-border rounded-md px-4 py-3 bg-surface-alt">{scope}</p>
        </section>
      </div>

      <div className="mt-4 max-w-3xl">
        <ClosingCTA />
      </div>
    </Layout>
  );
}
