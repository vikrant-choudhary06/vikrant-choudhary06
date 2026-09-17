"use client";

import React from "react";
import { ArrowUp, Mail } from "lucide-react";

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="py-8 bg-transparent border-t border-neutral-300/80 relative text-neutral-800">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs font-bold">
        <div>© 2026 // VK.STUDIO // MATHURA, IN</div>

        <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2 sm:gap-3 text-xs font-mono font-medium">
          <a
            href="https://github.com/vikrant-choudhary06"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
            aria-label="GitHub"
            className="p-2 rounded-md text-neutral-700 hover:text-black hover:bg-neutral-200/70 border border-transparent hover:border-neutral-300 transition-all flex items-center justify-center"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/vikrant-kumar-268631395/"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
            aria-label="LinkedIn"
            className="p-2 rounded-md text-neutral-700 hover:text-black hover:bg-neutral-200/70 border border-transparent hover:border-neutral-300 transition-all flex items-center justify-center"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a
            href="https://www.instagram.com/vikrant.thakurela/"
            target="_blank"
            rel="noopener noreferrer"
            title="Instagram"
            aria-label="Instagram"
            className="p-2 rounded-md text-neutral-700 hover:text-black hover:bg-neutral-200/70 border border-transparent hover:border-neutral-300 transition-all flex items-center justify-center"
          >
            <InstagramIcon className="w-4 h-4" />
          </a>
          <a
            href="mailto:vikrantchoudhary1203@gmail.com"
            title="Email"
            aria-label="Email"
            className="p-2 rounded-md text-neutral-700 hover:text-black hover:bg-neutral-200/70 border border-transparent hover:border-neutral-300 transition-all flex items-center justify-center"
          >
            <Mail className="w-4 h-4" />
          </a>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="hover:text-neutral-950 transition-colors flex items-center gap-1.5 font-bold cursor-pointer border-l border-neutral-300 pl-3 sm:pl-4 ml-1 text-neutral-800"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
