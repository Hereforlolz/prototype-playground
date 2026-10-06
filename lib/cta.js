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
    // Routed through the contact form so no email address ships in the page.
    href: '/contact?type=role',
    event: 'email_click',
  },
  resume: {
    // The PDF is no longer served publicly; visitors request it by email.
    label: 'Request résumé',
    href: '/contact?type=resume',
    event: 'resume_request_click',
  },
  linkedin: {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/sreenidhivedartham',
    event: 'linkedin_click',
  },
};

module.exports = { CTA_ACTIONS };
