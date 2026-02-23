"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";

// FIX: Persist filter state to URL query params so it survives page refresh
// and is shareable via URL.

type FilterProps = {
  onFilterChange: (filters: { difficulty: string; minReward: number }) => void;
};

export function BountyFilter({ onFilterChange }: FilterProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Read initial state from URL query params, fallback to defaults
  const difficulty = searchParams.get("difficulty") ?? "all";
  const minReward = Number(searchParams.get("minReward") ?? "0");

  const updateParams = useCallback(
    (newDifficulty: string, newMinReward: number) => {
      const params = new URLSearchParams(searchParams.toString());

      if (newDifficulty === "all") {
        params.delete("difficulty");
      } else {
        params.set("difficulty", newDifficulty);
      }

      if (newMinReward <= 0) {
        params.delete("minReward");
      } else {
        params.set("minReward", String(newMinReward));
      }

      const qs = params.toString();
      router.replace(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
      onFilterChange({ difficulty: newDifficulty, minReward: newMinReward });
    },
    [searchParams, router, pathname, onFilterChange]
  );

  const handleDifficultyChange = (value: string) => {
    updateParams(value, minReward);
  };

  const handleMinRewardChange = (value: number) => {
    updateParams(difficulty, value);
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
