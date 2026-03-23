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
    de: doc("HE immologis TippgeberV DE.pdf"),
    en: doc("HE Immologis Tippgeberanschreiben EN.pdf"), // EN-Version der Vereinbarung
    tr: doc("HE Immologis Tippgebervereinbarung.TR.pdf"),
  } as Record<Locale, string>,
  hinweis: {
    de: doc("HE Immologis Tippgeberhinweis DE.pdf"),
    en: doc("HE Immologis Tippgeberhinweis EN.pdf"),
    tr: doc("HE Immologis Tippgeberhinweis.TR.pdf"),
  } as Record<Locale, string>,
};

/** Banner: privat + Gewerbe/Läden */
export const BANNER_DOCS = {
  privat: {
    de: doc("HE Immologis TippgeberV Banner privat DE.pdf"),
    en: doc("HE Immologis TippgeberV Banner privat EN.pdf"),
    tr: doc("HE Immologis TippgeberV Banner privat TR.pdf"),
  } as Record<Locale, string>,
  gewerbe: {
    de: doc("HE Immologis Werbepartner Banner Läden DE.pdf"),
    en: doc("HE Immologis Werbepartner Banner Läden EN.pdf"),
    tr: doc("HE Immologis Werbepartner Banner Läden TR.pdf"),
  } as Record<Locale, string>,
};

/** Aufsteller: privat + Gewerbe/Läden */
export const AUFSTELLER_DOCS = {
  privat: {
    de: doc("HE Immologis WerbepartnerV Aufsteller privat DE.pdf"),
    en: doc("HE Immologis WerbepartneV Aufsteller privat EN.pdf"),
    tr: doc("HE Immologis WerbepartneV Aufsteller privat TR.pdf"),
  } as Record<Locale, string>,
  gewerbe: {
    de: doc("HE Immologis WerbepartnerV Aufsteller Läden DE.pdf"),
    en: doc("HE Immologis WerbepartnerV Aufsteller Läden EN.pdf"),
    tr: doc("HE Immologis WerbepartnerV Aufsteller Läden TR.pdf"),
  } as Record<Locale, string>,
};

/** AGB als PDF-Download (DE) */
export const AGB_PDF_DE = doc("AGB_01.03.2026_DE.pdf");

/** Mustervertrag Werbefläche – bleibt bei /downloads, da kein eigenes File in dokumente */
export const MUSTERVERTRAG_WERBEFLAECHE = "/downloads/HE_Immologis_Mustervertrag_Werbeflaeche.pdf";
