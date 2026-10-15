// lib/background.js
//
// "Background" section for the About page: the earlier job, education,
// certifications, languages, and technical activity counts. Plain data so
// the wording can be tested. Everything restates the résumé (the canonical
// source); the AWS certification is verified against its public Credly badge.
'use strict';

const EARLIER_ROLE = {
  title: 'Electrical Engineer, Trane',
  place: 'Tyler, TX',
  dates: 'Jun 2017 – Jan 2018',
  items: [
    'Wrote a multi-threaded Ruby tool that flashed firmware onto 400+ microcontroller boards remotely and at the same time, cutting deployment time and customer downtime.',
    'Debugged and fixed software issues in variable-speed drives (C/C++). Wrote failure scenarios and tested updates against them before they reached customers, because finding a problem in the lab beats finding it in the field.',
    'Designed and built embedded electrical systems that supported multiple microcontroller boards, with hands-on soldering and on-site debugging alongside field teams.',
  ],
};

const EDUCATION = [
  { degree: 'M.S., Electrical Engineering', school: 'University of Texas at Tyler', years: '2015–2016' },
  { degree: 'B.E., Electronics & Communications Engineering', school: 'Alpha College of Engineering', years: '2010–2013' },
];

const CERTIFICATIONS = [
  {
    name: 'AWS Certified AI Practitioner',
    issuer: 'Amazon Web Services',
    issued: 'September 2026',
    expires: 'September 2029',
    href: 'https://www.credly.com/badges/1b293254-555c-403b-b75c-7ea36ea8add5/public_url',
  },
];

const LANGUAGES = ['English (full professional)', 'Tamil (native or bilingual)'];

const TECHNICAL_ACTIVITIES = [
  '6 hackathons joined, 6 Devpost projects shipped.',
  '2 GitHub issues filed against Google ADK, one with a co-authorship invitation.',
];

module.exports = { EARLIER_ROLE, EDUCATION, CERTIFICATIONS, LANGUAGES, TECHNICAL_ACTIVITIES };
