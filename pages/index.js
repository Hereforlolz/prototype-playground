// 📁 /pages/index.js
import Head from 'next/head';
import Link from 'next/link';
import { track } from '@vercel/analytics';
import Layout from '../components/Layout';
import TerminalFrame from '../components/TerminalFrame';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Nidhi Vedartham</title>
        <meta
          name="description"
          content="Software engineer turned product person, all in on AI. IoT/embedded engineer by day, building and breaking AI agents by night — and writing up what happens."
        />
      </Head>
      <div className="max-w-2xl">
        <h1 className="font-display [text-wrap:balance] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text mb-4">
          Software engineer turned product person, all in on AI 🚀
        </h1>

        <p className="text-muted mb-8 max-w-prose">
          I build fast, ship real things, and write up what breaks along the way.
        </p>

        <nav className="flex flex-wrap gap-3 mb-10">
          <Link
            href="/projects"
            onClick={() => track('homepage_cta_click', { destination: 'projects' })}
            className="font-display font-semibold bg-accent text-surface px-4 py-2 rounded-md hover:opacity-90 transition-opacity duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
          >
            View Projects &amp; Experiments
          </Link>
          <Link
            href="/logs"
            onClick={() => track('homepage_cta_click', { destination: 'logs' })}
            className="font-display font-semibold border border-border text-text px-4 py-2 rounded-md hover:border-accent hover:text-accent transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
          >
            Lessons Learned
          </Link>
          <Link
            href="/about"
            onClick={() => track('homepage_cta_click', { destination: 'about' })}
            className="font-display font-semibold border border-border text-text px-4 py-2 rounded-md hover:border-accent hover:text-accent transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
          >
            About
          </Link>
        </nav>

        <div className="max-w-md">
          <TerminalFrame label="Reality check">
            <img
              src="/meme.png"
              alt="&quot;This is fine&quot; meme: a dog sitting calmly at a table in a room that's on fire."
              className="rounded shadow-lg w-full h-auto"
            />
            <p className="text-muted text-xs mt-2">
              A fairly accurate summary of most sprints.
            </p>
          </TerminalFrame>
        </div>
      </div>
    </Layout>
  );
}
