"use client";

import { useState, useEffect, useCallback } from "react";

// FIX: Filter state now persists across page refreshes via URL search params

type FilterProps = {
  onFilterChange: (filters: { difficulty: string; minReward: number }) => void;
};

function getFiltersFromURL(): { difficulty: string; minReward: number } {
  if (typeof window === "undefined") return { difficulty: "all", minReward: 0 };
  const params = new URLSearchParams(window.location.search);
  return {
    difficulty: params.get("difficulty") || "all",
    minReward: Number(params.get("minReward")) || 0,
  };
}

function setFiltersToURL(difficulty: string, minReward: number) {
  const params = new URLSearchParams(window.location.search);
  if (difficulty === "all") {
    params.delete("difficulty");
  } else {
    params.set("difficulty", difficulty);
  }
  if (minReward === 0) {
    params.delete("minReward");
  } else {
    params.set("minReward", String(minReward));
  }
  const newURL = params.toString()
    ? `${window.location.pathname}?${params.toString()}`
    : window.location.pathname;
  window.history.replaceState({}, "", newURL);
}

export function BountyFilter({ onFilterChange }: FilterProps) {
  const [filters, setFilters] = useState(getFiltersFromURL);

  useEffect(() => {
    onFilterChange(filters);
    setFiltersToURL(filters.difficulty, filters.minReward);
  }, [filters, onFilterChange]);

  const handleDifficultyChange = useCallback((value: string) => {
    setFilters((prev) => ({ ...prev, difficulty: value }));
  }, []);

  const handleMinRewardChange = useCallback((value: number) => {
    setFilters((prev) => ({ ...prev, minReward: value }));
  }, []);

  return (
    <div className="card p-4 flex flex-wrap gap-4 items-center">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-slate-600">Difficulty:</label>
        <select
          value={filters.difficulty}
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
          value={filters.minReward}
          onChange={(e) => handleMinRewardChange(Number(e.target.value))}
          className="w-24 rounded-lg border border-slate-200 px-3 py-2 text-sm"
          placeholder="0"
        />
      </div>

      <div className="text-xs text-green-600">
        ✓ Filters persist across refreshes via URL params
      </div>
    </div>
  );
}
