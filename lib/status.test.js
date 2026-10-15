// lib/status.test.js
'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const { LOCATION, RELOCATION, WORK_AUTHORIZATION, AVAILABILITY } = require('./status');

test('location and relocation stance are present and non-empty', () => {
  assert.ok(LOCATION.length > 0);
  assert.match(RELOCATION.toLowerCase(), /relocat/);
});

test('availability names the roles being sought', () => {
  assert.match(AVAILABILITY, /available now/i);
  assert.match(AVAILABILITY, /program management/);
  assert.match(AVAILABILITY, /AI enablement/);
});

test('work authorization matches the resume: H-1B transfer, approved I-140, no new sponsorship implied', () => {
  assert.match(WORK_AUTHORIZATION, /H-1B transfer/);
  assert.match(WORK_AUTHORIZATION, /I-140/);
  assert.match(WORK_AUTHORIZATION.toLowerCase(), /no lottery/);
});
