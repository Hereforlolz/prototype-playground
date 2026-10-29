// lib/status.js
//
// Work-authorization and location status, shown in the sidebar (every
// page) and on About. Single source of truth so the two never drift.
// Wording mirrors the résumé (kept locally in private/, sent on request), which
// states "H-1B transfer only. Approved I-140, no lottery required."
'use strict';

const LOCATION = 'St. Charles, MO';
const RELOCATION = 'Open to relocation';
const WORK_AUTHORIZATION = 'H-1B transfer only: Approved I-140, no lottery required';

const AVAILABILITY = 'Available now for technical program management, technical product, and AI enablement roles.';

module.exports = { LOCATION, RELOCATION, WORK_AUTHORIZATION, AVAILABILITY };
