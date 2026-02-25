import type { Property } from "@/lib/onoffice";
import type { PropertyWithDetails } from "@/types";

/**
 * Mappt statische PropertyWithDetails auf das Property-Interface (onoffice).
 * Verwendet für die Kaufen-Detailseite bei nicht-numerischen IDs.
 */
export function staticPropertyToProperty(
  p: PropertyWithDetails,
  idOverride?: string
): Property {
  const idStr = idOverride ?? p.id;
  const numId = parseInt(idStr, 10);
  const images = [
    p.vorschaubild,
    ...(p.galerie ?? []),
  ].filter((src): src is string => !!src && src.length > 0);

  return {
    id: Number.isNaN(numId) ? 0 : numId,
    displayId: p.immoNr ?? p.id,
    estateIdForContact: null,
    titel: p.titel ?? "",
    kaufpreis: p.preis ?? null,
    kaltmiete: null,
    wohnflaeche: p.quadratmeter ?? null,
    ort: p.ort ?? null,
    plz: p.plz ?? null,
    objektbeschreibung: p.beschreibung ?? null,
    dreizeiler: null,
    lage: p.beschreibungLage ?? null,
    sonstige_angaben: null,
    ausstatt_beschr: null,
    nebenkosten: p.nebenkosten ?? null,
    heizkosten: null,
    kaution: null,
    warmmiete: null,
    anzahl_zimmer: p.zimmer ?? null,
    anzahl_badezimmer: null,
    etage: p.etage ?? null,
    baujahr: p.baujahr ?? null,
    nutzflaeche: p.nutzflaeche ?? null,
    grundstuecksflaeche: p.grundstuecksflaeche ?? null,
    verfuegbar_ab: p.verfuegbarAb ?? null,
    aussen_courtage: p.aussenprovision != null ? `${p.aussenprovision} %` : null,
    innen_courtage: null,
    hausgeld: null,
    strasse: p.strasse ?? null,
    breitengrad: null,
    laengengrad: null,
    objektart: p.objektart ?? p.objekttyp ?? null,
    galerie: images.length > 0 ? images : null,
  };
}
