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
  const [errors, setErrors] = useState<{ title?: string; reward?: string }>({});

  // FIX 2: Validate before submitting
  const validate = () => {
    const newErrors: { title?: string; reward?: string } = {};

    if (!title.trim() || title.trim().length < 3) {
      newErrors.title = "Title is required and must be at least 3 characters.";
    }

    const rewardNum = Number(reward);
    if (!reward || isNaN(rewardNum) || rewardNum <= 0) {
      newErrors.reward = "Reward must be a positive number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // FIX 2: Block invalid submissions
    if (!validate()) return;

    // FIX 1: Guard against double submission (belt-and-suspenders alongside disabled button)
    if (submitting) return;

    setSubmitting(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const timestamp = new Date().toISOString();
    setSubmissions((prev) => [...prev, `${title} - $${reward} at ${timestamp}`]);

    onSubmit({
      title,
      reward: Number(reward),
      difficulty,
    });

    setSubmitting(false);
    setTitle("");
    setReward("");
    setErrors({});
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
            minLength={3} // FIX 2: HTML-level minLength
            required      // FIX 2: HTML-level required
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
            min="1" // FIX 2: Prevent negative numbers at the HTML level
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
          className="btn w-full disabled:opacity-50 disabled:cursor-not-allowed"
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