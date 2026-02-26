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

/** Optionale Detailfelder für die Immobilien-Detailseite (Template) */
export interface PropertyDetails {
  immoNr?: string;
  kennung?: string;
  objekttyp?: string;
  objektart?: string;
  baujahr?: number;
  vermietet?: boolean;
  nutzflaeche?: number;
  grundstuecksflaeche?: number;
  verfuegbarAb?: string;
  aussenprovision?: number;
  strasse?: string;
  plz?: string;
  nutzungsart?: string;
  anzahlKueche?: number;
  anzahlSchlafzimmer?: number;
  anzahlWohnzimmer?: number;
  anzahlBad?: number;
  anzahlGaesteWc?: number;
  anzahlBalkone?: number;
  anzahlTerrasse?: number;
  anzahlLoggia?: number;
  anzahlKeller?: number;
  etage?: number;
  etagenzahlGesamt?: number;
  nebenkosten?: number;
  garagePreis?: number;
  stellplatzPreis?: number;
  beheizung?: string;
  boden?: string;
  fahrstuhl?: boolean;
  anzahlStellplaetze?: number;
  anzahlGarage?: number;
  beschreibungLage?: string;
  energieBaujahr?: number;
  endenergieverbrauch?: number;
  energieausweistyp?: "Gebrauchsausweis" | "Bedarfsausweis";
  energieausweisGueltigBis?: string;
  energieeffizienzklasse?: "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H";
  wesentlicherEnergietraeger?: string;
}

export type PropertyWithDetails = Property & PropertyDetails;

export interface Rental {
  id: string;
  objektnr_extern?: string;
  titel: string;
  kaltmiete: number;
  quadratmeter: number;
  ort: string;
  plz?: string;
  zimmer: number;
  schlafzimmer?: number;
  badezimmer?: number;
  grundstuecksflaeche?: number;
  nebenkosten?: number;
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
