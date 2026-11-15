import type { Metadata } from 'next';
import localFont from 'next/font/local';
import 'lenis/dist/lenis.css';
import './globals.css';
import { SmoothScroll } from '@/components/SmoothScroll';

const sans = localFont({ src: '../../public/fonts/GeneralSans-Variable.ttf', variable: '--font-general', display: 'swap', weight: '200 700' });
const cookie = localFont({ src: '../../public/fonts/Cookie-Regular.ttf', variable: '--font-cookie', display: 'swap', weight: '400' });
const mono = localFont({ src: './fonts/jetbrains-mono.woff2', variable: '--font-code', display: 'swap', weight: '100 800' });
export const metadata: Metadata = {
  metadataBase: new URL('https://vikrant.sbs'),
  title: { default: 'Vikrant Kumar — Building from the backend up.', template: '%s — Vikrant Kumar' },
  description: 'Backend-focused full-stack developer and founder of MiidayStudio. Building web applications, databases and systems that work.',
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning className={`${sans.variable} ${mono.variable} ${cookie.variable}`}><body><SmoothScroll /><a href="#main-content" className="skip-link">Skip to content</a>{children}</body></html>;
}
