import type { MetadataRoute } from "next";
import { SMART_MODULE } from "@/data/logistikberatung";
import { DEFAULT_SERVICES } from "@/data/services";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.he-immologis.de";
const LOCALES = ["de", "en", "tr"] as const;

/** Statische Routen (ohne führenden Slash, locale wird ergänzt) */
const STATIC_ROUTES = [
  "",
  "kaufen",
  "mieten",
  "verkaufen",
  "verkaufen/kontaktformular",
  "immobilie-suchen",
  "immobilien-services",
  "ueber-mich",
  "logistikberatung",
  "geld-verdienen",
  "geld-verdienen/tipp-geben",
  "geld-verdienen/aufsteller",
  "geld-verdienen/banner",
  "geld-verdienen/tippgeber-staffel",
  "spenden",
  "agb",
  "impressum",
  "datenschutz",
  "cookies",
  "widerruf",
  "zertifikate",
] as const;

function buildUrl(path: string, locale: string, priority = 0.8): MetadataRoute.Sitemap[number] {
  const pathSeg = path ? `/${path}` : "";
  const url = path === "" ? `${baseUrl}/${locale}` : `${baseUrl}/${locale}${pathSeg}`;
  const isHome = path === "";
  return {
    url,
    lastModified: new Date(),
    changeFrequency: isHome ? "weekly" : "monthly",
    priority: isHome ? 1 : priority,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    for (const route of STATIC_ROUTES) {
      entries.push(buildUrl(route, locale));
    }

    for (const modul of SMART_MODULE) {
      entries.push(buildUrl(`logistikberatung/${modul.slug}`, locale, 0.9));
    }

    for (const service of DEFAULT_SERVICES) {
      entries.push(buildUrl(`immobilien-services/${service.slug}`, locale, 0.7));
    }
  }

  return entries;
}
