"use client";

import { useState } from "react";

// FIXED: Form validation with proper error handling
// FIXED: Button disabled during submission to prevent double submission

type CreateBountyFormProps = {
  onSubmit: (bounty: { title: string; reward: number; difficulty: string }) => void;
};

type FormErrors = {
  title?: string;
  reward?: string;
};

export function CreateBountyForm({ onSubmit }: CreateBountyFormProps) {
  const [title, setTitle] = useState("");
  const [reward, setReward] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [submitting, setSubmitting] = useState(false);
  const [submissions, setSubmissions] = useState<string[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});

  // FIX: Validation function
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Title validation
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      newErrors.title = "Title is required";
    } else if (trimmedTitle.length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    } else if (trimmedTitle.length > 100) {
      newErrors.title = "Title must be less than 100 characters";
    }

    // Reward validation
    const rewardNum = Number(reward);
    if (!reward || reward.trim() === "") {
      newErrors.reward = "Reward is required";
    } else if (isNaN(rewardNum)) {
      newErrors.reward = "Reward must be a valid number";
    } else if (rewardNum < 0) {
      newErrors.reward = "Reward cannot be negative";
    } else if (rewardNum > 1000000) {
      newErrors.reward = "Reward cannot exceed $1,000,000";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // FIX: Validate before submission
    if (!validateForm()) {
      return;
    }

    // FIX: Prevent double submission by checking if already submitting
    if (submitting) {
      return;
    }

    setSubmitting(true);

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const timestamp = new Date().toISOString();
      setSubmissions((prev) => [...prev, `${title.trim()} - $${reward} at ${timestamp}`]);

      onSubmit({
        title: title.trim(),
        reward: Math.max(0, Number(reward)), // FIX: Ensure non-negative
        difficulty,
      });

      // Clear form on success
      setTitle("");
      setReward("");
      setErrors({});
    } finally {
      setSubmitting(false);
    }
  };

  // FIX: Clear error when user starts typing
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (errors.title) {
      setErrors((prev) => ({ ...prev, title: undefined }));
    }
  };

  const handleRewardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers and decimal point
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setReward(value);
      if (errors.reward) {
        setErrors((prev) => ({ ...prev, reward: undefined }));
      }
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
              errors.title
                ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                : "border-slate-200 focus:ring-blue-500 focus:border-blue-500"
            }`}
            placeholder="Bounty title"
            disabled={submitting}
            minLength={3}
            maxLength={100}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Reward ($) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            inputMode="numeric"
            value={reward}
            onChange={handleRewardChange}
            className={`w-full rounded-lg border px-3 py-2 ${
              errors.reward
                ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                : "border-slate-200 focus:ring-blue-500 focus:border-blue-500"
            }`}
            placeholder="100"
            disabled={submitting}
          />
          {errors.reward && (
            <p className="mt-1 text-sm text-red-500">{errors.reward}</p>
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
            disabled={submitting}
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

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
