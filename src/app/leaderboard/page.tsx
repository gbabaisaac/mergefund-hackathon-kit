import { mockLeaderboard } from "@/data/mock-leaderboard";

export default function LeaderboardPage() {
  // FIX: Stable sorting with secondary key (bounties) and reputation
  const sorted = [...mockLeaderboard].sort((a, b) => {
    if (b.earned !== a.earned) return b.earned - a.earned;
    if (b.bounties !== a.bounties) return b.bounties - a.bounties;
    return b.reputation - a.reputation;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Leaderboard</h1>
        <p className="text-slate-600">
          Global rankings of the top bounty hunters in the ecosystem.
        </p>
      </div>

      <div className="card overflow-hidden">
        <div className="grid grid-cols-5 gap-3 border-b border-slate-200 bg-slate-50 px-5 py-3 text-xs font-semibold text-slate-600">
          <div>Rank</div>
          <div className="col-span-2">Developer</div>
          <div className="text-center">Bounties</div>
          <div className="text-right">Total Earned</div>
        </div>
        {sorted.map((dev, index) => {
          let rank = index + 1;
          if (index > 0) {
            const prev = sorted[index-1];
            if (prev.earned === dev.earned && prev.bounties === dev.bounties && prev.reputation === dev.reputation) {
               let lb = index - 1;
               while (lb >= 0 && sorted[lb].earned === dev.earned && sorted[lb].bounties === dev.bounties && sorted[lb].reputation === dev.reputation) {
                 rank = lb + 1;
                 lb--;
               }
            }
          }

          return (
            <div
              key={dev.id}
              className="grid grid-cols-5 gap-3 px-5 py-4 text-sm border-b border-slate-100 last:border-b-0 items-center hover:bg-slate-50 transition"
            >
              <div className="flex items-center gap-2">
                <span className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold ${
                  rank === 1 ? "bg-amber-100 text-amber-700" : 
                  rank === 2 ? "bg-slate-200 text-slate-700" :
                  rank === 3 ? "bg-orange-100 text-orange-700" : "bg-slate-50 text-slate-500"
                }`}>
                  {rank}
                </span>
              </div>
              <div className="col-span-2">
                <div className="font-semibold text-slate-900">{dev.name}</div>
                <div className="text-xs text-slate-500 flex items-center gap-1">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                  Reputation {dev.reputation}
                </div>
              </div>
              <div className="text-center font-medium text-slate-700">{dev.bounties}</div>
              <div className="text-right font-bold text-emerald-600">${dev.earned.toLocaleString()}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
