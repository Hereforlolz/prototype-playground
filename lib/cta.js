// lib/cta.js
//
// Shared call-to-action data (labels, hrefs, analytics event names) used by
// both the sidebar contact links and the closing CTA component, so there's
// one source of truth for where each action points and what it's tracked
// as. Plain data, no JSX, testable with Node's built-in test runner.
'use strict';

const CTA_ACTIONS = {
  discussRole: {
    label: 'Discuss a role',
    href: 'mailto:svedartham92@gmail.com?subject=AI%20enablement%20opportunity',
    event: 'email_click',
  },
  resume: {
    label: 'Download résumé',
    href: '/Sreenidhi-Vedartham-Resume.pdf',
    event: 'resume_download',
  },
  linkedin: {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/sreenidhivedartham',
    event: 'linkedin_click',
  },
};

module.exports = { CTA_ACTIONS };
