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
  const prop = await fetchPropertyById(id).catch(() => null);
  if (!prop) {
    return { title: "Mietobjekt nicht gefunden" };
  }
  const immoNr = prop.objektnr_extern || String(prop.id);
  const baseTitle = prop.titel || "Mietobjekt";
  const title = `${baseTitle} | Exposé ${immoNr} | HE immologis`;
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

  const property = await fetchPropertyById(id).catch(() => null);
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
