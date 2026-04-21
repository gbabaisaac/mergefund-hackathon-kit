"use client";

import { useState, useEffect } from "react";


// BUG: Filter state resets on page refresh
// FIX: Persist to URL query params or localStorage

type FilterProps = {
  onFilterChange: (filters: { difficulty: string; minReward: number }) => void;
};

export function BountyFilter({ onFilterChange }: FilterProps) {
  const [difficulty, setDifficulty] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("bounty-difficulty") || "all";
    }
    return "all";
  });
  const [minReward, setMinReward] = useState(() => {
    if (typeof window !== "undefined") {
      return Number(localStorage.getItem("bounty-minReward")) || 0;
    }
    return 0;
  });

  // Call onFilterChange on mount to apply persisted filters
  useEffect(() => {
    onFilterChange({ difficulty, minReward });
  }, []);

  // Persist to localStorage whenever filters change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("bounty-difficulty", difficulty);
      localStorage.setItem("bounty-minReward", String(minReward));
    }
  }, [difficulty, minReward]);


  const handleDifficultyChange = (value: string) => {
    setDifficulty(value);
    onFilterChange({ difficulty: value, minReward });
  };

  const handleMinRewardChange = (value: number) => {
    setMinReward(value);
    onFilterChange({ difficulty, minReward: value });
  };

  return (
    <div className="card p-4 flex flex-wrap gap-4 items-center">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-slate-600">Difficulty:</label>
        <select
          value={difficulty}
          onChange={(e) => handleDifficultyChange(e.target.value)}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 font-semibold"
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
          className="w-24 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 font-semibold"
          placeholder="0"
        />

      </div>

      <div className="text-xs text-slate-500 font-medium italic">
        (Filters are now persisted to local storage! ✨)
      </div>

    </div>
  );
}
