# Radial harmony around the hero: Hannah's notes (2026-10-20)

Source: `radial-harmony-2026-10-20.svg` (88 radial ticks with alternating long and short lengths, generated on bookofshapes.com). `-raw.svg` is the same pattern with CSS variables. The licence (`LICENSE.txt`) allows use on the site with no credit required; it only forbids redistributing the pattern as a pattern.

## What
- The ring surrounds the **hero only** (the figure, the big H, the heading and the subtitle). It does not surround the nav or the floating video cards (#11).
- **Shape:** stretch it into an **oval** that fits around the hero and looks smooth. It sits outside the hero, with the hero inside it.
- **Resting state:** an even ring in black and white.

## Interaction (desktop, cursor)
- **The cursor changes the tick lengths all the way round (360°), in both directions.** Ticks on the side away from the cursor grow longer and ticks near it grow shorter. With the cursor at the centre of the page the ring is even. It must feel interactive.
- **Hovering a tick colours it:** at the exact spot under the cursor, the ring shows its colour. The whole ring has a rainbow underneath, and black and white sits on top at rest. When the cursor leaves, that spot **switches back to black and white instantly**, with no fade.
- **No cursor** (touch, no hover): an even, still ring in black and white.
- **Reduced motion:** the ring stays still and even. Hovering still colours a spot.

## When space is tight
- **Text first.** If the screen is too small for the ring to sit outside the hero, the ring goes **behind** the text and gets smaller. The text sits on top of it.
- **As the screen gets smaller,** make the ring thinner and greyer, so it reads as a background and never overpowers the text.
- **Small screens:** don't hide the ring. Make it small and keep the text first. This replaces my earlier "it can disappear".
- **Video cards (#11):** they sit **outside** the ring. If they could overlap (a smaller screen that still shows both the cards and the ring), the **cards win**: make the ring lighter and thinner there.
