// lib/case-studies.test.js
'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const { CASE_STUDIES } = require('./case-studies');
const { BANNED_BUZZWORDS } = require('./homepage-content');

const EXPECTED_SLUGS = ['teamtrail', 'qwenMemoryAgent'];

test('exactly the two flagship projects have case studies', () => {
  assert.deepEqual(Object.keys(CASE_STUDIES).sort(), [...EXPECTED_SLUGS].sort());
});

test('every case study has all required, non-empty sections', () => {
  for (const [key, study] of Object.entries(CASE_STUDIES)) {
    assert.ok(study.title, `${key} missing title`);
    assert.ok(study.repoUrl && study.repoUrl.startsWith('https://'), `${key} missing a real repoUrl`);
    assert.ok(Array.isArray(study.problem) && study.problem.length > 0, `${key} missing problem`);
    assert.ok(Array.isArray(study.approach) && study.approach.length > 0, `${key} missing approach`);
    assert.ok(Array.isArray(study.whatBroke) && study.whatBroke.length > 0, `${key} missing whatBroke`);
    assert.ok(Array.isArray(study.outcome) && study.outcome.length > 0, `${key} missing outcome`);
    assert.ok(study.scope && study.scope.length > 0, `${key} missing an honest scope note`);
    assert.ok(Array.isArray(study.stack) && study.stack.length > 0, `${key} missing a stack table`);
  }
});

test('case study content avoids banned buzzwords', () => {
  for (const [key, study] of Object.entries(CASE_STUDIES)) {
    const allText = [
      study.title, study.subtitle, study.tagline, study.scope,
      ...study.problem, ...study.approach, ...study.whatBroke, ...study.outcome,
    ].join(' ').toLowerCase();

    for (const word of BANNED_BUZZWORDS) {
      assert.equal(allText.includes(word), false, `${key} contains banned buzzword "${word}"`);
    }
  }
});

test('case studies never claim invented user counts, adoption, or benchmark numbers', () => {
  // These are hackathon prototypes with no evidenced user base or formal
  // benchmark — this is a regression guard against a future edit sneaking
  // in a "10,000 users" / "40% faster than X" style unverified claim.
  const overclaimPatterns = [
    /\d[\d,]*\+?\s*(users|customers|companies|teams)\b/i,
    /\bproduction[- ](deployment|grade|ready)\b/i,
    /\benterprise[- ]grade\b/i,
    /\btrusted by\b/i,
    /\b\d+% (faster|better|more accurate) than\b/i,
  ];

  for (const [key, study] of Object.entries(CASE_STUDIES)) {
    const allText = [
      study.title, study.subtitle, study.tagline, study.scope,
      ...study.problem, ...study.approach, ...study.whatBroke, ...study.outcome,
    ].join(' ');

    for (const pattern of overclaimPatterns) {
      assert.equal(pattern.test(allText), false, `${key} matched overclaim pattern ${pattern}`);
    }
  }
});

test('every case study honestly scopes itself as a hackathon submission, not a production product', () => {
  for (const [key, study] of Object.entries(CASE_STUDIES)) {
    assert.match(study.scope.toLowerCase(), /hackathon/, `${key} scope should acknowledge it's a hackathon submission`);
  }
});

test('each case study links to an analyticsEvent matching its flagship HIGHLIGHTS entry', () => {
  const { HIGHLIGHTS } = require('./projects-data');
  for (const study of Object.values(CASE_STUDIES)) {
    const highlight = HIGHLIGHTS.find(h => h.analyticsEvent === study.analyticsEvent);
    assert.ok(highlight, `no HIGHLIGHTS entry found with analyticsEvent "${study.analyticsEvent}"`);
  }
});
