// pages/highlights.js
import Link from 'next/link';
import Layout from '../components/Layout';
import SeoHead from '../components/SeoHead';
import TerminalFrame from '../components/TerminalFrame';
import ClosingCTA from '../components/ClosingCTA';
import { START_HERE } from '../lib/homepage-content';

export default function Highlights() {
  return (
    <Layout>
      <SeoHead
        title="Highlights: Sreenidhi Vedartham Portfolio"
        description="A curated starting point across projects, leadership, and side experiments: the clearest examples of the work, picked out from the fuller Projects and About pages."
        path="/highlights"
      />
      <h1 className="font-display [text-wrap:balance] text-2xl sm:text-3xl font-bold text-text mb-4">
        Highlights
      </h1>
      <p className="text-muted text-sm mb-8 max-w-prose">
        A short, curated path through the work (engineering, leadership, and a few side experiments) picked out
        as the clearest examples. For the full list of projects, see{' '}
        <Link href="/projects" className="text-accent hover:opacity-80 underline">Projects</Link>; for the full
        story behind the leadership and marketing work, see{' '}
        <Link href="/about" className="text-accent hover:opacity-80 underline">About</Link>.
      </p>

      <div className="space-y-4 max-w-2xl">
        {START_HERE.map(({ href, title, detail }) => (
          <TerminalFrame key={href} label={title} variant="featured">
            <Link
              href={href}
              className="font-display font-semibold text-accent hover:opacity-80 underline"
            >
              {title} →
            </Link>
            <p className="text-muted text-sm mt-2">{detail}</p>
          </TerminalFrame>
        ))}
      </div>

      <div className="mt-12 max-w-2xl">
        <ClosingCTA />
      </div>
    </Layout>
  );
}
