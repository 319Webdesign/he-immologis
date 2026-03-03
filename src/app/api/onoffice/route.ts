import { NextRequest, NextResponse } from "next/server";
import {
  createSearchRequestInterested,
  mapFormBodyToSearchRequestData,
} from "@/lib/onoffice";

/**
 * POST /api/onoffice
 *
 * Legt einen Suchauftrag-Interessenten in onOffice an:
 * 1. Adresse anlegen (oder bestehende per E-Mail verwenden)
 * 2. Suchkriterien (searchcriteria) für diese Adresse anlegen
 *
 * Body (Form-Format oder direkt):
 * - firstname / vorname, lastname / nachname, email, phone / telefon (Pflicht: email)
 * - objekttyp, regionaler_fokus / lageRegion, range / umkreis, price_max
 * - wohnflaeche, zimmeranzahl, weitereWuensche / bemerkung
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, error: "Ungültiger Request-Body" },
        { status: 400 }
      );
    }

    const data = mapFormBodyToSearchRequestData(body as Record<string, unknown>);

    if (!data.email?.trim()) {
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
      return NextResponse.json(
        { success: false, error: result.error },
        { status }
      );
    }

    return NextResponse.json({
      success: true,
      addressId: result.addressId,
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Interessent-Anlage fehlgeschlagen";
    console.error("[api/onoffice] Error:", err);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
