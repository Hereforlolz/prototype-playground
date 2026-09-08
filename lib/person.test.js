// lib/person.test.js
'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const { PERSON_JSON_LD } = require('./person');
const { CTA_ACTIONS } = require('./cta');
const { SITE_URL } = require('./seo');

test('Person JSON-LD is well-formed schema.org data', () => {
  assert.equal(PERSON_JSON_LD['@context'], 'https://schema.org');
  assert.equal(PERSON_JSON_LD['@type'], 'Person');
  assert.ok(PERSON_JSON_LD.name.length > 0);
  assert.equal(PERSON_JSON_LD.url, SITE_URL);
});

test('sameAs links are real https URLs and reuse the shared LinkedIn link, not a second hardcoded copy', () => {
  assert.ok(Array.isArray(PERSON_JSON_LD.sameAs));
  assert.ok(PERSON_JSON_LD.sameAs.length > 0);
  for (const link of PERSON_JSON_LD.sameAs) {
    assert.ok(link.startsWith('https://'), `${link} should be a public https URL`);
  }
  assert.ok(PERSON_JSON_LD.sameAs.includes(CTA_ACTIONS.linkedin.href));
});
