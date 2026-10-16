'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const { MARKETING_INTRO, MARKETING_OWNED, MARKETING_OUTCOMES, MARKETING_SCOPE_NOTE } = require('./marketing-work');
const { BANNED_BUZZWORDS } = require('./homepage-content');

const allText = [MARKETING_INTRO, ...MARKETING_OWNED, ...MARKETING_OUTCOMES, MARKETING_SCOPE_NOTE].join(' ');

test('frames the role as co-leadership, not a contributor under a marketing lead', () => {
  assert.match(allText, /co-led/i);
  assert.doesNotMatch(allText, /under the marketing lead/i);
  assert.doesNotMatch(allText, /\bcontributor\b/i);
});

test('does not invent a formal title or direct reports', () => {
  assert.doesNotMatch(allText, /\bmarketing manager\b/i);
  assert.match(MARKETING_SCOPE_NOTE, /without a formal marketing-manager title or direct reports/);
});

test('uses approximate follower endpoints and does not claim a precise follower delta', () => {
  assert.match(allText, /1,000/);
  assert.match(allText, /1,300/);
  assert.doesNotMatch(allText, /400 (additional|more|new) followers/i);
});

test('does not claim completed demos, customers, revenue, or sole credit', () => {
  assert.doesNotMatch(allText, /completed demo/i);
  assert.doesNotMatch(allText, /\bcustomers\b/i);
  assert.doesNotMatch(allText, /\brevenue\b/i);
  assert.match(allText, /the co-lead and I operated together/i);
});

test('says the confidential reports are not published or independently audited', () => {
  assert.match(MARKETING_SCOPE_NOTE, /confidential/);
  assert.match(MARKETING_SCOPE_NOTE, /not .*independently audited|isn't published or claimed as independently audited/i);
});

test('no banned buzzwords', () => {
  const lower = allText.toLowerCase();
  for (const word of BANNED_BUZZWORDS) assert.ok(!lower.includes(word), word);
});
