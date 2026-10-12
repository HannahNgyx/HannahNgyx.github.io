import { useEffect } from "react";
import { useLocale, useLocaleDirection } from "gt-react";
import { applyDocumentLocale } from "./documentLocale.js";

export function DocumentLocale() {
  const locale = useLocale();
  const direction = useLocaleDirection();

  useEffect(() => {
    applyDocumentLocale(locale, direction);
  }, [locale, direction]);

  return null;
}
