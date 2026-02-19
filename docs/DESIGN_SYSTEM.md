# MergeFund Design System

This document provides the complete design system reference for the MergeFund landing page hackathon.

## Brand Identity

### Primary Color - MergeFund Purple

```
HSL: 262, 83%, 58%
HEX: #7C3AED
RGB: 124, 58, 237
```

This is the signature MergeFund purple. Use it for:
- Primary buttons and CTAs
- Links and interactive elements
- Accent highlights
- Gradient overlays

### Color Palette

| Token | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| `--background` | `0 0% 100%` (white) | `0 0% 4%` (near black) | Page background |
| `--foreground` | `0 0% 9%` (dark gray) | `0 0% 98%` (near white) | Primary text |
| `--muted` | `0 0% 96%` | `0 0% 14%` | Subtle backgrounds |
| `--muted-foreground` | `0 0% 45%` | `0 0% 64%` | Secondary text |
| `--border` | `0 0% 90%` | `0 0% 100% / 0.08` | Borders, dividers |
| `--card` | `0 0% 100%` | `0 0% 7%` | Card backgrounds |
| `--ring` | `262 83% 58%` | `262 83% 58%` | Focus rings |

## Typography

### Font Stack

```css
--font-sans: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
--font-mono: ui-monospace, "SF Mono", Monaco, "Cascadia Code", monospace;
```

### Type Scale

| Class | Size | Weight | Usage |
|-------|------|--------|-------|
| Hero title | 4rem-6rem | Bold (700) | Main hero headline |
| Section title | 2.5rem-3rem | Semibold (600) | Section headers |
| Card title | 1.25rem | Medium (500) | Card/feature titles |
| Body large | 1.125rem | Regular (400) | Intro text, leads |
| Body | 1rem | Regular (400) | Standard text |
| Small | 0.875rem | Regular (400) | Captions, metadata |

### Text Colors

```css
/* Primary text */
.text-foreground { color: hsl(var(--foreground)); }

/* Secondary/muted text */
.text-muted-foreground { color: hsl(var(--muted-foreground)); }

/* Primary brand color */
.text-primary { color: hsl(262, 83%, 58%); }
```

## Spacing

Use Tailwind's spacing scale consistently:

| Token | Value | Usage |
|-------|-------|-------|
| `4` | 1rem (16px) | Base unit, small gaps |
| `6` | 1.5rem (24px) | Component padding |
| `8` | 2rem (32px) | Section gaps |
| `12` | 3rem (48px) | Medium sections |
| `20` | 5rem (80px) | Section padding |
| `32` | 8rem (128px) | Large section padding |

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `rounded-lg` | 0.5rem (8px) | Standard components |
| `rounded-xl` | 0.75rem (12px) | Cards, modals |
| `rounded-2xl` | 1rem (16px) | Large cards |
| `rounded-full` | 9999px | Pills, avatars, buttons |

## Shadows

```css
/* Subtle shadow for cards */
.shadow-sm { box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05); }

/* Standard shadow */
.shadow { box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1); }

/* Elevated shadow */
.shadow-lg { box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1); }
```

## Components

### Buttons

Primary button (CTA):
```tsx
<button className="btn-primary">
  Get Started
</button>
```

Secondary button:
```tsx
<button className="btn-secondary">
  Learn More
</button>
```

### Cards

```tsx
<div className="card">
  <h3 className="text-lg font-medium">Card Title</h3>
  <p className="text-muted-foreground">Card content...</p>
</div>
```

### Sections

```tsx
<section className="section container-custom">
  {/* Section content */}
</section>
```

## Gradients

### Text Gradient

```css
.gradient-text {
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  background-image: linear-gradient(to right, hsl(262, 83%, 58%), hsl(280, 70%, 70%));
}
```

### Background Gradient

```css
.gradient-bg {
  background: linear-gradient(
    135deg,
    hsl(262, 83%, 58%) 0%,
    hsl(280, 70%, 50%) 100%
  );
}
```

## Animations

### Fade In

```css
.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Slide Up

```css
.animate-slide-up {
  animation: slideUp 0.5s ease-out forwards;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

## Background Patterns

### Dot Grid

```css
.dot-grid {
  background-image: radial-gradient(
    circle,
    hsl(var(--foreground) / 0.06) 1px,
    transparent 1px
  );
  background-size: 24px 24px;
}
```

## Dark Mode

The design system supports dark mode via the `dark` class on the `<html>` element.

```tsx
// Toggle dark mode
document.documentElement.classList.toggle('dark');
```

All color tokens automatically adjust in dark mode.

## Accessibility

- All color combinations meet WCAG 2.1 AA contrast requirements
- Focus states use visible focus rings (`focus:ring-2 focus:ring-ring`)
- Interactive elements have hover and focus states
- Respect `prefers-reduced-motion` for animations

## Responsive Breakpoints

| Breakpoint | Min Width | Usage |
|------------|-----------|-------|
| `sm` | 640px | Mobile landscape |
| `md` | 768px | Tablets |
| `lg` | 1024px | Laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Large screens |

## Layout Guidelines

### Max Width

- Container: `max-w-6xl` (72rem / 1152px)
- Narrow content: `max-w-2xl` (42rem / 672px)
- Wide content: `max-w-7xl` (80rem / 1280px)

### Section Structure

```tsx
<section className="py-20 md:py-32">
  <div className="max-w-6xl mx-auto px-4 sm:px-6">
    {/* Content */}
  </div>
</section>
```

## Best Practices

1. **Consistency**: Use design tokens instead of arbitrary values
2. **Hierarchy**: Establish clear visual hierarchy with type scale
3. **Whitespace**: Generous spacing improves readability
4. **Contrast**: Ensure text is readable on all backgrounds
5. **Responsiveness**: Design mobile-first, enhance for larger screens
6. **Performance**: Optimize images, minimize animations on mobile
