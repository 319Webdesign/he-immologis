import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FileDown, Mail, Phone } from "lucide-react";
import ProvisionsStaffel from "../ProvisionsStaffel";
import TippgeberHowTo from "../TippgeberHowTo";
import DirektkontaktSection from "../DirektkontaktSection";

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
const DOWNLOAD_HINWEISSCHREIBEN = "/downloads/HE_Immologis_Hinweisschreiben.pdf";

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
          src="/img/dartscheibe.jpeg"
          alt=""
          fill
          className="object-cover object-center scale-105"
          sizes="100vw"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-slate-900/70" aria-hidden />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
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

          <div className="mt-16 space-y-4 text-lg leading-relaxed text-slate-600 sm:mt-20">
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
          <p className="mt-6 text-sm text-slate-600">
            <span className="font-medium">Hinweis:</span> Wenn ein Tipp abgegeben wird, der eine
            nicht öffentlich angebotene Immobilie betrifft, wird ein Makleralleinauftrag gesichert,
            die Immobilie vermarktet und verkauft – und bei Abschluss wird die Tippgeber-Prämie
            ausgezahlt.
          </p>

          <TippgeberHowTo />

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={DOWNLOAD_TIPPGEBERVEREINBARUNG}
              target="_blank"
              rel="noopener noreferrer"
              className={`${outlineButtonClass} focus:ring-[#4682B4]`}
              style={{ borderColor: BRAND_BLUE, color: BRAND_BLUE }}
            >
              <FileDown className="h-5 w-5 shrink-0" />
              Tippgebervereinbarung
            </Link>
            <Link
              href={DOWNLOAD_HINWEISSCHREIBEN}
              target="_blank"
              rel="noopener noreferrer"
              className={`${outlineButtonClass} focus:ring-[#4682B4]`}
              style={{ borderColor: BRAND_BLUE, color: BRAND_BLUE }}
            >
              <FileDown className="h-5 w-5 shrink-0" />
              Hinweisschreiben
            </Link>
          </div>

          <p className="mt-6 text-center text-slate-700">
            Nach Prüfung erhalten Sie eine schriftliche Tippgebervereinbarung. Bei erfolgreichem
            Abschluss zahlen wir Ihre Prämie direkt an Sie aus.
          </p>

          <div
            className="mt-16 rounded-2xl border-2 px-6 py-6 sm:px-8 sm:py-8"
            style={{ borderColor: BRAND_BLUE, backgroundColor: `${BRAND_BLUE}08` }}
          >
            <h3 className="font-sans text-xl font-semibold tracking-tight text-slate-900">
              Ihr Ansprechpartner
            </h3>
            <p className="mt-2 text-2xl font-semibold text-slate-900">Holger Eberhard</p>
            <p className="mt-1 text-slate-600">Geschäftsführer, HE immologis UG</p>
            <Image
              src="/img/unterschrift.png"
              alt="Unterschrift Holger Eberhard"
              width={200}
              height={80}
              className="mt-4 max-h-16 w-auto object-contain object-left"
            />
          </div>
        </div>
      </section>

      {/* Direktkontakt-Sektion (ersetzt Tippgeber-Formular) */}
      <section
        id="formular-heading"
        className="border-b border-slate-200 bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      >
        <div className="mx-auto max-w-4xl">
          <DirektkontaktSection />
        </div>
      </section>
    </>
  );
}
