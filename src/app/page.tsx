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
    </div>
  );
}
