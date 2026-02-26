# Bug Fixes for Issues #6, #8, #12

## Bug #6: State Sync Bug - Filter resets on refresh

**Root Cause:**
The filter state was stored only in React component state (`useState`), which is lost when the page refreshes. No persistence mechanism was in place.

**Fix:**
- Implemented URL query parameter persistence using `URLSearchParams`
- On mount, read `difficulty` and `minReward` from URL params
- On filter change, update both component state and URL using `window.history.replaceState()`
- This ensures filters persist across page refreshes and are shareable via URL

**Files Changed:**
- `src/components/bounty-filter.tsx`

---

## Bug #8: Sorting Logic Bug - Leaderboard sorting fails when values match

**Root Cause:**
The sort function only compared `earned` values: `(a, b) => b.earned - a.earned`. When two users had identical earnings, JavaScript's sort algorithm produced inconsistent ordering across refreshes (unstable sort).

**Fix:**
- Added secondary sort key using `name.localeCompare()` for deterministic ordering
- Implemented proper rank calculation that assigns the same rank to users with identical earnings
- Users with tied earnings now consistently appear in alphabetical order by name

**Files Changed:**
- `src/components/leaderboard.tsx`

---

## Bug #12: Form Validation Bug - Negative numbers or empty titles allowed

**Root Cause:**
The form had basic HTML5 validation (`required`, `min="1"`), but no client-side error state display. Users could submit invalid data or see confusing browser-default validation messages.

**Fix:**
- Added `errors` state object to track validation errors for each field
- Implemented `validateForm()` function that checks:
  - Title is not empty or whitespace-only
  - Reward is a valid positive number
- Display error messages below invalid fields with red border styling
- Clear errors dynamically as user corrects input
- Block form submission until all validation passes

**Files Changed:**
- `src/components/create-bounty-form.tsx`

---

## Testing
All three bugs have been fixed and tested:
1. Filter state now persists in URL - refresh maintains selected filters
2. Leaderboard sorting is stable - tied users have consistent order and same rank
3. Form validation shows clear error messages and blocks invalid submissions
