# Accessibility Guidelines

MergeFund UI components are built with accessibility in mind. This document outlines the accessibility features and requirements for each component.

## General Principles

### WCAG 2.1 Compliance

All components target **WCAG 2.1 Level AA** compliance.

### Color Contrast

| Context | Minimum Ratio | Notes |
|---------|--------------|-------|
| Normal text | 4.5:1 | Text smaller than 18pt |
| Large text | 3:1 | Text 18pt+ or 14pt bold |
| UI components | 3:1 | Borders, icons, focus rings |

### Keyboard Navigation

All interactive components support:
- **Tab**: Move focus forward
- **Shift + Tab**: Move focus backward
- **Enter/Space**: Activate buttons and toggles
- **Escape**: Close dialogs and popovers
- **Arrow keys**: Navigate within composite widgets

### Focus Management

```css
/* All focusable elements have visible focus rings */
focus-visible:outline-none
focus-visible:ring-2
focus-visible:ring-ring
focus-visible:ring-offset-2
```

## Component-Specific Guidelines

### Button

| Feature | Implementation |
|---------|---------------|
| Role | Native `<button>` element |
| Disabled state | `disabled:pointer-events-none disabled:opacity-50` |
| Loading state | `aria-busy="true"` when loading |
| Icon-only | Must include `aria-label` or screen reader text |

```tsx
// Icon-only button
<Button size="icon" aria-label="Close menu">
  <X className="size-4" />
</Button>

// Loading button
<Button loading>Submitting...</Button>
// Renders with aria-busy="true"
```

### Input

| Feature | Implementation |
|---------|---------------|
| Labels | Use `<Label htmlFor="...">` component |
| Error state | `aria-invalid="true"` when error prop is true |
| Required | Add `aria-required="true"` for required fields |
| Descriptions | Use `aria-describedby` for help text |

```tsx
<div>
  <Label htmlFor="email">Email</Label>
  <Input
    id="email"
    error={!!errors.email}
    aria-describedby="email-error"
  />
  {errors.email && (
    <p id="email-error" className="text-sm text-destructive">
      {errors.email}
    </p>
  )}
</div>
```

### Links

| Feature | Implementation |
|---------|---------------|
| External links | Add `target="_blank"` with `rel="noopener noreferrer"` |
| Descriptive text | Avoid "click here" - use descriptive link text |
| Skip links | Provide "skip to content" for keyboard users |

```tsx
// Good - descriptive link text
<a href="/features">View all features</a>

// External link with proper attributes
<a href="https://github.com" target="_blank" rel="noopener noreferrer">
  View on GitHub
  <span className="sr-only">(opens in new tab)</span>
</a>
```

### Images

| Feature | Implementation |
|---------|---------------|
| Alt text | All images must have descriptive alt text |
| Decorative | Use `alt=""` and `aria-hidden="true"` |
| Complex images | Use `aria-describedby` for detailed descriptions |

```tsx
// Meaningful image
<img src="/hero.jpg" alt="Developer collaborating on open source project" />

// Decorative image
<img src="/pattern.svg" alt="" aria-hidden="true" />
```

## Testing Checklist

- [ ] All interactive elements are keyboard accessible
- [ ] Focus order is logical and visible
- [ ] Color contrast meets WCAG AA requirements
- [ ] Screen reader announcements are meaningful
- [ ] No content is lost when zoomed to 200%
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Touch targets are at least 44x44 pixels

## Screen Reader Support

Components should be tested with:
- VoiceOver (macOS/iOS)
- NVDA (Windows)
- JAWS (Windows)

## Motion Preferences

Components respect user's motion preferences:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Semantic HTML

Use semantic HTML elements for better accessibility:

```tsx
// Navigation
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/features">Features</a></li>
  </ul>
</nav>

// Main content
<main id="main-content">
  {/* Page content */}
</main>

// Footer
<footer>
  {/* Footer content */}
</footer>

// Sections with headings
<section aria-labelledby="features-heading">
  <h2 id="features-heading">Features</h2>
  {/* Section content */}
</section>
```

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/TR/WCAG21/)
- [MDN ARIA Authoring Practices](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)
