import de from "./de.json";
import en from "./en.json";

export type Dictionary = typeof de;

const dictionaries: Record<"de" | "en", Dictionary> = {
  de: de as Dictionary,
  en: en as Dictionary,
};

export async function getDictionary(lang: string): Promise<Dictionary> {
  const locale = lang === "en" ? "en" : "de";
  return dictionaries[locale];
}
