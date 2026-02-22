"use client";

import { useState } from "react";

type CreateBountyFormProps = {
  onSubmit: (bounty: { title: string; reward: number; difficulty: string }) => void;
};

export function CreateBountyForm({ onSubmit }: CreateBountyFormProps) {
  const [title, setTitle] = useState("");
  const [reward, setReward] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [submitting, setSubmitting] = useState(false);
  const [submissions, setSubmissions] = useState<string[]>([]);
  
  // Error states for form validation
  const [titleError, setTitleError] = useState("");
  const [rewardError, setRewardError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset error states
    setTitleError("");
    setRewardError("");
    
    let hasError = false;

    // Validate title - cannot be empty
    if (!title.trim()) {
      setTitleError("Title is required");
      hasError = true;
    }

    // Validate reward - must be a positive number
    const rewardNum = Number(reward);
    if (!reward.trim()) {
      setRewardError("Reward is required");
      hasError = true;
    } else if (isNaN(rewardNum) || rewardNum <= 0) {
      setRewardError("Reward must be a positive number");
      hasError = true;
    }

    // If there are validation errors, stop here
    if (hasError) {
      return;
    }

    setSubmitting(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const timestamp = new Date().toISOString();
    setSubmissions((prev) => [...prev, `${title} - $${reward} at ${timestamp}`]);

    onSubmit({
      title,
      reward: rewardNum,
      difficulty,
    });

    setSubmitting(false);
    setTitle("");
    setReward("");
  };

  // Clear title error when user starts typing
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (titleError) {
      setTitleError("");
    }
  };

  // Clear reward error when user starts typing
  const handleRewardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReward(e.target.value);
    if (rewardError) {
      setRewardError("");
    }
  };

  return (
    <div className="card p-6 space-y-4">
      <h3 className="text-lg font-semibold">Create New Bounty</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            className={`w-full rounded-lg border px-3 py-2 ${
              titleError ? "border-red-500 bg-red-50" : "border-slate-200"
            }`}
            placeholder="Bounty title"
            minLength={1}
          />
          {titleError && (
            <p className="mt-1 text-sm text-red-600">{titleError}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Reward ($) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={reward}
            onChange={handleRewardChange}
            className={`w-full rounded-lg border px-3 py-2 ${
              rewardError ? "border-red-500 bg-red-50" : "border-slate-200"
            }`}
            placeholder="100"
            min="1"
          />
          {rewardError && (
            <p className="mt-1 text-sm text-red-600">{rewardError}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Difficulty
          </label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <button
          type="submit"
          className="btn w-full"
          disabled={submitting}
        >
          {submitting ? "Creating..." : "Create Bounty"}
        </button>
      </form>

      {submissions.length > 0 && (
        <div className="mt-4 p-3 bg-slate-50 rounded-lg">
          <p className="text-xs font-semibold text-slate-500 mb-2">
            Submissions:
          </p>
          <ul className="text-xs text-slate-600 space-y-1">
            {submissions.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
