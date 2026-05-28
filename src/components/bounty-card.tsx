export type BountyCardProps = {
  title: string;
  reward: number | string;
  tags?: string[];
  difficulty: "Easy" | "Medium" | "Hard" | "Beginner" | "Intermediate" | "Advanced";
  progress: number;
};

const difficultyStyles: Record<BountyCardProps["difficulty"], string> = {
  Easy: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Beginner: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Medium: "bg-amber-50 text-amber-700 border-amber-200",
  Intermediate: "bg-amber-50 text-amber-700 border-amber-200",
  Hard: "bg-rose-50 text-rose-700 border-rose-200",
  Advanced: "bg-rose-50 text-rose-700 border-rose-200",
};

export function BountyCard({ title, reward, tags = [], difficulty, progress }: BountyCardProps) {
  const safeProgress = Math.min(100, Math.max(0, progress));
  const rewardLabel = typeof reward === "number" ? `$${reward.toLocaleString()}` : reward;

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lg sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="mb-3 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                {tag}
              </span>
            ))}
          </div>
          <h3 className="text-lg font-semibold leading-snug text-slate-950 sm:text-xl">{title}</h3>
        </div>

        <div className="flex items-center justify-between gap-3 sm:block sm:text-right">
          <p className="text-2xl font-bold text-brand-600">{rewardLabel}</p>
          <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${difficultyStyles[difficulty]}`}>
            {difficulty}
          </span>
        </div>
      </div>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between text-sm text-slate-500">
          <span>Progress</span>
          <span>{safeProgress}%</span>
        </div>
        <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-700 transition-all duration-500"
            style={{ width: `${safeProgress}%` }}
          />
        </div>
      </div>
    </article>
  );
}
