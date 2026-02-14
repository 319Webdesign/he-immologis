import type { Metadata } from "next";
import { Suspense } from "react";
import MietenContent from "./MietenContent";
import rentalsData from "@/data/rentals.json";
import type { Rental } from "@/types";

export const metadata: Metadata = {
  title: "Mietobjekte Weinheim",
  description:
    "Finden Sie Ihr neues Zuhause in Weinheim und der Region Bergstraße. Wohnungen, Häuser und Gewerbe – persönlich betreut von HE immologis.",
  keywords: [
    "Mietwohnung Weinheim",
    "Haus mieten Bergstraße",
    "Wohnung zur Miete Weinheim",
    "HE immologis Mieten",
  ],
};

const allRentals = rentalsData as Rental[];

export default function MietenPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-zinc-100 bg-white px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="font-sans text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
            Mietobjekte in Weinheim & Region
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600">
            Finden Sie Ihr neues Zuhause. Persönlich betreut und sorgfältig
            ausgewählt.
          </p>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Suspense fallback={<div className="h-14 rounded-xl bg-zinc-100" />}>
          <MietenContent rentals={allRentals} />
        </Suspense>
      </section>
    </>
  );
}
