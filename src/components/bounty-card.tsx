"use client";

type Difficulty = "Easy" | "Medium" | "Hard";

type BountyCardProps = {
  title: string;
  reward: number;
  tags: string[];
  difficulty: Difficulty;
  progress: number;
  onClick?: () => void;
};

const difficultyStyles: Record<Difficulty, string> = {
  Easy: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-700",
  Medium: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-700",
  Hard: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-400 dark:border-rose-700",
};

export function BountyCard({ title, reward, tags, difficulty, progress, onClick }: BountyCardProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div
      className="card group relative p-4 sm:p-5 transition-all duration-200 hover:shadow-lg hover:border-brand-300 hover:-translate-y-0.5 dark:hover:border-brand-500 cursor-pointer"
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(); } } : undefined}
      aria-label={`Bounty: ${title}, Reward: $${reward}, Difficulty: ${difficulty}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="text-base sm:text-lg font-semibold leading-snug break-words text-slate-900 dark:text-slate-100 group-hover:text-brand-700 dark:group-hover:text-brand-400 transition-colors">
            {title}
          </h3>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="pill text-[11px] sm:text-xs px-2 py-0.5 sm:px-3 sm:py-1 transition-colors group-hover:border-brand-200 dark:group-hover:border-brand-600"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-xl sm:text-2xl font-bold text-brand-600 dark:text-brand-400">
            ${reward.toLocaleString()}
          </div>
          <span
            className={`mt-1.5 inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] sm:text-xs font-semibold whitespace-nowrap ${difficultyStyles[difficulty]}`}
          >
            {difficulty}
          </span>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1.5">
          <span>Progress</span>
          <span className="font-medium">{clampedProgress}%</span>
        </div>
        <div className="h-2.5 w-full rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-600 transition-all duration-500 ease-out"
            style={{ width: `${clampedProgress}%` }}
            role="progressbar"
            aria-valuenow={clampedProgress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Progress: ${clampedProgress}%`}
          />
        </div>
      </div>
    </div>
  );
}
