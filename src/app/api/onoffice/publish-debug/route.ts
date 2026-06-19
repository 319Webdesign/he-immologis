import { NextRequest, NextResponse } from "next/server";
import { fetchEstatePublishDiagnostics } from "@/lib/onoffice";

/**
 * GET /api/onoffice/publish-debug
 *
 * Zeigt pro aktivem Objekt den Wert des Website-Freigabe-Feldes.
 * Optional per BASIC_AUTH_USER / BASIC_AUTH_PASS geschützt.
 */
export async function GET(request: NextRequest) {
  const authUser = process.env.BASIC_AUTH_USER?.trim();
  const authPass = process.env.BASIC_AUTH_PASS?.trim();
  if (authUser && authPass) {
    const header = request.headers.get("authorization");
    const expected = `Basic ${Buffer.from(`${authUser}:${authPass}`).toString("base64")}`;
    if (header !== expected) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    const estates = await fetchEstatePublishDiagnostics();
    return NextResponse.json({
      publishField: process.env.ONOFFICE_PUBLISH_FIELD?.trim() || "veroeffentlichen",
      filterId: process.env.ONOFFICE_ESTATE_FILTER_ID?.trim() || null,
      count: estates.length,
      estates,
    });
  } catch (err) {
    console.error("[api/onoffice/publish-debug]", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Diagnose fehlgeschlagen" },
      { status: 500 },
    );
  }
}
