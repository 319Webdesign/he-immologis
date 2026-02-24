import crypto from "node:crypto";

const ONOFFICE_API_URL = "https://api.onoffice.de/api/stable/api.php";

const READ_ACTION_ID = "urn:onoffice-de-ns:smart:2.5:smartml:action:read";
const RESOURCE_TYPE_ESTATE = "estate";

/** Vermarktungsart für die Filterung (Kauf- oder Mietobjekte) */
export type Vermarktungsart = "Kauf" | "Miete";

/**
 * Liefert die für die Vermarktungsart abzufragenden Felder.
 * Feldnamen aus onOffice-Administration (fields.csv); nur Felder die dort als "objekte" existieren.
 * titelbild ist kein Abfragefeld in der read-Action – Bilder ggf. über separate API (Objektbilder) holen.
 */
function getDataFields(vermarktungsart?: Vermarktungsart): string[] {
  const base = [
    "objekttitel",
    "kaufpreis",
    "kaltmiete",
    "wohnflaeche",
    "ort",
    "objektart",
    "vermarktungsart",
  ];
  if (vermarktungsart === "Kauf") {
    return [...base];
  }
  if (vermarktungsart === "Miete") {
    return [...base, "anzahl_zimmer"];
  }
  return [...base];
}

/** Immobilie, wie sie in der App verwendet wird (typisierte Felder) */
export interface Property {
  id: number;
  titel: string;
  kaufpreis: number | null;
  kaltmiete: number | null;
  wohnflaeche: number | null;
  ort: string | null;
  titelbild: string | null;
  /** Für Anzeige auf den Karten (wird in dataFields mit abgefragt) */
  objektart?: string | null;
  /** Nur bei Vermarktungsart Miete abgefragt */
  anzahl_zimmer?: number | null;
}

/** Rohe Elemente eines Records aus der onOffice-API (Feldname → Wert) */
interface OnOfficeRecordElements {
  [field: string]: unknown;
}

/** Ein Record aus der onOffice-API-Response */
interface OnOfficeRecord {
  id: number;
  type: string;
  elements: OnOfficeRecordElements;
}

/** Response-Struktur der onOffice-API für eine read-Action */
interface OnOfficeReadResponse {
  status?: { code?: number; message?: string; errorcode?: number };
  response?: {
    results?: Array<{
      status?: { code?: number; message?: string; errorcode?: number };
      data?: {
        records?: OnOfficeRecord[];
      };
    }>;
  };
}

/**
 * Berechnet den HMAC-SHA256 (Version 2) für die onOffice-API.
 * Zeichenkette: timestamp + token + resourcetype + actionid
 */
function buildHmac(
  secret: string,
  timestamp: string,
  token: string,
  resourcetype: string,
  actionid: string
): string {
  const payload = timestamp + token + resourcetype + actionid;
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(payload);
  return hmac.digest("base64");
}

/**
 * Liest eine Zahl aus den API-Elementen (kann als String kommen).
 */
function readNumber(value: unknown): number | null {
  if (value === null || value === undefined) return null;
  if (typeof value === "number" && !Number.isNaN(value)) return value;
  if (typeof value === "string") {
    const n = parseFloat(value.replace(/\s/g, "").replace(",", "."));
    return Number.isNaN(n) ? null : n;
  }
  return null;
}

/**
 * Liest einen String aus den API-Elementen.
 */
function readString(value: unknown): string | null {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  return "";
}

/**
 * Mappt einen onOffice-Record auf unser Property-Interface.
 * Liest Titel aus objekttitel (onOffice-Feldname).
 */
function mapRecordToProperty(record: OnOfficeRecord): Property {
  const e = record.elements ?? {};
  return {
    id: record.id,
    titel: readString(e.objekttitel ?? e.titel) ?? "",
    kaufpreis: readNumber(e.kaufpreis),
    kaltmiete: readNumber(e.kaltmiete),
    wohnflaeche: readNumber(e.wohnflaeche),
    ort: readString(e.ort),
    titelbild: readString(e.titelbild),
    objektart: readString(e.objektart),
    anzahl_zimmer: readNumber(e.anzahl_zimmer),
  };
}

/**
 * Ruft Immobilien von der onOffice-API ab.
 * Optional nach Vermarktungsart (kauf / miete) und status "1" (aktiv) gefiltert.
 */
export async function fetchProperties(options?: {
  listlimit?: number;
  /** Nur Objekte zum Kauf ("kauf") oder zur Miete ("miete") */
  vermarktungsart?: Vermarktungsart;
  filter?: Record<string, Array<{ op: string; val: unknown }>>;
}): Promise<Property[]> {
  const token = process.env.ONOFFICE_API_KEY;
  const secret = process.env.ONOFFICE_API_SECRET;

  if (!token || !secret) {
    throw new Error(
      "Fehlende onOffice-Zugangsdaten: ONOFFICE_API_KEY und ONOFFICE_API_SECRET müssen in .env.local gesetzt sein."
    );
  }

  const timestamp = String(Math.floor(Date.now() / 1000));
  const actionid = READ_ACTION_ID;
  const resourcetype = RESOURCE_TYPE_ESTATE;
  const hmac = buildHmac(secret, timestamp, token, resourcetype, actionid);

  const dataFields = getDataFields(options?.vermarktungsart);
  const parameters: Record<string, unknown> = {
    data: dataFields,
    listlimit: options?.listlimit ?? 500,
  };

  const filter: Record<string, Array<{ op: string; val: unknown }>> = {
    ...options?.filter,
  };
  if (options?.vermarktungsart === "Kauf") {
    filter.vermarktungsart = [{ op: "=", val: "kauf" }];
    filter.status = [{ op: "=", val: "1" }];
  } else if (options?.vermarktungsart === "Miete") {
    filter.vermarktungsart = [{ op: "=", val: "miete" }];
    filter.status = [{ op: "=", val: "1" }];
  }
  if (Object.keys(filter).length > 0) {
    parameters.filter = filter;
  }

  const body = {
    token,
    request: {
      actions: [
        {
          actionid,
          resourceid: "",
          resourcetype,
          identifier: "",
          timestamp,
          hmac,
          hmac_version: "2",
          parameters: parameters,
        },
      ],
    },
  };

  const res = await fetch(ONOFFICE_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(
      `onOffice API Fehler: ${res.status} ${res.statusText}`
    );
  }

  const json = (await res.json()) as OnOfficeReadResponse;

  const statusCode = json.status?.code ?? json.response?.results?.[0]?.status?.code;
  if (statusCode !== 200) {
    const resultStatus = json.response?.results?.[0]?.status;
    const errorcode = resultStatus?.errorcode ?? json.status?.errorcode;
    const msg =
      resultStatus?.message ??
      json.status?.message ??
      (resultStatus && "message" in resultStatus
        ? String((resultStatus as { message?: string }).message)
        : "Unbekannter API-Fehler");
    const fullErrorString = JSON.stringify(json, null, 2);
    console.error("[onOffice API] --- Vollständige Fehler-Antwort (kompletter Fehler-String) ---");
    console.error(fullErrorString);
    console.error("[onOffice API] --- Ende ---");
    console.error("[onOffice API] errorcode:", errorcode);
    console.error("[onOffice API] message:", msg);
    throw new Error(`onOffice API: ${msg} (Code: ${statusCode}${errorcode != null ? `, ErrorCode: ${errorcode}` : ""})`);
  }

  const records =
    json.response?.results?.[0]?.data?.records ?? ([] as OnOfficeRecord[]);
  return records.map(mapRecordToProperty);
}

/**
 * Ruft eine einzelne Immobilie anhand der ID von der onOffice-API ab.
 * Gibt null zurück, wenn die Immobilie nicht gefunden wird.
 */
export async function fetchPropertyById(id: number): Promise<Property | null> {
  const token = process.env.ONOFFICE_API_KEY;
  const secret = process.env.ONOFFICE_API_SECRET;

  if (!token || !secret) {
    throw new Error(
      "Fehlende onOffice-Zugangsdaten: ONOFFICE_API_KEY und ONOFFICE_API_SECRET müssen in .env.local gesetzt sein."
    );
  }

  const timestamp = String(Math.floor(Date.now() / 1000));
  const actionid = READ_ACTION_ID;
  const resourcetype = RESOURCE_TYPE_ESTATE;
  const hmac = buildHmac(secret, timestamp, token, resourcetype, actionid);

  const body = {
    token,
    request: {
      actions: [
        {
          actionid,
          resourceid: String(id),
          resourcetype,
          identifier: "",
          timestamp,
          hmac,
          hmac_version: "2",
          parameters: {
            data: getDataFields(),
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
    throw new Error(`onOffice API Fehler: ${res.status} ${res.statusText}`);
  }

  const json = (await res.json()) as OnOfficeReadResponse;
  const statusCode = json.status?.code ?? json.response?.results?.[0]?.status?.code;
  if (statusCode !== 200) {
    const resultStatus = json.response?.results?.[0]?.status;
    const errorcode = resultStatus?.errorcode ?? json.status?.errorcode;
    const msg = resultStatus?.message ?? json.status?.message ?? "Unbekannter API-Fehler";
    const fullErrorString = JSON.stringify(json, null, 2);
    console.error("[onOffice API fetchPropertyById] --- Vollständige Fehler-Antwort ---");
    console.error(fullErrorString);
    console.error("[onOffice API fetchPropertyById] errorcode:", errorcode);
    console.error("[onOffice API fetchPropertyById] message:", msg);
    return null;
  }

  const records = json.response?.results?.[0]?.data?.records ?? [];
  const record = records[0];
  if (!record) return null;
  return mapRecordToProperty(record);
}
