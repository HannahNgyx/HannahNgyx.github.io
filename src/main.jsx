import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./layers.css";
import "./shared/index.css";
import App from "./App.jsx";
import { EnhanceContext } from "./shared/Slot.jsx";

// The enhance layer loads unless the URL says ?enhance=off (house rule L-3): base
// alone is what QA's enhance-off run and the Base gate check. This file is the only
// base code that may load it; its CSS arrives with the module, inside @layer enhance.
async function loadEnhance() {
  const off = new URLSearchParams(window.location.search).get("enhance") === "off";
  document.documentElement.dataset.enhance = off ? "off" : "on";
  if (off) return {};
  const { slots } = await import("./shared/enhance/index.js");
  return slots;
}

loadEnhance().then((slots) => {
  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <EnhanceContext.Provider value={slots}>
        <App />
      </EnhanceContext.Provider>
    </StrictMode>,
  );
});
