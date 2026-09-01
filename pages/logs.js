import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import TerminalFrame from '../components/TerminalFrame';

// Newest first — the nav links to this page as "$ tail --known-bugs",
// so the rendered order should match what `tail` actually shows.
// NOTE: the three 2026-07 entries below use month-level precision
// ("~2026-07") since exact days weren't tracked at the time. Swap in a
// real YYYY-MM-DD date if you find it, but don't state a specific day
// that isn't real.
const LOG_ENTRIES = [
  { date: '~2026-07', level: 'FIXED', msg: 'This site itself — dead /ai-playground link sat unnoticed for a year. Fixed.' },
  { date: '~2026-07', level: 'BUG', msg: 'Sensify scrollytelling demo — camera transform bugs, hand shape variable scope errors, CSS limb pivot points fighting me the whole way.' },
  { date: '~2026-07', level: 'DEBUG', msg: 'Local model iterations on analyze_ha_csv.py — five rounds before ghost-sensor detection actually worked.' },
  { date: '2025-06-26', level: 'PERF', msg: 'Firestore logging delayed under heavy intake; optimized batch writes.' },
];

const LEVEL_COLOR = {
  BUG: 'text-pink-500',
  FATAL: 'text-red-500',
  PATCH: 'text-purple-400',
  PERF: 'text-blue-400',
  DEBUG: 'text-yellow-400',
  FIXED: 'text-green-400',
};

export default function Logs() {
  return (
    <Layout>
      <Head>
        <title>Lessons Learned — Nidhi Vedartham</title>
        <meta
          name="description"
          content="A living, transparent log of bugs, patches, and misfires — because transparency is the brand."
        />
      </Head>
      <div className="max-w-2xl">
        <h1 className="font-display [text-wrap:balance] text-2xl sm:text-3xl font-bold text-text mb-4">
          Lessons Learned
        </h1>
        <p className="text-muted mb-6 text-sm">
          A living record of bugs, misfires, and the occasional meltdown — because transparency is my brand.
          For bugs filed against other people&apos;s tools, see{' '}
          <Link href="/projects" className="text-accent hover:opacity-80 underline">Projects &amp; Experiments</Link>.
        </p>

        <TerminalFrame label="Recent entries">
          <div className="space-y-2 text-xs">
            {LOG_ENTRIES.map((entry, i) => (
              <p key={i} className="text-muted hover:translate-x-1 transition-transform duration-150">
                <span className="text-muted">[{entry.date}]</span>{' '}
                <span className={`font-semibold ${LEVEL_COLOR[entry.level] || 'text-slate-400'}`}>
                  [{entry.level}]
                </span>{' '}
                {entry.msg}
              </p>
            ))}
          </div>
        </TerminalFrame>
      </div>
    </Layout>
  );
}
