"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type FilterProps = {
  onFilterChange: (filters: { difficulty: string; minReward: number }) => void;
};

export function BountyFilter({ onFilterChange }: FilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize from URL query params on mount
  const [difficulty, setDifficulty] = useState(() => searchParams.get("difficulty") || "all");
  const [minReward, setMinReward] = useState(() => {
    const fromUrl = searchParams.get("minReward");
    return fromUrl ? Number(fromUrl) : 0;
  });

  // Sync state changes to URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (difficulty !== "all") params.set("difficulty", difficulty);
    if (minReward > 0) params.set("minReward", String(minReward));
    const query = params.toString();
    router.replace(query ? `?${query}` : "/", { scroll: false });
  }, [difficulty, minReward, router]);

  // Notify parent of initial filter values
  useEffect(() => {
    onFilterChange({ difficulty, minReward });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
        Filter state persists on refresh
      </div>
    </div>
  );
}
