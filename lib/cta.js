// lib/cta.js
//
// Shared call-to-action data (labels, hrefs, analytics event names) used by
// both the sidebar contact links and the closing CTA component, so there's
// one source of truth for where each action points and what it's tracked
// as. Plain data, no JSX, testable with Node's built-in test runner.
'use strict';

const CTA_ACTIONS = {
  contact: {
    // One contact form for both roles and the résumé (the PDF isn't served
    // publicly). Routed through the form so no email address ships in the page.
    label: 'Get in touch',
    href: '/contact',
    event: 'contact_click',
  },
  linkedin: {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/sreenidhivedartham',
    event: 'linkedin_click',
  },
};

module.exports = { CTA_ACTIONS };
