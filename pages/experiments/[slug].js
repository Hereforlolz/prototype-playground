// pages/experiments/[slug].js
//
// Renders one of the self-contained tools in content/experiments/ as a
// live page: the original CSS and body markup are injected as-is, and
// the original script re-executes client-side in a <script> tag rather
// than being rewritten as a React component. This keeps each tool's
// behavior identical to the original single-file version instead of
// risking bugs from a line-by-line port to JSX.
//
// The original tools wire themselves up on 'DOMContentLoaded', which
// has already fired long before this effect runs — so it's re-dispatched
// here for the listener the injected script just registered. The script
// is only ever injected once per real page load (guarded by injectedRef)
// so React 18 StrictMode's dev-only double-effect doesn't try to
// re-declare the same top-level consts/lets and throw. Every link in and
// out of these pages is a plain <a>, not next/link, so a visitor moving
// between tools always gets a full page load — a fresh JS realm each
// time — rather than stale globals from a previous tool leaking into
// the next one via client-side routing.
import { useEffect, useRef } from 'react';
import fs from 'fs';
import path from 'path';
import SeoHead from '../../components/SeoHead';
import { EXPERIMENTS } from '../../lib/experiments';
import { parseExperimentHtml } from '../../lib/experiment-html';

export async function getStaticPaths() {
  return {
    paths: Object.keys(EXPERIMENTS).map(slug => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'content', 'experiments', `${params.slug}.html`);
  const html = fs.readFileSync(filePath, 'utf8');
  const { style, body, script } = parseExperimentHtml(html);

  return {
    props: {
      slug: params.slug,
      style,
      body,
      script,
    },
  };
}

const BACK_LINK_STYLE = {
  position: 'fixed',
  top: '10px',
  left: '10px',
  zIndex: 2147483647,
  background: 'rgba(0, 0, 0, 0.65)',
  color: '#fff',
  padding: '6px 12px',
  borderRadius: '6px',
  fontSize: '13px',
  fontFamily: 'sans-serif',
  textDecoration: 'none',
};

export default function Experiment({ slug, style, body, script }) {
  const { title, description } = EXPERIMENTS[slug];
  const injectedRef = useRef(false);

  useEffect(() => {
    if (injectedRef.current) return;
    injectedRef.current = true;

    const scriptEl = document.createElement('script');
    scriptEl.textContent = script;
    document.body.appendChild(scriptEl);

    document.dispatchEvent(new Event('DOMContentLoaded'));
    window.dispatchEvent(new Event('load'));
  }, [script]);

  return (
    <>
      <SeoHead title={`${title} — Nidhi Vedartham`} description={description} path={`/experiments/${slug}`} />
      <style dangerouslySetInnerHTML={{ __html: style }} />
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- deliberately a
          full page load, not client-side routing: see the file header. */}
      <a href="/projects" style={BACK_LINK_STYLE}>
        ← Projects &amp; Experiments
      </a>
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </>
  );
}
