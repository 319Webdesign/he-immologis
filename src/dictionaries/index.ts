import de from "./de.json";
import en from "./en.json";
import tr from "./tr.json";

export type Dictionary = typeof de;

const dictionaries: Record<"de" | "en" | "tr", Dictionary> = {
  de: de as Dictionary,
  en: en as Dictionary,
  tr: tr as Dictionary,
};

export async function getDictionary(lang: string): Promise<Dictionary> {
  const locale = lang === "en" ? "en" : lang === "tr" ? "tr" : "de";
  const dict = dictionaries[locale];
  // Türkisch: Fallback auf Deutsch, bis tr.json gefüllt ist
  if (locale === "tr" && Object.keys(tr as object).length === 0) return dictionaries.de;
  return dict;
}
