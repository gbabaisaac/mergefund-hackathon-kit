"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type FilterProps = {
  onFilterChange: (filters: { difficulty: string; minReward: number }) => void;
};

export function BountyFilter({ onFilterChange }: FilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize from URL query params so state survives page refresh
  const getInitialDifficulty = () => searchParams.get("difficulty") ?? "all";
  const getInitialMinReward = () => {
    const val = searchParams.get("minReward");
    return val ? Number(val) : 0;
  };

  const [difficulty, setDifficulty] = useState(getInitialDifficulty);
  const [minReward, setMinReward] = useState(getInitialMinReward);

  // Sync filter changes to URL query params (persists across refresh)
  const updateUrl = useCallback((diff: string, reward: number) => {
    const params = new URLSearchParams();
    if (diff !== "all") params.set("difficulty", diff);
    if (reward > 0) params.set("minReward", String(reward));
    const query = params.toString();
    router.replace(query ? `?${query}` : "/bugs/filter", { scroll: false });
  }, [router]);

  useEffect(() => {
    onFilterChange({ difficulty, minReward });
    updateUrl(difficulty, minReward);
  }, [difficulty, minReward, onFilterChange, updateUrl]);

  const handleDifficultyChange = (value: string) => {
    setDifficulty(value);
  };

  const handleMinRewardChange = (value: number) => {
    setMinReward(value);
  };

  return (
    <div className="card p-4 flex flex-wrap gap-4 items-center">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-slate-600">Difficulty:</label>
        <select
          value={difficulty}
          onChange={(e) => handleDifficultyChange(e.target.value)}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm dark:bg-slate-800 dark:border-slate-600 dark:text-slate-200"
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
          className="w-24 rounded-lg border border-slate-200 px-3 py-2 text-sm dark:bg-slate-800 dark:border-slate-600 dark:text-slate-200"
          placeholder="0"
          min="0"
        />
      </div>

      <div className="text-xs text-emerald-600 font-medium">
        ✓ Filters persist across refresh!
      </div>
    </div>
  );
}
