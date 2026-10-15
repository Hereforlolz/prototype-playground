// lib/theme-script.js
//
// The one inline script every page runs before first paint, so a saved
// light/dark choice doesn't flash. Kept in its own CommonJS module so
// next.config.mjs can hash it for the Content-Security-Policy instead of
// allowing all inline scripts.
'use strict';

const NO_FLASH_THEME_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') {
      document.documentElement.setAttribute('data-theme', stored);
    }
  } catch (e) {}
})();
`;

module.exports = { NO_FLASH_THEME_SCRIPT };
