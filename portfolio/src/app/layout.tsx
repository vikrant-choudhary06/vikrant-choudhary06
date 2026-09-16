import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vikrant Choudhary — Full-Stack & Systems Engineer",
  description: "Portfolio of Vikrant Choudhary: Full-stack systems engineer, architecting retail ERP platforms, financial ledgers, and distributed APIs with TypeScript, Go, and Python.",
  keywords: [
    "Vikrant Choudhary",
    "Full-Stack Engineer",
    "Systems Engineer",
    "Next.js",
    "TypeScript",
    "Golang",
    "Retail ERP",
    "Manipal University Jaipur"
  ],
  authors: [{ name: "Vikrant Choudhary" }],
  openGraph: {
    title: "Vikrant Choudhary — Full-Stack & Systems Engineer",
    description: "Bridging financial accounting logic with resilient software architecture.",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100 selection:bg-emerald-500/20 selection:text-emerald-300">
        {children}
      </body>
    </html>
  );
}
