import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getStaticProps } from '../pages/projects.js';

const REPOS_URL = 'https://api.github.com/users/Hereforlolz/repos?per_page=100';

function mockRepoList() {
  return [
    {
      id: 1,
      full_name: 'Hereforlolz/teamtrail',
      html_url: 'https://github.com/Hereforlolz/teamtrail',
      private: false,
      has_issues: true,
    },
    {
      // Simulates a private repo slipping into the API response — proves
      // the explicit filter in getStaticProps catches it independently of
      // whatever the endpoint itself is supposed to guarantee.
      id: 2,
      full_name: 'Hereforlolz/SafeSakhi',
      html_url: 'https://github.com/Hereforlolz/SafeSakhi',
      private: true,
      has_issues: true,
    },
    {
      // Public, but not in the curated HIGHLIGHTS list.
      id: 3,
      full_name: 'Hereforlolz/some-other-public-repo',
      html_url: 'https://github.com/Hereforlolz/some-other-public-repo',
      private: false,
      has_issues: true,
    },
  ];
}

beforeEach(() => {
  vi.restoreAllMocks();
});

describe('getStaticProps (pages/projects.js)', () => {
  it('never returns a private repository in props, even if the API response includes one', async () => {
    const fetchMock = vi.fn(async (url) => {
      if (url === REPOS_URL) {
        return { ok: true, json: async () => mockRepoList() };
      }
      if (url === 'https://api.github.com/repos/Hereforlolz/teamtrail/issues?state=open') {
        return {
          ok: true,
          json: async () => [
            {
              id: 101,
              number: 1,
              title: 'Example issue',
              html_url: 'https://github.com/Hereforlolz/teamtrail/issues/1',
            },
          ],
        };
      }
      throw new Error(`Unexpected fetch call: ${url}`);
    });
    global.fetch = fetchMock;

    const { props } = await getStaticProps();

    // The private repo must never appear in returned props.
    expect(props.repos.some(r => r.full_name === 'Hereforlolz/SafeSakhi')).toBe(false);
    expect(props.repoIssues['Hereforlolz/SafeSakhi']).toBeUndefined();

    // Public repos still come through untouched.
    expect(props.repos.map(r => r.full_name)).toEqual([
      'Hereforlolz/teamtrail',
      'Hereforlolz/some-other-public-repo',
    ]);

    // Issues are fetched only for the curated (HIGHLIGHTS) repo, not every
    // public repo that happens to have issues enabled.
    const issueUrlsFetched = fetchMock.mock.calls
      .map(([url]) => url)
      .filter(url => url.includes('/issues'));
    expect(issueUrlsFetched).toEqual([
      'https://api.github.com/repos/Hereforlolz/teamtrail/issues?state=open',
    ]);
    expect(props.repoIssues['Hereforlolz/some-other-public-repo']).toEqual([]);

    // No repo-scoped (or any) token/Authorization header is ever sent.
    for (const [, options] of fetchMock.mock.calls) {
      expect(options?.headers?.Authorization).toBeUndefined();
    }

    // The repo list comes from the public per-user endpoint, never /user/repos.
    expect(fetchMock).toHaveBeenCalledWith(REPOS_URL, expect.any(Object));
  });
});
