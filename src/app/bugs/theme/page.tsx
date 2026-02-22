"use client";

import { ThemeToggle, InconsistentCard } from "@/components/theme-toggle";

export default function ThemeBugPage() {
  return (
    <div className="space-y-6">
      <div className="card p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Bug: Dark Mode Inconsistencies</h1>
            <p className="mt-2 text-slate-600">
              Toggle dark mode and notice the issues: flash on page load,
              icon mismatch, and inconsistent styling.
            </p>
          </div>
          <ThemeToggle />
        </div>
      </div>

      <div className="max-w-lg">
        <InconsistentCard />
      </div>

      <div className="card p-6 bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:border-blue-800">
        <h3 className="font-semibold text-blue-800 dark:text-blue-200">Your Task</h3>
        <ul className="mt-2 text-sm text-blue-700 dark:text-blue-300 space-y-2">
          <li>
            <strong>Bug 1:</strong> Theme flashes on page load because the initial state
            doesn&apos;t match localStorage until after React hydrates.
          </li>
          <li>
            <strong>Bug 2:</strong> The toggle icon might show the wrong state on initial load.
          </li>
          <li>
            <strong>Bug 3:</strong> Some elements in InconsistentCard don&apos;t respond to
            dark mode because they use hardcoded colors.
          </li>
        </ul>
        <p className="mt-3 text-sm text-blue-700 dark:text-blue-300">
          Fix the components in{" "}
          <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
            src/components/theme-toggle.tsx
          </code>
        </p>
      </div>
    </div>
  );
}
