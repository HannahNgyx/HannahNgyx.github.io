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
| `--color-surface` | `#ececec` | nav pill and its narrow menu pop-up (light grey field) | `--color-text` on it: 16.0:1 |

### Rainbow (#12)
Deep stops chosen so the rainbow reads as text on white and on grey, and holds white text on top. The gradient interpolates in sRGB; its lowest point anywhere along the run is the red stop itself (6.47:1 against white, 5.48:1 against `--color-surface`), so every in-between colour passes too. It never moves (no shimmer, no slide). #20's brighter decorative ring rainbow is a separate set.

| Token | Value | On `--color-bg` | On `--color-surface` | `--color-on-ink` on it |
|---|---|---|---|---|
| `--rainbow-red` | `#b91c1c` | 6.47:1 | 5.48:1 | 6.47:1 |
| `--rainbow-orange` | `#9a3412` | 7.31:1 | 6.19:1 | 7.31:1 |
| `--rainbow-yellow` | `#854d0e` | 6.85:1 | 5.80:1 | 6.85:1 |
| `--rainbow-green` | `#166534` | 7.13:1 | 6.04:1 | 7.13:1 |
| `--rainbow-blue` | `#1d4ed8` | 6.70:1 | 5.67:1 | 6.70:1 |
| `--rainbow-violet` | `#6d28d9` | 7.10:1 | 6.01:1 | 7.10:1 |
| `--rainbow-stops` | the six above, red to violet, comma-separated | – | – | – |
| `--gradient-rainbow` | `linear-gradient(90deg, var(--rainbow-stops))` | – | – | – |
| `--gradient-rainbow-vertical` | `linear-gradient(180deg, var(--rainbow-stops))` | – | – | – |

The rainbow is allowed only in these places (an approved exception to rule 4): the worked-at link text on hover/focus (HERO-9), the nav's Contact divider and its menu line (NAV-7, NAV-8), the desktop nav's cursor spot (NAV-9) and the whole nav pill on screens without desktop hover (NAV-10). On the rainbow, text and focus rings are `--color-on-ink`: `--color-text` on the stops is only 2.6–2.9:1 (orange lowest), below even the 3:1 a focus ring needs.

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
| `--fs-small` | `0.875rem` | 14px | the "I worked at: …" line (HERO-10), clearly below `--fs-lead` |
| `--fs-hint` | `0.6875rem` | 11px | "Hover to / see me" on the figure's lower torso (aria-hidden). 11px keeps at least 2.7px between the text and the dots at 768; 12px touches them. |

| Derived token | Value | Approx. at 1440 / 1024 / 768 | Use |
|---|---|---|---|
| `--cap-display` | `0.7` | – | Fraunces cap height per em |
| `--cap-body` | `0.74` | – | Be Vietnam Pro cap height per em (the nav's Contact divider is `--cap-body` × 1em tall) |
| `--initial-span` | `calc(0.8885 * var(--fs-display) + 3.9925 * var(--fs-lead) + var(--space-2))` | 161 / 141 / 129px | the big H's cap height: from the h1's cap top to the subtitle's third baseline. The constants come from the two fonts' metrics and line-heights 1.1 / 1.45; recompute them if a font, line-height or the subtitle's line count changes. |

Fonts load in `index.html` (`<link>` to Google Fonts or self-hosted files). Record each family, weight and the sizes in use here.

## Spacing, radii, breakpoints
- Spacing: `--space-1` 0.25rem · `--space-2` 0.5rem · `--space-3` 1rem (page side margin) · `--space-4` 1.5rem · `--space-5` 2rem · `--space-6` 3rem · `--space-7` 4rem.
- Borders and radii: `--border-w` 2px · `--radius-sm` 0.375rem (buttons) · `--radius-lg` 1.5rem (the nav's menu pop-up) · `--radius-pill` 999px (the nav pill). Photos have square corners.
- Focus: `--focus-w` 2px solid `--color-text`, `--focus-offset` 3px, on `:focus-visible`.
- Sizes: `--target-min` 2.75rem (44px touch target) · `--button-h` 3rem (48px button height) · `--figure-h` `calc(var(--initial-span) * 1.6)` (hero figure: 258 / 226 / 207px at 1440 / 1024 / 768; the H reaches her shoulder) · `--outline-dot` 2px (dot diameter of the figure's dotted drawing) · `--outline-gap` 4.5px (spacing between its dot centres; small, tight dots so the face, arm and card read at 207–258px tall). The outline uses `vector-effect: non-scaling-stroke`, so both are screen pixels. · `--nav-spot-r` 1.5rem (radius of the desktop nav's hard-edged rainbow cursor spot, a 48px circle: about one short word, and it fits inside the 60px-tall pill).
- Motion: `--dur-quick` 200ms · `--ease-state` ease (owned by the motion-engineer; uses are tabled in `.claude/skills/motion/SKILL.md`).
- Breakpoints (write them as `max-width` media queries in rem; check every change at 1440, 1024, 768 and 390):

| Name | Query | Token | Notes |
|---|---|---|---|
| narrow | `@media (max-width: 30rem)` | `--bp-narrow: 30rem` (reference only; media queries can't read custom properties) | 480px: 390 is narrow, 768 and up are not. The hero's text column centres. The nav swaps its four section links for a Menu button and pop-up. |
| not desktop | `@media (max-width: 30rem), not all and (hover: hover) and (pointer: fine)` | – (input-capability query, not a width) | Narrow or no hover-capable pointer. Hides the hero figure and the big H and returns to one text column; turns the whole nav pill rainbow with white controls (no cursor spot). "Desktop" (the base styles) is everything else. |

## Assets
Photos and artwork in `images/` and the resume PDF are free to use (see CLAUDE.md for the list). Import them in JSX so Vite bundles them, give every meaningful image real `alt` text, and set `width`/`height` or `aspect-ratio` so the layout doesn't jump.

## Rules for all work
1. **Real elements.** Navigation is `<a href>`, actions are `<button type="button">`. No clickable `<div>`/`<span>`. Use landmarks (`header`, `nav`, `main`, `footer`, `section` with a heading).
2. **44px touch targets.** Every interactive element is at least 44×44 CSS px at 768 and 390. Padding or a pseudo-element hit area is fine.
3. **4.5:1 text contrast** (3:1 for text ≥ 24px, or ≥ 18.7px bold). Record measured contrast in the colour table.
4. **No gradient washes** (no soft colour-to-colour background fades). Gradients are only allowed as texture: dots, ruled lines, hard-edged strips. The one exception is the approved rainbow, in exactly the places listed under "Rainbow (#12)".
5. **No soft grey shadows.** No blurred grey `box-shadow`s. Get depth from colour, borders, overlap or hard offset shadows.
6. **Visible focus** on everything focusable (`:focus-visible`). Never remove an outline without replacing it.
7. **Tokens only.** No new hex values, font sizes or breakpoints without a `:root` token and a row in this file.
8. **Logical properties** (`margin-inline`, `inset-inline-start`) where direction matters, so a future RTL locale is easy.
9. **Leave animation to the motion-engineer.** If something will move, give it a class or `data-` hook and a static end state.
