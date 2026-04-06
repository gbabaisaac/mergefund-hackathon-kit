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
  Easy: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Medium: "bg-amber-50 text-amber-700 border-amber-200",
  Hard: "bg-rose-50 text-rose-700 border-rose-200",
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
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="text-base sm:text-lg font-semibold leading-snug break-words">{title}</h3>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="pill text-[11px] sm:text-xs px-2 py-0.5 sm:px-3 sm:py-1 transition-colors hover:border-brand-300 hover:text-brand-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-xl sm:text-xl font-bold">${reward}</div>
          <span className={`mt-1 inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] sm:text-xs font-semibold whitespace-nowrap ${difficultyStyles[difficulty]}`}>
            {difficulty}
          </span>
        </div>
      </div>
      <div className="mt-3">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>{isComplete ? "✅ Funded" : "Progress"}</span>
          <span>{progress}%</span>
        </div>
        <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-100">
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
        className="card p-4 sm:p-5 hover:shadow-lg hover:scale-[1.01] transition-all duration-200 block cursor-pointer no-underline"
      >
        {cardContent}
      </a>
    );
  }

  return (
    <div className="card p-4 sm:p-5 hover:shadow-lg hover:scale-[1.01] transition-all duration-200">
      {cardContent}
    </div>
  );
}
