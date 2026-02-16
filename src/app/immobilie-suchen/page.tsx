import type { Metadata } from "next";
import Link from "next/link";
import { Home, Building2 } from "lucide-react";

const BRAND_BLUE = "#4682B4";

export const metadata: Metadata = {
  title: "Immobilie suchen",
  description:
    "Immobilien in Weinheim und der Bergstraße finden: Kaufen oder Mieten. Wohnungen, Häuser und Gewerbe – persönlich betreut von HE immologis.",
  keywords: [
    "Immobilie suchen Weinheim",
    "Immobilien Bergstraße",
    "Wohnung kaufen",
    "Wohnung mieten",
    "HE immologis",
  ],
};

export default function ImmobilieSuchenPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-slate-200 bg-white px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-sans text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Immobilie suchen
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Ob Kauf oder Miete – finden Sie Ihre Immobilie in Weinheim und an der Bergstraße. 
            Wir unterstützen Sie mit unserer regionalen Expertise und persönlicher Beratung.
          </p>
        </div>
      </section>

      {/* Optionen: Kaufen / Mieten */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2">
          <Link
            href="/verkaufen"
            className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-lg"
          >
            <div
              className="flex h-32 items-center justify-center"
              style={{ backgroundColor: `${BRAND_BLUE}12` }}
            >
              <Home
                className="h-14 w-14 transition-transform group-hover:scale-105"
                style={{ color: BRAND_BLUE }}
              />
            </div>
            <div className="flex flex-1 flex-col p-6 sm:p-8">
              <h2 className="font-sans text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                Immobilie kaufen
              </h2>
              <p className="mt-3 flex-1 text-slate-600">
                Wohnungen, Häuser und Gewerbeimmobilien zum Kauf in Weinheim und der Region Bergstraße. 
                Seriöse Beratung und transparente Prozesse.
              </p>
              <span
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold"
                style={{ color: BRAND_BLUE }}
              >
                Zur Kaufübersicht →
              </span>
            </div>
          </Link>

          <Link
            href="/mieten"
            className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-lg"
          >
            <div
              className="flex h-32 items-center justify-center"
              style={{ backgroundColor: `${BRAND_BLUE}12` }}
            >
              <Building2
                className="h-14 w-14 transition-transform group-hover:scale-105"
                style={{ color: BRAND_BLUE }}
              />
            </div>
            <div className="flex flex-1 flex-col p-6 sm:p-8">
              <h2 className="font-sans text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                Immobilie mieten
              </h2>
              <p className="mt-3 flex-1 text-slate-600">
                Mietwohnungen und Häuser in Weinheim und Umgebung. 
                Persönlich betreut und sorgfältig ausgewählt.
              </p>
              <span
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold"
                style={{ color: BRAND_BLUE }}
              >
                Zur Mietübersicht →
              </span>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
}
