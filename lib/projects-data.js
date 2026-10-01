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
// (a public repo, or a public case-study/demo page). Two of these
// (EphemeralAgentExecutor, SafeSakhi) describe genuinely private repos:
// the name and description are intentionally public portfolio content —
// written by hand, not fetched from the GitHub API — but there is no
// public case study or demo for them yet, so they deliberately have no
// `url` at all. The page must never synthesize a github.com link for
// these; showing "no repository is publicly accessible" is not the same
// failure as leaking API metadata, but it's just as real a way to
// mislead a visitor. This is different in kind from the privacy
// filtering below (filterPublicRepos, shouldFetchIssues), which exists
// to stop *automatically fetched* API data about private repos from
// ever reaching page props — that's prohibited outright. Hand-curated
// static text the account owner chose to publish about a private
// project is not that, and is fine. (GreenGrid used to be in this
// group too — its repo is now public, so it moved to the flagship
// group below with a real `url`.)
//
// Descriptions written from each repo's "About" line / README summary
// only — never from full README body text, since a couple of repos have
// had injected marketing text in READMEs before. GreenGrid's own README
// is a live example: it has an entire "Technology Licensing &
// Partnership Framework" section claiming "production-ready" status and
// a "$50B+ smart grid market," which contradicts the project's own
// Devpost writeup (an "initial demo focused on backend functionality"
// with intentionally basic UI) and isn't used anywhere in this file.
//
// `tier` drives grouping on /projects:
//   'flagship'    — exactly three, the most differentiated and highest-
//                   confidence projects, given the top visual slot.
//                   Each verified line-by-line against its real repo
//                   README (and, for TeamTrail, its Notion project
//                   notes). Dead Code Finder lives on GitLab, not
//                   GitHub, so it never gets a `liveRepo` match against
//                   the GitHub repo-list fetch; its `name` is a
//                   synthetic three-segment identifier specifically so
//                   it can never collide with a real GitHub
//                   `owner/repo` full_name.
//   'case-study'  — real, working projects with a full case study, but
//                   kept out of the primary flagship slot — either
//                   because the domain calls for a more measured
//                   presentation (CompassionateConnect, Therapist
//                   Dashboard both touch sensitive personal data) or
//                   because the project is less differentiated than the
//                   flagship three (GreenGrid). Rendered in a clearly
//                   secondary "More Case Studies" section, same card
//                   format as flagship, smaller heading weight.
//   'experiment'  — smaller single-purpose AI tools. Real, working, but
//                   secondary — not given the same visual weight as
//                   flagship or case-study projects.
//   (no tier)     — the private-repo entries (see note above); these are
//                   grouped separately again, by splitHighlightedProjects(),
//                   regardless of tier.
const HIGHLIGHTS = [
  {
    name: 'Hereforlolz/teamtrail',
    title: 'TeamTrail',
    tier: 'flagship',
    url: 'https://github.com/Hereforlolz/teamtrail',
    analyticsEvent: 'teamtrail_click',
    caseStudyHref: '/projects/teamtrail',
    blurb: "Helps new hires at a company find the context they need on day one, instead of spending their first week hunting through channels, DMs, and docs. It answers inside Slack, using what the workspace actually says right now, and tailors results to the person’s role. Along the way I debugged an AI making things up and a login problem on Windows. Built solo for the Slack Agent Builder Challenge 2026. Built with: Slack, Groq (LLaMA 3.3 70B), Notion.",
  },
  {
    name: 'Hereforlolz/qwen-memory-agent',
    title: 'Qwen MemoryAgent',
    tier: 'flagship',
    url: 'https://github.com/Hereforlolz/qwen-memory-agent',
    analyticsEvent: 'qwen_memoryagent_click',
    caseStudyHref: '/projects/qwen-memoryagent',
    blurb: "An AI assistant memory that doesn’t just save everything. It judges what is worth keeping, catches duplicate or contradictory facts before storing them, and reviews old memories before forgetting them instead of deleting on a timer. Built for the Qwen Cloud Hackathon, Track 1. Built with: Python (FastAPI), Qwen, Alibaba Cloud.",
  },
  {
    // Lives on GitLab, not GitHub — see the tier comment above.
    name: 'gitlab/gitlab-ai-hackathon/transcend',
    title: 'Dead Code Finder',
    tier: 'flagship',
    url: 'https://gitlab.com/gitlab-ai-hackathon/transcend/39335192',
    analyticsEvent: 'dead_code_finder_click',
    caseStudyHref: '/projects/dead-code-finder',
    blurb: "Finds code that nothing uses anymore, and says how sure it is: every finding is labeled Confident, Uncertain, or Skipped, instead of a flat yes or no. It never opens a merge request and never claims code is “safe to delete.” Two platform problems came up mid-build, so I added a clearly labeled fallback mode instead of letting it fail quietly. Built for the GitLab AI Hackathon (Transcend). Built with: GitLab Duo, GitLab’s code knowledge graph.",
  },
  {
    name: 'Hereforlolz/Compassionate-connect',
    title: 'CompassionateConnect AI',
    tier: 'case-study',
    url: 'https://github.com/Hereforlolz/Compassionate-connect',
    analyticsEvent: 'compassionateconnect_click',
    caseStudyHref: '/projects/compassionateconnect',
    blurb: "A prototype that helps with the first step of mental-health support: it asks intake questions, flags possible crisis signals, and writes summaries a therapist can read quickly. Safeguards were designed in from the start: no diagnoses, simulated data only, and a disclaimer on every insight. I also filed an issue in Google’s ADK documentation repository after hitting a tool bug, then worked around it. The project’s own README marks it “Archived / Demo Only”: a hackathon prototype, not a validated clinical tool. Built for the Google Cloud Multi-Agent (Agent Development Kit) Hackathon. Built with: Gemini 1.5 Flash, six cooperating AI agents.",
  },
  {
    name: 'Hereforlolz/GreenGrid',
    title: 'GreenGrid AI',
    tier: 'case-study',
    url: 'https://github.com/Hereforlolz/GreenGrid',
    analyticsEvent: 'greengrid_click',
    caseStudyHref: '/projects/greengrid',
    blurb: "Explores helping underserved households in Missouri cut their electric bills: it forecasts next-day energy use for a neighborhood and writes personalized, multilingual tips for saving. I built it solo and put a working end-to-end pipeline ahead of UI polish. Built for the AWS Breaking Barriers Virtual Challenge. Built with: AWS (IoT, S3, Lambda, SageMaker, Bedrock, Amplify), simulated smart-meter data.",
  },
  {
    name: 'Hereforlolz/Therapist-Dashboard-AWS',
    title: 'AI-Powered Therapist Dashboard',
    tier: 'case-study',
    url: 'https://github.com/Hereforlolz/Therapist-Dashboard-AWS',
    analyticsEvent: 'therapist_dashboard_click',
    caseStudyHref: '/projects/therapist-dashboard',
    // Kept short deliberately — authentication/security limitations live
    // in the case study, not on this card. See lib/case-studies.js for
    // why: a first pass here overstated this project's security and
    // validation posture ("HIPAA-aligned," "piloted"), corrected after
    // review.
    blurb: "Turns a therapist’s messy session notes into summaries and draft observations for the therapist to review. Tested by one practicing therapist using synthetic data. Built with: React, AWS Lambda, DynamoDB, Claude.",
  },
  {
    name: 'Hereforlolz/PilotCraft',
    title: 'PilotCraft',
    tier: 'case-study',
    url: 'https://github.com/Hereforlolz/PilotCraft',
    analyticsEvent: 'pilotcraft_click',
    caseStudyHref: '/projects/pilotcraft',
    blurb: "Helps a team decide whether AI is actually the right fix for a workplace problem. You describe the problem in plain language and get a report rating AI as a strong, conditional, or poor fit, with facts kept separate from assumptions and gaps, plus a phased pilot plan and a 0–100 readiness score. It has 74 passing tests and a live evaluation that checks real Gemini output against 7 deterministic checks. A personal tool, not a hackathon build, with no live deployment yet. Built with: Gemini.",
  },
  {
    name: 'Hereforlolz/ai-pitch-deck-generator',
    title: 'AI Pitch Deck Generator',
    tier: 'experiment',
    url: 'https://github.com/Hereforlolz/ai-pitch-deck-generator',
    demoHref: '/experiments/ai-pitch-deck-generator',
    blurb: "Type a topic and get a 6-slide, VC-style pitch deck. A built-in demo mode works offline with no accounts or keys. Built with: Anthropic API, Unsplash.",
  },
  {
    name: 'Hereforlolz/ai-content-generator',
    title: 'AI Content Generator',
    tier: 'experiment',
    url: 'https://github.com/Hereforlolz/ai-content-generator',
    demoHref: '/experiments/ai-content-generator',
    blurb: "Generates blog posts, social copy, email campaigns, and product descriptions from templates, with your choice of AI provider. A keyless Mock mode lets anyone try it. Built with: OpenAI, Claude, Gemini, or Hugging Face.",
  },
  {
    name: 'Hereforlolz/ai-existential-crisis-bot',
    title: 'AI Existential Crisis Bot',
    tier: 'experiment',
    url: 'https://github.com/Hereforlolz/ai-existential-crisis-bot',
    demoHref: '/experiments/ai-existential-crisis-bot',
    blurb: "Paste in some code and get an existential crisis back: a philosophical critique of how your code is structured. If every AI service fails, it falls back to canned answers so it still responds. Built with: Hugging Face, OpenRouter, Groq.",
  },
  {
    // No public repo for either of these two — they're single HTML files
    // handed over directly rather than pushed to GitHub, so there's
    // nothing to link as "View source." The live page is the only
    // artifact, same treatment as the private-repo entries below (no
    // `url`) but for a different reason. `name` uses the same synthetic,
    // slash-prefixed pattern as Dead Code Finder above, so it can never
    // collide with a real GitHub `owner/repo` full_name.
    name: 'local/dream-excuse-generator',
    title: 'Dream Excuse Generator',
    tier: 'experiment',
    demoHref: '/experiments/dream-excuse-generator',
    blurb: "Turns a boring excuse into an absurd, over-the-top one. Works out of the box with templates, or add your own OpenAI key for AI-written excuses.",
  },
  {
    name: 'local/tiktok-script-generator',
    title: 'TikTok Script Generator',
    tier: 'experiment',
    demoHref: '/experiments/tiktok-script-generator',
    blurb: "Drafts a TikTok script from any topic. Optionally pulls real news headlines with a News API key; bring your own AI provider key to write the script itself.",
  },
  {
    // Private repo — see the note above. No url: there is no public repo
    // or case-study page to send a visitor to yet.
    name: 'Hereforlolz/EphemeralAgentExecutor',
    title: 'Ephemeral Agent Executor',
    blurb: "A Python toolkit that runs AI helper programs safely: it cleans up after them, caps how much CPU and memory they can use, and shuts down any that run away before they eat your RAM.",
  },
  {
    // Private repo — see the note above.
    name: 'Hereforlolz/SafeSakhi',
    title: 'SafeSakhi',
    blurb: "An AI-driven women’s safety platform that can detect threats from live audio, movement, and the sentiment of text messages. Runs entirely on serverless AWS.",
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

// Splits curated highlights into four groups so /projects can give each
// one different visual weight:
//   flagship    — tier: 'flagship' (exactly three), rendered as the
//                 primary "Recent Highlights" cards.
//   caseStudies — tier: 'case-study', rendered in a secondary "More Case
//                 Studies" section — same card format as flagship, but
//                 not given the top slot.
//   experiments — tier: 'experiment', rendered in a clearly secondary
//                 "Experiments" section, not equal prominence to flagship.
//                 Needs a `url` (a repo to view source on) or a
//                 `demoHref` (a live /experiments/<slug> page on this
//                 site) or both — either is a real place to send a
//                 visitor, unlike the no-repo-yet entries below.
//   inProgress  — neither a `url` nor a `demoHref` (the known-private
//                 repos), regardless of tier. No public repo, case
//                 study, or live demo to send a visitor to yet, so they
//                 render in their own "In Progress" group rather than
//                 being hidden.
function splitHighlightedProjects(highlighted) {
  return {
    flagship: highlighted.filter(h => h.tier === 'flagship' && h.url),
    caseStudies: highlighted.filter(h => h.tier === 'case-study' && h.url),
    experiments: highlighted.filter(h => h.tier === 'experiment' && (h.url || h.demoHref)),
    inProgress: highlighted.filter(h => !h.url && !h.demoHref),
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
