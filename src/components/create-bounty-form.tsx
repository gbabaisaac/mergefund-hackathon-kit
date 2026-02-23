"use client";

import { useRef, useState } from "react";

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

  const validate = () => {
    const newErrors: { title?: string; reward?: string } = {};
    if (!title.trim()) {
      newErrors.title = "Title is required";
    }
    const rewardNum = Number(reward);
    if (!reward) {
      newErrors.reward = "Reward is required";
    } else if (isNaN(rewardNum) || rewardNum <= 0) {
      newErrors.reward = "Reward must be a positive number";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    // Synchronous re-entry guard: prevents double submission before React re-renders
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    setSubmitting(true);

    try {
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
      setErrors({});
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
            className={`w-full rounded-lg border px-3 py-2 ${
              errors.title ? "border-red-500" : "border-slate-200"
            }`}
            placeholder="Bounty title"
          />
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
            className={`w-full rounded-lg border px-3 py-2 ${
              errors.reward ? "border-red-500" : "border-slate-200"
            }`}
            placeholder="100"
          />
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

        <button
          type="submit"
          className="btn w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
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
