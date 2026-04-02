/**
 * Dokumente aus public/dokumente – sprachabhängige Pfade
 * DE, EN, TR für Tippgeber, Banner und Aufsteller
 */
type Locale = "de" | "en" | "tr";

function doc(path: string): string {
  return encodeURI(`/dokumente/${path}`);
}

/** Tippgeber: Vereinbarung + Hinweisschreiben */
export const TIPPGEBER_DOCS = {
  vereinbarung: {
    de: doc("HE immologis TippgeberV DE_11.05.2026.pdf"),
    en: doc("HE Immologis Tippgeberanschreiben EN_11.05.2026.pdf"), // EN-Version der Vereinbarung
    tr: doc("HE Immologis Tippgebervereinbarung.TR_11.05.2026.pdf"),
  } as Record<Locale, string>,
  hinweis: {
    de: doc("HE Immologis Tippgeberhinweis DE_11.05.2026.pdf"),
    en: doc("HE Immologis Tippgeberhinweis EN_11.05.2026.pdf"),
    tr: doc("HE Immologis Tippgeberhinweis TR_11.05.2026.pdf"),
  } as Record<Locale, string>,
};

/** Banner: privat + Gewerbe/Läden */
export const BANNER_DOCS = {
  privat: {
    de: doc("HE Immologis TippgeberV Banner privat DE_11.05.2026.pdf"),
    en: doc("HE Immologis TippgeberV Banner privat EN_11.05.2026.pdf"),
    tr: doc("HE Immologis TippgeberV Banner privat TR_11.05.2026.pdf"),
  } as Record<Locale, string>,
  gewerbe: {
    de: doc("HE Immologis Werbepartner Banner Läden DE_11.05.2026.pdf"),
    en: doc("HE Immologis Werbepartner Banner Läden EN_11.05.2026.pdf"),
    tr: doc("HE Immologis Werbepartner Banner Läden TR_11.05.2026.pdf"),
  } as Record<Locale, string>,
};

/** Aufsteller: privat + Gewerbe/Läden */
export const AUFSTELLER_DOCS = {
  privat: {
    de: doc("HE Immologis WerbepartnerV Aufsteller privat DE_11.05.2026.pdf"),
    en: doc("HE Immologis WerbepartneV Aufsteller privat EN.pdf"),
    tr: doc("HE Immologis WerbepartneV Aufsteller privat TR_11.05.2026.pdf"),
  } as Record<Locale, string>,
  gewerbe: {
    de: doc("HE Immologis WerbepartnerV Aufsteller Läden DE_11.05.2026.pdf"),
    en: doc("HE Immologis WerbepartnerV Aufsteller Läden EN.pdf"),
    tr: doc("HE Immologis WerbepartnerV Aufsteller Läden TR_11.05.2026.pdf"),
  } as Record<Locale, string>,
};

/** AGB als PDF-Download nach Sprache */
export const AGB_PDF = {
  de: doc("AGB_11.05.2026_DE.pdf"),
  en: doc("AGB_11.05.2026_EN.pdf"),
  tr: doc("AGB_11.05.2026_TR.pdf"),
} as Record<Locale, string>;

/** Mustervertrag Werbefläche – bleibt bei /downloads, da kein eigenes File in dokumente */
export const MUSTERVERTRAG_WERBEFLAECHE = "/downloads/HE_Immologis_Mustervertrag_Werbeflaeche.pdf";
