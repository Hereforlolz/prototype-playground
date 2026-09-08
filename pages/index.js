// 📁 /pages/index.js
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import { safeTrack } from '../lib/analytics';
import { HEADLINE, SUBTEXT, PROOF_POINTS, METRIC_LINE, METRIC_DISCLOSURE } from '../lib/homepage-content';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Nidhi Vedartham</title>
        <meta
          name="description"
          content="Software/electrical engineer working across embedded IoT, technical strategy, and applied AI — practical prototypes and honest write-ups of what breaks."
        />
      </Head>
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
          <Link
            href="/projects"
            onClick={() => safeTrack('homepage_cta_click', { destination: 'projects' })}
            className="font-display font-semibold bg-accent text-surface px-4 py-2 rounded-md hover:opacity-90 transition-opacity duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
          >
            View Projects &amp; Experiments
          </Link>
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
    </Layout>
  );
}
