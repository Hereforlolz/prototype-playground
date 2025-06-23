// lib/github.js
export async function fetchGitHubIssues() {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;

  const res = await fetch(`https://api.github.com/repos/${repo}/issues?state=open`, {
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github+json',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch GitHub issues');
  }

  const issues = await res.json();
  return issues;
}
