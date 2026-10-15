// lib/seo.js
//
// Single source of truth for the canonical site URL used to build absolute
// og:url and og:image values. OG_IMAGE is a square crop of the profile photo
// (public/og-image.jpg), which suits the "summary" Twitter card too.
'use strict';

const SITE_URL = 'https://prototype-playground-vert.vercel.app';
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

module.exports = { SITE_URL, OG_IMAGE };
