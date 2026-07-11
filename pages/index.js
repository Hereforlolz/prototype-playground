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
        <h1 className="text-4xl lg:text-5xl font-black tracking-tight uppercase text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 mb-4">
          Zero-Gravity Thinker &amp; AI Tinkerer 🚀
        </h1>

        <p className="text-slate-400 mb-8">
          Breaking AI, bending code, and sprinkling memes — all in the name of progress (and chaos).
        </p>

        <nav className="flex flex-wrap gap-3 mb-10">
          <Link
            href="/projects"
            className="font-mono border border-pink-500 text-pink-400 px-4 py-2 hover:bg-pink-500 hover:text-gray-900 hover:-translate-y-1 transition-all duration-150"
          >
            $ run --explore-experiments
          </Link>
          <Link
            href="/logs"
            className="font-mono border border-purple-500 text-purple-400 px-4 py-2 hover:bg-purple-500 hover:text-gray-900 hover:-translate-y-1 transition-all duration-150"
          >
            $ tail --known-bugs
          </Link>
          <Link
            href="/about"
            className="font-mono border border-blue-500 text-blue-400 px-4 py-2 hover:bg-blue-500 hover:text-gray-900 hover:-translate-y-1 transition-all duration-150"
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
            <p className="text-slate-600 text-xs mt-2">
              coordinates: [chaos.x, progress.y] — confidence: low, entertainment: high
            </p>
          </TerminalFrame>
        </div>
      </div>
    </Layout>
  );
}
