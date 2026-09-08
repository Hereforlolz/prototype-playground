// lib/sitemap.js
//
// Builds the sitemap's route list from the same data the pages
// themselves are built from (CASE_STUDIES), so a new case study is
// discoverable the moment it's added instead of needing a second,
// hand-maintained list that can drift out of sync.
'use strict';

const { SITE_URL } = require('./seo');
const { CASE_STUDIES } = require('./case-studies');

const STATIC_PATHS = ['/', '/about', '/logs', '/projects'];

function buildSitemapPaths() {
  return [
    ...STATIC_PATHS,
    ...Object.values(CASE_STUDIES).map(study => `/projects/${study.slug}`),
  ];
}

function buildSitemapXml() {
  const urls = buildSitemapPaths()
    .map(path => `  <url><loc>${SITE_URL}${path}</loc></url>`)
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

module.exports = { buildSitemapPaths, buildSitemapXml };
