"use client";

type BountyCardProps = {
  title: string;
  reward: number;
  tags: string[];
  difficulty: "Easy" | "Medium" | "Hard";
  progress: number;
  /** Optional URL to wrap the card as a clickable link */
  href?: string;
  /** Optional click handler — used when href is not provided */
  onClick?: () => void;
};

const difficultyStyles = {
  Easy: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800",
  Medium: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",
  Hard: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800",
};

/** Returns a gradient class based on progress percentage */
function getProgressGradient(progress: number): string {
  const clamped = Math.min(Math.max(progress, 0), 100);
  if (clamped >= 100) return "from-green-400 to-emerald-500";
  if (clamped >= 70) return "from-blue-400 to-indigo-500";
  if (clamped >= 40) return "from-violet-400 to-purple-500";
  return "from-brand-400 to-brand-600";
}

function BountyCardInner({
  title,
  reward,
  tags,
  difficulty,
  progress,
  href,
  onClick,
}: BountyCardProps) {
  const progressGradient = getProgressGradient(progress);

  const cardContent = (
    <>
      {/* Top row: title + reward column */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="text-sm sm:text-base md:text-lg font-semibold leading-snug text-slate-900 dark:text-slate-100 group-hover:text-brand-700 dark:group-hover:text-brand-300 transition-colors duration-200">
            {title}
          </h3>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="pill text-[10px] sm:text-xs px-2 py-0.5 sm:px-2.5 sm:py-1"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Reward + difficulty */}
        <div className="text-right shrink-0 space-y-1.5">
          <div className="text-xl sm:text-2xl font-bold bg-gradient-to-br from-brand-600 to-purple-600 bg-clip-text text-transparent">
            ${reward.toLocaleString()}
          </div>
          <span
            className={`mt-1 inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] sm:text-xs font-semibold whitespace-nowrap ${difficultyStyles[difficulty]}`}
          >
            {difficulty}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1.5">
          <span className="font-medium">Progress</span>
          <span className="font-semibold tabular-nums">{progress}%</span>
        </div>
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${progressGradient} shadow-sm transition-all duration-500 ease-out`}
            style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
          />
        </div>
      </div>

      {/* Subtle arrow indicator for clickable cards */}
      {href && (
        <div className="mt-3 flex items-center gap-1 text-brand-600 dark:text-brand-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="text-xs font-medium">View details</span>
          <svg
            className="h-3 w-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className="card block p-4 sm:p-5 group cursor-pointer no-underline"
      >
        {cardContent}
      </a>
    );
  }

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="card w-full text-left p-4 sm:p-5 group cursor-pointer bg-transparent border-0"
      >
        {cardContent}
      </button>
    );
  }

  return (
    <div className="card p-4 sm:p-5 group">
      {cardContent}
    </div>
  );
}

export function BountyCard(props: BountyCardProps) {
  return <BountyCardInner {...props} />;
}
