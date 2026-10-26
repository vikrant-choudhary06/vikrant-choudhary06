import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { PERSONAL_INFO, PROJECTS, SITE_URL } from "@/data/portfolio-data";

const THEME_SCRIPT = `document.documentElement.classList.remove("dark");`;

const vt323 = localFont({ src: "./fonts/vt323.woff2", variable: "--font-pixel", weight: "400", display: "swap" });
const caveat = localFont({ src: "./fonts/caveat.woff2", variable: "--font-handwriting", weight: "400 700", display: "swap" });
const plusJakarta = localFont({ src: "./fonts/plus-jakarta-sans.woff2", variable: "--font-sans", weight: "400 800", display: "swap" });
const jetbrainsMono = localFont({ src: "./fonts/jetbrains-mono.woff2", variable: "--font-mono", weight: "400 700", display: "swap" });

const SITE_DESCRIPTION =
  "Vikrant Kumar is a full-stack developer from Mathura, India, studying BCA at Manipal University Jaipur. " +
  `Projects include ${PROJECTS.slice(0, 4)
    .map((p) => `${p.name} (${p.kind.toLowerCase()})`)
    .join(", ")} and more.`;

const OG_HOME_ALT = `${PERSONAL_INFO.name}, ${PERSONAL_INFO.role.toLowerCase()} from ${PERSONAL_INFO.location}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Vikrant Kumar — Full-stack developer",
    template: "%s — Vikrant Kumar",
  },
  description: SITE_DESCRIPTION,
  applicationName: "Vikrant Kumar — Portfolio",
  keywords: [
    "Vikrant Kumar",
    "Vikrant Kumar developer",
    "full-stack developer Mathura",
    "Manipal University Jaipur BCA",
    "MiidayStudio",
    ...PROJECTS.map((p) => p.name),
  ],
  authors: [{ name: PERSONAL_INFO.name, url: SITE_URL }],
  creator: PERSONAL_INFO.name,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Vikrant Kumar",
    locale: "en_IN",
    title: "Vikrant Kumar — Full-stack developer",
    description: SITE_DESCRIPTION,
    images: [{ url: "/og/home.png", width: 1200, height: 630, alt: OG_HOME_ALT }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vikrant Kumar — Full-stack developer",
    description: SITE_DESCRIPTION,
    images: [{ url: "/og/home.png", alt: OG_HOME_ALT }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${vt323.variable} ${caveat.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        {/* One fixed oatmeal and pine palette, regardless of old theme preferences. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col bg-paper text-ink selection:bg-amber-300 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
