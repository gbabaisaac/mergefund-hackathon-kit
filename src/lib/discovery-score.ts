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

function clamp(value: number, max: number) {
  return Math.max(0, Math.min(max, value));
}

/**
 * Keep the ranking explainable: each factor has a visible ceiling, so a very
 * large reward cannot drown out funding health or a realistic opportunity.
 * The weights total 100 points and every value is derived from mock data.
 */
export function scoreBounty(bounty: DiscoveryInput): ScoreBreakdown {
  const reward = clamp(Math.log10(Math.max(1, bounty.reward)) * 10, 30);
  const funding = clamp(bounty.fundedPercent * 0.25, 25);
  const availability = clamp(20 - bounty.claimedCount * 3, 20);
  const recency = clamp(15 - bounty.postedDaysAgo * 2, 15);
  const total = reward + funding + availability + recency;

  return { reward, funding, availability, recency, total };
}

export function rankBounties(bounties: DiscoveryInput[]): RankedDiscovery[] {
  return bounties
    .map((bounty) => ({ ...bounty, score: scoreBounty(bounty) }))
    .sort((a, b) => {
      if (b.score.total !== a.score.total) return b.score.total - a.score.total;
      if (b.reward !== a.reward) return b.reward - a.reward;
      return a.id.localeCompare(b.id);
    });
}
