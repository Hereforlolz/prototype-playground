// lib/ivani-work.test.js
'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const { IVANI_WORK } = require('./ivani-work');
const { BANNED_BUZZWORDS } = require('./homepage-content');

const allText = IVANI_WORK.flatMap(g => [g.group, ...g.items]).join(' ');

test('every group has a heading and at least one item', () => {
  assert.ok(IVANI_WORK.length > 0);
  for (const { group, items } of IVANI_WORK) {
    assert.ok(group.length > 0);
    assert.ok(items.length > 0);
  }
});

test('no banned buzzwords, email addresses, or colleague names', () => {
  const lower = allText.toLowerCase();
  for (const word of BANNED_BUZZWORDS) assert.ok(!lower.includes(word), word);
  assert.doesNotMatch(allText, /@/);
  assert.doesNotMatch(allText, /shellie/i);
});

test('marketing co-leadership lives in its own section, not here', () => {
  assert.doesNotMatch(allText, /marketing/i);
});

test('the firmware and hardware group comes first', () => {
  assert.equal(IVANI_WORK[0].group, 'Firmware, hardware, and data');
});
