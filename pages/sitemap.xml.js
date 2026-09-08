// pages/sitemap.xml.js
//
// Serves lib/sitemap.js's XML directly as the response body via
// getServerSideProps, so all 10 routes stay crawlable without depending
// on a crawler discovering the 6 case-study pages through /projects'
// on-page links.
import { buildSitemapXml } from '../lib/sitemap';

export async function getServerSideProps({ res }) {
  res.setHeader('Content-Type', 'application/xml');
  res.write(buildSitemapXml());
  res.end();

  return { props: {} };
}

export default function Sitemap() {
  return null;
}
