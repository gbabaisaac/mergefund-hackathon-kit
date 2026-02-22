export default function HomePage() {
  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h1 className="text-3xl font-bold">Welcome to the MergeFund Hackathon Kit</h1>
        <p className="mt-3 text-slate-600">
          This repo contains starter scaffolding and mock data for your bounties.
          Pick a task, build in isolation, and submit your PR.
        </p>
      </div>
      <h2 className="text-xl font-semibold mt-6">Feature Tasks</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="card p-5">
          <h2 className="text-lg font-semibold">Bounty Card</h2>
          <p className="mt-2 text-sm text-slate-600">
            Build a reusable UI card that displays bounty details.
          </p>
          <a className="btn mt-4" href="/bounty-card">Open</a>
        </div>
        <div className="card p-5">
          <h2 className="text-lg font-semibold">Leaderboard</h2>
          <p className="mt-2 text-sm text-slate-600">
            Build a leaderboard page with mock data and sorting.
          </p>
          <a className="btn mt-4" href="/leaderboard">Open</a>
        </div>
        <div className="card p-5">
          <h2 className="text-lg font-semibold">Discovery</h2>
          <p className="mt-2 text-sm text-slate-600">
            Prototype a bounty discovery algorithm and UI output.
          </p>
          <a className="btn mt-4" href="/discovery">Open</a>
        </div>
      </div>

      <h2 className="text-xl font-semibold mt-8">Bug Fix Challenges</h2>
      <p className="text-slate-600 text-sm mb-4">
        These components have intentional bugs. Find and fix them!
      </p>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="card p-5 border-amber-200 bg-amber-50/30">
          <span className="text-xs font-semibold text-amber-600 uppercase">Bug Fix</span>
          <h2 className="text-lg font-semibold mt-1">Filter State Bug</h2>
          <p className="mt-2 text-sm text-slate-600">
            Filter selections reset on page refresh.
          </p>
          <a className="btn mt-4" href="/bugs/filter">Open</a>
        </div>
        <div className="card p-5 border-amber-200 bg-amber-50/30">
          <span className="text-xs font-semibold text-amber-600 uppercase">Bug Fix</span>
          <h2 className="text-lg font-semibold mt-1">Double Submission</h2>
          <p className="mt-2 text-sm text-slate-600">
            Form can be submitted multiple times rapidly.
          </p>
          <a className="btn mt-4" href="/bugs/form">Open</a>
        </div>
        <div className="card p-5 border-amber-200 bg-amber-50/30">
          <span className="text-xs font-semibold text-amber-600 uppercase">Bug Fix</span>
          <h2 className="text-lg font-semibold mt-1">Leaderboard Ties</h2>
          <p className="mt-2 text-sm text-slate-600">
            Users with same earnings have inconsistent ranking.
          </p>
          <a className="btn mt-4" href="/bugs/leaderboard">Open</a>
        </div>
        <div className="card p-5 border-amber-200 bg-amber-50/30">
          <span className="text-xs font-semibold text-amber-600 uppercase">Bug Fix</span>
          <h2 className="text-lg font-semibold mt-1">Progress Overflow</h2>
          <p className="mt-2 text-sm text-slate-600">
            Progress bar breaks when funding exceeds 100%.
          </p>
          <a className="btn mt-4" href="/bugs/progress">Open</a>
        </div>
        <div className="card p-5 border-amber-200 bg-amber-50/30">
          <span className="text-xs font-semibold text-amber-600 uppercase">Bug Fix</span>
          <h2 className="text-lg font-semibold mt-1">Dark Mode Flash</h2>
          <p className="mt-2 text-sm text-slate-600">
            Theme flashes on page load and some components ignore dark mode.
          </p>
          <a className="btn mt-4" href="/bugs/theme">Open</a>
        </div>
      </div>
    </div>
  );
}
