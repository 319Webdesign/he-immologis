import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchPropertyById } from "@/lib/onoffice";
import { PropertyDetailLayout } from "@/components/PropertyDetailLayout";
import { getLocaleFromHeaders } from "@/lib/i18n";

interface PageProps {
  params: Promise<{ lang?: string; id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const numId = Number(id);
  if (Number.isNaN(numId)) {
    return { title: "Mietobjekt nicht gefunden" };
  }
  const prop = await fetchPropertyById(numId).catch(() => null);
  if (!prop) {
    return { title: "Mietobjekt nicht gefunden" };
  }
  const title = prop.titel || "Mietobjekt";
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
  const numId = Number(id);

  if (Number.isNaN(numId)) notFound();

  const property = await fetchPropertyById(numId).catch(() => null);
  if (!property) notFound();

  return (
    <PropertyDetailLayout
      property={property}
      locale={locale}
      section="mieten"
      backHref={`/${locale}/mieten`}
    />
  );
}
