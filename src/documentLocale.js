export function readLocaleCookie() {
  const match = document.cookie.match(/(?:^|; )generaltranslation\.locale=([^;]*)/);
  if (!match || !match[1]) return "en";
  try {
    return decodeURIComponent(match[1]);
  } catch {
    return "en";
  }
}

export function applyDocumentLocale(locale, direction) {
  const language = String(locale || "en").split("-")[0] || "en";
  document.documentElement.lang = language;
  document.documentElement.dir = direction || (language === "ar" ? "rtl" : "ltr");
}
