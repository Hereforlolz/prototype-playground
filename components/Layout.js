// components/Layout.js
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

const NAV_LINKS = [
  { href: '/projects', label: 'Projects' },
  { href: '/logs', label: 'Lessons Learned' },
  { href: '/about', label: 'About' },
];

const CONTACT_LINKS = [
  { href: 'mailto:svedartham92@gmail.com', label: 'Email' },
  { href: 'https://www.linkedin.com/in/sreenidhivedartham', label: 'LinkedIn' },
  { href: '/Sreenidhi-Vedartham-Resume.pdf', label: 'Resume' },
];

export default function Layout({ children }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen bg-bg text-text font-sans">
      <aside className="lg:col-span-4 xl:col-span-3 p-6 sm:p-8 lg:sticky lg:top-0 h-fit border-b lg:border-b-0 lg:border-r border-border">
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

        <div className="mt-6">
          <ThemeToggle />
        </div>

        <nav aria-label="Contact" className="flex flex-col gap-3 mt-6 text-sm">
          {CONTACT_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
              className="text-text hover:text-accent transition-colors duration-150 w-fit"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <nav aria-label="Site" className="flex flex-col gap-3 mt-8 text-sm font-medium">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-text hover:text-accent transition-colors duration-150 w-fit"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="lg:col-span-8 xl:col-span-9 p-6 sm:p-8 space-y-12 min-w-0">{children}</main>
    </div>
  );
}
