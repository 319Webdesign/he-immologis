import de from "./de.json";
import en from "./en.json";
import tr from "./tr.json";

export type Dictionary = typeof de;

const dictionaries: Record<"de" | "en" | "tr", Dictionary> = {
  de,
  en: en as unknown as Dictionary,
  tr: tr as unknown as Dictionary,
};

export async function getDictionary(lang: string): Promise<Dictionary> {
  const locale = lang === "en" ? "en" : lang === "tr" ? "tr" : "de";
  return dictionaries[locale];
}
