# Public API Explorer

The `/api-explorer` page is a production-oriented, frontend-only API workspace
built with the repository's existing Next.js, TypeScript, and Tailwind stack.
All data and responses are intentionally mocked.

## What is included

- Searchable endpoint catalog grouped by Bounties, Developers, and Funding
- Method-aware endpoint selection and a composed request URL
- Parameter, header, and JSON body views
- Redacted authentication values so secrets never leak into examples
- Simulated request loading and success states with status, timing, and size
- Scrollable formatted JSON responses
- Generated cURL, JavaScript, and Python snippets with copy feedback
- Responsive layouts for mobile, tablet, and desktop
- Keyboard focus states, semantic labels, disabled states, and status affordances

## Design decisions

- The dark workspace reduces glare around dense code and response panels, while
  cyan, violet, and green consistently distinguish paths, actions, and success.
- Endpoint definitions live in `src/data/mock-api-endpoints.ts`, separate from
  rendering, so replacing the fixture with an OpenAPI adapter would not require
  rebuilding the interface.
- The explorer labels itself **Mock mode** and does not pretend to call a live
  service. The short loading state demonstrates request feedback without adding
  a backend or exposing credentials.

## Tradeoffs and next steps

- Parameter inputs demonstrate editing but do not mutate the fixture-backed URL.
  A production version would store per-endpoint request drafts and validate them
  against an OpenAPI schema.
- Syntax highlighting is deliberately dependency-free to preserve the starter
  kit's small dependency surface. A larger docs product could lazy-load a code
  highlighter.
- The environment switch is visual in mock mode. Real environments should be
  server-configured and protected by authenticated, scoped API keys.
