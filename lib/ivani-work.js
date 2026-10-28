// lib/ivani-work.js
//
// "More from my time at Ivani" entries for the About page, kept as plain
// data so the wording can be tested. Every item restates a line from the
// résumé (the canonical source) in plain language; nothing here claims
// more than the résumé does. Marketing co-leadership has its own section
// (lib/marketing-work.js) rather than living here; the CES personas
// mentioned there are labelled as scenario-based planning material, not
// customer research.
'use strict';

const IVANI_WORK = [
  {
    group: 'Firmware, hardware, and data',
    items: [
      'Debugged ESP32 firmware across error codes, serial port failures, and network-formation bugs, including a join-ordering bug fixed while working with Nordic hardware and the OpenThread stack.',
      'Configured and tested wireless IoT chips (ESP32, SiLabs, Nordic) for hardware validation, and flashed and provisioned devices across a 1,000+ node deployment and for partner demo kits.',
      'Wrote unit and firmware tests for embedded C, including checks that Python prototypes and their embedded C ports behave the same on target hardware.',
      'Contributed to the core sensor-detection algorithm and checked it behaves consistently across several chip platforms and operating systems (using virtual machines). Detailed performance results are confidential.',
      'Contributed to the ground-truth data collection pipeline: systemd services, Python (pandas, SciPy), InfluxDB, and Kafka.',
      'Ran technology trade studies and competitor evaluations before the team committed to a direction, and tested new microcontrollers as they arrived, including at-home Raspberry Pi setups for real-world usage data.',
      'Drew the algorithm and architecture diagrams (draw.io) that explained the design to the rest of the team.',
    ],
  },
  {
    group: 'Engineering practice',
    items: [
      'Took seven product concepts from loosely defined stakeholder needs to interactive prototypes in three weeks, using structured specs and a 19-check quality process, then presented them to company leadership and iterated on feedback.',
      'Found the code-level ordering bug behind a recurring field escalation for a partner deployment by testing motion triggers on site, then fixed it.',
      'Checked AI-generated guidance for embedded SDK work (Zigbee broadcast and signal-strength APIs) against verified documentation, using local models, before the team relied on it.',
      'Read internal and external docs end to end as a first-time user to catch gaps before customers or new hires did.',
    ],
  },
  {
    group: 'Helping other engineers',
    items: [
      'Ran a cross-team engineering guidance program for 4+ years, with monthly focus themes and one-on-one rubber-ducking sessions supporting 5+ engineers outside formal reporting lines. Asking naive, outside-perspective questions often unstuck bugs people had been fighting for days.',
      'Wrote the team’s standard troubleshooting checklist for a recurring configuration bug.',
    ],
  },
];

module.exports = { IVANI_WORK };
