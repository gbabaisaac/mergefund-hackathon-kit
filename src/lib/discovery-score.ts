export type DiscoveryInput = {
  id: string;
  title: string;
  reward: number;
  fundedPercent: number;
  claimedCount: number;
  postedDaysAgo: number;
  tags: string[];
};

export type ScoreBreakdown = {
  reward: number;
  funding: number;
  availability: number;
  recency: number;
  total: number;
};

export type RankedDiscovery = DiscoveryInput & { score: ScoreBreakdown };

const MAX = {
  reward: 30,
  funding: 25,
  availability: 25,
  recency: 20,
} as const;

function clamp(value: number, max: number) {
  return Math.max(0, Math.min(max, value));
}

/**
 * Rank a bounty with a bounded 100-point score. The caps keep a single large
 * reward from drowning out funding health, open capacity, or freshness.
 * Every input is from the supplied mock data, so the result is deterministic
 * and easy to explain to a contributor.
 */
export function scoreBounty(bounty: DiscoveryInput): ScoreBreakdown {
  // Logarithmic reward points reduce the advantage of an unusually large prize.
  const reward = clamp(Math.log10(Math.max(1, bounty.reward)) * 10, MAX.reward);
  // Funding is directly proportional to the observed funded percentage.
  const funding = clamp(bounty.fundedPercent * (MAX.funding / 100), MAX.funding);
  // Fewer existing claims means a contributor has more realistic capacity.
  const availability = clamp(MAX.availability - bounty.claimedCount * 4, MAX.availability);
  // Newer listings get more points, with a floor for old but still-open work.
  const recency = clamp(MAX.recency - bounty.postedDaysAgo * 2, MAX.recency);
  const total = reward + funding + availability + recency;

  return { reward, funding, availability, recency, total };
}

export function rankBounties(bounties: DiscoveryInput[]): RankedDiscovery[] {
  return bounties
    .map((bounty) => ({ ...bounty, score: scoreBounty(bounty) }))
    .sort((a, b) => {
      if (b.score.total !== a.score.total) return b.score.total - a.score.total;
      if (b.reward !== a.reward) return b.reward - a.reward;
      if (a.claimedCount !== b.claimedCount) return a.claimedCount - b.claimedCount;
      return a.id.localeCompare(b.id);
    });
}

export const scoreMaximums = MAX;
