import type { Metadata } from "next";
import Link from "next/link";
import { SMART_INTRO, SMART_MODULE } from "@/data/logistikberatung";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Logistikberatung – SMART | HE immologis UG",
  description:
    "SMART – Beratung und Vertriebsunterstützung in Supply Chain und temperaturgeführter Logistik. Schulung, M&A, Entscheidernetzwerke, Interim-Lösungen, Transportnetzwerkstrategien.",
  keywords: [
    "Logistikberatung",
    "SMART",
    "Supply Chain",
    "temperaturgeführte Logistik",
    "HE immologis",
    "Weinheim",
  ],
};

const BRAND_BLUE = "#4682B4";

export default function LogistikberatungPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="border-b border-slate-200 px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
        style={{ backgroundColor: "#f8fafc" }}
      >
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-sans text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            {SMART_INTRO.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-700">
            {SMART_INTRO.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-4">
            {SMART_INTRO.acronym.map(({ letter, label }) => (
              <span
                key={letter}
                className="rounded-lg px-4 py-2 text-sm text-white"
                style={{ backgroundColor: BRAND_BLUE }}
                title={label}
              >
                <strong>{letter}</strong> – {label}
              </span>
            ))}
          </div>
          <p className="mt-10 text-xl font-medium italic text-slate-600">
            {SMART_INTRO.tagline}
          </p>
        </div>
      </section>

      {/* SMART Module als Karten mit Link zu Detailseiten */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <h2 className="sr-only">SMART Module</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SMART_MODULE.map((modul) => (
            <Link
              key={modul.slug}
              href={`/logistikberatung/${modul.slug}`}
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md"
            >
              <span
                className="inline-flex h-12 w-12 items-center justify-center rounded-xl text-xl font-bold text-white"
                style={{ backgroundColor: BRAND_BLUE }}
              >
                {modul.letter}
              </span>
              <h3 className="mt-4 font-sans text-xl font-semibold tracking-tight text-slate-900">
                SMART Modul {modul.letter} – {modul.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                {modul.shortDescription}
              </p>
              <span
                className="mt-4 inline-flex items-center text-sm font-semibold"
                style={{ color: BRAND_BLUE }}
              >
                Mehr erfahren
                <span className="ml-1 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Kontakt */}
      <Contact
        variant="dark"
        title="Logistikberatung – Ihr Anliegen"
        subtitle="Sie möchten mehr zu einem SMART-Modul erfahren oder ein unverbindliches Gespräch vereinbaren? Kontaktieren Sie uns."
      />
    </>
  );
}
