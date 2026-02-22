"use client";

import { Leaderboard } from "@/components/leaderboard";

export default function LeaderboardBugPage() {
  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h1 className="text-2xl font-bold">Bug: Leaderboard Sorting Ties</h1>
        <p className="mt-2 text-slate-600">
          The leaderboard has issues with how it handles users with the same earnings.
          Notice the inconsistent ranking and ordering.
        </p>
      </div>

      <div className="max-w-lg">
        <Leaderboard />
      </div>

      <div className="card p-6 bg-blue-50 border-blue-200">
        <h3 className="font-semibold text-blue-800">Your Task</h3>
        <ul className="mt-2 text-sm text-blue-700 space-y-2">
          <li>
            <strong>Bug 1:</strong> Users with the same earnings appear in inconsistent order
            because the sort is unstable.
          </li>
          <li>
            <strong>Bug 2:</strong> Tied users should have the same rank number, but currently
            they get sequential ranks (2, 3, 4 instead of 2, 2, 4).
          </li>
        </ul>
        <p className="mt-3 text-sm text-blue-700">
          Fix the <code className="bg-blue-100 px-1 rounded">Leaderboard</code> component
          in <code className="bg-blue-100 px-1 rounded">src/components/leaderboard.tsx</code>
        </p>
      </div>
    </div>
  );
}
