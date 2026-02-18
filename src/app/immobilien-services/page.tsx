import type { Metadata } from "next";
import Link from "next/link";
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
      {/* Hero */}
      <section
        className="border-b border-slate-200 bg-white px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
        aria-labelledby="services-hero-heading"
      >
        <div className="mx-auto max-w-4xl text-center">
          <h1
            id="services-hero-heading"
            className="font-sans text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl"
          >
            Maßgeschneiderte Verkaufslösungen.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-700 sm:text-xl">
            Vom vollständigen Immobilienverkauf bis zu individuell wählbaren Teilmodulen – Sie entscheiden, wie umfassend wir Sie begleiten.
          </p>
        </div>
      </section>

      {/* Komplettpaket + Zusatzmodule (mit Animation) */}
      <ServicesPackagesSection />

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
