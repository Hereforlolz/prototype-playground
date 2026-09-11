// lib/seo.js
//
// Single source of truth for the canonical site URL used to build
// absolute og:url values. No og:image/twitter:image tag is set anywhere
// yet — there's no actual graphic asset in this repo to point at, and a
// broken or missing preview image is worse than no image tag at all.
// Add one (and wire it in here) once a real OG image exists.
'use strict';

const SITE_URL = 'https://prototype-playground-vert.vercel.app';

module.exports = { SITE_URL };
