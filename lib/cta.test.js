// lib/cta.test.js
'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const { CTA_ACTIONS } = require('./cta');

test('discussRole routes to the contact form, never a mailto with a real address', () => {
  const { discussRole } = CTA_ACTIONS;
  assert.equal(discussRole.label, 'Discuss a role');
  assert.equal(discussRole.href, '/contact?type=role');
  assert.doesNotMatch(discussRole.href, /mailto:|@/);
  assert.equal(discussRole.event, 'email_click');
});

test('resume is a request form link, not a public PDF', () => {
  const { resume } = CTA_ACTIONS;
  assert.equal(resume.label, 'Request résumé');
  assert.equal(resume.href, '/contact?type=resume');
  assert.doesNotMatch(resume.href, /\.pdf$/);
  assert.equal(resume.event, 'resume_request_click');
});

test('no CTA exposes an email address', () => {
  for (const action of Object.values(CTA_ACTIONS)) {
    assert.doesNotMatch(action.href, /[^\s/]+@[^\s/]+\.[a-z]{2,}/i);
  }
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
