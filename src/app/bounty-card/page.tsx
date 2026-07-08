import { BountyCard } from "@/components/bounty-card";
import { mockBounties } from "@/data/mock-bounties";

export default function BountyCardPage() {
  return (
    <main className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      <header className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">Core track</p>
        <h1 className="text-2xl font-semibold text-slate-950 sm:text-3xl">
          Bounty Card Component
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
          A reusable responsive card for displaying bounty title, reward, tags, difficulty, and funding progress.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label="Available bounties">
        {mockBounties.map((bounty) => (
          <BountyCard key={bounty.id} {...bounty} />
        ))}
      </section>
    </main>
  );
}
