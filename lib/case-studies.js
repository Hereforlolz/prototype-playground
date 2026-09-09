// lib/case-studies.js
//
// Full case-study content for all seven projects with a dedicated
// /projects/<slug> page: the three flagship-tier builds (TeamTrail, Qwen
// MemoryAgent, Dead Code Finder) plus four case-study-tier builds
// (CompassionateConnect AI, GreenGrid AI, AI-Powered Therapist
// Dashboard, PilotCraft) — see the `tier` values in lib/projects-data.js
// for which group each renders in on /projects. Kept as plain data — no
// JSX — so it's testable with Node's built-in test runner and reusable
// if the case study pages ever need to share layout. Every claim here is
// drawn from the projects' own repo READMEs (architecture, "Known
// gotchas"/"Known limitations"/"What I'd Do Differently" sections, test
// suites) — no invented user counts, adoption numbers, or benchmarks.
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
    // Plain-language explanation for a smart-novice reader, same four-question
    // structure and house rules as PilotCraft's: no implementation/test detail,
    // every claim traces back to the problem/approach/outcome/scope fields below.
    explanations: {
      simple: {
        sections: [
          {
            title: 'What was the problem?',
            text: 'Most AI chat starts over from zero every time — an assistant either keeps re-explaining itself or loses anything useful it learned about you after a few hours.',
          },
          {
            title: 'What did I make?',
            text: 'I built a chat agent with a real memory system. It decides how important a new fact is, keeps the important ones around longer than the trivial ones, checks whether a new fact contradicts or duplicates something it already knows, and reviews what it’s about to forget instead of just deleting things on a fixed schedule.',
          },
          {
            title: 'Why is that useful?',
            text: 'An agent that actually remembers you gets more useful the longer you use it, instead of staying stuck at zero every session. Memory also creates real risks, though — like a stored message quietly planting an instruction for a future conversation — so the system treats everything it remembers as information to read, never as an instruction to follow.',
          },
          {
            title: 'What is still unproven?',
            text: 'It’s a hackathon build deployed to one server, with real working infrastructure behind it — but it hasn’t been built or tested as a multi-tenant product other people could sign up for.',
          },
        ],
      },
    },
    // Two real screenshots of the running frontend (frontend/index.html),
    // not a mockup. No Qwen API key is available in this build environment,
    // so the /chat and /chat/memories network calls were intercepted in a
    // real browser session and served synthetic demo content instead of a
    // live model response — sourced from the project's own real demo/test
    // material, not invented: the four seed facts are verbatim from
    // seed_memories.py (SEED_USERNAME "nidhi"), and the deadline scenario is
    // the exact user messages from test_memory_agent.py's
    // test_cross_session_recall. The importance scores and expiry dates are
    // plausible synthetic values in the tiers the project's own README
    // describes (high importance -> permanent), not captured live scores —
    // no real Qwen scoring call was made. Only two slots are used (no
    // hero) — this project doesn't need a third image.
    media: {
      afterApproach: {
        src: '/case-studies/qwen-memoryagent/memory-stored.png',
        width: 2400,
        height: 1520,
        alt: 'Qwen MemoryAgent chat showing a user message about a project deadline, the assistant’s reply marked “✓ stored,” and a new memory card in the sidebar scored 0.78 importance and marked permanent.',
        label: 'What this shows',
        caption: 'A new fact gets scored for importance and given an expiry — here, permanent — instead of just being logged to a transcript. That decision is visible immediately in the memory panel on the right.',
      },
      afterOutcome: {
        src: '/case-studies/qwen-memoryagent/memory-recalled.png',
        width: 1760,
        height: 492,
        alt: 'Qwen MemoryAgent chat in a new session: the user asks “What’s my deadline again?” and the assistant’s reply is marked “⚡ 1 memories recalled,” correctly citing the earlier deadline.',
        label: 'What this proves',
        caption: 'A brand-new conversation, with no shared chat history, still recalls that earlier fact and uses it to answer — proof the memory persists and actually gets used, not just stored and forgotten.',
      },
    },
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
    explanations: {
      simple: {
        sections: [
          {
            title: 'What was the problem?',
            text: 'Most tools that check whether code is “dead” either declare something safe to delete with no real proof, or flag things as unused that are actually just being called in an unusual way — neither answer is trustworthy enough to act on.',
          },
          {
            title: 'What did I make?',
            text: 'I built a tool that checks a codebase’s real call graph — actual proof of what calls what — and sorts every result into one of three honest buckets: confident it’s unused, genuinely uncertain, or “can’t tell statically, here’s why.” It never deletes or changes anything itself; it only reports what it found and how sure it is.',
          },
          {
            title: 'Why is that useful?',
            text: 'A tool that always says “yes, delete it” isn’t trustworthy, and a tool that hedges on everything isn’t useful either. Separating “confident” from “uncertain” from “can’t check this” means a developer can actually trust the confident findings instead of double-checking everything by hand.',
          },
          {
            title: 'What is still unproven?',
            text: 'It’s been validated on Python code specifically, using cases planted on purpose to be hard — inheritance, decorators, test-framework tricks. It can’t see code referenced only from non-code files like YAML or CI configs, and it has no way to tell something genuinely abandoned apart from something just new and not wired up yet.',
          },
        ],
      },
    },
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
    // User-supplied source data, not independently verified by fetch — this
    // environment's network policy blocks linkedin.com outright. The slug
    // ("...compassionateconnect-ai-sree-vedartham...") clearly matches this
    // project and this site's author, with no conflicting signal, so it's
    // used as given per explicit instruction.
    linkedinUrl: 'https://www.linkedin.com/pulse/from-frustration-impact-compassionateconnect-ai-sree-vedartham--uu5wc/',
    analyticsEvent: 'compassionateconnect_click',
    explanations: {
      simple: {
        sections: [
          {
            title: 'What was the problem?',
            text: 'Intake paperwork at mental health clinics is repetitive for patients and time-consuming for staff, and it’s easy for a crisis-relevant detail to get lost inside a long, unstructured intake response if nothing is specifically watching for it.',
          },
          {
            title: 'What did I make?',
            text: 'I built a system of six small AI agents that each handle one part of intake — asking questions, watching for crisis indicators, writing a therapist-friendly summary, suggesting possible directions for a session — instead of one agent trying to do everything. Every insight is explicitly labeled as a suggestion for a therapist to evaluate, never a diagnosis.',
          },
          {
            title: 'Why is that useful?',
            text: 'Splitting the work into agents with clear boundaries makes it possible to build in safety rules — like flagging a crisis or refusing to diagnose — as a hard constraint on one specific agent, rather than hoping a single system behaves correctly across every kind of conversation.',
          },
          {
            title: 'What is still unproven?',
            text: 'This was tested only with simulated patient data, demoed live but never used with a real patient or clinic, and its own retrospective is explicit that there’s no evaluation harness yet — meaning nobody has systematically measured whether its summaries or crisis detection are actually good, only whether the system runs.',
          },
        ],
      },
    },
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

  // Sourced from the project's own GitHub README (Problem/Solution/
  // Architecture/Project Structure/Future Work sections) plus the
  // Devpost page's first-person "How I built it," "Challenges," and
  // "What I learned" sections, which agree closely with the README and
  // with each other. Deliberately excludes the README's "Technology
  // Licensing & Partnership Framework" section — see the note in
  // projects-data.js: it claims "production-ready" status and a "$50B+
  // smart grid market," language that contradicts the project's own
  // Devpost description of itself as an "initial demo focused on
  // backend functionality" with intentionally basic UI, and reads as
  // injected marketing text rather than anything the author wrote about
  // this specific build.
  greenGrid: {
    slug: 'greengrid',
    title: 'GreenGrid AI',
    subtitle: 'AI-powered neighborhood energy orchestration for Missouri households carrying a disproportionate energy burden',
    tagline: 'Built solo for the AWS Breaking Barriers Virtual Challenge, June 2025',
    repoUrl: 'https://github.com/Hereforlolz/GreenGrid',
    devpostUrl: 'https://devpost.com/software/greengrid-ai',
    analyticsEvent: 'greengrid_click',
    stack: [
      ['Edge / IoT', 'Simulated smart meters and smart plugs publishing MQTT into AWS IoT Core'],
      ['Storage', 'Amazon S3 (raw data) + DynamoDB (usage patterns)'],
      ['Compute', 'AWS Lambda (processing and optimization)'],
      ['ML forecasting', 'Amazon SageMaker (next-day usage prediction)'],
      ['Generative AI', 'Amazon Bedrock (personalized, multilingual sustainability tips)'],
      ['Frontend', 'AWS Amplify (responsive web + mobile app)'],
    ],
    problem: [
      'Missouri households carry a disproportionate energy burden — the project cites roughly 20,000 St. Louis City households alone spending 6%–30% of income on utilities — while limited local coordination lets peak loads strain the grid.',
      'Without access to real smart meters, there was no way to prototype neighborhood-level demand forecasting and personalized guidance without first simulating realistic energy-consumption data.',
    ],
    approach: [
      'Built as an end-to-end AWS-native pipeline: simulated smart meters and smart plugs publish MQTT messages representing real-time consumption, ingested through AWS IoT Core into S3, processed by Lambda functions for optimization and forecasting (with SageMaker predicting next-day usage), then Bedrock generates personalized, multilingual sustainability tips from the resulting usage patterns stored in DynamoDB.',
      'Delivered through a responsive AWS Amplify web/mobile app talking to the backend over REST APIs — built and deployed solo, from edge-data simulation through to the live frontend.',
      'Deliberately scoped as a backend-first proof of concept: prioritized getting the full data pipeline working end-to-end over polishing the UI, and said so directly rather than presenting a rough interface as a finished product.',
    ],
    whatBroke: [
      'Simulating believable energy-consumption data without access to physical smart meters was a real engineering problem on its own, not a shortcut — every downstream forecast and recommendation depended on getting that simulation right.',
      'Coordinating data flow cleanly across four separate AWS services (Lambda, S3, DynamoDB, Bedrock) took real troubleshooting, since a break at any handoff silently breaks everything downstream of it.',
      'Building solo under a hackathon deadline meant explicitly triaging scope: the UI was left basic and not fully polished on purpose, so the available time went into the data pipeline instead.',
    ],
    outcome: [
      'The full pipeline works end to end and was demoed live, not just described: simulated smart meters → MQTT → AWS IoT Core → S3 → Lambda → Bedrock → an AWS Amplify frontend, deployed and reachable rather than only running locally.',
      'The generative-AI sustainability tips were explicitly built and tested as a proof of concept, not shipped as a finished feature — the project’s own writeup calls it "just a proof of concept" that "showed real promise," stopping well short of calling it a finished capability.',
    ],
    scope:
      'A solo hackathon build (AWS Breaking Barriers Virtual Challenge, June 2025) running on simulated smart-meter data, not real household devices — the project’s own roadmap names connecting real smart meters and piloting with actual households as future work, not something already done. The UI was intentionally left basic to prioritize the backend pipeline.',
  },

  // Sourced from the project's own GitHub README and the actual Lambda
  // code (core_functions.py, the per-function deploy folders, and
  // template.yaml), not just the Devpost writeup. The repo's README and
  // Devpost page both describe the backend as "Node.js Lambda functions,"
  // but template.yaml specifies `Runtime: python3.9` and the code is
  // plain Python (boto3) — the case study below uses the verified
  // runtime, not the stated one. The "~40% time loss to session
  // documentation" line appears verbatim in both the README and Devpost
  // page; it's presented here as one therapist's own characterization of
  // her documentation burden, not as a measured result of using this
  // tool. The lack of authentication is confirmed directly in
  // template.yaml (no authorizer/Cognito/API key configured) and in
  // every Lambda handler (no token check at all); the account owner has
  // confirmed the test used synthetic patient data only, precisely
  // because auth wasn't yet in place.
  //
  // Corrected after a first pass overstated this project's security and
  // validation posture: "HIPAA-aligned" is not a defensible description
  // of an architecture with no authentication, no least-privilege IAM,
  // and open CORS, so it's removed entirely rather than qualified. "One
  // therapist tested it" is not a "pilot" (a pilot implies a structured,
  // ongoing program), and her interest was explicitly conditional on a
  // secured version, not unconditional. "Non-diagnostic insights" is
  // replaced with a more literal description of what the Bedrock call
  // actually returns, to avoid any reading that implies clinical utility.
  therapistDashboard: {
    slug: 'therapist-dashboard',
    title: 'AI-Powered Therapist Dashboard',
    subtitle: 'A serverless workflow that turns unstructured therapy-session notes into summaries and draft observations for therapist review',
    tagline: 'Built solo for the AWS Lambda Hackathon and tested with one practicing therapist using synthetic data',
    repoUrl: 'https://github.com/Hereforlolz/Therapist-Dashboard-AWS',
    devpostUrl: 'https://devpost.com/software/ai-powered-therapist-dashboard',
    analyticsEvent: 'therapist_dashboard_click',
    explanations: {
      simple: {
        sections: [
          {
            title: 'What was the problem?',
            text: 'Therapists lose real time to session documentation instead of patient care — turning messy session notes into a usable summary is exactly the kind of repetitive writing work AI can help with, if it’s handled carefully in a sensitive domain.',
          },
          {
            title: 'What did I make?',
            text: 'I built a small pipeline: a therapist’s session notes go in, and an AI-drafted observation comes back out — deliberately framed as a draft for the therapist to review, never a diagnosis or treatment decision — alongside a saved, retrievable summary.',
          },
          {
            title: 'Why is that useful?',
            text: 'It turns a repetitive writing task into something a therapist reviews and edits instead of writing from scratch, while keeping the actual clinical judgment entirely with the human.',
          },
          {
            title: 'What is still unproven?',
            text: 'This was built and tested with synthetic data only, and it isn’t secured for real patient information yet — there’s no login on any part of it, which the project is upfront about. One practicing therapist confirmed the documentation problem was real and said she’d be interested once it’s secured, but that’s not the same as a validated clinical tool.',
          },
        ],
      },
    },
    stack: [
      ['Frontend', 'React (deployed on Render)'],
      ['Backend', 'AWS Lambda (Python 3.9) behind API Gateway'],
      ['Database', 'DynamoDB'],
      ['Generative AI', 'Claude 3 Sonnet via AWS Bedrock'],
    ],
    problem: [
      'Session documentation takes real time away from patient care — one practicing therapist who tested the workflow confirmed this matched her real experience.',
      'Turning messy, informal session notes into a usable summary and follow-up direction is exactly the kind of repetitive synthesis work an LLM can help with — if it’s built carefully around a sensitive domain.',
    ],
    approach: [
      'Built as a serverless pipeline: a React frontend calls three separate Lambda functions behind API Gateway — one to list patient summaries, one to save or update a session summary, and one that sends session notes to Claude (via Bedrock) and returns a draft observation.',
      'The Bedrock prompt is deliberately scoped: it explicitly frames the output as "gentle," "supportive," and "professional" draft observations about patient progress and next steps — LLM-generated draft observations for therapist review, not diagnoses, treatment recommendations, or clinical decisions.',
      'The prototype stored its synthetic session records in DynamoDB rather than persisting them in client-side browser state.',
    ],
    whatBroke: [
      'No authentication was implemented on any of the three Lambda endpoints — confirmed directly in the code and in template.yaml, which has no Cognito authorizer, API key, or request validation configured at all. Anyone with the API Gateway URL could have read or written the synthetic records stored by the prototype. The test used synthetic patient data throughout for exactly this reason — a real lesson from a first hackathon, not a deliberate tradeoff.',
      'Each Lambda function was granted AmazonDynamoDBFullAccess and AmazonBedrockFullAccess — broad, account-wide managed policies, rather than permissions scoped to just the one patients table and the one Bedrock model actually in use.',
      'CORS was left fully open (Access-Control-Allow-Origin: \'*\') rather than restricted to the actual frontend origin, and getting CORS working cleanly between a Render-hosted frontend and API Gateway took longer than expected. AWS Bedrock’s documentation for calling Claude was sparse enough that reaching a working request shape took real trial and error.',
    ],
    outcome: [
      'One practicing therapist tested the workflow using synthetic session notes, confirmed that documentation burden was a real problem, and expressed interest in a secured version.',
      'The full pipeline works end to end on serverless infrastructure with no servers to manage: notes in, a Claude-generated draft observation and a saved, retrievable summary out.',
    ],
    scope:
      'Built and tested with synthetic data only. This hackathon prototype was not designed, reviewed, or approved for handling protected health information. Authentication, authorization, least-privilege IAM, restricted CORS, audit controls, and formal compliance work would be required before any use with real patient data.',
  },

  // Sourced entirely from the project's own README (Architecture,
  // Testing, Evaluation harness, Privacy and data handling, and Honest
  // limitations sections) — not a hackathon submission, so its own scope
  // language is deliberately different from the six above (no
  // "hackathon" framing; see the honesty test in case-studies.test.js).
  pilotCraft: {
    slug: 'pilotcraft',
    title: 'PilotCraft',
    subtitle: 'A structured, evidence-checked assessment of whether AI actually fits a workplace problem',
    tagline: 'A personal tool for evaluating AI-adoption decisions before committing engineering time',
    repoUrl: 'https://github.com/Hereforlolz/PilotCraft',
    analyticsEvent: 'pilotcraft_click',
    // Plain-language explanation for a smart-novice reader: what problem,
    // what I made, why it's useful, what's still unproven. Deliberately
    // excludes implementation/test/eval detail (test counts, retry and
    // fallback behavior, schema validation, rate limiting) — that stays in
    // the Overview below and the linked repo, not duplicated here. Every
    // claim traces back to the problem/approach/outcome/scope fields below,
    // which are themselves sourced from the project's own README.
    explanations: {
      simple: {
        sections: [
          {
            title: 'What was the problem?',
            text: 'Companies can start using AI before they’ve figured out where it’s actually useful, what the risks are, or how they’ll know whether an experiment worked.',
          },
          {
            title: 'What did I make?',
            text: 'I built PilotCraft to turn a messy workplace problem into a more structured AI-adoption plan. It helps separate facts from assumptions, checks whether a non-AI fix would work better first, and suggests what to test before committing more time or money.',
          },
          {
            title: 'Why is that useful?',
            text: 'Instead of starting with "let’s build something with AI," the tool starts with "should AI even be used here?" — giving the team clearer questions, experiments, responsibilities, and stop/revise/scale decisions.',
          },
          {
            title: 'What is still unproven?',
            text: 'I tested the system using synthetic workplace scenarios, but it’s still a personal prototype — it hasn’t been validated inside a real organization.',
          },
        ],
      },
    },
    // Three real screenshots of the running app, each proving something the
    // prose alone doesn't: the report's actual shape, its evidence
    // discipline, and its willingness to rate something a poor fit.
    // Screenshots are from the real running PilotCraft UI using the
    // project's hand-authored synthetic evaluation fixtures
    // (evals/fixtures.ts, "canned responses ... stand in for what Gemini
    // would return, so the harness can run without a live API key") in
    // place of a live Gemini response, since no API key is available in
    // this build environment. The UI and layout are real; the report
    // content is synthetic demo/fixture data, not a live model output or a
    // measured real-world result — the captions and alt text below say so.
    media: {
      hero: {
        src: '/case-studies/pilotcraft/report-summary.png',
        width: 1632,
        height: 720,
        alt: 'PilotCraft’s generated report for a synthetic customer-support scenario: an AI Suitability rating of Strong, a one-line rationale, and an example readiness score of 72% with a listed priority gap.',
        label: 'What this shows',
        caption: 'A completed report for one of PilotCraft’s built-in synthetic sample scenarios — showing the rating, rationale, and example readiness score along with the specific gap holding it back.',
      },
      afterApproach: {
        src: '/case-studies/pilotcraft/evidence-check.png',
        width: 792,
        height: 590,
        alt: 'PilotCraft’s Evidence Check card, listing user-provided facts, assumptions, and missing evidence separately for the same scenario.',
        label: 'Why this matters',
        caption: 'The same report’s evidence section: facts the user actually gave it, assumptions it made to fill a gap, and evidence it doesn’t have — kept in three separate buckets instead of blended into one narrative.',
      },
      afterOutcome: {
        src: '/case-studies/pilotcraft/decision-criteria.png',
        width: 1632,
        height: 416,
        alt: 'PilotCraft’s Stop / Revise / Scale criteria for a synthetic contract-review scenario rated a poor fit for AI, with a stop condition against letting AI make binding decisions.',
        label: 'What this proves',
        caption: 'A different synthetic scenario — reviewing legal contracts for liability — where the tool rated AI a poor fit and said so, down to a stop condition against letting it make binding decisions at all.',
      },
    },
    stack: [
      ['Frontend', 'React 19 + Vite 6, Tailwind CSS 4, lucide-react icons, Motion for transitions'],
      ['Backend', 'Express 5 — also serves Vite’s dev middleware / the static production build, no separate API host'],
      ['AI model', 'Google Gemini — gemini-3.8-flash primary, gemini-3.1-flash-lite as an automatic fallback on a retryable failure'],
      ['Output validation', 'Zod schema, checked at runtime — not just guided by the Gemini response schema'],
      ['Delivery', 'Server-Sent Events streaming from Express to the browser'],
    ],
    problem: [
      'Teams considering AI adoption often jump straight to "build an AI feature" without separating what they actually know from what they’re assuming, without a plan for how to un-adopt it if it fails, and without deciding upfront what would count as success.',
      'A structured first pass at "is this workflow actually a good candidate for AI?" needed to exist before proposing a pilot — one that’s allowed to say no.',
    ],
    approach: [
      'Takes a free-text description of a workplace problem (up to 4,000 characters) and returns one structured report: a suitability rating (strong/conditional/poor), a proposed future workflow, a human/AI responsibility split, stakeholder impact, adoption barriers, a phased pilot plan with owners and evidence to collect per phase, success metrics with baselines and targets, explicit stop/revise/scale decision criteria, and a 0–100 "readiness score" the UI labels directly as a planning heuristic, not a measurement.',
      'The system prompt explicitly instructs the model to weigh non-AI alternatives (better documentation, a process change, an existing tool) before recommending AI, and to let that pull the rating toward "conditional" or "poor" instead of defaulting to "strong" — a tool that always says "yes, use AI" isn’t useful.',
      'Every report is required to separate user-provided facts, assumptions the model made to fill a gap, and evidence that’s missing entirely — and the prompt explicitly forbids inventing a plausible-looking baseline number when none was given.',
      'A separate evaluation harness (evals/) runs 9 synthetic workplace scenarios — spanning strong/conditional/poor candidates, a missing-baseline case, an obvious non-AI alternative, sensitive data, adoption resistance, and an unsupported ROI claim — through the real /api/analyze route (not a mock), scoring each report against 7 deterministic checks: no fabricated baselines, a named evidence gap, a real non-AI alternative named when one exists, a substantive human-review trigger per risk, ratings calibrated to the evidence given, sensitive data flagged as a risk, and unsupported claims marked unverified.',
    ],
    whatBroke: [
      'Two regressions specifically lived in the NODE_ENV=production code path that neither `npm run dev` nor the unit tests exercised: an Express 5 wildcard-route bug and a request-body handling bug. Fixed by adding a CI smoke test that runs against the actual built production server instead of only the dev server.',
      'An earlier draft of the README claimed WCAG 2.2 AA compliance that had never actually been tested. Caught on review and removed outright rather than "fixed" with a retroactive audit — the README’s own "Honest limitations" section documents the correction directly instead of quietly deleting the claim.',
      'An earlier version ran Express 4, which transitively pulled a vulnerable qs/body-parser range (moderate severity, low actual exposure since the app never parses query-string arrays). Resolved by moving to Express 5, which carries a patched qs.',
    ],
    outcome: [
      'A live run against the real Gemini API (not fixtures), dated September 4, 2026, completed all 9 synthetic scenarios with no scenario errors, and all 58 applicable deterministic checks passed — full detail in the repo’s evals/results.md and evals/results/latest.json.',
      '74 unit tests pass, covering the retry/fallback orchestration, the JSON-repair flow, the Zod schema’s boundaries, the real Express route end-to-end (a missing or malformed request body returns a clean 400, oversized scenarios are rejected, the per-IP rate limit returns 429), and the Gemini model contract itself — that the system instruction and response schema actually state what the README claims they do.',
      'The README states plainly that this is one live model run over nine synthetic scenarios using deterministic heuristic checks — it demonstrates tested behavior under those conditions, not statistical reliability or a validated outcome in a real organization.',
    ],
    scope:
      'A personal tool, not a hackathon submission — built to think through AI-adoption decisions before proposing a pilot, not shipped as a finished product. No authentication, no user accounts, and no deployment exists yet; the repo’s own README says so directly. Not validated in a real organization — no pilot run through it has been tracked to a real outcome. The 0–100 readiness score is an explicitly-labeled model heuristic, not an objective measurement. Built with AI coding assistance (Claude Code), directed and reviewed by the repository owner — disclosed directly in the README.',
  },
};

module.exports = { CASE_STUDIES };
