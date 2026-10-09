import type { Metadata } from "next";
import { VT323, Caveat, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { THEME_STORAGE_KEY } from "@/lib/theme";

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

export const metadata: Metadata = {
  title: "Vikrant Choudhary — Full-stack developer",
  description: "Full-stack developer from Mathura, India. Building Rizzoto, a restaurant POS that works offline.",
  keywords: [
    "Vikrant Choudhary",
    "Full-stack developer",
    "Next.js",
    "NestJS",
    "TypeScript",
    "PostgreSQL",
    "Rizzoto",
  ],
  authors: [{ name: "Vikrant Choudhary" }],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Vikrant Choudhary — Full-stack developer",
    description: "Full-stack developer from Mathura, India. Building Rizzoto, a restaurant POS that works offline.",
    type: "website",
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
