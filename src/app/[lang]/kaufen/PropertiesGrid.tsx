import { arePropertyListingsPubliclyVisible } from "@/lib/listingsVisibility";
import { fetchProperties, fetchEstateFieldMetadata } from "@/lib/onoffice";
import PropertyCard from "./PropertyCard";
import PropertyGridSkeleton from "./PropertyGridSkeleton";

export type KaufenCardLabels = {
  forSale?: string;
  noTitle?: string;
  rooms?: string;
  bedrooms?: string;
  bathrooms?: string;
  livingArea?: string;
  plot?: string;
  coldRent?: string;
};

interface PropertiesGridProps {
  ortFilter: string;
  noResultsText: string;
  lang?: string;
  cardLabels?: KaufenCardLabels;
}

/** Platzhalter, wenn keine Immobilien gelistet werden. */
const EMPTY_STATE_MESSAGE =
  "Aktuell sind in dieser Kategorie keine Objekte eingestellt. Melden Sie sich gern bei uns für exklusive Vorab-Informationen!";

export default async function PropertiesGrid({
  ortFilter,
  noResultsText,
  lang,
  cardLabels,
}: PropertiesGridProps) {
  const [allProperties, fieldMeta] = await Promise.all([
    fetchProperties({ vermarktungsart: "Kauf", listlimit: 500, lang }).catch(() => []),
    lang ? fetchEstateFieldMetadata(lang) : Promise.resolve({ labels: {}, permittedValues: {} }),
  ]);

  const permittedValues =
    Object.keys(fieldMeta.permittedValues).length > 0 ? fieldMeta.permittedValues : undefined;

  const properties =
    ortFilter === "alle" ? allProperties : allProperties.filter((p) => p.ort === ortFilter);

  if (!arePropertyListingsPubliclyVisible()) {
    return (
      <p className="mt-10 text-center text-zinc-600">
        {EMPTY_STATE_MESSAGE}
      </p>
    );
  }

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
        <PropertyCard
          key={property.id}
          property={property}
          permittedValues={permittedValues}
          cardLabels={cardLabels}
        />
      ))}
    </div>
  );
}
