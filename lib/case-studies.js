// lib/case-studies.js
//
// Full case-study content for the two flagship projects (TeamTrail, Qwen
// MemoryAgent), kept as plain data — no JSX — so it's testable with Node's
// built-in test runner and reusable if the case study pages ever need to
// share layout. Every claim here is drawn from the projects' own repo
// READMEs (architecture, "Known gotchas"/"Known limitations" sections,
// test suites) — no invented user counts, adoption numbers, or benchmarks.
'use strict';

const CASE_STUDIES = {
  teamtrail: {
    slug: 'teamtrail',
    title: 'TeamTrail',
    subtitle: 'An AI-assisted Slack onboarding tool',
    tagline: 'Built and submitted solo for the Slack Agent Builder Challenge 2026',
    repoUrl: 'https://github.com/Hereforlolz/teamtrail',
    devpostUrl: 'https://devpost.com/software/teamtrail',
    analyticsEvent: 'teamtrail_click',
    stack: [
      ['Slack surface', "Agents & AI Apps — top-bar entry point and split pane, not a slash command"],
      ['Slack framework', 'Slack Bolt for JavaScript (Socket Mode)'],
      ['AI model', 'Groq API — LLaMA 3.3 70B Versatile'],
      ['Workspace search', 'Slack assistant.search.context (Real-Time Search API)'],
      ['Optional context', 'A locally-run Notion MCP server, merged into the same prompt'],
    ],
    problem: [
      'New team members ramping up in a Slack-heavy org spend their first days hunting for context scattered across channels, DMs, and docs — and nobody has time to hand-deliver it.',
      'A generic chatbot answering from a static knowledge base would go stale immediately; the answers needed to be grounded in what the workspace actually says, right now.',
    ],
    approach: [
      'Built as a native Slack "Agents & AI Apps" surface — a top-bar entry point with a dedicated split pane — rather than a slash command, since that’s the pattern Slack’s Assistant lifecycle is designed around.',
      'Role-based onboarding (Engineer, PM, Designer, Other), each mapped to a different set of search terms so the same pipeline surfaces relevant results for very different jobs.',
      "Every briefing and follow-up combines two live sources: Slack's Real-Time Search API (actual messages, files, users, and channels) and, optionally, a locally-run Notion MCP server for org docs — merged into one prompt to Groq's LLaMA 3.3 70B, with every claim backed by a clickable source citation.",
      'Stateful per-user context (role, topics already covered, questions already asked) so a follow-up question doesn’t make the bot repeat itself.',
      'Explicit fail-closed design: if the local Notion MCP server isn’t running or times out, briefings still work from Slack data alone instead of erroring or inventing an answer.',
    ],
    whatBroke: [
      '`app.use(assistant)` looked like the obvious way to register Slack’s `Assistant` class as Bolt middleware — it isn’t, and it crashed every incoming event with `middleware[toCallMiddlewareIndex] is not a function`. The framework’s actual entry point is `app.assistant(assistant)`, which converts it internally first.',
      'Replies sent via `say()` from inside a button-click handler didn’t reliably land in the live split-pane thread — they could post to the App Home History tab instead. Fixed by posting explicitly with `client.chat.postMessage`, targeting the thread’s channel and `thread_ts` directly.',
      'A naive `sources.slice(0, 5)` silently dropped Notion citations whenever Slack’s own message search returned five or more results first, even when Notion content was clearly used in the answer. The source formatter now reserves dedicated slots for Notion citations instead of truncating by array order.',
    ],
    outcome: [
      'Unit tests (`test_unit.js`, run with Node’s test runner) cover the pure logic pulled out of the bot — role matching, result formatting, citation labeling, rate limiting — and most of those cases are regressions of actual bugs found during manual testing, not generic filler coverage.',
      'Separate smoke-test scripts verify the Slack Real-Time Search integration and the Notion MCP tool names/response shapes directly against live APIs before trusting either in the bot.',
      'The README is explicit that its safeguards are mitigations, not guarantees: the prompt-injection guard and the "don’t invent a source" instruction both reduce, but don’t provably eliminate, the model citing something it shouldn’t.',
    ],
    scope:
      'A hackathon submission built and tested against a single Slack workspace, with per-user context persisted to a local JSON file rather than a database — solid for one always-running process, not yet built for multiple concurrent instances.',
  },

  qwenMemoryAgent: {
    slug: 'qwen-memoryagent',
    title: 'Qwen MemoryAgent',
    subtitle: 'A memory-agent prototype exploring responsible memory behavior',
    tagline: 'Built and shipped solo for the Qwen Cloud Hackathon (Global AI Hackathon), Track 1',
    repoUrl: 'https://github.com/Hereforlolz/qwen-memory-agent',
    devpostUrl: 'https://devpost.com/software/track-1-qwen-memoryagent',
    analyticsEvent: 'qwen_memoryagent_click',
    stack: [
      ['LLM + scoring', 'Qwen Cloud (qwen-plus)'],
      ['Embeddings', 'Qwen Cloud text-embedding-v3 (1024-dim)'],
      ['Vector DB', 'Neon PostgreSQL + pgvector'],
      ['Cache', 'Upstash Redis'],
      ['Backend', 'FastAPI + asyncpg'],
      ['Deploy', 'Alibaba Cloud ECS'],
    ],
    problem: [
      'Most AI chat is stateless — every session starts from zero, so an assistant either re-explains itself constantly or loses useful context after a few hours.',
      "Naively storing every message solves recall but not usefulness: without a way to weigh, deduplicate, and expire memories, a memory store just becomes noise an LLM has to wade through.",
    ],
    approach: [
      'A full pipeline runs on every turn: semantic recall of relevant past memories, retrieval into an importance-ordered context block, Qwen extracting structured facts from the new turn, Qwen scoring each fact’s importance (0.0–1.0), tiered TTL expiry based on that score, and a separate Qwen-arbitrated "smart forget" pass that reviews expired memories instead of deleting on a blunt timer.',
      'Weighted duplicate/conflict detection before anything is stored: candidates are ranked by a blended 60% similarity + 40% importance score; above 0.96 similarity it’s rejected outright as a duplicate, above 0.82 Qwen arbitrates whether the new fact should UPDATE the old one or stand as a NEW independent fact.',
      'The importance-scoring prompt bakes in two rules added after testing surfaced real failure modes: a specific fact (e.g. "grows cherry tomatoes and basil") must score at least as high as the general category it belongs to (e.g. "is a gardener"), and a person’s own name is floored at 0.6+ importance so it can’t accidentally expire within a day.',
      'The extraction prompt explicitly refuses to generate memories from absence-of-information statements, so the store doesn’t fill up with facts like "doesn’t have a car."',
      'Extraction and scoring run as a background task after the chat reply is already sent, so a user isn’t kept waiting on the embed/dedup/arbitrate/score chain for facts that don’t affect the answer they’re currently reading.',
    ],
    whatBroke: [
      'Early scoring treated a vague statement and the specific fact behind it as equally important, which meant vague summaries could outscore — and outlive — the concrete facts that actually made recall useful. Fixed by explicitly ranking specific facts at or above their general category in the scoring prompt.',
      'Without a floor, a person’s own name could be scored as casual conversation and expire within a day of being mentioned — an identity fact disappearing is a worse failure than almost anything else the memory store could get wrong, so names are now floored at 0.6+ importance.',
      'Because stored memories get re-injected into the system prompt of unrelated future sessions, a malicious message stored as a "memory" could otherwise function as a persistent, cross-session jailbreak. Both the recall and extraction prompts now explicitly frame all memory content as untrusted data to read, never instructions to follow.',
    ],
    outcome: [
      'An end-to-end test suite makes live HTTP calls against a running instance — local or the real Alibaba Cloud deployment — rather than mocking anything, covering health checks, store/recall, the importance-scoring calibration rules above, deduplication and conflict arbitration, negative-fact filtering, cross-session recall, and smart forget.',
      'The same suite includes a structural validation pass over the frontend that catches regressions like a hardcoded API endpoint, a leaked default credential in the login form, or a dynamic value interpolated into an inline event handler — before any of them reach the live deployment.',
      'The README is explicit that the prompt-injection hardening is "prompt-level defense-in-depth, not a hard guarantee" — LLM-based defenses reduce, but don’t eliminate, injection risk.',
    ],
    scope:
      'A hackathon submission deployed to a single Alibaba Cloud ECS instance for the Qwen Cloud Hackathon — real, working infrastructure (JWT auth, a real Postgres+pgvector store), but not a production, multi-tenant service.',
  },
};

module.exports = { CASE_STUDIES };
