import type { Metadata } from "next";
import { notFound } from "next/navigation";
import propertiesData from "@/data/properties.json";
import type { PropertyWithDetails } from "@/types";
import { fetchPropertyById, fetchEstateFieldMetadata } from "@/lib/onoffice";
import { staticPropertyToProperty } from "@/lib/propertyMapper";
import { PropertyDetailLayout, type PropertyDetailDict } from "@/components/PropertyDetailLayout";
import LocalBusinessSchema from "@/components/seo/LocalBusinessSchema";
import { getLocaleFromHeaders } from "@/lib/i18n";
import { getDictionary } from "@/dictionaries";
import { formatCurrency } from "@/lib/format";

const staticProperties = propertiesData as PropertyWithDetails[];

function buildKaufenDescription(prop: {
  dreizeiler?: string | null;
  objektbeschreibung?: string | null;
  ort?: string | null;
  wohnflaeche?: number | null;
  kaufpreis?: number | null;
  objektnr_extern?: string | null;
  id?: number;
  titel?: string | null;
}, locale: string): string {
  const desc = prop.dreizeiler?.trim() || prop.objektbeschreibung?.trim();
  if (desc) return desc.slice(0, 160) + (desc.length > 160 ? "…" : "");
  const parts: string[] = [];
  if (prop.ort?.trim()) parts.push(prop.ort.trim());
  if (prop.wohnflaeche != null && prop.wohnflaeche > 0) parts.push(`${prop.wohnflaeche} m²`);
  if (prop.kaufpreis != null && prop.kaufpreis > 0) parts.push(`${formatCurrency(prop.kaufpreis, { locale })}`);
  const fallback = parts.length > 0 ? parts.join(" – ") : "";
  if (fallback) return fallback.slice(0, 160) + (fallback.length > 160 ? "…" : "");
  const immoNr = prop.objektnr_extern || String(prop.id ?? "");
  const base = prop.titel?.trim() || "Immobilie";
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
  if (prop) {
    const immoNr = prop.objektnr_extern || String(prop.id);
    const rawTitle = prop.titel || "Immobilie";
    const maxBaseLen = 44 - 4 - `Exposé ${immoNr}`.length;
    const baseTitle = rawTitle.length > maxBaseLen ? rawTitle.slice(0, maxBaseLen - 1) + "…" : rawTitle;
    const title = `${baseTitle} | Exposé ${immoNr}`;
    const description = buildKaufenDescription(prop, locale);
    return { title, description };
  }

  const staticProp = staticProperties.find((p) => p.id === id);
  if (staticProp) {
    const rawDesc = staticProp.beschreibung?.trim();
    const desc = rawDesc
      ? rawDesc.slice(0, 160) + (rawDesc.length > 160 ? "…" : "")
      : `${staticProp.titel} – ${staticProp.ort} – ${formatCurrency(staticProp.preis, { locale })}`.slice(0, 160);
    const immoNr = staticProp.id;
    const rawTitle = staticProp.titel || "Immobilie";
    const maxBaseLen = 44 - 4 - `Exposé ${immoNr}`.length;
    const baseTitle = rawTitle.length > maxBaseLen ? rawTitle.slice(0, maxBaseLen - 1) + "…" : rawTitle;
    return {
      title: `${baseTitle} | Exposé ${immoNr}`,
      description: desc,
    };
  }

  return {
    title: "Immobilie nicht gefunden",
    description: "Die angeforderte Immobilie wurde nicht gefunden. Entdecken Sie weitere Immobilien zum Kauf in Weinheim und an der Bergstraße.",
  };
}

export default async function KaufenDetailPage({ params }: PageProps) {
  const { id, lang: langParam } = await params;
  const locale = langParam ?? (await getLocaleFromHeaders());
  const fullDict = await getDictionary(locale);
  const dict = fullDict.propertyDetail as PropertyDetailDict | undefined;

  // Pfad 1: onOffice (Slug oder numerische ID)
  const [property, fieldMeta] = await Promise.all([
    fetchPropertyById(id, locale).catch(() => null),
    fetchEstateFieldMetadata(locale),
  ]);
  if (property) {
    return (
      <>
        <LocalBusinessSchema />
        <PropertyDetailLayout
          property={property}
          locale={locale}
          section="kaufen"
          backHref={`/${locale}/kaufen`}
          dict={dict}
          fieldLabels={Object.keys(fieldMeta.labels).length > 0 ? fieldMeta.labels : undefined}
          permittedValues={Object.keys(fieldMeta.permittedValues).length > 0 ? fieldMeta.permittedValues : undefined}
        />
      </>
    );
  }

  // Pfad 2: Statische Properties (Fallback)
  const staticProp = staticProperties.find((p) => p.id === id);
  if (!staticProp) notFound();

  const staticProperty = staticPropertyToProperty(staticProp);
  const staticFieldMeta = await fetchEstateFieldMetadata(locale);

  return (
    <>
      <LocalBusinessSchema />
      <PropertyDetailLayout
        property={staticProperty}
        locale={locale}
        section="kaufen"
        backHref={`/${locale}/kaufen`}
        dict={dict}
        fieldLabels={Object.keys(staticFieldMeta.labels).length > 0 ? staticFieldMeta.labels : undefined}
        permittedValues={Object.keys(staticFieldMeta.permittedValues).length > 0 ? staticFieldMeta.permittedValues : undefined}
      />
    </>
  );
}
