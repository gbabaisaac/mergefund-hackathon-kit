export type DiscoveryBounty = {
  id: string;
  title: string;
  reward: number;
  fundedPercent: number;
  tags: string[];
  claimedCount: number;
  postedDaysAgo: number;
};

export type DiscoveryScoreExplanation = {
  score: number;
  factors: {
    funding: number;
    reward: number;
    recency: number;
    competition: number;
    tagDiversity: number;
  };
};

export type RankedDiscoveryBounty<T extends DiscoveryBounty = DiscoveryBounty> = T &
  DiscoveryScoreExplanation;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function roundScore(value: number) {
  return Math.round(value * 10) / 10;
}

export function explainDiscoveryScore(bounty: DiscoveryBounty): DiscoveryScoreExplanation {
  const normalizedFunding = clamp(bounty.fundedPercent, 0, 100) / 100;
  const normalizedRecency = clamp(1 - bounty.postedDaysAgo / 30, 0, 1);
  const normalizedCompetition = clamp(1 - bounty.claimedCount / 8, 0, 1);
  const normalizedTagDiversity = clamp(bounty.tags.length / 4, 0, 1);

  const factors = {
    // Funding is weighted highest because funded work is more likely to pay out.
    funding: roundScore(normalizedFunding * 35),
    // Log scaling rewards larger bounties without letting one large reward dominate every result.
    reward: roundScore((Math.log10(Math.max(0, bounty.reward) + 1) / Math.log10(501)) * 25),
    // Recently posted work should surface while it is still actionable.
    recency: roundScore(normalizedRecency * 20),
    // Fewer existing claims are better for discovery because the user has less competition.
    competition: roundScore(normalizedCompetition * 15),
    // More tags give the marketplace more matching signals, but this remains a small boost.
    tagDiversity: roundScore(normalizedTagDiversity * 5),
  };

  return {
    factors,
    score: roundScore(
      factors.funding +
        factors.reward +
        factors.recency +
        factors.competition +
        factors.tagDiversity,
    ),
  };
}

export function rankDiscoveryBounties<T extends DiscoveryBounty>(
  bounties: T[],
): RankedDiscoveryBounty<T>[] {
  return bounties
    .map((bounty) => ({
      ...bounty,
      ...explainDiscoveryScore(bounty),
    }))
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));
}
