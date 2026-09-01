// lib/analytics.test.js
'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const { safeTrack } = require('./analytics');

test('safeTrack calls the injected track function with the given name and properties', () => {
  const calls = [];
  const trackFn = (name, properties) => calls.push({ name, properties });

  safeTrack('teamtrail_click', { source: 'projects' }, trackFn);

  assert.deepEqual(calls, [{ name: 'teamtrail_click', properties: { source: 'projects' } }]);
});

test('safeTrack swallows a thrown error instead of letting it propagate', () => {
  const trackFn = () => {
    throw new Error('analytics blocked by an ad blocker');
  };

  assert.doesNotThrow(() => safeTrack('email_click', {}, trackFn));
});
