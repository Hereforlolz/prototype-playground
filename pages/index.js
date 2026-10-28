// 📁 /pages/index.js
import Link from 'next/link';
import Image from 'next/image';
import Button from '../components/Button';
import Layout from '../components/Layout';
import SeoHead from '../components/SeoHead';
import { safeTrack } from '../lib/analytics';
import { AVAILABILITY } from '../lib/status';
import { GREETING, HEADLINE, SUBTEXT, PROOF_POINTS, METRIC_LINE, METRIC_DISCLOSURE, START_HERE } from '../lib/homepage-content';
import { PERSON_JSON_LD } from '../lib/person';

export default function Home() {
  return (
    <Layout>
      <SeoHead
        title="Sreenidhi Vedartham Portfolio"
        description="Software/electrical engineer and community co-founder: embedded IoT, AI enablement, and technical program work, with honest write-ups of what breaks."
        path="/"
        jsonLd={PERSON_JSON_LD}
      />
      <div className="max-w-2xl">
        <div className="flex items-center gap-4 mb-5">
          <Image
            src="/profile.jpg"
            alt="Portrait of Sreenidhi Vedartham, smiling, in a black sleeveless top"
            width={2448}
            height={3264}
            sizes="80px"
            priority
            className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-full border border-border object-cover object-[50%_35%]"
          />
          <p className="font-display text-base sm:text-lg font-semibold text-text">{GREETING}</p>
        </div>

        <h1 className="font-display [text-wrap:balance] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text mb-4">
          {HEADLINE}
        </h1>

        <p className="text-muted mb-3 max-w-prose">{SUBTEXT}</p>
        <p className="text-text text-sm font-medium mb-6 max-w-prose">{AVAILABILITY}</p>

        <ul className="text-sm text-muted space-y-2 mb-6 max-w-prose list-disc list-inside">
          {PROOF_POINTS.map(point => (
            <li key={point}>{point}</li>
          ))}
        </ul>

        <div className="text-sm mb-10 max-w-prose">
          <p className="text-text font-medium">{METRIC_LINE}</p>
          <details className="mt-2">
            <summary className="text-muted underline decoration-dotted hover:text-accent transition-colors duration-150 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2">
              What does this mean?
            </summary>
            <p className="text-muted text-xs mt-2">{METRIC_DISCLOSURE}</p>
          </details>
        </div>

        <section className="mb-10 max-w-prose" aria-labelledby="start-here">
          <h2 id="start-here" className="font-display text-lg font-bold text-text mb-3">Start here</h2>
          <ul className="space-y-3 text-sm">
            {START_HERE.map(({ href, title, detail }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="font-display font-semibold text-accent hover:opacity-80 underline"
                >
                  {title}
                </Link>
                <p className="text-muted mt-1">{detail}</p>
              </li>
            ))}
          </ul>
        </section>

        <nav className="flex flex-wrap gap-3 mb-10">
          <Button href="/projects" onClick={() => safeTrack('homepage_cta_click', { destination: 'projects' })}>
            View Projects
          </Button>
          <Button
            href="/logs"
            variant="secondary"
            onClick={() => safeTrack('homepage_cta_click', { destination: 'logs' })}
          >
            Lessons Learned
          </Button>
          <Button
            href="/about"
            variant="secondary"
            onClick={() => safeTrack('homepage_cta_click', { destination: 'about' })}
          >
            About
          </Button>
        </nav>
      </div>
    </Layout>
  );
}
