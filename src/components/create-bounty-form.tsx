"use client";

import { useRef, useState } from "react";

// BUG 2: Form validation - allows negative numbers and empty titles (see validation below)

type CreateBountyFormProps = {
  onSubmit: (bounty: { title: string; reward: number; difficulty: string }) => void;
};

export function CreateBountyForm({ onSubmit }: CreateBountyFormProps) {
  const [title, setTitle] = useState("");
  const [reward, setReward] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ title?: string; reward?: string }>({});
  const [submissions, setSubmissions] = useState<string[]>([]);
  const isSubmittingRef = useRef(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Synchronous re-entry guard: prevents double submission before React re-renders
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    setSubmitting(true);

    try {
      // Validation: check for empty title and negative reward
      const newErrors: { title?: string; reward?: string } = {};
      
      if (!title.trim()) {
        newErrors.title = "Title is required";
      }
      
      const rewardNum = Number(reward);
      if (isNaN(rewardNum) || rewardNum <= 0) {
        newErrors.reward = "Reward must be a positive number";
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        isSubmittingRef.current = false;
        setSubmitting(false);
        return;
      }

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const timestamp = new Date().toISOString();
      setSubmissions((prev) => [...prev, `${title} - $${reward} at ${timestamp}`]);

      onSubmit({
        title,
        reward: Number(reward),
        difficulty,
      });

      setTitle("");
      setReward("");
    } finally {
      isSubmittingRef.current = false;
      setSubmitting(false);
    }
  };

  return (
    <div className="card p-6 space-y-4">
      <h3 className="text-lg font-semibold">Create New Bounty</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2"
            placeholder="Bounty title"
            required
            minLength={1}
          />
          {/* FIX 2: Show validation error */}
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Reward ($)
          </label>
          <input
            type="number"
            value={reward}
            onChange={(e) => setReward(e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2"
            placeholder="100"
            min="1"
          />
          {/* FIX 2: Show validation error */}
          {errors.reward && (
            <p className="text-red-500 text-xs mt-1">{errors.reward}</p>
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

        {/* FIX 1: Disable button while submitting */}
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
            Submissions (click rapidly to see the bug!):
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