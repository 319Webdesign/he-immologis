import { NextResponse } from "next/server";
import crypto from "node:crypto";

const ONOFFICE_API_URL = "https://api.onoffice.de/api/stable/api.php";

/**
 * GET /api/onoffice-test
 *
 * Diagnose-Route: Testet die onOffice-Credentials mit einem minimalen API-Call.
 * Gibt eine klare Statusmeldung zurück – für lokale Entwicklung / Debugging.
 *
 * WICHTIG: Diese Route sollte vor dem Deployment entfernt oder gesichert werden.
 */
export async function GET() {
  const token = process.env.ONOFFICE_API_KEY;
  const secret = process.env.ONOFFICE_API_SECRET;

  if (!token || !secret) {
    return NextResponse.json({
      ok: false,
      step: "env",
      error: "ONOFFICE_API_KEY oder ONOFFICE_API_SECRET fehlen in .env.local",
      tokenLength: token?.length ?? 0,
      secretLength: secret?.length ?? 0,
    });
  }

  const timestamp = String(Math.floor(Date.now() / 1000));
  const resourcetype = "estate";
  const actionid = "urn:onoffice-de-ns:smart:2.5:smartml:action:read";

  const payload = timestamp + token + resourcetype + actionid;
  const hmac = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("base64");

  const requestBody = {
    token,
    request: {
      actions: [
        {
          actionid,
          resourceid: "",
          resourcetype,
          identifier: "test",
          timestamp,
          hmac,
          hmac_version: "2",
          parameters: {
            data: ["Id", "objekttitel"],
            listlimit: 1,
            filter: {
              status: [{ op: "=", val: 1 }],
            },
          },
        },
      ],
    },
  };

  let rawResponse: unknown;
  try {
    const res = await fetch(ONOFFICE_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    rawResponse = await res.json();
  } catch (e) {
    return NextResponse.json({
      ok: false,
      step: "fetch",
      error: e instanceof Error ? e.message : String(e),
    });
  }

  const json = rawResponse as {
    status?: { code?: number; message?: string; errorcode?: number };
    response?: {
      results?: Array<{
        status?: { code?: number; message?: string; errorcode?: number };
        data?: { records?: unknown[] };
      }>;
    };
  };

  const statusCode =
    json.status?.code ?? json.response?.results?.[0]?.status?.code;
  const errorcode =
    json.response?.results?.[0]?.status?.errorcode ?? json.status?.errorcode;
  const message =
    json.response?.results?.[0]?.status?.message ?? json.status?.message;
  const records = json.response?.results?.[0]?.data?.records ?? [];

  if (statusCode === 200) {
    return NextResponse.json({
      ok: true,
      message: `Authentifizierung erfolgreich. ${records.length} Objekt(e) geladen.`,
      tokenLength: token.length,
      secretLength: secret.length,
      timestamp,
      records,
    });
  }

  return NextResponse.json({
    ok: false,
    step: "api",
    statusCode,
    errorcode,
    message,
    hint:
      errorcode === 22
        ? "Error 22 = HMAC-Authentifizierung fehlgeschlagen. Token/Secret in onOffice neu generieren und .env.local aktualisieren."
        : errorcode === 500
          ? "Error 500 = Keine Leseberechtigung für den API-Benutzer. Rechte unter Extras → Einstellungen → Benutzer → API-Benutzer → Rechte prüfen."
          : "Unbekannter Fehler – vollständige Antwort prüfen.",
    tokenLength: token.length,
    secretLength: secret.length,
    fullResponse: json,
  });
}
