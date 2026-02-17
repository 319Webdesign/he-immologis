import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileDown } from "lucide-react";

export const metadata: Metadata = {
  title: "Werbe-Aufsteller – 500 € Prämie für Geschäfte & Büros | HE immologis",
  description:
    "Stellen Sie einen Immobilien-Aufsteller von HE immologis auf – ohne Verpflichtung. 500 € Prämie bei erfolgreichem Verkauf. Für Geschäft, Büro oder privat.",
  keywords: [
    "Aufsteller Werbung",
    "Werbefläche Immobilien",
    "500 € Prämie Aufsteller",
    "HE immologis",
  ],
};

const BRAND_BLUE = "#4682B4";
const DOWNLOAD_AUFSTELLERVEREINBARUNG =
  "/downloads/HE_Immologis_Aufstellervereinbarung.pdf";

const outlineButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-lg border-2 bg-white px-4 py-3 font-medium transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2";

export default function AufstellerPage() {
  return (
    <>
      <section className="border-b border-slate-200 bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/geld-verdienen#werbeflaeche-heading"
            className="mb-8 inline-flex items-center gap-2 text-slate-600 transition-colors hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Zurück zu Geld verdienen
          </Link>

          <h1 className="font-sans text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Geld verdienen mit einem Werbe-Aufsteller
          </h1>

          <div className="mt-8 space-y-6 text-lg leading-relaxed text-slate-700">
            <p>
              Sie haben ein Geschäft, Büro oder privat eine gut sichtbare Fläche im Eingangsbereich?
              Dann stellen Sie einfach einen Immobilien-Aufsteller von HE immologis auf.
            </p>
            <p>
              Der Aufsteller wird während der Öffnungszeiten sichtbar platziert und danach wieder
              hereingestellt – mehr müssen Sie nicht tun. Sie müssen niemanden ansprechen oder
              vermitteln.
            </p>
            <p>
              Kommt ein Kunde über diesen Aufsteller zu uns und es entsteht daraus ein erfolgreicher
              Immobilienverkauf, erhalten Sie eine einmalige Tippgeber-Prämie von{" "}
              <strong className="text-slate-800">500 €</strong>.
            </p>
            <p>
              Die Auszahlung erfolgt nach Abschluss des notariellen Kaufvertrags und Eingang der
              Maklercourtage.
            </p>
            <p>
              Sie gehen keine Verpflichtungen ein und handeln rechtlich selbstständig. Eine kleine
              Stellfläche kann so nebenbei Geld verdienen.
            </p>
            <p>
              Im Anhang finden Sie die Aufstellervereinbarungen Geschäft und Privat. Bei
              erfolgreichem Abschluss zahlen wir Ihre Prämie direkt an Sie aus.
            </p>
          </div>

          <div className="mt-10">
            <Link
              href={DOWNLOAD_AUFSTELLERVEREINBARUNG}
              target="_blank"
              rel="noopener noreferrer"
              className={`${outlineButtonClass} focus:ring-[#4682B4]`}
              style={{ borderColor: BRAND_BLUE, color: BRAND_BLUE }}
            >
              <FileDown className="h-5 w-5 shrink-0" />
              Aufstellervereinbarungen (Geschäft & Privat) herunterladen
            </Link>
          </div>

          {/* Ihr Ansprechpartner */}
          <div
            className="mt-16 rounded-2xl border-2 px-6 py-6 sm:px-8 sm:py-8"
            style={{ borderColor: BRAND_BLUE, backgroundColor: `${BRAND_BLUE}08` }}
          >
            <h2 className="font-sans text-xl font-semibold tracking-tight text-slate-900">
              Ihr Ansprechpartner
            </h2>
            <p className="mt-2 text-2xl font-semibold text-slate-900">Holger Eberhard</p>
            <p className="mt-1 text-slate-600">Geschäftsführer, HE immologis UG</p>
          </div>
        </div>
      </section>
    </>
  );
}
