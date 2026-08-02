# Discovery algorithm

The `/discovery` page ranks the supplied mock bounties with a deterministic
100-point score. The breakdown is visible beside every card so a contributor
can understand why an item appears where it does.

| Factor | Ceiling | Behavior |
| --- | ---: | --- |
| Reward | 30 | logarithmic reward points, capped at 30 |
| Funding | 25 | proportional to the funded percentage |
| Availability | 25 | starts at 25 and decreases as claims accumulate |
| Recency | 20 | starts at 20 and decreases two points per day |

Ties are deterministic: higher reward wins first, then fewer claims, then the
bounty id. The implementation uses only `src/data/mock-discovery.ts`; it makes
no network requests and has no user or wallet data.

## Verification

- `npm run build`
- `git diff --check`
- `/discovery` rendered locally with visible rank, total score, factor bars,
  reward, funding, and claim counts.

Preview: `screenshot/discovery-algorithm.svg`.
