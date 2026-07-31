import Head from 'next/head';
import Layout from '../components/Layout';

export default function About() {
  return (
    <Layout>
      <Head>
        <title>About — Nidhi // Void Tinkerer</title>
        <meta
          name="description"
          content="Nidhi — zero-gravity thinker and AI systems tinkerer. 8+ years in IoT/embedded systems, now building agent infrastructure and prompt engineering programs."
        />
      </Head>
      <div className="max-w-2xl">
        <h1 className="text-3xl font-black tracking-tight uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-6">
          👋 About Me
        </h1>
        <p className="mb-4 text-slate-300">
          Hi, I&apos;m Nidhi — a zero-gravity thinker, experimental systems tinkerer, and playful skeptic of shiny hype.
          I build fast, break faster, and document the chaos for your amusement (and my future regret). If you want to
          collaborate, or have a system you dare me to break — hit me up.
        </p>
        <p className="mb-4 text-slate-300">
          By day: 8+ years in IoT/embedded systems at Ivani, working on occupancy-sensing firmware and cross-functional
          program delivery. Lately that&apos;s expanded into AI enablement — benchmarking prompt engineering practices,
          building agent infrastructure, and generally seeing how far I can push these tools before they break (or I do).
        </p>
        <p className="text-slate-300">
          Recent chaos: multiple hackathon builds (Slack onboarding agents, memory systems on Neon/pgvector,
          knowledge-graph bug finders), a handful of GitHub issues filed against Google&apos;s ADK, and a habit of
          writing up what broke on <a href="https://dev.to/hereforlolz" target="_blank" rel="noreferrer" className="text-pink-400 hover:text-pink-300 underline">dev.to</a> after
          the dust settles.
        </p>
      </div>
    </Layout>
  );
}
