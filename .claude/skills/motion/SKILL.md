---
name: motion
description: Motion on this site (timings, easing, what animates) as tickets define it, plus the rules for transitions, keyframes, hover, cursor effects and open/close behaviour. Use when writing or reviewing anything that moves.
---

# Motion

## What exists
When a ticket adds motion, record it here in the same change:

| Thing | Where | Trigger → what happens → how much | Reduced motion |
|---|---|---|---|
| Hero photo reveal (HERO-7, #9) | `src/style.css`, `.hero__figure[data-photo-reveal]` | Hover on the figure box → `.hero__photo` opacity 0 → 1, `.hero__outline` and `.hero__hint` opacity 1 → 0 → cross-fade, `--dur-quick` (200ms) `--ease-state` (`ease`), opacity only, no movement. Desktop only (figure is `display: none` without a fine hover pointer or at ≤30rem). Not focusable, so no focus path yet (follow-up). | Same end states, switched instantly (`transition: none`). |

## House timings
Defaults for anything without a token yet: 120–200ms for hover and state changes, up to ~320ms for things entering, `ease-out` for entering and `ease` for state changes, and no bounce or overshoot. Tokens live on `:root` in `src/style.css`; reuse them before adding new ones:

| Token | Value | Use |
|---|---|---|
| `--dur-quick` | `200ms` | hover and state changes (hero photo reveal) |
| `--ease-state` | `ease` | state changes |

## Rules
1. **Animate `transform` and `opacity` only.** Not width, height, top/left, margin, background, box-shadow or filter.
2. **Reduced motion:** every self-running animation (loops, autoplay, entrance animations, scroll-driven effects, idle effects) stops under `prefers-reduced-motion: reduce`. In CSS use a `@media (prefers-reduced-motion: reduce)` block. In JS check `window.matchMedia("(prefers-reduced-motion: reduce)")` and listen for `change`. User-triggered state changes may stay, but make them instant or a plain opacity fade.
3. **Pause what isn't visible.** Long-running JS or canvas work pauses off screen (`IntersectionObserver`) and when the tab is hidden (`visibilitychange`).
4. **Clean up.** In React, put listeners, observers and `requestAnimationFrame` in `useEffect` and undo all of them in the cleanup function.
5. **Hover isn't the only way in.** Anything revealed on hover is also reachable by focus (`:focus-visible`) and works on touch.
6. **Cursor effects** only run on fine pointers (`(hover: hover) and (pointer: fine)`), listen on the element (not the window) when possible, and use passive listeners.
7. **Open/close behaviour** keeps `aria-expanded` in sync and closes on Escape, an outside click and a link choice, returning focus to the trigger.
8. **Don't change layout, colours or copy.** If the motion needs a hook (class, `data-` attribute, wrapper), use the one the designer left or add the smallest possible one and say so.
9. **State exact values** for duration, easing and distance in the PR (e.g. "fade + rise 8px, 200ms ease-out").
