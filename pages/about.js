import Layout from '../components/Layout';
import SeoHead from '../components/SeoHead';
import ClosingCTA from '../components/ClosingCTA';
import { LOCATION, RELOCATION, WORK_AUTHORIZATION } from '../lib/status';

export default function About() {
  return (
    <Layout>
      <SeoHead
        title="About — Nidhi Vedartham"
        description="Nidhi — software/electrical engineer with 8+ years in IoT/embedded systems, cross-team technical strategy, and applied AI prototyping."
        path="/about"
      />
      <div className="max-w-2xl">
        <h1 className="font-display [text-wrap:balance] text-2xl sm:text-3xl font-bold text-text mb-6">
          About
        </h1>
        <p className="mb-4 text-muted">
          Hi, I&apos;m Nidhi — a software and electrical engineer who likes finding where systems break, from embedded
          IoT hardware to AI workflows, and figuring out what actually fixes it. I build fast, document what goes
          wrong along the way instead of smoothing it over, and adjust from there. If you have a system you want
          pressure-tested — AI or otherwise — I&apos;d like to hear about it.
        </p>

        <p className="text-xs text-accent font-mono font-bold tracking-wide uppercase mb-1">
          Status
        </p>
        <p className="mb-4 text-muted text-sm">
          {LOCATION} — {RELOCATION.toLowerCase()}. {WORK_AUTHORIZATION}.
        </p>

        <p className="text-xs text-accent font-mono font-bold tracking-wide uppercase mb-3">
          Bio
        </p>
        <p className="mb-4 text-muted">
          By day: I&apos;m a Software/Electrical Engineer at Ivani (Jan 2018–present), bridging hardware, embedded
          software, and data engineering for wireless IoT systems. That&apos;s meant turning ordinary devices into
          occupancy sensors — cloud service interfaces, third-party hardware testing, and the firmware update
          deployments that changed what the product could do — building the IoT data pipeline end to end from edge
          collection through cloud ingestion, and shipping the applied-math-and-ML algorithms (embedded C and Python)
          that run on top of it. I also designed and run the onboarding program for new engineers on the team.
        </p>
        <p className="mb-4 text-muted">
          Internally that&apos;s paired with a role called Zero-Gravity Thinker: I embed with teams as an outside
          perspective, run rubber-ducking and brainstorming sessions with engineers, sketch requirements at a
          helicopter-view level before anyone dives into detail, and bridge stakeholders and engineering so
          misunderstandings get caught before they become friction.
        </p>
        <p className="mb-4 text-muted">
          As social media marketing co-lead, I also built 7 interactive Sensify product demos in 3 weeks using AI
          coding agents and a 19-check Playwright audit, then presented them to the C-suite and iterated on their
          feedback.
        </p>
        <p className="mb-4 text-muted">
          Lately that&apos;s expanded into AI enablement — benchmarking prompt engineering practices, building agent
          infrastructure, and generally seeing how far I can push these tools before they break (or I do).
        </p>
        <p className="text-muted">
          Recent work: multiple hackathon builds (
          <a href="https://devpost.com/software/teamtrail" target="_blank" rel="noreferrer" className="text-accent hover:opacity-80 underline">
            a Slack onboarding agent
            <span className="sr-only"> (opens in new tab)</span>
          </a>,{' '}
          <a href="https://devpost.com/software/track-1-qwen-memoryagent" target="_blank" rel="noreferrer" className="text-accent hover:opacity-80 underline">
            a memory system on pgvector
            <span className="sr-only"> (opens in new tab)</span>
          </a>,{' '}
          <a href="https://devpost.com/software/dead-code-finder" target="_blank" rel="noreferrer" className="text-accent hover:opacity-80 underline">
            a knowledge-graph bug finder
            <span className="sr-only"> (opens in new tab)</span>
          </a>
          ), a handful of GitHub issues filed against Google&apos;s ADK, and a habit of
          writing up what broke on{' '}
          <a href="https://dev.to/hereforlolz" target="_blank" rel="noreferrer" className="text-accent hover:opacity-80 underline">
            dev.to
            <span className="sr-only"> (opens in new tab)</span>
          </a> after
          the dust settles.
        </p>
      </div>

      <section className="mt-12 max-w-2xl">
        <h2 className="font-display text-xl font-bold text-text mb-4">🌱 Embark Women (2017–2022)</h2>
        <p className="text-muted">
          Co-founder and CEO of Embark Women, a grassroots organization supporting young women entrepreneurs and
          students in Tyler, TX. Ran 20+ events — webinars, hands-on workshops, live networking meetups — serving
          500+ participants, and personally recruited and mentored 150+ members with career and business guidance.
          Owned delivery end to end: sponsorships, branded decks and marketing assets, the WordPress/Wix sites, and
          analytics dashboards across HubSpot, Google Analytics, and Facebook tools.
        </p>
      </section>

      <div className="mt-12 max-w-2xl">
        <ClosingCTA />
      </div>
    </Layout>
  );
}
