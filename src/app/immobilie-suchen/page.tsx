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
      {/* Intro */}
      <section className="border-b border-slate-200 bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-sans text-3xl font-semibold tracking-tight text-slate-800 sm:text-4xl">
            Immobilie suchen
          </h1>
          <div className="mt-6 space-y-4 text-lg text-slate-600">
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

      {/* Formular */}
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <SearchRequestForm />
      </section>
    </>
  );
}
