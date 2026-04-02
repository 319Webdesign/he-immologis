/**
 * Öffentliche Angebotslisten (Kaufen/Mieten) und Exposé-Seiten.
 * onOffice bleibt angebunden: fetch läuft weiter, nur die Darstellung wird unterdrückt, solange nicht explizit freigegeben.
 *
 * Listings wieder sichtbar machen: PROPERTY_LISTINGS_PUBLIC=true (z. B. .env.local oder Hosting-Env).
 */
export function arePropertyListingsPubliclyVisible(): boolean {
  const v = process.env.PROPERTY_LISTINGS_PUBLIC?.trim().toLowerCase();
  return v === "true" || v === "1" || v === "yes";
}
