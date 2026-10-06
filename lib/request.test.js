// lib/request.test.js
'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const { validateRequest, createRateLimiter } = require('./request');

test('accepts a valid email and defaults type to resume', () => {
  const result = validateRequest({ email: ' a@b.co ' });
  assert.equal(result.ok, true);
  assert.deepEqual(result.value, { type: 'resume', email: 'a@b.co', name: '', message: '' });
});

test('rejects missing or malformed emails', () => {
  for (const email of [undefined, '', 'nope', 'a@b', 'a b@c.com', 42]) {
    assert.equal(validateRequest({ email }).ok, false, String(email));
  }
});

test('unknown type falls back to resume; role is kept', () => {
  assert.equal(validateRequest({ email: 'a@b.co', type: 'x' }).value.type, 'resume');
  assert.equal(validateRequest({ email: 'a@b.co', type: 'role' }).value.type, 'role');
});

test('filled honeypot is flagged as spam', () => {
  const result = validateRequest({ email: 'a@b.co', website: 'http://spam' });
  assert.equal(result.ok, false);
  assert.equal(result.spam, true);
});

test('long message is truncated', () => {
  const result = validateRequest({ email: 'a@b.co', message: 'x'.repeat(5000) });
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
