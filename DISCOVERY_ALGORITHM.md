# Explainable bounty discovery

The `/discovery` page ranks every item in `mockDiscovery` on a deterministic
0–100 scale. It is designed to answer two questions at once:

1. Is this opportunity valuable?
2. Is it realistically worth attempting now?

## Signals

| Signal | Why it matters | Normalization |
| --- | --- | --- |
| Payout | Measures financial upside | `log1p(reward) / log1p(maxReward)` prevents an outlier from dominating |
| Funding | Estimates payout confidence | Funded percentage, clamped to 0–100% |
| Competition | Estimates room to win | `1 / (1 + claims × 0.45)` with diminishing impact |
| Freshness | Rewards timely opportunities | Exponential decay over 14 days |

The UI exposes the contribution of every signal. Users can switch among three
weight presets without changing the underlying formulas:

- **Best overall:** 30% payout, 30% funding, 25% competition, 15% freshness
- **Highest upside:** 45% payout, 30% funding, 15% competition, 10% freshness
- **Quick wins:** 20% payout, 30% funding, 35% competition, 15% freshness

Stable tie-breakers use funding, recency, then ID, so identical inputs always
produce identical output. The implementation is isolated in
`src/app/discovery/scoring.ts` to keep it testable and reusable.

## Tradeoffs

- A marketplace with user profiles could add skill/tag affinity as a fifth
  signal. It is intentionally omitted because the provided mock data contains
  no user profile; inventing one would make the result misleading.
- Claims are treated as competition rather than popularity. This is useful for
  a solver deciding what to work on, but a sponsor-facing feed might choose the
  opposite behavior.
- Reward normalization is relative to the current result set. For pagination at
  scale, the backend should supply a stable marketplace percentile instead.
