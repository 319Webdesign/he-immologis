import { NextRequest, NextResponse } from "next/server";
import { fetchEstateFieldMetadata } from "@/lib/onoffice";

/**
 * GET /api/onoffice/fields?lang=de|en|tr
 *
 * Liefert Labels und permittedValues für Estate-Felder. Bei Türkisch: Fallback auf Englisch.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get("lang")?.toLowerCase() ?? "de";
    const validLang = ["de", "en", "tr"].includes(lang) ? lang : "de";

    const { labels, permittedValues } = await fetchEstateFieldMetadata(validLang);
    return NextResponse.json({ labels, permittedValues });
  } catch (err) {
    console.error("[api/onoffice/fields] Error:", err);
    return NextResponse.json(
      { labels: {}, permittedValues: {} },
      { status: 200 }
    );
  }
}
