// lib/projects-data.test.js
'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const {
  HIGHLIGHTS,
  filterPublicRepos,
  buildHighlightedProjects,
  buildOtherRepos,
  splitHighlightedProjects,
  fetchProjectsPageProps,
} = require('./projects-data');

const CURATED_NAME = HIGHLIGHTS[0].name; // e.g. 'Hereforlolz/ai-pitch-deck-generator'
const REPOS_URL = `https://api.github.com/users/Hereforlolz/repos?per_page=100`;
const issuesUrlFor = name => `https://api.github.com/repos/${name}/issues?state=open`;

function jsonResponse(body) {
  return { ok: true, text: async () => JSON.stringify(body), json: async () => body };
}

function failedResponse(status, text) {
  return { ok: false, status, text: async () => text, json: async () => JSON.parse(text) };
}

test('every curated highlight has a human-readable title distinct from its GitHub full_name', () => {
  for (const h of HIGHLIGHTS) {
    assert.ok(h.title && h.title.length > 0, `${h.name} is missing a title`);
    assert.notEqual(h.title, h.name);
  }
});

test('splitHighlightedProjects separates flagship, case studies, experiments, and known-private in-progress entries', () => {
  const highlighted = buildHighlightedProjects([]);
  const { flagship, caseStudies, experiments, inProgress } = splitHighlightedProjects(highlighted);

  assert.equal(flagship.length + caseStudies.length + experiments.length + inProgress.length, highlighted.length);
  assert.ok(flagship.every(h => h.tier === 'flagship' && Boolean(h.url)));
  assert.ok(caseStudies.every(h => h.tier === 'case-study' && Boolean(h.url)));
  assert.ok(experiments.every(h => h.tier === 'experiment' && Boolean(h.url || h.demoHref)));
  assert.ok(inProgress.every(h => !h.url && !h.demoHref));

  assert.deepEqual(
    inProgress.map(h => h.name).sort(),
    ['Hereforlolz/EphemeralAgentExecutor', 'Hereforlolz/SafeSakhi']
  );
});

test('exactly three flagship projects are featured: TeamTrail, Qwen MemoryAgent, Dead Code Finder', () => {
  const highlighted = buildHighlightedProjects([]);
  const { flagship } = splitHighlightedProjects(highlighted);

  assert.equal(flagship.length, 3, 'exactly three projects should carry the flagship tier');
  assert.deepEqual(
    flagship.map(h => h.name).sort(),
    [
      'Hereforlolz/qwen-memory-agent',
      'Hereforlolz/teamtrail',
      'gitlab/gitlab-ai-hackathon/transcend',
    ].sort()
  );
  for (const h of flagship) {
    assert.ok(h.analyticsEvent, `${h.name} is missing an analyticsEvent`);
    assert.ok(h.caseStudyHref && h.caseStudyHref.startsWith('/projects/'), `${h.name} is missing a caseStudyHref`);
  }
});

test('the remaining case-study projects are featured secondarily, not as flagship', () => {
  const highlighted = buildHighlightedProjects([]);
  const { caseStudies } = splitHighlightedProjects(highlighted);

  assert.deepEqual(
    caseStudies.map(h => h.name).sort(),
    [
      'Hereforlolz/Compassionate-connect',
      'Hereforlolz/GreenGrid',
      'Hereforlolz/Therapist-Dashboard-AWS',
    ].sort()
  );
  for (const h of caseStudies) {
    assert.ok(h.analyticsEvent, `${h.name} is missing an analyticsEvent`);
    assert.ok(h.caseStudyHref && h.caseStudyHref.startsWith('/projects/'), `${h.name} is missing a caseStudyHref`);
  }
});

test('the five AI-wrapper tools are secondary experiments, not flagship', () => {
  const highlighted = buildHighlightedProjects([]);
  const { experiments } = splitHighlightedProjects(highlighted);

  assert.deepEqual(
    experiments.map(h => h.name).sort(),
    [
      'Hereforlolz/ai-content-generator',
      'Hereforlolz/ai-existential-crisis-bot',
      'Hereforlolz/ai-pitch-deck-generator',
      'local/dream-excuse-generator',
      'local/tiktok-script-generator',
    ]
  );
});

test('the two no-repo experiments each link to their own live /experiments page instead of a GitHub repo', () => {
  const highlighted = buildHighlightedProjects([]);
  const { experiments } = splitHighlightedProjects(highlighted);

  for (const name of ['local/dream-excuse-generator', 'local/tiktok-script-generator']) {
    const highlight = experiments.find(h => h.name === name);
    assert.ok(highlight, `expected an experiments entry for ${name}`);
    assert.equal(highlight.url, undefined, `${name} has no public repo, so it must not have a url`);
    assert.ok(
      highlight.demoHref && highlight.demoHref.startsWith('/experiments/'),
      `${name} must have a demoHref pointing at its live page`
    );
  }
});

test('every demoHref in HIGHLIGHTS points at a real entry in lib/experiments.js', () => {
  const { EXPERIMENTS } = require('./experiments');

  for (const h of HIGHLIGHTS) {
    if (!h.demoHref) continue;
    const slug = h.demoHref.replace('/experiments/', '');
    assert.equal(h.demoHref, `/experiments/${slug}`, `${h.name}'s demoHref should be under /experiments/`);
    assert.ok(EXPERIMENTS[slug], `${h.name}'s demoHref references unknown experiment slug "${slug}"`);
  }
});

test('flagship blurbs do not claim the workplace prompting metrics came from these projects', () => {
  const { METRIC_LINE } = require('./homepage-content');
  const highlighted = buildHighlightedProjects([]);
  const { flagship } = splitHighlightedProjects(highlighted);

  // The ~50%/~8min figures are from Ivani workplace AI-adoption work, not
  // from TeamTrail or Qwen MemoryAgent — their blurbs must never quote or
  // imply ownership of that metric line.
  for (const h of flagship) {
    assert.equal(h.blurb.includes('50%'), false, `${h.name} blurb must not include the workplace metric`);
    assert.equal(h.blurb.includes('8 min'), false, `${h.name} blurb must not include the workplace metric`);
  }
  assert.ok(METRIC_LINE.includes('50%'));
});

test('buildHighlightedProjects always returns every curated project, even with no live data', () => {
  const highlighted = buildHighlightedProjects([]);
  assert.equal(highlighted.length, HIGHLIGHTS.length);
  for (const h of highlighted) {
    assert.equal(h.liveRepo, null);
    assert.ok(h.blurb.length > 0);
    // url is optional — absent entries (known-private repos) are covered
    // by their own dedicated test below, not required to have one here.
    // When present it doesn't have to be a github.com link: a public
    // case-study or demo page (Devpost, a project site, etc.) is exactly
    // what the README says to add for a private repo once one exists, so
    // this only checks it's a real public https URL, not a specific host.
    if (h.url !== undefined) {
      assert.ok(h.url.startsWith('https://'));
    }
  }
});

test('a GitHub repo-list failure still renders curated projects', async () => {
  const fetchMock = async url => {
    assert.equal(url, REPOS_URL);
    return failedResponse(500, 'Internal Server Error');
  };

  const props = await fetchProjectsPageProps(fetchMock);

  assert.equal(props.githubUnavailable, true);
  assert.deepEqual(props.repos, []);
  // The page always maps HIGHLIGHTS regardless of props.repos, so this is
  // the guarantee that keeps curated cards visible when GitHub is down.
  const highlighted = buildHighlightedProjects(props.repos);
  assert.equal(highlighted.length, HIGHLIGHTS.length);
});

test('a rate-limit response still returns a safe, useful props shape (no raw API error leaked)', async () => {
  const rateLimitBody = {
    message: 'API rate limit exceeded for 35.253.211.22. (But here’s the good news: ...)',
    documentation_url: 'https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting',
  };
  const fetchMock = async () => failedResponse(403, JSON.stringify(rateLimitBody));

  const props = await fetchProjectsPageProps(fetchMock);

  assert.deepEqual(props, {
    repos: [],
    repoIssues: {},
    issuesFailed: {},
    githubUnavailable: true,
  });
  // No raw API error text/object anywhere in the returned props.
  assert.equal(JSON.stringify(props).includes('rate limit'), false);
});

test('no private repository metadata appears, even if the API response includes one', async () => {
  const repoList = [
    { id: 1, full_name: CURATED_NAME, html_url: `https://github.com/${CURATED_NAME}`, private: false, has_issues: false },
    { id: 2, full_name: 'Hereforlolz/SafeSakhi', html_url: 'https://github.com/Hereforlolz/SafeSakhi', private: true, has_issues: true },
  ];
  const fetchMock = async url => {
    if (url === REPOS_URL) return jsonResponse(repoList);
    throw new Error(`Unexpected fetch call: ${url}`);
  };

  const props = await fetchProjectsPageProps(fetchMock);

  assert.equal(props.repos.some(r => r.full_name === 'Hereforlolz/SafeSakhi'), false);
  assert.equal(filterPublicRepos(repoList).some(r => r.full_name === 'Hereforlolz/SafeSakhi'), false);

  const highlighted = buildHighlightedProjects(props.repos);
  const safeSakhi = highlighted.find(h => h.name === 'Hereforlolz/SafeSakhi');
  // Still appears as a curated card (static content), but with no live
  // repo attached — its private data was never fetched or exposed.
  assert.equal(safeSakhi.liveRepo, null);

  const rest = buildOtherRepos(props.repos);
  assert.equal(rest.some(r => r.full_name === 'Hereforlolz/SafeSakhi'), false);
});

test('issue-fetch failure is distinguishable from zero open issues', async () => {
  const otherCuratedName = HIGHLIGHTS[1].name;
  const repoList = [
    { id: 1, full_name: CURATED_NAME, html_url: `https://github.com/${CURATED_NAME}`, private: false, has_issues: true },
    { id: 2, full_name: otherCuratedName, html_url: `https://github.com/${otherCuratedName}`, private: false, has_issues: true },
  ];
  const fetchMock = async url => {
    if (url === REPOS_URL) return jsonResponse(repoList);
    if (url === issuesUrlFor(CURATED_NAME)) return jsonResponse([]); // confirmed zero issues
    if (url === issuesUrlFor(otherCuratedName)) return failedResponse(503, 'Service Unavailable'); // fetch failed
    throw new Error(`Unexpected fetch call: ${url}`);
  };

  const props = await fetchProjectsPageProps(fetchMock);

  // Confirmed zero: repoIssues holds an empty array, issuesFailed unset.
  assert.deepEqual(props.repoIssues[CURATED_NAME], []);
  assert.equal(props.issuesFailed[CURATED_NAME], undefined);

  // Fetch failed: repoIssues has no entry at all, issuesFailed is set.
  assert.equal(props.repoIssues[otherCuratedName], undefined);
  assert.equal(props.issuesFailed[otherCuratedName], true);
});

// Known-private HIGHLIGHTS entries: their name/description are
// intentionally public portfolio content (hand-written, not API-sourced),
// but the repos themselves are private. This is a regression test for
// that specific distinction — see the "Privacy model" section of the
// README. (GreenGrid used to be in this list; its repo is now public,
// so it's a flagship entry with a real url instead — see the flagship
// test above.)
const KNOWN_PRIVATE_HIGHLIGHT_NAMES = [
  'Hereforlolz/EphemeralAgentExecutor',
  'Hereforlolz/SafeSakhi',
];

test('curated entries for known-private repos never carry a github.com link', () => {
  for (const name of KNOWN_PRIVATE_HIGHLIGHT_NAMES) {
    const highlight = HIGHLIGHTS.find(h => h.name === name);
    assert.ok(highlight, `expected a HIGHLIGHTS entry for ${name}`);
    assert.equal(highlight.url, undefined, `${name} must not have a url — the repo is private`);
    assert.ok(highlight.blurb.length > 0, `${name} should still have curated case-study text`);
  }
});

test('a known-private highlight never gets live repo data attached, even if the API were to return one', async () => {
  // Defense in depth: even if GitHub's API mistakenly returned one of
  // these (it shouldn't — they're private), it must never surface as
  // liveRepo, since that's exactly the "automatically fetched private
  // metadata" case the privacy filter exists to stop.
  const leakedName = KNOWN_PRIVATE_HIGHLIGHT_NAMES[0];
  const repoList = [
    { id: 1, full_name: leakedName, html_url: `https://github.com/${leakedName}`, private: true, has_issues: true },
  ];
  const fetchMock = async url => {
    if (url === REPOS_URL) return jsonResponse(repoList);
    throw new Error(`Unexpected fetch call: ${url}`);
  };

  const props = await fetchProjectsPageProps(fetchMock);
  const highlighted = buildHighlightedProjects(props.repos);
  const leaked = highlighted.find(h => h.name === leakedName);

  assert.equal(leaked.liveRepo, null);
  assert.equal(leaked.url, undefined);
});

test('issues are only fetched for curated repos, not every public repo with issues enabled', async () => {
  const nonCurated = 'Hereforlolz/some-other-public-repo';
  const repoList = [
    { id: 1, full_name: CURATED_NAME, html_url: `https://github.com/${CURATED_NAME}`, private: false, has_issues: true },
    { id: 2, full_name: nonCurated, html_url: `https://github.com/${nonCurated}`, private: false, has_issues: true },
  ];
  const calledUrls = [];
  const fetchMock = async url => {
    calledUrls.push(url);
    if (url === REPOS_URL) return jsonResponse(repoList);
    if (url === issuesUrlFor(CURATED_NAME)) return jsonResponse([]);
    throw new Error(`Unexpected fetch call: ${url}`);
  };

  const props = await fetchProjectsPageProps(fetchMock);

  assert.equal(calledUrls.includes(issuesUrlFor(nonCurated)), false);
  assert.equal(props.repoIssues[nonCurated], undefined);
});
