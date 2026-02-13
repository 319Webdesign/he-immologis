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

export interface LogisticsService {
  id: string;
  titel: string;
  beschreibung: string;
  "icon-name": string;
}
