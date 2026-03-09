"use client";

import { useState } from "react";
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
          Set some filters below, then refresh the page. Notice how the filters reset!
        </p>
      </div>

      <BountyFilter onFilterChange={setFilters} />

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

      <div className="card p-6 bg-blue-50 border-blue-200">
        <h3 className="font-semibold text-blue-800">Your Task</h3>
        <p className="mt-2 text-sm text-blue-700">
          Fix the <code className="bg-blue-100 px-1 rounded">BountyFilter</code> component
          in <code className="bg-blue-100 px-1 rounded">src/components/bounty-filter.tsx</code>
          to persist filter state across page refreshes using URL query parameters or localStorage.
        </p>
      </div>
    </div>
  );
}
