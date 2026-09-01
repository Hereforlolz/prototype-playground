// lib/case-studies.js
//
// Full case-study content for the flagship projects (TeamTrail, Qwen
// MemoryAgent, Dead Code Finder, CompassionateConnect AI), kept as plain
// data — no JSX — so it's testable with Node's built-in test runner and
// reusable if the case study pages ever need to share layout. Every
// claim here is drawn from the projects' own repo READMEs (architecture,
// "Known gotchas"/"Known limitations"/"What I'd Do Differently"
// sections, test suites) — no invented user counts, adoption numbers,
// or benchmarks.
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

  deadCodeFinder: {
    slug: 'dead-code-finder',
    title: 'Dead Code Finder',
    subtitle: 'A GitLab Duo agent flow that finds genuinely unused code — and is explicit about what it can’t prove',
    tagline: 'Built for the GitLab AI Hackathon (Transcend)',
    repoUrl: 'https://gitlab.com/gitlab-ai-hackathon/transcend/39335192',
    devpostUrl: 'https://devpost.com/software/dead-code-finder',
    analyticsEvent: 'dead_code_finder_click',
    stack: [
      ['Platform', 'GitLab Duo Agent Platform — a custom "flow"'],
      ['Data source', "GitLab's own Orbit static call graph (query_graph / get_graph_schema)"],
      ['Fallback tools', 'list_repository_tree / get_repository_file / find_files / blob_search'],
      ['Independent verification', 'glab CLI (glab orbit remote query), run outside the flow'],
    ],
    problem: [
      'Most impact-analysis tools answer "what breaks if I change this." Nobody had a good answer to the narrower question, "is anyone calling this at all," with an honest confidence level attached instead of a blanket yes/no.',
      'Naive static analysis over-claims in both directions: it either declares something "safe to delete" with no real proof, or produces false positives on legitimate-but-unusual call patterns like decorator dispatch, test-framework reflection, and inheritance/MRO.',
    ],
    approach: [
      'Built as a GitLab Duo Agent Platform flow that queries Orbit’s real static call graph for CALLS/IMPORTS edges on every Definition node in the project, rather than pattern-matching source text.',
      'Every finding lands in one of three honest buckets instead of a binary: Confident (no incoming call/import edges anywhere), Uncertain (ambiguous cases like inheritance/MRO dispatch), or Skipped (decorator-based dispatch, test-framework reflection, hardware entry points — explicitly flagged as "cannot assess statically," never silently dropped).',
      'A hard behavioral constraint by design: the flow never deletes, renames, or modifies a file, never opens a merge request, and never says "safe to delete" — only "no reference found in the static call graph, here is exactly what was checked."',
      'Validated against a deliberately planted set of dead-code fixtures covering the genuinely hard cases: cross-file import resolution, inheritance/MRO dispatch, decorator-based dispatch, constructor/dunder handling on a real ~500-line class, and test-framework reflection discovery.',
    ],
    whatBroke: [
      'The platform’s own skill-injection mechanism was unreliable — the flow’s procedure file was correctly placed in the project, but at runtime sometimes arrived as just its manifest entry instead of the full procedure body. Fixed by inlining the full procedure directly into the system prompt as a guaranteed fallback, while still preferring the real injected skill whenever it loaded correctly.',
      'The Orbit graph-query tools were declared in the flow’s own configuration but came back unavailable at runtime — traced to an account-level GitLab Duo preference ("Custom Agents") that was off by default, not a platform or flow bug. Rather than silently degrading or guessing, the flow was built to detect the missing tools explicitly and switch to a clearly labeled file-based fallback mode, tagging every finding made that way as `[INFERRED]` since file-reading is weaker evidence than a real graph traversal.',
      'After the account toggle was fixed and the flow ran against the real graph, comparing its output to the actual source surfaced two genuine logic bugs: a standalone driver function that exercises an inheritance chain was wrongly bucketed as confidently dead (the exclusion rule for driver functions didn’t generalize to it), and a real, simple, single-hop call was missed by the graph traversal, traced to a separate numeric-ID precision issue and fixed with a single-ID re-check whenever an expected edge unexpectedly came back empty.',
    ],
    outcome: [
      'Before finding the account toggle, the file-based fallback mode’s guesses were independently checked against the real Orbit graph via the GitLab CLI, run completely outside the flow — every finding held up, including correctly telling apart a method reachable only through inheritance from one nobody calls at all.',
      'After both logic bugs were fixed, a second run against the real graph correctly reclassified both cases and exactly matched the earlier CLI-verified findings.',
      'The fallback mode’s disclosure habits — the labeled banner, the `[INFERRED]` tagging — were kept in the flow even after the underlying toggle was fixed, since skill injection can fail independently of Orbit access; treated as a standing resilience pattern, not a one-off patch.',
    ],
    scope:
      'A hackathon submission validated against Python specifically — other languages aren’t independently verified. It can’t detect transitively dead code (referenced only by other dead code), can’t see usage outside the project’s own indexed scope, can’t see references from non-code files like YAML or CI templates, and has no commit/MR age data available to distinguish "abandoned" from "new and not yet wired up."',
  },

  compassionateConnect: {
    slug: 'compassionateconnect',
    title: 'CompassionateConnect AI',
    subtitle: 'A multi-agent mental-health intake system with ethical guardrails built in from the start',
    tagline: 'Built for the Google Cloud Multi-Agent (Agent Development Kit) Hackathon — archived, demo only',
    repoUrl: 'https://github.com/Hereforlolz/Compassionate-connect',
    devpostUrl: 'https://devpost.com/software/compassionateconnect-ai',
    analyticsEvent: 'compassionateconnect_click',
    stack: [
      ['LLM', 'Gemini 1.5 Flash (google.generativeai / Vertex AI)'],
      ['Backend', 'FastAPI + Uvicorn, Python multi-agent architecture'],
      ['Storage', 'Firestore (real-time) + local JSON (offline demo + backup)'],
      ['Deploy', 'Render (intake form) + a separate CLI therapist dashboard'],
    ],
    problem: [
      'Intake paperwork at mental health clinics is repetitive and impersonal — patients re-explain the same concerns to multiple people, and clinicians often don’t get a usable summary before the first session.',
      'Crisis-relevant details can go unnoticed inside long, unstructured intake responses if nothing is specifically watching for them.',
    ],
    approach: [
      'Built as six independent agents with defined input/output contracts, sequenced by a coordinator: an onboarding coordinator, an intake-questionnaire agent (asks, validates, and clarifies responses in real time), a crisis-response agent (detects crisis indicators and logs high-priority cases), a summary-generator agent (therapist-friendly briefs), an insight agent (suggests possible therapy directions), and a data-persistence agent (Firestore plus local JSON).',
      'Ethical design was a stated constraint from the start, not an afterthought: no diagnoses — only directions for a therapist to evaluate — disclaimers embedded in every AI insight, simulated patient data only with no real PHI at any stage, and an explicit goal of augmenting clinicians rather than replacing them.',
      'Deliberately kept deployable from a terminal — a CLI-first design so a clinic without web developers or complex infrastructure could still run it.',
    ],
    whatBroke: [
      'Refactoring toward Google’s Agent Development Kit hit a persistent TypeError using FunctionTool in google-adk==1.2.1 that didn’t resolve across several attempted patterns (subclassing, direct instantiation, different argument orders). After documenting the full traceback and environment, it was filed as a bug against the official google/adk-python repo (issue #1331) rather than assumed to be a personal mistake, and development continued with a workaround. This is the same bug already tracked in this site’s own Manual Bugs Log.',
      'The CrisisResponseAgent and SummaryGeneratorAgent ended up sharing state in ways that created ordering dependencies between agents meant to be independent — recorded directly in the project’s own retrospective as a design lesson: a production version would need stricter input/output contracts and a message bus instead of direct agent-to-agent calls.',
      'The project’s GitHub history didn’t survive the hackathon intact — an account issue mid-build deleted the original repository, requiring a full re-upload to a new one before judging.',
    ],
    outcome: [
      'A working end-to-end flow was demoed live rather than just described: a deployed intake form (Render) feeding Firestore, plus a separate CLI therapist dashboard.',
      'Informal demo feedback was collected directly from practicing therapists and used to inform possible next steps, rather than guessing at clinical needs in isolation.',
      'The project’s own retrospective is unusually candid about what’s not yet proven: "No eval harness — I tracked whether the system ran, not whether the outputs were actually good," naming structured evaluation of summary quality and crisis-detection accuracy as required before any clinical use.',
    ],
    scope:
      'A hackathon submission the project’s own README marks "Archived / Demo Only." It ran on simulated patient data exclusively — no real PHI at any stage — and was never used with real patients or in a clinical setting. It is not a validated mental-health tool, and its own creator names the missing evaluation harness as a blocker to any clinical use.',
  },
};

module.exports = { CASE_STUDIES };
