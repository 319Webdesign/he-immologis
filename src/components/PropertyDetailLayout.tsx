import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Property } from "@/lib/onoffice";
import { PropertyImageSlider } from "./PropertyImageSlider";
import { PropertyQuickFactsBar } from "./PropertyQuickFactsBar";
import { PropertyTextSections } from "./PropertyTextSections";
import { PropertyMap } from "./PropertyMap";
import { PropertyContactWidget } from "./PropertyContactWidget";
import { ExposeRequestForm } from "./ExposeRequestForm";
import { PropertyActionIcons } from "@/app/[lang]/kaufen/[id]/PropertyDetailActions";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

function formatNumber(value: number | undefined | null): string {
  if (value == null) return "—";
  return new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}

interface KeyFact {
  label: string;
  value: string | number | null | undefined;
}

interface PropertyDetailLayoutProps {
  property: Property;
  locale: string;
  /** "kaufen" | "mieten" – für Navigation und Labels */
  section: "kaufen" | "mieten";
  backHref: string;
}

export function PropertyDetailLayout({
  property: p,
  locale,
  section,
  backHref,
}: PropertyDetailLayoutProps) {
  const isKaufen = section === "kaufen";
  const price = isKaufen ? p.kaufpreis : p.kaltmiete;
  const priceLabel = isKaufen ? "Kaufpreis" : "Kaltmiete";

  const images = [...(p.galerie ?? [])].filter(
    (src) => src && typeof src === "string"
  );

  const keyFacts: KeyFact[] = [
    {
      label: priceLabel,
      value:
        price != null && price > 0
          ? formatPrice(price)
          : null,
    },
    { label: "Wohnfläche", value: p.wohnflaeche != null ? `${formatNumber(p.wohnflaeche)} m²` : null },
    { label: "Zimmer", value: p.anzahl_zimmer },
    { label: "Baujahr", value: p.baujahr },
    { label: "Verfügbar ab", value: p.verfuegbar_ab },
    { label: "Provision", value: p.aussen_courtage ?? p.innen_courtage },
  ].filter((f) => f.value != null && f.value !== "");

  const textSections = [
    {
      id: "beschreibung",
      title: "Objektbeschreibung",
      content: p.objektbeschreibung,
    },
    {
      id: "ausstattung",
      title: "Ausstattung",
      content: p.ausstatt_beschr,
    },
    {
      id: "lage",
      title: "Lage",
      content: p.lage,
      hint: "Optimale Anbindung in der Region Rhein-Main",
    },
    {
      id: "sonstiges",
      title: "Sonstiges",
      content: p.sonstige_angaben,
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Link
          href={backHref}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-zinc-600 transition hover:text-zinc-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Zurück zur Übersicht
        </Link>

        {/* Hero: Slider + Titel */}
        <header className="mb-6">
          <PropertyImageSlider
            images={images}
            alt={p.titel || (isKaufen ? "Immobilie" : "Mietobjekt")}
            usePlaceholder
          />
          <h1 className="mt-6 font-sans text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
            {p.titel || "Ohne Titel"}
          </h1>
          {(p.ort || p.plz) && (
            <h2 className="mt-2 text-lg text-zinc-600">
              {[p.ort, p.plz].filter(Boolean).join(", ")}
            </h2>
          )}
          <div className="mt-4">
            <PropertyActionIcons
              propertyId={String(p.id)}
              propertyTitle={p.titel || (isKaufen ? "Immobilie" : "Mietobjekt")}
            />
          </div>
        </header>

        <PropertyQuickFactsBar
          price={price}
          priceLabel={priceLabel}
          wohnflaeche={p.wohnflaeche}
          anzahlZimmer={p.anzahl_zimmer}
        />

        {/* 2-Spalten-Layout */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Linke Spalte */}
          <main className="space-y-8">
            {/* Key-Facts Box */}
            {keyFacts.length > 0 && (
              <section className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
                <h2 className="mb-4 font-sans text-lg font-semibold text-zinc-900">
                  Übersicht
                </h2>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {keyFacts.map((fact, i) => (
                    <div key={i}>
                      <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                        {fact.label}
                      </p>
                      <p className="mt-1 font-medium text-zinc-900">
                        {typeof fact.value === "number"
                          ? formatNumber(fact.value)
                          : String(fact.value)}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Text-Sektionen (Akkordeon) */}
            <PropertyTextSections sections={textSections} />

            {/* Lagekarte */}
            <section>
              <h2 className="mb-4 font-sans text-lg font-semibold text-zinc-900">
                Lage
              </h2>
              <PropertyMap
                lat={p.breitengrad ?? null}
                lng={p.laengengrad ?? null}
                address={
                  [p.strasse, p.plz, p.ort].filter(Boolean).join(", ") || undefined
                }
              />
            </section>
          </main>

          {/* Rechte Spalte (sticky) */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
              <h2 className="font-sans text-lg font-semibold text-zinc-900">
                {isKaufen ? "Exposé anfordern" : "Unterlagen anfordern"}
              </h2>
              <div className="mt-6">
                <ExposeRequestForm
                  objectNumber={p.displayId ?? String(p.id)}
                  estateId={p.estateIdForContact === null ? undefined : (p.estateIdForContact ?? p.id)}
                  propertyTitle={p.titel || (isKaufen ? "Immobilie" : "Mietobjekt")}
                />
              </div>
            </div>

            <PropertyContactWidget
              propertyTitle={p.titel || undefined}
              subjectPrefix={isKaufen ? "Kaufanfrage" : "Mietanfrage"}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}
