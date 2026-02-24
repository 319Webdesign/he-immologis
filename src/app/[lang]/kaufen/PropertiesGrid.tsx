import { fetchProperties } from "@/lib/onoffice";
import PropertyCard from "./PropertyCard";
import PropertyGridSkeleton from "./PropertyGridSkeleton";

interface PropertiesGridProps {
  ortFilter: string;
  noResultsText: string;
}

/** Platzhalter, wenn keine Immobilien vorhanden sind (z. B. Expansion Hessen). */
const EMPTY_STATE_MESSAGE =
  "Aktuell sind in dieser Kategorie keine Objekte eingestellt. Wir expandieren nach Hessen – melden Sie sich gern bei uns für exklusive Vorab-Informationen!";

export default async function PropertiesGrid({
  ortFilter,
  noResultsText,
}: PropertiesGridProps) {
  const allProperties = await fetchProperties({
    vermarktungsart: "Kauf",
    listlimit: 500,
  }).catch(() => []);

  const properties =
    ortFilter === "alle" ? allProperties : allProperties.filter((p) => p.ort === ortFilter);

  if (allProperties.length === 0) {
    return (
      <p className="mt-10 text-center text-zinc-600">
        {EMPTY_STATE_MESSAGE}
      </p>
    );
  }

  if (properties.length === 0) {
    return <p className="mt-10 text-center text-zinc-500">{noResultsText}</p>;
  }

  return (
    <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
