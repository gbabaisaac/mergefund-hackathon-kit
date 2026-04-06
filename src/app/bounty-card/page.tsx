"use client";

import { BountyCard } from "@/components/bounty-card";

const allBounties = [
  {
    id: "bounty-1",
    title: "Fix mobile overflow on stats cards",
    reward: 120,
    tags: ["frontend", "ux", "bugfix"],
    difficulty: "Easy" as const,
    progress: 60,
    submitter: "alice_dev",
  },
  {
    id: "bounty-2",
    title: "Add CSV export to leaderboard",
    reward: 250,
    tags: ["data", "dashboard"],
    difficulty: "Medium" as const,
    progress: 35,
    submitter: "bob_builder",
  },
  {
    id: "bounty-3",
    title: "Improve bounty discovery ranking",
    reward: 400,
    tags: ["algorithm", "ranking"],
    difficulty: "Hard" as const,
    progress: 10,
    submitter: "carol_code",
  },
  {
    id: "bounty-4",
    title: "Dark mode toggle improvements",
    reward: 80,
    tags: ["ui", "accessibility"],
    difficulty: "Easy" as const,
    progress: 85,
  },
  {
    id: "bounty-5",
    title: "Real-time notification system",
    reward: 600,
    tags: ["backend", "websockets"],
    difficulty: "Hard" as const,
    progress: 20,
  },
  {
    id: "bounty-6",
    title: "Add keyboard shortcuts support",
    reward: 150,
    tags: ["ux", "a11y"],
    difficulty: "Medium" as const,
    progress: 0,
  },
];

export default function BountyCardPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          Bounty Card Component
        </h1>
        <p className="mt-1 text-slate-600 dark:text-slate-400">
          A reusable card with title, reward, tags, difficulty badge, and progress bar.
          Responsive — works on mobile and desktop.
        </p>
      </div>

      {/* Props table */}
      <section>
        <h2 className="text-lg font-semibold mb-3 text-slate-900 dark:text-slate-100">
          Props
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr>
                <th className="px-4 py-2 font-semibold text-slate-700 dark:text-slate-300">Prop</th>
                <th className="px-4 py-2 font-semibold text-slate-700 dark:text-slate-300">Type</th>
                <th className="px-4 py-2 font-semibold text-slate-700 dark:text-slate-300">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {[
                ["title", "string", "Main bounty title"],
                ["reward", "number", "Reward amount in USD"],
                ["tags", "string[]", "Category tags"],
                ["difficulty", '"Easy" | "Medium" | "Hard"', "Difficulty badge"],
                ["progress", "number", "Funding progress (0–100)"],
                ["href?", "string", "Optional — makes card a link"],
                ["onClick?", "() =&gt; void", "Optional click handler"],
                ["submitter?", "string", "Optional submitter name"],
              ].map(([prop, type, desc]) => (
                <tr key={prop} className="text-slate-700 dark:text-slate-300">
                  <td className="px-4 py-2 font-mono text-xs text-brand-600 dark:text-brand-400">{prop}</td>
                  <td className="px-4 py-2 font-mono text-xs text-slate-500">{type}</td>
                  <td className="px-4 py-2 text-slate-600 dark:text-slate-400">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Desktop grid — all variants */}
      <section>
        <h2 className="text-lg font-semibold mb-3 text-slate-900 dark:text-slate-100">
          Desktop — All Variants
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
          Cards displayed in a responsive 2-column grid.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {allBounties.map((bounty) => (
            <BountyCard key={bounty.id} {...bounty} />
          ))}
        </div>
      </section>

      {/* Mobile single-column */}
      <section>
        <h2 className="text-lg font-semibold mb-3 text-slate-900 dark:text-slate-100">
          Mobile — Single Column
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
          Narrow screens stack cards vertically.
        </p>
        <div className="max-w-sm space-y-3">
          {allBounties.slice(0, 3).map((bounty) => (
            <BountyCard key={`mobile-${bounty.id}`} {...bounty} />
          ))}
        </div>
      </section>

      {/* Clickable card variant */}
      <section>
        <h2 className="text-lg font-semibold mb-3 text-slate-900 dark:text-slate-100">
          Clickable Variant (with href)
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
          When <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">href</code> is provided,
          the card becomes a full link with hover lift effect.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {allBounties.slice(0, 2).map((bounty) => (
            <BountyCard key={`link-${bounty.id}`} {...bounty} href={`/bounty/${bounty.id}`} />
          ))}
        </div>
      </section>

      {/* Dark mode note */}
      <section className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-4">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          <strong className="text-slate-800 dark:text-slate-200">Dark mode</strong>{" "}
          is fully supported. Toggle your system/theme preference to see cards adapt automatically.
          All color variants (Easy/Medium/Hard) have dedicated dark-mode styles.
        </p>
      </section>
    </div>
  );
}
