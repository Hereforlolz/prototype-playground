// lib/zero-gravity.js
//
// Copy for the "Zero-Gravity Thinker" section on the About page, kept as
// plain data so it can be tested. The role definition comes from Ivani's own
// framing (Master Stories in Notion); the practices restate résumé bullets.
'use strict';

const ZG_INTRO =
  'At Ivani, a Zero-Gravity Thinker is dropped into a team to work through a problem alongside them, not to teach them or take the project over. It was the part of my job I got asked about most.';

const ZG_IS = [
  'Slowing a team down when it is heading down a narrow path.',
  'Asking the naive question that opens up other options. Sometimes it solves the problem, sometimes it costs a little time now to save a lot later.',
];

const ZG_IS_NOT = [
  'Running a strategy workshop.',
  'Handing down expert advice.',
  'Taking the project over.',
];

const ZG_PRACTICES = [
  'Embed with a team as an outside perspective and challenge assumptions before they become downstream problems.',
  'Sketch requirements with engineers at a high level before they dive into detail, and keep the work followable with plans of action on Slack, worklogs, and block diagrams.',
  'Bridge stakeholders and engineering: raise hesitant questions in standups early, and pass honest engineer feedback upward in a form the company can act on.',
  'Help engineers stuck in a narrow debugging loop step back, and sometimes a bug someone had been stuck on for days got worked through in about twenty minutes. That is not an average.',
];

module.exports = { ZG_INTRO, ZG_IS, ZG_IS_NOT, ZG_PRACTICES };
