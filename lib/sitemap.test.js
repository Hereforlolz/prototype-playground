// lib/sitemap.test.js
'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const { buildSitemapPaths, buildSitemapXml } = require('./sitemap');
const { CASE_STUDIES } = require('./case-studies');
const { SITE_URL } = require('./seo');

test('sitemap includes every static page and every case-study page exactly once', () => {
  const paths = buildSitemapPaths();
  const expectedCount = 4 + Object.keys(CASE_STUDIES).length;

  assert.equal(paths.length, expectedCount);
  assert.equal(new Set(paths).size, paths.length, 'no duplicate paths');
  for (const path of paths) {
    assert.ok(path.startsWith('/'), `${path} should be a root-relative path`);
  }
});

test('every case study slug is present as a /projects/<slug> path', () => {
  const paths = buildSitemapPaths();
  for (const study of Object.values(CASE_STUDIES)) {
    assert.ok(paths.includes(`/projects/${study.slug}`), `missing sitemap entry for ${study.slug}`);
  }
});

test('sitemap XML wraps every path as an absolute URL under a valid urlset root', () => {
  const xml = buildSitemapXml();

  assert.match(xml, /^<\?xml version="1\.0" encoding="UTF-8"\?>/);
  assert.match(xml, /<urlset xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9">/);
  for (const path of buildSitemapPaths()) {
    assert.ok(xml.includes(`<loc>${SITE_URL}${path}</loc>`), `missing <loc> for ${path}`);
  }
});
