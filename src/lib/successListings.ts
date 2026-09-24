export type SuccessKind = "verkauft" | "vermietet";

export type SuccessListing = {
  kind: SuccessKind;
  months: number;
};

/** Objekte, die als Erfolgsreferenz auf Karte und Detailseite markiert werden. */
const SUCCESS_BY_KEY: Record<string, SuccessListing> = {
  "etw-k-2026-5-001": { kind: "verkauft", months: 3 },
  "egw-m-2026-6-001": { kind: "vermietet", months: 2 },
};

const LABELS: Record<"de" | "en" | "tr", Record<SuccessKind, (months: number) => string>> = {
  de: {
    verkauft: (months) => `Erfolgreich verkauft in ${months} Monaten`,
    vermietet: (months) => `Erfolgreich vermietet in ${months} Monaten`,
  },
  en: {
    verkauft: (months) => `Successfully sold in ${months} months`,
    vermietet: (months) => `Successfully rented in ${months} months`,
  },
  tr: {
    verkauft: (months) => `${months} ayda başarıyla satıldı`,
    vermietet: (months) => `${months} ayda başarıyla kiralandı`,
  },
};

export function getSuccessListing(
  ...keys: Array<string | number | null | undefined>
): SuccessListing | null {
  for (const key of keys) {
    if (key == null) continue;
    const hit = SUCCESS_BY_KEY[String(key).trim().toLowerCase()];
    if (hit) return hit;
  }
  return null;
}

export function formatSuccessLabel(listing: SuccessListing, locale?: string | null): string {
  const lang = locale === "en" || locale === "tr" ? locale : "de";
  return LABELS[lang][listing.kind](listing.months);
}
