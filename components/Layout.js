// components/Layout.js
import Link from 'next/link';

const NAV_LINKS = [
  { href: '/projects', label: '$ cd /experiments', hover: 'hover:text-pink-400' },
  { href: '/logs', label: '$ cat /mistakes_log', hover: 'hover:text-purple-400' },
  { href: '/about', label: '$ finger /about_me', hover: 'hover:text-blue-400' },
];

export default function Layout({ children }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen bg-[#0b0c10] text-slate-100 font-mono">
      <aside className="lg:col-span-4 xl:col-span-3 p-8 lg:sticky lg:top-0 h-fit border-b lg:border-b-0 lg:border-r border-purple-950/40">
        <Link href="/" className="block">
          <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 tracking-tight uppercase hover:translate-x-1 transition-transform duration-150 inline-block">
            Nidhi // Void Tinkerer
          </h1>
        </Link>
        <p className="text-xs text-purple-400 mt-1 font-bold">
          [SYSTEM STATUS: STABLE-ISH]
        </p>

        <nav className="flex flex-col gap-3 mt-8 text-sm">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`${link.hover} transition-colors hover:translate-x-1 duration-150 w-fit`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="lg:col-span-8 xl:col-span-9 p-8 space-y-12">{children}</main>
    </div>
  );
}
