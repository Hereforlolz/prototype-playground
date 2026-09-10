// lib/case-study-links.js
//
// Pure logic for which action buttons a case study's header should show
// (repo/Devpost/LinkedIn), pulled out of components/CaseStudy.js so it's
// testable with Node's built-in test runner independent of React — same
// rationale as case-study-explanations.js. Most case studies have a
// repoUrl, but a workplace retrospective with no public repo (e.g.
// promptEngineeringAdoption) legitimately has none, so the button row
// has to be conditional rather than assumed.
'use strict';

function repoLabel(repoUrl) {
  try {
    const host = new URL(repoUrl).hostname;
    if (host.includes('gitlab')) return 'View on GitLab';
    if (host.includes('github')) return 'View on GitHub';
  } catch {
    // fall through to the generic label below
  }
  return 'View repository';
}

function hasAnyCaseStudyLink(study) {
  return Boolean(study.repoUrl || study.devpostUrl || study.linkedinUrl);
}

module.exports = { repoLabel, hasAnyCaseStudyLink };
