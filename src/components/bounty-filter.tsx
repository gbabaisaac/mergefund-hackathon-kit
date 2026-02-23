"use client";

import { useState, useEffect } from "react";

// BUG: Filter state resets on page refresh
// FIX: Persist to localStorage for consistent state across refreshes

type FilterProps = {
  onFilterChange: (filters: { difficulty: string; minReward: number }) => void;
};

export function BountyFilter({ onFilterChange }: FilterProps) {
  // Initialize from localStorage if available, otherwise use defaults
  const [difficulty, setDifficulty] = useState("all");
  const [minReward, setMinReward] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedDifficulty = localStorage.getItem("bounty_filter_difficulty");
    const savedMinReward = localStorage.getItem("bounty_filter_minReward");

    if (savedDifficulty) setDifficulty(savedDifficulty);
    if (savedMinReward) setMinReward(Number(savedMinReward));
    
    // Notify parent of initial state
    onFilterChange({ 
      difficulty: savedDifficulty || "all", 
      minReward: Number(savedMinReward) || 0 
    });
    
    setIsInitialized(true);
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (!isInitialized) return;
    
    localStorage.setItem("bounty_filter_difficulty", difficulty);
    localStorage.setItem("bounty_filter_minReward", minReward.toString());
  }, [difficulty, minReward, isInitialized]);

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

      <div className="text-xs text-green-500 font-medium">
        ✓ State is now persisted to LocalStorage
      </div>
    </div>
  );
}
