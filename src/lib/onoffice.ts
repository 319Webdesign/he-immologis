import crypto from "node:crypto";

const ONOFFICE_API_URL = "https://api.onoffice.de/api/stable/api.php";

const READ_ACTION_ID = "urn:onoffice-de-ns:smart:2.5:smartml:action:read";
const GET_ACTION_ID = "urn:onoffice-de-ns:smart:2.5:smartml:action:get";
const CREATE_ACTION_ID = "urn:onoffice-de-ns:smart:2.5:smartml:action:create";
const RESOURCE_TYPE_ESTATE = "estate";
const RESOURCE_TYPE_ESTATE_PICTURES = "estatepictures";
const RESOURCE_TYPE_ADDRESS = "address";
const RESOURCE_TYPE_SEARCHCRITERIA = "searchcriteria";
const RELATION_INTERESTED =
  "urn:onoffice-de-ns:smart:2.5:relationTypes:estate:address:interested";

/** Mapping Form-Label → onOffice objektart (Objektklasse, z. B. haus, wohnung) */
const OBJEKTTYP_TO_ONOFFICE: Record<string, string> = {
  Einfamilienhaus: "haus",
  Zweifamilienhaus: "haus",
  Reihenhaus: "haus",
  Mehrfamilienhaus: "haus",
  Wohnung: "wohnung",
  Grundstück: "grundstueck",
  Gewerbeimmobilie: "gewerbe",
  Gewerbewohnung: "wohnung",
  Gewerbefläche: "gewerbe",
};

/** Mapping Form-Label → onOffice objekttyp (spezifischer Typ für Array, z. B. einfamilienhaus) */
const OBJEKTTYP_TO_TYP_VALUE: Record<string, string> = {
  Einfamilienhaus: "einfamilienhaus",
  Zweifamilienhaus: "zweifamilienhaus",
  Reihenhaus: "reihenhaus",
  Mehrfamilienhaus: "mehrfamilienhaus",
  Wohnung: "wohnung",
  Grundstück: "grundstueck",
  Gewerbeimmobilie: "gewerbe",
  Gewerbewohnung: "gewerbewohnung",
  Gewerbefläche: "gewerbeflaeche",
};

/** Parst Preis-Strings (DE: 500.000 oder 100.000,50; EN: 500000) → Zahl. Entfernt Tausendertrennzeichen. */
function parsePrice(value: unknown): number | undefined {
  if (value === null || value === undefined || value === "") return undefined;
  if (typeof value === "number" && !Number.isNaN(value)) return value;
  const s = String(value).trim().replace(/\s/g, "");
  if (!s) return undefined;
  const withoutThousands = s.replace(/\./g, "");
  const withDecimal = withoutThousands.replace(",", ".");
  const n = parseFloat(withDecimal);
  return Number.isNaN(n) ? undefined : n;
}

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
    "nutzflaeche",
    "objektart",
    "vermarktungsart",
    "anzahl_zimmer",
    "anzahl_schlafzimmer",
    "anzahl_badezimmer",
    "grundstuecksflaeche",
    "nebenkosten",
    "objektnr_extern",
  ];
}

/**
 * Core-Liste: Minimale Pflichtfelder (Titel, Preis, Ort).
 * Wird immer angefordert und als Fallback bei wiederholten Error 141 genutzt.
 */
function getDetailDataFieldsCore(): string[] {
  return [
    "objekttitel",
    "kaufpreis",
    "kaltmiete",
    "ort",
    "plz",
    "wohnflaeche",
    "objektart",
    "objektnr_extern",
    "dreizeiler",
    "objektbeschreibung",
  ];
}

/**
 * Felder für die Detailansicht mit präventiven Korrekturen bekannter Problemfelder:
 * denkmalschutzobjekt -> denkmalschutz
 * barrierefrei -> barrierefrei_id
 * terrassen entfernt – anzahl_terrassen nutzen (oder ausstatt_beschr)
 */
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
    "objektnr_extern",
    "barrierefrei",
    "denkmalgeschuetzt",
    "stp_anzahl",
    "stellplatzart",
    "stellplatzkaufpreis",
    "stellplatzmiete",
    "anzahl_stellplaetze",
    "energieausweis_gueltig_bis",
    "distanz_kindergarten",
    "distanz_grundschule",
    "distanz_realschule",
    "distanz_gymnasium",
    "distanz_autobahn",
    "distanz_zentrum",
    "vermietet",
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
  /** Externe Objektnummer für URLs (z. B. EFH-K-26-002) */
  objektnr_extern?: string | null;
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
  /** Balkon (Boolean oder Anzahl) */
  balkon?: boolean | number | null;
  /** Terrasse(n) (Boolean oder Anzahl) */
  terrassen?: boolean | number | null;
  /** Barrierefrei */
  barrierefrei?: boolean | number | null;
  /** Denkmalschutzobjekt */
  denkmalschutzobjekt?: boolean | number | null;
  /** Stellplätze: Anzahl, Art (Array, z. B. ["2 Carports à 20.000,00 €"]), Kaufpreis, Miete */
  stp_anzahl?: number | null;
  stellplatzart?: string[] | null;
  stellplatzkaufpreis?: number | null;
  stellplatzmiete?: number | null;
  /** Energieausweis gültig bis (Datum) */
  energieausweis_gueltig_bis?: string | null;
  /** Infrastruktur: Distanzen in km */
  distanz_kindergarten?: number | null;
  distanz_grundschule?: number | null;
  distanz_realschule?: number | null;
  distanz_gymnasium?: number | null;
  distanz_autobahn?: number | null;
  distanz_zentrum?: number | null;
  /** Aktuell vermietet */
  vermietet?: boolean | null;
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
 * Parst deutsche Zahlen (720.000 oder 720.000,50) und englische (720000.00).
 * onOffice liefert Preise oft als "720.000" (Punkt = Tausendertrennzeichen).
 */
function parseApiNumber(s: string): number {
  const trimmed = s.replace(/\s/g, "");
  const hasComma = trimmed.includes(",");
  if (hasComma) {
    const withoutThousands = trimmed.replace(/\./g, "");
    const withDecimal = withoutThousands.replace(",", ".");
    return parseFloat(withDecimal);
  }
  if (trimmed.includes(".")) {
    const parts = trimmed.split(".");
    const afterLast = parts[parts.length - 1] ?? "";
    if (afterLast.length === 3 && parts.length >= 2) {
      return parseFloat(trimmed.replace(/\./g, ""));
    }
  }
  return parseFloat(trimmed.replace(",", "."));
}

/**
 * Liest eine Zahl aus den API-Elementen.
 * Unterstützt: number, String (z. B. "60", "60,00", "720.000"), Objekte mit .value oder .raw.
 * Gibt null zurück bei fehlendem/ungültigem Wert – niemals 0 als Fallback.
 */
function readNumber(value: unknown): number | null {
  if (value === null || value === undefined) return null;
  if (typeof value === "number" && !Number.isNaN(value)) return value;
  if (typeof value === "string") {
    const n = parseApiNumber(value);
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
    nutzflaeche: readNumber(e.nutzflaeche),
    ort: readString(e.ort),
    plz: readString(e.plz),
    objektart: readString(e.objektart),
    anzahl_zimmer: readNumber(e.anzahl_zimmer),
    anzahl_schlafzimmer: readNumber(e.anzahl_schlafzimmer),
    anzahl_badezimmer: readNumber(e.anzahl_badezimmer),
    grundstuecksflaeche: readNumber(e.grundstuecksflaeche),
    nebenkosten: readNumber(e.nebenkosten),
    objektnr_extern: readString(e.objektnr_extern ?? e.externalestateno) || null,
  };
}

/** Mappt einen onOffice-Record inkl. Detailfelder für die Detailseite. */
function mapRecordToPropertyDetail(record: OnOfficeRecord): Property {
  const e = record.elements ?? {};
  const stpAnzahl = readNumber(e.stp_anzahl);
  const stpPreis = readNumber(e.stellplatzkaufpreis);
  console.log("Stellplatz-Check:", { anzahl: stpAnzahl, preis: stpPreis });
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
    objektnr_extern: readString(e.objektnr_extern ?? e.externalestateno) || base.objektnr_extern || null,
    energieausweistyp: readString(e.energieausweistyp),
    energyClass: readString(e.energyClass),
    energietraeger: readString(e.energietraeger),
    energieverbrauchskennwert: readNumber(e.energieverbrauchskennwert),
    endenergiebedarf: readNumber(e.endenergiebedarf),
    balkon: readBoolean(e.balkon) ?? readNumber(e.balkon),
    terrassen: readNumber(e.anzahl_terrassen),
    anzahl_terrassen: readNumber(e.anzahl_terrassen),
    barrierefrei: readBoolean(e.barrierefrei) ?? readNumber(e.barrierefrei),
    denkmalschutzobjekt: readBoolean(e.denkmalgeschuetzt) ?? readNumber(e.denkmalgeschuetzt),
    stp_anzahl: stpAnzahl,
    stellplatzart: (() => {
      const arr = readStringArray(e.stellplatzart);
      return arr.length > 0 ? arr : null;
    })(),
    stellplatzkaufpreis: stpPreis,
    stellplatzmiete: readNumber(e.stellplatzmiete),
    energieausweis_gueltig_bis: readString(e.energieausweis_gueltig_bis) || null,
    distanz_kindergarten: readNumber(e.distanz_kindergarten),
    distanz_grundschule: readNumber(e.distanz_grundschule),
    distanz_realschule: readNumber(e.distanz_realschule),
    distanz_gymnasium: readNumber(e.distanz_gymnasium),
    distanz_autobahn: readNumber(e.distanz_autobahn),
    distanz_zentrum: readNumber(e.distanz_zentrum),
    vermietet: readBoolean(e.vermietet),
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
  /** Website-Sprache (de, en, tr) für übersetzte Singleselect-Werte. de->DEU, en->ENG, tr->TUR */
  lang?: string;
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
  const isoLang = options?.lang
    ? (LANG_TO_ISO[options.lang.toLowerCase()] ?? LANG_TO_ISO.de)
    : LANG_TO_ISO.de;
  const outputLang = isoLang;

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
                outputlanguage: outputLang,
                formatoutput: true,
                estatelanguage: outputLang,
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

  // Titelbilder für die Vorschaukarten laden (Verkaufen/Mieten)
  const estateIds = allProperties.map((p) => p.id);
  if (estateIds.length > 0) {
    const titelbildMap = await fetchEstatePicturesForList(estateIds, token, secret);
    for (const p of allProperties) {
      const url = titelbildMap.get(p.id);
      if (url) p.galerie = [url];
    }
  }

  return allProperties;
}

/** Sprachcode-Mapping für onOffice API (ISO 639-2, 3 Zeichen, Großschreibung) */
export const LANG_TO_ISO: Record<string, string> = {
  de: "DEU",
  en: "ENG",
  tr: "TUR",
};

/** Response-Struktur für fields get-Action */
interface OnOfficeFieldDef {
  label?: string;
  type?: string;
  permittedvalues?: Record<string, string> | Array<{ value: string; label: string }>;
  [k: string]: unknown;
}

interface OnOfficeFieldsResponse {
  status?: { code?: number; message?: string };
  response?: {
    results?: Array<{
      status?: { code?: number };
      data?: {
        records?: Array<{
          id: string;
          type?: string;
          elements?: Record<string, OnOfficeFieldDef>;
        }>;
      };
    }>;
  };
}

export type EstateFieldMetadata = {
  labels: Record<string, string>;
  permittedValues: Record<string, Record<string, string>>;
};

/**
 * Ruft ein Feld von der onOffice fields-API ab.
 * @internal
 */
async function fetchFieldsForLanguage(
  token: string,
  secret: string,
  isoLang: string
): Promise<{ labels: Record<string, string>; permittedValues: Record<string, Record<string, string>> }> {
  const timestamp = String(Math.floor(Date.now() / 1000));
  const resourcetype = "fields";
  const actionid = GET_ACTION_ID;
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
              labels: true,
              language: isoLang,
              modules: ["estate"],
            },
          },
        ],
      },
    }),
  });

  if (!res.ok) return { labels: {}, permittedValues: {} };

  const json = (await res.json()) as OnOfficeFieldsResponse;
  const statusCode = json.status?.code ?? json.response?.results?.[0]?.status?.code;
  if (statusCode !== 200) return { labels: {}, permittedValues: {} };

  const records = json.response?.results?.[0]?.data?.records ?? [];
  const estateRecord = records.find((r) => r.id === "estate");
  if (!estateRecord?.elements) return { labels: {}, permittedValues: {} };

  const labels: Record<string, string> = {};
  const permittedValues: Record<string, Record<string, string>> = {};

  for (const [fieldName, fieldDef] of Object.entries(estateRecord.elements)) {
    const label = fieldDef?.label;
    if (typeof label === "string" && label.trim()) {
      labels[fieldName] = label.trim();
    }
    const pv = fieldDef?.permittedvalues;
    const fieldType = String(fieldDef?.type ?? "").toLowerCase();
    if ((fieldType === "singleselect" || fieldType === "multiselect") && pv && typeof pv === "object") {
      const valueToLabel: Record<string, string> = {};
      if (Array.isArray(pv)) {
        for (const item of pv) {
          if (item?.value != null && typeof item.label === "string") {
            valueToLabel[String(item.value)] = item.label.trim();
          }
        }
      } else {
        for (const [rawVal, displayLabel] of Object.entries(pv)) {
          if (typeof displayLabel === "string" && displayLabel.trim()) {
            valueToLabel[rawVal] = displayLabel.trim();
          }
        }
      }
      if (Object.keys(valueToLabel).length > 0) {
        permittedValues[fieldName] = valueToLabel;
      }
    }
  }
  return { labels, permittedValues };
}

/**
 * Ruft die Feldbeschreibungen (Labels) und permittedValues für Estate-Felder von der onOffice-API ab.
 * Bei Türkisch: Fallback auf Englisch für fehlende permittedValues.
 * @param lang - Sprachcode der Website: de, en, tr → wird auf DEU, ENG, TUR gemappt
 */
export async function fetchEstateFieldMetadata(
  lang: string = "de"
): Promise<EstateFieldMetadata> {
  const token = process.env.ONOFFICE_API_KEY;
  const secret = process.env.ONOFFICE_API_SECRET;

  if (!token || !secret) {
    return { labels: {}, permittedValues: {} };
  }

  const langLower = lang.toLowerCase();
  const isoLang = LANG_TO_ISO[langLower] ?? LANG_TO_ISO.de;

  const primary = await fetchFieldsForLanguage(token, secret, isoLang);

  if (langLower === "tr") {
    const fallback = await fetchFieldsForLanguage(token, secret, "ENG");
    const mergedPermitted: Record<string, Record<string, string>> = { ...fallback.permittedValues };
    for (const [fieldName, valueMap] of Object.entries(primary.permittedValues)) {
      mergedPermitted[fieldName] = { ...fallback.permittedValues[fieldName], ...valueMap };
    }
    return {
      labels: primary.labels,
      permittedValues: mergedPermitted,
    };
  }

  return primary;
}

/**
 * Ruft die Feldbeschreibungen (Labels) für Estate-Felder von der onOffice-API ab.
 * @deprecated Nutze fetchEstateFieldMetadata für Labels und permittedValues.
 */
export async function fetchEstateFieldLabels(
  lang: string = "de"
): Promise<Record<string, string>> {
  const meta = await fetchEstateFieldMetadata(lang);
  return meta.labels;
}

/**
 * Ruft eine einzelne Immobilie anhand der ID oder objektnr_extern (Slug) von der onOffice-API ab.
 * Slug kann sein: numerische ID (z. B. "57") oder objektnr_extern (z. B. "EFH-K-26-002").
 * Fallback: Bei Fehler 141 (unbekanntes Feld) wird mit reduzierter Feldliste erneut versucht.
 * @param slug - ID oder objektnr_extern
 * @param lang - Sprachcode (de, en, tr), wird an onOffice als estatelanguage (DEU/ENG/TUR) übergeben
 */
export async function fetchPropertyById(
  slug: string | number,
  lang: string = "de"
): Promise<Property | null> {
  try {
    const token = process.env.ONOFFICE_API_KEY;
    const secret = process.env.ONOFFICE_API_SECRET;

    if (!token || !secret) {
      throw new Error(
        "Fehlende onOffice-Zugangsdaten: ONOFFICE_API_KEY und ONOFFICE_API_SECRET müssen in .env.local gesetzt sein."
      );
    }

    const slugStr = String(slug).trim();
    const useNumericId = /^\d+$/.test(slugStr);
    const numericId = useNumericId ? parseInt(slugStr, 10) : null;

    const doFetch = async (dataFields: string[], slugToTry: string = slugStr): Promise<{ ok: true; record: OnOfficeRecord } | { ok: false; errorcode?: number; json: OnOfficeReadResponse }> => {
      const timestamp = String(Math.floor(Date.now() / 1000));
      const actionid = READ_ACTION_ID;
      const resourcetype = RESOURCE_TYPE_ESTATE;
      const hmac = buildHmac(secret, timestamp, token, resourcetype, actionid);

      const parameters: Record<string, unknown> = { data: dataFields };
      const isoLang = LANG_TO_ISO[lang.toLowerCase()] ?? LANG_TO_ISO.de;
      parameters.estatelanguage = isoLang;
      if (!useNumericId) {
        parameters.filter = {
          objektnr_extern: [{ op: "=", val: slugToTry }],
          status: [{ op: "=", val: "1" }],
        };
        parameters.listlimit = 1;
      }

      const res = await fetch(ONOFFICE_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          request: {
            actions: [
              {
                actionid,
                resourceid: useNumericId && numericId != null ? String(numericId) : "",
                resourcetype,
                identifier: "",
                timestamp,
                hmac,
                hmac_version: "2",
                parameters,
              },
            ],
          },
        }),
      });

      if (!res.ok) {
        return {
          ok: false,
          errorcode: undefined,
          json: { status: { code: res.status, message: res.statusText } } as OnOfficeReadResponse,
        };
      }

      const json = (await res.json()) as OnOfficeReadResponse;
      const statusCode = json.status?.code ?? json.response?.results?.[0]?.status?.code;
      const resultStatus = json.response?.results?.[0]?.status;
      const errorcode = resultStatus?.errorcode ?? json.status?.errorcode;

      if (statusCode !== 200) {
        return { ok: false, errorcode, json };
      }

      const records = json.response?.results?.[0]?.data?.records ?? [];
      const record = records[0];
      if (!record) return { ok: false, errorcode: undefined, json };

      return { ok: true, record };
    };

    /** Extrahiert Feldnamen aus API-Fehlermeldung (z. B. "Unknown field: denkmalschutzobjekt"). */
    const parseFieldFrom141Message = (message: string): string | null => {
      if (!message || typeof message !== "string") return null;
      const m = message.trim();
      const patterns = [
        /Unknown field:\s*['"]?(\w+)['"]?/i,
        /Feld\s+['"]?(\w+)['"]?\s+(?:ist )?unbekannt/i,
        /unknown field:\s*(\w+)/i,
        /field\s+['"]?(\w+)['"]?\s+not found/i,
        /(?:invalid|invalid field)\s+['"]?(\w+)['"]?/i,
      ];
      for (const re of patterns) {
        const match = m.match(re);
        if (match?.[1]) return match[1];
      }
      return null;
    };

    let fields = [...getDetailDataFields()];
    const coreFields = getDetailDataFieldsCore();
    const maxRetries = 25;
    let retryCount = 0;
    let result = await doFetch(fields);

    while (!result.ok && result.errorcode === 141 && retryCount < maxRetries) {
      const msg =
        result.json.response?.results?.[0]?.status?.message ??
        result.json.status?.message ??
        "";
      const fieldName = parseFieldFrom141Message(String(msg));

      if (fieldName && fields.includes(fieldName)) {
        console.warn(`Entferne Feld [${fieldName}] wegen API-Error 141.`);
        fields = fields.filter((f) => f !== fieldName);
        retryCount++;
        result = await doFetch(fields);
      } else {
        console.warn("[onOffice API fetchPropertyById] Error 141: Feldname aus Meldung nicht extrahierbar oder bereits entfernt. Fallback auf Core-Liste.");
        result = await doFetch(coreFields);
        break;
      }
    }

    // Fallback: onOffice speichert objektnr_extern oft großgeschrieben (z. B. EFH-K-26-001)
    if (!result.ok && !useNumericId && slugStr !== slugStr.toUpperCase()) {
      result = await doFetch(fields, slugStr.toUpperCase());
    }

    if (!result.ok) {
      const { json, errorcode } = result;
      const msg =
        json.response?.results?.[0]?.status?.message ??
        json.status?.message ??
        "Unbekannter API-Fehler";
      console.error("[onOffice API fetchPropertyById] --- Fehler-Antwort ---");
      console.error("[onOffice API fetchPropertyById] errorcode:", errorcode);
      console.error("[onOffice API fetchPropertyById] message:", msg);
      return null;
    }

    const { record } = result;
    const property = mapRecordToPropertyDetail(record);

    const estateId = record.id;
    const pictureUrls = await fetchEstatePictures(estateId, token, secret);
    if (pictureUrls.length > 0) {
      property.galerie = pictureUrls;
    }

    return property;
  } catch (err) {
    console.error("[onOffice API fetchPropertyById] Unerwarteter Fehler:", err);
    return null;
  }
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

/**
 * Ruft das Titelbild (oder Fallback: erstes Foto) einer Immobilie für die Listen-Vorschau ab.
 * Kleinere Größe (400x300) für Karten.
 */
async function fetchEstateTitelbild(
  estateId: number,
  token: string,
  secret: string
): Promise<string | null> {
  const timestamp = String(Math.floor(Date.now() / 1000));
  const actionid = GET_ACTION_ID;
  const resourcetype = RESOURCE_TYPE_ESTATE_PICTURES;
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
              estateids: [estateId],
              categories: ["Titelbild", "Foto", "Foto_gross"],
              size: "400x300",
            },
          },
        ],
      },
    }),
  });

  if (!res.ok) return null;

  const json = (await res.json()) as EstatePicturesResponse;
  const statusCode = json.status?.code ?? json.response?.results?.[0]?.status?.code;
  if (statusCode !== 200) return null;

  const records = json.response?.results?.[0]?.data?.records ?? [];
  let titelbildUrl: string | null = null;
  let fallbackUrl: string | null = null;

  for (const rec of records) {
    const elements = rec.elements;
    if (!elements) continue;
    const arr = Array.isArray(elements) ? elements : [elements];
    for (const el of arr) {
      const obj = el as Record<string, unknown>;
      const url = obj?.url;
      if (typeof url !== "string" || !url.startsWith("http")) continue;
      const type = String(rec.type ?? "").toLowerCase();
      if (type === "titelbild") {
        titelbildUrl = url;
        break;
      }
      if (!fallbackUrl) fallbackUrl = url;
    }
    if (titelbildUrl) break;
  }

  return titelbildUrl ?? fallbackUrl;
}

/** Lädt Titelbilder für mehrere Estates (für Listen-Vorschau). Nutzt Chunks, um API nicht zu überlasten. */
async function fetchEstatePicturesForList(
  estateIds: number[],
  token: string,
  secret: string
): Promise<Map<number, string>> {
  const map = new Map<number, string>();
  const CHUNK = 10;
  for (let i = 0; i < estateIds.length; i += CHUNK) {
    const chunk = estateIds.slice(i, i + CHUNK);
    const results = await Promise.all(
      chunk.map(async (id) => {
        const url = await fetchEstateTitelbild(id, token, secret);
        return [id, url] as const;
      })
    );
    for (const [id, url] of results) {
      if (url) map.set(id, url);
    }
  }
  return map;
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

/** Daten für Suchauftrag-Interessent (Adresse + Suchkriterien) */
export interface SearchRequestInterestedData {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  /** Objekttyp z. B. "Einfamilienhaus", "Wohnung" → wird auf onOffice objektart gemappt */
  objekttyp?: string;
  /** Regionale Keywords (z. B. Weinheim, Bensheim) → regionaler_zusatz */
  regionaler_fokus?: string[] | string;
  /** Umkreis in km → range (Suchkriterium) */
  range?: number | string;
  /** Max. Preis → kaufpreis__bis */
  price_max?: number | string;
  /** Weitere Suchkriterien (z. B. wohnflaeche__bis, anzahl_zimmer) – nur wenn in onOffice als Suchkriterium aktiv */
  wohnflaeche?: number | string;
  zimmeranzahl?: string;
  /** Mindest-Wohnfläche (m²) → wohnflaeche__von */
  wohnflaeche_min?: number | string;
  /** Mindest-Zimmeranzahl → anzahl_zimmer__von */
  anzahl_zimmer_min?: number | string;
  /** Vermarktungsart: kauf (default) oder miete */
  vermarktungsart?: "kauf" | "miete";
  /** Freitext für Bemerkung (krit_bemerkung_oeffentlich) */
  bemerkung?: string;
  /** Umkreis-Suche: Straße (für Suchzentrum) */
  range_strasse?: string;
  /** Umkreis-Suche: Hausnummer */
  range_hausnummer?: string;
  /** Umkreis-Suche: PLZ */
  range_plz?: string;
  /** Umkreis-Suche: Ort */
  range_ort?: string;
  /** Umkreis-Suche: Land (z. B. Deutschland) */
  range_land?: string;
  /** Kaufpreis mindestens → kaufpreis__von */
  price_min?: number | string;
}

/**
 * Mappt Formular-Body (z. B. von SearchRequestForm / send-contact) auf SearchRequestInterestedData.
 */
export function mapFormBodyToSearchRequestData(
  body: Record<string, unknown>
): SearchRequestInterestedData {
  const firstname =
    (body.firstname as string)?.trim() ?? (body.vorname as string)?.trim() ?? "";
  const lastname =
    (body.lastname as string)?.trim() ?? (body.nachname as string)?.trim() ?? "";
  const email = (body.email as string)?.trim() ?? "";
  const phone =
    (body.phone as string)?.trim() ?? (body.telefon as string)?.trim() ?? "";

  let regionaler_fokus: string[] | string | undefined;
  if (body.regionaler_fokus != null) {
    if (Array.isArray(body.regionaler_fokus)) {
      regionaler_fokus = (body.regionaler_fokus as string[]).map((s) =>
        String(s).trim()
      ).filter(Boolean);
    } else {
      regionaler_fokus = String(body.regionaler_fokus).trim();
    }
  } else if (body.lageRegion != null && String(body.lageRegion).trim()) {
    const lageRegion = String(body.lageRegion).trim();
    regionaler_fokus = lageRegion
      .split(/[,;/\n]+/)
      .map((s) => s.trim())
      .filter(Boolean);
    if (regionaler_fokus.length === 1) regionaler_fokus = regionaler_fokus[0];
    else if (regionaler_fokus.length === 0) regionaler_fokus = undefined;
  }

  const rangeRaw =
    body.range != null && body.range !== ""
      ? typeof body.range === "number"
        ? body.range
        : Number(String(body.range).replace(",", "."))
      : undefined;
  const umkreisRaw =
    body.umkreis != null && body.umkreis !== ""
      ? typeof body.umkreis === "number"
        ? body.umkreis
        : Number(String(body.umkreis).replace(",", "."))
      : undefined;
  const range =
    rangeRaw != null && !Number.isNaN(rangeRaw)
      ? rangeRaw
      : umkreisRaw != null && !Number.isNaN(umkreisRaw)
        ? umkreisRaw
        : undefined;
  const price_max = parsePrice(body.price_max ?? body.preisMax);
  const price_minRaw = body.price_min ?? body.preisMin;
  const price_min = parsePrice(price_minRaw);

  const range_plz = (body.range_plz as string)?.trim() ?? (body.plz as string)?.trim() ?? undefined;
  const range_ort = (body.range_ort as string)?.trim() ?? (body.ort as string)?.trim() ?? undefined;
  const range_strasse = (body.range_strasse as string)?.trim() ?? (body.strasse as string)?.trim() ?? undefined;
  const range_hausnummer = (body.range_hausnummer as string)?.trim() ?? undefined;
  const range_land = (body.range_land as string)?.trim() || "Deutschland";

  return {
    firstname,
    lastname,
    email,
    phone,
    objekttyp: (body.objekttyp as string)?.trim() || undefined,
    regionaler_fokus,
    range,
    price_max,
    price_min,
    wohnflaeche: (body.wohnflaeche as string)?.trim() || undefined,
    wohnflaeche_min:
      body.wohnflaeche_min != null && body.wohnflaeche_min !== ""
        ? (typeof body.wohnflaeche_min === "number" ? body.wohnflaeche_min : String(body.wohnflaeche_min))
        : undefined,
    zimmeranzahl: (body.zimmeranzahl as string)?.trim() || undefined,
    anzahl_zimmer_min:
      body.anzahl_zimmer_min != null && body.anzahl_zimmer_min !== ""
        ? (typeof body.anzahl_zimmer_min === "number" ? body.anzahl_zimmer_min : String(body.anzahl_zimmer_min))
        : undefined,
    vermarktungsart: (body.vermarktungsart as "kauf" | "miete") ?? "kauf",
    bemerkung:
      (body.weitereWuensche as string)?.trim() ||
      (body.bemerkung as string)?.trim() ||
      undefined,
    range_plz: range_plz || undefined,
    range_ort: range_ort || undefined,
    range_strasse: range_strasse || undefined,
    range_hausnummer: range_hausnummer || undefined,
    range_land: range_land || undefined,
  };
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
 * Liest Adressen mit Filter (z. B. E-Mail). Gibt die ersten gefundenen Records zurück.
 * Bei Fehler oder fehlenden Zugangsdaten: leeres Array.
 */
async function readAddresses(
  token: string,
  secret: string,
  filter: Record<string, Array<{ op: string; val: unknown }>>,
  dataFields: string[] = ["Id", "email", "Vorname", "Name"]
): Promise<OnOfficeRecord[]> {
  const timestamp = String(Math.floor(Date.now() / 1000));
  const hmac = buildHmac(secret, timestamp, token, RESOURCE_TYPE_ADDRESS, READ_ACTION_ID);
  const res = await fetch(ONOFFICE_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token,
      request: {
        actions: [
          {
            actionid: READ_ACTION_ID,
            resourceid: "",
            resourcetype: RESOURCE_TYPE_ADDRESS,
            identifier: "",
            timestamp,
            hmac,
            hmac_version: "2",
            parameters: { data: dataFields, listlimit: 10, filter },
          },
        ],
      },
    }),
  });
  if (!res.ok) return [];
  const json = (await res.json()) as OnOfficeReadResponse;
  const code = json.status?.code ?? json.response?.results?.[0]?.status?.code;
  if (code !== 200) return [];
  return json.response?.results?.[0]?.data?.records ?? [];
}

/**
 * Sucht eine Adresse anhand der E-Mail. Gibt die erste gefundene Adress-ID zurück oder null.
 * Nutzt defaultemail bzw. email-Felder (onOffice kann je Konfiguration variieren).
 */
async function findAddressIdByEmail(
  token: string,
  secret: string,
  email: string
): Promise<number | null> {
  const trimmed = email.trim().toLowerCase();
  if (!trimmed) return null;
  const records = await readAddresses(token, secret, {
    defaultemail: [{ op: "=", val: trimmed }],
  });
  if (records.length > 0) return records[0].id;
  const recordsByEmail = await readAddresses(token, secret, {
    email: [{ op: "like", val: `%${trimmed}%` }],
  });
  return recordsByEmail.length > 0 ? recordsByEmail[0].id : null;
}

/**
 * Erstellt einen minimalen Adressdatensatz (firstname, lastname, email, phone).
 * Gibt die neue Adress-ID zurück.
 */
async function createAddressMinimal(
  token: string,
  secret: string,
  data: { firstname: string; lastname: string; email: string; phone: string }
): Promise<{ addressId: number } | { error: string }> {
  const timestamp = String(Math.floor(Date.now() / 1000));
  const hmac = buildHmac(secret, timestamp, token, RESOURCE_TYPE_ADDRESS, CREATE_ACTION_ID);
  const createParams: Record<string, unknown> = {
    Vorname: data.firstname.trim(),
    Name: data.lastname.trim(),
    email: data.email.trim(),
    phone: data.phone.trim(),
    default_phone: data.phone.trim(),
    Land: "Deutschland",
  };
  const createRes = await fetch(ONOFFICE_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token,
      request: {
        actions: [
          {
            actionid: CREATE_ACTION_ID,
            resourceid: "",
            resourcetype: RESOURCE_TYPE_ADDRESS,
            identifier: "",
            timestamp,
            hmac,
            hmac_version: "2",
            parameters: createParams,
          },
        ],
      },
    }),
  });
  if (!createRes.ok) {
    const errBody = await createRes.text();
    console.error("[onOffice createAddress] HTTP nicht OK:", createRes.status, createRes.statusText);
    console.error("[onOffice createAddress] Response-Body:", errBody);
    return { error: `onOffice Adresse: HTTP ${createRes.status}` };
  }
  const createJson = (await createRes.json()) as OnOfficeCreateResponse;
  const status = createJson.status?.code ?? createJson.response?.results?.[0]?.status?.code;
  if (status !== 200) {
    const msg =
      createJson.response?.results?.[0]?.status?.message ??
      createJson.status?.message ??
      "onOffice Adresse anlegen fehlgeschlagen";
    console.error("[onOffice createAddress] Status nicht 200:", status);
    console.error("[onOffice createAddress] Fehlermeldung:", msg);
    console.error("[onOffice createAddress] Vollständige Server-Antwort:", JSON.stringify(createJson, null, 2));
    return { error: msg };
  }
  const newRecords = createJson.response?.results?.[0]?.data?.records ?? [];
  const id = newRecords[0]?.id;
  if (id == null) {
    console.error("[onOffice createAddress] Keine Adress-ID in Response. Vollständige Antwort:", JSON.stringify(createJson, null, 2));
    return { error: "onOffice: Keine Adress-ID in Response" };
  }
  console.log("[onOffice createAddress] Adresse erfolgreich angelegt, addressId:", id);
  return { addressId: id };
}

/**
 * Erstellt einen Suchauftrag (searchcriteria) für eine Adress-ID.
 * data: objektart (als string oder string[]), vermarktungsart, range, kaufpreis__bis, regionaler_zusatz, etc.
 * onOffice erwartet objektart oft als Array (z. B. ['Haus']).
 */
async function createSearchCriteria(
  token: string,
  secret: string,
  addressId: number,
  data: Record<string, string | number | string[] | number[]>
): Promise<{ success: true } | { error: string }> {
  const timestamp = String(Math.floor(Date.now() / 1000));
  const hmac = buildHmac(
    secret,
    timestamp,
    token,
    RESOURCE_TYPE_SEARCHCRITERIA,
    CREATE_ACTION_ID
  );
  const params: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(data)) {
    if (v === undefined || v === null || v === "") continue;
    if (Array.isArray(v)) {
      params[k] = v;
    } else if (typeof v === "number") {
      params[k] = v;
    } else {
      params[k] = v;
    }
  }
  const body = {
    token,
    request: {
      actions: [
        {
          actionid: CREATE_ACTION_ID,
          resourceid: "",
          resourcetype: RESOURCE_TYPE_SEARCHCRITERIA,
          identifier: "",
          timestamp,
          hmac,
          hmac_version: "2",
          parameters: {
            addressid: String(addressId),
            data: params,
          },
        },
      ],
    },
  };
  console.log("[onOffice createSearchCriteria] addressId:", addressId, "data-Parameter:", JSON.stringify(params));
  const res = await fetch(ONOFFICE_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const errBody = await res.text();
    console.error("[onOffice createSearchCriteria] HTTP nicht OK:", res.status, res.statusText);
    console.error("[onOffice createSearchCriteria] Response-Body:", errBody);
    return { error: `onOffice Suchkriterien: HTTP ${res.status}` };
  }
  const json = (await res.json()) as OnOfficeCreateResponse;
  const status = json.status?.code ?? json.response?.results?.[0]?.status?.code;
  if (status !== 200) {
    const msg =
      json.response?.results?.[0]?.status?.message ??
      json.status?.message ??
      "onOffice Suchkriterien anlegen fehlgeschlagen";
    console.error("[onOffice createSearchCriteria] Status nicht 200:", status);
    console.error("[onOffice createSearchCriteria] Fehlermeldung:", msg);
    console.error("[onOffice createSearchCriteria] Vollständige Server-Antwort:", JSON.stringify(json, null, 2));
    return { error: msg };
  }
  console.log("[onOffice createSearchCriteria] Suchauftrag erfolgreich angelegt für addressId:", addressId);
  return { success: true };
}

/**
 * Liest aus einer onOffice-Fehlermeldung den Namen eines unbekannten Feldes (Unknown field).
 * Gibt den Feldnamen zurück oder null, wenn nicht erkennbar.
 */
function parseUnknownFieldFromError(message: string): string | null {
  if (!message || typeof message !== "string") return null;
  const m = message.trim();
  const patterns = [
    /Unknown field:\s*['"]?(\w+)['"]?/i,
    /Feld\s+['"]?(\w+)['"]?\s+(?:ist )?unbekannt/i,
    /unknown field:\s*(\w+)/i,
    /field\s+['"]?(\w+)['"]?\s+not found/i,
    /(?:invalid|ungültig).*?field\s+['"]?(\w+)['"]?/i,
    /Error \d+.*?['"]?(\w+)['"]?/i,
  ];
  for (const re of patterns) {
    const match = m.match(re);
    if (match?.[1]) return match[1];
  }
  return null;
}

/**
 * Legt einen Interessenten für einen Suchauftrag in onOffice an:
 * 1. Adresse ermitteln oder anlegen (Suche per E-Mail; bei Treffer bestehende Adress-ID nutzen, sonst neue Adresse mit firstname, lastname, email, phone).
 * 2. Suchauftrag (searchcriteria) für diese Adress-ID anlegen mit gemappten Suchkriterien.
 *
 * Mapping: objekttyp → objektart (Array), wohnflaeche → wohnflaeche__von, zimmer → anzahl_zimmer__von, price_max → kaufpreis__bis.
 * Region in Bemerkung. Bei Unknown-field-Fehler wird das betroffene Feld entfernt und erneut gesendet.
 */
export async function createSearchRequestInterested(
  data: SearchRequestInterestedData
): Promise<{ success: true; addressId: number } | { success: false; error: string }> {
  const token = process.env.ONOFFICE_API_KEY;
  const secret = process.env.ONOFFICE_API_SECRET;

  if (!token || !secret) {
    return { success: false, error: "Fehlende onOffice-Zugangsdaten" };
  }

  const email = data.email?.trim();
  if (!email) {
    return { success: false, error: "E-Mail-Adresse ist erforderlich" };
  }

  let addressId: number;

  const existingId = await findAddressIdByEmail(token, secret, email);
  if (existingId != null) {
    addressId = existingId;
    console.log("[onOffice createSearchRequestInterested] Bestehende Adresse verwendet, addressId:", addressId);
  } else {
    const created = await createAddressMinimal(token, secret, {
      firstname: data.firstname?.trim() ?? "",
      lastname: data.lastname?.trim() ?? "",
      email,
      phone: data.phone?.trim() ?? "",
    });
    if ("error" in created) {
      return { success: false, error: created.error };
    }
    addressId = created.addressId;
    console.log("[onOffice createSearchRequestInterested] Neue Adresse angelegt, addressId:", addressId);
  }

  console.log("[onOffice createSearchRequestInterested] addressId erfolgreich:", addressId, "- rufe jetzt createSearchCriteria auf.");

  const formObjekttyp = data.objekttyp?.trim();
  const objektart =
    formObjekttyp
      ? OBJEKTTYP_TO_ONOFFICE[formObjekttyp] ?? formObjekttyp.toLowerCase().replace(/\s+/g, "_")
      : undefined;
  const objekttypValue =
    formObjekttyp
      ? OBJEKTTYP_TO_TYP_VALUE[formObjekttyp] ?? formObjekttyp.toLowerCase().replace(/\s+/g, "_")
      : undefined;

  const regionalerZusatz = Array.isArray(data.regionaler_fokus)
    ? data.regionaler_fokus.filter(Boolean).join(", ")
    : typeof data.regionaler_fokus === "string"
      ? data.regionaler_fokus.trim()
      : undefined;
  const bemerkungParts: string[] = [];
  if (data.bemerkung?.trim()) bemerkungParts.push(data.bemerkung.trim());
  if (regionalerZusatz) bemerkungParts.push(`Region: ${regionalerZusatz}`);
  if (formObjekttyp) bemerkungParts.push(`Objektart/Objekttyp: ${formObjekttyp}`);
  const bemerkungMitRegion = bemerkungParts.length > 0 ? bemerkungParts.join("\n") : undefined;

  const rangeVal =
    data.range != null && data.range !== ""
      ? typeof data.range === "number"
        ? data.range
        : parseInt(String(data.range).replace(/\D/g, ""), 10)
      : undefined;
  const rangeStr = rangeVal != null && !Number.isNaN(rangeVal) ? String(rangeVal) : undefined;

  const priceMaxNum = parsePrice(data.price_max);
  const priceMinNum = parsePrice(data.price_min);

  const searchData: Record<string, string | number | string[] | number[]> = {
    vermarktungsart: data.vermarktungsart ?? "kauf",
  };
  if (objektart) {
    searchData.objektart = objektart;
  }
  if (objekttypValue) {
    searchData.objekttyp = [objekttypValue];
  }
  if (rangeStr) searchData.range = rangeStr;
  if (priceMaxNum != null) searchData.kaufpreis__bis = String(Math.round(priceMaxNum));
  if (priceMinNum != null) searchData.kaufpreis__von = String(Math.round(priceMinNum));
  if (bemerkungMitRegion) searchData.krit_bemerkung_oeffentlich = bemerkungMitRegion;
  // Umkreis: Adresse für Suchzentrum (vermeidet "Adresse ungültig" in onOffice)
  if (data.range_plz?.trim()) searchData.range_plz = data.range_plz.trim();
  if (data.range_ort?.trim()) searchData.range_ort = data.range_ort.trim();
  if (data.range_strasse?.trim()) searchData.range_strasse = data.range_strasse.trim();
  if (data.range_hausnummer?.trim()) searchData.range_hausnummer = data.range_hausnummer.trim();
  if (data.range_land?.trim()) searchData.range_land = data.range_land.trim();
  // Standard-Feldnamen für Suchkriterien: zwei Unterstriche __von / __bis (laut onOffice-Doku)
  const wohnflaecheVon =
    data.wohnflaeche_min != null && data.wohnflaeche_min !== ""
      ? typeof data.wohnflaeche_min === "number"
        ? data.wohnflaeche_min
        : parseFloat(String(data.wohnflaeche_min))
      : data.wohnflaeche != null && data.wohnflaeche !== ""
        ? typeof data.wohnflaeche === "number"
          ? data.wohnflaeche
          : parseFloat(String(data.wohnflaeche))
        : undefined;
  if (wohnflaecheVon != null && !Number.isNaN(wohnflaecheVon)) {
    searchData.wohnflaeche__von = String(Math.round(wohnflaecheVon));
  }
  const zimmerVon =
    data.anzahl_zimmer_min != null && data.anzahl_zimmer_min !== ""
      ? typeof data.anzahl_zimmer_min === "number"
        ? data.anzahl_zimmer_min
        : parseFloat(String(data.anzahl_zimmer_min))
      : data.zimmeranzahl?.trim()
        ? parseFloat(String(data.zimmeranzahl).replace(/\D/g, "")) || undefined
        : undefined;
  if (zimmerVon != null && !Number.isNaN(zimmerVon)) {
    searchData.anzahl_zimmer__von = String(Math.round(zimmerVon));
  }
  // kaufpreis__bis bleibt gesetzt, falls priceMax vorhanden (siehe oben)
  // objektart bleibt Array ["haus"]

  const maxRetries = 5;
  let lastError: string = "";
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const criteriaResult = await createSearchCriteria(token, secret, addressId, searchData);
    if ("success" in criteriaResult && criteriaResult.success) {
      return { success: true, addressId };
    }
    lastError = "error" in criteriaResult ? criteriaResult.error : "";
    const unknownField = parseUnknownFieldFromError(lastError);
    if (!unknownField) break;
    if (unknownField in searchData) {
      console.warn("[onOffice createSearchRequestInterested] Unknown field entfernt, erneuter Versuch:", unknownField);
      delete searchData[unknownField];
    } else {
      break;
    }
  }
  return { success: false, error: lastError };
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
