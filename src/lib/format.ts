/** Sprachcode (de/en/tr) → Intl-Locale */
const LANG_TO_LOCALE: Record<string, string> = {
  de: "de-DE",
  en: "en-GB",
  tr: "tr-TR",
};

function resolveLocale(lang?: string | null): string {
  if (!lang) return "de-DE";
  return LANG_TO_LOCALE[lang] ?? "de-DE";
}

/**
 * Formatiert einen Betrag als Euro-Währung (z. B. 20.000,00 € / 20,000.00 €).
 * @param value - Betrag in Euro
 * @param options - decimals: Nachkommastellen (Standard: 0), locale: de/en/tr für sprachabhängige Formatierung
 */
export function formatCurrency(
  value: number,
  options?: { decimals?: number; locale?: string | null }
): string {
  const decimals = options?.decimals ?? 0;
  const locale = resolveLocale(options?.locale);
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/**
 * Preis formatieren mit Locale (de → 720.000 €, en → €720,000, tr → 720.000 €).
 * Ohne Nachkommastellen.
 */
export function formatPrice(value: number, locale?: string | null): string {
  return formatCurrency(value, { decimals: 0, locale });
}
