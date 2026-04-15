"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

// FIX: Filter state is now persisted to URL query params
// - Filters survive page refresh
// - Shareable URLs with filter state
// - Read initial state from URL on mount

type FilterProps = {
  onFilterChange: (filters: { difficulty: string; minReward: number }) => void;
};

export function BountyFilter({ onFilterChange }: FilterProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Initialize from URL params on mount
  const [difficulty, setDifficulty] = useState(searchParams.get("difficulty") || "all");
  const [minReward, setMinReward] = useState(() => {
    const urlVal = searchParams.get("minReward");
    return urlVal ? Number(urlVal) : 0;
  });

  // Sync filter changes to URL
  const updateUrl = useCallback((diff: string, reward: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (diff && diff !== "all") {
      params.set("difficulty", diff);
    } else {
      params.delete("difficulty");
    }
    if (reward > 0) {
      params.set("minReward", String(reward));
    } else {
      params.delete("minReward");
    }
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [searchParams, pathname, router]);

  const handleDifficultyChange = (value: string) => {
    setDifficulty(value);
    onFilterChange({ difficulty: value, minReward });
    updateUrl(value, minReward);
  };

  const handleMinRewardChange = (value: number) => {
    setMinReward(value);
    onFilterChange({ difficulty, minReward: value });
    updateUrl(difficulty, value);
  };

  // Notify parent of initial state from URL
  useEffect(() => {
    onFilterChange({ difficulty, minReward });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

      <div className="text-xs text-slate-400">
        (Filters persist across page refresh via URL params)
      </div>
    </div>
  );
}
