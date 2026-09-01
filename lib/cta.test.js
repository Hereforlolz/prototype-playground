// lib/cta.test.js
'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const { CTA_ACTIONS } = require('./cta');

test('discussRole is a mailto link with the expected subject and event name', () => {
  const { discussRole } = CTA_ACTIONS;
  assert.equal(discussRole.label, 'Discuss a role');
  assert.match(discussRole.href, /^mailto:/);
  assert.match(discussRole.href, /subject=AI%20enablement%20opportunity/);
  assert.equal(discussRole.event, 'email_click');
});

test('resume points at a downloadable file and fires resume_download', () => {
  const { resume } = CTA_ACTIONS;
  assert.equal(resume.label, 'Download résumé');
  assert.match(resume.href, /\.pdf$/);
  assert.equal(resume.event, 'resume_download');
});

test('linkedin points at a real linkedin.com URL and fires linkedin_click', () => {
  const { linkedin } = CTA_ACTIONS;
  assert.equal(linkedin.label, 'LinkedIn');
  assert.match(linkedin.href, /^https:\/\/www\.linkedin\.com\//);
  assert.equal(linkedin.event, 'linkedin_click');
});

test('every action has a non-empty label, href, and event', () => {
  for (const [key, action] of Object.entries(CTA_ACTIONS)) {
    assert.ok(action.label && action.label.length > 0, `${key} missing label`);
    assert.ok(action.href && action.href.length > 0, `${key} missing href`);
    assert.ok(action.event && action.event.length > 0, `${key} missing event`);
  }
});
