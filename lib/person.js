// lib/person.js
//
// Person JSON-LD for the homepage, so an LLM or a search engine's
// knowledge graph can resolve identity deterministically instead of
// inferring it from prose. sameAs reuses the same LinkedIn URL as
// lib/cta.js rather than a second hardcoded copy, so the two can't drift.
'use strict';

const { SITE_URL } = require('./seo');
const { CTA_ACTIONS } = require('./cta');

const PERSON_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Sreenidhi Vedartham',
  alternateName: 'Nidhi Vedartham',
  url: SITE_URL,
  jobTitle: 'Software / Electrical Engineer, AI Enablement and Technical Programs',
  description:
    'Software and electrical engineer with 8+ years in embedded IoT, who also co-founded a community for women in business and helps engineering teams adopt AI tools.',
  sameAs: [
    CTA_ACTIONS.linkedin.href,
    'https://github.com/Hereforlolz',
    'https://dev.to/hereforlolz',
  ],
};

module.exports = { PERSON_JSON_LD };
