export interface Property {
  id: string;
  titel: string;
  preis: number;
  quadratmeter: number;
  ort: string;
  zimmer: number;
  beschreibung: string;
  vorschaubild: string;
  galerie: string[];
  status: "verfügbar" | "reserviert" | "verkauft";
}

export interface Rental {
  id: string;
  titel: string;
  kaltmiete: number;
  quadratmeter: number;
  ort: string;
  zimmer: number;
  objekttyp: "Wohnung" | "Haus" | "Gewerbe";
  status: "Neu" | "Reserviert" | "Verfügbar";
  vorschaubild: string;
  beschreibung?: string;
}

export interface LogisticsService {
  id: string;
  titel: string;
  beschreibung: string;
  "icon-name": string;
}
