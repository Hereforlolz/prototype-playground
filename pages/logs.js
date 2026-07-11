import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import TerminalFrame from '../components/TerminalFrame';

// Newest first — the nav links to this page as "$ tail --known-bugs",
// so the rendered order should match what `tail` actually shows.
// NOTE: the three 2026-07 entries below use a placeholder day (01) since
// exact dates weren't tracked at the time — swap in the real day if you
// have it, but keep the YYYY-MM-DD shape so these stay sortable/parseable
// alongside the rest.
const LOG_ENTRIES = [
  { date: '2026-07-01', level: 'FIXED', msg: 'This site itself — dead /ai-playground link sat unnoticed for a year. Fixed.' },
  { date: '2026-07-01', level: 'BUG', msg: 'Sensify scrollytelling demo — camera transform bugs, hand shape variable scope errors, CSS limb pivot points fighting me the whole way.' },
  { date: '2026-07-01', level: 'DEBUG', msg: 'Local model iterations on analyze_ha_csv.py — five rounds before ghost-sensor detection actually worked.' },
  { date: '2025-06-26', level: 'PERF', msg: 'Firestore logging delayed under heavy intake; optimized batch writes.' },
  { date: '2025-06-25', level: 'PATCH', msg: 'Gemini 1.5 Flash misinterpreted user crisis responses; patched prompt logic.' },
  { date: '2025-06-24', level: 'FATAL', msg: 'Accidentally deployed test secrets. Fun times.' },
  { date: '2025-06-23', level: 'BUG', msg: 'Broke the build by adding AI inside AI. Oops.' },
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
        <title>Known Mistakes Log — Nidhi // Void Tinkerer</title>
        <meta
          name="description"
          content="A living, transparent log of bugs, patches, and misfires — because transparency is the brand."
        />
      </Head>
      <div className="max-w-2xl">
        <h1 className="text-3xl font-black tracking-tight uppercase text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
          🐞 Known Mistakes Log
        </h1>
        <p className="text-slate-400 mb-6 text-sm">
          A living record of bugs, misfires, and the occasional meltdown — because transparency is my brand.
          For bugs filed against other people&apos;s tools, see the{' '}
          <Link href="/projects" className="text-pink-400 hover:text-pink-300 underline">Repos &amp; Bugs Lab</Link>.
        </p>

        <TerminalFrame label="STDOUT_STREAM_ACTIVE">
          <div className="space-y-2 text-xs">
            {LOG_ENTRIES.map((entry, i) => (
              <p key={i} className="text-slate-400 hover:translate-x-1 transition-transform duration-150">
                <span className="text-slate-600">[{entry.date}]</span>{' '}
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
