// pages/projects.js
import Head from 'next/head';
import { track } from '@vercel/analytics';
import Layout from '../components/Layout';
import TerminalFrame from '../components/TerminalFrame';
import ClosingCTA from '../components/ClosingCTA';
import manualBugs from '../bugs.json';
import {
  buildHighlightedProjects,
  buildOtherRepos,
  splitHighlightedProjects,
  fetchProjectsPageProps,
} from '../lib/projects-data';

export default function Projects({ repos, githubUnavailable }) {
  const highlighted = buildHighlightedProjects(repos);
  const { available, inProgress } = splitHighlightedProjects(highlighted);
  const rest = buildOtherRepos(repos);

  return (
    <Layout>
      <Head>
        <title>Projects &amp; Experiments — Nidhi Vedartham</title>
        <meta
          name="description"
          content="Repos, hackathon builds, and a running log of open issues filed against my own and other people's tools."
        />
      </Head>
      <h1 className="font-display [text-wrap:balance] text-2xl sm:text-3xl font-bold text-text mb-8">
        Projects &amp; Experiments
      </h1>

      {githubUnavailable && (
        <p className="text-muted text-sm mb-8 border border-border rounded-md px-3 py-2 bg-surface-alt w-fit">
          Live GitHub data temporarily unavailable — showing project info without it.
        </p>
      )}

      <section className="mb-12 max-w-3xl">
        <TerminalFrame label="Prompt engineering impact">
          <div className="flex flex-wrap gap-8 text-sm">
            <div>
              <p className="text-2xl font-black text-accent">~50%</p>
              <p className="text-muted mt-1">rework reduction from refined prompt engineering practices</p>
            </div>
            <div>
              <p className="text-2xl font-black text-accent">~8 min</p>
              <p className="text-muted mt-1">saved per query</p>
            </div>
          </div>
        </TerminalFrame>
      </section>

      <section className="mb-12 max-w-3xl">
        <h2 className="font-display text-xl font-bold text-text mb-1">⭐ Recent Highlights</h2>
        <p className="text-muted text-sm mb-4">Most differentiated work first.</p>
        <div className="space-y-4">
          {available.map(({ name, title, url, blurb }) => (
            <TerminalFrame key={name} label={name}>
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                onClick={() => track('project_link_click', { project: name })}
                className="font-display font-semibold text-text hover:text-accent transition-colors duration-150 inline-block"
              >
                {title}
                <span className="sr-only"> (opens in new tab)</span>
              </a>
              <p className="text-muted text-sm mt-2">{blurb}</p>
            </TerminalFrame>
          ))}
        </div>
      </section>

      {inProgress.length > 0 && (
        <section className="mb-12 max-w-3xl">
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
        <section className="mb-12 max-w-3xl">
          <h2 className="font-display text-xl font-bold text-text mb-4">📂 All Other Repos</h2>
          <TerminalFrame label="All repos">
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
        </section>
      )}

      <section className="mb-12 max-w-3xl">
        <h2 className="font-display text-xl font-bold text-text mb-4">🐞 Manual Bugs Log</h2>
        <TerminalFrame label="Bugs I've filed">
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
