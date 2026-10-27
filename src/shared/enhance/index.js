// The enhance layer's entry (house rules L-3, L-4, L-5). main.jsx loads it only when
// enhance is on. It gathers every section's enhance/index.js, so a new section needs
// no change here.
import "./index.css";

const modules = import.meta.glob(["/src/pages/**/enhance/index.js", "/src/shared/*/enhance/index.js"], { eager: true });

export const slots = Object.assign({}, ...Object.values(modules).map((m) => m.slots ?? {}));
