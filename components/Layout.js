// components/Layout.js
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { safeTrack } from '../lib/analytics';
import { CTA_ACTIONS } from '../lib/cta';
import ThemeToggle from './ThemeToggle';

const NAV_LINKS = [
  { href: '/projects', label: 'Projects & Experiments' },
  { href: '/logs', label: 'Lessons Learned' },
  { href: '/about', label: 'About' },
];

// Terse sidebar labels, sourced from the shared CTA data so hrefs/events
// stay in sync with the closing CTA — only the visible label differs here.
const CONTACT_LINKS = [
  { href: CTA_ACTIONS.discussRole.href, label: 'Email', event: CTA_ACTIONS.discussRole.event },
  { href: CTA_ACTIONS.linkedin.href, label: 'LinkedIn', event: CTA_ACTIONS.linkedin.event },
  { href: CTA_ACTIONS.resume.href, label: 'Resume', event: CTA_ACTIONS.resume.event },
];

function SidebarContent({ pathname }) {
  return (
    <>
      <Link href="/" className="block w-fit">
        <h1 className="font-display text-xl sm:text-2xl font-bold text-text tracking-tight hover:text-accent transition-colors duration-150">
          Nidhi Vedartham
        </h1>
      </Link>
      <p className="text-sm text-muted mt-1">
        Software engineer turned product person, all in on AI
      </p>
      <p className="text-xs text-accent font-semibold mt-2">
        Co-founder, Embark Women
      </p>

      <nav aria-label="Site" className="flex flex-col gap-3 mt-6 text-sm font-medium">
        {NAV_LINKS.map(link => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive ? 'page' : undefined}
              className={`w-fit transition-colors duration-150 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 ${
                isActive ? 'text-accent' : 'text-text hover:text-accent'
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <nav aria-label="Contact" className="flex flex-col gap-3 mt-8 text-sm">
        {CONTACT_LINKS.map(link => {
          const isExternal = link.href.startsWith('http');
          return (
            <a
              key={link.href}
              href={link.href}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noreferrer' : undefined}
              onClick={() => safeTrack(link.event, { source: 'sidebar' })}
              className="text-text hover:text-accent transition-colors duration-150 w-fit rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              {link.label}
              {isExternal && <span className="sr-only"> (opens in new tab)</span>}
            </a>
          );
        })}
      </nav>

      <div className="mt-8">
        <ThemeToggle />
      </div>
    </>
  );
}

export default function Layout({ children }) {
  const { pathname } = useRouter();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen bg-bg text-text font-sans">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-accent focus:text-surface focus:px-4 focus:py-2 focus:rounded-md"
      >
        Skip to content
      </a>

      <div className="lg:hidden flex items-center justify-between p-4 border-b border-border">
        <Link href="/" className="font-display font-bold text-text">
          Nidhi Vedartham
        </Link>
        <button
          type="button"
          onClick={() => setMobileNavOpen(open => !open)}
          aria-expanded={mobileNavOpen}
          aria-controls="mobile-nav-panel"
          className="text-sm border border-border rounded-md px-3 py-1.5 text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
        >
          {mobileNavOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      {mobileNavOpen && (
        <div id="mobile-nav-panel" className="lg:hidden p-6 border-b border-border">
          <SidebarContent pathname={pathname} />
        </div>
      )}

      <aside className="hidden lg:block lg:col-span-4 xl:col-span-3 p-6 sm:p-8 lg:sticky lg:top-0 h-fit border-b lg:border-b-0 lg:border-r border-border">
        <SidebarContent pathname={pathname} />
      </aside>

      <main id="main-content" tabIndex={-1} className="lg:col-span-8 xl:col-span-9 p-6 sm:p-8 space-y-12 min-w-0 focus:outline-none">
        {children}
      </main>
    </div>
  );
}
