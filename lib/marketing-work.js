// lib/marketing-work.js
//
// About page: marketing co-leadership at Ivani (2022-Sept 2026), kept as
// plain data so the wording can be tested. This was functional
// co-leadership alongside a marketing co-lead, not a formal
// marketing-manager title, and it came with no direct reports. The
// follower and demo-inquiry figures are approximate and are shared
// outcomes, not solely attributable to this work; the reports they are
// drawn from are confidential and are not published or claimed as
// independently audited.
'use strict';

const MARKETING_INTRO =
  "From about 2022 through September 2026, I co-led Ivani's marketing work alongside a marketing co-lead, outside my core engineering role.";

const MARKETING_OWNED = [
  'Content planning, analytics, and writing: blog posts, social posts, and the review workflow that routed drafts for approval by risk level (technical accuracy, product claims, IP sensitivity).',
  'Built videos and graphics (Canva), and proposed new content formats for the team to try.',
  'Coordinated day to day with the marketing co-lead on what to publish and when.',
  'Recommended positioning, content strategy, and market alignment based on competitor analysis and monthly and quarterly reviews of impressions, follower growth, engagement, website analytics, and demo inquiries.',
  "Worked with the CEO, CTO, and marketing co-lead to shape the company's voice (open, honest, approachable, occasionally snarky) and to translate RF-sensing, Thread, and 802.15.4 concepts into B2B messaging for technical, executive, partner, and non-technical readers.",
  'Specced and iterated a six-variant Sensify scrollytelling demo through rounds of C-suite feedback, reframing it around what partners needed to understand.',
  'Owned GA4 and OKR reporting from 2024: monthly audits plus quarterly and annual reports used to set content priorities.',
  'Drafted the Sensify OEM integration whitepaper and designed a seven-piece one-pager library for OEM product managers.',
  'Wrote three scenario-based visitor personas and a demo playbook for CES 2023 booth conversations. These were internal planning material, not customer research.',
];

// Shared outcomes of the co-led effort, not solely attributable to this
// work. Follower counts are approximate endpoints, not a precise delta.
// Demo-inquiry attribution: LinkedIn messages, tracked website forms, and
// prospects who mentioned the content directly. No paid advertising: free
// tools plus a paid Canva subscription.
const MARKETING_OUTCOMES = [
  'Built the publishing system that the co-lead and I operated together, moving posting from little and irregular to roughly twice a week.',
  "Ivani's LinkedIn company page grew organically from about 1,000 to over 1,300 followers over about four years.",
  'The marketing work contributed to roughly 10 demo inquiries over about four years, tracked through LinkedIn messages, website contact forms, and prospects who mentioned the content directly.',
  'No paid advertising: free tools plus a paid Canva subscription.',
];

const MARKETING_SCOPE_NOTE =
  "This was functional co-leadership, done alongside a marketing co-lead and without a formal marketing-manager title or direct reports. More detailed reporting on these figures exists internally but is confidential, so it isn't published or claimed as independently audited here.";

module.exports = { MARKETING_INTRO, MARKETING_OWNED, MARKETING_OUTCOMES, MARKETING_SCOPE_NOTE };
