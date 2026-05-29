"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";

type FilterProps = {
  onFilterChange: (filters: { difficulty: string; minReward: number }) => void;
};

export function BountyFilter({ onFilterChange }: FilterProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Initialize state from URL params or defaults
  const [difficulty, setDifficulty] = useState(
    searchParams.get("difficulty") || "all"
  );
  const [minReward, setMinReward] = useState(
    Number(searchParams.get("minReward")) || 0
  );

  // Update URL when filters change
  const updateUrl = useCallback(
    (newDifficulty: string, newMinReward: number) => {
      const params = new URLSearchParams();
      if (newDifficulty !== "all") params.set("difficulty", newDifficulty);
      if (newMinReward > 0) params.set("minReward", String(newMinReward));
      const queryString = params.toString();
      router.replace(`?${queryString}`, { scroll: false });
    },
    [router]
  );

  // Sync initial filter state to parent on mount
  useEffect(() => {
    onFilterChange({ difficulty, minReward });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDifficultyChange = (value: string) => {
    setDifficulty(value);
    updateUrl(value, minReward);
    onFilterChange({ difficulty: value, minReward });
  };

  const handleMinRewardChange = (value: number) => {
    setMinReward(value);
    updateUrl(difficulty, value);
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
    </div>
  );
}
