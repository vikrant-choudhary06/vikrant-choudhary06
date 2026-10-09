import type { Metadata } from "next";
import { VT323, Caveat, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

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
      className={`${vt323.variable} ${caveat.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FAF8F5] text-slate-900 selection:bg-amber-300 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
