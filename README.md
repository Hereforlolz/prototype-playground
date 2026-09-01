# prototype-playground

Nidhi's personal site — a terminal-themed portfolio built with Next.js. Documents hackathon builds, GitHub repos/issues, and a running "known mistakes" log, all in a self-aware, chaos-first tone.

**Live sections:**
- `/` — hero/landing page
- `/about` — bio
- `/projects` — GitHub repos, open issues (pulled live via the GitHub API), and a manually curated bugs log
- `/logs` — a running changelog of bugs, patches, and fixes

## Tech stack

- [Next.js](https://nextjs.org) (Pages Router)
- [Tailwind CSS](https://tailwindcss.com) for styling
- GitHub REST API for live repo/issue data on `/projects`

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

None required. `/projects` fetches from GitHub's public, unauthenticated
`/users/{username}/repos` endpoint — deliberately not a repo-scoped token —
since this repo's build output is served on a public site (source repo
itself stays private, but anything `getStaticProps` returns ships to every
visitor). Private repos never come back from that endpoint, and the fetch
in `lib/projects-data.js` filters them out again explicitly as a second,
independent check before they can reach page props.

## Privacy model

Two different things both involve "private repos" on this site, and it's
worth being precise about which is which:

- **Automatically fetched private-repository metadata — prohibited.**
  Anything sourced from the GitHub API about a repo (its existence, open
  issue titles, activity) must never reach a private repo, full stop.
  `filterPublicRepos()` and `shouldFetchIssues()` in `lib/projects-data.js`
  enforce this, with tests proving it holds even if the API response
  itself misbehaves.
- **Intentionally curated public case-study content about a private
  project — allowed.** Three entries in `HIGHLIGHTS`
  (`EphemeralAgentExecutor`, `GreenGrid`, `SafeSakhi`) describe repos that
  are actually private. Their name and description are hand-written
  portfolio copy the account owner chose to publish — not API data — so
  showing them is fine. What's not fine is implying the repository itself
  is reachable: those entries have no `url`, so the page renders "Private
  prototype — case study coming soon" instead of a link that would 404 for
  a visitor without access.

## Project structure

```
components/
  Layout.js          — shared sidebar nav + page shell
  TerminalFrame.js    — shared "terminal window" UI wrapper used across pages
pages/
  index.js            — landing page
  about.js             — bio page
  projects.js           — GitHub repos + issues + manual bugs log
  logs.js               — known-mistakes changelog
public/
  meme.png             — hero image
bugs.json              — manually curated list of external bugs/issues filed
```

## Data fetching notes

`/projects` uses `getStaticProps` with Incremental Static Regeneration (`revalidate: 3600`) rather than `getServerSideProps`. This means GitHub API calls happen at most once per hour in the background rather than on every page visit — keeps load times fast and avoids burning API rate limits under traffic.

If a specific repo's issues fail to fetch, the page shows a "Couldn't load issues for this repo" notice for that repo rather than silently displaying an empty state.

## Known quirks

- Line endings: this repo is intended to use `LF`. If you're on Windows and see every file show as "modified" with no real diff, run `git config --global core.autocrlf false` locally.
- See `/logs` for a living list of past bugs and fixes — it's part of the site, not just documentation.