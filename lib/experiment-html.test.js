// lib/experiment-html.test.js
'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const { parseExperimentHtml } = require('./experiment-html');
const { EXPERIMENTS } = require('./experiments');

test('parses style, body, and script out of a self-contained HTML tool with the script outside <body>', () => {
  const html = `<!DOCTYPE html>
<html>
<head><style>body { color: red; }</style></head>
<body><h1>Hi</h1></body>
</html>
<script>console.log('hi');</script>`;

  const { style, body, script } = parseExperimentHtml(html);

  assert.equal(style.trim(), 'body { color: red; }');
  assert.equal(body.trim(), '<h1>Hi</h1>');
  assert.equal(script.trim(), "console.log('hi');");
});

test('strips the <script> out of the body when it lives inside <body>, like the real tool files do', () => {
  // Regression test: every file in content/experiments/ puts its <script>
  // right before </body>. If the body capture still contained it,
  // dangerouslySetInnerHTML would render a real, server-rendered <script>
  // tag that the browser's native parser executes once on load — then
  // the page's own useEffect injection runs it again, throwing
  // "Identifier already declared" for every top-level const/let.
  const html = `<html><body><h1>Hi</h1><script>const x = 1;</script></body></html>`;

  const { body, script } = parseExperimentHtml(html);

  assert.doesNotMatch(body, /<script/);
  assert.equal(script.trim(), 'const x = 1;');
});

test('throws when the HTML has no <body>, rather than silently rendering nothing', () => {
  assert.throws(() => parseExperimentHtml('<html><head></head></html>'));
});

test('every experiment in lib/experiments.js has a parseable content file with no leftover <script> in its body', () => {
  for (const slug of Object.keys(EXPERIMENTS)) {
    const filePath = path.join(__dirname, '..', 'content', 'experiments', `${slug}.html`);
    const html = fs.readFileSync(filePath, 'utf8');
    const { body, script } = parseExperimentHtml(html);

    assert.ok(body.trim().length > 0, `${slug} should have non-empty body content`);
    assert.ok(script.trim().length > 0, `${slug} should have non-empty script content`);
    assert.doesNotMatch(body, /<script/, `${slug}'s body should not still contain a <script> tag`);
  }
});
