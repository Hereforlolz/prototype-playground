// lib/background.test.js
'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const { EARLIER_ROLE, EDUCATION, CERTIFICATIONS, LANGUAGES, TECHNICAL_ACTIVITIES } = require('./background');
const { BANNED_BUZZWORDS } = require('./homepage-content');

const allText = [
  EARLIER_ROLE.title,
  ...EARLIER_ROLE.items,
  ...EDUCATION.flatMap(e => [e.degree, e.school]),
  ...CERTIFICATIONS.flatMap(c => [c.name, c.issuer]),
  ...LANGUAGES,
  ...TECHNICAL_ACTIVITIES,
].join(' ');

test('every section has content', () => {
  assert.ok(EARLIER_ROLE.items.length > 0);
  assert.ok(EDUCATION.length > 0);
  assert.ok(CERTIFICATIONS.length > 0);
  assert.ok(LANGUAGES.length > 0);
  assert.ok(TECHNICAL_ACTIVITIES.length > 0);
});

test('every certification links to its public Credly badge', () => {
  for (const { name, href } of CERTIFICATIONS) {
    assert.match(href, /^https:\/\/www\.credly\.com\/badges\/[0-9a-f-]{36}\/public_url$/, name);
  }
});

test('no banned buzzwords or email addresses', () => {
  const lower = allText.toLowerCase();
  for (const word of BANNED_BUZZWORDS) assert.ok(!lower.includes(word), word);
  assert.doesNotMatch(allText, /@/);
});
