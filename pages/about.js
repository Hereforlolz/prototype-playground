import Link from 'next/link';
import Image from 'next/image';
import Layout from '../components/Layout';
import SeoHead from '../components/SeoHead';
import TerminalFrame from '../components/TerminalFrame';
import ClosingCTA from '../components/ClosingCTA';
import Slideshow from '../components/Slideshow';
import { LOCATION, RELOCATION, WORK_AUTHORIZATION, AVAILABILITY } from '../lib/status';
import { IVANI_WORK } from '../lib/ivani-work';
import { MARKETING_INTRO, MARKETING_OWNED, MARKETING_OUTCOMES, MARKETING_SCOPE_NOTE } from '../lib/marketing-work';
import { EARLIER_ROLE, EDUCATION, CERTIFICATIONS, LANGUAGES, TECHNICAL_ACTIVITIES } from '../lib/background';
import { LEADERSHIP, EMBARK, EMBARK_PHOTOS, EMBARK_LOGO } from '../lib/leadership';
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
        description="Sreenidhi — software/electrical engineer with 8+ years building smart-device systems, leading community programs, helping engineering teams, and testing AI tools in practice."
        path="/about"
      />

      {/* 1. Short personal intro */}
      <div className="max-w-2xl">
        <h1 className="font-display [text-wrap:balance] text-2xl sm:text-3xl font-bold text-text mb-6">
          About
        </h1>

        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="shrink-0 self-center sm:self-start">
            <Image
              src="/profile.jpg"
              alt="Portrait of Sreenidhi Vedartham, smiling, in a black sleeveless top"
              width={2448}
              height={3264}
              sizes="(min-width: 640px) 160px, 140px"
              priority
              className="w-[140px] sm:w-[160px] aspect-[4/5] rounded-xl border border-border object-cover object-[50%_35%]"
            />
          </div>

          <div className="min-w-0">
            <p className="text-muted mb-3">
              Hi, I&apos;m Sreenidhi — a software and electrical engineer who also builds and leads community
              programs. I like finding where things break, from smart devices to AI tools, and working with people
              on what actually fixes it. I build fast, write down what goes wrong instead of smoothing it over, and
              adjust from there.
            </p>
            <p className="text-text text-sm font-medium mb-3">{AVAILABILITY}</p>
            <p className="text-muted text-xs">
              {LOCATION} — {RELOCATION.toLowerCase()}. {WORK_AUTHORIZATION}.
            </p>
          </div>
        </div>
      </div>

      {/* 2. How I work */}
      <section className="mt-12 max-w-3xl">
        <div className="flex items-center gap-3 mb-1">
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

      {/* 3. Leadership & mentoring */}
      <section id="leadership" className="mt-12 max-w-4xl scroll-mt-8">
        <h2 className="font-display text-xl font-bold text-text mb-1">Leadership &amp; mentoring</h2>
        <p className="text-muted text-sm mb-4">
          Organizing access to coaching, working through problems with engineers, and improving how a team works
          are three different jobs. Here is each one, with what I did and didn&apos;t do.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 items-start">
          {LEADERSHIP.map(({ label, text, href, link }) => (
            <TerminalFrame key={label} label={label}>
              <p className="text-muted text-sm">{text}</p>
              {href && (
                <p className="text-sm mt-2">
                  <a href={href} className="text-accent hover:opacity-80 underline">{link}</a>
                </p>
              )}
            </TerminalFrame>
          ))}
        </div>
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

      {/* 3a-ii. AI adoption — grouped with Zero-Gravity as character/approach,
          not the chronological résumé section below. */}
      <section id="ai-adoption" className="mt-12 max-w-3xl scroll-mt-8">
        <h2 className="font-display text-xl font-bold text-text mb-1">AI adoption &amp; prototyping</h2>
        <p className="text-muted text-sm mb-2">
          I test where AI tools are reliable, where they fail, and what evidence is still missing, then turn what I
          learn into guidance people can use. At Ivani, that meant comparing original and structured prompts on real
          engineering questions, then building reusable templates, a cheat sheet, and context guidance from what
          worked — use spread from two engineers to roughly ten in about two weeks. Directional savings estimates
          are in the case study below, labeled as informal observations, not controlled measurement.
        </p>
        <p className="text-sm mb-3">
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
      </section>

      {/* Divider: everything above is character/approach; everything below
          is the chronological résumé, in order. */}
      <div className="mt-16 pt-8 border-t-2 border-border max-w-4xl">
        <p className="font-mono text-xs uppercase tracking-widest text-muted mb-1">Chronological</p>
        <h2 className="font-display text-2xl font-bold text-text">Experience</h2>
        <p className="text-muted text-sm mt-1 max-w-prose">Where I&apos;ve worked, roughly in order.</p>
      </div>

      {/* 3b. More from Ivani */}
      <section id="ivani-engineering" className="mt-10 max-w-4xl scroll-mt-8">
        <h2 className="font-display text-xl font-bold text-text mb-1">Engineering at Ivani</h2>
        <p className="text-muted text-sm mb-2">
          Software/Electrical Engineer at Ivani (Jan 2018–Sept 2026): hardware, firmware, device software, and data
          for wireless IoT systems (OpenThread, with ESP32, Nordic, and SiLabs chips). I helped design and maintain
          the system that carries data from the devices to the cloud, and contributed to the detection algorithm.
        </p>
        <p className="text-muted text-sm mb-4">
          Detailed performance results for the detection work are confidential, so there are no accuracy or latency
          numbers here. The 1,000+ node figure is the size of the deployment I helped flash and provision — not a
          result, and not a deployment I owned alone.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 items-start">
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

      {/* 3c. Marketing co-leadership */}
      <section id="marketing-leadership" className="mt-12 max-w-4xl scroll-mt-8">
        <h2 className="font-display text-xl font-bold text-text mb-1">Marketing co-leadership at Ivani</h2>
        <p className="text-muted text-sm mb-4">{MARKETING_INTRO}</p>
        <div className="grid sm:grid-cols-2 gap-4 items-start">
          <TerminalFrame label="What I owned">
            <ul className="space-y-2 text-muted text-sm list-disc list-inside">
              {MARKETING_OWNED.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </TerminalFrame>
          <TerminalFrame label="Outcomes (shared, not solely mine)">
            <ul className="space-y-2 text-muted text-sm list-disc list-inside">
              {MARKETING_OUTCOMES.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </TerminalFrame>
        </div>
        <p className="text-muted text-xs mt-4">{MARKETING_SCOPE_NOTE}</p>
      </section>

      {/* 4. Embark Women */}
      <section id="embark-women" className="mt-12 max-w-2xl scroll-mt-8">
        <div className="flex items-center gap-3 mb-4">
          <Image
            src={EMBARK_LOGO.src}
            alt={EMBARK_LOGO.alt}
            width={EMBARK_LOGO.width}
            height={EMBARK_LOGO.height}
            className="w-14 h-14 rounded-md"
          />
          <h2 className="font-display text-xl font-bold text-text">Embark Women (2017–2022)</h2>
        </div>
        {EMBARK.map((paragraph, i) => (
          <p key={paragraph} className={`text-muted${i > 0 ? ' mt-3' : ''}`}>
            {paragraph}
          </p>
        ))}
        <Slideshow photos={EMBARK_PHOTOS} label="Embark Women photos" />
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
          <a href="https://www.kltv.com/story/37683871/2018-evolve-womens-conferences-2018-celebration-of-women/" target="_blank" rel="noreferrer" className="text-accent hover:opacity-80 underline">
              KLTV coverage of the 2018 Evolve Women&apos;s Conference
              <span className="sr-only"> (opens in new tab)</span>
            </a>,{' '}
          <a href="https://tylerpaper.com/2018/03/08/evolve-womens-conference-promotes-support-and-collaboration-on-international-womans-day/" target="_blank" rel="noreferrer" className="text-accent hover:opacity-80 underline">
              Tyler Morning Telegraph coverage of the same conference
              <span className="sr-only"> (opens in new tab)</span>
            </a>,{' '}
          and{' '}
          <a href="https://www.womenize.net/2021/03/03/sreenidhi-narayanan-%E2%94%82-womenize-inspiring-stories/" target="_blank" rel="noreferrer" className="text-accent hover:opacity-80 underline">
              an interview on Womenize!
              <span className="sr-only"> (opens in new tab)</span>
            </a>.
        </p>
      </section>

      {/* 5. Background */}
      <section id="background" className="mt-12 max-w-4xl scroll-mt-8">
        <h2 className="font-display text-xl font-bold text-text mb-1">Background</h2>
        <p className="text-muted text-sm mb-4">Before Ivani, plus education, certifications, and the rest.</p>
        <div className="grid sm:grid-cols-2 gap-4 items-start">
          <TerminalFrame label={`${EARLIER_ROLE.title} (${EARLIER_ROLE.dates})`}>
            <ul className="space-y-2 text-muted text-sm list-disc list-inside">
              {EARLIER_ROLE.items.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </TerminalFrame>
          <div className="space-y-4">
            <TerminalFrame label="Education">
              <ul className="space-y-2 text-muted text-sm">
                {EDUCATION.map(({ degree, school, years }) => (
                  <li key={degree}>
                    <span className="text-text font-medium">{degree}</span>, {school} ({years})
                  </li>
                ))}
              </ul>
            </TerminalFrame>
            <TerminalFrame label="Certification">
              <ul className="space-y-2 text-muted text-sm">
                {CERTIFICATIONS.map(({ name, issuer, issued, expires, href }) => (
                  <li key={name}>
                    <a href={href} target="_blank" rel="noreferrer" className="text-accent hover:opacity-80 underline font-medium">
                      {name}
                      <span className="sr-only"> (opens in new tab)</span>
                    </a>
                    , {issuer}. Issued {issued}, expires {expires}. Verifiable on Credly.
                  </li>
                ))}
              </ul>
            </TerminalFrame>
            <TerminalFrame label="Languages & activity">
              <p className="text-muted text-sm mb-2">{LANGUAGES.join(' · ')}</p>
              <ul className="space-y-1 text-muted text-sm list-disc list-inside">
                {TECHNICAL_ACTIVITIES.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </TerminalFrame>
          </div>
        </div>
      </section>

      {/* 6. Contact / recruiter CTA */}
      <div className="mt-12 max-w-2xl">
        <ClosingCTA />
      </div>
    </Layout>
  );
}
