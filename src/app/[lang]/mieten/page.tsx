import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ChevronDown } from "lucide-react";
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
      {/* Hero mit Hintergrundbild */}
      <section
        className="relative flex min-h-[70vh] flex-col overflow-hidden border-b border-zinc-100 bg-cover bg-center bg-no-repeat px-4 pt-16 pb-24 sm:px-6 sm:pt-24 sm:pb-28 lg:bg-[length:100%_auto] lg:px-8"
        aria-labelledby="hero-mieten-heading"
        style={{
          backgroundImage: "url(/img/hero-mieten.jpeg)",
          backgroundColor: "#1e293b",
        }}
      >
        <div className="absolute inset-0 bg-slate-900/40" aria-hidden />
        <div className="relative z-10 mx-auto flex max-w-7xl flex-1 flex-col items-center justify-center text-center">
          <h1
            id="hero-mieten-heading"
            className="font-sans text-4xl font-semibold tracking-tight text-white drop-shadow-sm sm:text-5xl"
          >
            Mieten in Weinheim und Umgebung.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/95 drop-shadow-sm">
            Passend ausgewählt. Transparent vermittelt. Zuhause ankommen.
          </p>
        </div>
        <a
          href="#mietobjekte"
          className="absolute bottom-6 left-0 right-0 z-10 flex flex-col items-center gap-1 text-white/90 transition-colors hover:text-white sm:bottom-8"
          aria-label="Zu den Mietobjekten scrollen"
        >
          <span className="text-sm font-medium">Passende Mietimmobilie finden</span>
          <ChevronDown className="h-7 w-7 animate-bounce text-white/80" aria-hidden />
        </a>
      </section>

      {/* Filter + Grid */}
      <section id="mietobjekte" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Suspense fallback={<div className="h-14 rounded-xl bg-zinc-100" />}>
          <MietenContent rentals={allRentals} />
        </Suspense>
      </section>

      {/* Hinweis Maklerprovision / Bestellerprinzip */}
      <section
        className="border-t border-zinc-200 bg-white px-4 py-10 sm:px-6 sm:py-12 lg:px-8"
        aria-labelledby="mieten-hinweis-heading"
      >
        <div className="mx-auto max-w-4xl">
          <h2 id="mieten-hinweis-heading" className="sr-only">
            Hinweis zur Maklerprovision
          </h2>
          <div className="rounded-xl border border-zinc-200 bg-zinc-50/80 p-6 text-sm leading-relaxed text-zinc-700 sm:p-8">
            <span className="mb-4 inline-block rounded-full bg-zinc-200/80 px-3 py-1 text-xs font-medium uppercase tracking-wider text-zinc-500">
              Hinweis
            </span>
            <p className="font-medium text-zinc-800">
              In Baden-Württemberg und Hessen gilt beim Vermieten von Wohnraum das
              Bestellerprinzip. Das heißt, wer den Makler beauftragt, trägt die
              Kosten. Die Maklerprovision darf in Baden-Württemberg und Hessen
              zwei Nettokaltmieten zuzüglich 19 % Umsatzsteuer betragen, die der
              Makler für seine Tätigkeit erhält.
            </p>
            <p className="mt-4 font-medium text-zinc-800">
              Hier gelten unsere Allgemeinen Geschäftsbedingungen (
              <Link href="/agb" className="text-[#4682B4] underline hover:no-underline">
                AGB
              </Link>
              ) sowie die gesetzlichen Bestimmungen.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
