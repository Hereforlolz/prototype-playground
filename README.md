# Sreenidhi Vedartham Portfolio

Nidhi Vedartham's recruiter-facing portfolio for AI enablement, rapid
prototyping, product experimentation, and lessons learned from building
with emerging AI tools.

**Live:** https://prototype-playground-vert.vercel.app

## What the site demonstrates

- Turning ambiguous AI ideas into testable prototypes
- Evaluating what works, and documenting the limitations honestly
- AI enablement and adoption evidence from real engineering work
- Product and community experience alongside the technical work
- Public project experiments, and the lessons pulled out of them

## Pages

- `/` — Home. Positioning and plain-language entry points into the rest of the site.
- `/projects` — Projects & Experiments. Curated, hand-written project cards.
- `/logs` — Lessons Learned. A running record of real bugs, misfires, and
  what came out of them.
- `/about` — About. How I work, the Zero-Gravity Thinker role, more Ivani work, and Embark Women.
- `/contact` — Request form for the résumé or a role conversation (`?type=resume` or `?type=role`). Submissions go through `/api/request`.
- `/experiments/<slug>` — Five playful browser tools, rendered from `content/experiments/*.html`. They call model providers straight from the visitor's browser with the visitor's own API key.

Current behavior worth calling out on `/projects`:
- Curated project cards are static content and stay visible even if
  GitHub is unreachable or rate-limited — see
  [`lib/projects-data.js`](lib/projects-data.js).
- `lib/projects-data.js` fetches each curated repo's open GitHub issues
  (GitHub's issues API also returns open pull requests, undistinguished),
  but nothing from that fetch is currently rendered — cards are static
  text only. Removed as UI clutter; the fetch and its tests stay, since a
  future page could reasonably surface it.
- A few curated projects describe private repos. Their name and
  description are intentionally public, but they never link to a
  repository a visitor can't actually open.

## Tech stack

- Next.js (Pages Router)
- React
- Tailwind CSS
- GitHub REST API — public endpoint only, for optional live metadata
- Vercel — hosting, previews, and deploys
- Vercel Analytics (`@vercel/analytics`, initialized in `pages/_app.js`)
- Node's built-in test runner (`node --test`)

## Local development

```bash
npm install
npm run dev     # start the dev server
npm run test    # run every lib/*.test.js with Node's test runner
npm run lint    # eslint
npm run build   # production build
```

The site itself needs no environment variables. The contact form's API route (`pages/api/request.js`) needs server-side `RESEND_API_KEY` and `NOTIFY_EMAIL`, and optionally `RESEND_FROM` — see `.env.example`. Without them the route returns a 503 and the form shows a fallback message. Set them in Vercel project settings, never in the repo.

### Contact form spam protection

`/api/request` quietly drops (returns fake success, sends nothing) submissions that fill the hidden `website` field, post faster than 3 seconds after the form rendered (the browser sends `elapsedMs`), or put more than one link in the name or message. Line breaks in the name are collapsed so they can't forge email lines.

The in-memory rate limiter only works per serverless instance, so it is best effort. For a real limit, add a Vercel Firewall rate-limit rule: Project → Firewall → Rules → path equals `/api/request`, 5 requests per 10 minutes per IP, action Deny (or Challenge).

## Architecture and privacy

- Curated portfolio content (project names, descriptions, links) is static
  data, not fetched from any API — see the `HIGHLIGHTS` array in
  [`lib/projects-data.js`](lib/projects-data.js).
- The only GitHub calls made are two public, unauthenticated endpoints —
  listing a user's public repos, and each curated repo's open issues
  (which GitHub's API mixes with open pull requests) — no token, no
  elevated access, for either. Neither result is currently rendered
  anywhere on the site; see the "Pages" section above.
- Anything private is filtered out before it reaches page props, as an
  explicit check independent of what the endpoint itself guarantees.
- A GitHub outage or rate limit never removes curated project cards —
  live data is additive only.
- A hand-written public summary of a private project is fine; a link to
  its (inaccessible) repository is not, and never appears.

See [`lib/projects-data.test.js`](lib/projects-data.test.js) for the tests
covering all of the above, including the private-repo and outage cases.

## Project structure

```
components/
  Layout.js             — sidebar nav + page shell
  TerminalFrame.js      — shared card component
  ThemeToggle.js        — light/dark mode toggle
  ClosingCTA.js         — shared closing call-to-action (used on every page)
  SeoHead.js            — shared title, description, canonical, and JSON-LD tags
  CaseStudy.js          — shared layout for the flagship project case-study pages
lib/
  projects-data.js       — curated project data, GitHub fetch, privacy filtering
  homepage-content.js    — homepage/positioning copy (headline, proof points, metric line)
  cta.js                 — shared CTA labels/hrefs/analytics event names
  analytics.js           — safeTrack() wrapper so a tracking failure never blocks navigation
  case-studies.js        — full case-study content for the flagship projects
  status.js              — work-authorization and location wording, shared sitewide
  request.js             — request-form validation, honeypot, and rate limiter
  ivani-work.js          — About page: more Ivani work
  zero-gravity.js        — About page: Zero-Gravity Thinker copy
  person.js              — Person JSON-LD for the homepage
  *.test.js               — Node test runner tests for each of the above
pages/
  index.js                     — Home
  projects.js                  — Projects & Experiments
  projects/teamtrail.js            — TeamTrail case study
  projects/qwen-memoryagent.js     — Qwen MemoryAgent case study
  projects/dead-code-finder.js     — Dead Code Finder case study
  projects/compassionateconnect.js — CompassionateConnect AI case study
  projects/greengrid.js            — GreenGrid AI case study
  projects/therapist-dashboard.js  — AI-Powered Therapist Dashboard case study
  projects/pilotcraft.js           — PilotCraft case study
  projects/prompt-engineering-adoption.js — Prompt Engineering Adoption case study
  logs.js                          — Lessons Learned
  about.js                         — About
  contact.js                       — résumé / role request form
  experiments/[slug].js            — renders one experiment from content/experiments
  api/request.js                   — emails form submissions via Resend
bugs.json                — manually curated external bug reports
public/                  — static assets (résumé PDF intentionally NOT served)
private/                 — gitignored local résumé copy, sent to requesters by hand
```

## Deployment

The source repository and the Vercel deployment are both public. Every
pull request gets its own Vercel preview URL, and merges to `main` deploy
straight to the production portfolio above.

## Current status

**Complete:**
- Visual redesign (palette, typography, dark mode, component styling)
- Privacy-safe GitHub integration (public-only data, private repos never
  linked or leaked)
- Consistent page naming across navigation, headings, titles, and CTAs
- Recruiter-positioning copy on the homepage and `/projects`, centered on
  AI adoption and product enablement, with a three-tier
  flagship/case-study/experiment project hierarchy and a disclosed
  internal-estimate metric line — see
  [`lib/homepage-content.js`](lib/homepage-content.js). Exactly three
  projects (TeamTrail, Qwen MemoryAgent, Dead Code Finder) carry the
  flagship tier and the top visual slot; CompassionateConnect AI,
  GreenGrid AI, and the AI-Powered Therapist Dashboard have full case
  studies but are intentionally kept in a secondary "More Case Studies"
  section, either because the domain calls for a more measured
  presentation or because the project is less differentiated.
- Custom analytics events beyond Vercel's default pageview tracking (CTA
  clicks, per-project link clicks) via `safeTrack()` in
  [`lib/analytics.js`](lib/analytics.js), which never blocks navigation
  if tracking fails
- Case studies for TeamTrail, Qwen MemoryAgent, Dead Code Finder,
  CompassionateConnect AI, GreenGrid AI, the AI-Powered Therapist
  Dashboard, PilotCraft, and Prompt Engineering Adoption
  (`/projects/teamtrail`, `/projects/qwen-memoryagent`,
  `/projects/dead-code-finder`, `/projects/compassionateconnect`,
  `/projects/greengrid`, `/projects/therapist-dashboard`,
  `/projects/pilotcraft`, `/projects/prompt-engineering-adoption`) —
  problem, approach, what broke and how it got fixed, outcome, and an
  honest scope note, all sourced from the projects' own repo READMEs —
  see [`lib/case-studies.js`](lib/case-studies.js). The Therapist
  Dashboard case study was corrected after an initial pass overstated
  its security/validation posture ("HIPAA-aligned," "piloted") — see
  that file's top-of-entry comment for what changed and why.
- Work-authorization / location wording (H-1B transfer status and
  relocation openness), shown in the sidebar on every page and on About —
  see [`lib/status.js`](lib/status.js)

**Planned, not yet implemented:**
- Nothing at this time — open an issue if something's missing.
