// The hero's enhance layer: the photo reveal's cross-fade (HERO-11), the worked-at
// rainbow (HERO-9), video playback (VIDEO-5), and the cards' float and expand (VIDEO-6,
// VIDEO-7) (house rules L-4, L-5). src/shared/enhance/index.js gathers this file only
// when enhance is on.
import "./hero.css";
import VideoAutoplay from "./VideoAutoplay.jsx";

export const slots = { "home/hero/videos": VideoAutoplay };
