"use client";

/**
 * Create Bounty form with validation (Issue #12).
 *
 * Cause: The form did not show inline error states; it used alert() and did not
 * consistently block submit for empty titles or negative rewards (HTML min="1"
 * is not enforced when the user types negative values).
 *
 * Fix: Added titleError and rewardError state; on submit we validate and set
 * these. Submit is blocked until valid. Inline error messages and red borders
 * show for invalid fields; errors clear when the user corrects input.
 */
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
  const [titleError, setTitleError] = useState("");
  const [rewardError, setRewardError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTitleError("");
    setRewardError("");

    const titleValid = title.trim().length > 0;
    const rewardNum = Number(reward);
    const rewardValid = !Number.isNaN(rewardNum) && rewardNum > 0;

    if (!titleValid) {
      setTitleError("Title is required and cannot be empty.");
    }
    if (!rewardValid) {
      setRewardError(
        reward.trim() === ""
          ? "Reward is required."
          : "Reward must be a positive number (no negative values).",
      );
    }
    if (!titleValid || !rewardValid) {
      return;
    }

    setSubmitting(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const timestamp = new Date().toISOString();
    setSubmissions((prev) => [...prev, `${title} - $${reward} at ${timestamp}`]);

    onSubmit({
      title: title.trim(),
      reward: Number(reward),
      difficulty,
    });

    setSubmitting(false);
    setTitle("");
    setReward("");
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
            onChange={(e) => {
              setTitle(e.target.value);
              if (titleError) setTitleError("");
            }}
            className={`w-full rounded-lg border px-3 py-2 ${
              titleError ? "border-red-500 bg-red-50" : "border-slate-200"
            }`}
            placeholder="Bounty title"
            required
            minLength={1}
            aria-invalid={!!titleError}
            aria-describedby={titleError ? "title-error" : undefined}
          />
          {titleError && (
            <p id="title-error" className="mt-1 text-sm text-red-600" role="alert">
              {titleError}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Reward ($)
          </label>
          <input
            type="number"
            value={reward}
            onChange={(e) => {
              setReward(e.target.value);
              if (rewardError) setRewardError("");
            }}
            min={1}
            className={`w-full rounded-lg border px-3 py-2 ${
              rewardError ? "border-red-500 bg-red-50" : "border-slate-200"
            }`}
            placeholder="100"
            aria-invalid={!!rewardError}
            aria-describedby={rewardError ? "reward-error" : undefined}
          />
          {rewardError && (
            <p id="reward-error" className="mt-1 text-sm text-red-600" role="alert">
              {rewardError}
            </p>
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
