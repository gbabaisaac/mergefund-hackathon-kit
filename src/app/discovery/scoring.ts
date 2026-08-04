import { mockDiscovery } from "@/data/mock-discovery";

export type DiscoveryBounty = (typeof mockDiscovery)[number];
export type RankingPreset = "balanced" | "highValue" | "quickWin";

export type ScoreBreakdown = {
  payout: number;
  funding: number;
  competition: number;
  freshness: number;
};

export type RankedBounty = DiscoveryBounty & {
  rank: number;
  score: number;
  breakdown: ScoreBreakdown;
  explanation: string;
};

export const rankingPresets: Record<
  RankingPreset,
  { label: string; description: string; weights: ScoreBreakdown }
> = {
  balanced: {
    label: "Best overall",
    description: "Balances payout quality with confidence and win probability.",
    weights: { payout: 30, funding: 30, competition: 25, freshness: 15 },
  },
  highValue: {
    label: "Highest upside",
    description: "Prioritizes larger rewards while still checking funding risk.",
    weights: { payout: 45, funding: 30, competition: 15, freshness: 10 },
  },
  quickWin: {
    label: "Quick wins",
    description: "Favors less crowded, recently posted opportunities.",
    weights: { payout: 20, funding: 30, competition: 35, freshness: 15 },
  },
};

const round = (value: number, precision = 1) =>
  Number(value.toFixed(precision));

/**
 * Scores a bounty from 0-100 using four independently visible signals.
 *
 * - Payout uses logarithmic normalization so one unusually large reward cannot
 *   overwhelm every other signal in a small marketplace.
 * - Funding is linear because funded money is a direct confidence signal.
 * - Competition follows a diminishing 1 / (1 + claims) curve: the first few
 *   competing claims matter most, while a crowded bounty never reaches zero.
 * - Freshness decays smoothly over 14 days instead of falling off a hard cliff.
 *
 * Each preset only changes weights. The inputs and formulas stay deterministic,
 * so the same dataset and preset always produce the same ordered result.
 */
export function scoreBounty(
  bounty: DiscoveryBounty,
  maxReward: number,
  preset: RankingPreset,
) {
  const weights = rankingPresets[preset].weights;
  const normalizedPayout =
    maxReward > 0 ? Math.log1p(bounty.reward) / Math.log1p(maxReward) : 0;
  const fundedConfidence = Math.min(1, Math.max(0, bounty.fundedPercent / 100));
  const winProbability = 1 / (1 + bounty.claimedCount * 0.45);
  const freshness = Math.exp(-Math.max(0, bounty.postedDaysAgo) / 14);

  const breakdown: ScoreBreakdown = {
    payout: round(normalizedPayout * weights.payout),
    funding: round(fundedConfidence * weights.funding),
    competition: round(winProbability * weights.competition),
    freshness: round(freshness * weights.freshness),
  };

  const score = round(
    breakdown.payout +
      breakdown.funding +
      breakdown.competition +
      breakdown.freshness,
  );

  const strongestSignal = (
    Object.entries(breakdown) as [keyof ScoreBreakdown, number][]
  ).sort((a, b) => b[1] - a[1])[0][0];

  const explanationBySignal: Record<keyof ScoreBreakdown, string> = {
    payout: `$${bounty.reward} creates strong upside without dominating the ranking.`,
    funding: `${bounty.fundedPercent}% funding makes payout confidence its strongest signal.`,
    competition: `${bounty.claimedCount} existing ${bounty.claimedCount === 1 ? "claim" : "claims"} leaves a credible path to win.`,
    freshness: `Posted ${bounty.postedDaysAgo}d ago, so the opportunity is still fresh.`,
  };

  return {
    score,
    breakdown,
    explanation: explanationBySignal[strongestSignal],
  };
}

export function rankBounties(
  bounties: readonly DiscoveryBounty[],
  preset: RankingPreset,
): RankedBounty[] {
  const maxReward = Math.max(0, ...bounties.map((bounty) => bounty.reward));

  return bounties
    .map((bounty) => ({
      ...bounty,
      ...scoreBounty(bounty, maxReward, preset),
    }))
    .sort(
      (a, b) =>
        b.score - a.score ||
        b.fundedPercent - a.fundedPercent ||
        a.postedDaysAgo - b.postedDaysAgo ||
        a.id.localeCompare(b.id),
    )
    .map((bounty, index) => ({ ...bounty, rank: index + 1 }));
}
