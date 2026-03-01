"use client";

import { useState, useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

// FIXED: Filter state now persists via URL query params
// This allows sharing filtered views and maintains state on refresh

type FilterProps = {
  onFilterChange: (filters: { difficulty: string; minReward: number }) => void;
};

export function BountyFilter({ onFilterChange }: FilterProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Initialize from URL params or defaults
  const getInitialDifficulty = () => {
    return searchParams.get("difficulty") || "all";
  };

  const getInitialMinReward = () => {
    const param = searchParams.get("minReward");
    return param ? Number(param) : 0;
  };

  const [difficulty, setDifficulty] = useState(getInitialDifficulty);
  const [minReward, setMinReward] = useState(getInitialMinReward);

  // Update URL when filters change
  const updateUrl = (newDifficulty: string, newMinReward: number) => {
    const params = new URLSearchParams();
    
    if (newDifficulty !== "all") {
      params.set("difficulty", newDifficulty);
    }
    if (newMinReward > 0) {
      params.set("minReward", String(newMinReward));
    }

    const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.replace(newUrl, { scroll: false });
  };

  // Sync state with URL on mount and when URL changes
  useEffect(() => {
    const urlDifficulty = searchParams.get("difficulty") || "all";
    const urlMinReward = searchParams.get("minReward");
    const parsedMinReward = urlMinReward ? Number(urlMinReward) : 0;

    setDifficulty(urlDifficulty);
    setMinReward(parsedMinReward);
    onFilterChange({ difficulty: urlDifficulty, minReward: parsedMinReward });
  }, [searchParams]);

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
        (Fixed: filters persist on refresh!)
      </div>
    </div>
  );
}
