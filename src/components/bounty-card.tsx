type BountyCardProps = {
  title: string;
  reward: number;
  tags: string[];
  difficulty: "Easy" | "Medium" | "Hard";
  progress: number;
  currency?: string;
};

const difficultyStyles = {
  Easy: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Medium: "bg-amber-50 text-amber-700 border-amber-200",
  Hard: "bg-rose-50 text-rose-700 border-rose-200",
};

export function BountyCard({ title, reward, tags, difficulty, progress, currency = "USD" }: BountyCardProps) {
  const normalizedProgress = Math.max(0, Math.min(100, progress));

  return (
    <article className="card p-4 sm:p-5 hover:shadow-lg hover:-translate-y-0.5 transition" aria-label={`Bounty ${title}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="text-base sm:text-lg font-semibold leading-snug break-words">{title}</h3>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span key={tag} className="pill text-[11px] sm:text-xs px-2 py-0.5 sm:px-3 sm:py-1">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-xl sm:text-xl font-bold">
            {new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 0 }).format(reward)}
          </div>
          <span className={`mt-1 inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] sm:text-xs font-semibold whitespace-nowrap ${difficultyStyles[difficulty]}`}>
            {difficulty}
          </span>
        </div>
      </div>
      <div className="mt-3">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Progress</span>
          <span>{normalizedProgress}%</span>
        </div>
        <div className="mt-1.5 h-2 w-full rounded-full bg-slate-100" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={normalizedProgress} aria-label="Funding progress">
          <div className="h-2 rounded-full bg-brand-600 transition-all" style={{ width: `${normalizedProgress}%` }} />
        </div>
      </div>
    </article>
  );
}
