// components/SeoHead.js
//
// Shared <Head> for every page: renders the title/description tag plus
// the matching Open Graph and Twitter Card tags from the same title and
// description, so a link pasted into an email or LinkedIn DM gets a real
// preview instead of a bare URL. No og:image/twitter:image yet — see
// lib/seo.js for why.
import Head from 'next/head';
import { SITE_URL } from '../lib/seo';

export default function SeoHead({ title, description, path }) {
  const url = `${SITE_URL}${path}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Head>
  );
}
