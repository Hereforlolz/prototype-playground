import { useEffect, useState } from 'react';
import { fetchGitHubIssues } from '../lib/github';

export default function Projects() {
  const [issues, setIssues] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGitHubIssues()
      .then(setIssues)
      .catch(err => setError(err.message));
  }, []);

  return (
    <main className="p-8 bg-gray-900 text-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-4">🧪 My Experiments & Live GitHub Bugs</h1>
      <p className="mb-8">
        This is where I dump chaotic prototypes and show live open GitHub issues.
      </p>

      {error && <p className="text-red-500">Error loading issues: {error}</p>}

      {!error && (
        <ul className="list-disc pl-8 space-y-3">
          {issues.length === 0 && <li>No open issues found.</li>}
          {issues.map(issue => (
            <li key={issue.id}>
              <a href={issue.html_url} target="_blank" rel="noopener noreferrer" className="underline hover:text-pink-400">
                {issue.title}
              </a>  
              {' '}— opened by <strong>{issue.user.login}</strong>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
export async function getServerSideProps() {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;

  console.log('Fetching GitHub issues for repo:', repo);

  const res = await fetch(`https://api.github.com/repos/${repo}/issues?state=open`, {
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github+json',
    },
  });

  console.log('GitHub API response status:', res.status);

  if (!res.ok) {
    const errorText = await res.text();
    console.error('GitHub API error:', errorText);
    return {
      props: { issues: [], error: `GitHub API error: ${res.status}` },
    };
  }

  const issues = await res.json();

  return {
    props: { issues, error: null },
  };
}
