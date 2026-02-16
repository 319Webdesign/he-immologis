import type { Metadata } from "next";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Über mich",
  description:
    "Holger Eberhard – Ihr Ansprechpartner für Immobilien und Logistik in Weinheim und an der Bergstraße. Persönlich, kompetent, mit regionaler Expertise.",
  keywords: [
    "HE immologis",
    "Holger Eberhard",
    "Immobilien Weinheim",
    "Bergstraße",
    "Über mich",
  ],
};

const BRAND_BLUE = "#4682B4";

export default function UeberMichPage() {
  return (
    <>
      {/* Hero / Header */}
      <section className="border-b border-slate-200 bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-sans text-3xl font-semibold tracking-tight text-slate-800 sm:text-4xl">
            Über mich
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Persönliche Beratung für Ihre Immobilie – in Weinheim und an der Bergstraße.
          </p>
        </div>
      </section>

      {/* Inhalt */}
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="prose prose-slate prose-lg max-w-none">
          <p className="text-slate-600 leading-relaxed">
            Als Geschäftsführer der HE immologis UG verbinde ich langjährige Erfahrung
            in der Immobilienbranche mit dem Fokus auf Ihre individuellen Ziele.
            Ob Verkauf, Kauf oder Miete – ich begleite Sie mit fundierter Marktkenntnis,
            transparenten Prozessen und einem Full-Service-Angebot von der Wertermittlung
            bis zur Schlüsselübergabe.
          </p>
          <p className="mt-6 text-slate-600 leading-relaxed">
            Mein Büro in Weinheim ist Ihr Anlaufpunkt für die Region Bergstraße und
            darüber hinaus. Ich freue mich auf das Gespräch mit Ihnen.
          </p>

          <div
            className="mt-10 rounded-2xl border-2 px-6 py-6 sm:px-8 sm:py-8"
            style={{ borderColor: BRAND_BLUE, backgroundColor: `${BRAND_BLUE}08` }}
          >
            <h2 className="font-sans text-xl font-semibold tracking-tight text-slate-900">
              Holger Eberhard
            </h2>
            <p className="mt-1 text-slate-600">Geschäftsführer, HE immologis UG</p>
            <p className="mt-4 text-slate-700">
              Ahornstr. 59 · 69469 Weinheim
            </p>
            <p className="mt-1 text-slate-700">
              <a href="tel:+4917632198462" className="hover:underline">0176 321 98 462</a>
              {" · "}
              <a href="mailto:info@he-immologis.de" className="hover:underline">info@he-immologis.de</a>
            </p>
          </div>
        </div>
      </section>

      <Contact
        title="Kontakt aufnehmen"
        subtitle="Haben Sie Fragen oder möchten Sie unverbindlich ins Gespräch kommen? Ich freue mich auf Ihre Nachricht."
        accentColor="steelblue"
      />
    </>
  );
}
