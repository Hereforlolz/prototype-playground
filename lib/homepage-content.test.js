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
  BANNED_BUZZWORDS,
} = require('./homepage-content');

test('headline positions as a generalist engineer whose scope includes AI work, not an AI-only identity', () => {
  assert.match(HEADLINE, /AI/);
  assert.ok(HEADLINE.length > 0);
  assert.doesNotMatch(HEADLINE.toLowerCase(), /^i (turn|build) ai/);
});

test('subtext and proof points exist and are non-empty', () => {
  assert.ok(SUBTEXT.length > 0);
  assert.ok(Array.isArray(PROOF_POINTS));
  assert.equal(PROOF_POINTS.length, 3);
  for (const point of PROOF_POINTS) {
    assert.ok(point.length > 0);
  }
});

test('metric line states the internal rollout estimates', () => {
  assert.match(METRIC_LINE, /~50%/);
  assert.match(METRIC_LINE, /~8 minutes/);
});

test('metric disclosure frames the figures as an early-AI-adoption-era internal estimate, not validated research', () => {
  assert.match(METRIC_DISCLOSURE, /early-AI-adoption/);
  assert.match(METRIC_DISCLOSURE, /internal estimate/i);
  assert.match(METRIC_DISCLOSURE, /not independently validated/i);
});

test('none of the homepage copy uses banned buzzwords', () => {
  const allCopy = [HEADLINE, SUBTEXT, METRIC_LINE, METRIC_DISCLOSURE, ...PROOF_POINTS]
    .join(' ')
    .toLowerCase();

  for (const word of BANNED_BUZZWORDS) {
    assert.equal(allCopy.includes(word), false, `copy must not contain banned buzzword "${word}"`);
  }
});

test('copy does not overclaim a research/ML-scientist identity', () => {
  const allCopy = [HEADLINE, SUBTEXT, ...PROOF_POINTS].join(' ').toLowerCase();
  assert.equal(allCopy.includes('ai researcher'), false);
  assert.equal(allCopy.includes('machine learning engineer'), false);
});
