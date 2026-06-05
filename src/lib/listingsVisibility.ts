/**
 * Öffentliche Angebotslisten (Kaufen/Mieten) und Exposé-Seiten.
 * onOffice bleibt angebunden: fetch läuft weiter, nur die Darstellung wird unterdrückt, solange nicht explizit freigegeben.
 *
 * Listings wieder sichtbar machen: PROPERTY_LISTINGS_PUBLIC=true (z. B. .env.local oder Hosting-Env).
 * Nur bestimmte Objekte anzeigen: PROPERTY_LISTINGS_WHITELIST=ETW-K-2026-5-001 (Komma-getrennt, optional).
 */
export function arePropertyListingsPubliclyVisible(): boolean {
  const v = process.env.PROPERTY_LISTINGS_PUBLIC?.trim().toLowerCase();
  return v === "true" || v === "1" || v === "yes";
}

export type ListingPropertyRef = {
  id?: number | string | null;
  objektnr_extern?: string | null;
  displayId?: string | null;
};

function propertyListingKeys(property: ListingPropertyRef): string[] {
  return [property.objektnr_extern, property.displayId, property.id != null ? String(property.id) : null]
    .filter((v): v is string => !!v && String(v).trim().length > 0)
    .map((v) => v.trim().toLowerCase());
}

/** Komma-getrennte objektnr_extern / IDs; leer = alle sichtbaren Listings erlauben. */
export function getPropertyListingsWhitelist(): string[] | null {
  const raw = process.env.PROPERTY_LISTINGS_WHITELIST?.trim();
  if (!raw) return null;
  const items = raw.split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
  return items.length > 0 ? items : null;
}

export function isPropertyListingAllowed(ref: ListingPropertyRef | string): boolean {
  const whitelist = getPropertyListingsWhitelist();
  if (!whitelist) return true;

  const keys =
    typeof ref === "string" ? [ref.trim().toLowerCase()] : propertyListingKeys(ref);

  return keys.some((k) => whitelist.includes(k));
}

export function filterPropertiesByListingWhitelist<T extends ListingPropertyRef>(
  properties: T[],
): T[] {
  const whitelist = getPropertyListingsWhitelist();
  if (!whitelist) return properties;
  return properties.filter((p) => isPropertyListingAllowed(p));
}
