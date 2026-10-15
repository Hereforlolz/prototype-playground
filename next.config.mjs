import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';

const { NO_FLASH_THEME_SCRIPT } = createRequire(import.meta.url)('./lib/theme-script.js');

// CSP notes. Two policies:
//
// 1. Everything except /experiments: no inline script is allowed. The only
//    inline script the site runs is the theme no-flash snippet, allowed by
//    its hash. Pages call nothing but their own origin from the browser
//    (the contact form posts to /api/request, analytics is same-origin), so
//    connect-src and img-src are limited to 'self'. Next.js dev mode needs
//    eval and inline scripts for hot reload, so that is only added outside
//    production.
//
// 2. /experiments/*: the tools inject their original inline script and call
//    the OpenAI/Anthropic APIs straight from the visitor's browser, so they
//    keep 'unsafe-inline' and an https connect-src. Keeping them on their
//    own policy is what lets the rest of the site be strict.
//
// Both: no plugins, no framing, no base-tag or form-target hijacking.
const isProd = process.env.NODE_ENV === 'production';
const themeHash = `'sha256-${createHash('sha256').update(NO_FLASH_THEME_SCRIPT).digest('base64')}'`;

const common = [
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
];

const siteCsp = [
  "default-src 'self'",
  isProd ? `script-src 'self' ${themeHash}` : "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  ...common,
].join('; ');

const experimentsCsp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https:",
  ...common,
].join('; ');

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      {
        source: '/experiments/:path*',
        headers: [{ key: 'Content-Security-Policy', value: experimentsCsp }],
      },
      {
        source: '/:path((?!experiments(?:/|$)).*)',
        headers: [{ key: 'Content-Security-Policy', value: siteCsp }],
      },
    ];
  },
};

export default nextConfig;
