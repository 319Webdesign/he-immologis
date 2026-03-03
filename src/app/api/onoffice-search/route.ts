import { NextRequest, NextResponse } from "next/server";
import {
  createSearchRequestInterested,
  type SearchRequestInterestedData,
} from "@/lib/onoffice";

/**
 * Mappt den Request-Body auf SearchRequestInterestedData für die onOffice-Suchauftrag-API.
 * Resource 'address': Vorname, Nachname, E-Mail, Telefon.
 * Resource 'searchcriteria': objekttyp, wohnflaeche_min, anzahl_zimmer_min, regionaler_zusatz, Bemerkung (weiteren Wünsche).
 */
function mapBodyToSearchRequest(body: Record<string, unknown>): SearchRequestInterestedData {
  const firstname = (body.vorname as string)?.trim() ?? (body.firstname as string)?.trim() ?? "";
  const lastname = (body.nachname as string)?.trim() ?? (body.lastname as string)?.trim() ?? "";
  const email = (body.email as string)?.trim() ?? "";
  const phone = (body.telefon as string)?.trim() ?? (body.phone as string)?.trim() ?? "";

  // Suchkriterien: Mapping mit optionalen Defaults
  const objekttyp = (body.objekttyp as string)?.trim() || "Einfamilienhaus";
  const wohnflaeche_min =
    body.wohnflaeche_min != null && body.wohnflaeche_min !== ""
      ? typeof body.wohnflaeche_min === "number"
        ? body.wohnflaeche_min
        : Number(String(body.wohnflaeche_min).replace(",", "."))
      : 100;
  const anzahl_zimmer_min =
    body.anzahl_zimmer_min != null && body.anzahl_zimmer_min !== ""
      ? typeof body.anzahl_zimmer_min === "number"
        ? body.anzahl_zimmer_min
        : Number(String(body.anzahl_zimmer_min).replace(",", "."))
      : 3;
  const regionaler_zusatz =
    (body.regionaler_zusatz as string)?.trim() ||
    (body.regionaler_fokus as string)?.trim() ||
    (body.lageRegion as string)?.trim() ||
    "Pfungstadt";

  // Weitere Wünsche (z. B. Balkon, Ländlich) → Bemerkungsfeld des Suchauftrags
  const weitereWuensche =
    (body.weitereWuensche as string)?.trim() ||
    (body.weiterenWuensche as string)?.trim() ||
    (body.bemerkung as string)?.trim() ||
    "";

  return {
    firstname,
    lastname,
    email,
    phone,
    objekttyp,
    wohnflaeche_min: Number.isNaN(wohnflaeche_min) ? 100 : wohnflaeche_min,
    anzahl_zimmer_min: Number.isNaN(anzahl_zimmer_min) ? 3 : anzahl_zimmer_min,
    regionaler_fokus: regionaler_zusatz,
    vermarktungsart: "kauf",
    bemerkung: weitereWuensche,
  };
}

/**
 * POST /api/onoffice-search
 *
 * Nutzt die onOffice-API (kein E-Mail-Versand):
 * 1. Resource 'address': Erstellt einen Adressdatensatz für Vorname, Nachname mit E-Mail und Telefon.
 * 2. Resource 'searchcriteria': Erstellt einen Suchauftrag für die neue Adress-ID.
 *
 * Feld-Mapping Suchkriterien:
 * - objekttyp (default: "Einfamilienhaus") → objektart
 * - wohnflaeche_min (default: 100) → wohnflaeche__von
 * - anzahl_zimmer_min (default: 3) → anzahl_zimmer__von
 * - regionaler_zusatz (default: "Pfungstadt", PLZ 64319) → regionaler_zusatz
 * - weitereWuensche (Balkon, Ländlich, …) → Bemerkungsfeld des Suchauftrags (krit_bemerkung_oeffentlich)
 *
 * Body: vorname, nachname, email, telefon, weitereWuensche [, objekttyp, wohnflaeche_min, anzahl_zimmer_min, regionaler_zusatz ]
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body || typeof body !== "object") {
      console.error("[api/onoffice-search] Fehler: Ungültiger Request-Body (kein Objekt)");
      return NextResponse.json(
        { success: false, error: "Ungültiger Request-Body" },
        { status: 400 }
      );
    }

    console.log("[api/onoffice-search] Request-Body (für Debug):", JSON.stringify(body, null, 2));

    const data = mapBodyToSearchRequest(body);

    if (!data.email?.trim()) {
      console.error("[api/onoffice-search] Fehler: E-Mail-Adresse fehlt im Body");
      return NextResponse.json(
        { success: false, error: "E-Mail-Adresse ist erforderlich" },
        { status: 400 }
      );
    }

    const result = await createSearchRequestInterested(data);

    if (!result.success) {
      const status =
        result.error?.toLowerCase().includes("zugangsdaten") ||
        result.error?.toLowerCase().includes("e-mail")
          ? 400
          : 500;
      console.error("[api/onoffice-search] onOffice-Antwort: success=false");
      console.error("[api/onoffice-search] Fehlermeldung (Terminal):", result.error);
      console.error("[api/onoffice-search] HTTP-Status der Antwort:", status);
      return NextResponse.json(
        { success: false, error: result.error },
        { status }
      );
    }

    console.log("[api/onoffice-search] Erfolg: addressId=", result.addressId);
    return NextResponse.json({
      success: true,
      addressId: result.addressId,
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Suchauftrag-Anlage fehlgeschlagen";
    console.error("[api/onoffice-search] Exception:", err);
    console.error("[api/onoffice-search] Fehlermeldung (Terminal):", message);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
