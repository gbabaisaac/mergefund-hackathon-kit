# Public API Explorer

The `/api-explorer` route is a self-contained example of a developer-facing
API explorer. It intentionally uses local mock data so the page is safe to
open during a demo and never needs a credential or network request.

## What is included

- Three representative endpoints with method, path, auth, and field metadata.
- A responsive endpoint navigator that works on narrow screens.
- Request builder with environment and query-parameter controls.
- Response metadata, copyable JSON, and a bounded response panel.
- Keyboard-friendly buttons, labels, focus rings, and dark-mode styles.

## Validation

```bash
npm run build
```

Open `/api-explorer` after starting the app to exercise endpoint selection,
query editing, and the response preview.
