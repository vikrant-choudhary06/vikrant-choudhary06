"use client";

import { useLayoutEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { THEME_STORAGE_KEY } from "@/lib/theme";

function readSavedTheme(): string | null {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function ThemeToggle() {
  // The inline script in layout.tsx applies the saved theme before paint. In dev,
  // React's Strict Mode remount resets <html> to its JSX classes, so re-apply here.
  useLayoutEffect(() => {
    if (readSavedTheme() === "light") {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  function toggle() {
    const isDark = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem(THEME_STORAGE_KEY, isDark ? "dark" : "light");
    } catch {
      // Storage blocked (private mode etc.): the switch still works for this visit.
    }
  }

  // Both icons are rendered and CSS picks one, so server and client markup always match.
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch between dark and light mode"
      title="Switch between dark and light mode"
      className="p-2 rounded-full border border-ink/15 bg-subtle text-ink hover:bg-line transition-colors"
    >
      <Sun className="w-4 h-4 hidden dark:block" />
      <Moon className="w-4 h-4 dark:hidden" />
    </button>
  );
}
