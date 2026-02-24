import { fetchProperties } from "@/lib/onoffice";
import PropertyCard from "./PropertyCard";
import PropertyGridSkeleton from "./PropertyGridSkeleton";

interface PropertiesGridProps {
  ortFilter: string;
  noResultsText: string;
}

export default async function PropertiesGrid({
  ortFilter,
  noResultsText,
}: PropertiesGridProps) {
  const all = await fetchProperties({
    vermarktungsart: "Kauf",
    listlimit: 500,
  }).catch(() => []);

  const properties = ortFilter === "alle" ? all : all.filter((p) => p.ort === ortFilter);

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
