import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  FileDown,
  Home,
  Store,
  Check,
  ArrowRight,
  Mail,
  MessageCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Werbe-Aufsteller – 500 € Prämie für Geschäfte & Büros | HE immologis",
  description:
    "Stellen Sie einen Immobilien-Aufsteller von HE immologis auf – ohne Verpflichtung. Auf- und Abbau durch uns. 500 € Prämie bei erfolgreichem Verkauf.",
  keywords: [
    "Aufsteller Werbung",
    "Werbefläche Immobilien",
    "500 € Prämie Aufsteller",
    "HE immologis",
  ],
};

const BRAND_BLUE = "#4682B4";
// Zwei PDFs möglich; bei nur einer Datei beide auf denselben Pfad setzen
const DOWNLOAD_PRIVAT = "/downloads/HE_Immologis_Aufstellervereinbarung.pdf";
const DOWNLOAD_GEWERBE = "/downloads/HE_Immologis_Aufstellervereinbarung.pdf";

const outlineButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-lg border-2 bg-white px-4 py-3 font-medium transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2";

export default function AufstellerPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative border-b border-slate-200 bg-slate-50 px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
        aria-labelledby="aufsteller-hero-heading"
      >
        <div className="mx-auto max-w-4xl">
          <Link
            href="/geld-verdienen"
            className="mb-8 inline-flex items-center gap-2 text-slate-600 transition-colors hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Zurück zu Geld verdienen
          </Link>
          <h1
            id="aufsteller-hero-heading"
            className="font-sans text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl"
          >
            Geld verdienen mit einem Werbe-Aufsteller
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Sie haben ein Geschäft, Büro oder privat eine gut sichtbare Fläche im Eingangsbereich?
            <br />
            Dann stellen Sie einfach einen Immobilien-Aufsteller von HE immologis auf.
          </p>
          <p className="mt-4 text-2xl font-bold sm:text-3xl" style={{ color: BRAND_BLUE }}>
            500 € Prämie bei erfolgreichem Verkauf
          </p>
        </div>
      </section>

      {/* Vorteile */}
      <section
        className="border-b border-slate-200 bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
        aria-labelledby="vorteile-heading"
      >
        <div className="mx-auto max-w-4xl">
          <h2
            id="vorteile-heading"
            className="font-sans text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
          >
            Ihre Vorteile
          </h2>
          <ul className="mt-6 space-y-4">
            <li className="flex items-start gap-3">
              <span
                className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: `${BRAND_BLUE}20`, color: BRAND_BLUE }}
              >
                <Check className="h-4 w-4" />
              </span>
              <span className="text-slate-700">
                <strong className="text-slate-900">Keine Verpflichtung</strong> – Sie gehen keine
                langfristigen Verträge ein.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span
                className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: `${BRAND_BLUE}20`, color: BRAND_BLUE }}
              >
                <Check className="h-4 w-4" />
              </span>
              <span className="text-slate-700">
                <strong className="text-slate-900">Kein Aufwand</strong> – Auf- und Abbau übernimmt
                HE immologis. Der Aufsteller steht nur während der Öffnungszeiten draußen und wird
                danach wieder hereingestellt.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span
                className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: `${BRAND_BLUE}20`, color: BRAND_BLUE }}
              >
                <Check className="h-4 w-4" />
              </span>
              <span className="text-slate-700">
                <strong className="text-slate-900">Rechtlich selbstständig</strong> – Sie müssen
                niemanden ansprechen oder vermitteln. Eine kleine Stellfläche kann so nebenbei Geld
                verdienen.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* Ablauf 1-2-3 */}
      <section
        className="border-b border-slate-200 bg-slate-50 px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
        aria-labelledby="ablauf-heading"
      >
        <div className="mx-auto max-w-4xl">
          <h2
            id="ablauf-heading"
            className="font-sans text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
          >
            So funktioniert’s
          </h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <span
                className="flex h-12 w-12 items-center justify-center rounded-full font-sans text-xl font-bold text-white"
                style={{ backgroundColor: BRAND_BLUE }}
              >
                1
              </span>
              <p className="mt-4 font-medium text-slate-900">Fläche anbieten</p>
              <p className="mt-1 text-sm text-slate-600">
                Sie melden uns Ihre gut sichtbare Fläche im Eingangsbereich.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <span
                className="flex h-12 w-12 items-center justify-center rounded-full font-sans text-xl font-bold text-white"
                style={{ backgroundColor: BRAND_BLUE }}
              >
                2
              </span>
              <p className="mt-4 font-medium text-slate-900">Aufsteller wird platziert</p>
              <p className="mt-1 text-sm text-slate-600">
                HE immologis stellt den Aufsteller auf und baut ihn bei Bedarf ab – ohne Ihr Zutun.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <span
                className="flex h-12 w-12 items-center justify-center rounded-full font-sans text-xl font-bold text-white"
                style={{ backgroundColor: BRAND_BLUE }}
              >
                3
              </span>
              <p className="mt-4 font-medium text-slate-900">Prämie kassieren</p>
              <p className="mt-1 text-sm text-slate-600">
                Bei erfolgreichem Verkauf über Ihren Aufsteller erhalten Sie 500 € Prämie.
              </p>
            </div>
          </div>
          <div className="mt-6 flex justify-center gap-2 text-slate-400" aria-hidden>
            <ArrowRight className="h-5 w-5" />
            <ArrowRight className="h-5 w-5" />
          </div>
        </div>
      </section>

      {/* Inhalt (aus Aufsteller werben) */}
      <section className="border-b border-slate-200 bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-6 text-lg leading-relaxed text-slate-700">
          <p>
            Der Aufsteller wird während der Öffnungszeiten sichtbar platziert und danach wieder
            hereingestellt – mehr müssen Sie nicht tun.
          </p>
          <p>Sie müssen niemanden ansprechen oder vermitteln.</p>
          <p>
            Kommt ein Kunde über diesen Aufsteller zu uns und es entsteht daraus ein erfolgreicher
            Immobilienverkauf, erhalten Sie Ihre Aufsteller-Prämie von{" "}
            <strong className="text-slate-800">500 €</strong>. Die Auszahlung erfolgt nach Abschluss
            des notariellen Kaufvertrags und Eingang der Maklercourtage.
          </p>
          <p>
            Sie gehen keine Verpflichtungen ein und handeln rechtlich selbstständig. Eine kleine
            Stellfläche kann so nebenbei Geld verdienen.
          </p>
          <p>
            Im Anhang finden Sie die Aufstellervereinbarungen Geschäft und Privat. Bei erfolgreichem
            Abschluss zahlen wir Ihre Prämie direkt an Sie aus.
          </p>
        </div>
      </section>

      {/* Vereinbarungen & Unterlagen */}
      <section
        className="border-b border-slate-200 bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
        aria-labelledby="vereinbarungen-heading"
      >
        <div className="mx-auto max-w-4xl">
          <h2
            id="vereinbarungen-heading"
            className="font-sans text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
          >
            Vereinbarungen & Unterlagen
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${BRAND_BLUE}18` }}
              >
                <Home className="h-6 w-6" style={{ color: BRAND_BLUE }} />
              </div>
              <h3 className="mt-4 font-sans text-xl font-semibold text-slate-900">
                Privatpersonen
              </h3>
              <p className="mt-2 text-slate-600">
                Vereinbarung für private Stellflächen (z. B. im eigenen Geschäft oder Büro).
              </p>
              <Link
                href={DOWNLOAD_PRIVAT}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-4 inline-flex ${outlineButtonClass} focus:ring-[#4682B4]`}
                style={{ borderColor: BRAND_BLUE, color: BRAND_BLUE }}
              >
                <FileDown className="h-5 w-5 shrink-0" />
                Vereinbarung Privat (PDF) herunterladen
              </Link>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${BRAND_BLUE}18` }}
              >
                <Store className="h-6 w-6" style={{ color: BRAND_BLUE }} />
              </div>
              <h3 className="mt-4 font-sans text-xl font-semibold text-slate-900">
                Gewerbe & Ladenbesitzer
              </h3>
              <p className="mt-2 text-slate-600">
                Vereinbarung für gewerbliche Stellflächen (Laden, Büro, Praxis).
              </p>
              <Link
                href={DOWNLOAD_GEWERBE}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-4 inline-flex ${outlineButtonClass} focus:ring-[#4682B4]`}
                style={{ borderColor: BRAND_BLUE, color: BRAND_BLUE }}
              >
                <FileDown className="h-5 w-5 shrink-0" />
                Vereinbarung Gewerbe (PDF) herunterladen
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Kontakt-Footer CTA */}
      <section
        className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
        aria-labelledby="cta-heading"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="cta-heading"
            className="font-sans text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
          >
            Haben Sie eine passende Fläche?
          </h2>
          <p className="mt-3 text-lg text-slate-600">
            Schicken Sie uns ein Foto oder rufen Sie uns an.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://wa.me/4917632198462"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 ${outlineButtonClass} focus:ring-[#4682B4]`}
                style={{ borderColor: BRAND_BLUE, color: BRAND_BLUE }}
              >
                <MessageCircle className="h-5 w-5 shrink-0" />
                WhatsApp
              </a>
              <a
                href="mailto:info@he-immologis.de"
                className={`inline-flex items-center gap-2 ${outlineButtonClass} focus:ring-[#4682B4]`}
                style={{ borderColor: BRAND_BLUE, color: BRAND_BLUE }}
              >
                <Mail className="h-5 w-5 shrink-0" />
                E-Mail
              </a>
            </div>
            <p className="text-slate-600">
              Oder anrufen:{" "}
              <a href="tel:+4917632198462" className="font-medium hover:underline" style={{ color: BRAND_BLUE }}>
                0176 321 98 462
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
