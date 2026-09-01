// 📁 /pages/index.js
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import TerminalFrame from '../components/TerminalFrame';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Nidhi // Void Tinkerer</title>
        <meta
          name="description"
          content="Zero-gravity thinker and AI tinkerer. IoT/embedded engineer by day, breaking AI agents and documenting the chaos by night."
        />
      </Head>
      <div className="max-w-2xl">
        <h1 className="text-4xl lg:text-5xl font-black tracking-tight uppercase text-text mb-4">
          Zero-Gravity Thinker &amp; AI Tinkerer 🚀
        </h1>

        <p className="text-muted mb-8">
          Breaking AI, bending code, and sprinkling memes — all in the name of progress (and chaos).
        </p>

        <nav className="flex flex-wrap gap-3 mb-10">
          <Link
            href="/projects"
            className="font-mono border border-accent text-accent px-4 py-2 hover:bg-accent hover:text-surface hover:-translate-y-1 transition-all duration-150"
          >
            $ run --explore-experiments
          </Link>
          <Link
            href="/logs"
            className="font-mono border border-accent text-accent px-4 py-2 hover:bg-accent hover:text-surface hover:-translate-y-1 transition-all duration-150"
          >
            $ tail --known-bugs
          </Link>
          <Link
            href="/about"
            className="font-mono border border-accent text-accent px-4 py-2 hover:bg-accent hover:text-surface hover:-translate-y-1 transition-all duration-150"
          >
            $ whoami
          </Link>
        </nav>

        <div className="max-w-md">
          <TerminalFrame label="AI_HALLUCINATION_ENGINE — WARNING">
            <img
              src="/meme.png"
              alt="AI Meme"
              className="rounded shadow-lg w-full"
            />
            <p className="text-muted text-xs mt-2">
              coordinates: [chaos.x, progress.y] — confidence: low, entertainment: high
            </p>
          </TerminalFrame>
        </div>
      </div>
    </Layout>
  );
}
