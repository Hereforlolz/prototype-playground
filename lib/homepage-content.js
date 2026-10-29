// lib/homepage-content.js
//
// Homepage positioning copy, kept as plain data (no JSX) so it's testable
// with Node's built-in test runner and so the same strings can be reused
// on /projects for the metrics block without duplicating them.
'use strict';

const GREETING = "Hi, I'm Sreenidhi, a software/electrical engineer who also builds community programs.";

const HEADLINE = 'I find where systems break and work with people to build fixes that stick.';

const SUBTEXT =
  '8+ years across embedded IoT firmware, engineering-team enablement, community programs, and AI tool testing: same instinct applied to firmware bugs, unclear requirements, and unreliable model outputs.';

const PROOF_POINTS = [
  'Ivani: firmware debugging, data pipeline, and ML algorithm work on a 1,000+ node IoT deployment.',
  'Embark Women: co-founded a business community in Tyler, TX. Coordinated about 10–15 volunteers and helped raise around $5,000.',
  'AI adoption: tested prompting on real engineering queries, and the guidance spread across about 10 engineers in about two weeks.',
  'Hackathon-judged prototypes, from a Slack onboarding agent to a code-search knowledge graph.',
];

const METRIC_LINE =
  'AI adoption at Ivani: reusable prompt templates, a cheat sheet, and context guidance that spread from two engineers to roughly ten in about two weeks.';

// The directional savings estimates (an informal before/after comparison,
// not a controlled study) live only in the case study, not here, per
// explicit direction to keep this line to the adoption story itself.
const METRIC_DISCLOSURE =
  'A self-run comparison of original vs. structured prompts on real engineering queries at Ivani. The savings estimates it produced are directional observations, not controlled measurement; see the case study for those figures and their limits.';

// Plain-language entry points for non-technical visitors. Each detail
// leads with what the work does for people; tools are left to the pages.
const START_HERE = [
  {
    href: '/projects/prompt-engineering-adoption',
    title: 'How I helped my engineering team use AI better',
    detail: 'Reusable prompt templates, a cheat sheet, and context guidance that spread from two engineers to roughly ten in about two weeks. Start here for the clearest example of my work.',
  },
  {
    href: '/projects/pilotcraft',
    title: 'Deciding whether AI is even the right fix',
    detail: 'A tool that evaluates AI-adoption decisions against synthetic scenarios and deterministic checks, with tests that run against the live, production-built server.',
  },
  {
    href: '/projects/teamtrail',
    title: 'An onboarding helper that lives in Slack',
    detail: 'Helps new hires find the context they need on day one, instead of hunting for it, with source-grounded answers inside Slack.',
  },
  {
    href: '/about#leadership',
    title: 'Leading people, programs, and marketing',
    detail: 'Co-founding Embark Women, mentoring, the merge-checklist rollout, and co-leading Ivani’s marketing. The work behind the engineering.',
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
  GREETING,
  HEADLINE,
  SUBTEXT,
  PROOF_POINTS,
  METRIC_LINE,
  METRIC_DISCLOSURE,
  START_HERE,
  BANNED_BUZZWORDS,
};
