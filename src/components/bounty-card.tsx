export type BountyCardProps = {
  /** Main title of the bounty */
  title: string;
  /** Reward amount in USD */
  reward: number;
  /** Category/topic tags */
  tags: string[];
  /** Difficulty tier badge */
  difficulty: "Easy" | "Medium" | "Hard";
  /** Funding progress percentage (0–100) */
  progress: number;
  /** Optional callback when card is clicked */
  onClick?: () => void;
  /** Optional link for the card (makes the whole card clickable) */
  href?: string;
  /** Optional creator/submitter name */
  submitter?: string;
};

const difficultyStyles = {
  Easy: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800",
  Medium: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",
  Hard: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800",
};

const progressColors = {
  low: "bg-brand-500",
  medium: "bg-amber-500",
  high: "bg-emerald-500",
};

function getProgressColor(progress: number) {
  if (progress >= 70) return progressColors.high;
  if (progress >= 30) return progressColors.medium;
  return progressColors.low;
}

export function BountyCard({ title, reward, tags, difficulty, progress, onClick, href, submitter }: BountyCardProps) {
  const progressColor = getProgressColor(progress);
  const clampedProgress = Math.min(100, Math.max(0, progress));

  const cardContent = (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="text-base sm:text-lg font-semibold leading-snug text-slate-900 dark:text-slate-100 break-words group-hover:text-brand-700 dark:group-hover:text-brand-300 transition-colors">
            {title}
          </h3>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="pill text-[11px] sm:text-xs px-2 py-0.5 sm:px-3 sm:py-1"
              >
                {tag}
              </span>
            ))}
          </div>
          {submitter && (
            <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
              by {submitter}
            </p>
          )}
        </div>
        <div className="text-right shrink-0">
          <div className="text-xl sm:text-xl font-bold text-slate-900 dark:text-slate-100">
            ${reward}
          </div>
          <span
            className={`mt-1 inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] sm:text-xs font-semibold whitespace-nowrap ${difficultyStyles[difficulty]}`}
          >
            {difficulty}
          </span>
        </div>
      </div>
      <div className="mt-3">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Progress</span>
          <span>{clampedProgress}%</span>
        </div>
        <div className="mt-1.5 h-2 w-full rounded-full bg-slate-100 dark:bg-slate-700">
          <div
            className={`h-2 rounded-full ${progressColor} transition-all duration-500`}
            style={{ width: `${clampedProgress}%` }}
          />
        </div>
      </div>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className="card group block p-4 sm:p-5 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
      >
        {cardContent}
      </a>
    );
  }

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className="card group w-full text-left p-4 sm:p-5 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
      >
        {cardContent}
      </button>
    );
  }

  return (
    <div className="card group p-4 sm:p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
      {cardContent}
    </div>
  );
}
