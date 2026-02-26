import crypto from "node:crypto";

const ONOFFICE_API_URL = "https://api.onoffice.de/api/stable/api.php";

const READ_ACTION_ID = "urn:onoffice-de-ns:smart:2.5:smartml:action:read";
const GET_ACTION_ID = "urn:onoffice-de-ns:smart:2.5:smartml:action:get";
const CREATE_ACTION_ID = "urn:onoffice-de-ns:smart:2.5:smartml:action:create";
const RESOURCE_TYPE_ESTATE = "estate";
const RESOURCE_TYPE_ESTATE_PICTURES = "estatepictures";
const RESOURCE_TYPE_ADDRESS = "address";
const RELATION_INTERESTED =
  "urn:onoffice-de-ns:smart:2.5:relationTypes:estate:address:interested";

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
    "anzahl_schlafzimmer",
    "anzahl_badezimmer",
    "grundstuecksflaeche",
    "nebenkosten",
  ];
}

/** Felder für die Detailansicht (fields.csv). */
function getDetailDataFields(): string[] {
  return [
    "objekttitel",
    "dreizeiler",
    "objektbeschreibung",
    "ausstatt_beschr",
    "lage",
    "sonstige_angaben",
    "kaltmiete",
    "nebenkosten",
    "warmmiete",
    "heizkosten",
    "kaution",
    "kaufpreis",
    "aussen_courtage",
    "innen_courtage",
    "hausgeld",
    "wohnflaeche",
    "nutzflaeche",
    "grundstuecksflaeche",
    "anzahl_zimmer",
    "anzahl_schlafzimmer",
    "anzahl_badezimmer",
    "anzahl_sep_wc",
    "anzahl_balkone",
    "anzahl_terrassen",
    "etage",
    "baujahr",
    "zustand",
    "heizungsart",
    "befeuerung",
    "boden",
    "fahrstuhl",
    "kabel_sat_tv",
    "verfuegbar_ab",
    "gewerbliche_nutzung",
    "haustiere",
    "strasse",
    "breitengrad",
    "laengengrad",
    "ort",
    "plz",
    "objektart",
    "vermarktungsart",
    "energieausweistyp",
    "energyClass",
    "energietraeger",
    "energieverbrauchskennwert",
    "endenergiebedarf",
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
  /** Für Anzeige (objektart, z.B. Wohnung) */
  objektart?: string | null;
  /** Detailseite: Kurzbeschreibung (Dreizeiler) */
  dreizeiler?: string | null;
  /** Detailseite: Objektbeschreibung */
  objektbeschreibung?: string | null;
  /** Detailseite: Ausstattungsbeschreibung */
  ausstatt_beschr?: string | null;
  /** Detailseite: Lage */
  lage?: string | null;
  /** Detailseite: Sonstige Angaben */
  sonstige_angaben?: string | null;
  /** Detailseite: Nebenkosten, Heizkosten, Kaution */
  nebenkosten?: number | null;
  heizkosten?: number | null;
  kaution?: number | null;
  warmmiete?: number | null;
  /** Provisionen */
  aussen_courtage?: string | number | null;
  innen_courtage?: string | number | null;
  hausgeld?: number | null;
  /** Detailseite: Zimmer, Etage, Badezimmer */
  anzahl_zimmer?: number | null;
  anzahl_schlafzimmer?: number | null;
  anzahl_badezimmer?: number | null;
  anzahl_sep_wc?: number | null;
  anzahl_balkone?: number | null;
  anzahl_terrassen?: number | null;
  etage?: number | string | null;
  nutzflaeche?: number | null;
  grundstuecksflaeche?: number | null;
  baujahr?: number | null;
  /** Merkmale */
  zustand?: string | null;
  heizungsart?: string | null;
  befeuerung?: string | null;
  boden?: string | null;
  fahrstuhl?: string | null;
  kabel_sat_tv?: boolean | string | null;
  verfuegbar_ab?: string | null;
  gewerbliche_nutzung?: boolean | number | null;
  haustiere?: string | null;
  strasse?: string | null;
  breitengrad?: number | null;
  laengengrad?: number | null;
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
  /** Für statische Objekte: Anzeige-ID (z. B. immoNr) statt numerischer id */
  displayId?: string | null;
  /** Bei statischen Objekten: kein onOffice-Anfrage */
  estateIdForContact?: number | null;
  /** Energieausweis */
  energieausweistyp?: string | null;
  energyClass?: string | null;
  energietraeger?: string | null;
  energieverbrauchskennwert?: number | null;
  endenergiebedarf?: number | null;
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
 * Liest eine Zahl aus den API-Elementen.
 * Unterstützt: number, String (z. B. "60" oder "60,00"), Objekte mit .value oder .raw.
 * Gibt null zurück bei fehlendem/ungültigem Wert – niemals 0 als Fallback.
 */
function readNumber(value: unknown): number | null {
  if (value === null || value === undefined) return null;
  if (typeof value === "number" && !Number.isNaN(value)) return value;
  if (typeof value === "string") {
    const trimmed = value.replace(/\s/g, "").replace(",", ".");
    const n = parseFloat(trimmed);
    return Number.isNaN(n) ? null : n;
  }
  if (typeof value === "object" && value !== null) {
    const obj = value as Record<string, unknown>;
    const v = obj.value ?? obj.raw ?? obj.amount;
    if (v !== undefined && v !== null) return readNumber(v);
  }
  return null;
}

/**
 * Liest einen Energie-Kennwert (Endenergiebedarf / -verbrauch) aus den API-Elementen.
 * Prüft mehrere Feldnamen (onOffice kann unterschiedliche Keys nutzen) und
 * leitet niemals 0 als Fallback zurück.
 */
function readEnergyValue(e: Record<string, unknown>): number | null {
  return (
    readNumber(e.endenergiebedarf) ??
    readNumber(e.energieverbrauchskennwert)
  );
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

/** Liest ein String-Array (z. B. Pipe-formatierte Werte oder echte Arrays). */
function readStringArray(value: unknown): string[] {
  if (value === null || value === undefined) return [];
  if (Array.isArray(value)) {
    return value.filter((v): v is string => typeof v === "string" && v.length > 0);
  }
  if (typeof value === "string") {
    return value
      .replace(/^\||\|$/g, "")
      .split("|")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}

/** Liest einen Boolean (1, "1", true). */
function readBoolean(value: unknown): boolean | null {
  if (value === null || value === undefined) return null;
  if (typeof value === "boolean") return value;
  if (value === 1 || value === "1") return true;
  if (value === 0 || value === "0") return false;
  if (typeof value === "string" && /^(ja|yes|true|1)$/i.test(value)) return true;
  return null;
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
    objektart: readString(e.objektart),
    anzahl_schlafzimmer: readNumber(e.anzahl_schlafzimmer),
    anzahl_badezimmer: readNumber(e.anzahl_badezimmer),
    grundstuecksflaeche: readNumber(e.grundstuecksflaeche),
    nebenkosten: readNumber(e.nebenkosten),
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
  const bilder = readStringArray(e.bilder ?? e.IdsEstatePicture);
  const galerie = bilder.length > 0 ? bilder : readStringArray(e.galerie);
  return {
    ...base,
    dreizeiler: readString(e.dreizeiler),
    objektbeschreibung: readString(e.objektbeschreibung),
    ausstatt_beschr: readString(e.ausstatt_beschr),
    lage: readString(e.lage),
    sonstige_angaben: readString(e.sonstige_angaben),
    nebenkosten: readNumber(e.nebenkosten),
    heizkosten: readNumber(e.heizkosten),
    kaution: readNumber(e.kaution),
    warmmiete: readNumber(e.warmmiete),
    aussen_courtage: readNumber(e.aussen_courtage) ?? readString(e.aussen_courtage),
    innen_courtage: readNumber(e.innen_courtage) ?? readString(e.innen_courtage),
    hausgeld: readNumber(e.hausgeld),
    anzahl_zimmer: readNumber(e.anzahl_zimmer),
    anzahl_schlafzimmer: readNumber(e.anzahl_schlafzimmer),
    anzahl_badezimmer: readNumber(e.anzahl_badezimmer),
    anzahl_sep_wc: readNumber(e.anzahl_sep_wc),
    anzahl_balkone: readNumber(e.anzahl_balkone),
    anzahl_terrassen: readNumber(e.anzahl_terrassen),
    etage: readEtage(),
    nutzflaeche: readNumber(e.nutzflaeche),
    grundstuecksflaeche: readNumber(e.grundstuecksflaeche),
    baujahr: readNumber(e.baujahr),
    zustand: readString(e.zustand),
    heizungsart: readString(e.heizungsart),
    befeuerung: readString(e.befeuerung),
    boden: readString(e.boden),
    fahrstuhl: readString(e.fahrstuhl),
    kabel_sat_tv: readBoolean(e.kabel_sat_tv) ?? readString(e.kabel_sat_tv),
    verfuegbar_ab: readString(e.verfuegbar_ab),
    gewerbliche_nutzung: readBoolean(e.gewerbliche_nutzung) ?? readNumber(e.gewerbliche_nutzung),
    haustiere: readString(e.haustiere),
    strasse: readString(e.strasse),
    breitengrad: readNumber(e.breitengrad),
    laengengrad: readNumber(e.laengengrad),
    galerie: galerie.length > 0 ? galerie : base.galerie,
    energieausweistyp: readString(e.energieausweistyp),
    energyClass: readString(e.energyClass),
    energietraeger: readString(e.energietraeger),
    energieverbrauchskennwert: readNumber(e.energieverbrauchskennwert),
    endenergiebedarf: readEnergyValue(e),
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
  const property = mapRecordToPropertyDetail(record);

  // Bilder via estatepictures-API laden (hochauflösend)
  const pictureUrls = await fetchEstatePictures(id, token, secret);
  if (pictureUrls.length > 0) {
    property.galerie = pictureUrls;
  }

  return property;
}

/** Response-Struktur für estatepictures get-Action */
interface EstatePicturesResponse {
  status?: { code?: number; message?: string };
  response?: {
    results?: Array<{
      status?: { code?: number };
      data?: { records?: Array<{ id: number; type: string; elements: unknown }> };
    }>;
  };
}

/**
 * Ruft die Bilder einer Immobilie von der estatepictures-API ab.
 * Liefert hochauflösende URLs (size: original).
 */
async function fetchEstatePictures(
  estateId: number,
  token: string,
  secret: string
): Promise<string[]> {
  const timestamp = String(Math.floor(Date.now() / 1000));
  const actionid = GET_ACTION_ID;
  const resourcetype = RESOURCE_TYPE_ESTATE_PICTURES;
  const hmac = buildHmac(secret, timestamp, token, resourcetype, actionid);

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
          parameters: {
            estateids: [estateId],
            categories: ["Foto", "Titelbild", "Foto_gross", "Grundriss", "Lageplan", "Panorama"],
            size: "800x600",
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

  if (!res.ok) return [];

  const json = (await res.json()) as EstatePicturesResponse;
  const statusCode = json.status?.code ?? json.response?.results?.[0]?.status?.code;
  if (statusCode !== 200) return [];

  const records = json.response?.results?.[0]?.data?.records ?? [];
  const urls: string[] = [];

  for (const rec of records) {
    const elements = rec.elements;
    if (!elements) continue;
    const arr = Array.isArray(elements) ? elements : [elements];
    for (const el of arr) {
      const obj = el as Record<string, unknown>;
      const url = obj?.url;
      if (typeof url === "string" && url.startsWith("http")) {
        urls.push(url);
      }
    }
  }

  return urls;
}

/** Daten für eine Exposé-/Kontaktanfrage (doContactRequest) */
export interface ContactRequestData {
  vorname: string;
  name: string;
  strasse: string;
  plz: string;
  ort: string;
  email: string;
  telefon: string;
  /** Bemerkung / Widerrufsverzicht-Historie (Checkbox-Bestätigungen) */
  bemerkung?: string;
}

/** Response-Interface für Create */
interface OnOfficeCreateResponse {
  status?: { code?: number; message?: string; errorcode?: number };
  response?: {
    results?: Array<{
      status?: { code?: number; message?: string; errorcode?: number };
      data?: { records?: Array<{ id: number }> };
    }>;
  };
}

/**
 * Führt eine Kontaktanfrage (Exposé-Anforderung) durch:
 * 1. Erstellt einen Adress-Datensatz (Interessent) in onOffice
 * 2. Verknüpft die Adresse mit der Immobilie als "Interessent" (estate:address:interested)
 *
 * @param estateId - ID der Immobilie in onOffice
 * @param data - Kontaktdaten des Interessenten
 * @returns { success: true, addressId } oder { success: false, error }
 */
export async function doContactRequest(
  estateId: number,
  data: ContactRequestData
): Promise<{ success: true; addressId: number } | { success: false; error: string }> {
  const token = process.env.ONOFFICE_API_KEY;
  const secret = process.env.ONOFFICE_API_SECRET;

  if (!token || !secret) {
    return {
      success: false,
      error: "Fehlende onOffice-Zugangsdaten",
    };
  }

  const timestamp = String(Math.floor(Date.now() / 1000));

  // 1. Adresse anlegen
  const createHmac = buildHmac(
    secret,
    timestamp,
    token,
    RESOURCE_TYPE_ADDRESS,
    CREATE_ACTION_ID
  );

  const createParams: Record<string, unknown> = {
    Vorname: data.vorname.trim(),
    Name: data.name.trim(),
    Strasse: data.strasse.trim(),
    Plz: data.plz.trim(),
    Ort: data.ort.trim(),
    Land: "Deutschland",
    email: data.email.trim(),
    phone: data.telefon.trim(),
    default_phone: data.telefon.trim(),
  };
  if (data.bemerkung?.trim()) {
    createParams.Bemerkung = data.bemerkung.trim();
  }

  const createBody = {
    token,
    request: {
      actions: [
        {
          actionid: CREATE_ACTION_ID,
          resourceid: "",
          resourcetype: RESOURCE_TYPE_ADDRESS,
          identifier: "",
          timestamp,
          hmac: createHmac,
          hmac_version: "2",
          parameters: createParams,
        },
      ],
    },
  };

  const createRes = await fetch(ONOFFICE_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(createBody),
  });

  if (!createRes.ok) {
    return {
      success: false,
      error: `onOffice Create: HTTP ${createRes.status}`,
    };
  }

  const createJson = (await createRes.json()) as OnOfficeCreateResponse;
  const createStatus = createJson.status?.code ?? createJson.response?.results?.[0]?.status?.code;
  if (createStatus !== 200) {
    const msg =
      createJson.response?.results?.[0]?.status?.message ??
      createJson.status?.message ??
      "onOffice Create fehlgeschlagen";
    console.error("[onOffice doContactRequest] Create error:", msg);
    return { success: false, error: msg };
  }

  const newRecords = createJson.response?.results?.[0]?.data?.records ?? [];
  const newAddressId = newRecords[0]?.id;
  if (newAddressId == null) {
    return {
      success: false,
      error: "onOffice Create: Keine Adress-ID in Response",
    };
  }

  // 2. Relation estate:address:interested anlegen (parent=estate, child=address)
  const relTimestamp = String(Math.floor(Date.now() / 1000));
  const relResourcetype = "relation";
  const relHmac = buildHmac(
    secret,
    relTimestamp,
    token,
    relResourcetype,
    CREATE_ACTION_ID
  );

  const relBody = {
    token,
    request: {
      actions: [
        {
          actionid: CREATE_ACTION_ID,
          resourceid: "",
          resourcetype: relResourcetype,
          identifier: "",
          timestamp: relTimestamp,
          hmac: relHmac,
          hmac_version: "2",
          parameters: {
            relationtype: RELATION_INTERESTED,
            parentid: [estateId],
            childid: [newAddressId],
          },
        },
      ],
    },
  };

  const relRes = await fetch(ONOFFICE_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(relBody),
  });

  if (!relRes.ok) {
    console.warn(
      "[onOffice doContactRequest] Relation Create HTTP",
      relRes.status,
      "– Adresse wurde erstellt, Verknüpfung evtl. fehlgeschlagen"
    );
    return { success: true, addressId: newAddressId };
  }

  const relJson = (await relRes.json()) as OnOfficeCreateResponse;
  const relStatus = relJson.status?.code ?? relJson.response?.results?.[0]?.status?.code;
  if (relStatus !== 200) {
    console.warn(
      "[onOffice doContactRequest] Relation Create:",
      relJson.response?.results?.[0]?.status?.message ?? relJson.status?.message
    );
  }

  return { success: true, addressId: newAddressId };
}
