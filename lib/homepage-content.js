// lib/homepage-content.js
//
// Homepage positioning copy, kept as plain data (no JSX) so it's testable
// with Node's built-in test runner and so the same strings can be reused
// on /projects for the metrics block without duplicating them.
'use strict';

const HEADLINE = 'I find where systems break and work with people to build fixes that stick.';

const SUBTEXT =
  '8+ years across embedded IoT firmware, helping engineering teams, building community programs, and testing AI tools. Firmware bugs, unclear requirements, unreliable model outputs: same instinct, different layer. I build the fix, not just the diagnosis.';

const PROOF_POINTS = [
  'Ivani: firmware debugging, data pipeline, and ML algorithm work on a 1,000+ node IoT deployment.',
  'Embark Women: co-founded a business community in Tyler, TX. Coordinated about 10–15 volunteers and helped raise around $5,000.',
  'AI adoption: tested prompting on real engineering queries, and the guidance spread across about 10 engineers in about two weeks.',
  'Hackathon-judged prototypes, from a Slack onboarding agent to a code-search knowledge graph.',
];

const METRIC_LINE = 'Internal rollout estimates: ~50% less rework and ~8 minutes saved per engineering query.';

// Softened per explicit direction: frame this as an early-AI-adoption-era
// challenge, not a critique of a specific employer's rollout execution.
// Still honest that these are unaudited, resume-narrative figures, not a
// formal study — see Master Stories in Notion, which labels them exactly
// that way.
const METRIC_DISCLOSURE =
  'Internal estimates from an early-AI-adoption rollout at Ivani, based on before/after comparisons of vague vs. structured prompting on real engineering queries — directional, not independently validated research.';

// Plain-language entry points for non-technical visitors. Each detail
// leads with what the work does for people; tools are left to the pages.
const START_HERE = [
  {
    href: '/projects/prompt-engineering-adoption',
    title: 'How I helped my engineering team use AI better',
    detail: 'Structured prompting guidance, adopted across the engineering team (about 10 people) in about two weeks. Start here for the clearest example of my work.',
  },
  {
    href: '/projects/teamtrail',
    title: 'An onboarding helper that lives in Slack',
    detail: 'Helps new hires find the context they need on day one, instead of hunting for it.',
  },
  {
    href: '/about#leadership',
    title: 'Leading people and programs',
    detail: 'Co-founding Embark Women, mentoring, and running the checklist that cut merge times. The work behind the engineering.',
  },
  {
    href: '/playground',
    title: 'Side experiments: small AI tools you can try',
    detail: 'Playful and secondary to the projects above, like a pitch-deck maker. Each one says how to try it.',
  },
];

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
  START_HERE,
  BANNED_BUZZWORDS,
};
