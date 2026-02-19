# Icon Guidelines

MergeFund uses [Lucide React](https://lucide.dev/) as the recommended icon library for consistency.

## Installation

If you want to use Lucide icons:

```bash
npm install lucide-react
```

## Basic Usage

```tsx
import { Home, Settings, User } from "lucide-react";

<Home className="size-4" />
```

## Sizing

Use Tailwind's `size-*` classes for consistent sizing:

| Context | Class | Pixels | Example |
|---------|-------|--------|---------|
| Small buttons | `size-3` | 12px | Icon-only compact buttons |
| Inline text | `size-4` | 16px | Default size, inline with text |
| Large buttons | `size-5` | 20px | Prominent actions |
| Standalone | `size-6` | 24px | Feature icons, empty states |

```tsx
// Inline with text
<button className="btn-primary">
  <Home className="size-4" />
  Home
</button>

// Large standalone
<div className="text-muted-foreground">
  <Inbox className="size-6" />
  <p>No messages</p>
</div>
```

## Accessibility

### Decorative Icons

Icons that are purely decorative should be hidden from screen readers:

```tsx
<button className="btn-primary">
  <Plus className="size-4" aria-hidden="true" />
  Add Item
</button>
```

### Meaningful Icons

Icon-only buttons MUST have accessible labels:

```tsx
// Option 1: aria-label on button
<button className="btn-primary" aria-label="Close dialog">
  <X className="size-4" />
</button>

// Option 2: Screen reader text
<button className="btn-primary">
  <X className="size-4" aria-hidden="true" />
  <span className="sr-only">Close dialog</span>
</button>
```

## Color

Icons inherit text color by default. Use semantic colors for meaning:

```tsx
// Default - inherits parent color
<Info className="size-4" />

// Primary purple
<Star className="size-4 text-primary" />

// Muted
<HelpCircle className="size-4 text-muted-foreground" />
```

## Common Icons

### Navigation

| Icon | Usage |
|------|-------|
| `Home` | Home/Dashboard |
| `ArrowLeft` | Back navigation |
| `ArrowRight` | Forward/Next |
| `Menu` | Mobile menu toggle |
| `X` | Close/dismiss |

### Actions

| Icon | Usage |
|------|-------|
| `Plus` | Add/Create |
| `Pencil` | Edit |
| `Trash2` | Delete |
| `Copy` | Copy to clipboard |
| `Download` | Download file |
| `ExternalLink` | Open in new tab |

### Status

| Icon | Usage |
|------|-------|
| `Check` | Success/Complete |
| `X` | Error/Failed |
| `AlertCircle` | Warning |
| `Info` | Information |
| `Loader2` | Loading (animate with `animate-spin`) |

### Social/Brand

| Icon | Usage |
|------|-------|
| `Github` | GitHub link |
| `Twitter` | Twitter/X link |
| `Linkedin` | LinkedIn link |

## Loading Spinner

Use `Loader2` with animation for loading states:

```tsx
import { Loader2 } from "lucide-react";

<Loader2 className="size-4 animate-spin" />
```

## Do's and Don'ts

### Do

- Use consistent sizing within the same context
- Add `aria-hidden="true"` to decorative icons
- Keep icons aligned with text baseline
- Use Lucide for consistency

### Don't

- Mix different icon libraries in the same project
- Use icons without labels for interactive elements
- Scale icons disproportionately
- Use overly complex custom icons

## Icon Search

Browse all available icons at [lucide.dev/icons](https://lucide.dev/icons).

## Alternative: Heroicons

If you prefer, you can also use [Heroicons](https://heroicons.com/):

```bash
npm install @heroicons/react
```

```tsx
import { HomeIcon } from "@heroicons/react/24/outline";
// or
import { HomeIcon } from "@heroicons/react/24/solid";
```

Just be consistent - pick one icon library and stick with it.
