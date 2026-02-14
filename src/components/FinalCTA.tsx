"use client";

import { ArrowRight, Home } from "lucide-react";

const BRAND_BLUE = "#3d6d99";

export default function FinalCTA() {
  const scrollToForm = () => {
    const el = document.getElementById("anfrage-formular");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
      style={{ backgroundColor: BRAND_BLUE }}
      aria-labelledby="final-cta-heading"
    >
      {/* Dezentes Hintergrund-Element: Haus-Icon mit geringer Deckkraft */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.07]"
        aria-hidden
      >
        <Home className="h-[min(60vw,420px)] w-[min(60vw,420px)] text-white" strokeWidth={0.75} />
      </div>

      {/* Sanfter radialer Lichtverlauf für Tiefe */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(255,255,255,0.12) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <h2
          id="final-cta-heading"
          className="font-sans text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl"
        >
          Sie sind sich noch unsicher über den Marktwert?
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-white/95 sm:text-xl">
          Lassen Sie uns den ersten Schritt gemeinsam gehen. Holger Eberhard
          bewertet Ihre Immobilie fachgerecht, diskret und für Sie vollkommen
          kostenfrei.
        </p>

        <div className="mt-10 flex flex-col items-center gap-6">
          <button
            type="button"
            onClick={scrollToForm}
            className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-white px-8 py-4 text-base font-semibold text-[#3d6d99] shadow-lg transition-all duration-200 hover:bg-white/95 hover:shadow-xl hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#3d6d99]"
          >
            Kostenlose Wertermittlung anfragen
            <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>

          <p className="text-sm text-white/90">
            Lieber direkt anrufen?{" "}
            <a
              href="tel:+4917632198462"
              className="font-medium text-white underline decoration-white/60 underline-offset-2 hover:decoration-white"
            >
              +49 176 321 98 462
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
