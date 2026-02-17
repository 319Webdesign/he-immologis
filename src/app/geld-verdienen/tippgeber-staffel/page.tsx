import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileDown, Mail, Phone } from "lucide-react";
import ProvisionsStaffel from "../ProvisionsStaffel";

export const metadata: Metadata = {
  title: "Tippgeber-Staffel – Geld verdienen mit einem guten Kontakt | HE immologis",
  description:
    "Tipp geben und Prämie sichern: Bis 5.000 € Provision. So funktioniert das Tippgeber-Programm, Ihre Staffel und der Ablauf. HE immologis UG.",
  keywords: [
    "Tippgeber-Staffel",
    "Provision Immobilie",
    "Tippgebervereinbarung",
    "HE immologis",
  ],
};

const BRAND_BLUE = "#4682B4";
const DOWNLOAD_TIPPGEBERVEREINBARUNG = "/downloads/HE_Immologis_Tippgebervereinbarung.pdf";

const outlineButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-lg border-2 bg-white px-4 py-3 font-medium transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2";

export default function TippgeberStaffelPage() {
  return (
    <>
      <section className="border-b border-slate-200 bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/geld-verdienen"
            className="mb-8 inline-flex items-center gap-2 text-slate-600 transition-colors hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Zurück zu Geld verdienen
          </Link>

          <h1 className="font-sans text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Tipp geben – Geld verdienen mit einem guten Kontakt
          </h1>

          <div className="mt-6 space-y-4 text-lg leading-relaxed text-slate-600">
            <p className="text-xl font-medium text-slate-800">
              Kennen Sie jemanden, der seine Immobilie verkaufen möchte?
            </p>
            <p>
              Dann geben Sie uns einfach den Hinweis – und sichern Sie sich eine attraktive
              Tippgeber-Prämie.
            </p>
            <p>
              Sie müssen nichts organisieren und kein Makler sein. Ein guter Kontakt genügt – wir
              kümmern uns um den Rest.
            </p>
          </div>

          {/* So verdienen Sie Geld */}
          <h2 className="mt-14 font-sans text-2xl font-semibold tracking-tight text-slate-900">
            So verdienen Sie Geld
          </h2>
          <ol className="mt-4 list-decimal space-y-3 pl-5 text-slate-700">
            <li className="pl-2">
              Sie nennen uns eine Immobilie, die noch nicht öffentlich angeboten wird.
            </li>
            <li className="pl-2">
              Wir kontaktieren den Eigentümer und übernehmen die komplette Vermarktung.
            </li>
            <li className="pl-2">
              Kommt es durch unsere Vermittlung zum erfolgreichen Verkauf, erhalten Sie Ihre
              Provision.
            </li>
          </ol>

          {/* Ihre Prämie je nach Verkaufspreis */}
          <h2 className="mt-14 font-sans text-2xl font-semibold tracking-tight text-slate-900">
            Ihre Prämie je nach Verkaufspreis
          </h2>
          <div className="mt-6">
            <ProvisionsStaffel />
          </div>
          <p className="mt-6 text-sm italic text-slate-600">
            Voraussetzung: Die Immobilie war uns zuvor nicht bekannt und der Verkauf erfolgt über
            unsere Vermittlung.
          </p>

          {/* So einfach geht&apos;s */}
          <h2 className="mt-14 font-sans text-2xl font-semibold tracking-tight text-slate-900">
            So einfach geht&apos;s
          </h2>
          <p className="mt-4 text-slate-700">
            Laden Sie das Hinweisschreiben im Anhang herunter, füllen Sie es aus und senden Sie es
            an:
          </p>
          <div className="mt-6 flex flex-wrap gap-6">
            <a
              href="mailto:info@he-immologis.de"
              className="inline-flex items-center gap-2 font-medium transition-colors hover:opacity-80"
              style={{ color: BRAND_BLUE }}
            >
              <Mail className="h-5 w-5 shrink-0" />
              info@he-immologis.de
            </a>
            <a
              href="tel:+4917632198462"
              className="inline-flex items-center gap-2 font-medium transition-colors hover:opacity-80"
              style={{ color: BRAND_BLUE }}
            >
              <Phone className="h-5 w-5 shrink-0" />
              0176 321 98 462
            </a>
          </div>
          <p className="mt-6 text-slate-700">
            Nach Prüfung erhalten Sie eine schriftliche Tippgebervereinbarung. Bei erfolgreichem
            Abschluss zahlen wir Ihre Prämie direkt an Sie aus.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href={DOWNLOAD_TIPPGEBERVEREINBARUNG}
              target="_blank"
              rel="noopener noreferrer"
              className={`${outlineButtonClass} focus:ring-[#4682B4]`}
              style={{ borderColor: BRAND_BLUE, color: BRAND_BLUE }}
            >
              <FileDown className="h-5 w-5 shrink-0" />
              Hinweisschreiben / Tippgebervereinbarung herunterladen
            </Link>
            <Link
              href="/geld-verdienen#formular-heading"
              className={`${outlineButtonClass} focus:ring-[#4682B4]`}
              style={{ borderColor: BRAND_BLUE, color: BRAND_BLUE }}
            >
              Tipp jetzt einreichen
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
