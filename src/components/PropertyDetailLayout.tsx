import Link from "next/link";
import {
  ArrowLeft,
  BedDouble,
  Bath,
  LayoutGrid,
  TreeDeciduous,
  DoorOpen,
  Info,
  Check,
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

function formatArea(value: number | undefined | null): string {
  if (value == null) return "—";
  const formatted = new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
  return `ca. ${formatted} m²`;
}

function formatYear(value: number | undefined | null): string {
  if (value == null) return "—";
  return new Intl.NumberFormat("de-DE", {
    useGrouping: false,
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

/** Boolean → "Ja" / "Nein" */
function formatBoolean(value: boolean | null | undefined): string | null {
  if (value === null || value === undefined) return null;
  return value ? "Ja" : "Nein";
}

/** Provision/Courtage: Prozent oder Euro */
function formatCourtage(value: string | number | undefined | null): string | null {
  if (value == null || value === "") return null;
  if (typeof value === "string") return value.trim() || null;
  if (typeof value === "number") {
    if (value >= 100) {
      return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value);
    }
    return new Intl.NumberFormat("de-DE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value) + " %";
  }
  return null;
}

/** Haustiere: Text/Zahl normalisieren (ja/nein/nach Vereinbarung) */
function formatHaustiere(value: string | number | null | undefined): string | null {
  if (value === null || value === undefined) return null;
  if (typeof value === "number") {
    if (value === 1) return "Ja";
    if (value === 0) return "Nein";
    return null;
  }
  const t = value.trim().toLowerCase();
  if (!t) return null;
  if (/^ja$|^yes$|^1$/.test(t)) return "Ja";
  if (/^nein$|^no$|^0$/.test(t)) return "Nein";
  if (/nach\s*vereinbarung|vereinbarung/i.test(t)) return "Nach Vereinbarung";
  return value.trim();
}

/** Balkon/Terrassen: Boolean → Ja/Nein, Zahl → Anzahl */
function formatBalkonTerrassen(value: boolean | number | null | undefined): string | null {
  if (value === null || value === undefined) return null;
  if (typeof value === "boolean") return value ? "Ja" : "Nein";
  if (typeof value === "number" && value >= 0) return String(value);
  return null;
}

/** Datum parsen und formatiert anzeigen (nur wenn gültiges Datum) */
function formatDateDE(value: string | null | undefined): string | null {
  if (!value || typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  const d = new Date(trimmed);
  if (Number.isNaN(d.getTime())) return null;
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(d);
}

/** Distanz mit 2 Nachkommastellen + km (z. B. 0,80 km) */
function formatDistance(value: number | null | undefined): string | null {
  if (value == null) return null;
  const formatted = new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
  return `${formatted} km`;
}

function capitalizeObjektart(s?: string | null): string | null {
  if (!s) return null;
  const t = s.trim().toLowerCase();
  return t ? t.charAt(0).toUpperCase() + t.slice(1) : s;
}

/** Mappt API-Werte (z. B. erdwaerme) auf lesbare deutsche Bezeichnungen (Erdwärme) */
const ENERGIE_MAP: Record<string, string> = {
  erdwaerme: "Erdwärme",
  erdwärme: "Erdwärme",
  gas: "Gas",
  oel: "Öl",
  öl: "Öl",
  strom: "Strom",
  holz: "Holz",
  fernwaerme: "Fernwärme",
  fernwärme: "Fernwärme",
  luftwaerme: "Luftwärme",
  luftwärme: "Luftwärme",
  solar: "Solar",
  waermepumpe: "Wärmepumpe",
  wärmepumpe: "Wärmepumpe",
};

function formatEnergietraeger(s?: string | null): string | null {
  if (!s) return null;
  const t = s.trim();
  if (!t) return null;
  const lower = t.toLowerCase();
  return ENERGIE_MAP[lower] ?? t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
}

/** Mappt API-Wert für Art des Energieausweises: Endenergiebedarf → Bedarfsausweis, etc. */
function formatEnergieausweistyp(s?: string | null): string | null {
  if (!s) return null;
  const t = s.trim();
  if (!t) return null;
  const lower = t.toLowerCase();
  if (lower === "endenergiebedarf") return "Bedarfsausweis";
  if (lower === "energieverbrauchskennwert" || lower === "verbrauch") return "Verbrauchsausweis";
  if (lower === "bedarfsausweis" || lower === "verbrauchsausweis" || lower === "gebrauchsausweis") {
    return t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
  }
  return t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
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
    <div className="mt-8 w-full max-w-3xl space-y-3">
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
    <div className="flex items-center justify-between gap-3 py-2">
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
  const objectNumber = p.objektnr_extern ?? p.displayId ?? String(p.id);

  const images = [...(p.galerie ?? [])].filter(
    (src) => src && typeof src === "string"
  );

  const verbrauch = typeof p.energieverbrauchskennwert === "number" ? p.energieverbrauchskennwert : null;
  const bedarf = typeof p.endenergiebedarf === "number" ? p.endenergiebedarf : null;
  const finalEnergyValue = (verbrauch != null && verbrauch > 0) ? verbrauch : bedarf;
  const finalEnergyValueNum = finalEnergyValue != null && finalEnergyValue > 0 ? Number(finalEnergyValue) : null;
  const displayEnergyValue =
    finalEnergyValueNum != null
      ? `${new Intl.NumberFormat("de-DE", { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(finalEnergyValueNum)} kWh/(m²·a)`
      : "Nicht angegeben";
  const energieKennwert = finalEnergyValueNum;
  const energyValueFromVerbrauch = (verbrauch != null && verbrauch > 0);

  const hasPrice = price != null && price > 0;
  const priceDisplay = hasPrice
    ? formatPrice(price)
    : isKaufen
      ? "Preis auf Anfrage"
      : "Miete auf Anfrage";

  const hasKaltmiete = !isKaufen && p.kaltmiete != null && p.kaltmiete > 0;
  const hasNebenkosten = !isKaufen && p.nebenkosten != null && p.nebenkosten > 0;

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
      fmt: (v) => `${formatArea(v)} Gesamtfläche`,
    });
  }
  if (p.wohnflaeche != null && p.wohnflaeche > 0) {
    heroFacts.push({
      icon: LayoutGrid,
      value: p.wohnflaeche,
      fmt: (v) => `${formatArea(v)} Wohnfläche`,
    });
  }
  if (p.grundstuecksflaeche != null && p.grundstuecksflaeche > 0) {
    heroFacts.push({
      icon: TreeDeciduous,
      value: p.grundstuecksflaeche,
      fmt: (v) => `${formatArea(v)} Grundstücksfläche`,
    });
  }

  const infrastrukturRows = [
    { key: "distanz_kindergarten", label: "Dist. Kindergarten", value: formatDistance(p.distanz_kindergarten) },
    { key: "distanz_grundschule", label: "Dist. Grundschule", value: formatDistance(p.distanz_grundschule) },
    { key: "distanz_realschule", label: "Dist. Realschule", value: formatDistance(p.distanz_realschule) },
    { key: "distanz_gymnasium", label: "Dist. Gymnasium", value: formatDistance(p.distanz_gymnasium) },
    { key: "distanz_autobahn", label: "Dist. Autobahn", value: formatDistance(p.distanz_autobahn) },
    { key: "distanz_zentrum", label: "Dist. Zentrum", value: formatDistance(p.distanz_zentrum) },
  ].filter((row) => row.value != null);

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

            {isKaufen ? (
              <p className="mt-4 text-xl font-semibold text-zinc-800">
                {priceDisplay}
              </p>
            ) : (
              <div className="mt-4 space-y-1">
                <p className="text-xl font-semibold text-zinc-800">
                  Kaltmiete {hasKaltmiete ? formatPrice(p.kaltmiete!) : "auf Anfrage"}
                </p>
                <p className="text-base font-medium text-zinc-700">
                  Nebenkosten {hasNebenkosten ? formatPrice(p.nebenkosten!) : "auf Anfrage"}
                </p>
              </div>
            )}

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
          <section className="mx-auto mt-12 w-full max-w-3xl">
            <h2 className="mb-4 font-sans text-xl font-semibold text-zinc-900">
              Beschreibung
            </h2>
            <div className="whitespace-pre-line text-zinc-600 leading-relaxed [&>p]:mb-4">
              {p.objektbeschreibung.trim()}
            </div>
          </section>
        )}

        <div className="mt-8 flex flex-col items-center">
          <div className="flex min-w-0 flex-col items-center space-y-8">
        {/* Sektion: Objektdetails */}
        <section className="w-full max-w-3xl">
          <h2 className="mb-5 font-sans text-xl font-semibold text-zinc-900">
            Objektdetails
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="divide-y divide-zinc-200 rounded-lg border border-zinc-200/80 bg-white px-3 py-1 sm:px-4">
              <DataRow label="Objektnummer" value={p.objektnr_extern || objectNumber} />
              <DataRow label="Objektart" value={capitalizeObjektart(p.objektart)} />
              <DataRow label="Zustand" value={p.zustand?.trim() || null} />
              <DataRow label="Ort" value={p.ort?.trim() || null} />
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
              <DataRow label="Verfügbar ab" value={p.verfuegbar_ab?.trim() || null} />
              <DataRow label="Terrassen" value={formatBalkonTerrassen(p.terrassen) ?? formatBalkonTerrassen(p.anzahl_terrassen) ?? "Nein"} />
              <DataRow label="Balkon" value={formatBalkonTerrassen(p.balkon) ?? formatBalkonTerrassen(p.anzahl_balkone) ?? "Nein"} />
              <DataRow label="Barrierefrei" value={formatBoolean(p.barrierefrei) ?? "Nein"} />
              <DataRow label="Denkmalschutz" value={formatBoolean(p.denkmalschutzobjekt) ?? "Nein"} />
              <DataRow label="Haustiere" value={formatHaustiere(p.haustiere)} />
              <DataRow
                label="Stellplätze"
                value={p.anzahl_stellplaetze != null ? (p.anzahl_stellplaetze === 0 ? "Nein" : formatNumber(p.anzahl_stellplaetze)) : null}
              />
              {!isKaufen && (
                <>
                  <DataRow label="Gewerbliche Nutzung">
                    {p.gewerbliche_nutzung === true || p.gewerbliche_nutzung === 1 ? (
                      <span className="inline-flex items-center gap-1.5 text-right text-sm font-medium text-green-700">
                        <Check className="h-5 w-5 shrink-0 text-green-600" aria-hidden />
                        Ja
                      </span>
                    ) : p.gewerbliche_nutzung === false || p.gewerbliche_nutzung === 0 ? (
                      <span className="text-right text-sm font-medium text-zinc-900">Nein</span>
                    ) : (
                      <span className="text-right text-sm font-medium text-zinc-500">—</span>
                    )}
                  </DataRow>
                  <DataRow label="Aktuell vermietet" value={formatBoolean(p.vermietet) ?? "—"} />
                </>
              )}
            </div>
            <div className="divide-y divide-zinc-200 rounded-lg border border-zinc-200/80 bg-white px-3 py-1 sm:px-4">
              <DataRow
                label="Gesamtfläche"
                value={gesamtflaeche != null ? formatArea(gesamtflaeche) : null}
              />
              <DataRow
                label="Wohnfläche"
                value={p.wohnflaeche != null ? formatArea(p.wohnflaeche) : null}
              />
              <DataRow
                label="Grundstücksfläche"
                value={
                  p.grundstuecksflaeche != null
                    ? formatArea(p.grundstuecksflaeche)
                    : null
                }
              />
              <DataRow
                label="Nutzfläche"
                value={p.nutzflaeche != null ? formatArea(p.nutzflaeche) : null}
              />
              {isKaufen && (
                <DataRow
                  label="Kaufpreis"
                  value={p.kaufpreis != null && p.kaufpreis > 0 ? formatPrice(p.kaufpreis) : "auf Anfrage"}
                />
              )}
              <DataRow
                label="Provision"
                value={formatCourtage(p.aussen_courtage)}
              />
            </div>
          </div>
        </section>

        {/* Sektion: Energieausweis */}
        {(p.energyClass ?? p.energieausweistyp ?? p.energietraeger ?? p.baujahr ?? energieKennwert != null) && (
          <section className="w-full max-w-3xl">
            <h2 className="mb-5 font-sans text-xl font-semibold text-zinc-900">
              Energieausweis
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="divide-y divide-zinc-200 rounded-lg border border-zinc-200/80 bg-white px-3 py-1 sm:px-4">
                <DataRow
                  label="Baujahr"
                  value={p.baujahr != null ? formatYear(p.baujahr) : null}
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
              <div className="divide-y divide-zinc-200 rounded-lg border border-zinc-200/80 bg-white px-3 py-1 sm:px-4">
                <DataRow label="Art des Energieausweises" value={formatEnergieausweistyp(p.energieausweistyp)} />
                <DataRow
                  label={energyValueFromVerbrauch ? "Energieverbrauchskennwert" : finalEnergyValueNum != null ? "Endenergiebedarf" : "Energiekennwert"}
                  value={displayEnergyValue}
                />
                <DataRow
                  label="Energieträger"
                  value={formatEnergietraeger(p.energietraeger ?? p.befeuerung)}
                />
                {formatDateDE(p.ev71_pass_valid_until) != null && (
                  <DataRow
                    label="Energieausweis gültig bis"
                    value={formatDateDE(p.ev71_pass_valid_until)}
                  />
                )}
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
        <section className="w-full max-w-3xl divide-y divide-zinc-200 rounded-lg border border-zinc-200/80 bg-white px-4 py-3 sm:px-5">
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
        <section className="w-full max-w-3xl">
          <h2 className="mb-5 font-sans text-xl font-semibold text-zinc-900">
            Lage
          </h2>
          <div>
          <PropertyMap
            lat={p.breitengrad ?? null}
            lng={p.laengengrad ?? null}
            address={
              [p.strasse, p.plz, p.ort].filter(Boolean).join(", ") || undefined
            }
          />
          </div>
        </section>

        {/* Infrastruktur */}
        {infrastrukturRows.length > 0 && (
          <section className="w-full max-w-3xl">
            <h2 className="mb-5 font-sans text-xl font-semibold text-zinc-900">
              Infrastruktur
            </h2>
            <div className="overflow-hidden rounded-lg border border-zinc-200/80 bg-white">
              {infrastrukturRows.map((row, index) => (
                <div
                  key={row.key}
                  className={`flex items-center justify-between px-4 py-3 sm:px-5 ${index % 2 === 0 ? "bg-white" : "bg-zinc-50/80"}`}
                >
                  <span className="text-sm text-zinc-600">{row.label}</span>
                  <span className="text-sm font-medium text-zinc-900">{row.value}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Exposé anfordern */}
        <section id="expose-anfordern" className="mt-8 scroll-mt-20 flex flex-col items-center">
          <div className="w-full max-w-xl rounded-xl border border-zinc-200 bg-[#4682B4] p-5 shadow-sm">
          <h2 className="font-sans text-lg font-semibold text-white">
            Exposé anfordern
          </h2>
          <p className="mt-2 text-sm text-white/90">
            Für den Erhalt des Exposés zur Immobilie {objectNumber} bitten wir
            Sie, Ihr Interesse kurz zu bestätigen und Ihre Kontaktdaten
            einzutragen.
          </p>
          <div className="mt-6">
            <ExposeRequestForm
              lightLabels
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
            {isKaufen && (
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
            )}

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
