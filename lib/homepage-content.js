// lib/homepage-content.js
//
// Homepage positioning copy, kept as plain data (no JSX) so it's testable
// with Node's built-in test runner and so the same strings can be reused
// on /projects for the metrics block without duplicating them.
'use strict';

const HEADLINE = 'I find where systems break and build fixes people actually adopt.';

const SUBTEXT =
  'Eight years across embedded IoT firmware, cross-team technical strategy, and applied AI prototyping. Firmware bugs, unclear requirements, unreliable model outputs — same instinct, different layer of the stack. I build the fix, not just the diagnosis.';

const PROOF_POINTS = [
  'Contributed to the design and maintenance of the IoT data pipeline running in production at Ivani (edge collection through cloud ingestion), and built the applied-math/ML algorithms running on top of it.',
  'Evaluated prompt structure, context drift, hallucination risk, and workflow cost using real engineering queries, then turned it into guidance adopted organization-wide in about two weeks.',
  'Shipped hackathon-judged prototypes — from a Slack onboarding agent to a code-search knowledge graph — that explore real adoption problems, not just model demos.',
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
