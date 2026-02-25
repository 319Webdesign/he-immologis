import Link from "next/link";
import {
  ArrowLeft,
  BedDouble,
  Bath,
  LayoutGrid,
  TreeDeciduous,
  DoorOpen,
  Info,
} from "lucide-react";
import type { Property } from "@/lib/onoffice";
import { PropertyImageSlider } from "./PropertyImageSlider";
import { PropertyMap } from "./PropertyMap";
import { PropertyContactWidget } from "./PropertyContactWidget";
import { ExposeRequestForm } from "./ExposeRequestForm";
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

function capitalizeObjektart(s?: string | null): string | null {
  if (!s) return null;
  const t = s.trim().toLowerCase();
  return t ? t.charAt(0).toUpperCase() + t.slice(1) : s;
}

/** Energieeffizienz-Balken A+ bis H zur Veranschaulichung */
const ENERGY_CLASSES = [
  { id: "A+", color: "bg-emerald-500" },
  { id: "A", color: "bg-emerald-400" },
  { id: "B", color: "bg-green-400" },
  { id: "C", color: "bg-lime-400" },
  { id: "D", color: "bg-yellow-400" },
  { id: "E", color: "bg-amber-400" },
  { id: "F", color: "bg-orange-400" },
  { id: "G", color: "bg-orange-500" },
  { id: "H", color: "bg-red-500" },
] as const;

function EnergieSkala({
  currentClass,
  kennwert,
}: {
  currentClass: string | null | undefined;
  kennwert: number | null | undefined;
}) {
  const normalized = (currentClass ?? "")
    .toUpperCase()
    .replace(/[^A-H+]/g, "");
  const activeId =
    ENERGY_CLASSES.find((c) => normalized.startsWith(c.id))?.id ?? null;

  return (
    <div className="mt-8 space-y-3">
      <div className="flex gap-0.5">
        {ENERGY_CLASSES.map((c) => (
          <div
            key={c.id}
            className={`h-8 flex-1 rounded-sm ${c.color} ${
              activeId === c.id ? "ring-2 ring-zinc-900 ring-offset-1" : ""
            }`}
            title={c.id}
          />
        ))}
      </div>
      {activeId && (kennwert != null || currentClass) && (
        <div className="flex items-center justify-center gap-2">
          <span className="rounded bg-zinc-900 px-3 py-1 text-sm font-medium text-white">
            {kennwert != null
              ? `${formatNumber(kennwert)} kWh/(m²a)`
              : currentClass ?? activeId}
          </span>
        </div>
      )}
    </div>
  );
}

/** Tabellenzeile: Label links, Wert rechts (Parent nutzt divide-y für Trennlinien) */
function DataRow({
  label,
  value,
  children,
}: {
  label: string;
  value?: string | number | null;
  children?: React.ReactNode;
}) {
  const display = value != null && value !== "" ? String(value) : "—";
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <span className="text-sm text-zinc-600">{label}</span>
      {children ?? <span className="text-right text-sm font-medium text-zinc-900">{display}</span>}
    </div>
  );
}

interface PropertyDetailLayoutProps {
  property: Property;
  locale: string;
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
  const objectNumber = p.displayId ?? String(p.id);

  const images = [...(p.galerie ?? [])].filter(
    (src) => src && typeof src === "string"
  );

  const energieKennwert =
    p.endenergiebedarf ?? p.energieverbrauchskennwert ?? null;

  const hasPrice = price != null && price > 0;
  const priceDisplay = hasPrice
    ? formatPrice(price)
    : isKaufen
      ? "Preis auf Anfrage"
      : "Miete auf Anfrage";

  const gesamtflaeche =
    p.wohnflaeche != null && p.nutzflaeche != null
      ? p.wohnflaeche + p.nutzflaeche
      : p.wohnflaeche ?? p.nutzflaeche;

  const breadcrumbParts = ["Deutschland"];
  if (p.ort) breadcrumbParts.push(p.ort);
  else if (p.plz) breadcrumbParts.push(p.plz);

  const heroFacts: { icon: typeof DoorOpen; value: number; fmt: (v: number) => string }[] = [];
  if (p.anzahl_zimmer != null && p.anzahl_zimmer > 0) {
    heroFacts.push({
      icon: DoorOpen,
      value: p.anzahl_zimmer,
      fmt: (v) => `${formatNumber(v)} Zimmer`,
    });
  }
  if (p.anzahl_schlafzimmer != null && p.anzahl_schlafzimmer > 0) {
    heroFacts.push({
      icon: BedDouble,
      value: p.anzahl_schlafzimmer,
      fmt: (v) => `${formatNumber(v)} Schlafzimmer`,
    });
  }
  if (p.anzahl_badezimmer != null && p.anzahl_badezimmer > 0) {
    heroFacts.push({
      icon: Bath,
      value: p.anzahl_badezimmer,
      fmt: (v) => `${formatNumber(v)} Badezimmer`,
    });
  }
  if (gesamtflaeche != null && gesamtflaeche > 0 && gesamtflaeche !== p.wohnflaeche) {
    heroFacts.push({
      icon: LayoutGrid,
      value: gesamtflaeche,
      fmt: (v) => `~${formatNumber(v)} m² Gesamtfläche`,
    });
  }
  if (p.wohnflaeche != null && p.wohnflaeche > 0) {
    heroFacts.push({
      icon: LayoutGrid,
      value: p.wohnflaeche,
      fmt: (v) => `~${formatNumber(v)} m² Wohnfläche`,
    });
  }
  if (p.grundstuecksflaeche != null && p.grundstuecksflaeche > 0) {
    heroFacts.push({
      icon: TreeDeciduous,
      value: p.grundstuecksflaeche,
      fmt: (v) => `~${formatNumber(v)} m² Grundstücksfläche`,
    });
  }

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

        {/* Bildergalerie (über dem Hero) */}
        <div className="mb-8">
          <PropertyImageSlider
            images={images}
            alt={p.titel || (isKaufen ? "Immobilie" : "Mietobjekt")}
            usePlaceholder
          />
        </div>

        {/* Hero: Titel + wichtigste Infos links, Kontakt rechts */}
        <header className="mb-6 grid gap-8 lg:grid-cols-[1fr_400px] lg:items-start">
          <div className="min-w-0">
            {/* Breadcrumbs */}
            {breadcrumbParts.length > 1 && (
              <nav
                className="mb-4 text-sm text-zinc-600"
                aria-label="Breadcrumb"
              >
                {breadcrumbParts.map((part, i) => (
                  <span key={i}>
                    {i > 0 && <span className="mx-1.5">&gt;</span>}
                    <span>{part}</span>
                  </span>
                ))}
              </nav>
            )}

            <h1 className="font-sans text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl lg:text-4xl">
              {p.titel || "Ohne Titel"}
            </h1>

            <p className="mt-4 text-xl font-semibold text-zinc-800">
              {priceDisplay}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-zinc-600">
              {heroFacts.map(({ icon: Icon, value, fmt }, i) => (
                <span key={i} className="flex items-center gap-2">
                  <Icon className="h-4 w-4 shrink-0 text-zinc-500" />
                  {fmt(value)}
                </span>
              ))}
            </div>

          </div>

          <aside className="lg:sticky lg:top-24">
            <PropertyContactWidget
              propertyTitle={p.titel || undefined}
              subjectPrefix={isKaufen ? "Kaufanfrage" : "Mietanfrage"}
            />
          </aside>
        </header>

        <div className="my-8 border-b border-zinc-400" aria-hidden />

        {p.objektbeschreibung?.trim() && (
          <section className="mt-12">
            <h2 className="mb-4 font-sans text-xl font-semibold text-zinc-900">
              Beschreibung
            </h2>
            <div className="whitespace-pre-line text-zinc-600 leading-relaxed [&>p]:mb-4">
              {p.objektbeschreibung.trim()}
            </div>
          </section>
        )}

        <div className="mt-8">
          <div className="min-w-0 space-y-8">
        {/* Sektion: Objektdetails */}
        <section>
          <h2 className="mb-5 font-sans text-xl font-semibold text-zinc-900">
            Objektdetails
          </h2>
          <div className="grid gap-8 sm:grid-cols-2">
            <div className="divide-y divide-zinc-200 rounded-lg border border-zinc-200/80 bg-white px-4 py-1 sm:px-5">
              <DataRow label="Objektart" value={capitalizeObjektart(p.objektart)} />
              <DataRow
                label="Zimmer"
                value={p.anzahl_zimmer != null ? formatNumber(p.anzahl_zimmer) : null}
              />
              <DataRow
                label="Schlafzimmer"
                value={p.anzahl_schlafzimmer != null ? formatNumber(p.anzahl_schlafzimmer) : null}
              />
              <DataRow
                label="Badezimmer"
                value={p.anzahl_badezimmer != null ? formatNumber(p.anzahl_badezimmer) : null}
              />
            </div>
            <div className="divide-y divide-zinc-200 rounded-lg border border-zinc-200/80 bg-white px-4 py-1 sm:px-5">
              <DataRow
                label="Gesamtfläche"
                value={gesamtflaeche != null ? `~${formatNumber(gesamtflaeche)} m²` : null}
              />
              <DataRow
                label="Wohnfläche"
                value={p.wohnflaeche != null ? `~${formatNumber(p.wohnflaeche)} m²` : null}
              />
              <DataRow
                label="Grundstücksfläche"
                value={
                  p.grundstuecksflaeche != null
                    ? `~${formatNumber(p.grundstuecksflaeche)} m²`
                    : null
                }
              />
              <DataRow
                label="Nutzfläche"
                value={p.nutzflaeche != null ? `~${formatNumber(p.nutzflaeche)} m²` : null}
              />
            </div>
          </div>
        </section>

        {/* Sektion: Energieausweis */}
        {(p.energyClass ?? p.energieausweistyp ?? p.energietraeger ?? p.baujahr ?? energieKennwert != null) && (
          <section>
            <h2 className="mb-5 font-sans text-xl font-semibold text-zinc-900">
              Energieausweis
            </h2>
            <div className="grid gap-8 sm:grid-cols-2">
              <div className="divide-y divide-zinc-200 rounded-lg border border-zinc-200/80 bg-white px-4 py-1 sm:px-5">
                <DataRow
                  label="Baujahr"
                  value={p.baujahr != null ? formatNumber(p.baujahr) : null}
                />
                <DataRow label="Energieeffizienzklasse">
                  {p.energyClass ? (
                    <span className="flex items-center gap-2">
                      <span className="inline-flex items-center rounded bg-green-500/20 px-2 py-0.5 text-sm font-medium text-green-800">
                        {p.energyClass}
                      </span>
                      <Info className="h-4 w-4 shrink-0 text-zinc-400" aria-hidden />
                    </span>
                  ) : (
                    <span>—</span>
                  )}
                </DataRow>
                <DataRow
                  label="Energieausweis vorhanden"
                  value={
                    p.energyClass ?? p.energieausweistyp ?? energieKennwert != null
                      ? "Ja"
                      : null
                  }
                />
              </div>
              <div className="divide-y divide-zinc-200 rounded-lg border border-zinc-200/80 bg-white px-4 py-1 sm:px-5">
                <DataRow label="Art des Energieausweises" value={p.energieausweistyp} />
                <DataRow
                  label="Endenergieverbrauch"
                  value={
                    energieKennwert != null
                      ? `${formatNumber(energieKennwert)} kWh/m²a`
                      : null
                  }
                />
                <DataRow
                  label="Energieträger"
                  value={p.energietraeger ?? p.befeuerung}
                />
              </div>
            </div>
            {(p.energyClass ?? energieKennwert != null) && (
              <EnergieSkala
                currentClass={p.energyClass}
                kennwert={energieKennwert}
              />
            )}
          </section>
        )}

        {/* Ausstattung, Lage, Sonstiges */}
        {(p.ausstatt_beschr?.trim() || p.lage?.trim() || p.sonstige_angaben?.trim()) && (
        <section className="divide-y divide-zinc-200 rounded-lg border border-zinc-200/80 bg-white px-4 py-3 sm:px-5">
          {p.ausstatt_beschr?.trim() && (
            <div className="py-3 first:pt-0">
              <h2 className="mb-2 font-sans text-lg font-semibold text-zinc-900">
                Ausstattung
              </h2>
              <div className="whitespace-pre-line text-sm leading-relaxed text-zinc-600 [&>p]:mb-1.5 last:[&>p]:mb-0">
                {p.ausstatt_beschr.trim()}
              </div>
            </div>
          )}
          {p.lage?.trim() && (
            <div className="py-3">
              <h2 className="mb-2 font-sans text-lg font-semibold text-zinc-900">
                Lage
              </h2>
              <div className="whitespace-pre-line text-sm leading-relaxed text-zinc-600 [&>p]:mb-1.5 last:[&>p]:mb-0">
                {p.lage.trim()}
              </div>
            </div>
          )}
          {p.sonstige_angaben?.trim() && (
            <div className="py-3 last:pb-0">
              <h2 className="mb-2 font-sans text-lg font-semibold text-zinc-900">
                Sonstiges
              </h2>
              <div className="whitespace-pre-line text-sm leading-relaxed text-zinc-600 [&>p]:mb-1.5 last:[&>p]:mb-0">
                {p.sonstige_angaben.trim()}
              </div>
            </div>
          )}
        </section>
        )}

        {/* Lagekarte */}
        <section>
          <h2 className="mb-5 font-sans text-xl font-semibold text-zinc-900">
            Lage
          </h2>
          <div className="max-w-xl">
          <PropertyMap
            lat={p.breitengrad ?? null}
            lng={p.laengengrad ?? null}
            address={
              [p.strasse, p.plz, p.ort].filter(Boolean).join(", ") || undefined
            }
          />
          </div>
        </section>

        {/* Exposé anfordern */}
        <section id="expose-anfordern" className="mt-32 scroll-mt-20 flex flex-col items-center">
          <div className="w-full max-w-xl rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
          <h2 className="font-sans text-lg font-semibold text-zinc-900">
            {isKaufen ? "Exposé anfordern" : "Unterlagen anfordern"}
          </h2>
          <p className="mt-2 text-sm text-zinc-600">
            Um Ihr Exposé zu Immobilie {objectNumber} zu erhalten, bestätigen
            Sie bitte kurz den Verzicht auf Widerspruch und tragen Sie Ihre
            Kontaktdaten ein.
          </p>
          <div className="mt-6">
            <ExposeRequestForm
              objectNumber={objectNumber}
              estateId={
                p.estateIdForContact === null
                  ? undefined
                  : (p.estateIdForContact ?? p.id)
              }
              propertyTitle={p.titel || (isKaufen ? "Immobilie" : "Mietobjekt")}
              hideIntro
              locale={locale}
            />
          </div>
          </div>

          {/* Rechtliche und konditionale Hinweise */}
          <div className="mt-12 w-full max-w-xl space-y-8 text-sm text-zinc-600">
            <div>
              <h3 className="mb-2 font-sans font-semibold text-zinc-900">Geldwäschegesetz (GwG)</h3>
              <p className="mb-2 leading-relaxed">
                Die HE immologis UG (haftungsbeschränkt) i. Gr. ist als Immobilienmakler gemäß § 2 Abs. 1 Nr. 14 sowie § 10 Abs. 3 Geldwäschegesetz (GwG) verpflichtet, bei Aufnahme einer Geschäftsbeziehung die Identität des Vertragspartners festzustellen und zu überprüfen.
              </p>
              <p className="mb-2 leading-relaxed">
                Dazu erfassen wir nach § 11 GwG die relevanten Daten Ihres gültigen Personalausweises, sofern Sie als natürliche Person handeln – beispielsweise durch Anfertigung einer Kopie.
              </p>
              <p className="mb-2 leading-relaxed">
                Handeln Sie im Namen einer juristischen Person, benötigen wir einen aktuellen Handelsregisterauszug, aus dem der wirtschaftlich Berechtigte hervorgeht.
              </p>
              <p className="leading-relaxed">
                Das Gesetz verpflichtet uns, diese Unterlagen für die Dauer von fünf Jahren aufzubewahren.
              </p>
            </div>

            {isKaufen && (
              <div>
                <h3 className="mb-2 font-sans font-semibold text-zinc-900">Kaufnebenkosten</h3>
                <p className="mb-2 leading-relaxed">
                  Die Kosten für den notariellen Kaufvertrag, dessen Abwicklung im Grundbuch sowie die Grunderwerbsteuer trägt der Käufer.
                </p>
                <p className="leading-relaxed">
                  Die Grunderwerbsteuer beträgt derzeit:
                </p>
                <ul className="mt-1 list-inside list-disc space-y-0.5 pl-1">
                  <li>5 % in Baden-Württemberg und 6 % in Hessen.</li>
                </ul>
              </div>
            )}

            <div>
              <h3 className="mb-2 font-sans font-semibold text-zinc-900">Angebotsbedingungen</h3>
              <p className="mb-2 leading-relaxed">
                Unsere Immobilienangebote sind freibleibend und basieren auf den ortsüblichen Maklerkonditionen.
              </p>
              <p className="mb-2 leading-relaxed">
                Für die Richtigkeit der Angaben übernehmen wir keine Gewähr. Die Informationen wurden uns vom Eigentümer bzw. Auftraggeber zur Verfügung gestellt und ohne Haftung für Vollständigkeit und Richtigkeit weitergegeben.
              </p>
              <p className="mb-2 leading-relaxed">
                Dieses Exposé ist ausschließlich für den vorgesehenen Empfänger bestimmt. Eine Weitergabe an Dritte kann Schadenersatzansprüche auslösen.
              </p>
              <p className="leading-relaxed">
                Die Immobilie wird im Kundenauftrag und auf Grundlage unserer Geschäftsbedingungen freibleibend zur Vermietung angeboten.
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-sans font-semibold text-zinc-900">Provision</h3>
              {isKaufen ? (
                <>
                  <p className="mb-2 leading-relaxed">
                    Die Käuferprovision beträgt 3,57 % inklusive gesetzlicher Mehrwertsteuer.
                  </p>
                  <p className="leading-relaxed">
                    Gemäß den seit dem 23.12.2020 geltenden gesetzlichen Regelungen zur Aufteilung der Maklerprovision wird diese in der Regel hälftig zwischen Verkäufer und Käufer geteilt.
                    Somit beträgt die Provision für beide Parteien jeweils 3 % zzgl. der jeweils gültigen Mehrwertsteuer – derzeit insgesamt 3,57 % des Kaufpreises – und ist mit notariellem Vertragsabschluss verdient und fällig.
                  </p>
                </>
              ) : (
                <>
                  <p className="mb-2 leading-relaxed">
                    Die Provision für die Maklertätigkeit beträgt 2 Netto-Kaltmieten zzgl. MwSt.
                  </p>
                  <p className="leading-relaxed">
                    Gemäß den seit dem 1.6.2015 geltenden gesetzlichen Regelungen – Bestellerprinzip – trägt derjenige die Provision, der den Makler beauftragt hat.
                  </p>
                </>
              )}
            </div>
          </div>
        </section>
          </div>
        </div>
      </div>
    </div>
  );
}
