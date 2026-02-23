"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { BountyFilter } from "@/components/bounty-filter";

const mockBounties = [
  { id: "1", title: "Fix memory leak", difficulty: "Hard", reward: 500 },
  { id: "2", title: "Add dark mode", difficulty: "Medium", reward: 300 },
  { id: "3", title: "Write unit tests", difficulty: "Easy", reward: 100 },
  { id: "4", title: "Optimize database queries", difficulty: "Hard", reward: 800 },
  { id: "5", title: "Update documentation", difficulty: "Easy", reward: 50 },
];

function FilterContent() {
  const searchParams = useSearchParams();

  // Initialize filters from URL params so state survives refresh
  const [filters, setFilters] = useState(() => ({
    difficulty: searchParams.get("difficulty") ?? "all",
    minReward: Number(searchParams.get("minReward") ?? "0"),
  }));

  // Sync filters when URL params change (e.g. browser back/forward)
  useEffect(() => {
    setFilters({
      difficulty: searchParams.get("difficulty") ?? "all",
      minReward: Number(searchParams.get("minReward") ?? "0"),
    });
  }, [searchParams]);

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
        <h1 className="text-2xl font-bold">Filter State Persisted via URL</h1>
        <p className="mt-2 text-slate-600">
          Set some filters below, then refresh the page. The filters are now
          persisted in the URL query parameters!
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
    </div>
  );
}

export default function FilterBugPage() {
  return (
    <Suspense fallback={<div>Loading filters...</div>}>
      <FilterContent />
    </Suspense>
  );
}
