// The nav's enhance layer: the desktop cursor spot (NAV-9), the rainbow pill and
// rainbow divider (NAV-10, NAV-11, NAV-13) and the narrow menu's fade (NAV-12)
// (house rules L-4, L-5). src/shared/enhance/index.js gathers this file only when
// enhance is on.
import "./nav.css";
import NavSpot from "./NavSpot.jsx";

export const slots = { "shared/nav": NavSpot };
