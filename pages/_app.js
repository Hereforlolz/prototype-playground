import "@/styles/globals.css";
import { Analytics } from '@vercel/analytics/next';
import { Figtree, Karla, Space_Mono } from 'next/font/google';

const figtree = Figtree({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-figtree',
  display: 'swap',
});

const karla = Karla({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-karla',
  display: 'swap',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono-face',
  display: 'swap',
});

export default function App({ Component, pageProps }) {
  return (
    <div className={`${figtree.variable} ${karla.variable} ${spaceMono.variable}`}>
      <Component {...pageProps} />
      <Analytics />
    </div>
  );
}
