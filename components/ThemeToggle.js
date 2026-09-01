// components/ThemeToggle.js
import { useSyncExternalStore } from 'react';

const listeners = new Set();

function getSnapshot() {
  const stored = window.localStorage.getItem('theme');
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getServerSnapshot() {
  return null;
}

function subscribe(callback) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function setTheme(next) {
  document.documentElement.setAttribute('data-theme', next);
  window.localStorage.setItem('theme', next);
  listeners.forEach(callback => callback());
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!theme) {
    return <div className="h-8 w-24" aria-hidden="true" />;
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-pressed={theme === 'dark'}
      className="flex items-center gap-1.5 rounded-full border border-border bg-surface-alt px-3 py-1.5 text-xs text-text hover:border-accent transition-colors w-fit"
    >
      <span aria-hidden="true">{theme === 'dark' ? '☾' : '☀'}</span>
      {theme === 'dark' ? 'Dark mode' : 'Light mode'}
    </button>
  );
}
