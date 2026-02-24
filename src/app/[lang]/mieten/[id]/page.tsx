import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Home, BedDouble, Bath } from "lucide-react";
import { fetchPropertyById, type Property } from "@/lib/onoffice";
import { getLocaleFromHeaders } from "@/lib/i18n";

const PLACEHOLDER_IMG = "/img/immobilie-placeholder.png";

const ANSPRECHPARTNER = {
  name: "Holger Eberhard",
  role: "Ihr persönlicher Ansprechpartner",
  firm: "HE Immologis",
  mail: "info@he-immologis.de",
  text: "Gerne stehe ich Ihnen für alle Fragen zu dieser Immobilie zur Verfügung. Kontaktieren Sie mich für eine Besichtigung oder ein unverbindliches Beratungsgespräch.",
};

interface PageProps {
  params: Promise<{ lang?: string; id: string }>;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

function formatNumber(value: number | undefined): string {
  if (value == null) return "—";
  return new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}

function DataRow({
  label,
  value,
}: {
  label: string;
  value: string | number | undefined | null;
}) {
  const v = value ?? "—";
  const display = typeof v === "number" ? formatNumber(v) : String(v);
  return (
    <tr className="border-b border-zinc-200">
      <td className="py-2 pr-6 text-zinc-600">{label}</td>
      <td className="py-2 text-right font-medium text-zinc-900">{display}</td>
    </tr>
  );
}

function TextBlock({
  title,
  content,
}: {
  title: string;
  content: string | null | undefined;
}) {
  if (!content?.trim()) return null;
  return (
    <section className="mt-8">
      <h2 className="font-sans text-lg font-semibold text-zinc-900">{title}</h2>
      <div className="mt-2 whitespace-pre-line text-zinc-600 leading-relaxed">
        {content.trim()}
      </div>
    </section>
  );
}

function MietenPropertyDetail({
  property: p,
  locale,
}: {
  property: Property;
  locale: string;
}) {
  const imageUrls = [
    ...(p.titelbild ? [p.titelbild] : []),
    ...(p.galerie ?? []),
  ].filter((src) => src && (src.startsWith("http") || src.startsWith("/")));
  const images = imageUrls.length > 0 ? imageUrls : [PLACEHOLDER_IMG];
  const firstImg = images[0] === PLACEHOLDER_IMG ? PLACEHOLDER_IMG : images[0];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href={`/${locale}/mieten`}
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-zinc-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Zurück zur Übersicht
      </Link>

      {/* Bildergalerie */}
      <div className="space-y-4">
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-zinc-200">
          <Image
            src={
              firstImg.startsWith("http") || firstImg.startsWith("/")
                ? firstImg
                : PLACEHOLDER_IMG
            }
            alt={p.titel || "Mietobjekt"}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 896px"
            priority
          />
        </div>
        {images.length > 1 && (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {images.slice(1, 5).map((src, i) => (
              <div
                key={i}
                className="relative aspect-video overflow-hidden rounded-lg bg-zinc-200"
              >
                <Image
                  src={
                    src.startsWith("http") || src.startsWith("/")
                      ? src
                      : PLACEHOLDER_IMG
                  }
                  alt={`${p.titel || "Mietobjekt"} ${i + 2}`}
                  fill
                  className="object-cover"
                  sizes="200px"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Key-Facts */}
      <div className="mt-8 flex flex-wrap items-center gap-6 text-zinc-600">
        {p.ort && (
          <span className="flex items-center gap-2">
            <MapPin className="h-5 w-5 shrink-0" />
            {p.plz && `${p.plz} `}
            {p.ort}
          </span>
        )}
        {p.wohnflaeche != null && (
          <span className="flex items-center gap-2">
            <Home className="h-5 w-5 shrink-0" />
            {p.wohnflaeche} m²
          </span>
        )}
        {p.anzahl_zimmer != null && p.anzahl_zimmer > 0 && (
          <span className="flex items-center gap-2">
            <BedDouble className="h-5 w-5 shrink-0" />
            {p.anzahl_zimmer} Zimmer
          </span>
        )}
        {p.anzahl_badezimmer != null && p.anzahl_badezimmer > 0 && (
          <span className="flex items-center gap-2">
            <Bath className="h-5 w-5 shrink-0" />
            {p.anzahl_badezimmer} Bad/Bäder
          </span>
        )}
        {p.kaltmiete != null && p.kaltmiete > 0 && (
          <span className="font-semibold text-zinc-900">
            Kaltmiete: {formatPrice(p.kaltmiete)}
          </span>
        )}
      </div>

      <h1 className="mt-4 font-sans text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
        {p.titel || "Ohne Titel"}
      </h1>
      {p.dreizeiler?.trim() && (
        <p className="mt-4 text-lg text-zinc-600 leading-relaxed">
          {p.dreizeiler.trim()}
        </p>
      )}

      {/* Beschreibungen */}
      <TextBlock title="Objektbeschreibung" content={p.objektbeschreibung} />
      <TextBlock title="Lage" content={p.lage} />
      <TextBlock title="Sonstige Angaben" content={p.sonstige_angaben} />

      {/* Objektdaten */}
      <section className="mt-10 overflow-hidden rounded-xl border border-zinc-200">
        <table className="w-full min-w-[280px]">
          <tbody>
            <DataRow label="Ort" value={p.ort} />
            <DataRow label="PLZ" value={p.plz} />
            <DataRow
              label="Wohnfläche"
              value={p.wohnflaeche != null ? `${p.wohnflaeche} m²` : null}
            />
            <DataRow label="Objektart" value={p.objektart} />
            <DataRow label="Zimmer" value={p.anzahl_zimmer} />
            <DataRow label="Etage" value={p.etage != null ? String(p.etage) : null} />
            <DataRow label="Badezimmer" value={p.anzahl_badezimmer} />
            <DataRow
              label="Kaltmiete"
              value={p.kaltmiete != null ? formatPrice(p.kaltmiete) : null}
            />
            <DataRow
              label="Nebenkosten"
              value={p.nebenkosten != null ? formatPrice(p.nebenkosten) : null}
            />
            <DataRow
              label="Heizkosten"
              value={p.heizkosten != null ? formatPrice(p.heizkosten) : null}
            />
            <DataRow
              label="Kaution"
              value={p.kaution != null ? formatPrice(p.kaution) : null}
            />
          </tbody>
        </table>
      </section>

      {/* CTA */}
      <section className="mt-12 rounded-2xl border border-zinc-200 bg-zinc-50/50 p-8">
        <h2 className="font-sans text-xl font-semibold text-zinc-900">
          Anfrage senden
        </h2>
        <p className="mt-2 text-zinc-600">
          Haben Sie Interesse an dieser Mietimmobilie? Schreiben Sie uns für eine
          Besichtigung oder weitere Informationen.
        </p>
        <a
          href={`mailto:info@he-immologis.de?subject=Anfrage Mietobjekt: ${encodeURIComponent(p.titel || "")}`}
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-zinc-900 px-8 py-3 font-medium text-white transition-colors hover:bg-zinc-800"
        >
          E-Mail-Anfrage senden
        </a>
      </section>

      {/* Ansprechpartner */}
      <section className="mt-12 rounded-2xl border border-zinc-200 bg-zinc-50/50 p-8">
        <h2 className="font-sans text-xl font-semibold text-zinc-900">
          {ANSPRECHPARTNER.role}
        </h2>
        <p className="mt-2 font-medium text-zinc-800">{ANSPRECHPARTNER.name}</p>
        <p className="text-zinc-600">{ANSPRECHPARTNER.firm}</p>
        <p className="mt-4 text-zinc-600 leading-relaxed">
          {ANSPRECHPARTNER.text}
        </p>
        <a
          href={`mailto:${ANSPRECHPARTNER.mail}?subject=Anfrage Mietobjekt: ${encodeURIComponent(p.titel || "")}`}
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-zinc-900 px-8 py-3 font-medium text-white transition-colors hover:bg-zinc-800"
        >
          E-Mail an {ANSPRECHPARTNER.name}
        </a>
      </section>
    </div>
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const numId = Number(id);
  if (!Number.isNaN(numId)) {
    const prop = await fetchPropertyById(numId).catch(() => null);
    if (prop) {
      return {
        title: prop.titel || "Mietobjekt",
        description: prop.dreizeiler?.slice(0, 160) ?? prop.objektbeschreibung?.slice(0, 160),
      };
    }
  }
  return { title: "Mietobjekt nicht gefunden" };
}

export default async function MietenDetailPage({ params }: PageProps) {
  const { id, lang: langParam } = await params;
  const locale = langParam ?? (await getLocaleFromHeaders());
  const numId = Number(id);

  if (Number.isNaN(numId)) notFound();

  const property = await fetchPropertyById(numId).catch(() => null);
  if (!property) notFound();

  return <MietenPropertyDetail property={property} locale={locale} />;
}
