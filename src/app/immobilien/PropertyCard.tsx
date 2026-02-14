import Image from "next/image";
import Link from "next/link";
import { MapPin, Maximize2, BedDouble } from "lucide-react";
import type { Property } from "@/types";

interface PropertyCardProps {
  property: Property;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const isExternalImage = property.vorschaubild.startsWith("http");

  return (
    <Link
      href={`/immobilien/${property.id}`}
      className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-200">
        {isExternalImage ? (
          <Image
            src={property.vorschaubild}
            alt={property.titel}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-zinc-200 text-zinc-400">
            <Maximize2 className="h-16 w-16" />
          </div>
        )}
        <span
          className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-medium ${
            property.status === "verfügbar"
              ? "bg-green-100 text-green-800"
              : property.status === "reserviert"
                ? "bg-amber-100 text-amber-800"
                : "bg-zinc-100 text-zinc-600"
          }`}
        >
          {property.status}
        </span>
      </div>
      <div className="p-6">
        <h2 className="font-sans text-xl font-semibold text-zinc-900 group-hover:text-amber-800">
          {property.titel}
        </h2>
        <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-zinc-600">
          <span className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {property.ort}
          </span>
          {property.zimmer > 0 && (
            <span className="flex items-center gap-1">
              <BedDouble className="h-4 w-4" />
              {property.zimmer} Zi.
            </span>
          )}
          <span>{property.quadratmeter} m²</span>
        </div>
        <p className="mt-4 text-lg font-semibold text-amber-800">
          {formatPrice(property.preis)}
        </p>
      </div>
    </Link>
  );
}
