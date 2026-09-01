// lib/analytics.js
//
// Wraps @vercel/analytics' track() so a client-side analytics failure can
// never block navigation — e.g. a click handler on an <a href> throwing
// is exactly the kind of thing that shouldn't get in the way of the link
// actually working. Accepts an injectable track function so this is
// testable with Node's built-in test runner without mocking the module.
'use strict';

const { track } = require('@vercel/analytics');

function safeTrack(name, properties, trackFn) {
  const fn = trackFn || track;
  try {
    fn(name, properties);
  } catch (err) {
    console.error(`Analytics tracking failed for "${name}":`, err);
  }
}

module.exports = { safeTrack };
