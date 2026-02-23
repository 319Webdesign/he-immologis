import { headers } from "next/headers";

const LOCALES = ["de", "en", "tr"] as const;
export type Locale = (typeof LOCALES)[number];

export async function getLocaleFromHeaders(): Promise<Locale> {
  const headersList = await headers();
  const locale = headersList.get("x-next-locale") ?? "de";
  return LOCALES.includes(locale as Locale) ? (locale as Locale) : "de";
}
