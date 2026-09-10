// lib/case-study-links.test.js
'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const { repoLabel, hasAnyCaseStudyLink } = require('./case-study-links');
const { CASE_STUDIES } = require('./case-studies');

test('repoLabel identifies GitHub and GitLab hosts, and falls back for anything else', () => {
  assert.equal(repoLabel('https://github.com/Hereforlolz/teamtrail'), 'View on GitHub');
  assert.equal(repoLabel('https://gitlab.com/gitlab-ai-hackathon/transcend/39335192'), 'View on GitLab');
  assert.equal(repoLabel('https://example.com/some/repo'), 'View repository');
  assert.equal(repoLabel('not a url'), 'View repository');
});

test('hasAnyCaseStudyLink is false for a case study with no repoUrl, devpostUrl, or linkedinUrl', () => {
  // promptEngineeringAdoption is a workplace retrospective with no public
  // repo, Devpost entry, or source document — the button row must not
  // render for it.
  assert.equal(hasAnyCaseStudyLink(CASE_STUDIES.promptEngineeringAdoption), false);
  assert.equal(hasAnyCaseStudyLink({}), false);
});

test('every other existing case study still reports at least one action link', () => {
  // Regression guard: extracting this logic out of CaseStudy.js must not
  // change behavior for any of the seven pre-existing case studies, all
  // of which have a real repoUrl.
  for (const [key, study] of Object.entries(CASE_STUDIES)) {
    if (key === 'promptEngineeringAdoption') continue;
    assert.equal(hasAnyCaseStudyLink(study), true, `${key} should still report an action link`);
  }
});
