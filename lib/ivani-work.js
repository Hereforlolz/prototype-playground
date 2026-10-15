// lib/ivani-work.js
//
// "More from my time at Ivani" entries for the About page, kept as plain
// data so the wording can be tested. Every item restates a line from the
// résumé (the canonical source) in plain language; nothing here claims
// more than the résumé does. Marketing work is described as contributor
// work under the marketing lead, and the CES personas are labelled as
// scenario-based planning material, not customer research.
'use strict';

const IVANI_WORK = [
  {
    group: 'Firmware, hardware, and data',
    items: [
      'Debugged ESP32 firmware across error codes, serial port failures, and network-formation bugs, including a join-ordering bug fixed while working with Nordic hardware and the OpenThread stack.',
      'Configured and tested wireless IoT chips (ESP32, SiLabs, Nordic) for hardware validation, including flashing and provisioning across a 1,000+ node deployment.',
      'Wrote unit and firmware tests for embedded C, including checks that Python prototypes and their embedded C ports behave the same on target hardware.',
      'Tested the detection algorithm across several chip platforms and operating systems (using virtual machines) to confirm consistent results.',
      'Contributed to the ground-truth data collection pipeline: systemd services, Python (pandas, SciPy), InfluxDB, and Kafka.',
      'Ran technology trade studies and competitor evaluations before the team committed to a direction, and tested new microcontrollers as they arrived, including at-home Raspberry Pi setups for real-world usage data.',
      'Drew the algorithm and architecture diagrams (draw.io) that explained the design to the rest of the team.',
    ],
  },
  {
    group: 'Engineering practice',
    items: [
      'Wrote the merge request checklist the CTO adopted for company-wide use. It has been in use for five years and is still evolving.',
      'Found the code-level ordering bug behind a recurring field escalation for a partner deployment by testing motion triggers on site, then fixed it.',
      'Checked AI-generated guidance for embedded SDK work (Zigbee broadcast and signal-strength APIs) against verified documentation, using local models, before the team relied on it.',
      'Read internal and external docs end to end as a first-time user to catch gaps before customers or new hires did.',
    ],
  },
  {
    group: 'Helping other engineers',
    items: [
      'Ran a cross-team coaching program for 4+ years, with monthly themes and 1:1 sessions with 5+ engineers.',
      'Held weekly rubber-ducking and brainstorming sessions for 6+ years. Asking naive, outside-perspective questions often unstuck bugs people had been fighting for days.',
      'Wrote the team’s standard troubleshooting checklist for a recurring configuration bug.',
    ],
  },
  {
    group: 'Marketing and communication (contributor, under the marketing lead)',
    items: [
      'Turned RF sensing, Thread, and 802.15.4 concepts into accurate messaging for technical, executive, partner, and non-technical readers.',
      'Co-built a marketing playbook and review workflow that routed posts for approval by risk level: technical accuracy, product claims, and IP sensitivity.',
      'Owned GA4 and OKR reporting from 2024: monthly audits plus quarterly and annual reports used to set content priorities.',
      'Drafted the Sensify OEM integration whitepaper and designed a seven-piece one-pager library for OEM product managers.',
      'Wrote three scenario-based visitor personas and a demo playbook for CES 2023 booth conversations. These were internal planning material, not customer research.',
    ],
  },
];

module.exports = { IVANI_WORK };
