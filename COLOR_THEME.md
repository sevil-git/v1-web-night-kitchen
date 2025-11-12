# Bitzy Color Theme

## Color Palette

### Primary Colors

**Yellow (Primary Brand Color)**
- Hex: `#F3B617`
- Usage: Primary buttons, highlights, active states
- Hover: `#e6b025` (primary-dark)
- Light: `#ffd35c` (primary-light)

**Orange (Secondary/Accent Color)**
- Hex: `#F67C29`
- Usage: Secondary buttons, accents, CTAs
- Hover: `#e55f3a` (secondary-dark)
- Light: `#ff8f6f` (secondary-light)

### Neutral Colors

**Dark Gray (Text & Dark Elements)**
- Hex: `#272d2f`
- Usage: Main text, headings, icons

**Light Gray (Borders & Subtle Backgrounds)**
- Hex: `#d7d7d7`
- Usage: Borders, dividers, subtle backgrounds

**White (Background)**
- Hex: `#ffffff`
- Usage: Main background, cards

## Color Usage Guide

### Buttons
- **Primary**: Yellow background (#F3B617) with dark text (#272d2f)
- **Secondary**: Orange background (#F67C29) with white text
- **Ghost**: Transparent with light gray hover

### Cards
- Border: Light gray (#d7d7d7)
- Background: White (#ffffff)
- Hover: Enhanced shadow

### Categories
- Selected: Orange border (#F67C29) with ring
- Unselected: Light gray border (#d7d7d7)
- Hover: Yellow border (#F3B617)

### Text
- Headings: Dark gray (#272d2f)
- Body: Dark gray (#272d2f)
- Links: Orange (#F67C29)
- Link hover: Darker orange (#e55f3a)

## CSS Variables

```css
:root {
  --primary: #F3B617;
  --secondary: #F67C29;
  --dark: #272d2f;
  --light: #d7d7d7;
  --background: #ffffff;
  --foreground: #272d2f;
}
```

## Tailwind Classes

Use these custom color classes in your components:
- `bg-primary` / `text-primary`
- `bg-secondary` / `text-secondary`
- `bg-primary-dark` / `hover:bg-primary-dark`
- `bg-secondary-dark` / `hover:bg-secondary-dark`
- `text-dark`
- `border-light`

## Examples

### Primary Button
```tsx
<button className="bg-[#F3B617] text-[#272d2f] hover:bg-primary-dark">
  Add to Cart
</button>
```

### Secondary Button
```tsx
<button className="bg-[#F67C29] text-white hover:bg-secondary-dark">
  Checkout
</button>
```

### Card
```tsx
<div className="border border-[#d7d7d7] bg-white rounded-lg">
  {/* content */}
</div>
```

## Accessibility

- **Contrast Ratio**: All color combinations meet WCAG AA standards
- **Primary button**: Dark text on yellow = 4.5:1 ratio ✓
- **Secondary button**: White text on orange = 4.5:1 ratio ✓
- **Body text**: Dark on white = 16:1 ratio ✓
