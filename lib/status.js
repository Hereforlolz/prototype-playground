// lib/status.js
//
// Work-authorization and location status, shown in the sidebar (every
// page) and on About. Single source of truth so the two never drift.
// Wording mirrors public/Sreenidhi-Vedartham-Resume.pdf, which already
// states "H-1B transfer only. Approved I-140, no lottery required."
'use strict';

const LOCATION = 'St. Charles, MO';
const RELOCATION = 'Open to relocation';
const WORK_AUTHORIZATION = 'H-1B transfer only — Approved I-140, no lottery required';

module.exports = { LOCATION, RELOCATION, WORK_AUTHORIZATION };
