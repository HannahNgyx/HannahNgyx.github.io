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
| `--color-bg` | `#fff` | page background | — |
| `--color-text` | `#111` | text, borders, focus ring, fill of the solid button | 18.9:1 on `--color-bg` |
| `--color-on-ink` | `#fff` | text on a `--color-text` fill (solid button) | 18.9:1 on `#111` |

## Type
| Role | Family | Details |
|---|---|---|
| Body (`--font-body`) | `"Be Vietnam Pro", system-ui, sans-serif` | Google Fonts, weights 400 and 600 only, `display=swap`, preconnect in `index.html`. Everything except the h1. Line-height 1.5; buttons use weight 600. Metrics: ascent 1.0, descent 0.265, cap 0.74 em. |
| Display (`--font-display`) | `"Fraunces", Georgia, serif` | Google Fonts, `opsz` axis 9–144 and weight 400 only (no SOFT/WONK), `display=swap`. h1 only, optical size automatic (the big H reaches opsz 144). Line-height 1.1, no extra tracking. Metrics: ascent 0.978, descent 0.255, cap 0.700 em (`--cap-display`). |

| Size token | Value | Approx. at 1440 / 1024 / 768 / 390 | Use |
|---|---|---|---|
| `--fs-display` | `clamp(2.5rem, 1.5rem + 3.5vw, 5rem)` | 74 / 60 / 51 / 40px | hero h1 |
| `--fs-initial` | `calc(var(--initial-span) / var(--cap-display))` | 230 / 202 / 185px / not used | the big H (desktop `::first-letter` of the hero h1) |
| `--fs-lead` | `clamp(1.125rem, 1rem + 0.4vw, 1.375rem)` | 22 / 20 / 19 / 18px | hero subtitle |
| `--fs-body` | `1rem` | 16px | body, buttons |
| `--fs-hint` | `0.6875rem` | 11px | "Hover to / see me" on the figure's lower torso (aria-hidden). 11px keeps at least 2.7px between the text and the dots at 768; 12px touches them. |

| Derived token | Value | Approx. at 1440 / 1024 / 768 | Use |
|---|---|---|---|
| `--cap-display` | `0.7` | – | Fraunces cap height per em |
| `--initial-span` | `calc(0.8885 * var(--fs-display) + 3.9925 * var(--fs-lead) + var(--space-2))` | 161 / 141 / 129px | the big H's cap height: from the h1's cap top to the subtitle's third baseline. The constants come from the two fonts' metrics and line-heights 1.1 / 1.45; recompute them if a font, line-height or the subtitle's line count changes. |

Fonts load in `index.html` (`<link>` to Google Fonts or self-hosted files). Record each family, weight and the sizes in use here.

## Spacing, radii, breakpoints
- Spacing: `--space-1` 0.25rem · `--space-2` 0.5rem · `--space-3` 1rem (page side margin) · `--space-4` 1.5rem · `--space-5` 2rem · `--space-6` 3rem · `--space-7` 4rem.
- Borders and radii: `--border-w` 2px · `--radius-sm` 0.375rem (buttons). Photos have square corners.
- Focus: `--focus-w` 2px solid `--color-text`, `--focus-offset` 3px, on `:focus-visible`.
- Sizes: `--target-min` 2.75rem (44px touch target) · `--button-h` 3rem (48px button height) · `--figure-h` `calc(var(--initial-span) * 1.6)` (hero figure: 258 / 226 / 207px at 1440 / 1024 / 768; the H reaches her shoulder) · `--outline-dot` 2px (dot diameter of the figure's dotted drawing) · `--outline-gap` 4.5px (spacing between its dot centres; small, tight dots so the face, arm and card read at 207–258px tall). The outline uses `vector-effect: non-scaling-stroke`, so both are screen pixels.
- Motion: `--dur-quick` 200ms · `--ease-state` ease (owned by the motion-engineer; uses are tabled in `.claude/skills/motion/SKILL.md`).
- Breakpoints (write them as `max-width` media queries in rem; check every change at 1440, 1024, 768 and 390):

| Name | Query | Token | Notes |
|---|---|---|---|
| narrow | `@media (max-width: 30rem)` | `--bp-narrow: 30rem` (reference only; media queries can't read custom properties) | 480px: 390 is narrow, 768 and up are not. The hero's text column centres. |
| not desktop | `@media (max-width: 30rem), not all and (hover: hover) and (pointer: fine)` | – (input-capability query, not a width) | Narrow or no hover-capable pointer. Hides the hero figure and the big H and returns to one text column. "Desktop" (the base styles) is everything else. |

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
