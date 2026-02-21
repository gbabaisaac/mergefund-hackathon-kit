type Difficulty = "Easy" | "Medium" | "Hard";

type BountyCardProps = {
  title: string;
  reward: number;
  tags: readonly string[];
  difficulty: Difficulty;
  progress: number;
  className?: string;
};

const difficultyStyles: Record<Difficulty, string> = {
  Easy: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Medium: "bg-amber-50 text-amber-700 border-amber-200",
  Hard: "bg-rose-50 text-rose-700 border-rose-200",
};

export function BountyCard({
  title,
  reward,
  tags,
  difficulty,
  progress,
  className = "",
}: BountyCardProps) {
  const safeProgress = Math.max(0, Math.min(100, Math.round(progress)));

  return (
    <article
      className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lg ${className}`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1 space-y-3">
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="pill">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-end gap-2">
          <div className="text-right">
            <div className="text-xs uppercase tracking-wide text-slate-500">Reward</div>
            <div className="text-xl font-bold text-slate-900">${reward}</div>
          </div>
          <span
            className={`inline-flex items-center rounded-full border px-2 py-1 text-xs font-semibold ${difficultyStyles[difficulty]}`}
            aria-label={`Difficulty ${difficulty}`}
          >
            {difficulty}
          </span>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Progress</span>
          <span>{safeProgress}%</span>
        </div>
        <div
          className="h-2 w-full rounded-full bg-slate-100"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={safeProgress}
          aria-label={`Progress ${safeProgress} percent`}
        >
          <div
            className="h-2 rounded-full bg-brand-600 transition-all duration-300"
            style={{ width: `${safeProgress}%` }}
          />
        </div>
      </div>
    </article>
  );
}
