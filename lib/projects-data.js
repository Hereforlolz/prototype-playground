// lib/projects-data.js
//
// Pure data layer for pages/projects.js — curated project content, GitHub
// fetch orchestration, and privacy-safe filtering, kept free of JSX/React
// on purpose so it can be tested with Node's built-in test runner with no
// build or transform step.
'use strict';

const GITHUB_USER = 'Hereforlolz';
const GITHUB_HEADERS = { Accept: 'application/vnd.github+json' };

// Curated, ranked by recency. Each entry owns its own url + description —
// these cards must render even if GitHub is down, rate-limited, or a repo
// is later made private. Live API data (open issue counts) is layered on
// top in buildHighlightedProjects() as an optional enhancement only, never
// a requirement for the card to appear.
//
// Descriptions written from each repo's "About" line / README summary
// only — never from full README body text, since a couple of repos have
// had injected marketing text in READMEs before.
const HIGHLIGHTS = [
  {
    name: 'Hereforlolz/ai-pitch-deck-generator',
    url: 'https://github.com/Hereforlolz/ai-pitch-deck-generator',
    blurb: 'AI pitch-deck generator — turns a topic into a 6-slide VC-style deck via the Anthropic API and Unsplash imagery, with a fully offline mock mode for when you don’t want to wire up keys.',
  },
  {
    name: 'Hereforlolz/ai-content-generator',
    url: 'https://github.com/Hereforlolz/ai-content-generator',
    blurb: 'AI content generator — blog posts, social copy, email campaigns, and product descriptions from templates plus your choice of OpenAI, Claude, Gemini, or Hugging Face, with a keyless Mock mode built in.',
  },
  {
    name: 'Hereforlolz/ai-existential-crisis-bot',
    url: 'https://github.com/Hereforlolz/ai-existential-crisis-bot',
    blurb: 'Paste in code, get an existential crisis back — pattern-matches your code structure and chains through Hugging Face, OpenRouter, and Groq for a philosophical critique, with canned fallbacks if every API fails.',
  },
  {
    name: 'Hereforlolz/teamtrail',
    url: 'https://github.com/Hereforlolz/teamtrail',
    blurb: 'AI onboarding agent for Slack — reads real workspace history via Slack’s Real-Time Search API and briefs new members with LLaMA 3.3 70B (Groq), citing actual sources instead of a static wiki. Built for the Slack Agent Builder Challenge 2026.',
  },
  {
    name: 'Hereforlolz/qwen-memory-agent',
    url: 'https://github.com/Hereforlolz/qwen-memory-agent',
    blurb: 'Persistent memory layer for AI agents — Qwen-scored importance, semantic search via pgvector, and "smart forgetting" instead of blunt TTL expiry. Built for the Qwen Cloud Hackathon, Track 1.',
  },
  {
    name: 'Hereforlolz/EphemeralAgentExecutor',
    url: 'https://github.com/Hereforlolz/EphemeralAgentExecutor',
    blurb: 'Python SDK for managing subprocess agents — automatic cleanup, CPU/memory resource limits, thread-safe execution, and a watchdog that kills runaway processes before they eat your RAM.',
  },
  {
    name: 'Hereforlolz/GreenGrid',
    url: 'https://github.com/Hereforlolz/GreenGrid',
    blurb: 'AI-powered neighborhood energy orchestration — AWS IoT Greengrass, SageMaker forecasting, and Bedrock-generated multilingual tips, aimed at cutting utility costs in underserved Missouri households.',
  },
  {
    name: 'Hereforlolz/SafeSakhi',
    url: 'https://github.com/Hereforlolz/SafeSakhi',
    blurb: 'AI-driven women’s safety platform — real-time audio threat detection, motion analysis, and text sentiment monitoring on a fully serverless AWS stack.',
  },
];

const HIGHLIGHT_NAMES = new Set(HIGHLIGHTS.map(h => h.name));

// Defense in depth: the public per-user repos endpoint should only ever
// return public repos, but never trust a single control — drop anything
// flagged private before it can reach page props for the public site.
function filterPublicRepos(repos) {
  return repos.filter(repo => !repo.private);
}

function shouldFetchIssues(repo) {
  return Boolean(repo.has_issues) && HIGHLIGHT_NAMES.has(repo.full_name);
}

// Always returns every curated highlight, in order — live repo data (if
// GitHub is up and the repo was found) is attached under `liveRepo`;
// otherwise `liveRepo` is null and the page renders the static content
// alone. Never filters a highlight out for lack of live data.
function buildHighlightedProjects(repos) {
  return HIGHLIGHTS.map(h => ({
    ...h,
    liveRepo: repos.find(r => r.full_name === h.name) || null,
  }));
}

function buildOtherRepos(repos) {
  return repos.filter(repo => !HIGHLIGHT_NAMES.has(repo.full_name));
}

function emptyLiveData(githubUnavailable) {
  return {
    repos: [],
    repoIssues: {},
    issuesFailed: {},
    githubUnavailable,
  };
}

// Fetches live GitHub data for the page. Never throws, and never returns
// raw API error text/objects to the caller — any failure (non-ok response
// or a thrown network error) collapses to the same safe, empty shape with
// githubUnavailable: true, which the page treats as "show curated content
// without live enhancements" rather than an error state to alarm visitors
// with.
//
// `repoIssues[name]` is only ever set on a successful fetch (to the actual
// issues array, possibly empty). `issuesFailed[name]` is set only when an
// issues fetch was attempted and failed. A repo with neither key means
// issues were never checked for it (not curated, or GitHub was down) —
// this is what keeps "checked, found zero" distinguishable from "couldn't
// check."
async function fetchProjectsPageProps(fetchImpl) {
  const doFetch = fetchImpl || fetch;

  try {
    const repoRes = await doFetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100`, {
      headers: GITHUB_HEADERS,
    });

    if (!repoRes.ok) {
      const errorText = await repoRes.text();
      console.error('Error fetching repos:', errorText);
      return emptyLiveData(true);
    }

    const allRepos = await repoRes.json();
    const repos = filterPublicRepos(allRepos);
    const repoIssues = {};
    const issuesFailed = {};

    for (const repo of repos) {
      if (!shouldFetchIssues(repo)) continue;

      try {
        const issuesRes = await doFetch(
          `https://api.github.com/repos/${repo.full_name}/issues?state=open`,
          { headers: GITHUB_HEADERS }
        );

        if (issuesRes.ok) {
          repoIssues[repo.full_name] = await issuesRes.json();
        } else {
          const failText = await issuesRes.text();
          console.error(`Error fetching issues for ${repo.full_name}:`, failText);
          issuesFailed[repo.full_name] = true;
        }
      } catch (issueErr) {
        console.error(`Error fetching issues for ${repo.full_name}:`, issueErr);
        issuesFailed[repo.full_name] = true;
      }
    }

    return { repos, repoIssues, issuesFailed, githubUnavailable: false };
  } catch (err) {
    console.error(err);
    return emptyLiveData(true);
  }
}

module.exports = {
  GITHUB_USER,
  HIGHLIGHTS,
  HIGHLIGHT_NAMES,
  filterPublicRepos,
  shouldFetchIssues,
  buildHighlightedProjects,
  buildOtherRepos,
  fetchProjectsPageProps,
};
