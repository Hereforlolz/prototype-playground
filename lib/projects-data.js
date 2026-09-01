// lib/projects-data.js
//
// Pure data layer for pages/projects.js — curated project content, GitHub
// fetch orchestration, and privacy-safe filtering, kept free of JSX/React
// on purpose so it can be tested with Node's built-in test runner with no
// build or transform step.
'use strict';

const GITHUB_USER = 'Hereforlolz';
const GITHUB_HEADERS = { Accept: 'application/vnd.github+json' };

// Curated, ranked by recency. Each entry owns its own description — these
// cards must render even if GitHub is down, rate-limited, or a repo is
// later made private. Live API data (open issue counts) is layered on top
// in buildHighlightedProjects() as an optional enhancement only, never a
// requirement for the card to appear.
//
// `url` is only set when it points somewhere a visitor can actually reach
// (a public repo, or a public case-study/demo page). Three of these
// (EphemeralAgentExecutor, GreenGrid, SafeSakhi) describe genuinely
// private repos: the name and description are intentionally public
// portfolio content — written by hand, not fetched from the GitHub API —
// but there is no public case study or demo for them yet, so they
// deliberately have no `url` at all. The page must never synthesize a
// github.com link for these; showing "no repository is publicly
// accessible" is not the same failure as leaking API metadata, but it's
// just as real a way to mislead a visitor. This is different in kind from
// the privacy filtering below (filterPublicRepos, shouldFetchIssues),
// which exists to stop *automatically fetched* API data about private
// repos from ever reaching page props — that's prohibited outright.
// Hand-curated static text the account owner chose to publish about a
// private project is not that, and is fine.
//
// Descriptions written from each repo's "About" line / README summary
// only — never from full README body text, since a couple of repos have
// had injected marketing text in READMEs before.
//
// `tier` drives grouping on /projects:
//   'flagship'   — the hackathon-judged, most differentiated projects,
//                  framed around AI adoption/enablement rather than as
//                  generic demos. Each verified line-by-line against its
//                  real repo README (and, for TeamTrail, its Notion
//                  project notes). One of these — Dead Code Finder —
//                  lives on GitLab, not GitHub, so it never gets a
//                  `liveRepo` match against the GitHub repo-list fetch;
//                  its `name` is a synthetic three-segment identifier
//                  specifically so it can never collide with a real
//                  GitHub `owner/repo` full_name.
//   'experiment' — smaller single-purpose AI tools. Real, working, but
//                  secondary — not given the same visual weight as the
//                  flagship projects.
//   (no tier)    — the private-repo entries (see note above); these are
//                  grouped separately again, by splitHighlightedProjects(),
//                  regardless of tier.
const HIGHLIGHTS = [
  {
    name: 'Hereforlolz/teamtrail',
    title: 'TeamTrail',
    tier: 'flagship',
    url: 'https://github.com/Hereforlolz/teamtrail',
    analyticsEvent: 'teamtrail_click',
    caseStudyHref: '/projects/teamtrail',
    blurb: 'An AI-assisted Slack onboarding tool — built on Slack Bolt (Socket Mode) and Groq’s LLaMA 3.3 70B, with a Notion MCP integration for cross-source context. Helps new team members find real organizational context and get productive faster. Debugged a hallucination issue and a Windows Notion-MCP auth problem along the way. Built for the Slack Agent Builder Challenge 2026.',
  },
  {
    name: 'Hereforlolz/qwen-memory-agent',
    title: 'Qwen MemoryAgent',
    tier: 'flagship',
    url: 'https://github.com/Hereforlolz/qwen-memory-agent',
    analyticsEvent: 'qwen_memoryagent_click',
    caseStudyHref: '/projects/qwen-memoryagent',
    blurb: 'A memory-agent prototype exploring weighted deduplication, conflict arbitration, and intentional forgetting, rather than storing every interaction indefinitely. FastAPI backend on Alibaba Cloud ECS: Qwen-scored importance drives tiered expiry, a weighted similarity+importance check catches duplicates and conflicting facts before they’re stored, and a Qwen-adjudicated “smart forget” pass reviews expired memories instead of deleting on a blunt timer. Built for the Qwen Cloud Hackathon, Track 1.',
  },
  {
    // Lives on GitLab, not GitHub — see the tier comment above.
    name: 'gitlab/gitlab-ai-hackathon/transcend',
    title: 'Dead Code Finder',
    tier: 'flagship',
    url: 'https://gitlab.com/gitlab-ai-hackathon/transcend/39335192',
    analyticsEvent: 'dead_code_finder_click',
    caseStudyHref: '/projects/dead-code-finder',
    blurb: 'A GitLab Duo agent flow that queries GitLab’s own Orbit knowledge graph to find genuinely unused code, sorting every finding into Confident / Uncertain / Skipped buckets instead of a blanket yes/no — and never opens a merge request or claims anything is “safe to delete.” Hit and fixed two platform-level gaps mid-build (unreliable skill injection, a disabled account setting blocking graph access) by building an explicit, clearly-labeled fallback mode rather than silently degrading. Built for the GitLab AI Hackathon (Transcend).',
  },
  {
    name: 'Hereforlolz/Compassionate-connect',
    title: 'CompassionateConnect AI',
    tier: 'flagship',
    url: 'https://github.com/Hereforlolz/Compassionate-connect',
    analyticsEvent: 'compassionateconnect_click',
    caseStudyHref: '/projects/compassionateconnect',
    blurb: 'A six-agent mental-health intake system — Gemini 1.5 Flash agents handle questioning, crisis-indicator detection, therapist-friendly summaries, and non-diagnostic insight generation, with ethical guardrails (no diagnoses, simulated data only, disclaimers on every insight) built in from the start, not bolted on after. Filed a reproducible bug against Google’s official adk-python repo along the way. The project’s own README marks it “Archived / Demo Only” — a hackathon prototype, not a validated clinical tool. Built for the Google Cloud Multi-Agent (Agent Development Kit) Hackathon.',
  },
  {
    name: 'Hereforlolz/ai-pitch-deck-generator',
    title: 'AI Pitch Deck Generator',
    tier: 'experiment',
    url: 'https://github.com/Hereforlolz/ai-pitch-deck-generator',
    blurb: 'AI pitch-deck generator — turns a topic into a 6-slide VC-style deck via the Anthropic API and Unsplash imagery, with a fully offline mock mode for when you don’t want to wire up keys.',
  },
  {
    name: 'Hereforlolz/ai-content-generator',
    title: 'AI Content Generator',
    tier: 'experiment',
    url: 'https://github.com/Hereforlolz/ai-content-generator',
    blurb: 'AI content generator — blog posts, social copy, email campaigns, and product descriptions from templates plus your choice of OpenAI, Claude, Gemini, or Hugging Face, with a keyless Mock mode built in.',
  },
  {
    name: 'Hereforlolz/ai-existential-crisis-bot',
    title: 'AI Existential Crisis Bot',
    tier: 'experiment',
    url: 'https://github.com/Hereforlolz/ai-existential-crisis-bot',
    blurb: 'Paste in code, get an existential crisis back — pattern-matches your code structure and chains through Hugging Face, OpenRouter, and Groq for a philosophical critique, with canned fallbacks if every API fails.',
  },
  {
    // Private repo — see the note above. No url: there is no public repo
    // or case-study page to send a visitor to yet.
    name: 'Hereforlolz/EphemeralAgentExecutor',
    title: 'Ephemeral Agent Executor',
    blurb: 'Python SDK for managing subprocess agents — automatic cleanup, CPU/memory resource limits, thread-safe execution, and a watchdog that kills runaway processes before they eat your RAM.',
  },
  {
    // Private repo — see the note above.
    name: 'Hereforlolz/GreenGrid',
    title: 'GreenGrid',
    blurb: 'AI-powered neighborhood energy orchestration — AWS IoT Greengrass, SageMaker forecasting, and Bedrock-generated multilingual tips, aimed at cutting utility costs in underserved Missouri households.',
  },
  {
    // Private repo — see the note above.
    name: 'Hereforlolz/SafeSakhi',
    title: 'SafeSakhi',
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

// Splits curated highlights into three groups so /projects can give each
// one different visual weight:
//   flagship    — tier: 'flagship', rendered as the primary "Recent
//                 Highlights" cards.
//   experiments — tier: 'experiment', rendered in a clearly secondary
//                 "Experiments" section, not equal prominence to flagship.
//   inProgress  — no url at all (the known-private repos), regardless of
//                 tier. No public repo or case study to send a visitor to
//                 yet, so they render in their own "In Progress" group
//                 rather than being hidden.
function splitHighlightedProjects(highlighted) {
  return {
    flagship: highlighted.filter(h => h.tier === 'flagship' && h.url),
    experiments: highlighted.filter(h => h.tier === 'experiment' && h.url),
    inProgress: highlighted.filter(h => !h.url),
  };
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
  splitHighlightedProjects,
  fetchProjectsPageProps,
};
