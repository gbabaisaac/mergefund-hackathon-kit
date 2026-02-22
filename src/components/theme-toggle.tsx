"use client";

import { useState, useEffect } from "react";

// BUG 1: Theme flash on page load - theme is not persisted or applied before hydration
// BUG 2: Icon doesn't match actual theme state on initial load
// BUG 3: Some components don't respect the theme (inconsistent styling)
// FIX: Use localStorage with SSR-safe initialization, apply theme before React hydrates

export function ThemeToggle() {
  // BUG: Initial state doesn't match what's in localStorage or system preference
  // This causes a flash when the component mounts
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // BUG: This runs after hydration, causing theme flash
    // The page renders in light mode first, then switches to dark
    const stored = localStorage.getItem("theme");
    if (stored === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);

    if (!isDark) {
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
      {/* BUG: Icon state might not match actual theme on first render */}
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

// Example component that doesn't properly support dark mode
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

      {/* BUG: This card is hardcoded with light-mode colors */}
      <div className="p-4 rounded-lg bg-white border border-slate-200">
        <p className="text-slate-700">
          This text does NOT adapt to dark mode - it&apos;s always light!
        </p>
      </div>

      {/* BUG: This uses inline styles that override dark mode */}
      <div
        className="p-4 rounded-lg"
        style={{ backgroundColor: "#f8fafc", color: "#334155" }}
      >
        <p>This uses inline styles and ignores dark mode completely.</p>
      </div>

      <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
        <p className="text-xs text-amber-700">
          <strong>Bug hints:</strong>
          <br />1. Toggle dark mode and refresh - notice the flash of wrong theme
          <br />2. Some cards above don&apos;t change in dark mode
          <br />3. The icon might show the wrong state initially
        </p>
      </div>
    </div>
  );
}
