import Link from 'next/link';
import Layout from '../components/Layout';
import SeoHead from '../components/SeoHead';
import TerminalFrame from '../components/TerminalFrame';
import ClosingCTA from '../components/ClosingCTA';

// Five project-backed lessons, each traceable to a specific case study's
// own problem/approach/whatBroke/outcome text (see lib/case-studies.js).
// No claim here goes beyond what those case studies already state.
const LESSONS = [
  {
    id: 'validated',
    title: "Working code isn't validated code",
    changedMind:
      "CompassionateConnect's own retrospective names the gap directly: “No eval harness — I tracked whether the system ran, not whether the outputs were actually good.” For a mental-health-adjacent multi-agent system, “it runs” and “the crisis detection is actually good” are very different claims, and only one had been checked.",
    doDifferently:
      'PilotCraft has a real evaluation harness (evals/): 9 synthetic workplace scenarios scored against scenario-specific deterministic checks, run against the live Gemini API rather than fixtures. Separately, two bugs lived only in the NODE_ENV=production code path that neither npm run dev nor unit tests exercised — caught only after adding a CI smoke test against the actual built server.',
    receipts: [
      { label: 'CompassionateConnect', href: '/projects/compassionateconnect' },
      { label: 'PilotCraft', href: '/projects/pilotcraft' },
    ],
  },
  {
    id: 'evidence',
    title: "I stopped letting a claim outrun its evidence",
    changedMind:
      "PilotCraft's README once claimed WCAG 2.2 AA compliance that had never been tested. The Therapist Dashboard was once described as “HIPAA-aligned” despite having no authentication, no least-privilege IAM, and open CORS.",
    doDifferently:
      "Retract, don't hedge. The WCAG line was removed outright, not softened. The case study now states the missing security controls explicitly, and “one therapist tested it” stopped being called a “pilot.” The same pass caught a smaller overstatement on this site's own About page — a co-lead title corrected to an individual contribution — fixed the same way.",
    receipts: [
      { label: 'PilotCraft', href: '/projects/pilotcraft' },
      { label: 'Therapist Dashboard', href: '/projects/therapist-dashboard' },
      { label: 'PR #40 (smaller, supporting)', href: 'https://github.com/Hereforlolz/prototype-playground/pull/40', external: true },
    ],
  },
  {
    id: 'untrusted-data',
    title: 'Retrieved content is data to read, never instructions to follow',
    changedMind:
      'Building Qwen MemoryAgent surfaced a specific risk: stored memories get re-injected into the system prompt of unrelated future sessions, so a malicious message saved as a "memory" could function as a persistent, cross-session jailbreak.',
    doDifferently:
      "Both the recall and extraction prompts now explicitly frame all memory content as untrusted data to read, never as instructions to follow. The project's own README is explicit that this is “prompt-level defense-in-depth, not a hard guarantee” — it reduces injection risk, it doesn't eliminate it.",
    receipts: [{ label: 'Qwen MemoryAgent', href: '/projects/qwen-memoryagent' }],
  },
  {
    id: 'confidence',
    title: 'A tool should say how sure it is, not just yes or no',
    changedMind:
      'Building Dead Code Finder, I saw both failure modes it needed to avoid: naive static analysis either declares code "safe to delete" with no proof, or flags legitimate-but-unusual patterns — decorator dispatch, inheritance/MRO — as false positives.',
    doDifferently:
      "Every finding lands in one of three labeled buckets — Confident, Uncertain, or Skipped (“can't assess statically, here's why”) — never a binary yes/no. Before trusting a fallback mode, I checked its guesses independently against the real data source (GitLab's Orbit call graph, via the glab CLI, run outside the flow) rather than assuming the fallback's logic was good enough alone.",
    receipts: [{ label: 'Dead Code Finder', href: '/projects/dead-code-finder' }],
  },
  {
    id: 'earn-its-place',
    title: 'AI should have to earn its place',
    changedMind: 'An AI solution can be interesting without being the simplest or most defensible solution to the underlying workflow.',
    doDifferently:
      "PilotCraft explicitly asks teams to compare AI with non-AI alternatives, and to reject or revise pilots when the evidence, risk, or expected value doesn't justify AI.",
    receipts: [{ label: 'PilotCraft', href: '/projects/pilotcraft' }],
  },
];

// Newest first, matching the "recent entries" framing above the list.
// NOTE: the three 2026-07 entries below use month-level precision
// ("~2026-07") since exact days weren't tracked at the time. Swap in a
// real YYYY-MM-DD date if you find it, but don't state a specific day
// that isn't real.
const LOG_ENTRIES = [
  { date: '~2026-07', level: 'FIXED', msg: 'This site itself — dead /ai-playground link sat unnoticed for a year. Fixed.' },
  { date: '~2026-07', level: 'BUG', msg: 'Sensify scrollytelling demo — camera transform bugs, hand shape variable scope errors, CSS limb pivot points fighting me the whole way.' },
  { date: '~2026-07', level: 'DEBUG', msg: 'Local model iterations on analyze_ha_csv.py — five rounds before ghost-sensor detection actually worked.' },
  { date: '2025-06-26', level: 'PERF', msg: 'Firestore logging delayed under heavy intake; optimized batch writes.' },
  { date: '2025-06-23', level: 'BUG', msg: 'CompassionateConnect — FunctionTool TypeError in google-adk 1.2.1 involving mixed required and optional parameters. Filed with reproducible environment and diagnostic details as adk-docs#826.' },
];

// Colors are drawn from the site's own palette instead of an arbitrary set
// of hues: red flags a problem, the site's accent marks a resolved one, and
// everything else is a neutral process note rather than a severity signal.
const LEVEL_COLOR = {
  BUG: 'text-red-500',
  FATAL: 'text-red-500',
  PATCH: 'text-muted',
  PERF: 'text-muted',
  DEBUG: 'text-muted',
  FIXED: 'text-accent',
};

function Receipt({ label, href, external }) {
  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className="text-accent hover:opacity-80 underline">
        {label}
        <span className="sr-only"> (opens in new tab)</span>
      </a>
    );
  }
  return (
    <Link href={href} className="text-accent hover:opacity-80 underline">
      {label}
    </Link>
  );
}

export default function Logs() {
  return (
    <Layout>
      <SeoHead
        title="Lessons Learned — Nidhi Vedartham"
        description="Five project-backed lessons on how building and testing AI and embedded systems changed my judgment — with the receipts."
        path="/logs"
      />
      <div className="max-w-3xl">
        <h1 className="font-display [text-wrap:balance] text-2xl sm:text-3xl font-bold text-text mb-4">
          Lessons Learned
        </h1>
        <p className="text-muted mb-8 text-sm">
          Five lessons that changed how I build, evaluate, and describe systems.
        </p>

        <div className="space-y-6">
          {LESSONS.map((lesson, i) => (
            <TerminalFrame key={lesson.id} label={`insight-${String(i + 1).padStart(2, '0')}.log`} variant="featured">
              <p className="font-display font-semibold text-text mb-3">{lesson.title}</p>

              <p className="text-xs text-accent font-mono font-bold tracking-wide uppercase mb-1">
                What changed my mind
              </p>
              <p className="text-muted text-sm mb-3">{lesson.changedMind}</p>

              <p className="text-xs text-accent font-mono font-bold tracking-wide uppercase mb-1">
                What I do differently now
              </p>
              <p className="text-muted text-sm mb-3">{lesson.doDifferently}</p>

              <p className="text-xs text-muted">
                Receipts:{' '}
                {lesson.receipts.map((receipt, j) => (
                  <span key={receipt.href}>
                    <Receipt {...receipt} />
                    {j < lesson.receipts.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </p>
            </TerminalFrame>
          ))}
        </div>

        <section className="mt-12">
          <h2 className="font-display text-lg font-bold text-text mb-3">Recent entries</h2>
          <TerminalFrame label="Recent entries" variant="quiet">
            <div className="space-y-3 text-sm">
              {LOG_ENTRIES.map((entry, i) => (
                <p key={i} className="text-muted hover:translate-x-1 transition-transform duration-150">
                  <span className="text-muted">[{entry.date}]</span>{' '}
                  <span className={`font-semibold ${LEVEL_COLOR[entry.level] || 'text-muted'}`}>
                    [{entry.level}]
                  </span>{' '}
                  {entry.msg}
                </p>
              ))}
            </div>
          </TerminalFrame>
        </section>
      </div>

      <div className="mt-12 max-w-3xl">
        <ClosingCTA />
      </div>
    </Layout>
  );
}
