import { BountyCard } from "@/components/bounty-card";
import { mockBounties } from "@/data/mock-bounties";

export default function BountyCardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Bounty Card Component</h1>
        <p className="text-slate-600">
          Build and refine the bounty card UI component. Use the mock data below.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {mockBounties.map((bounty) => (
          <BountyCard key={bounty.id} {...bounty} />
        ))}
      </div>
    </div>
  );
}
