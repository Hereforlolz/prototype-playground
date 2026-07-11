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

Create a `.env.local` file in the project root (this file is gitignored — never commit it):

```
GITHUB_TOKEN=your_github_personal_access_token
```

The token needs at minimum `repo` read access. It's used server-side in `pages/projects.js` to fetch your repos and their open issues. Without it, `/projects` will still render but with an "Error loading repos/issues" message instead of live data.

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