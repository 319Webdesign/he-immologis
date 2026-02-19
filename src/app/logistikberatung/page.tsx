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
      {/* Hero mit Dartscheiben-Hintergrund und Texten */}
      <section
        className="relative min-h-[70vh] border-b border-slate-200 px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
        aria-labelledby="hero-logistik-heading"
        style={{
          backgroundImage: "url(/img/hero-logistikberatung.jpeg)",
          backgroundSize: "100% auto",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#1e293b",
        }}
      >
        <div className="absolute inset-0 bg-slate-900/50" aria-hidden />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h1
            id="hero-logistik-heading"
            className="font-sans text-4xl font-semibold tracking-tight text-white drop-shadow-sm sm:text-5xl"
          >
            {SMART_INTRO.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-white/95 drop-shadow-sm">
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
          <p className="mx-auto mt-10 max-w-3xl text-center text-lg leading-relaxed text-white/95 drop-shadow-sm">
            {SMART_INTRO.heroDescription.map((line, i) => (
              <span key={i}>
                {line}
                {i < SMART_INTRO.heroDescription.length - 1 && <br />}
              </span>
            ))}
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
                <span className="block">SMART Modul {modul.letter}</span>
                <span className="mt-0.5 block text-base font-semibold text-slate-700">
                  – {modul.title}
                </span>
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

      {/* Eiswürfel – Video + Text */}
      <section
        className="border-b border-slate-200 bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
        aria-labelledby="eiswuerfel-heading"
      >
        <div className="mx-auto max-w-5xl">
          <h2 id="eiswuerfel-heading" className="sr-only">
            Stabile Strukturen in der Logistik
          </h2>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="overflow-hidden rounded-2xl bg-slate-100">
              <video
                src="/video/eiswuerfel.webm"
                autoPlay
                muted
                loop
                playsInline
                className="h-auto w-full"
                preload="auto"
              >
                Ihr Browser unterstützt die Wiedergabe dieses Videos nicht.
              </video>
            </div>
            <p className="text-lg leading-relaxed text-slate-700">
              Wie ein Eiswürfel nur unter den richtigen Bedingungen stabil bleibt,
              schaffen wir mit Schulung, Strategie, Netzwerk und Interimslösungen
              stabile Strukturen
              <br />
              – in temperierten wie nicht temperierten Logistikszenarien.
            </p>
          </div>
        </div>
      </section>

      {/* Kontakt */}
      <Contact
        variant="white"
        accentColor="steelblue"
        title="Logistikberatung – Ihr Anliegen"
        subtitle="Sie möchten mehr zu einem SMART-Modul erfahren oder ein unverbindliches Gespräch vereinbaren? Kontaktieren Sie uns."
      />
    </>
  );
}
