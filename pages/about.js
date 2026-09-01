import Head from 'next/head';
import Layout from '../components/Layout';

export default function About() {
  return (
    <Layout>
      <Head>
        <title>About — Nidhi Vedartham</title>
        <meta
          name="description"
          content="Nidhi — software engineer turned product person, all in on AI. 8+ years in IoT/embedded systems, now building agent infrastructure and prompt engineering programs."
        />
      </Head>
      <div className="max-w-2xl">
        <h1 className="font-display [text-wrap:balance] text-2xl sm:text-3xl font-bold text-text mb-6">
          👋 About Me
        </h1>
        <p className="mb-4 text-muted">
          Hi, I&apos;m Nidhi — a zero-gravity thinker, experimental systems tinkerer, and playful skeptic of shiny hype.
          I build fast, break faster, and document the chaos for your amusement (and my future regret). If you want to
          collaborate, or have a system you dare me to break — hit me up.
        </p>

        <p className="text-xs text-accent font-mono font-semibold tracking-wide uppercase mb-3">
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
          Recent chaos: multiple hackathon builds (
          <a href="https://devpost.com/software/teamtrail" target="_blank" rel="noreferrer" className="text-accent hover:opacity-80 underline">
            a Slack onboarding agent
          </a>,{' '}
          <a href="https://devpost.com/software/track-1-qwen-memoryagent" target="_blank" rel="noreferrer" className="text-accent hover:opacity-80 underline">
            a memory system on pgvector
          </a>,{' '}
          <a href="https://devpost.com/software/dead-code-finder" target="_blank" rel="noreferrer" className="text-accent hover:opacity-80 underline">
            a knowledge-graph bug finder
          </a>
          ), a handful of GitHub issues filed against Google&apos;s ADK, and a habit of
          writing up what broke on <a href="https://dev.to/hereforlolz" target="_blank" rel="noreferrer" className="text-accent hover:opacity-80 underline">dev.to</a> after
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
    </Layout>
  );
}
