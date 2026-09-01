// lib/homepage-content.js
//
// Homepage positioning copy, kept as plain data (no JSX) so it's testable
// with Node's built-in test runner and so the same strings can be reused
// on /projects for the metrics block without duplicating them.
'use strict';

const HEADLINE = 'I turn AI experimentation into workflows people can actually use.';

const SUBTEXT =
  'I investigate where AI tools break down — unclear prompts, context drift, unreliable outputs, or difficult onboarding — then build practical guidance and prototypes that help teams adopt them responsibly.';

const PROOF_POINTS = [
  'Evaluated prompt structure, context drift, hallucination risk, and workflow cost using real engineering queries.',
  'Turned the findings into reusable guidance adopted across the organization in approximately two weeks.',
  'Built onboarding and memory-agent prototypes that explore practical adoption problems, not just model demos.',
];

const METRIC_LINE = 'Internal rollout estimates: ~50% less rework and ~8 minutes saved per engineering query.';

// Softened per explicit direction: frame this as an early-AI-adoption-era
// challenge, not a critique of a specific employer's rollout execution.
// Still honest that these are unaudited, resume-narrative figures, not a
// formal study — see Master Stories in Notion, which labels them exactly
// that way.
const METRIC_DISCLOSURE =
  'Internal estimates from an early-AI-adoption rollout at Ivani, based on before/after comparisons of vague vs. structured prompting on real engineering queries — directional, not independently validated research.';

// Words the brief explicitly asked to avoid anywhere in this copy.
const BANNED_BUZZWORDS = [
  'cutting-edge',
  'revolutionary',
  'visionary',
  'ai enthusiast',
  'leveraging ai',
];

module.exports = {
  HEADLINE,
  SUBTEXT,
  PROOF_POINTS,
  METRIC_LINE,
  METRIC_DISCLOSURE,
  BANNED_BUZZWORDS,
};
