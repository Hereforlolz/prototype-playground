// pages/playground.js
import Layout from '../components/Layout';
import SeoHead from '../components/SeoHead';
import TerminalFrame from '../components/TerminalFrame';
import ClosingCTA from '../components/ClosingCTA';
import { safeTrack } from '../lib/analytics';
import { EXPERIMENTS, FEATURED_EXPERIMENT } from '../lib/experiments';

// Full page loads (plain <a>) on purpose: each experiment is a standalone
// tool that needs a fresh JS realm. See pages/experiments/[slug].js.
function TryLink({ slug, title, className }) {
  return (
    <a
      href={`/experiments/${slug}`}
      onClick={() => safeTrack('experiment_demo_click', { project: slug })}
      className={className}
    >
      Try it →<span className="sr-only"> {title}</span>
    </a>
  );
}

export default function Playground() {
  const featured = EXPERIMENTS[FEATURED_EXPERIMENT];
  const others = Object.entries(EXPERIMENTS).filter(([slug]) => slug !== FEATURED_EXPERIMENT);

  return (
    <Layout>
      <SeoHead
        title="Playground: Sreenidhi Vedartham Portfolio"
        description="Small, playful AI tools I built to experiment with. Some work with no setup, and some need your own API key."
        path="/playground"
      />
      <h1 className="font-display [text-wrap:balance] text-2xl sm:text-3xl font-bold text-text mb-4">Playground</h1>
      <p className="text-muted text-sm mb-8 max-w-prose">
        Small AI tools I built to experiment with. They are playful and secondary to the projects, and each one works a
        little differently, so the notes below say how to try it.
      </p>

      <section className="mb-12 max-w-3xl" id="featured">
        <h2 className="font-display text-xl font-bold text-text mb-1">Worth trying first</h2>
        <TerminalFrame label={FEATURED_EXPERIMENT} variant="featured">
          <p className="font-display font-semibold text-text">{featured.title}</p>
          <p className="text-muted text-sm mt-2">{featured.intro}</p>
          <p className="text-muted text-sm mt-2">
            It helped me save a lot of time coming up with a starting template for internal stakeholder meetings.
          </p>
          <p className="text-muted text-sm mt-2">
            <span className="text-text font-medium">How to try it:</span> {featured.howToTry}
          </p>
          <p className="text-sm mt-3">
            <TryLink
              slug={FEATURED_EXPERIMENT}
              title={featured.title}
              className="text-accent hover:opacity-80 underline"
            />
          </p>
        </TerminalFrame>
      </section>

      <section className="mb-12 max-w-3xl" id="more">
        <h2 className="font-display text-lg font-bold text-text mb-4">More experiments</h2>
        <div className="space-y-3">
          {others.map(([slug, { title, intro, howToTry }]) => (
            <TerminalFrame key={slug} label={slug}>
              <p className="font-display font-medium text-sm text-text">{title}</p>
              <p className="text-muted text-sm mt-2">{intro}</p>
              <p className="text-muted text-sm mt-2">
                <span className="text-text font-medium">How to try it:</span> {howToTry}
              </p>
              <p className="text-sm mt-2">
                <TryLink slug={slug} title={title} className="text-accent hover:opacity-80 underline" />
              </p>
            </TerminalFrame>
          ))}
        </div>
      </section>

      <ClosingCTA />
    </Layout>
  );
}
