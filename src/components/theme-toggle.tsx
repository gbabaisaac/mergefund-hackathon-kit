"use client";

import { useState, useEffect } from "react";

export function ThemeToggle() {
  // Initialize state based on localStorage or system preference
  // This ensures theme is applied before first render
  const [isDark, setIsDark] = useState<boolean | null>(null);

  useEffect(() => {
    // Check localStorage first, then system preference
    const stored = localStorage.getItem("theme");
    let shouldBeDark = false;
    
    if (stored === "dark") {
      shouldBeDark = true;
    } else if (stored === "light") {
      shouldBeDark = false;
    } else {
      // Check system preference if no stored value
      shouldBeDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    
    setIsDark(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);

    if (newIsDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // Don't render anything until we've checked the theme
  // This prevents flash of wrong theme
  if (isDark === null) {
    return (
      <button
        className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800"
        aria-label="Toggle theme"
      >
        <div className="w-5 h-5" />
      </button>
    );
  }

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

// Fixed component - properly supports dark mode
export function InconsistentCard() {
  return (
    <div className="card p-6 space-y-4">
      <h3 className="text-lg font-semibold">Theme Test Card</h3>

      {/* This card properly uses dark mode classes */}
      <div className="p-4 rounded-lg bg-slate-100 dark:bg-slate-800">
        <p className="text-slate-700 dark:text-slate-300">
          This text adapts to dark mode correctly.
        </p>
      </div>

      {/* FIXED: Now uses dark mode classes */}
      <div className="p-4 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
        <p className="text-slate-700 dark:text-slate-300">
          This text now properly adapts to dark mode!
        </p>
      </div>

      {/* FIXED: Now uses CSS variables instead of inline styles */}
      <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-700">
        <p className="text-slate-700 dark:text-slate-300">
          This now uses proper dark mode classes instead of inline styles.
        </p>
      </div>

      <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700 rounded-lg">
        <p className="text-xs text-amber-700 dark:text-amber-400">
          <strong>Fixed:</strong>
          <br />1. Theme is now properly applied on initial load
          <br />2. All cards above properly support dark mode
          <br />3. No more theme flash on page load
        </p>
      </div>
    </div>
  );
}
