---
name: design-system
description: The site's design tokens (colours, fonts, type scale, spacing, radii, breakpoints) as tickets define them, and the rules every visual change must follow. Use when writing or reviewing any CSS or markup.
---

# Design system

The rebuild starts blank. Tokens are added by tickets: when a ticket introduces a colour, font, size, spacing step, radius or breakpoint, the designer adds it to `:root` in `src/style.css` **and** records it in the tables below in the same change. Reuse a recorded token before inventing a new one.

The old site's look (ivory, burgundy, Cormorant) is **not** this site's design system. Use it only when a ticket or a "ref:" in a sketch points to it.

## Colour tokens
| Token | Value | Use | Contrast on page background |
|---|---|---|---|
| — | `#fff` | page background (placeholder) | — |
| — | `#111` | text (placeholder) | 18.9:1 |

## Type
| Role | Family | Details |
|---|---|---|
| Everything (placeholder) | `system-ui, sans-serif` | line-height 1.5 |

Fonts load in `index.html` (`<link>` to Google Fonts or self-hosted files). Record each family, weight and the sizes in use here.

## Spacing, radii, breakpoints
- Spacing: none defined yet (the page uses `2rem 1rem` padding).
- Radii: none defined yet.
- Breakpoints: none yet. Write them as `max-width` media queries in rem, record them here, and check every change at 1440, 1024, 768 and 390.

## Assets
Photos and artwork in `images/` and the resume PDF are free to use (see CLAUDE.md for the list). Import them in JSX so Vite bundles them, give every meaningful image real `alt` text, and set `width`/`height` or `aspect-ratio` so the layout doesn't jump.

## Rules for all work
1. **Real elements.** Navigation is `<a href>`, actions are `<button type="button">`. No clickable `<div>`/`<span>`. Use landmarks (`header`, `nav`, `main`, `footer`, `section` with a heading).
2. **44px touch targets.** Every interactive element is at least 44×44 CSS px at 768 and 390. Padding or a pseudo-element hit area is fine.
3. **4.5:1 text contrast** (3:1 for text ≥ 24px, or ≥ 18.7px bold). Record measured contrast in the colour table.
4. **No gradient washes** (no soft colour-to-colour background fades). Gradients are only allowed as texture: dots, ruled lines, hard-edged strips.
5. **No soft grey shadows.** No blurred grey `box-shadow`s. Get depth from colour, borders, overlap or hard offset shadows.
6. **Visible focus** on everything focusable (`:focus-visible`). Never remove an outline without replacing it.
7. **Tokens only.** No new hex values, font sizes or breakpoints without a `:root` token and a row in this file.
8. **Logical properties** (`margin-inline`, `inset-inline-start`) where direction matters, so a future RTL locale is easy.
9. **Leave animation to the motion-engineer.** If something will move, give it a class or `data-` hook and a static end state.
