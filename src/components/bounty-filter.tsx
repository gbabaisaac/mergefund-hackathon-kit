"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

type FilterProps = {
  onFilterChange: (filters: { difficulty: string; minReward: number }) => void;
};

export function BountyFilter({ onFilterChange }: FilterProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Initialize from URL params or default
  const [difficulty, setDifficulty] = useState(searchParams.get("difficulty") || "all");
  const [minReward, setMinReward] = useState(Number(searchParams.get("minReward")) || 0);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (difficulty !== "all") params.set("difficulty", difficulty);
    if (minReward > 0) params.set("minReward", minReward.toString());
    
    const newUrl = params.toString() 
      ? `?${params.toString()}`
      : window.location.pathname;
    
    router.replace(newUrl, { scroll: false });
    onFilterChange({ difficulty, minReward });
  }, [difficulty, minReward, router, onFilterChange]);

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
          className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
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
          type="range"
          min="0"
          max="500"
          step="50"
          value={minReward}
          onChange={(e) => handleMinRewardChange(Number(e.target.value))}
          className="w-32"
        />
        <span className="text-sm text-slate-600">${minReward}+</span>
      </div>
    </div>
  );
}
