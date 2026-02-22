"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

type FilterProps = {
  onFilterChange: (filters: { difficulty: string; minReward: number }) => void;
};

const STORAGE_KEY = "bounty-filters";

export function BountyFilter({ onFilterChange }: FilterProps) {
  const [difficulty, setDifficulty] = useState("all");
  const [minReward, setMinReward] = useState(0);
  const router = useRouter();
  
  // Load initial state from URL or localStorage
  useEffect(() => {
    // First check URL query params
    const urlParams = new URLSearchParams(window.location.search);
    const urlDifficulty = urlParams.get("difficulty");
    const urlMinReward = urlParams.get("minReward");
    
    let loadedDifficulty = "all";
    let loadedMinReward = 0;
    
    if (urlDifficulty) {
      loadedDifficulty = urlDifficulty;
    } else if (typeof window !== 'undefined') {
      // Fall back to localStorage
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          loadedDifficulty = parsed.difficulty || "all";
          loadedMinReward = parsed.minReward || 0;
        }
      } catch (e) {
        console.error("Error reading filter state:", e);
      }
    }
    
    if (urlDifficulty) setDifficulty(urlDifficulty);
    else setDifficulty(loadedDifficulty);
    
    if (urlMinReward) {
      setMinReward(Number(urlMinReward));
      loadedMinReward = Number(urlMinReward);
    } else {
      setMinReward(loadedMinReward);
    }
    
    // Notify parent of initial filter state
    onFilterChange({ difficulty: loadedDifficulty, minReward: loadedMinReward });
  }, []);

  // Persist state when it changes
  const persistState = (newDifficulty: string, newMinReward: number) => {
    // Save to localStorage
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        difficulty: newDifficulty,
        minReward: newMinReward
      }));
    } catch (e) {
      console.error("Error saving filter state:", e);
    }
    
    // Also update URL without refreshing
    const url = new URL(window.location.href);
    if (newDifficulty && newDifficulty !== "all") {
      url.searchParams.set("difficulty", newDifficulty);
    } else {
      url.searchParams.delete("difficulty");
    }
    if (newMinReward > 0) {
      url.searchParams.set("minReward", String(newMinReward));
    } else {
      url.searchParams.delete("minReward");
    }
    window.history.replaceState({}, "", url.toString());
  };

  const handleDifficultyChange = (value: string) => {
    setDifficulty(value);
    onFilterChange({ difficulty: value, minReward });
    persistState(value, minReward);
  };

  const handleMinRewardChange = (value: number) => {
    setMinReward(value);
    onFilterChange({ difficulty, minReward: value });
    persistState(difficulty, value);
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
        ✓ Filters now persist on refresh!
      </div>
    </div>
  );
}
