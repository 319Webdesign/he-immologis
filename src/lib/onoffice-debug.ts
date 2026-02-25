/**
 * Debug-Skript: Ruft genau eine Immobilie ab (listlimit: 1) inkl. Felder
 * betreuer, bearbeiter, redakteur, benutzer, ansprechpartner und gibt das
 * komplette JSON des Objekts im Terminal aus (um Holgers Kennung zu finden).
 *
 * Ausführen: npm run debug:onoffice
 */

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const ONOFFICE_API_URL = "https://api.onoffice.de/api/stable/api.php";
const READ_ACTION_ID = "urn:onoffice-de-ns:smart:2.5:smartml:action:read";
const RESOURCE_TYPE_ESTATE = "estate";

function loadEnvLocal(): void {
  const envPath = path.join(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) {
    throw new Error(".env.local nicht gefunden. Bitte im Projektroot ausführen.");
  }
  const content = fs.readFileSync(envPath, "utf-8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq <= 0) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
    if (key && value) process.env[key] = value;
  }
}

function buildHmac(
  secret: string,
  timestamp: string,
  token: string,
  resourcetype: string,
  actionid: string
): string {
  const payload = timestamp + token + resourcetype + actionid;
  return crypto.createHmac("sha256", secret).update(payload).digest("base64");
}

async function fetchOneWithBetreuerFields(): Promise<unknown> {
  loadEnvLocal();

  const token = process.env.ONOFFICE_API_KEY;
  const secret = process.env.ONOFFICE_API_SECRET;
  if (!token || !secret) {
    throw new Error("ONOFFICE_API_KEY und ONOFFICE_API_SECRET in .env.local setzen.");
  }

  const timestamp = String(Math.floor(Date.now() / 1000));
  const hmac = buildHmac(secret, timestamp, token, RESOURCE_TYPE_ESTATE, READ_ACTION_ID);

  const dataFields = [
    "objekttitel",
    "kaufpreis",
    "kaltmiete",
    "wohnflaeche",
    "ort",
    "objektart",
    "vermarktungsart",
    "endenergiebedarf",
    "energieverbrauchskennwert",
    "betreuer",
    "bearbeiter",
    "redakteur",
    "benutzer",
    "ansprechpartner",
  ];

  const body = {
    token,
    request: {
      actions: [
        {
          actionid: READ_ACTION_ID,
          resourceid: "",
          resourcetype: RESOURCE_TYPE_ESTATE,
          identifier: "",
          timestamp,
          hmac,
          hmac_version: "2",
          parameters: {
            data: dataFields,
            listlimit: 1,
            filter: {
              status: [{ op: "=", val: "1" }],
            },
          },
        },
      ],
    },
  };

  const res = await fetch(ONOFFICE_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`onOffice API: ${res.status} ${res.statusText}`);
  }

  const json = (await res.json()) as {
    status?: { code?: number; message?: string };
    response?: {
      results?: Array<{
        status?: { code?: number };
        data?: { records?: Array<{ id: number; type: string; elements: Record<string, unknown> }> };
      }>;
    };
  };

  const statusCode = json.status?.code ?? json.response?.results?.[0]?.status?.code;
  if (statusCode !== 200) {
    const resultStatus = json.response?.results?.[0]?.status;
    const detailMsg = resultStatus && "message" in resultStatus ? String(resultStatus.message) : json.status?.message;
    console.error("Vollständige API-Antwort:", JSON.stringify(json, null, 2));
    throw new Error(`onOffice API: ${detailMsg ?? "Unbekannter Fehler"} (Code: ${statusCode})`);
  }

  const records = json.response?.results?.[0]?.data?.records ?? [];
  return records[0] ?? null;
}

async function main(): Promise<void> {
  console.log("=== onOffice Debug: Eine Immobilie (mit betreuer, bearbeiter, redakteur, benutzer, ansprechpartner) ===\n");

  const record = await fetchOneWithBetreuerFields();

  if (!record) {
    console.log("Kein Objekt zurückgegeben (evtl. keine aktiven Objekte).");
    return;
  }

  console.log("=== Komplettes JSON des einen Objekts ===\n");
  console.log(JSON.stringify(record, null, 2));

  const el = (record as { elements?: Record<string, unknown> }).elements ?? {};
  console.log("\n=== Energie-Felder (Raw) ===");
  console.log("endenergiebedarf:", el.endenergiebedarf, typeof el.endenergiebedarf);
  console.log("energieverbrauchskennwert:", el.energieverbrauchskennwert, typeof el.energieverbrauchskennwert);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
