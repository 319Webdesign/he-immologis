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
  const numId = Number(id);

  if (!Number.isNaN(numId)) {
    const prop = await fetchPropertyById(numId).catch(() => null);
    if (prop) {
      const title = prop.titel || "Immobilie";
      const description =
        prop.dreizeiler?.slice(0, 160) ??
        prop.objektbeschreibung?.slice(0, 160) ??
        undefined;
      return { title, description };
    }
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
  const numId = Number(id);

  // Pfad 1: Numerische ID → onOffice
  if (!Number.isNaN(numId)) {
    const property = await fetchPropertyById(numId).catch(() => null);
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
    notFound();
  }

  // Pfad 2: String-ID → statische Properties
  const staticProp = staticProperties.find((p) => p.id === id);
  if (!staticProp) notFound();

  const property = staticPropertyToProperty(staticProp);

  return (
    <PropertyDetailLayout
      property={property}
      locale={locale}
      section="kaufen"
      backHref={`/${locale}/kaufen`}
    />
  );
}
