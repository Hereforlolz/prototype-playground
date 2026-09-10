// components/CaseStudy.js
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Layout from './Layout';
import SeoHead from './SeoHead';
import TerminalFrame from './TerminalFrame';
import ClosingCTA from './ClosingCTA';
import { safeTrack } from '../lib/analytics';
import { DEFAULT_MODE, hasSimpleExplanation, resolveExplanationMode } from '../lib/case-study-explanations';
import { repoLabel, hasAnyCaseStudyLink } from '../lib/case-study-links';

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

// A small number of real product screenshots — not a gallery. Only renders
// when a case study opts in via an optional `media` field (undefined for
// every case study but PilotCraft), so this never changes anything about
// the other six.
function CaseStudyMedia({ src, width, height, alt, label, caption }) {
  return (
    <figure className="my-8">
      <div className="rounded-lg border border-border overflow-hidden bg-surface">
        <Image src={src} width={width} height={height} alt={alt} className="w-full h-auto" />
      </div>
      <figcaption className="mt-3 text-sm">
        <span className="font-display font-semibold text-text">{label}:</span>{' '}
        <span className="text-muted">{caption}</span>
      </figcaption>
    </figure>
  );
}

// The existing recruiter/product-level case study — unchanged from before
// the mode selector existed. Extracted so it can render either on its own
// (every case study without a simple explanation) or below the selector
// (PilotCraft), without duplicating this markup between the two. `media`
// is optional and, when present, places up to three screenshots at fixed,
// named slots next to the sections they illustrate.
function Overview({ stack, problem, approach, whatBroke, outcome, scope, media }) {
  return (
    <>
      {media?.hero && <CaseStudyMedia {...media.hero} />}

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
      {media?.afterApproach && <CaseStudyMedia {...media.afterApproach} />}

      <Section title="What broke (and how it got fixed)" items={whatBroke} />
      <Section title="Outcome" items={outcome} />
      {media?.afterOutcome && <CaseStudyMedia {...media.afterOutcome} />}

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

// Two mutually exclusive views of the same case study, kept as two plain,
// individually Tab-focusable buttons with aria-pressed marking which one
// is active — not the full ARIA tabs pattern (tablist/tab/tabpanel, roving
// tabindex, arrow-key navigation), which is more machinery than two views
// need.
function ExplanationSelector({ mode, onSelect }) {
  const options = [
    { id: 'simple', label: 'Explain simply' },
    { id: 'overview', label: 'Overview' },
  ];

  return (
    <div role="group" aria-label="Explanation depth" className="inline-flex gap-1 rounded-md border border-border bg-surface-alt p-1 mb-8">
      {options.map(option => {
        const selected = mode === option.id;
        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={selected}
            onClick={() => onSelect(option.id)}
            className={`px-3 py-1.5 rounded text-sm font-display font-semibold transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 ${
              selected ? 'bg-accent text-surface' : 'text-muted hover:text-text'
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export default function CaseStudy({ study }) {
  const { slug, title, subtitle, tagline, repoUrl, devpostUrl, linkedinUrl, analyticsEvent, stack, problem, approach, whatBroke, outcome, scope, media } = study;
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

        {hasAnyCaseStudyLink(study) && (
          <div className="flex flex-wrap gap-3 mb-8 text-sm">
            {repoUrl && (
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
            )}
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
            {linkedinUrl && (
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="font-display font-semibold border border-border text-text px-4 py-2 rounded-md hover:border-accent hover:text-accent transition-colors duration-150"
              >
                LinkedIn article
                <span className="sr-only"> (opens in new tab)</span>
              </a>
            )}
          </div>
        )}

        {showSelector ? (
          <>
            <ExplanationSelector mode={mode} onSelect={selectMode} />

            <div hidden={mode !== 'simple'}>
              <SimpleExplanation sections={study.explanations.simple.sections} />
            </div>

            <div hidden={mode !== 'overview'}>
              <Overview stack={stack} problem={problem} approach={approach} whatBroke={whatBroke} outcome={outcome} scope={scope} media={media} />
            </div>
          </>
        ) : (
          <Overview stack={stack} problem={problem} approach={approach} whatBroke={whatBroke} outcome={outcome} scope={scope} media={media} />
        )}
      </div>

      <div className="mt-4 max-w-3xl">
        <ClosingCTA />
      </div>
    </Layout>
  );
}
