// lib/experiment-html.js
//
// Splits one of the self-contained HTML files in content/experiments/
// into its <style>, <body>, and <script> pieces, so pages/experiments/
// [slug].js can render the body/style directly and re-execute the
// script client-side (see components/LegacyToolPage.js) instead of
// needing each tool rewritten as a React component.
'use strict';

const INLINE_SCRIPT_PATTERN = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g;

function parseExperimentHtml(html) {
  const styleMatch = html.match(/<style[^>]*>([\s\S]*?)<\/style>/);
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/);
  const scriptMatch = html.match(INLINE_SCRIPT_PATTERN);

  if (!bodyMatch) {
    throw new Error('experiment HTML is missing a <body> element');
  }

  // The original tools put their <script> inside <body>, so the body
  // capture above still contains it verbatim. Left in place, the
  // server-rendered HTML would have the browser's native parser execute
  // it once on load, and the page's own useEffect injection (see
  // pages/experiments/[slug].js) would execute it a second time —
  // throwing "Identifier already declared" for every top-level
  // const/let the script declares. Strip it out of the body here so the
  // script only ever runs through that single, controlled injection.
  const body = bodyMatch[1].replace(INLINE_SCRIPT_PATTERN, '');

  return {
    style: styleMatch ? styleMatch[1] : '',
    body,
    script: scriptMatch ? scriptMatch.map(tag => tag.replace(/<script[^>]*>|<\/script>/g, '')).join('\n') : '',
  };
}

module.exports = { parseExperimentHtml };
