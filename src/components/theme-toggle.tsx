"use client";

import { useState, useEffect } from "react";

/**
 * Theme toggle (Issue #11). Cause: (1) Theme was applied only in useEffect after
 * hydration, causing flash. (2) Initial isDark state was always false, so icon
 * didn't match saved theme. (3) InconsistentCard used hardcoded light colors and
 * inline styles. Fix: (1) Layout injects a script that sets html class before
 * paint; (2) isDark initializes from DOM so icon matches; (3) All cards use
 * Tailwind dark: classes; inline styles removed.
 */

function getInitialDark(): boolean {
  if (typeof document === "undefined") return false;
  return document.documentElement.classList.contains("dark");
}

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(getInitialDark);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else if (stored === "light") {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      )}
    </button>
  );
}

export function InconsistentCard() {
  return (
    <div className="card p-6 space-y-4">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Theme Test Card</h3>

      <div className="p-4 rounded-lg bg-slate-100 dark:bg-slate-800">
        <p className="text-slate-700 dark:text-slate-300">
          This text adapts to dark mode correctly.
        </p>
      </div>

      <div className="p-4 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
        <p className="text-slate-700 dark:text-slate-300">
          This text adapts to dark mode correctly.
        </p>
      </div>

      <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
        <p>This uses Tailwind classes and respects dark mode.</p>
      </div>

      <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 rounded-lg">
        <p className="text-xs text-amber-700 dark:text-amber-300">
          <strong>Fixed:</strong> Theme is applied before paint; icon matches state; all cards use dark: classes.
        </p>
      </div>
    </div>
  );
}
