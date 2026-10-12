import { initializeGTSPA } from "gt-react";
import gtConfig from "../gt.config.json";
import { applyDocumentLocale, readLocaleCookie } from "./documentLocale.js";
import loadTranslations from "./loadTranslations.js";

applyDocumentLocale(readLocaleCookie());

await initializeGTSPA({
  defaultLocale: gtConfig.defaultLocale,
  locales: gtConfig.locales,
  loadTranslations,
});

const { renderApp } = await import("./main.jsx");
renderApp();
