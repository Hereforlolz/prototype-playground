// lib/leadership.test.js
'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const { LEADERSHIP, EMBARK } = require('./leadership');
const { BANNED_BUZZWORDS } = require('./homepage-content');

const allText = [...LEADERSHIP.map(c => `${c.label} ${c.text}`), ...EMBARK].join(' ');

test('four leadership cards, each with a label and text', () => {
  assert.equal(LEADERSHIP.length, 4);
  for (const { label, text } of LEADERSHIP) {
    assert.ok(label.length > 0);
    assert.ok(text.length > 0);
  }
});

test('cards that link out have both an href and link text', () => {
  for (const card of LEADERSHIP) assert.equal(Boolean(card.href), Boolean(card.link));
});

test('no banned buzzwords, email addresses, or colleague names', () => {
  const lower = allText.toLowerCase();
  for (const word of BANNED_BUZZWORDS) assert.ok(!lower.includes(word), word);
  assert.doesNotMatch(allText, /@/);
  assert.doesNotMatch(allText, /shellie/i);
});

test('coaching is not claimed as years of personal coaching', () => {
  assert.doesNotMatch(allText, /4\+ years|four years/i);
  assert.match(allText, /wasn’t the coach/);
});

test('uncertain figures are labelled approximate and the checklist saving is not quantified', () => {
  assert.match(allText, /\(approximate\)/);
  assert.match(allText, /Those numbers are approximate/);
  assert.match(allText, /never measured the time/);
});

test('the Zero-Gravity time saving is not presented as an average', () => {
  assert.match(allText, /not an average/);
});
