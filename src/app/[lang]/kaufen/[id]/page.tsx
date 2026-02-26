import type { Metadata } from "next";
import { notFound } from "next/navigation";
import propertiesData from "@/data/properties.json";
import type { PropertyWithDetails } from "@/types";
import { fetchPropertyById } from "@/lib/onoffice";
import { staticPropertyToProperty } from "@/lib/propertyMapper";
import { PropertyDetailLayout } from "@/components/PropertyDetailLayout";
import { getLocaleFromHeaders } from "@/lib/i18n";

const staticProperties = propertiesData as PropertyWithDetails[];

interface PageProps {
  params: Promise<{ lang?: string; id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  const prop = await fetchPropertyById(id).catch(() => null);
  if (prop) {
    const immoNr = prop.objektnr_extern || String(prop.id);
    const baseTitle = prop.titel || "Immobilie";
    const title = `${baseTitle} | Exposé ${immoNr} | HE immologis`;
    const description =
      prop.dreizeiler?.slice(0, 160) ??
      prop.objektbeschreibung?.slice(0, 160) ??
      undefined;
    return { title, description };
  }

  const staticProp = staticProperties.find((p) => p.id === id);
  if (staticProp) {
    return {
      title: staticProp.titel,
      description: staticProp.beschreibung?.slice(0, 160),
    };
  }

  return { title: "Immobilie nicht gefunden" };
}

export default async function KaufenDetailPage({ params }: PageProps) {
  const { id, lang: langParam } = await params;
  const locale = langParam ?? (await getLocaleFromHeaders());

  // Pfad 1: onOffice (Slug oder numerische ID)
  const property = await fetchPropertyById(id).catch(() => null);
  if (property) {
    return (
      <PropertyDetailLayout
        property={property}
        locale={locale}
        section="kaufen"
        backHref={`/${locale}/kaufen`}
      />
    );
  }

  // Pfad 2: Statische Properties (Fallback)
  const staticProp = staticProperties.find((p) => p.id === id);
  if (!staticProp) notFound();

  const staticProperty = staticPropertyToProperty(staticProp);

  return (
    <PropertyDetailLayout
      property={staticProperty}
      locale={locale}
      section="kaufen"
      backHref={`/${locale}/kaufen`}
    />
  );
}
