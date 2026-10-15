// lib/request.test.js
'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const { validateRequest, createRateLimiter, MIN_FILL_MS } = require('./request');

// A plausible human fill time, so tests only vary what they are about.
const ok = { elapsedMs: MIN_FILL_MS + 1000 };

test('accepts a valid email and defaults type to resume', () => {
  const result = validateRequest({ ...ok, email: ' a@b.co ' });
  assert.equal(result.ok, true);
  assert.deepEqual(result.value, { type: 'resume', email: 'a@b.co', name: '', message: '' });
});

test('rejects missing or malformed emails', () => {
  for (const email of [undefined, '', 'nope', 'a@b', 'a b@c.com', 42]) {
    assert.equal(validateRequest({ ...ok, email }).ok, false, String(email));
  }
});

test('unknown type falls back to resume; role is kept', () => {
  assert.equal(validateRequest({ ...ok, email: 'a@b.co', type: 'x' }).value.type, 'resume');
  assert.equal(validateRequest({ ...ok, email: 'a@b.co', type: 'role' }).value.type, 'role');
});

test('filled honeypot is flagged as spam', () => {
  const result = validateRequest({ ...ok, email: 'a@b.co', website: 'http://spam' });
  assert.equal(result.ok, false);
  assert.equal(result.spam, true);
});

test('long message is truncated', () => {
  const result = validateRequest({ ...ok, email: 'a@b.co', message: 'x'.repeat(5000) });
  assert.equal(result.value.message.length, 1000);
});

test('rate limiter blocks after max hits and recovers after the window', () => {
  let t = 0;
  const allow = createRateLimiter({ max: 2, windowMs: 1000, now: () => t });
  assert.equal(allow('ip'), true);
  assert.equal(allow('ip'), true);
  assert.equal(allow('ip'), false);
  assert.equal(allow('other'), true);
  t = 1500;
  assert.equal(allow('ip'), true);
});

test('missing, non-numeric, or too-fast fill time is flagged as spam', () => {
  for (const elapsedMs of [undefined, 'fast', NaN, 0, MIN_FILL_MS - 1]) {
    const result = validateRequest({ email: 'a@b.co', elapsedMs });
    assert.equal(result.ok, false, String(elapsedMs));
    assert.equal(result.spam, true, String(elapsedMs));
  }
  assert.equal(validateRequest({ email: 'a@b.co', elapsedMs: MIN_FILL_MS }).ok, true);
});

test('more than one link in the message or name is flagged as spam; one is fine', () => {
  const two = validateRequest({ ...ok, email: 'a@b.co', message: 'see http://a.example and www.b.example' });
  assert.equal(two.spam, true);
  const inName = validateRequest({ ...ok, email: 'a@b.co', name: 'http://x.example', message: 'https://y.example' });
  assert.equal(inName.spam, true);
  const one = validateRequest({ ...ok, email: 'a@b.co', message: 'my portfolio: https://me.example' });
  assert.equal(one.ok, true);
});

test('line breaks in the name are collapsed so they cannot forge email lines', () => {
  const result = validateRequest({ ...ok, email: 'a@b.co', name: 'Sam\r\nType: role\n  Smith' });
  assert.equal(result.value.name, 'Sam Type: role Smith');
});
