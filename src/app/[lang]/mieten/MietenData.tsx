import { fetchProperties } from "@/lib/onoffice";
import type { Rental } from "@/types";
import MietenContent from "./MietenContent";
import type { MietenDict } from "./MietenContent";

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
  titelbild: string | null;
  anzahl_zimmer?: number | null;
}): Rental {
  return {
    id: String(p.id),
    titel: p.titel || "Ohne Titel",
    kaltmiete: p.kaltmiete ?? 0,
    quadratmeter: p.wohnflaeche ?? 0,
    ort: p.ort ?? "",
    zimmer: p.anzahl_zimmer ?? 0,
    objekttyp: "Wohnung",
    status: "Verfügbar",
    vorschaubild: p.titelbild ?? "",
  };
}

export default async function MietenData({ dict, lang }: MietenDataProps) {
  const properties = await fetchProperties({
    vermarktungsart: "Miete",
    listlimit: 500,
  }).catch(() => []);

  const rentals: Rental[] = properties.map(mapOnOfficeToRental);

  return <MietenContent rentals={rentals} dict={dict} lang={lang} />;
}
