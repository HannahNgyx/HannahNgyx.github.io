const translationFiles = import.meta.glob("./_gt/*.json");

export default async function loadTranslations(locale) {
  const load = translationFiles[`./_gt/${locale}.json`];
  if (!load) {
    console.warn(`No translations found for ${locale}`);
    return {};
  }
  const translations = await load();
  return translations.default;
}
