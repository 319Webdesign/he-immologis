import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchPropertyById, fetchEstateFieldMetadata } from "@/lib/onoffice";
import { PropertyDetailLayout, type PropertyDetailDict } from "@/components/PropertyDetailLayout";
import LocalBusinessSchema from "@/components/seo/LocalBusinessSchema";
import { getLocaleFromHeaders } from "@/lib/i18n";
import { getDictionary } from "@/dictionaries";
import { formatCurrency } from "@/lib/format";

function buildMietenDescription(prop: {
  dreizeiler?: string | null;
  objektbeschreibung?: string | null;
  ort?: string | null;
  wohnflaeche?: number | null;
  kaltmiete?: number | null;
  objektnr_extern?: string | null;
  id?: number;
  titel?: string | null;
}, locale: string): string {
  const desc = prop.dreizeiler?.trim() || prop.objektbeschreibung?.trim();
  if (desc) return desc.slice(0, 160) + (desc.length > 160 ? "…" : "");
  const parts: string[] = [];
  if (prop.ort?.trim()) parts.push(prop.ort.trim());
  if (prop.wohnflaeche != null && prop.wohnflaeche > 0) parts.push(`${prop.wohnflaeche} m²`);
  if (prop.kaltmiete != null && prop.kaltmiete > 0) parts.push(`Kaltmiete ${formatCurrency(prop.kaltmiete, { locale })}`);
  const fallback = parts.length > 0 ? parts.join(" – ") : "";
  if (fallback) return fallback.slice(0, 160) + (fallback.length > 160 ? "…" : "");
  const immoNr = prop.objektnr_extern || String(prop.id ?? "");
  const base = prop.titel?.trim() || "Mietobjekt";
  return `${base} | Exposé ${immoNr}`.slice(0, 160);
}

interface PageProps {
  params: Promise<{ lang?: string; id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id, lang } = await params;
  const locale = lang ?? (await getLocaleFromHeaders());

  const prop = await fetchPropertyById(id, locale).catch(() => null);
  if (!prop) {
    return {
      title: "Mietobjekt nicht gefunden",
      description: "Die angeforderte Mietimmobilie wurde nicht gefunden. Entdecken Sie weitere Wohnungen und Häuser zur Miete in Weinheim und an der Bergstraße.",
    };
  }
  const immoNr = prop.objektnr_extern || String(prop.id);
  const rawTitle = prop.titel || "Mietobjekt";
  const maxBaseLen = 44 - 4 - `Exposé ${immoNr}`.length;
  const baseTitle = rawTitle.length > maxBaseLen ? rawTitle.slice(0, maxBaseLen - 1) + "…" : rawTitle;
  const title = `${baseTitle} | Exposé ${immoNr}`;
  const description = buildMietenDescription(prop, locale);
  return {
    title,
    description,
  };
}

export default async function MietenDetailPage({ params }: PageProps) {
  const { id, lang: langParam } = await params;
  const locale = langParam ?? (await getLocaleFromHeaders());
  const fullDict = await getDictionary(locale);
  const dict = fullDict.propertyDetail as PropertyDetailDict | undefined;

  const [property, fieldMeta] = await Promise.all([
    fetchPropertyById(id, locale).catch(() => null),
    fetchEstateFieldMetadata(locale),
  ]);
  if (!property) notFound();

  return (
    <>
      <LocalBusinessSchema />
      <PropertyDetailLayout
        property={property}
        locale={locale}
        section="mieten"
        backHref={`/${locale}/mieten`}
        dict={dict}
        fieldLabels={Object.keys(fieldMeta.labels).length > 0 ? fieldMeta.labels : undefined}
        permittedValues={Object.keys(fieldMeta.permittedValues).length > 0 ? fieldMeta.permittedValues : undefined}
      />
    </>
  );
}
