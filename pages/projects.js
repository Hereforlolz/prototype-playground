// pages/projects.js

import manualBugs from '../bugs.json';

export default function Projects({ repos, repoIssues, error }) {
  return (
    <main className="p-8 bg-gray-900 text-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8">🧪 My Repos & Bugs Lab</h1>

      {error && (
        <p className="text-red-400 mb-4">Error loading repos/issues: {error}</p>
      )}

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">📂 My GitHub Repos</h2>
        <ul className="list-disc pl-8 space-y-2">
          {repos.map(repo => (
            <li key={repo.id}>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-pink-400"
              >
                {repo.full_name}
              </a>
              <ul className="ml-6 list-square">
                {repoIssues[repo.full_name]?.length > 0 ? (
                  repoIssues[repo.full_name].map(issue => (
                    <li key={issue.id}>
                      <a
                        href={issue.html_url}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:underline"
                      >
                        #{issue.number}: {issue.title}
                      </a>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-400">No open issues found</li>
                )}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">🐞 Manual Bugs Log</h2>
        <ul className="list-disc pl-8 space-y-4">
          {manualBugs.map((bug, index) => (
            <li key={index}>
              <p className="font-semibold">{bug.title}</p>
              <p className="ml-4 text-gray-300">Why: {bug.why}</p>
              <p className="ml-4 text-gray-300">Status: {bug.status}</p>
              {bug.link && (
                <a
                  href={bug.link}
                  target="_blank"
                  rel="noreferrer"
                  className="ml-4 underline text-pink-400 hover:text-pink-500"
                >
                  View Report
                </a>
              )}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export async function getServerSideProps() {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return {
      props: {
        repos: [],
        repoIssues: {},
        error: 'Missing GITHUB_TOKEN.',
      },
    };
  }

  try {
    // 1️⃣ Get all your repos
    const repoRes = await fetch('https://api.github.com/user/repos?per_page=100', {
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github+json',
      },
    });

    if (!repoRes.ok) {
      const errorText = await repoRes.text();
      console.error('Error fetching repos:', errorText);
      return {
        props: {
          repos: [],
          repoIssues: {},
          error: errorText,
        },
      };
    }

    const repos = await repoRes.json();

    // 2️⃣ Get open issues for each repo
    const repoIssues = {};

    for (const repo of repos) {
      if (repo.has_issues) {
        const issuesRes = await fetch(
          `https://api.github.com/repos/${repo.full_name}/issues?state=open`,
          {
            headers: {
              Authorization: `token ${token}`,
              Accept: 'application/vnd.github+json',
            },
          }
        );

        if (issuesRes.ok) {
          const issues = await issuesRes.json();
          repoIssues[repo.full_name] = issues;
        } else {
          repoIssues[repo.full_name] = [];
        }
      } else {
        repoIssues[repo.full_name] = [];
      }
    }

    return {
      props: {
        repos,
        repoIssues,
        error: null,
      },
    };
  } catch (err) {
    console.error(err);
    return {
      props: {
        repos: [],
        repoIssues: {},
        error: err.message,
      },
    };
  }
}
