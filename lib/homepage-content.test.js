// lib/homepage-content.test.js
'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const {
  HEADLINE,
  SUBTEXT,
  PROOF_POINTS,
  METRIC_LINE,
  METRIC_DISCLOSURE,
  START_HERE,
  BANNED_BUZZWORDS,
} = require('./homepage-content');

test('headline + subtext position as a generalist engineer whose scope includes AI work, not an AI-only identity', () => {
  assert.ok(HEADLINE.length > 0);
  assert.doesNotMatch(HEADLINE.toLowerCase(), /^i (turn|build) ai/);
  // AI scope no longer needs to be in the very first sentence; it just
  // has to show up in the above-the-fold intro (headline + subtext
  // together), which is what a recruiter actually reads in one pass.
  assert.match(`${HEADLINE} ${SUBTEXT}`, /AI/);
});

test('subtext and proof points exist and are non-empty', () => {
  assert.ok(SUBTEXT.length > 0);
  assert.ok(Array.isArray(PROOF_POINTS));
  assert.equal(PROOF_POINTS.length, 4);
  for (const point of PROOF_POINTS) {
    assert.ok(point.length > 0);
  }
});

test('metric line tells the adoption-spread story, not the savings figures', () => {
  assert.match(METRIC_LINE, /two engineers/);
  assert.match(METRIC_LINE, /roughly ten/);
  assert.doesNotMatch(METRIC_LINE, /50%/);
  assert.doesNotMatch(METRIC_LINE, /8 minutes/);
});

test('metric disclosure frames this as a self-run comparison and points savings figures to the case study', () => {
  assert.match(METRIC_DISCLOSURE, /self-run comparison/i);
  assert.match(METRIC_DISCLOSURE, /directional observations/i);
  assert.match(METRIC_DISCLOSURE, /case study/i);
  assert.doesNotMatch(METRIC_DISCLOSURE, /50%/);
  assert.doesNotMatch(METRIC_DISCLOSURE, /8 minutes/);
});

test('none of the homepage copy uses banned buzzwords', () => {
  const allCopy = [HEADLINE, SUBTEXT, METRIC_LINE, METRIC_DISCLOSURE, ...PROOF_POINTS]
    .join(' ')
    .toLowerCase();

  for (const word of BANNED_BUZZWORDS) {
    assert.equal(allCopy.includes(word), false, `copy must not contain banned buzzword "${word}"`);
  }
});

test('start here leads with the three strongest examples, then leadership/marketing, then playground', () => {
  const hrefs = START_HERE.map(item => item.href);
  assert.deepEqual(hrefs.slice(0, 3), [
    '/projects/prompt-engineering-adoption',
    '/projects/pilotcraft',
    '/projects/teamtrail',
  ]);
  assert.ok(hrefs.includes('/about#leadership'));
  assert.equal(hrefs[hrefs.length - 1], '/playground');
});

test('copy does not overclaim a research/ML-scientist identity', () => {
  const allCopy = [HEADLINE, SUBTEXT, ...PROOF_POINTS].join(' ').toLowerCase();
  assert.equal(allCopy.includes('ai researcher'), false);
  assert.equal(allCopy.includes('machine learning engineer'), false);
});
