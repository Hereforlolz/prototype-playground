// components/CaseStudy.js
import { useState } from 'react';
import Link from 'next/link';
import Layout from './Layout';
import SeoHead from './SeoHead';
import TerminalFrame from './TerminalFrame';
import ClosingCTA from './ClosingCTA';
import { safeTrack } from '../lib/analytics';
import { DEFAULT_MODE, hasSimpleExplanation, resolveExplanationMode } from '../lib/case-study-explanations';

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

// The existing recruiter/product-level case study — unchanged from before
// the mode selector existed. Extracted so it can render either on its own
// (every case study without a simple explanation) or inside a tabpanel
// (PilotCraft), without duplicating this markup between the two.
function Overview({ stack, problem, approach, whatBroke, outcome, scope }) {
  return (
    <>
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
    </>
  );
}

// Plain-language translation of the same project, not a shortened Overview.
// Deliberately excludes architecture/implementation detail — that stays in
// the linked repo, not duplicated here.
function SimpleExplanation({ sections }) {
  return (
    <div className="mb-12 space-y-6">
      {sections.map(section => (
        <section key={section.title}>
          <h2 className="font-display text-lg font-bold text-text mb-2">{section.title}</h2>
          <p className="text-muted text-sm">{section.text}</p>
        </section>
      ))}
    </div>
  );
}

// Two mutually exclusive views of the same case study, not two independent
// on/off settings — ARIA tabs are the correct pattern for that (not a
// radiogroup, which represents a form choice, not a switch between content
// panels). Kept intentionally minimal: two real, individually focusable
// buttons and no roving-tabindex/arrow-key machinery, since that's not
// needed for two plain Tab-reachable options to be fully keyboard operable.
function ExplanationSelector({ mode, onSelect }) {
  const tabs = [
    { id: 'simple', label: 'Explain simply' },
    { id: 'overview', label: 'Overview' },
  ];

  return (
    <div role="tablist" aria-label="Explanation depth" className="inline-flex gap-1 rounded-md border border-border bg-surface-alt p-1 mb-8">
      {tabs.map(tab => {
        const selected = mode === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`case-study-tab-${tab.id}`}
            aria-selected={selected}
            aria-controls={`case-study-panel-${tab.id}`}
            onClick={() => onSelect(tab.id)}
            className={`px-3 py-1.5 rounded text-sm font-display font-semibold transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 ${
              selected ? 'bg-accent text-surface' : 'text-muted hover:text-text'
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
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
  const showSelector = hasSimpleExplanation(study);
  const [mode, setMode] = useState(DEFAULT_MODE);

  function selectMode(requestedMode) {
    const resolved = resolveExplanationMode(study, requestedMode);
    if (resolved === mode) return;
    setMode(resolved);
    safeTrack('case_study_explanation_changed', { project: slug, mode: resolved });
  }

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

        {showSelector ? (
          <>
            <ExplanationSelector mode={mode} onSelect={selectMode} />

            <div id="case-study-panel-simple" role="tabpanel" aria-labelledby="case-study-tab-simple" hidden={mode !== 'simple'}>
              <SimpleExplanation sections={study.explanations.simple.sections} />
            </div>

            <div id="case-study-panel-overview" role="tabpanel" aria-labelledby="case-study-tab-overview" hidden={mode !== 'overview'}>
              <Overview stack={stack} problem={problem} approach={approach} whatBroke={whatBroke} outcome={outcome} scope={scope} />
            </div>
          </>
        ) : (
          <Overview stack={stack} problem={problem} approach={approach} whatBroke={whatBroke} outcome={outcome} scope={scope} />
        )}
      </div>

      <div className="mt-4 max-w-3xl">
        <ClosingCTA />
      </div>
    </Layout>
  );
}
