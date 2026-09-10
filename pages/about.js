import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';
import SeoHead from '../components/SeoHead';
import TerminalFrame from '../components/TerminalFrame';
import ClosingCTA from '../components/ClosingCTA';
import { LOCATION, RELOCATION, WORK_AUTHORIZATION } from '../lib/status';

// The four-phase approach behind the work on this site: understand the
// real system, build enough to expose what's actually true, separate
// proven results from assumptions, then leave a clear trail for whoever
// picks it up next.
const WORK_PATTERN = [
  {
    step: 'Find the real system behind the ask',
    detail: 'Understand the people, constraints, dependencies, evidence gaps, and actual runtime behavior before deciding where the problem is.',
  },
  {
    step: 'Build enough for the gaps to surface',
    detail: 'Get something working far enough end-to-end that assumptions stop being theoretical and weak spots become visible.',
  },
  {
    step: "Separate what works from what's proven",
    detail: "Test outputs and failure modes. If the evidence doesn't support a claim, qualify it, revise it, or remove it.",
  },
  {
    step: 'Make the next decision easier',
    detail: 'Document the reasoning, limitations, and next steps so someone else can act without retracing the work.',
  },
];

export default function About() {
  return (
    <Layout>
      <SeoHead
        title="About — Nidhi Vedartham"
        description="Nidhi — software/electrical engineer with 8+ years in IoT/embedded systems, cross-team technical strategy, and applied AI prototyping."
        path="/about"
      />

      {/* 1. Short personal intro */}
      <div className="max-w-2xl">
        <h1 className="font-display [text-wrap:balance] text-2xl sm:text-3xl font-bold text-text mb-6">
          About
        </h1>

        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="shrink-0 self-center sm:self-start">
            <div className="w-[140px] sm:w-[160px] aspect-[4/5] rounded-xl border border-border bg-surface-alt flex items-center justify-center overflow-hidden">
              <Image
                src="/brand/reactions/nidhi-wave.png"
                alt="Illustrated portrait of Nidhi waving"
                width={155}
                height={178}
                priority
                className="max-w-[72%] h-auto"
              />
            </div>
          </div>

          <div className="min-w-0">
            <p className="text-muted mb-3">
              Hi, I&apos;m Nidhi — a software and electrical engineer who likes finding where systems break, from
              embedded IoT hardware to AI workflows, and figuring out what actually fixes it. I build fast, document
              what goes wrong along the way instead of smoothing it over, and adjust from there.
            </p>
            <p className="text-muted mb-3">
              If you have a system you want pressure-tested — AI or otherwise — I&apos;d like to hear about it.
            </p>
            <p className="text-muted text-xs">
              {LOCATION} — {RELOCATION.toLowerCase()}. {WORK_AUTHORIZATION}.
            </p>
          </div>
        </div>
      </div>

      {/* 2. How I work */}
      <section className="mt-12 max-w-3xl">
        <div className="flex items-center gap-3 mb-1">
          <Image
            src="/brand/reactions/nidhi-thinking.png"
            alt=""
            aria-hidden="true"
            width={131}
            height={178}
            className="w-8 h-auto shrink-0"
          />
          <h2 className="font-display text-xl font-bold text-text">How I work</h2>
        </div>
        <p className="text-muted text-sm mb-4">A pattern I&apos;ve noticed in how I work:</p>

        <TerminalFrame label="workflow.log" variant="featured">
          <ol className="space-y-4">
            {WORK_PATTERN.map(({ step, detail }, i) => (
              <li key={step} className="flex gap-3">
                <span className="font-mono text-xs text-accent shrink-0 mt-0.5" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0">
                  <p className="font-display font-semibold text-sm text-text">{step}</p>
                  <p className="text-muted text-sm mt-0.5">{detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </TerminalFrame>
      </section>

      {/* 3. Where this shows up */}
      <section className="mt-12 max-w-4xl">
        <h2 className="font-display text-xl font-bold text-text mb-1">Where this shows up</h2>
        <p className="text-muted text-sm mb-4">
          I bring the same systems-first approach and evidence discipline to engineering, AI experimentation, and
          community work.
        </p>
        <div className="grid sm:grid-cols-3 gap-4 items-start">
          <TerminalFrame label="Engineering & systems">
            <p className="text-muted text-sm">
              Software/Electrical Engineer at Ivani (Jan 2018–present), bridging hardware, embedded software, and
              data engineering for wireless IoT systems — building the IoT data pipeline end to end from edge
              collection through cloud ingestion, and shipping the applied-math-and-ML algorithms (embedded C and
              Python) that run on top of it. I also designed and run the onboarding program for new engineers on
              the team.
            </p>
          </TerminalFrame>

          <TerminalFrame label="AI adoption & prototyping">
            <p className="text-muted text-sm mb-2">
              I benchmark prompt-engineering approaches and build agent infrastructure to test where AI workflows
              are reliable, where they fail, and what evidence is still missing. As part of Ivani&apos;s
              social-media marketing team, I built 7 interactive Sensify product demos in 3 weeks using AI coding
              agents and a 19-check Playwright audit, then presented them to the C-suite.
            </p>
            <p className="text-sm mb-2">
              <Link href="/projects/prompt-engineering-adoption" className="text-accent hover:opacity-80 underline">
                Read the prompt-adoption case study →
              </Link>
            </p>
            <p className="text-muted text-sm">
              Outside of work:{' '}
              <a href="https://devpost.com/software/teamtrail" target="_blank" rel="noreferrer" className="text-accent hover:opacity-80 underline">
                a Slack onboarding agent
                <span className="sr-only"> (opens in new tab)</span>
              </a>,{' '}
              <a href="https://devpost.com/software/track-1-qwen-memoryagent" target="_blank" rel="noreferrer" className="text-accent hover:opacity-80 underline">
                a memory system on pgvector
                <span className="sr-only"> (opens in new tab)</span>
              </a>, and{' '}
              <a href="https://devpost.com/software/dead-code-finder" target="_blank" rel="noreferrer" className="text-accent hover:opacity-80 underline">
                a knowledge-graph bug finder
                <span className="sr-only"> (opens in new tab)</span>
              </a>{' '}
              — plus a habit of writing up what broke on{' '}
              <a href="https://dev.to/hereforlolz" target="_blank" rel="noreferrer" className="text-accent hover:opacity-80 underline">
                dev.to
                <span className="sr-only"> (opens in new tab)</span>
              </a>. More on{' '}
              <Link href="/projects" className="text-accent hover:opacity-80 underline">Projects &amp; Experiments</Link>.
            </p>
          </TerminalFrame>

          <TerminalFrame label="Community & communication">
            <p className="text-muted text-sm">
              Internally, a role called Zero-Gravity Thinker: embedding with teams as an outside perspective,
              running rubber-ducking and brainstorming sessions, and bridging stakeholders and engineering so
              misunderstandings get caught before they become friction. Outside engineering, that same instinct for
              translating between technical and non-technical audiences built{' '}
              <a href="#embark-women" className="text-accent hover:opacity-80 underline">Embark Women</a>.
            </p>
          </TerminalFrame>
        </div>
        <p className="text-text text-sm font-medium mt-6">
          The setting changes; the pattern doesn&apos;t.
        </p>
      </section>

      {/* 4. Embark Women */}
      <section id="embark-women" className="mt-12 max-w-2xl scroll-mt-8">
        <h2 className="font-display text-xl font-bold text-text mb-4">🌱 Embark Women (2017–2022)</h2>
        <p className="text-muted">
          Co-founder and CEO of Embark Women, a grassroots organization supporting young women entrepreneurs and
          students in Tyler, TX. Ran 20+ events — webinars, hands-on workshops, live networking meetups — serving
          500+ participants, and personally recruited and mentored 150+ members with career and business guidance.
          Owned delivery end to end: sponsorships, branded decks and marketing assets, the WordPress/Wix sites, and
          analytics dashboards across HubSpot, Google Analytics, and Facebook tools.
        </p>
      </section>

      {/* 5. Small human element */}
      <div className="mt-10 max-w-2xl flex items-center gap-3">
        <Image
          src="/brand/reactions/nidhi-riley-work-together.png"
          alt="Illustration of Nidhi working at a laptop with her dog Riley"
          width={173}
          height={179}
          className="w-12 h-auto shrink-0"
        />
        <p className="text-muted text-xs italic">Riley — occasional co-worker, permanent scene-stealer.</p>
      </div>

      {/* 6. Contact / recruiter CTA */}
      <div className="mt-12 max-w-2xl">
        <ClosingCTA />
      </div>
    </Layout>
  );
}
