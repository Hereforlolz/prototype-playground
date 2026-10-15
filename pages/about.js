import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';
import SeoHead from '../components/SeoHead';
import TerminalFrame from '../components/TerminalFrame';
import ClosingCTA from '../components/ClosingCTA';
import { LOCATION, RELOCATION, WORK_AUTHORIZATION } from '../lib/status';
import { IVANI_WORK } from '../lib/ivani-work';
import { ZG_INTRO, ZG_IS, ZG_IS_NOT, ZG_PRACTICES } from '../lib/zero-gravity';

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
        title="About — Sreenidhi Vedartham Portfolio"
        description="Nidhi — software/electrical engineer with 8+ years building smart-device systems, helping teams make technical decisions, and testing AI tools in practice."
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
              Hi, I&apos;m Nidhi — a software and electrical engineer who likes finding where things break, from
              smart devices to AI tools, and figuring out what actually fixes it. I build fast, document
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
              Software/Electrical Engineer at Ivani (Jan 2018–Sept 2026), working across hardware, device software, and
              data for wireless IoT systems. I helped design and maintain the system that carries data from the
              devices to the cloud, and built the math and machine-learning code that makes sense of it. I also
              designed the merge request checklist the CTO adopted company-wide, and ran a cross-team engineering coaching program for 4+ years.
            </p>
          </TerminalFrame>

          <TerminalFrame label="AI adoption & prototyping">
            <p className="text-muted text-sm mb-2">
              I test where AI tools are reliable, where they fail, and what evidence is still missing, and I turn what
              I learn into guidance people can use. As a contributor on Ivani&apos;s social-media marketing team, I specced and iterated a six-variant
              Sensify scrollytelling demo through rounds of C-suite feedback, reframing it around what partners
              needed to understand.
            </p>
            <p className="text-sm mb-2">
              <Link href="/projects/prompt-engineering-adoption" className="text-accent hover:opacity-80 underline">
                Read the prompt-adoption case study →
              </Link>
            </p>
            <p className="text-muted text-sm">
              Outside of work:{' '}
              <a href="https://devpost.com/software/teamtrail" target="_blank" rel="noreferrer" className="text-accent hover:opacity-80 underline">
                a Slack helper for new hires
                <span className="sr-only"> (opens in new tab)</span>
              </a>,{' '}
              <a href="https://devpost.com/software/track-1-qwen-memoryagent" target="_blank" rel="noreferrer" className="text-accent hover:opacity-80 underline">
                an AI memory that knows what to forget
                <span className="sr-only"> (opens in new tab)</span>
              </a>, and{' '}
              <a href="https://devpost.com/software/dead-code-finder" target="_blank" rel="noreferrer" className="text-accent hover:opacity-80 underline">
                a tool that finds unused code
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

      {/* 3a. Zero-Gravity Thinker */}
      <section id="zero-gravity" className="mt-12 max-w-3xl scroll-mt-8">
        <h2 className="font-display text-xl font-bold text-text mb-1">Zero-Gravity Thinker</h2>
        <p className="text-muted text-sm mb-4">{ZG_INTRO}</p>
        <div className="grid sm:grid-cols-2 gap-4 items-start mb-4">
          <TerminalFrame label="What it is">
            <ul className="space-y-2 text-muted text-sm list-disc list-inside">
                {ZG_IS.map(item => (
                  <li key={item}>{item}</li>
                ))}
            </ul>
          </TerminalFrame>
          <TerminalFrame label="What it is not">
            <ul className="space-y-2 text-muted text-sm list-disc list-inside">
                {ZG_IS_NOT.map(item => (
                  <li key={item}>{item}</li>
                ))}
            </ul>
          </TerminalFrame>
        </div>
        <TerminalFrame label="How I do it">
          <ul className="space-y-2 text-muted text-sm list-disc list-inside">
                {ZG_PRACTICES.map(item => (
                  <li key={item}>{item}</li>
                ))}
          </ul>
        </TerminalFrame>
      </section>

      {/* 3b. More from Ivani */}
      <section className="mt-12 max-w-4xl">
        <h2 className="font-display text-xl font-bold text-text mb-1">More from my time at Ivani</h2>
        <p className="text-muted text-sm mb-4">
          The day job had more range than one job title suggests. Here is what else I did, in plain terms.
        </p>
        <div className="grid sm:grid-cols-3 gap-4 items-start">
          {IVANI_WORK.map(({ group, items }) => (
            <TerminalFrame key={group} label={group}>
              <ul className="space-y-2 text-muted text-sm list-disc list-inside">
                {items.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </TerminalFrame>
          ))}
        </div>
      </section>

      {/* 4. Embark Women */}
      <section id="embark-women" className="mt-12 max-w-2xl scroll-mt-8">
        <h2 className="font-display text-xl font-bold text-text mb-4">🌱 Embark Women (2017–2022)</h2>
        <p className="text-muted">
          Co-founder and CEO of Embark Women, a community built to expand professional opportunity, mentorship, and
          connection for women in Tyler, TX, with a no-selling policy to keep it relationship-focused. Ran 20+
          programs serving 500+ participants (counted conservatively), grew the community to 800+ members on
          Facebook, and recruited and supported 150+ members with personalized career and business guidance.
          Owned the work end to end: speakers and sponsors, promotion, registration, venues and volunteers, recaps,
          and the WordPress/Wix, Meetup, Eventbrite, and Mailchimp tooling behind it.
        </p>
        <p className="text-muted mt-3">
          Programs were built to be easy to join: free or low-cost options, flexible schedules, and attention to
          transportation, childcare, disability, and cultural needs. Speakers and stories prioritized women and
          underrepresented voices, and members&apos; photos and stories were shared only with consent.
        </p>
        <p className="text-muted text-sm mt-3">
          Public record:{' '}
          <a href="https://www.facebook.com/groups/EmbarkWomen/" target="_blank" rel="noreferrer" className="text-accent hover:opacity-80 underline">
              the Facebook community
              <span className="sr-only"> (opens in new tab)</span>
            </a>,{' '}
          <a href="https://tylerpaper.com/2019/03/01/embark-women-creates-a-network-of-mentors-to-help-professional-women-grow/" target="_blank" rel="noreferrer" className="text-accent hover:opacity-80 underline">
              Tyler Morning Telegraph coverage of the mentor network
              <span className="sr-only"> (opens in new tab)</span>
            </a>, <a href="https://www.geddieconnections.com/2017/07/01/diverse-women-are-building-better-communities/" target="_blank" rel="noreferrer" className="text-accent hover:opacity-80 underline">
              a profile of its founders
              <span className="sr-only"> (opens in new tab)</span>
            </a>,{' '}
          and{' '}
          <a href="https://www.womenize.net/2021/03/03/sreenidhi-narayanan-%E2%94%82-womenize-inspiring-stories/" target="_blank" rel="noreferrer" className="text-accent hover:opacity-80 underline">
              an interview on Womenize!
              <span className="sr-only"> (opens in new tab)</span>
            </a>.
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
