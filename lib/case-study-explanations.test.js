// lib/case-study-explanations.test.js
'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const { DEFAULT_MODE, hasSimpleExplanation, resolveExplanationMode } = require('./case-study-explanations');
const { CASE_STUDIES } = require('./case-studies');

test('the default mode is overview', () => {
  assert.equal(DEFAULT_MODE, 'overview');
});

test('PilotCraft has a usable simple explanation', () => {
  assert.equal(hasSimpleExplanation(CASE_STUDIES.pilotCraft), true);
});

test('a case study with no explanations field has no simple explanation', () => {
  assert.equal(hasSimpleExplanation(CASE_STUDIES.teamtrail), false);
});

test('requesting simple mode only resolves to simple when a simple explanation actually exists', () => {
  assert.equal(resolveExplanationMode(CASE_STUDIES.pilotCraft, 'simple'), 'simple');
  assert.equal(resolveExplanationMode(CASE_STUDIES.teamtrail, 'simple'), 'overview');
});

test('an unrecognized or missing mode falls back to overview', () => {
  assert.equal(resolveExplanationMode(CASE_STUDIES.pilotCraft, 'deepDive'), 'overview');
  assert.equal(resolveExplanationMode(CASE_STUDIES.pilotCraft, undefined), 'overview');
  assert.equal(resolveExplanationMode(CASE_STUDIES.pilotCraft, null), 'overview');
});

test('malformed explanations data does not report a usable simple explanation', () => {
  assert.equal(hasSimpleExplanation({ explanations: { simple: {} } }), false);
  assert.equal(hasSimpleExplanation({ explanations: { simple: { sections: [] } } }), false);
  assert.equal(hasSimpleExplanation({ explanations: {} }), false);
  assert.equal(hasSimpleExplanation(null), false);
  assert.equal(resolveExplanationMode({ explanations: { simple: {} } }, 'simple'), 'overview');
});
