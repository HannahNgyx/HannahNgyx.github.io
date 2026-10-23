# Design tokens

The site's design values, as tickets define them. Each one is a custom property on `:root` in `src/shared/tokens.css`, with a row here, added in the same change (house rule D-5). Reuse a recorded token before adding one.

The old site's look (ivory, burgundy, Cormorant) is **not** this site's design system. Use it only when a ticket or a "ref:" in a sketch points to it.

## Colour
| Token | Value | Use | Contrast |
|---|---|---|---|
| `--color-bg` | `#fff` | page background | — |
| `--color-text` | `#111` | text, borders, focus ring, fill of the solid button; the nav's divider and menu line with enhance off | 18.9:1 on `--color-bg` |
| `--color-on-ink` | `#fff` | text on a `--color-text` fill (solid button); text and focus rings on the rainbow | 18.9:1 on `#111` |
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

On the rainbow, text and focus rings are `--color-on-ink`: `--color-text` on the stops is only 2.6–2.9:1 (orange lowest), below even the 3:1 a focus ring needs.

### Gradients allowed
Every place a gradient may appear, by element and SPEC ID (hannah-signature's SIG-1 exception). All of them are enhance only; with enhance off, each one shows its solid fallback instead (L-6).

| Token | Where | Base fallback |
|---|---|---|
| `--gradient-rainbow` | worked-at link text on hover and focus (HERO-9) | the link stays `--color-text` (HERO-12) |
| `--gradient-rainbow-vertical` | the nav's Contact divider on desktop (NAV-11) | solid `--color-text` (NAV-7) |
| `--gradient-rainbow` | the narrow menu's Contact line (NAV-13) | solid `--color-text` (NAV-8) |
| `--gradient-rainbow` | the desktop nav's cursor spot (NAV-9) | no spot |
| `--gradient-rainbow` | the whole nav pill on screens without desktop hover (NAV-10) | `--color-surface` pill with `--color-text` controls (NAV-1) |

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

## Spacing, radii, sizes
| Token | Value | Use |
|---|---|---|
| `--space-1` … `--space-7` | 0.25rem · 0.5rem · 1rem · 1.5rem · 2rem · 3rem · 4rem | spacing scale; `--space-3` is the page side margin |
| `--border-w` | 2px | borders, the nav's divider and menu line |
| `--radius-sm` | 0.375rem | buttons |
| `--radius-lg` | 1.5rem | the nav's menu pop-up |
| `--radius-pill` | 999px | the nav pill. Photos have square corners. |
| `--focus-w` / `--focus-offset` | 2px / 3px | `:focus-visible` outline, solid `--color-text` |
| `--target-min` | 2.75rem | 44px touch target |
| `--button-h` | 3rem | 48px button height |
| `--figure-h` | `calc(var(--initial-span) * 1.6)` | hero figure: 258 / 226 / 207px at 1440 / 1024 / 768; the H reaches her shoulder |
| `--outline-dot` | 2px | dot diameter of the figure's dotted drawing |
| `--outline-gap` | 4.5px | spacing between its dot centres; small, tight dots so the face, arm and card read at 207–258px tall. The outline uses `vector-effect: non-scaling-stroke`, so both are screen pixels. |
| `--nav-spot-r` | 1.5rem | radius of the desktop nav's hard-edged rainbow cursor spot, a 48px circle: about one short word, and it fits inside the 60px-tall pill |
| `--card-w` | 16rem | 256px: the project video cards beside the hero above 64rem (VIDEO-2). A card is narrower when its side column is (down to ~125px at 1040), so it never leaves `<main>`'s padding; at 64rem and below the cards aren't rendered. The cards' tilted corners get `--space-2` of room on each side (`--videos-tilt-room`, local to `.videos`), so they stay `--space-5` clear of the hero. |

Motion tokens are in `design/motion-table.md`.

## Breakpoints
Written as `max-width` media queries in rem (D-9). Check every change at 1440, 1024, 768 and 390.

| Name | Query | Token | Notes |
|---|---|---|---|
| narrow | `@media (max-width: 30rem)` | `--bp-narrow: 30rem` (reference only; media queries can't read custom properties) | 480px: 390 is narrow, 768 and up are not. The hero's text column centres. The nav swaps its four section links for a Menu button and pop-up. |
| stack | `@media (max-width: 64rem)` | `--bp-stack: 64rem` (reference only) | 1024px: 1024, 768 and 390 are at or below it, 1440 is not. The four project video cards beside the hero are hidden (`display: none`, VIDEO-4) and the hero is a plain block again. #20's tick ring reuses it. |
| not desktop | `@media (max-width: 30rem), not all and (hover: hover) and (pointer: fine)` | – (input-capability query, not a width) | Narrow or no hover-capable pointer. Hides the hero figure and the big H and returns to one text column; with enhance on, turns the whole nav pill rainbow with white controls (no cursor spot). "Desktop" is everything else. |

## Assets
A section's own images live in its `assets/` folder (house rule S-3), like the hero's `assets/hannah-cutout.png`. The other photos and artwork in `images/` and the resume PDF are free to use (see `CLAUDE.md`). Import them in JSX so Vite bundles them, give every meaningful image real `alt` text (from the section's `content.json`), and set `width`/`height` or `aspect-ratio` so the layout doesn't jump.
