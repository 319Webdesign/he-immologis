"use client";

import PropertyCard from "./PropertyCard";
import type { Rental } from "@/types";
import Link from "next/link";

interface PropertyGridProps {
  properties: Rental[];
}

export default function PropertyGrid({ properties }: PropertyGridProps) {
  if (properties.length === 0) {
    return (
      <div className="rounded-2xl border border-zinc-200 bg-zinc-50/50 px-6 py-16 text-center sm:px-12 sm:py-24">
        <p className="font-sans text-lg text-zinc-600 sm:text-xl">
          Aktuell sind alle unsere Objekte vermietet. Lassen Sie sich vormerken!
        </p>
        <Link
          href="mailto:info@he-immologis.de?subject=Suchauftrag%20Mietobjekt"
          className="mt-8 inline-flex items-center justify-center rounded-lg bg-zinc-900 px-8 py-4 font-medium text-white transition-colors hover:bg-zinc-800"
        >
          Suchauftrag anlegen
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
