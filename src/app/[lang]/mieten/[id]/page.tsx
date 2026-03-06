import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchPropertyById, fetchEstateFieldMetadata } from "@/lib/onoffice";
import { PropertyDetailLayout, type PropertyDetailDict } from "@/components/PropertyDetailLayout";
import LocalBusinessSchema from "@/components/seo/LocalBusinessSchema";
import { getLocaleFromHeaders } from "@/lib/i18n";
import { getDictionary } from "@/dictionaries";

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
    return { title: "Mietobjekt nicht gefunden" };
  }
  const immoNr = prop.objektnr_extern || String(prop.id);
  const baseTitle = prop.titel || "Mietobjekt";
  const title = `${baseTitle} | Exposé ${immoNr}`;
  const description =
    prop.dreizeiler?.slice(0, 160) ??
    prop.objektbeschreibung?.slice(0, 160) ??
    `${prop.ort ?? ""} – ${prop.wohnflaeche ?? ""} m² – Kaltmiete ${prop.kaltmiete ?? ""}`.trim();
  return {
    title,
    description: description || undefined,
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
