export type BountyDifficulty = "Easy" | "Medium" | "Hard";

export type BountyCardProps = {
  title: string;
  reward: number;
  tags: string[];
  difficulty: BountyDifficulty;
  progress: number;
  description?: string;
  dueLabel?: string;
};

const difficultyStyles: Record<BountyDifficulty, string> = {
  Easy: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Medium: "border-amber-200 bg-amber-50 text-amber-700",
  Hard: "border-rose-200 bg-rose-50 text-rose-700",
};

const difficultyLabels: Record<BountyDifficulty, string> = {
  Easy: "Beginner friendly",
  Medium: "Intermediate",
  Hard: "Advanced",
};

function clampProgress(value: number) {
  if (!Number.isFinite(value)) {
    return 0;
  }
  return Math.max(0, Math.min(100, Math.round(value)));
}

function formatReward(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function BountyCard({
  title,
  reward,
  tags,
  difficulty,
  progress,
  description,
  dueLabel,
}: BountyCardProps) {
  const safeProgress = clampProgress(progress);

  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lg sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${difficultyStyles[difficulty]}`}
            >
              {difficulty}
            </span>
            <span className="text-xs font-medium text-slate-500">{difficultyLabels[difficulty]}</span>
          </div>

          <h3 className="mt-3 text-base font-semibold leading-snug text-slate-950 sm:text-lg">
            {title}
          </h3>

          {description ? (
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{description}</p>
          ) : null}

          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 transition group-hover:bg-brand-50 group-hover:text-brand-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex shrink-0 flex-row items-center justify-between gap-3 rounded-xl bg-slate-50 px-3 py-2 sm:flex-col sm:items-end sm:bg-transparent sm:px-0 sm:py-0">
          <span className="text-xs font-medium uppercase tracking-wide text-slate-500">Reward</span>
          <strong className="text-xl font-bold text-slate-950 sm:text-2xl">{formatReward(reward)}</strong>
        </div>
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between text-xs font-medium text-slate-500">
          <span>Funding progress</span>
          <span>{safeProgress}%</span>
        </div>
        <div
          className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-100"
          role="progressbar"
          aria-label={`${title} funding progress`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={safeProgress}
        >
          <div
            className="h-full rounded-full bg-brand-600 transition-all duration-300"
            style={{ width: `${safeProgress}%` }}
          />
        </div>
      </div>

      {dueLabel ? (
        <div className="mt-4 border-t border-slate-100 pt-3 text-xs font-medium text-slate-500">
          {dueLabel}
        </div>
      ) : null}
    </article>
  );
}
