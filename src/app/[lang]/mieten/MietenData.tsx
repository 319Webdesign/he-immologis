import { fetchProperties } from "@/lib/onoffice";
import type { Rental } from "@/types";
import MietenContent from "./MietenContent";
import type { MietenDict } from "./MietenContent";

/** Platzhalter, wenn keine Mietobjekte vorhanden sind (z. B. Expansion Hessen). */
const EMPTY_STATE_MESSAGE =
  "Aktuell sind in dieser Kategorie keine Objekte eingestellt. Wir expandieren nach Hessen – melden Sie sich gern bei uns für exklusive Vorab-Informationen!";

interface MietenDataProps {
  dict: MietenDict;
  lang: string;
}

/** Mappt onOffice Property (Miete) auf Rental für die bestehende Grid-/Filter-Struktur. */
function mapOnOfficeToRental(p: {
  id: number;
  titel: string;
  kaltmiete: number | null;
  wohnflaeche: number | null;
  ort: string | null;
  galerie?: string[] | null;
  anzahl_zimmer?: number | null;
  objektart?: string | null;
}): Rental {
  const ot = (p.objektart ?? "").toLowerCase();
  const objekttyp: Rental["objekttyp"] =
    ot.includes("haus") ? "Haus" : ot.includes("gewerbe") ? "Gewerbe" : "Wohnung";
  return {
    id: String(p.id),
    titel: p.titel || "Ohne Titel",
    kaltmiete: p.kaltmiete ?? 0,
    quadratmeter: p.wohnflaeche ?? 0,
    ort: p.ort ?? "",
    zimmer: p.anzahl_zimmer ?? 0,
    objekttyp,
    status: "Verfügbar",
    vorschaubild: p.galerie?.[0] ?? "",
  };
}

export default async function MietenData({ dict, lang }: MietenDataProps) {
  const allProperties = await fetchProperties({
    vermarktungsart: "Miete",
    listlimit: 500,
  }).catch(() => []);

  if (allProperties.length === 0) {
    return (
      <p className="mt-10 text-center text-zinc-600">
        {EMPTY_STATE_MESSAGE}
      </p>
    );
  }

  const rentals: Rental[] = allProperties.map(mapOnOfficeToRental);

  return <MietenContent rentals={rentals} dict={dict} lang={lang} />;
}
