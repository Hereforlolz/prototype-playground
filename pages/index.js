// 📁 /pages/index.js
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';
import SeoHead from '../components/SeoHead';
import { safeTrack } from '../lib/analytics';
import { HEADLINE, SUBTEXT, PROOF_POINTS, METRIC_LINE, METRIC_DISCLOSURE } from '../lib/homepage-content';
import { PERSON_JSON_LD } from '../lib/person';

export default function Home() {
  return (
    <Layout>
      <SeoHead
        title="Nidhi Vedartham"
        description="Software/electrical engineer working across embedded IoT, technical strategy, and applied AI — practical prototypes and honest write-ups of what breaks."
        path="/"
        jsonLd={PERSON_JSON_LD}
      />
      <div className="flex flex-col xl:flex-row xl:items-center xl:gap-12">
        <div className="max-w-2xl">
          <h1 className="font-display [text-wrap:balance] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text mb-4">
            {HEADLINE}
          </h1>

          <p className="text-muted mb-6 max-w-prose">{SUBTEXT}</p>

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

          <nav className="flex flex-wrap gap-3 mb-10">
            <span className="group relative inline-flex">
              <Link
                href="/projects"
                onClick={() => safeTrack('homepage_cta_click', { destination: 'projects' })}
                className="font-display font-semibold bg-accent text-surface px-4 py-2 rounded-md hover:opacity-90 transition-opacity duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
              >
                View Projects &amp; Experiments
              </Link>
              <Image
                src="/riley-peek.png"
                alt=""
                aria-hidden="true"
                width={1254}
                height={1254}
                className="pointer-events-none select-none absolute -top-8 sm:-top-9 left-1/2 -translate-x-1/2 size-10 sm:size-12 transition-transform duration-200 ease-out group-hover:-translate-y-1 group-focus-within:-translate-y-1 motion-reduce:transition-none motion-reduce:transform-none"
              />
            </span>
            <Link
              href="/logs"
              onClick={() => safeTrack('homepage_cta_click', { destination: 'logs' })}
              className="font-display font-semibold border border-border text-text px-4 py-2 rounded-md hover:border-accent hover:text-accent transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              Lessons Learned
            </Link>
            <Link
              href="/about"
              onClick={() => safeTrack('homepage_cta_click', { destination: 'about' })}
              className="font-display font-semibold border border-border text-text px-4 py-2 rounded-md hover:border-accent hover:text-accent transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              About
            </Link>
          </nav>
        </div>

        <div className="flex justify-center xl:justify-end xl:flex-shrink-0 mt-2 xl:mt-0">
          <Image
            src="/nidhi-riley-hero.png"
            alt="Illustrated portrait of Nidhi smiling and holding her dog Riley, both wearing cozy sweaters"
            width={1122}
            height={1402}
            priority
            className="w-40 sm:w-48 md:w-56 xl:w-48 2xl:w-64 h-auto motion-safe:animate-hero-in motion-reduce:animate-none"
          />
        </div>
      </div>
    </Layout>
  );
}
