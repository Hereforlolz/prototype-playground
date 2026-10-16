// pages/projects.js
import Link from 'next/link';
import Layout from '../components/Layout';
import SeoHead from '../components/SeoHead';
import TerminalFrame from '../components/TerminalFrame';
import ClosingCTA from '../components/ClosingCTA';
import { safeTrack } from '../lib/analytics';
import { METRIC_LINE, METRIC_DISCLOSURE } from '../lib/homepage-content';
import manualBugs from '../bugs.json';
import {
  buildHighlightedProjects,
  buildOtherRepos,
  splitHighlightedProjects,
  fetchProjectsPageProps,
} from '../lib/projects-data';

export default function Projects({ repos, githubUnavailable }) {
  const highlighted = buildHighlightedProjects(repos);
  const { flagship, caseStudies, inProgress } = splitHighlightedProjects(highlighted);
  const rest = buildOtherRepos(repos);

  return (
    <Layout>
      <SeoHead
        title="Projects — Sreenidhi Vedartham Portfolio"
        description="Repos, hackathon builds, and a running log of open issues filed against my own and other people's tools."
        path="/projects"
      />
      <h1 className="font-display [text-wrap:balance] text-2xl sm:text-3xl font-bold text-text mb-4">
        Projects
      </h1>
      <p className="text-muted text-sm mb-6 max-w-prose">
        Starting with my work at Ivani, then the hackathon builds and write-ups. What each project does for people comes first; the tools used come at the end.
      </p>

      <nav aria-label="Jump to section" className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted mb-8">
        <a href="#impact" className="hover:text-accent transition-colors duration-150">Work at Ivani</a>
        <a href="#highlights" className="hover:text-accent transition-colors duration-150">Highlights</a>
        {caseStudies.length > 0 && (
          <a href="#case-studies" className="hover:text-accent transition-colors duration-150">Case Studies</a>
        )}
        <Link href="/playground" className="hover:text-accent transition-colors duration-150">Playground</Link>
        {inProgress.length > 0 && (
          <a href="#in-progress" className="hover:text-accent transition-colors duration-150">In Progress</a>
        )}
        {rest.length > 0 && (
          <a href="#all-repos" className="hover:text-accent transition-colors duration-150">All Repos</a>
        )}
        <a href="#bugs-log" className="hover:text-accent transition-colors duration-150">Bugs Log</a>
      </nav>

      {githubUnavailable && (
        <p className="text-muted text-sm mb-8 border border-border rounded-md px-3 py-2 bg-surface-alt w-fit">
          Live GitHub data temporarily unavailable — showing project info without it.
        </p>
      )}

      <section className="mb-12 max-w-3xl" id="impact">
        <h2 className="font-display text-xl font-bold text-text mb-1">Work at Ivani</h2>
        <p className="text-muted text-sm mb-4">
          Firmware and data work on a 1,000+ node IoT deployment, and helping the engineering team use AI better.
        </p>
        <TerminalFrame label="AI adoption impact" variant="featured">
          <p className="text-text font-medium">{METRIC_LINE}</p>
          <p className="text-muted text-xs mt-3 italic">
            {METRIC_DISCLOSURE} This is workplace AI-adoption work at Ivani, not one of the projects below.
          </p>
          <p className="text-sm mt-3">
            <Link href="/projects/prompt-engineering-adoption" className="text-accent hover:opacity-80 underline">
              Read the prompt-adoption case study →
            </Link>
            {' · '}
            <Link href="/about" className="text-accent hover:opacity-80 underline">
              Engineering at Ivani →
            </Link>
          </p>
        </TerminalFrame>
      </section>

      <section className="mb-12 max-w-3xl" id="highlights">
        <h2 className="font-display text-xl font-bold text-text mb-1">⭐ Recent Highlights</h2>
        <p className="text-muted text-sm mb-4">The most differentiated, hackathon-judged builds.</p>
        <div className="space-y-4">
          {flagship.map(({ name, title, url, blurb, analyticsEvent, caseStudyHref }) => (
            <TerminalFrame key={name} label={name} variant="featured">
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                onClick={() => safeTrack(analyticsEvent || 'project_link_click', { project: name })}
                className="font-display font-semibold text-text hover:text-accent transition-colors duration-150 inline-block"
              >
                {title}
                <span className="sr-only"> (opens in new tab)</span>
              </a>
              <p className="text-muted text-sm mt-2">{blurb}</p>
              {caseStudyHref && (
                <Link href={caseStudyHref} className="text-accent text-sm hover:opacity-80 underline inline-block mt-2">
                  Read the case study →
                </Link>
              )}
            </TerminalFrame>
          ))}
        </div>
      </section>

      {caseStudies.length > 0 && (
        <section className="mb-12 max-w-3xl" id="case-studies">
          <h2 className="font-display text-lg font-bold text-text mb-1">📚 More Case Studies</h2>
          <p className="text-muted text-sm mb-4">
            Additional working builds with detailed write-ups covering the problem, decisions, results, and limitations.
          </p>
          <div className="space-y-4">
            {caseStudies.map(({ name, title, url, liveUrl, blurb, analyticsEvent, caseStudyHref }) => (
              <TerminalFrame key={name} label={name}>
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => safeTrack(analyticsEvent || 'project_link_click', { project: name })}
                  className="font-display font-semibold text-sm text-text hover:text-accent transition-colors duration-150 inline-block"
                >
                  {title}
                  <span className="sr-only"> (opens in new tab)</span>
                </a>
                <p className="text-muted text-sm mt-2">{blurb}</p>
                <div className="flex flex-wrap gap-x-4 mt-2 text-sm">
                  {liveUrl && (
                    <a
                      href={liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => safeTrack(analyticsEvent || 'project_link_click', { project: name, source: 'live_demo' })}
                      className="text-accent hover:opacity-80 underline"
                    >
                      Try the live demo →
                      <span className="sr-only"> (opens in new tab)</span>
                    </a>
                  )}
                  {caseStudyHref && (
                    <Link href={caseStudyHref} className="text-accent hover:opacity-80 underline">
                      Read the case study →
                    </Link>
                  )}
                </div>
              </TerminalFrame>
            ))}
          </div>
        </section>
      )}

      <p className="text-muted text-sm mb-12 max-w-3xl" id="experiments">
        Looking for the smaller, playful tools? They live on the{' '}
        <Link href="/playground" className="text-accent hover:opacity-80 underline">Playground</Link>.
      </p>

      {inProgress.length > 0 && (
        <section className="mb-12 max-w-3xl" id="in-progress">
          <h2 className="font-display text-xl font-bold text-text mb-1">🔒 In Progress</h2>
          <p className="text-muted text-sm mb-4">
            Private prototypes with public write-ups — no repository link since there&apos;s nothing public to open yet.
          </p>
          <div className="space-y-4">
            {inProgress.map(({ name, title, blurb }) => (
              <TerminalFrame key={name} label={name}>
                <p className="font-display font-semibold text-text">{title}</p>
                <p className="text-muted text-sm mt-2">{blurb}</p>
                <p className="text-muted text-xs mt-2 italic">Private prototype — case study coming soon</p>
              </TerminalFrame>
            ))}
          </div>
        </section>
      )}

      {rest.length > 0 && (
        <section className="mb-12 max-w-3xl" id="all-repos">
          <details className="group">
            <summary className="flex items-center gap-2 cursor-pointer list-none font-display text-xl font-bold text-text mb-4 hover:text-accent transition-colors duration-150 [&::-webkit-details-marker]:hidden rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2">
              <span className="text-muted transition-transform duration-150 group-open:rotate-90" aria-hidden="true">▸</span>
              📂 All Other Repos
            </summary>
            <TerminalFrame label="All repos" variant="quiet">
              <ul className="space-y-3 text-sm">
                {rest.map(repo => (
                  <li key={repo.id}>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-text hover:text-accent hover:translate-x-1 transition-all duration-150 inline-block"
                    >
                      {repo.full_name}
                      <span className="sr-only"> (opens in new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </TerminalFrame>
          </details>
        </section>
      )}

      <section className="mb-12 max-w-3xl" id="bugs-log">
        <details className="group">
          <summary className="flex items-center gap-2 cursor-pointer list-none font-display text-xl font-bold text-text mb-4 hover:text-accent transition-colors duration-150 [&::-webkit-details-marker]:hidden rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2">
            <span className="text-muted transition-transform duration-150 group-open:rotate-90" aria-hidden="true">▸</span>
            🐞 Manual Bugs Log
          </summary>
          <TerminalFrame label="Bugs I've filed" variant="quiet">
            <div className="space-y-4 text-sm">
              {manualBugs.map((bug, index) => (
                <div key={index} className="hover:translate-x-1 transition-transform duration-150">
                  <p className="font-semibold text-text">{bug.title}</p>
                  <p className="text-muted text-xs mt-1">Why: {bug.why}</p>
                  <p className="text-muted text-xs">Status: {bug.status}</p>
                  {bug.link && (
                    <a
                      href={bug.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-accent hover:opacity-80 hover:underline text-xs"
                    >
                      View Report
                      <span className="sr-only"> (opens in new tab)</span>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </TerminalFrame>
        </details>
      </section>

      <ClosingCTA />
    </Layout>
  );
}

// Switched from getServerSideProps to getStaticProps + ISR.
// The old version fired an N+1 sequence of GitHub API calls (one per repo
// with issues enabled) on every single page visit — slow first load, and
// burns through GitHub's rate limit per-visitor instead of per-hour.
// With revalidate: 3600, Next.js serves the pre-built page instantly and
// regenerates it in the background at most once an hour, so a stale repo
// list is the tradeoff for a page that never makes a visitor wait on GitHub.
//
// The actual fetch/filter/privacy logic lives in lib/projects-data.js,
// kept free of JSX so it's testable with Node's built-in test runner.
export async function getStaticProps() {
  const props = await fetchProjectsPageProps();
  return {
    props,
    revalidate: 3600,
  };
}
