# Design System

Strictly enforced color palette and typographic rules for the website.

## Colors
- **Primary**: `#1E40AF`
- **Primary Hover**: `#2563EB`
- **Dark**: `#0F172A`
- **Surface**: `#F8FAFC`
- **LINE**: `#06C755`
- **Secondary**: `#059669`

## Typography
- Base font size: 14px (minimum for Chinese text).
- Important text/instructions: 16px.
- Fonts: `Noto Sans TC`, `Inter`, `system-ui`. (Fallback to browser defaults if web fonts fail to load).
- Monospace: `JetBrains Mono` or default monospace.

## Animations
- Professional, engineering feel (no bounce, spin, or extreme parallax).
- Hero sequence: staggered fade-in + slight upward movement (max 16px).
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)`.
- Cards hover: Transform Y up to -3px, shadow increase, border color shift.
- Must respect `@media (prefers-reduced-motion: reduce)`.
