// lib/case-study-explanations.js
//
// Reusable logic behind the "Explain simply / Overview" selector on a case
// study page. Kept as plain functions (no JSX) so the fallback behavior is
// testable with Node's built-in test runner independent of React, and so
// a future case study can opt in by adding an `explanations.simple` field
// without any component changes.
'use strict';

const DEFAULT_MODE = 'overview';

function hasSimpleExplanation(study) {
  return Boolean(
    study &&
    study.explanations &&
    study.explanations.simple &&
    Array.isArray(study.explanations.simple.sections) &&
    study.explanations.simple.sections.length > 0
  );
}

// Falls back to the default Overview mode whenever "simple" is requested
// but the study has no usable simple explanation, or the requested mode
// isn't recognized at all — a malformed or missing explanations field
// degrades to the existing case-study view instead of breaking the page.
function resolveExplanationMode(study, requestedMode) {
  if (requestedMode === 'simple' && hasSimpleExplanation(study)) return 'simple';
  return DEFAULT_MODE;
}

module.exports = { DEFAULT_MODE, hasSimpleExplanation, resolveExplanationMode };
