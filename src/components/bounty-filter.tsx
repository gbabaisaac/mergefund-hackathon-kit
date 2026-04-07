"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type FilterProps = {
  onFilterChange: (filters: { difficulty: string; minReward: number }) => void;
};

export function BountyFilter({ onFilterChange }: FilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize state from URL query params so filters survive page refresh
  const initialDifficulty = searchParams.get("difficulty") ?? "all";
  const initialMinReward = Number(searchParams.get("minReward") ?? "0");

  const [difficulty, setDifficulty] = useState(initialDifficulty);
  const [minReward, setMinReward] = useState(initialMinReward);

  /** Update URL params whenever a filter changes — keeps state in sync with the URL */
  function updateUrlParams(nextDifficulty: string, nextMinReward: number) {
    const params = new URLSearchParams();
    if (nextDifficulty !== "all") params.set("difficulty", nextDifficulty);
    if (nextMinReward > 0) params.set("minReward", String(nextMinReward));
    const queryString = params.toString();
    router.replace(queryString ? `?${queryString}` : "/bugs/filter", { scroll: false });
  }

  const handleDifficultyChange = (value: string) => {
    setDifficulty(value);
    updateUrlParams(value, minReward);
    onFilterChange({ difficulty: value, minReward });
  };

  const handleMinRewardChange = (value: number) => {
    setMinReward(value);
    updateUrlParams(difficulty, value);
    onFilterChange({ difficulty, minReward: value });
  };

  return (
    <div className="card p-4 flex flex-wrap gap-4 items-center">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-slate-600">Difficulty:</label>
        <select
          value={difficulty}
          onChange={(e) => handleDifficultyChange(e.target.value)}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
        >
          <option value="all">All</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-slate-600">Min Reward:</label>
        <input
          type="number"
          value={minReward}
          onChange={(e) => handleMinRewardChange(Number(e.target.value))}
          className="w-24 rounded-lg border border-slate-200 px-3 py-2 text-sm"
          placeholder="0"
        />
      </div>

      <div className="text-xs text-green-600">
        ✓ Filter state is now persisted to the URL — refresh the page!
      </div>
    </div>
  );
}
