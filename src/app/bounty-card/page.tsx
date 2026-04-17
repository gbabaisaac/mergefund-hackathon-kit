import { BountyCard } from "@/components/bounty-card";
import { mockBounties } from "@/data/mock-bounties";

export default function BountyCardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Bounty Card Component</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          A reusable card component that displays bounty details with title, reward, tags, difficulty badge, and progress bar.
          Responsive layout with Tailwind styling and hover effects.
        </p>
      </div>

      <section>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">Mock Bounties</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mockBounties.map((bounty) => (
            <BountyCard key={bounty.id} {...bounty} onClick={() => alert(`Clicked: ${bounty.title}`)} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">Difficulty Variants</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <BountyCard
            title="Simple typo fix in docs"
            reward={50}
            tags={["docs", "quick-win"]}
            difficulty="Easy"
            progress={80}
          />
          <BountyCard
            title="Add dark mode toggle animation"
            reward={200}
            tags={["ui", "animation", "dark-mode"]}
            difficulty="Medium"
            progress={45}
          />
          <BountyCard
            title="Implement WebSocket real-time updates"
            reward={500}
            tags={["backend", "websocket", "real-time"]}
            difficulty="Hard"
            progress={15}
          />
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">Progress States</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <BountyCard
            title="Not started"
            reward={100}
            tags={["new"]}
            difficulty="Easy"
            progress={0}
          />
          <BountyCard
            title="In progress"
            reward={150}
            tags={["wip"]}
            difficulty="Medium"
            progress={50}
          />
          <BountyCard
            title="Almost done"
            reward={200}
            tags={["review"]}
            difficulty="Medium"
            progress={90}
          />
          <BountyCard
            title="Completed"
            reward={300}
            tags={["done"]}
            difficulty="Hard"
            progress={100}
          />
        </div>
      </section>
    </div>
  );
}
