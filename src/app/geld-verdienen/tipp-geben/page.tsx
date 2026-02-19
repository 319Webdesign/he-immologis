import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Wallet, Info, FileDown, Mail, Phone } from "lucide-react";
import ProvisionsStaffel from "../ProvisionsStaffel";
import TippgeberForm from "../TippgeberForm";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Tipp geben – Tippgeber-Programm | HE immologis",
  description:
    "Werden Sie Tippgeber und sichern Sie sich bis zu 5.000 € Provision. Kennen Sie jemanden, der verkaufen möchte? HE immologis UG.",
  keywords: [
    "Tippgeber Immobilien",
    "Provision Immobilientipp",
    "Geld verdienen Immobilie",
    "HE immologis Tippgeber",
  ],
};

const BRAND_BLUE = "#4682B4";
const DOWNLOAD_TIPPGEBERVEREINBARUNG = "/downloads/HE_Immologis_Tippgebervereinbarung.pdf";

const outlineButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-lg border-2 bg-white px-4 py-3 font-medium transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2";

export default function TippGebenPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative flex min-h-[320px] items-center justify-center overflow-hidden border-b border-slate-200 px-4 py-16 sm:min-h-[380px] sm:px-6 sm:py-24 lg:px-8"
        aria-labelledby="hero-tipp-heading"
      >
        <Image
          src="/img/geld-verdienen.jpeg"
          alt=""
          fill
          className="object-cover object-center blur-md scale-105"
          sizes="100vw"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-slate-900/70" aria-hidden />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <div
            className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20"
            aria-hidden
          >
            <Wallet className="h-8 w-8 text-white" />
          </div>
          <h1
            id="hero-tipp-heading"
            className="font-sans text-4xl font-semibold tracking-tight text-white drop-shadow-sm sm:text-5xl"
          >
            Tipp geben – Geld verdienen
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/95 drop-shadow-sm">
            Werden Sie Tippgeber und profitieren Sie von Ihrer Empfehlung.
          </p>
          <p className="mt-4 text-2xl font-bold text-white drop-shadow-sm sm:text-3xl">
            Provision bis zu 5.000 €
          </p>
        </div>
      </section>

      {/* Tippgeber-Staffel + Detail-Inhalte */}
      <section
        className="border-b border-slate-200 bg-slate-50/50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
        aria-labelledby="staffel-heading"
      >
        <div className="mx-auto max-w-4xl">
          <h2
            id="staffel-heading"
            className="text-center font-sans text-2xl font-semibold tracking-tight text-slate-800 sm:text-3xl"
          >
            Die Tippgeber-Staffel
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
            Wenn ein Tipp abgegeben wird, der eine nicht öffentlich angebotene Immobilie betrifft,
            wird ein Makleralleinauftrag gesichert, die Immobilie vermarktet und verkauft – und bei
            Abschluss wird die Tippgeber-Prämie ausgezahlt.
          </p>

          <div className="mt-10 space-y-4 text-lg leading-relaxed text-slate-600">
            <p className="text-xl font-medium text-slate-800">
              Kennen Sie jemanden, der seine Immobilie verkaufen möchte?
            </p>
            <p>
              Dann geben Sie uns einfach den Hinweis – und sichern Sie sich eine attraktive
              Tippgeber-Prämie. Sie müssen nichts organisieren und kein Makler sein. Ein guter
              Kontakt genügt – wir kümmern uns um den Rest.
            </p>
          </div>

          <h3 className="mt-14 font-sans text-xl font-semibold tracking-tight text-slate-900">
            So verdienen Sie Geld
          </h3>
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

          <h3 className="mt-14 font-sans text-xl font-semibold tracking-tight text-slate-900">
            Ihre Prämie je nach Verkaufspreis
          </h3>
          <div className="mt-6">
            <ProvisionsStaffel />
          </div>
          <p className="mt-6 text-sm italic text-slate-600">
            Voraussetzung: Die Immobilie war uns zuvor nicht bekannt und der Verkauf erfolgt über
            unsere Vermittlung.
          </p>

          <h3 className="mt-14 font-sans text-xl font-semibold tracking-tight text-slate-900">
            So einfach geht&apos;s
          </h3>
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

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
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
              href="#formular-heading"
              className={`${outlineButtonClass} focus:ring-[#4682B4]`}
              style={{ borderColor: BRAND_BLUE, color: BRAND_BLUE }}
            >
              Tipp jetzt einreichen
            </Link>
          </div>

          <div
            className="mt-16 rounded-2xl border-2 px-6 py-6 sm:px-8 sm:py-8"
            style={{ borderColor: BRAND_BLUE, backgroundColor: `${BRAND_BLUE}08` }}
          >
            <h3 className="font-sans text-xl font-semibold tracking-tight text-slate-900">
              Ihr Ansprechpartner
            </h3>
            <p className="mt-2 text-2xl font-semibold text-slate-900">Holger Eberhard</p>
            <p className="mt-1 text-slate-600">Geschäftsführer, HE immologis UG</p>
          </div>
        </div>
      </section>

      {/* Tippgeber-Formular */}
      <section
        className="border-b border-slate-200 bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
        aria-labelledby="formular-heading"
      >
        <div className="mx-auto max-w-2xl">
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
              style={{ backgroundColor: `${BRAND_BLUE}18` }}
            >
              <Info className="h-5 w-5" style={{ color: BRAND_BLUE }} />
            </div>
            <h2
              id="formular-heading"
              className="font-sans text-2xl font-semibold tracking-tight text-slate-800 sm:text-3xl"
            >
              Das Tippgeber-Formular
            </h2>
          </div>
          <p className="mt-3 text-slate-600">
            Geben Sie uns Ihren Tipp – diskret und unverbindlich. Wir melden uns bei Ihnen.
          </p>
          <div className="mt-8">
            <TippgeberForm />
          </div>
        </div>
      </section>

      <Contact
        title="Fragen zum Tippgeber-Programm?"
        subtitle="Wir erklären Ihnen gerne die Details – unverbindlich und diskret."
        accentColor="steelblue"
      />
    </>
  );
}
