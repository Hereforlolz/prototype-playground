# Prototype Playground

Nidhi Vedartham's recruiter-facing portfolio for AI enablement, rapid
prototyping, product experimentation, and lessons learned from building
with emerging AI tools.

**Live:** https://prototype-playground.vercel.app

## What the site demonstrates

- Turning ambiguous AI ideas into testable prototypes
- Evaluating what works, and documenting the limitations honestly
- AI enablement and adoption evidence from real engineering work
- Product and community experience alongside the technical work
- Public project experiments, and the lessons pulled out of them

## Pages

- `/` — Home. Positioning, entry points into the other three pages.
- `/projects` — Projects & Experiments. Curated project cards plus a live,
  optional view into public GitHub activity.
- `/logs` — Lessons Learned. A running record of real bugs, misfires, and
  what came out of them.
- `/about` — About. Background, current role, and community work.

Current behavior worth calling out on `/projects`:
- Curated project cards are static content and stay visible even if
  GitHub is unreachable or rate-limited — see
  [`lib/projects-data.js`](lib/projects-data.js).
- Public GitHub data (each open issue's number, title, and link) is an
  optional enhancement layered on top, never a requirement for a card to
  render.
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
npm run test    # run lib/projects-data.test.js
npm run lint    # eslint
npm run build   # production build
```

No environment variables are required to run this locally or in CI.

## Architecture and privacy

- Curated portfolio content (project names, descriptions, links) is static
  data, not fetched from any API — see the `HIGHLIGHTS` array in
  [`lib/projects-data.js`](lib/projects-data.js).
- Live GitHub data comes only from two public, unauthenticated endpoints —
  listing a user's public repos, and each curated repo's open issues — no
  token, no elevated access, for either.
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
  Layout.js            — sidebar nav + page shell
  TerminalFrame.js      — shared card component
  ThemeToggle.js         — light/dark mode toggle
lib/
  projects-data.js      — curated project data, GitHub fetch, privacy filtering
  projects-data.test.js  — tests for the above
pages/
  index.js              — Home
  projects.js             — Projects & Experiments
  logs.js                  — Lessons Learned
  about.js                  — About
bugs.json                — manually curated external bug reports
public/
  Sreenidhi-Vedartham-Resume.pdf
  meme.png
```

## Deployment

The source repository is private; the Vercel deployment is public. Every
pull request gets its own Vercel preview URL, and merges to `main` deploy
straight to the production portfolio above.

## Current status

**Complete:**
- Visual redesign (palette, typography, dark mode, component styling)
- Privacy-safe GitHub integration (public-only data, private repos never
  linked or leaked)
- Consistent page naming across navigation, headings, titles, and CTAs

**Planned, not yet implemented:**
- Dedicated recruiter-positioning copy
- Flagship case studies (current project cards are short descriptions, not
  full case studies)
- Work-authorization / location wording
- Custom analytics events beyond Vercel's default pageview tracking
