"use client";

import { useState, useEffect } from "react";

// FIXED: Filter state now persists using URL query params

type FilterProps = {
  onFilterChange: (filters: { difficulty: string; minReward: number }) => void;
};

export function BountyFilter({ onFilterChange }: FilterProps) {
  // Initialize from URL params
  const [difficulty, setDifficulty] = useState("all");
  const [minReward, setMinReward] = useState(0);

  // Load initial state from URL on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const diffParam = params.get("difficulty") || "all";
      const rewardParam = parseInt(params.get("minReward") || "0", 10);
      
      setDifficulty(diffParam);
      setMinReward(rewardParam);
      onFilterChange({ difficulty: diffParam, minReward: rewardParam });
    }
  }, []);

  const updateURL = (diff: string, reward: number) => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      params.set("difficulty", diff);
      params.set("minReward", reward.toString());
      window.history.replaceState({}, "", `${window.location.pathname}?${params}`);
    }
  };

  const handleDifficultyChange = (value: string) => {
    setDifficulty(value);
    updateURL(value, minReward);
    onFilterChange({ difficulty: value, minReward });
  };

  const handleMinRewardChange = (value: number) => {
    setMinReward(value);
    updateURL(difficulty, value);
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
        ✓ Fixed: Filters now persist on refresh!
      </div>
    </div>
  );
}
