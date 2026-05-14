"use client";

import { useEffect, useState } from "react";

type FilterProps = {
  onFilterChange: (filters: { difficulty: string; minReward: number }) => void;
};

const validDifficulties = new Set(["all", "Easy", "Medium", "Hard"]);

function readFiltersFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const difficultyParam = params.get("difficulty") ?? "all";
  const minRewardParam = Number(params.get("minReward") ?? 0);

  return {
    difficulty: validDifficulties.has(difficultyParam) ? difficultyParam : "all",
    minReward: Number.isFinite(minRewardParam) && minRewardParam > 0 ? minRewardParam : 0,
  };
}

function writeFiltersToUrl(filters: { difficulty: string; minReward: number }) {
  const url = new URL(window.location.href);

  if (filters.difficulty === "all") {
    url.searchParams.delete("difficulty");
  } else {
    url.searchParams.set("difficulty", filters.difficulty);
  }

  if (filters.minReward > 0) {
    url.searchParams.set("minReward", String(filters.minReward));
  } else {
    url.searchParams.delete("minReward");
  }

  window.history.replaceState(null, "", url);
}

export function BountyFilter({ onFilterChange }: FilterProps) {
  const [difficulty, setDifficulty] = useState("all");
  const [minReward, setMinReward] = useState(0);

  useEffect(() => {
    const filters = readFiltersFromUrl();
    setDifficulty(filters.difficulty);
    setMinReward(filters.minReward);
    onFilterChange(filters);
  }, [onFilterChange]);

  const handleDifficultyChange = (value: string) => {
    setDifficulty(value);
    const filters = { difficulty: value, minReward };
    writeFiltersToUrl(filters);
    onFilterChange(filters);
  };

  const handleMinRewardChange = (value: number) => {
    const nextMinReward = Number.isFinite(value) && value > 0 ? value : 0;
    setMinReward(nextMinReward);
    const filters = { difficulty, minReward: nextMinReward };
    writeFiltersToUrl(filters);
    onFilterChange(filters);
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

      <div className="text-xs text-slate-400">Filters are saved in the page URL.</div>
    </div>
  );
}
