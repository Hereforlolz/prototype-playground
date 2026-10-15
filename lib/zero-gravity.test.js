// lib/zero-gravity.test.js
'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const { ZG_INTRO, ZG_IS, ZG_IS_NOT, ZG_PRACTICES } = require('./zero-gravity');
const { BANNED_BUZZWORDS } = require('./homepage-content');

const allText = [ZG_INTRO, ...ZG_IS, ...ZG_IS_NOT, ...ZG_PRACTICES].join(' ');

test('every list is non-empty', () => {
  for (const list of [ZG_IS, ZG_IS_NOT, ZG_PRACTICES]) assert.ok(list.length > 0);
  assert.ok(ZG_INTRO.length > 0);
});

test('frames the role as collaboration, not teaching or takeover', () => {
  assert.match(ZG_INTRO, /not to teach/);
  assert.match(ZG_IS_NOT.join(' '), /Taking the project over/);
});

test('no banned buzzwords, email addresses, or colleague names', () => {
  const lower = allText.toLowerCase();
  for (const word of BANNED_BUZZWORDS) assert.ok(!lower.includes(word), word);
  assert.doesNotMatch(allText, /@/);
  assert.doesNotMatch(allText, /shellie/i);
});
