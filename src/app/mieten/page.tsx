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

      {/* Hinweise Maklerprovision / Bestellerprinzip */}
      <section
        className="border-t border-zinc-200 bg-white px-4 py-10 sm:px-6 sm:py-12 lg:px-8"
        aria-labelledby="mieten-hinweise-heading"
      >
        <div className="mx-auto max-w-4xl">
          <h2 id="mieten-hinweise-heading" className="sr-only">
            Hinweise zur Maklerprovision
          </h2>
          <div className="rounded-xl border border-zinc-200 bg-zinc-50/80 p-6 text-sm leading-relaxed text-zinc-700 sm:p-8">
            <span className="mb-4 inline-block rounded-full bg-zinc-200/80 px-3 py-1 text-xs font-medium uppercase tracking-wider text-zinc-500">
              Hinweise
            </span>
            <p className="font-medium text-zinc-800">
              In Baden-Württemberg und Hessen gilt beim Vermieten von Wohnraum das
              Bestellerprinzip. Das heißt, wer den Makler beauftragt, trägt die
              Kosten. Die Maklerprovision darf in Baden-Württemberg und Hessen
              zwei Nettokaltmieten zuzüglich 19 % Umsatzsteuer betragen, die der
              Makler für seine Tätigkeit erhält.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
