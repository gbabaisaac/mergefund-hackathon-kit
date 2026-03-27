/**
 * Discovery Algorithm - Bounty Ranking System
 * 
 * This module implements a scoring algorithm to rank bounties by relevance.
 * The score is a weighted combination of multiple factors:
 * 
 * 1. Funding Progress (0-30 points) - Higher funding = higher priority
 * 2. Activity Level (0-25 points) - More claims = more validated
 * 3. Recency (0-20 points) - Fresh bounties get priority
 * 4. Reward Amount (0-25 points) - Higher rewards attract contributors
 * 
 * Total max score: 100 points
 */

export interface Bounty {
  id: string;
  title: string;
  reward: number;
  fundedPercent: number;
  tags: string[];
  claimedCount: number;
  postedDaysAgo: number;
}

export interface ScoredBounty extends Bounty {
  score: number;
  scoreBreakdown: {
    funding: number;
    activity: number;
    recency: number;
    reward: number;
  };
}

/**
 * Calculate funding score (0-30 points)
 * 
 * Logic: Uses a piecewise function to reward well-funded bounties
 * - 80-100% funded: Full points (25-30) - nearly complete, high confidence
 * - 50-80% funded: Medium points (15-25) - good momentum
 * - 20-50% funded: Low-medium points (8-15) - building momentum
 * - 0-20% funded: Low points (0-8) - just started
 */
function calculateFundingScore(fundedPercent: number): number {
  if (fundedPercent >= 80) {
    // Exponential bonus for near-complete funding
    return 25 + ((fundedPercent - 80) / 20) * 5;
  } else if (fundedPercent >= 50) {
    // Linear scaling in the middle range
    return 15 + ((fundedPercent - 50) / 30) * 10;
  } else if (fundedPercent >= 20) {
    // Gradual increase for building momentum
    return 8 + ((fundedPercent - 20) / 30) * 7;
  } else {
    // Low points for just-started bounties
    return (fundedPercent / 20) * 8;
  }
}

/**
 * Calculate activity score (0-25 points)
 * 
 * Logic: More claims indicates a validated, valuable bounty
 * Uses diminishing returns to prevent claim spam from dominating
 * - 5+ claims: Max points (25) - highly validated
 * - 3-4 claims: High points (18-22) - well validated
 * - 1-2 claims: Medium points (8-15) - some validation
 * - 0 claims: 0 points - unvalidated
 */
function calculateActivityScore(claimedCount: number): number {
  if (claimedCount >= 5) {
    return 25;
  } else if (claimedCount >= 4) {
    return 22;
  } else if (claimedCount >= 3) {
    return 18;
  } else if (claimedCount >= 2) {
    return 15;
  } else if (claimedCount >= 1) {
    return 8;
  }
  return 0;
}

/**
 * Calculate recency score (0-20 points)
 * 
 * Logic: Exponential decay from posting date
 * Fresh bounties get priority to ensure new opportunities surface
 * - 0-2 days: High priority (18-20 points)
 * - 3-7 days: Medium-high priority (10-18 points)
 * - 8-14 days: Medium priority (4-10 points)
 * - 15+ days: Low priority (0-4 points)
 */
function calculateRecencyScore(postedDaysAgo: number): number {
  if (postedDaysAgo <= 2) {
    return 20 - postedDaysAgo;
  } else if (postedDaysAgo <= 7) {
    // Exponential decay: 18 -> 10 over 5 days
    return 18 * Math.exp(-0.12 * (postedDaysAgo - 2));
  } else if (postedDaysAgo <= 14) {
    // Continued decay but slower
    return 10 * Math.exp(-0.08 * (postedDaysAgo - 7));
  } else {
    // Very old bounties get minimal points
    return Math.max(0, 4 - (postedDaysAgo - 14) * 0.5);
  }
}

/**
 * Calculate reward score (0-25 points)
 * 
 * Logic: Normalize reward amounts to a 0-25 scale
 * Uses logarithmic scaling to prevent high rewards from dominating
 * - $500+: Max points (25)
 * - $200-500: High points (18-25)
 * - $100-200: Medium points (12-18)
 * - $0-100: Low points (0-12)
 */
function calculateRewardScore(reward: number): number {
  // Logarithmic scaling to compress the range
  // Using natural log with base conversion: log10(x) = ln(x) / ln(10)
  // log10(1000) ≈ 3, so we get a nice 0-25 range
  const log10 = Math.log(reward + 1) / Math.log(10);
  const normalizedScore = log10 / 3 * 25;
  return Math.min(25, normalizedScore);
}

/**
 * Main scoring function - calculates total score for a bounty
 * 
 * @param bounty - The bounty to score
 * @returns ScoredBounty with total score and breakdown
 */
export function scoreBounty(bounty: Bounty): ScoredBounty {
  const funding = calculateFundingScore(bounty.fundedPercent);
  const activity = calculateActivityScore(bounty.claimedCount);
  const recency = calculateRecencyScore(bounty.postedDaysAgo);
  const reward = calculateRewardScore(bounty.reward);
  
  const score = funding + activity + recency + reward;
  
  return {
    ...bounty,
    score: Math.round(score * 10) / 10, // Round to 1 decimal place
    scoreBreakdown: {
      funding: Math.round(funding * 10) / 10,
      activity: Math.round(activity * 10) / 10,
      recency: Math.round(recency * 10) / 10,
      reward: Math.round(reward * 10) / 10,
    },
  };
}

/**
 * Rank an array of bounties by score (descending)
 * 
 * @param bounties - Array of bounties to rank
 * @returns Array of scored and sorted bounties
 */
export function rankBounties(bounties: Bounty[]): ScoredBounty[] {
  return bounties
    .map(scoreBounty)
    .sort((a, b) => b.score - a.score);
}

/**
 * Get top N bounties by score
 */
export function getTopBounties(bounties: Bounty[], n: number): ScoredBounty[] {
  return rankBounties(bounties).slice(0, n);
}

/**
 * Filter bounties by minimum score threshold
 */
export function filterByMinScore(bounties: Bounty[], minScore: number): ScoredBounty[] {
  return rankBounties(bounties).filter(b => b.score >= minScore);
}
