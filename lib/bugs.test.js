// lib/bugs.test.js
//
// Regression coverage for bugs.json (the Manual Bugs Log rendered at
// /projects#bugs-log). Guards against the exact class of error found and
// fixed in the ADK entries: GitHub's "transfer issue" feature moves an
// issue to a different repo/number and silently redirects the old URL —
// so two bugs.json rows can link what look like two different issues
// (an old, pre-transfer URL and the current one) when they're actually
// the same underlying report, inflating the apparent count of distinct
// filed issues.
//
// KNOWN_ISSUE_REDIRECTS is a manually-verified map of every such transfer
// found so far (checked directly against GitHub, not assumed) — old URL
// -> current canonical URL. It exists so:
//   1. No entry can use a known-stale, pre-transfer URL going forward.
//   2. Two entries can never resolve to the same canonical destination,
//      even if one uses an old alias and the other the current URL.
// A collision either way is a data-integrity bug in bugs.json, not a
// legitimate pair of distinct reports, and should fail this test.
'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const bugs = require('../bugs.json');

// Verified 2026-09 by fetching each URL directly and observing GitHub's
// redirect, then cross-checked against `search_issues author:Hereforlolz`
// for both google/adk-python and google/adk-docs, which returned exactly
// the three canonical destinations below and no others.
const KNOWN_ISSUE_REDIRECTS = {
  'https://github.com/google/adk-python/issues/1592': 'https://github.com/google/adk-docs/issues/826',
  'https://github.com/google/adk-python/issues/1594': 'https://github.com/google/adk-docs/issues/473',
  'https://github.com/google/adk-python/issues/1595': 'https://github.com/google/adk-docs/issues/472',
};

function canonicalLink(link) {
  return KNOWN_ISSUE_REDIRECTS[link] || link;
}

test('bugs.json is a well-formed array of bug-log entries', () => {
  assert.ok(Array.isArray(bugs) && bugs.length > 0);
  for (const bug of bugs) {
    assert.ok(bug.title && bug.title.length > 0, 'entry missing a title');
    assert.ok(bug.why && bug.why.length > 0, `"${bug.title}" missing a why`);
    assert.ok(bug.status && bug.status.length > 0, `"${bug.title}" missing a status`);
    assert.equal(typeof bug.link, 'string', `"${bug.title}" link must be a string (possibly empty)`);
  }
});

test('no bug-log entry links a known pre-transfer (stale) GitHub issue URL', () => {
  for (const bug of bugs) {
    assert.ok(
      !(bug.link in KNOWN_ISSUE_REDIRECTS),
      `"${bug.title}" links ${bug.link}, which GitHub has transferred to ${KNOWN_ISSUE_REDIRECTS[bug.link]} — use the canonical URL instead`
    );
  }
});

test('no two bug-log entries resolve to the same canonical issue link', () => {
  // Catches both an exact duplicate link and the transfer-URL case: two
  // rows whose links differ as written but resolve to the same canonical
  // destination once redirects are followed.
  const seen = new Map();
  for (const bug of bugs) {
    if (!bug.link) continue; // "Not Reported" / undocumented-elsewhere entries carry no link
    const canonical = canonicalLink(bug.link);
    const prior = seen.get(canonical);
    assert.ok(
      !prior,
      `"${bug.title}" (${bug.link}) and "${prior}" both resolve to ${canonical} — duplicate entry for the same issue`
    );
    seen.set(canonical, bug.title);
  }
});
