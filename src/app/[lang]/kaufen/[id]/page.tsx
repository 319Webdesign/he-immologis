import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Home, BedDouble, Bath } from "lucide-react";
import propertiesData from "@/data/properties.json";
import type { PropertyWithDetails } from "@/types";
import { fetchPropertyById, type Property } from "@/lib/onoffice";
import { PropertyActionIcons, ExposeForm } from "./PropertyDetailActions";
import { getLocaleFromHeaders } from "@/lib/i18n";

const staticProperties = propertiesData as PropertyWithDetails[];
const PLACEHOLDER_IMG = "/img/immobilie-placeholder.png";

/** Sektion „Ihr persönlicher Ansprechpartner“ (Holger Eberhard / HE Immologis). */
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

function OnOfficePropertyDetail({
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

  const price = p.kaufpreis ?? p.kaltmiete;
  const priceLabel = p.kaufpreis != null ? "Kaufpreis" : "Kaltmiete";

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href={`/${locale}/kaufen`}
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-zinc-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Zurück zur Übersicht
      </Link>

      {/* Bildergalerie */}
      <div className="space-y-4">
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-zinc-200">
          <Image
            src={firstImg.startsWith("http") || firstImg.startsWith("/") ? firstImg : PLACEHOLDER_IMG}
            alt={p.titel || "Immobilie"}
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
                  src={src.startsWith("http") || src.startsWith("/") ? src : PLACEHOLDER_IMG}
                  alt={`${p.titel || "Immobilie"} ${i + 2}`}
                  fill
                  className="object-cover"
                  sizes="200px"
                />
              </div>
            ))}
          </div>
        )}
        <PropertyActionIcons
          propertyId={String(p.id)}
          propertyTitle={p.titel || "Immobilie"}
        />
      </div>

      {/* Key-Facts mit Icons */}
      <div className="mt-8 flex flex-wrap items-center gap-6 text-zinc-600">
        {p.ort && (
          <span className="flex items-center gap-2">
            <MapPin className="h-5 w-5 shrink-0" />
            {p.plz && `${p.plz} `}{p.ort}
          </span>
        )}
        {p.wohnflaeche != null && (
          <span className="flex items-center gap-2">
            <Home className="h-5 w-5 shrink-0" />
            {p.wohnflaeche} m²
          </span>
        )}
        {(p.anzahl_zimmer != null && p.anzahl_zimmer > 0) && (
          <span className="flex items-center gap-2">
            <BedDouble className="h-5 w-5 shrink-0" />
            {p.anzahl_zimmer} Zimmer
          </span>
        )}
        {(p.anzahl_badezimmer != null && p.anzahl_badezimmer > 0) && (
          <span className="flex items-center gap-2">
            <Bath className="h-5 w-5 shrink-0" />
            {p.anzahl_badezimmer} Bad/Bäder
          </span>
        )}
        {price != null && price > 0 && (
          <span className="font-semibold text-zinc-900">
            {priceLabel}: {formatPrice(price)}
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

      {/* Beschreibungs-Texte */}
      <TextBlock title="Objektbeschreibung" content={p.objektbeschreibung} />
      <TextBlock title="Lage" content={p.lage} />
      <TextBlock title="Sonstige Angaben" content={p.sonstige_angaben} />

      {/* Objektdaten-Tabelle */}
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
            <DataRow label="Kaufpreis" value={p.kaufpreis != null ? formatPrice(p.kaufpreis) : null} />
            <DataRow label="Kaltmiete" value={p.kaltmiete != null ? formatPrice(p.kaltmiete) : null} />
            <DataRow label="Nebenkosten" value={p.nebenkosten != null ? formatPrice(p.nebenkosten) : null} />
            <DataRow label="Heizkosten" value={p.heizkosten != null ? formatPrice(p.heizkosten) : null} />
            <DataRow label="Kaution" value={p.kaution != null ? formatPrice(p.kaution) : null} />
          </tbody>
        </table>
      </section>

      {/* CTA: Exposé anfordern */}
      <section className="mt-12 rounded-2xl border border-zinc-200 bg-zinc-50/50 p-8">
        <h2 className="font-sans text-xl font-semibold text-zinc-900">
          Exposé anfordern
        </h2>
        <p className="mt-2 text-zinc-600">
          Kontaktdaten angeben – wir senden Ihnen das Exposé und stehen für
          Rückfragen zur Verfügung.
        </p>
        <div className="mt-8">
          <ExposeForm propertyTitle={p.titel || "Immobilie"} />
        </div>
      </section>

      {/* Ihr persönlicher Ansprechpartner */}
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
          href={`mailto:${ANSPRECHPARTNER.mail}?subject=Anfrage Immobilie: ${encodeURIComponent(p.titel || "")}`}
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
    const onOfficeProp = await fetchPropertyById(numId).catch(() => null);
    if (onOfficeProp) {
      return { title: onOfficeProp.titel || "Immobilie" };
    }
    return { title: "Immobilie nicht gefunden" };
  }
  const property = staticProperties.find((p) => p.id === id);
  if (!property) return { title: "Immobilie nicht gefunden" };
  return {
    title: property.titel,
    description: property.beschreibung.slice(0, 160),
  };
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const { id, lang: langParam } = await params;
  const locale = langParam ?? (await getLocaleFromHeaders());
  const numId = Number(id);

  if (!Number.isNaN(numId)) {
    const onOfficeProp = await fetchPropertyById(numId).catch(() => null);
    if (onOfficeProp) {
      return (
        <OnOfficePropertyDetail property={onOfficeProp} locale={locale} />
      );
    }
    notFound();
  }

  const p = staticProperties.find((prop) => prop.id === id);

  if (!p) notFound();

  const getImageSrc = (url: string) =>
    url?.startsWith("http") || url?.startsWith("/") ? url : PLACEHOLDER_IMG;

  const allImages = [p.vorschaubild, ...(p.galerie || [])].filter(Boolean);
  const plz = p.plz ?? "69469";
  const immoNr = p.immoNr ?? p.id;
  const objekttyp = p.objekttyp ?? "Einfamilienhaus";
  const objektart = p.objektart ?? "Haus";
  const baujahr = p.baujahr ?? 2014;
  const nutzflaeche = p.nutzflaeche ?? Math.round((p.quadratmeter ?? 0) * 0.2);
  const grundstueck = p.grundstuecksflaeche ?? 580;
  const verfuegbarAb = p.verfuegbarAb ?? "ab sofort";
  const aussenprovision = p.aussenprovision ?? 3.57;
  const gesamtkaufpreis =
    (p.nebenkosten ?? 0) +
    (p.garagePreis ?? 0) +
    (p.stellplatzPreis ?? 0) +
    p.preis;
  const strasse = p.strasse ?? "";

  return (
    <>
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Zurück-Link */}
        <Link
          href={`/${locale}/kaufen`}
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-zinc-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Zurück zur Übersicht
        </Link>

        {/* 2. Bilder */}
        <div className="space-y-4">
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-zinc-200">
            <Image
              src={getImageSrc(allImages[0] || "")}
              alt={p.titel}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 896px"
              priority
            />
          </div>
          {allImages.length > 1 && (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {allImages.slice(1, 5).map((img, i) => (
                <div
                  key={i}
                  className="relative aspect-video overflow-hidden rounded-lg bg-zinc-200"
                >
                  <Image
                    src={getImageSrc(img)}
                    alt={`${p.titel} ${i + 2}`}
                    fill
                    className="object-cover"
                    sizes="200px"
                  />
                </div>
              ))}
            </div>
          )}

          {/* 3. Vier Icons */}
          <PropertyActionIcons propertyId={p.id} propertyTitle={p.titel} />
        </div>

        {/* 4. Icon Ort / Wohnung / PLZ Ort */}
        <div className="mt-8 flex flex-wrap items-center gap-4 text-zinc-600">
          <span className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            {p.ort}
          </span>
          <span className="flex items-center gap-2">
            <Home className="h-5 w-5" />
            {objekttyp}
          </span>
          <span>
            {plz} {p.ort}
          </span>
        </div>

        {/* 5. Überschrift */}
        <h1 className="mt-4 font-sans text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
          {p.titel}
        </h1>

        {/* 6. Objektbeschreibung */}
        <section className="mt-8">
          <h2 className="font-sans text-lg font-semibold text-zinc-900">
            Objektbeschreibung
          </h2>
          <p className="mt-2 whitespace-pre-line text-zinc-600 leading-relaxed">
            {p.beschreibung}
          </p>
        </section>

        {/* 7. Objektdaten */}
        <section className="mt-10">
          <h2 className="font-sans text-lg font-semibold text-zinc-900">
            Objektdaten
          </h2>
          <div className="mt-4 overflow-hidden rounded-xl border border-zinc-200">
            <table className="w-full min-w-[280px]">
              <tbody>
                <DataRow label="ImmoNr. / Kennung" value={immoNr} />
                <DataRow label="Ort" value={p.ort} />
                <DataRow label="Objekttyp" value={objekttyp} />
                <DataRow label="Baujahr" value={baujahr} />
                <DataRow
                  label="vermietet"
                  value={p.vermietet === true ? "ja" : p.vermietet === false ? "nein" : "—"}
                />
                <DataRow
                  label="Wohnfläche"
                  value={p.quadratmeter != null ? `ca. ${p.quadratmeter} qm` : "—"}
                />
                <DataRow
                  label="Nutzfläche"
                  value={
                    nutzflaeche != null ? `ca. ${formatNumber(nutzflaeche)} qm` : "—"
                  }
                />
                <DataRow
                  label="Grundstücksfläche"
                  value={
                    grundstueck != null
                      ? `ca. ${formatNumber(grundstueck)} qm`
                      : "—"
                  }
                />
                <DataRow label="Anzahl Zimmer" value={p.zimmer} />
                <DataRow label="Verfügbar ab" value={verfuegbarAb} />
                <DataRow label="Preis" value={formatPrice(p.preis)} />
                <DataRow
                  label="Außenprovision"
                  value={
                    aussenprovision != null ? `${formatNumber(aussenprovision)} %` : "—"
                  }
                />
              </tbody>
            </table>
          </div>
        </section>

        {/* 8. Eckdaten der Immobilie */}
        <section className="mt-10">
          <h2 className="font-sans text-lg font-semibold text-zinc-900">
            Eckdaten der Immobilie
          </h2>
          <div className="mt-4 overflow-hidden rounded-xl border border-zinc-200">
            <table className="w-full min-w-[280px]">
              <tbody>
                <DataRow label="ImmoNr. / Kennung" value={immoNr} />
                <DataRow label="Objektart" value={objektart} />
                <DataRow label="Objekttyp" value={objekttyp} />
                <DataRow label="Baujahr" value={baujahr} />
                <DataRow label="Nutzungsart" value={p.nutzungsart ?? "Wohnen Kauf"} />
                <DataRow label="Verfügbar ab" value={verfuegbarAb} />
                <DataRow
                  label="Wohnfläche"
                  value={
                    p.quadratmeter != null
                      ? `ca. ${formatNumber(p.quadratmeter)} qm`
                      : "—"
                  }
                />
                <DataRow
                  label="Nutzfläche"
                  value={
                    nutzflaeche != null
                      ? `ca. ${formatNumber(nutzflaeche)} qm`
                      : "—"
                  }
                />
                <DataRow
                  label="Grundstücksfläche"
                  value={
                    grundstueck != null
                      ? `ca. ${formatNumber(grundstueck)} qm`
                      : "—"
                  }
                />
                <DataRow label="Anzahl Zimmer" value={p.zimmer} />
                <DataRow label="Anzahl Küche" value={p.anzahlKueche ?? 1} />
                <DataRow
                  label="Anzahl Schlafzimmer"
                  value={p.anzahlSchlafzimmer ?? Math.max(1, p.zimmer - 2)}
                />
                <DataRow label="Anzahl Wohnzimmer" value={p.anzahlWohnzimmer ?? 1} />
                <DataRow label="Anzahl Bad" value={p.anzahlBad ?? 1} />
                <DataRow label="Anzahl Gäste-WC" value={p.anzahlGaesteWc ?? 1} />
                <DataRow label="Anzahl Balkone" value={p.anzahlBalkone ?? 0} />
                <DataRow label="Anzahl Terrasse" value={p.anzahlTerrasse ?? 1} />
                <DataRow label="Anzahl Loggia" value={p.anzahlLoggia ?? 0} />
                <DataRow label="Anzahl Keller" value={p.anzahlKeller ?? 1} />
                <DataRow label="Etage" value={p.etage ?? 1} />
                <DataRow label="Etagenzahl gesamt" value={p.etagenzahlGesamt ?? 2} />
              </tbody>
            </table>
          </div>
        </section>

        {/* 9. Preise */}
        <section className="mt-10">
          <h2 className="font-sans text-lg font-semibold text-zinc-900">
            Preise
          </h2>
          <div className="mt-4 overflow-hidden rounded-xl border border-zinc-200">
            <table className="w-full min-w-[280px]">
              <tbody>
                <DataRow label="Kaufpreis" value={formatPrice(p.preis)} />
                <DataRow
                  label="Nebenkosten"
                  value={formatPrice(p.nebenkosten ?? 0)}
                />
                <DataRow
                  label="Garage / Tiefgarage"
                  value={formatPrice(p.garagePreis ?? 0)}
                />
                <DataRow
                  label="Stellplatz"
                  value={formatPrice(p.stellplatzPreis ?? 0)}
                />
                <DataRow
                  label="Gesamtkaufpreis"
                  value={formatPrice(gesamtkaufpreis)}
                />
              </tbody>
            </table>
          </div>
        </section>

        {/* 10. Außenprovision */}
        <section className="mt-10">
          <h2 className="font-sans text-lg font-semibold text-zinc-900">
            Außenprovision
          </h2>
          <p className="mt-2 text-zinc-600">
            Außenprovision {formatNumber(aussenprovision)} % inklusive MwSt.
          </p>
        </section>

        {/* 11. Geografische Angaben */}
        <section className="mt-10">
          <h2 className="font-sans text-lg font-semibold text-zinc-900">
            Geografische Angaben
          </h2>
          <div className="mt-4 overflow-hidden rounded-xl border border-zinc-200">
            <table className="w-full min-w-[200px]">
              <tbody>
                <DataRow label="Straße" value={strasse || "—"} />
                <DataRow label="PLZ" value={plz} />
                <DataRow label="Ort" value={p.ort} />
              </tbody>
            </table>
          </div>
        </section>

        {/* 12. Ausstattung */}
        <section className="mt-10">
          <h2 className="font-sans text-lg font-semibold text-zinc-900">
            Ausstattung
          </h2>
          <div className="mt-4 overflow-hidden rounded-xl border border-zinc-200">
            <table className="w-full min-w-[280px]">
              <tbody>
                <DataRow
                  label="Beheizung"
                  value={
                    p.beheizung ??
                    "Gas, Öl, Fernwärme, Wärmepumpe, Elektro, Solarthermie"
                  }
                />
                <DataRow
                  label="Boden"
                  value={
                    p.boden ??
                    "Parkett, Fliesen, Laminat, Teppich, Vinyl, Steinzeug"
                  }
                />
                <DataRow
                  label="Fahrstuhl"
                  value={p.fahrstuhl === true ? "ja" : "nein"}
                />
                <DataRow
                  label="Anzahl Stellplätze"
                  value={p.anzahlStellplaetze ?? 1}
                />
                <DataRow
                  label="Anzahl Garage / Tiefgarage"
                  value={p.anzahlGarage ?? 0}
                />
              </tbody>
            </table>
          </div>
        </section>

        {/* 13. Beschreibung Lage */}
        <section className="mt-10">
          <h2 className="font-sans text-lg font-semibold text-zinc-900">
            Beschreibung Lage
          </h2>
          <div className="mt-4 rounded-xl border border-zinc-200 p-4">
            <p className="whitespace-pre-line text-zinc-600 leading-relaxed min-h-[120px]">
              {p.beschreibungLage ||
                "Ruhige Wohnlage in Weinheim mit guter Anbindung zu Schulen, Einkauf und ÖPNV. Die Bergstraße und die Innenstadt sind schnell erreichbar."}
            </p>
          </div>
        </section>

        {/* 14. Energieeffizienz */}
        <section className="mt-10">
          <h2 className="font-sans text-lg font-semibold text-zinc-900">
            Energieeffizienz
          </h2>
          <div className="mt-4 flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-zinc-600">Effizienzklasse:</span>
              <div className="flex gap-0.5 font-medium">
                {(["A", "B", "C", "D", "E", "F", "G", "H"] as const).map(
                  (klasse) => (
                    <span
                      key={klasse}
                      className={`inline-flex h-8 w-8 items-center justify-center rounded border text-sm ${
                        (p.energieeffizienzklasse ?? "B") === klasse
                          ? "border-amber-600 bg-amber-50 text-amber-800"
                          : "border-zinc-300 bg-zinc-50 text-zinc-500"
                      }`}
                    >
                      {klasse}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
          <div className="mt-6 overflow-hidden rounded-xl border border-zinc-200">
            <table className="w-full min-w-[280px]">
              <tbody>
                <DataRow label="Baujahr" value={p.energieBaujahr ?? baujahr} />
                <DataRow
                  label="Endenergieverbrauch"
                  value={
                    p.endenergieverbrauch != null
                      ? `${formatNumber(p.endenergieverbrauch)} kWh/(m²a)`
                      : "—"
                  }
                />
                <DataRow
                  label="Energieausweistyp"
                  value={
                    p.energieausweistyp
                      ? `${p.energieausweistyp}`
                      : "Gebrauchsausweis oder Bedarfsausweis"
                  }
                />
                <DataRow
                  label="Energieausweis gültig bis"
                  value={p.energieausweisGueltigBis ?? "01.01.2030"}
                />
                <DataRow
                  label="Energieeffizienzklasse"
                  value={p.energieeffizienzklasse ?? "B"}
                />
                <DataRow
                  label="Wesentlicher Energieträger"
                  value={
                    p.wesentlicherEnergietraeger ?? "Fernwärme (siehe Ausstattung)"
                  }
                />
              </tbody>
            </table>
          </div>
        </section>

        {/* 15. Hinweis */}
        <section className="mt-10 rounded-xl border border-amber-200 bg-amber-50/50 p-6">
          <p className="text-sm text-zinc-700 leading-relaxed">
            Bitte beachten Sie, dass alle Angaben ohne Gewähr sind und
            ausschließlich auf Informationen basieren, die uns von unserem
            Auftraggeber übermittelt wurden. Wir übernehmen keine Haftung für die
            Vollständigkeit, Richtigkeit und Aktualität dieser Angaben.
          </p>
        </section>

        {/* 16.–18. Exposé anfordern + Formular + Checkboxen + Absenden */}
        <section className="mt-12 rounded-2xl border border-zinc-200 bg-zinc-50/50 p-8">
          <h2 className="font-sans text-xl font-semibold text-zinc-900">
            Exposé anfordern
          </h2>
          <p className="mt-2 text-zinc-600">
            Kontaktdaten angeben – wir senden Ihnen das Exposé und stehen für
            Rückfragen zur Verfügung.
          </p>
          <div className="mt-8">
            <ExposeForm propertyTitle={p.titel} />
          </div>
        </section>
      </div>
    </>
  );
}
