"use client";

import { useState, Suspense } from "react";
import { BountyFilter } from "@/components/bounty-filter";

const mockBounties = [
  { id: "1", title: "Fix memory leak", difficulty: "Hard", reward: 500 },
  { id: "2", title: "Add dark mode", difficulty: "Medium", reward: 300 },
  { id: "3", title: "Write unit tests", difficulty: "Easy", reward: 100 },
  { id: "4", title: "Optimize database queries", difficulty: "Hard", reward: 800 },
  { id: "5", title: "Update documentation", difficulty: "Easy", reward: 50 },
];

export default function FilterBugPage() {
  const [filters, setFilters] = useState({ difficulty: "all", minReward: 0 });

  const filteredBounties = mockBounties.filter((bounty) => {
    if (filters.difficulty !== "all" && bounty.difficulty !== filters.difficulty) {
      return false;
    }
    if (bounty.reward < filters.minReward) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h1 className="text-2xl font-bold">Bug: Filter State Not Persisted</h1>
        <p className="mt-2 text-slate-600">
          Set some filters below, then refresh the page. Filter state now persists via URL query params!
        </p>
      </div>

      <Suspense fallback={<div className="card p-4 text-sm text-slate-400">Loading filters…</div>}>
        <BountyFilter onFilterChange={setFilters} />
      </Suspense>

      <div className="card p-6">
        <h2 className="text-lg font-semibold mb-4">
          Filtered Bounties ({filteredBounties.length})
        </h2>
        <div className="space-y-3">
          {filteredBounties.map((bounty) => (
            <div
              key={bounty.id}
              className="flex items-center justify-between p-3 rounded-lg bg-slate-50"
            >
              <div>
                <p className="font-medium">{bounty.title}</p>
                <p className="text-xs text-slate-500">{bounty.difficulty}</p>
              </div>
              <span className="font-bold text-green-600">${bounty.reward}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card p-6 bg-green-50 border-green-200">
        <h3 className="font-semibold text-green-800">✓ Fixed</h3>
        <p className="mt-2 text-sm text-green-700">
          The <code className="bg-green-100 px-1 rounded">BountyFilter</code> component
          now initializes state from URL query params and updates the URL on every filter change.
          Refresh the page — filters persist! Tech used: Next.js <code>useSearchParams</code> + <code>router.replace</code>.
        </p>
      </div>
    </div>
  );
}
