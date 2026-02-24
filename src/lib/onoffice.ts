import crypto from "node:crypto";

const ONOFFICE_API_URL = "https://api.onoffice.de/api/stable/api.php";

const READ_ACTION_ID = "urn:onoffice-de-ns:smart:2.5:smartml:action:read";
const RESOURCE_TYPE_ESTATE = "estate";

/** Vermarktungsart für die Filterung (Kauf- oder Mietobjekte) */
export type Vermarktungsart = "Kauf" | "Miete";

/**
 * Liefert die für die Abfrage genutzten Felder (exakt nach fields.csv).
 * Nur: objekttitel, kaufpreis, kaltmiete, ort, plz, wohnflaeche, objektart, vermarktungsart.
 */
function getDataFields(vermarktungsart?: Vermarktungsart): string[] {
  return [
    "objekttitel",
    "kaufpreis",
    "kaltmiete",
    "ort",
    "plz",
    "wohnflaeche",
    "objektart",
    "vermarktungsart",
  ];
}

/** Felder für die Detailansicht (Liste + Zusatzfelder aus fields.csv). */
function getDetailDataFields(): string[] {
  return [
    "objekttitel",
    "dreizeiler",
    "objektbeschreibung",
    "lage",
    "sonstige_angaben",
    "kaufpreis",
    "kaltmiete",
    "nebenkosten",
    "heizkosten",
    "kaution",
    "anzahl_zimmer",
    "etage",
    "anzahl_badezimmer",
    "ort",
    "plz",
    "wohnflaeche",
    "objektart",
    "vermarktungsart",
  ];
}

/** Immobilie, wie sie in der App verwendet wird (typisierte Felder) */
export interface Property {
  id: number;
  titel: string;
  kaufpreis: number | null;
  kaltmiete: number | null;
  wohnflaeche: number | null;
  ort: string | null;
  plz: string | null;
  titelbild: string | null;
  /** Für Anzeige (objektart, z.B. Wohnung) */
  objektart?: string | null;
  /** Detailseite: Kurzbeschreibung (Dreizeiler) */
  dreizeiler?: string | null;
  /** Detailseite: Objektbeschreibung */
  objektbeschreibung?: string | null;
  /** Detailseite: Lage */
  lage?: string | null;
  /** Detailseite: Sonstige Angaben */
  sonstige_angaben?: string | null;
  /** Detailseite: Nebenkosten, Heizkosten, Kaution */
  nebenkosten?: number | null;
  heizkosten?: number | null;
  kaution?: number | null;
  /** Detailseite: Zimmer, Etage, Badezimmer */
  anzahl_zimmer?: number | null;
  etage?: number | string | null;
  anzahl_badezimmer?: number | null;
  /** Liste zusätzlicher Bild-URLs (falls API liefert) */
  galerie?: string[] | null;
  /** Betreuer-ID aus API (für Filterung); kann Zahl oder String sein */
  betreuer?: number | string | null;
  /** Ansprechpartner-ID aus API (für Filterung); kann Zahl oder String sein */
  ansprechpartner?: number | string | null;
  /** Benutzername / Anzeigename (z. B. für Filter nach HE / Eberhard) */
  user_name?: string | null;
  /** Firma (z. B. für Filter nach Holger) */
  firma?: string | null;
  /** Alternative Feldnamen aus API (für fehlertoleranten Filter) */
  top_betreuer_id?: number | string | null;
  persid?: number | string | null;
  /** Nicht mehr in dataFields; nur für Abwärtskompatibilität (Fallback in UI) */
  nutzungsart?: string | null;
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
 * Mappt einen onOffice-Record auf unser Property-Interface (nur Felder aus dataFields).
 */
function mapRecordToProperty(record: OnOfficeRecord): Property {
  const e = record.elements ?? {};
  return {
    id: record.id,
    titel: readString(e.objekttitel) ?? "",
    kaufpreis: readNumber(e.kaufpreis),
    kaltmiete: readNumber(e.kaltmiete),
    wohnflaeche: readNumber(e.wohnflaeche),
    ort: readString(e.ort),
    plz: readString(e.plz),
    titelbild: readString(e.titelbild),
    objektart: readString(e.objektart),
  };
}

/** Mappt einen onOffice-Record inkl. Detailfelder für die Detailseite. */
function mapRecordToPropertyDetail(record: OnOfficeRecord): Property {
  const e = record.elements ?? {};
  const base = mapRecordToProperty(record);
  const readEtage = (): number | string | null => {
    const v = e.etage;
    if (v === undefined || v === null) return null;
    if (typeof v === "number") return v;
    return String(v);
  };
  return {
    ...base,
    dreizeiler: readString(e.dreizeiler),
    objektbeschreibung: readString(e.objektbeschreibung),
    lage: readString(e.lage),
    sonstige_angaben: readString(e.sonstige_angaben),
    nebenkosten: readNumber(e.nebenkosten),
    heizkosten: readNumber(e.heizkosten),
    kaution: readNumber(e.kaution),
    anzahl_zimmer: readNumber(e.anzahl_zimmer),
    etage: readEtage(),
    anzahl_badezimmer: readNumber(e.anzahl_badezimmer),
  };
}

/**
 * Ruft Immobilien von der onOffice-API ab.
 * Filter nur: status = "1" (Aktiv) und vermarktungsart (kauf/miete). Alle Objekte im Account werden geladen.
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

  const dataFields = getDataFields(options?.vermarktungsart);
  const listlimit = options?.listlimit ?? 500;

  /** Filter nur status "1" (Aktiv) und vermarktungsart – keine weiteren Filter (Error 141 vermeiden). */
  const buildFilter = (): Record<string, Array<{ op: string; val: unknown }>> => {
    const filter: Record<string, Array<{ op: string; val: unknown }>> = {
      ...options?.filter,
      status: [{ op: "=", val: "1" }],
    };
    if (options?.vermarktungsart === "Kauf") {
      filter.vermarktungsart = [{ op: "=", val: "kauf" }];
    } else if (options?.vermarktungsart === "Miete") {
      filter.vermarktungsart = [{ op: "=", val: "miete" }];
    }
    return filter;
  };

  const doRequest = async (
    fields: string[]
  ): Promise<{ ok: true; records: OnOfficeRecord[] } | { ok: false; errorcode?: number; message: string }> => {
    const timestamp = String(Math.floor(Date.now() / 1000));
    const actionid = READ_ACTION_ID;
    const resourcetype = RESOURCE_TYPE_ESTATE;
    const hmac = buildHmac(secret, timestamp, token, resourcetype, actionid);
    const res = await fetch(ONOFFICE_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
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
              parameters: {
                data: fields,
                listlimit,
                filter: buildFilter(),
              },
            },
          ],
        },
      }),
    });
    if (!res.ok) {
      return { ok: false, message: `HTTP ${res.status} ${res.statusText}` };
    }
    const json = (await res.json()) as OnOfficeReadResponse;
    const statusCode = json.status?.code ?? json.response?.results?.[0]?.status?.code;
    const resultStatus = json.response?.results?.[0]?.status;
    const errorcode = resultStatus?.errorcode ?? json.status?.errorcode;
    const msg =
      resultStatus?.message ??
      json.status?.message ??
      (resultStatus && "message" in resultStatus
        ? String((resultStatus as { message?: string }).message)
        : "Unbekannter API-Fehler");
    if (statusCode !== 200) {
      return { ok: false, errorcode, message: msg };
    }
    const records = json.response?.results?.[0]?.data?.records ?? [];
    return { ok: true, records };
  };

  let result = await doRequest(dataFields);

  if (!result.ok) {
    console.error("[onOffice API] --- Vollständige Fehler-Antwort ---");
    console.error(
      "message:",
      result.message,
      result.errorcode != null ? "| errorcode:" + result.errorcode : ""
    );
    throw new Error(
      `onOffice API: ${result.message}${result.errorcode != null ? ` (ErrorCode: ${result.errorcode})` : ""}`
    );
  }

  const allProperties = result.records.map(mapRecordToProperty);

  return allProperties;
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
            data: getDetailDataFields(),
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
  return mapRecordToPropertyDetail(record);
}
