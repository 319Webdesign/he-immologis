import type { Metadata } from "next";
import SearchRequestForm from "@/components/SearchRequestForm";

export const metadata: Metadata = {
  title: "Immobilie suchen",
  description:
    "Kostenlos Suchauftrag aufgeben – HE immologis unterstützt Sie bei der Suche nach der passenden Immobilie in Weinheim und der Region Bergstraße.",
  keywords: [
    "Immobilie suchen Weinheim",
    "Suchauftrag Immobilie",
    "Immobilien Bergstraße",
    "HE immologis",
  ],
};

export default function ImmobilieSuchenPage() {
  return (
    <>
      {/* Hero mit Hintergrundbild */}
      <section
        className="relative flex min-h-[320px] items-center justify-center overflow-hidden border-b border-slate-200 px-4 py-16 sm:min-h-[380px] sm:px-6 sm:py-24 lg:px-8"
        aria-labelledby="hero-suche-heading"
        style={{
          backgroundImage: "url(/img/hero-suche.jpeg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-slate-900/50" aria-hidden />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <h1
            id="hero-suche-heading"
            className="font-sans text-3xl font-semibold tracking-tight text-white drop-shadow-sm sm:text-4xl lg:text-5xl"
          >
            Immobilie suchen
          </h1>
          <div className="mt-6 space-y-3 text-lg text-white/95 drop-shadow-sm sm:mt-8">
            <p>
              Teilen Sie uns kostenlos Ihre Wünsche und Vorstellungen mit.
            </p>
            <p>
              Wir unterstützen Sie gezielt bei der Suche nach der passenden Immobilie.
            </p>
            <p>
              Sobald wir ein Objekt finden, das Ihren Angaben entspricht, informieren wir Sie umgehend telefonisch oder per E-Mail.
            </p>
          </div>
        </div>
      </section>

      {/* Formular – breiter damit Lagepräferenz-Labels einzeilig bleiben */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <SearchRequestForm />
      </section>
    </>
  );
}
