import type { Metadata } from "next";
import Link from "next/link";
import localFont from "next/font/local";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const displayFont = localFont({ src: "./fonts/anton.ttf", display: "swap", weight: "400" });

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col text-ink">
      <Navbar minimal />
      <main className="flex-1 flex flex-col justify-center max-w-[1100px] w-full mx-auto px-6 pt-28 pb-20">
        <p className="font-mono text-xs uppercase tracking-[.12em] mb-4">404 / Page not found</p>
        <h1 className={`${displayFont.className} text-[clamp(72px,16vw,220px)] leading-none uppercase`}>Lost the thread.</h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
          This page doesn&apos;t exist, or it moved. The projects and everything else are on the home page.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex w-fit items-center gap-2 bg-[var(--accent)] text-[var(--on-accent)] hover:bg-[var(--accent-hover)] px-5 py-3 font-mono text-xs font-bold uppercase transition-colors"
        >
          <ArrowLeft size={15} aria-hidden="true" />
          Back to home
        </Link>
      </main>
      <Footer />
    </div>
  );
}
