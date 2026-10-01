import Link from 'next/link';
import Layout from '../components/Layout';
import SeoHead from '../components/SeoHead';
import TerminalFrame from '../components/TerminalFrame';
import ClosingCTA from '../components/ClosingCTA';

// Five evidence-backed lessons, traceable to the linked case studies
// and, where noted, a public portfolio correction.
const LESSONS = [
  {
    id: 'validated',
    title: "Working isn't the same as good",
    changedMind:
      "My CompassionateConnect project’s own retrospective says it plainly: “No eval harness — I tracked whether the system ran, not whether the outputs were actually good.” For a mental-health-adjacent tool, “it runs” and “it spots a crisis well” are very different claims, and I had only checked the first.",
    doDifferently:
      'PilotCraft has a real evaluation: 9 made-up workplace scenarios, each scored by checks written for that scenario, run against the live Gemini model rather than canned answers. Separately, two bugs only showed up in the production version of the app, which neither my everyday testing nor my unit tests exercised. I caught them only after adding an automated test that starts the real, built app.',
    receipts: [
      { label: 'CompassionateConnect', href: '/projects/compassionateconnect' },
      { label: 'PilotCraft', href: '/projects/pilotcraft' },
    ],
  },
  {
    id: 'evidence',
    title: "I stopped letting a claim outrun its evidence",
    changedMind:
      "PilotCraft’s README once claimed it met the WCAG 2.2 AA accessibility standard, which I had never tested. The Therapist Dashboard was once described as “HIPAA-aligned” even though it had no login, no limits on who could access what, and was open to requests from anywhere.",
    doDifferently:
      "Retract, don't hedge. The accessibility line was removed outright, not softened. The case study now states the missing security controls plainly, and “one therapist tested it” stopped being called a “pilot.” The same pass caught a smaller overstatement on this site’s own About page, a co-lead title that should have been an individual contribution, and fixed it the same way.",
    receipts: [
      { label: 'PilotCraft', href: '/projects/pilotcraft' },
      { label: 'Therapist Dashboard', href: '/projects/therapist-dashboard' },
      { label: 'About-page correction (PR #40)', href: 'https://github.com/Hereforlolz/prototype-playground/pull/40', external: true },
    ],
  },
  {
    id: 'untrusted-data',
    title: 'Anything an AI reads is information, never orders',
    changedMind:
      'Building Qwen MemoryAgent showed me a real risk: saved memories get fed back into the AI’s instructions in later, unrelated conversations. A malicious message saved as a “memory” could quietly act as a standing instruction in every future session.',
    doDifferently:
      "The AI is now explicitly told that everything it remembers is information to read, never instructions to follow. The project’s own README is honest that this is “prompt-level defense-in-depth, not a hard guarantee”: it lowers the risk, it doesn’t remove it.",
    receipts: [{ label: 'Qwen MemoryAgent', href: '/projects/qwen-memoryagent' }],
  },
  {
    id: 'confidence',
    title: 'A tool should say how sure it is, not just yes or no',
    changedMind:
      'Building Dead Code Finder, I saw the two ways tools like it go wrong. Simple checkers either call code “safe to delete” with no proof, or flag perfectly legitimate code that’s just used in an unusual way.',
    doDifferently:
      "Every finding goes into one of three labeled buckets: Confident, Uncertain, or Skipped (“can’t assess this automatically, and here’s why”). It is never a flat yes or no. Before trusting the backup mode, I checked its guesses independently against the real source of truth (GitLab’s code knowledge graph, queried from the command line outside the tool) rather than assuming its logic was good enough.",
    receipts: [{ label: 'Dead Code Finder', href: '/projects/dead-code-finder' }],
  },
  {
    id: 'earn-its-place',
    title: 'AI should have to earn its place',
    changedMind: 'An AI solution can be interesting without being the simplest or most defensible answer to the real problem.',
    doDifferently:
      "PilotCraft explicitly asks teams to compare AI with non-AI options, and to reject or rework a pilot when the evidence, risk, or expected value doesn’t justify using AI.",
    receipts: [{ label: 'PilotCraft', href: '/projects/pilotcraft' }],
  },
];

// Newest first, matching the "recent entries" framing above the list.
// NOTE: the three 2026-07 entries below use month-level precision
// ("~2026-07") since exact days weren't tracked at the time. Swap in a
// real YYYY-MM-DD date if you find it, but don't state a specific day
// that isn't real.
const LOG_ENTRIES = [
  { date: '~2026-07', level: 'FIXED', msg: 'This site itself: a broken link sat unnoticed for a year. Fixed.' },
  { date: '~2026-07', level: 'BUG', msg: 'Sensify scrollytelling demo — the camera movement, the hand shape, and the limb pivot points all fought me the whole way.' },
  { date: '~2026-07', level: 'DEBUG', msg: 'Data-analysis script — it took five rounds with a local AI model before it could reliably spot “ghost” sensors.' },
  { date: '2025-06-26', level: 'PERF', msg: 'Logging slowed down under heavy load; sped it up by saving records in batches.' },
  { date: '2025-06-23', level: 'BUG', msg: 'CompassionateConnect — hit an error in Google’s agent toolkit when a tool mixed required and optional inputs. Filed with a reproducible setup and diagnostic details as adk-docs#826.' },
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
        title="Lessons Learned — Sreenidhi Vedartham Portfolio"
        description="Five lessons from building and testing AI tools and smart-device systems that changed how I work, with links to the projects behind each one."
        path="/logs"
      />
      <div className="max-w-3xl">
        <h1 className="font-display [text-wrap:balance] text-2xl sm:text-3xl font-bold text-text mb-4">
          Lessons Learned
        </h1>
        <p className="text-muted mb-8 text-sm">
          Five lessons that changed how I build, check, and describe my work. Each links to the project behind it.
        </p>

        <div className="space-y-6">
          {LESSONS.map((lesson, i) => (
            <TerminalFrame key={lesson.id} label={`insight-${String(i + 1).padStart(2, '0')}.log`} variant="featured">
              <h2 className="font-display font-semibold text-text mb-3">{lesson.title}</h2>

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
