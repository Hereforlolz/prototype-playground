// pages/projects.js
import Head from 'next/head';
import Layout from '../components/Layout';
import TerminalFrame from '../components/TerminalFrame';
import manualBugs from '../bugs.json';

// Curated, ranked by recency. Descriptions written from each repo's
// "About" line / README summary only — never from full README body text,
// since a couple of repos have had injected marketing text in READMEs before.
const HIGHLIGHTS = [
  {
    name: 'Hereforlolz/ai-pitch-deck-generator',
    blurb: 'AI pitch-deck generator — turns a topic into a 6-slide VC-style deck via the Anthropic API and Unsplash imagery, with a fully offline mock mode for when you don’t want to wire up keys.',
  },
  {
    name: 'Hereforlolz/ai-content-generator',
    blurb: 'AI content generator — blog posts, social copy, email campaigns, and product descriptions from templates plus your choice of OpenAI, Claude, Gemini, or Hugging Face, with a keyless Mock mode built in.',
  },
  {
    name: 'Hereforlolz/ai-existential-crisis-bot',
    blurb: 'Paste in code, get an existential crisis back — pattern-matches your code structure and chains through Hugging Face, OpenRouter, and Groq for a philosophical critique, with canned fallbacks if every API fails.',
  },
  {
    name: 'Hereforlolz/teamtrail',
    blurb: 'AI onboarding agent for Slack — reads real workspace history via Slack\u2019s Real-Time Search API and briefs new members with LLaMA 3.3 70B (Groq), citing actual sources instead of a static wiki. Built for the Slack Agent Builder Challenge 2026.',
  },
  {
    name: 'Hereforlolz/qwen-memory-agent',
    blurb: 'Persistent memory layer for AI agents — Qwen-scored importance, semantic search via pgvector, and "smart forgetting" instead of blunt TTL expiry. Built for the Qwen Cloud Hackathon, Track 1.',
  },
  {
    name: 'Hereforlolz/EphemeralAgentExecutor',
    blurb: 'Python SDK for managing subprocess agents — automatic cleanup, CPU/memory resource limits, thread-safe execution, and a watchdog that kills runaway processes before they eat your RAM.',
  },
  {
    name: 'Hereforlolz/GreenGrid',
    blurb: 'AI-powered neighborhood energy orchestration — AWS IoT Greengrass, SageMaker forecasting, and Bedrock-generated multilingual tips, aimed at cutting utility costs in underserved Missouri households.',
  },
  {
    name: 'Hereforlolz/SafeSakhi',
    blurb: 'AI-driven women\u2019s safety platform — real-time audio threat detection, motion analysis, and text sentiment monitoring on a fully serverless AWS stack.',
  },
];

const HIGHLIGHT_NAMES = new Set(HIGHLIGHTS.map(h => h.name));

export default function Projects({ repos, repoIssues, issuesFailed, error }) {
  const highlighted = HIGHLIGHTS
    .map(h => ({ ...h, repo: repos.find(r => r.full_name === h.name) }))
    .filter(h => h.repo);
  const rest = repos.filter(repo => !HIGHLIGHT_NAMES.has(repo.full_name));

  return (
    <Layout>
      <Head>
        <title>Projects — Nidhi // Void Tinkerer</title>
        <meta
          name="description"
          content="Repos, hackathon builds, and a running log of open issues filed against my own and other people's tools."
        />
      </Head>
      <h1 className="text-3xl font-black tracking-tight uppercase text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-8">
        🧪 My Repos &amp; Bugs Lab
      </h1>

      {error && (
        <p className="text-red-400 mb-4 font-mono text-sm">Error loading repos/issues: {error}</p>
      )}

      <section className="mb-12 max-w-3xl">
        <TerminalFrame label="PROMPT_ENGINEERING_IMPACT">
          <div className="flex flex-wrap gap-8 text-sm">
            <div>
              <p className="text-2xl font-black text-pink-400">~50%</p>
              <p className="text-slate-400 mt-1">rework reduction from refined prompt engineering practices</p>
            </div>
            <div>
              <p className="text-2xl font-black text-cyan-400">~8 min</p>
              <p className="text-slate-400 mt-1">saved per query</p>
            </div>
          </div>
        </TerminalFrame>
      </section>

      {highlighted.length > 0 && (
        <section className="mb-12 max-w-3xl">
          <h2 className="text-xl font-bold text-slate-200 mb-1">⭐ Recent Highlights</h2>
          <p className="text-slate-500 text-sm mb-4">Most recent work, roughly newest first.</p>
          <div className="space-y-4">
            {highlighted.map(({ repo, blurb }) => (
              <TerminalFrame key={repo.id} label={repo.full_name}>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-sm text-pink-400 hover:text-pink-300 hover:translate-x-1 transition-all duration-150 inline-block"
                >
                  {repo.full_name}
                </a>
                <p className="text-slate-400 text-sm mt-2">{blurb}</p>
                <div className="mt-3 text-xs space-y-1">
                  {repoIssues[repo.full_name]?.length > 0 ? (
                    repoIssues[repo.full_name].map(issue => (
                      <p key={issue.id}>
                        <a
                          href={issue.html_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-slate-400 hover:text-pink-400 hover:underline"
                        >
                          #{issue.number}: {issue.title}
                        </a>
                      </p>
                    ))
                  ) : issuesFailed[repo.full_name] ? (
                    <p className="text-yellow-600">⚠ Couldn&apos;t load issues for this repo — try again later</p>
                  ) : (
                    <p className="text-slate-600">No open issues found</p>
                  )}
                </div>
              </TerminalFrame>
            ))}
          </div>
        </section>
      )}

      <section className="mb-12 max-w-3xl">
        <h2 className="text-xl font-bold text-slate-200 mb-4">📂 All Other Repos</h2>
        <TerminalFrame label="REPO_INDEX">
          <ul className="space-y-3 text-sm">
            {rest.map(repo => (
              <li key={repo.id}>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-300 hover:text-pink-400 hover:translate-x-1 transition-all duration-150 inline-block"
                >
                  {repo.full_name}
                </a>
                <ul className="ml-4 mt-1 text-xs space-y-1">
                  {repoIssues[repo.full_name]?.length > 0 ? (
                    repoIssues[repo.full_name].map(issue => (
                      <li key={issue.id}>
                        <a
                          href={issue.html_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-slate-500 hover:text-pink-400 hover:underline"
                        >
                          #{issue.number}: {issue.title}
                        </a>
                      </li>
                    ))
                  ) : issuesFailed[repo.full_name] ? (
                    <li className="text-yellow-600">⚠ Couldn&apos;t load issues for this repo — try again later</li>
                  ) : (
                    <li className="text-slate-600">No open issues found</li>
                  )}
                </ul>
              </li>
            ))}
          </ul>
        </TerminalFrame>
      </section>

      <section className="max-w-3xl">
        <h2 className="text-xl font-bold text-slate-200 mb-4">🐞 Manual Bugs Log</h2>
        <TerminalFrame label="EXTERNAL_ISSUES_TRACKED">
          <div className="space-y-4 text-sm">
            {manualBugs.map((bug, index) => (
              <div key={index} className="hover:translate-x-1 transition-transform duration-150">
                <p className="font-semibold text-slate-200">{bug.title}</p>
                <p className="text-slate-500 text-xs mt-1">Why: {bug.why}</p>
                <p className="text-slate-500 text-xs">Status: {bug.status}</p>
                {bug.link && (
                  <a
                    href={bug.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-pink-400 hover:text-pink-300 hover:underline text-xs"
                  >
                    View Report
                  </a>
                )}
              </div>
            ))}
          </div>
        </TerminalFrame>
      </section>
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
export async function getStaticProps() {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return {
      props: {
        repos: [],
        repoIssues: {},
        issuesFailed: {},
        error: 'Missing GITHUB_TOKEN.',
      },
      revalidate: 3600,
    };
  }

  try {
    const repoRes = await fetch('https://api.github.com/user/repos?per_page=100', {
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github+json',
      },
    });

    if (!repoRes.ok) {
      const errorText = await repoRes.text();
      console.error('Error fetching repos:', errorText);
      return {
        props: {
          repos: [],
          repoIssues: {},
          issuesFailed: {},
          error: errorText,
        },
        revalidate: 3600,
      };
    }

    const repos = await repoRes.json();
    const repoIssues = {};
    const issuesFailed = {};

    for (const repo of repos) {
      if (repo.has_issues) {
        try {
          const issuesRes = await fetch(
            `https://api.github.com/repos/${repo.full_name}/issues?state=open`,
            {
              headers: {
                Authorization: `token ${token}`,
                Accept: 'application/vnd.github+json',
              },
            }
          );

          if (issuesRes.ok) {
            const issues = await issuesRes.json();
            repoIssues[repo.full_name] = issues;
          } else {
            const failText = await issuesRes.text();
            console.error(`Error fetching issues for ${repo.full_name}:`, failText);
            repoIssues[repo.full_name] = [];
            issuesFailed[repo.full_name] = true;
          }
        } catch (issueErr) {
          console.error(`Error fetching issues for ${repo.full_name}:`, issueErr);
          repoIssues[repo.full_name] = [];
          issuesFailed[repo.full_name] = true;
        }
      } else {
        repoIssues[repo.full_name] = [];
      }
    }

    return {
      props: {
        repos,
        repoIssues,
        issuesFailed,
        error: null,
      },
      revalidate: 3600,
    };
  } catch (err) {
    console.error(err);
    return {
      props: {
        repos: [],
        repoIssues: {},
        issuesFailed: {},
        error: err.message,
      },
      revalidate: 3600,
    };
  }
}
