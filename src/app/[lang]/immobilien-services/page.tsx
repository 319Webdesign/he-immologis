import type { Metadata } from "next";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import ServicesPackagesSection from "@/components/ServicesPackagesSection";

export const metadata: Metadata = {
  title: "Immobilien-Services | HE immologis UG",
  description:
    "Von der Wertermittlung bis zur Schlüsselübergabe: Professionelle Immobilien-Services in Weinheim und an der Bergstraße. Marktwertermittlung, Vermarktung und Abwicklung.",
  keywords: [
    "Immobilien-Services Weinheim",
    "Marktwertermittlung Bergstraße",
    "Vermarktung Immobilie",
    "HE immologis",
  ],
};

const BRAND_BLUE = "#4682B4";

export default function ImmobilienServicesPage() {
  return (
    <>
      {/* Hero mit Hintergrundbild */}
      <section
        className="relative flex min-h-[70vh] flex-col overflow-hidden px-4 pt-16 pb-24 sm:px-6 sm:pt-24 sm:pb-28 lg:px-8"
        aria-labelledby="services-hero-heading"
        style={{
          backgroundImage: "url(/img/hero-service.jpeg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#1e293b",
        }}
      >
        <div className="absolute inset-0 bg-slate-900/40" aria-hidden />
        <div className="relative z-10 mx-auto flex max-w-7xl flex-1 flex-col items-center justify-center pt-20 text-center sm:pt-0">
          <h1
            id="services-hero-heading"
            className="font-sans text-4xl font-semibold tracking-tight text-white drop-shadow-sm sm:text-5xl"
          >
            Maßgeschneiderte Verkaufslösungen.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/95 drop-shadow-sm sm:text-xl">
            Komplett Verkauf oder Einzelmodule
            <br className="sm:hidden" />
            – Sie entscheiden.
          </p>
        </div>
        <a
          href="#leistungen"
          className="absolute bottom-6 left-0 right-0 z-10 flex flex-col items-center gap-1 text-white/90 transition-colors hover:text-white sm:bottom-8"
          aria-label="Zu den Leistungen scrollen"
        >
          <span className="text-sm font-medium">Leistungen ansehen</span>
          <ChevronDown className="h-7 w-7 animate-bounce text-white/80" aria-hidden />
        </a>
      </section>

      {/* Komplettpaket + Zusatzmodule (mit Animation) */}
      <section id="leistungen" aria-label="Leistungen">
        <ServicesPackagesSection />
      </section>

      {/* CTA-Banner */}
      <section
        className="border-t border-slate-200 bg-slate-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
        aria-labelledby="cta-heading"
      >
        <div className="mx-auto max-w-4xl text-center">
          <h2
            id="cta-heading"
            className="font-sans text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
          >
            Haben Sie Fragen zu unseren Leistungen?
          </h2>
          <p className="mt-4 text-lg text-slate-700">
            Lassen Sie uns unverbindlich über Ihr Vorhaben sprechen.
          </p>
          <div className="mt-10">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-3xl px-8 py-4 text-base font-semibold text-white shadow-md transition-all hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#4682B4] focus:ring-offset-2"
              style={{ backgroundColor: BRAND_BLUE }}
            >
              Jetzt Beratungsgespräch vereinbaren
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
