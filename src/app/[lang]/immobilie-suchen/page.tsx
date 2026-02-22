import type { Metadata } from "next";
import { ChevronDown } from "lucide-react";
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
      {/* Hero – auf Handy breiter (weniger Padding), Text etwas kleiner */}
      <section
        className="relative flex min-h-[70vh] flex-col overflow-hidden border-b border-slate-200 bg-cover bg-center bg-no-repeat px-2 pt-16 pb-24 sm:px-6 sm:pt-24 sm:pb-28 lg:bg-[length:100%_auto] lg:px-8"
        aria-labelledby="hero-suche-heading"
        style={{
          backgroundImage: "url(/img/hero-suche.jpeg)",
          backgroundColor: "#1e293b",
        }}
      >
        <div className="absolute inset-0 bg-slate-900/40" aria-hidden />
        <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-2 pt-20 text-center sm:px-0 sm:pt-0">
          <h1
            id="hero-suche-heading"
            className="font-sans text-2xl font-semibold tracking-tight text-white drop-shadow-sm sm:text-4xl lg:text-5xl"
          >
            Suche in Weinheim und Umgebung.
          </h1>
          <p className="mt-4 text-base text-white/95 drop-shadow-sm sm:mt-8 sm:text-lg">
            Ihre Wünsche – Wir suchen gezielt für Sie.
          </p>
        </div>
        <a
          href="#suchauftrag"
          className="absolute bottom-6 left-0 right-0 z-10 flex flex-col items-center gap-1 text-white/90 transition-colors hover:text-white sm:bottom-8"
          aria-label="Zum Suchauftrag-Formular scrollen"
        >
          <span className="text-sm font-medium">Jetzt entdecken lassen</span>
          <ChevronDown className="h-7 w-7 animate-bounce text-white/80" aria-hidden />
        </a>
      </section>

      {/* Formular – breiter damit Lagepräferenz-Labels einzeilig bleiben */}
      <section id="suchauftrag" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <SearchRequestForm />
      </section>
    </>
  );
}
