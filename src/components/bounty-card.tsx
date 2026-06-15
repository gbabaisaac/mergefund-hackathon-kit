type BountyCardProps = {
  title: string;
  reward: number;
  tags: string[];
  difficulty: "Easy" | "Medium" | "Hard";
  progress: number;
};

const difficultyStyles = {
  Easy: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Medium: "bg-amber-50 text-amber-700 border-amber-200",
  Hard: "bg-rose-50 text-rose-700 border-rose-200",
};

export function BountyCard({ title, reward, tags, difficulty, progress }: BountyCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-4 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-500 hover:shadow-xl hover:shadow-brand-500/10">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug break-words transition-colors group-hover:text-brand-600">{title}</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-[10px] sm:text-xs font-medium text-slate-600 ring-1 ring-inset ring-slate-200 transition-colors group-hover:bg-brand-50 group-hover:text-brand-700 group-hover:ring-brand-200">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-2xl sm:text-3xl font-black text-slate-900 group-hover:text-brand-600 transition-colors">${reward}</div>
          <span className={`mt-1 inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-colors ${difficultyStyles[difficulty]}`}>
            {difficulty}
          </span>
        </div>
      </div>
      <div className="mt-6">
        <div className="flex items-center justify-between text-xs font-medium text-slate-500 mb-2">
          <span>Funding Progress</span>
          <span className="text-slate-900">{progress}%</span>
        </div>
        <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden ring-1 ring-slate-200">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-600 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <div className="absolute top-0 right-0 -mr-4 -mt-4 w-16 h-16 bg-brand-500/5 rounded-full blur-2xl group-hover:bg-brand-500/10 transition-all" />
    </div>
  );
}
