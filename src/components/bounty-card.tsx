type BountyCardProps = {
  title: string;
  reward: number;
  tags: string[];
  difficulty: "Easy" | "Medium" | "Hard";
  progress: number;
  /** Optional URL to make the entire card clickable */
  href?: string;
};

const difficultyStyles = {
  Easy: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800",
  Medium: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800",
  Hard: "bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-400 dark:border-rose-800",
};

/** Returns a progress bar color class based on progress percentage */
function getProgressColor(progress: number): string {
  if (progress >= 100) return "bg-emerald-500";
  if (progress >= 75) return "bg-brand-600";
  if (progress >= 50) return "bg-amber-400";
  if (progress >= 25) return "bg-amber-500";
  return "bg-rose-400";
}

export function BountyCard({ title, reward, tags, difficulty, progress, href }: BountyCardProps) {
  const isComplete = progress >= 100;

  const cardContent = (
    <>
      {/* Top row: Title + Reward/Difficulty */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-semibold leading-snug text-slate-900 dark:text-slate-100">
            {title}
          </h3>
          {/* Tags — wrap gracefully on mobile */}
          <div className="mt-2 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="pill text-[11px] sm:text-xs px-2 py-0.5 sm:px-3 sm:py-1 transition-colors hover:border-brand-300 hover:text-brand-700 dark:hover:border-brand-400 dark:hover:text-brand-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Reward + Difficulty — stacked on mobile, side-by-side on sm+ */}
        <div className="flex sm:flex-col sm:items-end sm:text-right gap-2 sm:gap-1 shrink-0">
          <div className="text-xl font-bold text-brand-600 dark:text-brand-400">
            ${reward}
          </div>
          <span
            className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] sm:text-xs font-semibold whitespace-nowrap ${difficultyStyles[difficulty]}`}
          >
            {difficulty}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span className={isComplete ? "text-emerald-600 dark:text-emerald-400 font-medium" : ""}>
            {isComplete ? "\u2713 Funded" : "Progress"}
          </span>
          <span>{progress}%</span>
        </div>
        <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(progress)}`}
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className="card p-4 sm:p-5 hover:shadow-lg hover:border-brand-200 dark:hover:border-brand-600 hover:-translate-y-0.5 transition-all duration-200 block cursor-pointer no-underline"
      >
        {cardContent}
      </a>
    );
  }

  return (
    <div className="card p-4 sm:p-5 hover:shadow-lg hover:border-brand-200 dark:hover:border-brand-600 hover:-translate-y-0.5 transition-all duration-200">
      {cardContent}
    </div>
  );
}
