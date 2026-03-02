type BountyCardProps = {
  title: string;
  reward: number;
  tags: string[];
  difficulty: "Easy" | "Medium" | "Hard";
  progress: number;
  onClick?: () => void;
  className?: string;
};

const difficultyStyles = {
  Easy: {
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    progress: "bg-emerald-500",
    icon: "🌱",
  },
  Medium: {
    badge: "bg-amber-50 text-amber-700 border-amber-200",
    progress: "bg-amber-500",
    icon: "⚡",
  },
  Hard: {
    badge: "bg-rose-50 text-rose-700 border-rose-200",
    progress: "bg-rose-500",
    icon: "🔥",
  },
};

export function BountyCard({
  title,
  reward,
  tags,
  difficulty,
  progress,
  onClick,
  className = "",
}: BountyCardProps) {
  const styles = difficultyStyles[difficulty];
  const isClickable = !!onClick;

  return (
    <div
      className={`card p-4 sm:p-5 transition-all duration-200 ${
        isClickable
          ? "cursor-pointer hover:shadow-lg hover:-translate-y-1 hover:border-brand-300"
          : "hover:shadow-md"
      } ${className}`}
      onClick={onClick}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={(e) => {
        if (isClickable && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="text-base sm:text-lg font-semibold leading-snug break-words group-hover:text-brand-600">
            {title}
          </h3>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="pill text-[11px] sm:text-xs px-2 py-0.5 sm:px-3 sm:py-1 hover:bg-brand-100 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-xl sm:text-2xl font-bold text-slate-800">
            ${reward.toLocaleString()}
          </div>
          <span
            className={`mt-1 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] sm:text-xs font-semibold whitespace-nowrap ${styles.badge}`}
          >
            <span>{styles.icon}</span>
            {difficulty}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
          <span className="flex items-center gap-1">
            <span>💰</span> Funded
          </span>
          <span className={`font-semibold ${progress >= 100 ? "text-emerald-600" : ""}`}>
            {progress >= 100 ? "✓ " : ""}{Math.min(100, progress)}%
          </span>
        </div>
        <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${styles.progress} ${
              progress >= 100 ? "animate-pulse" : ""
            }`}
            style={{ width: `${Math.min(100, progress)}%` }}
          />
        </div>
      </div>

      {/* Footer with quick actions */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
        <div className="text-xs text-slate-400">
          {progress >= 75 ? "🔥 Almost funded!" : progress >= 50 ? "📈 Halfway there" : "🆕 New opportunity"}
        </div>
        {isClickable && (
          <div className="text-xs text-brand-600 font-medium flex items-center gap-1">
            View details
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
