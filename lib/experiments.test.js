// lib/experiments.test.js
'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const { EXPERIMENTS, FEATURED_EXPERIMENT } = require('./experiments');
const { CASE_STUDIES } = require('./case-studies');
const { HIGHLIGHTS } = require('./projects-data');

test('every experiment has a short intro and a how-to-try note', () => {
  for (const [slug, e] of Object.entries(EXPERIMENTS)) {
    assert.ok(e.intro && e.intro.length > 0, `${slug} intro`);
    assert.ok(e.howToTry && e.howToTry.length > 0, `${slug} howToTry`);
  }
});

test('the featured experiment is the AI Pitch Deck Generator and exists', () => {
  assert.equal(FEATURED_EXPERIMENT, 'ai-pitch-deck-generator');
  assert.ok(EXPERIMENTS[FEATURED_EXPERIMENT]);
});

test('no blanket "bring your own key" claim: keyless modes are named where they exist', () => {
  assert.match(EXPERIMENTS['ai-pitch-deck-generator'].howToTry, /no accounts or keys/);
  assert.match(EXPERIMENTS['ai-content-generator'].howToTry, /no key/i);
  assert.match(EXPERIMENTS['dream-excuse-generator'].howToTry, /no key/i);
});

test('PilotCraft links its live demo on the card and the case study', () => {
  const url = 'https://ai-adoption-strategy-generator.ai.studio/';
  assert.equal(CASE_STUDIES.pilotCraft.liveUrl, url);
  assert.equal(HIGHLIGHTS.find(h => h.title === 'PilotCraft').liveUrl, url);
});

test('PilotCraft copy no longer says there is no deployment, and does not claim adoption', () => {
  const card = HIGHLIGHTS.find(h => h.title === 'PilotCraft').blurb;
  assert.doesNotMatch(card, /no live deployment/i);
  assert.doesNotMatch(CASE_STUDIES.pilotCraft.scope, /no deployment exists/i);
  assert.match(CASE_STUDIES.pilotCraft.scope, /doesn’t mean it has workplace adoption or validated business results/);
  assert.match(CASE_STUDIES.pilotCraft.scope, /processed by Gemini/);
});
