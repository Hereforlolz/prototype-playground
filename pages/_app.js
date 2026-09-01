import "@/styles/globals.css";
import { Analytics } from '@vercel/analytics/next';
import { Figtree, Karla, IBM_Plex_Mono } from 'next/font/google';

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

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
});

export default function App({ Component, pageProps }) {
  return (
    <div className={`${figtree.variable} ${karla.variable} ${ibmPlexMono.variable}`}>
      <Component {...pageProps} />
      <Analytics />
    </div>
  );
}
