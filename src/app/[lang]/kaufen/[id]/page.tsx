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

const staticProperties = propertiesData as PropertyWithDetails[];

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
    const baseTitle = prop.titel || "Immobilie";
    const title = `${baseTitle} | Exposé ${immoNr}`;
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
