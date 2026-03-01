"use client";

import { useState } from "react";

export type BountyCardProps = {
  /** Bounty title */
  title: string;
  /** Reward amount in USD */
  reward: number;
  /** Array of tags/categories */
  tags: string[];
  /** Difficulty level */
  difficulty: "Easy" | "Medium" | "Hard";
  /** Progress percentage (0-100) */
  progress: number;
  /** Optional description */
  description?: string;
  /** Optional click handler */
  onClick?: () => void;
  /** Optional status */
  status?: "open" | "in-progress" | "completed" | "claimed";
};

const difficultyStyles = {
  Easy: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800",
  Medium: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800",
  Hard: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/20 dark:text-rose-400 dark:border-rose-800",
};

const statusStyles = {
  open: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400",
  "in-progress": "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400",
  completed: "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400",
  claimed: "bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400",
};

/**
 * BountyCard Component
 * 
 * A reusable card component for displaying bounty information.
 * Features:
 * - Responsive design (mobile and desktop)
 * - Hover effects with elevation
 * - Progress bar visualization
 * - Difficulty and status badges
 * - Accessible with proper ARIA labels
 */
export function BountyCard({
  title,
  reward,
  tags,
  difficulty,
  progress,
  description,
  onClick,
  status = "open",
}: BountyCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Clamp progress between 0-100
  const clampedProgress = Math.min(Math.max(progress, 0), 100);
  
  // Format reward with commas
  const formattedReward = reward.toLocaleString();

  return (
    <div
      role={onClick ? "button" : "article"}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        card p-4 sm:p-5 
        transition-all duration-300 ease-out
        ${onClick ? "cursor-pointer" : ""}
        ${isHovered ? "shadow-lg -translate-y-1 border-brand-300 dark:border-brand-700" : "shadow-sm hover:shadow-md"}
      `}
      aria-label={`Bounty: ${title}. Reward: $${formattedReward}. Difficulty: ${difficulty}. Progress: ${clampedProgress}%`}
    >
      {/* Header: Title and Reward */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="text-base sm:text-lg font-semibold leading-snug break-words text-slate-900 dark:text-slate-100">
            {title}
          </h3>
          
          {/* Tags */}
          <div className="mt-2 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="pill text-[11px] sm:text-xs px-2 py-0.5 sm:px-3 sm:py-1 transition-colors hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Reward and Badges */}
        <div className="text-right shrink-0 flex flex-col items-end gap-1.5">
          <div className="text-xl sm:text-2xl font-bold text-brand-600 dark:text-brand-400">
            ${formattedReward}
          </div>
          
          <div className="flex flex-wrap justify-end gap-1">
            {/* Difficulty Badge */}
            <span
              className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-opacity ${difficultyStyles[difficulty]}`}
            >
              {difficulty}
            </span>
            
            {/* Status Badge */}
            <span
              className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] sm:text-xs font-semibold whitespace-nowrap capitalize transition-opacity ${statusStyles[status]}`}
            >
              {status.replace("-", " ")}
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      {description && (
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
          {description}
        </p>
      )}

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1.5">
          <span className="font-medium">Progress</span>
          <span className="font-semibold">{clampedProgress}%</span>
        </div>
        <div className="h-2.5 w-full rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-600 transition-all duration-500 ease-out"
            style={{ width: `${clampedProgress}%` }}
            role="progressbar"
            aria-valuenow={clampedProgress}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>

      {/* Hover indicator */}
      {onClick && (
        <div
          className={`
            mt-3 text-xs font-medium text-brand-600 dark:text-brand-400
            transition-all duration-200
            ${isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}
          `}
        >
          Click to view details →
        </div>
      )}
    </div>
  );
}

export default BountyCard;
