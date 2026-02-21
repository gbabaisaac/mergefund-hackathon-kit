# Bug Fix Bounties (Beginner-Friendly)

Pick one and implement a fix with a short write-up.

## 1) State Sync Bug
**Issue:** Filter resets on refresh.

**Fix ideas:**
- Persist filter to URL query string or localStorage.

**Acceptance:**
- Refresh keeps state.

## 2) Double Submission Bug
**Issue:** Submit button allows multiple clicks.

**Fix ideas:**
- Disable button during submit.

**Acceptance:**
- No duplicate submit.

## 3) Sorting Logic Bug
**Issue:** Leaderboard sorting fails when values match.

**Fix ideas:**
- Use stable sorting with secondary key.

**Acceptance:**
- Deterministic ordering.

## 4) Responsive Layout Bug
**Issue:** Stats overflow on small screens.

**Fix ideas:**
- Adjust grid/flex and text scaling.

**Acceptance:**
- No overflow at 320px width.

## 5) Incorrect Progress Calculation
**Issue:** Progress bar shows >100%.

**Fix ideas:**
- Clamp values and handle zero division.

**Acceptance:**
- Always 0–100%.

## 6) Dark Mode Inconsistency
**Issue:** Components ignore theme styles.

**Fix ideas:**
- Ensure classNames or variables apply.

**Acceptance:**
- Consistent theme across components.

## 7) Form Validation Bug
**Issue:** Negative numbers or empty titles allowed.

**Fix ideas:**
- Input validation with error states.

**Acceptance:**
- Invalid input shows error and blocks submit.
