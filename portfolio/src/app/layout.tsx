import type { Metadata } from "next";
import { VT323, Caveat, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { THEME_STORAGE_KEY } from "@/lib/theme";
import { PERSONAL_INFO, PROJECTS, SITE_URL } from "@/data/portfolio-data";

const THEME_SCRIPT = `(function(){try{if(localStorage.getItem("${THEME_STORAGE_KEY}")==="light")document.documentElement.classList.remove("dark")}catch(e){}})()`;

const vt323 = VT323({
  variable: "--font-pixel",
  subsets: ["latin"],
  weight: "400",
});

const caveat = Caveat({
  variable: "--font-handwriting",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const SITE_DESCRIPTION =
  "Vikrant Choudhary is a full-stack developer from Mathura, India, studying BCA at Manipal University Jaipur. " +
  `Projects include ${PROJECTS.slice(0, 4)
    .map((p) => `${p.name} (${p.kind.toLowerCase()})`)
    .join(", ")} and more.`;

const OG_HOME_ALT = `${PERSONAL_INFO.name}, ${PERSONAL_INFO.role.toLowerCase()} from ${PERSONAL_INFO.location}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Vikrant Choudhary — Full-stack developer",
    template: "%s — Vikrant Choudhary",
  },
  description: SITE_DESCRIPTION,
  applicationName: "Vikrant Choudhary — Portfolio",
  keywords: [
    "Vikrant Choudhary",
    "Vikrant Choudhary developer",
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
    siteName: "Vikrant Choudhary",
    locale: "en_IN",
    title: "Vikrant Choudhary — Full-stack developer",
    description: SITE_DESCRIPTION,
    images: [{ url: "/og/home.png", width: 1200, height: 630, alt: OG_HOME_ALT }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vikrant Choudhary — Full-stack developer",
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
      className={`dark ${vt323.variable} ${caveat.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        {/* Dark is the default. Runs before first paint so a saved "light" choice doesn't flash dark. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col bg-paper text-ink selection:bg-amber-300 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
