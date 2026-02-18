import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Wallet, MapPin, Camera, Info, FileDown, ArrowRight } from "lucide-react";
import ProvisionsStaffel from "./ProvisionsStaffel";
import TippgeberForm from "./TippgeberForm";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Geld verdienen – Tippgeber-Programm | HE immologis",
  description:
    "Werden Sie Tippgeber und sichern Sie sich bis zu 5.000 € Provision. Kennen Sie jemanden, der verkaufen möchte? Oder vermieten Sie Werbefläche – Aufsteller oder Banner. HE immologis UG.",
  keywords: [
    "Tippgeber Immobilien",
    "Provision Immobilientipp",
    "Geld verdienen Immobilie",
    "HE immologis Tippgeber",
    "Werbefläche Aufsteller Banner",
  ],
};

const BRAND_BLUE = "#4682B4";

// Platzhalter-Pfade – später durch finale PDF-Dateien ersetzen
const DOWNLOAD_TIPPGEBERVEREINBARUNG = "/downloads/HE_Immologis_Tippgebervereinbarung.pdf";
const DOWNLOAD_MUSTERVERTRAG_WERBEFLAECHE = "/downloads/HE_Immologis_Mustervertrag_Werbeflaeche.pdf";

const outlineButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-lg border-2 bg-white px-4 py-3 font-medium transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2";

export default function GeldVerdienenPage() {
  return (
    <>
      {/* Hero mit Hintergrundbild */}
      <section
        className="relative flex min-h-[320px] items-center justify-center overflow-hidden border-b border-slate-200 px-4 py-16 sm:min-h-[380px] sm:px-6 sm:py-24 lg:px-8"
        aria-labelledby="hero-geld-heading"
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
            id="hero-geld-heading"
            className="font-sans text-4xl font-semibold tracking-tight text-white drop-shadow-sm sm:text-5xl"
          >
            Geld verdienen mit Ihrem Netzwerk
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/95 drop-shadow-sm">
            Werden Sie Tippgeber und profitieren Sie von Ihrer Empfehlung.
          </p>
          <p className="mt-4 text-2xl font-bold text-white drop-shadow-sm sm:text-3xl">
            Provision bis zu 5.000 €
          </p>
        </div>
      </section>

      {/* Tippgeber-Staffel */}
      <section
        className="border-b border-slate-200 bg-slate-50/50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
        aria-labelledby="staffel-heading"
      >
        <div className="mx-auto max-w-6xl">
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
          <ProvisionsStaffel />
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={DOWNLOAD_TIPPGEBERVEREINBARUNG}
              target="_blank"
              rel="noopener noreferrer"
              className={`${outlineButtonClass} focus:ring-[#4682B4]`}
              style={{ borderColor: BRAND_BLUE, color: BRAND_BLUE }}
            >
              <FileDown className="h-5 w-5 shrink-0" />
              Tippgebervereinbarung als PDF herunterladen
            </Link>
            <Link
              href="/geld-verdienen/tippgeber-staffel"
              className={`${outlineButtonClass} focus:ring-[#4682B4]`}
              style={{ borderColor: BRAND_BLUE, color: BRAND_BLUE }}
            >
              Provisionsstaffel im Detail anzeigen
              <ArrowRight className="h-5 w-5 shrink-0" />
            </Link>
          </div>
        </div>
      </section>

      {/* Werbefläche vermieten */}
      <section
        className="border-b border-slate-200 bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
        aria-labelledby="werbeflaeche-heading"
      >
        <div className="mx-auto max-w-6xl">
          <h2
            id="werbeflaeche-heading"
            className="text-center font-sans text-2xl font-semibold tracking-tight text-slate-800 sm:text-3xl"
          >
            Ihre Fläche wird zur Einnahmequelle
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-slate-600">
            Stellen Sie Werbung für HE immologis – wir honorieren Ihren Erfolg mit 500 € Prämie.
          </p>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {/* Aufsteller – Geschäfte & Büros */}
            <div
              className="flex flex-col rounded-2xl border-2 border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
              style={{ borderColor: `${BRAND_BLUE}40` }}
            >
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${BRAND_BLUE}18` }}
              >
                <Camera className="h-6 w-6" style={{ color: BRAND_BLUE }} />
              </div>
              <h3 className="mt-5 font-sans text-xl font-semibold text-slate-800">
                Für Geschäfte & Büros
              </h3>
              <p className="mt-3 leading-relaxed text-slate-600">
                Stellen Sie einen Aufsteller bei sich auf. Sichtbar für Kunden und Besucher. Wir
                liefern das Material – Sie stellen die Fläche. Bei erfolgreicher Vermittlung
                erhalten Sie eine <strong className="text-slate-800">500 € Prämie</strong>.
              </p>
              <p className="mt-4 text-lg font-semibold" style={{ color: BRAND_BLUE }}>
                500 € Prämie bei Erfolg
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  href="/geld-verdienen/aufsteller"
                  className={`${outlineButtonClass} focus:ring-[#4682B4]`}
                  style={{ borderColor: BRAND_BLUE, color: BRAND_BLUE }}
                >
                  Alle Infos zum Werbe-Aufsteller
                  <ArrowRight className="h-5 w-5 shrink-0" />
                </Link>
                <Link
                  href={DOWNLOAD_MUSTERVERTRAG_WERBEFLAECHE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${outlineButtonClass} focus:ring-[#4682B4]`}
                  style={{ borderColor: BRAND_BLUE, color: BRAND_BLUE }}
                >
                  <FileDown className="h-5 w-5 shrink-0" />
                  Mustervertrag Werbefläche herunterladen
                </Link>
              </div>
            </div>

            {/* Banner – Privatgrundstücke & Zäune */}
            <div
              className="flex flex-col rounded-2xl border-2 border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
              style={{ borderColor: `${BRAND_BLUE}40` }}
            >
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${BRAND_BLUE}18` }}
              >
                <MapPin className="h-6 w-6" style={{ color: BRAND_BLUE }} />
              </div>
              <h3 className="mt-5 font-sans text-xl font-semibold text-slate-800">
                Für Privatgrundstücke & Zäune
              </h3>
              <p className="mt-3 leading-relaxed text-slate-600">
                Hängen Sie ein Banner auf – wir erledigen den Rest. Ideal an Zäunen, Garagen oder
                gut sichtbaren Grundstücken. Bei erfolgreicher Vermittlung erhalten Sie eine{" "}
                <strong className="text-slate-800">500 € Prämie</strong>.
              </p>
              <p className="mt-4 text-lg font-semibold" style={{ color: BRAND_BLUE }}>
                500 € Prämie bei Erfolg
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  href={DOWNLOAD_MUSTERVERTRAG_WERBEFLAECHE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${outlineButtonClass} focus:ring-[#4682B4]`}
                  style={{ borderColor: BRAND_BLUE, color: BRAND_BLUE }}
                >
                  <FileDown className="h-5 w-5 shrink-0" />
                  Mustervertrag Werbefläche herunterladen
                </Link>
              </div>
              <p className="mt-4 text-sm text-slate-600">
                Für Geschäfte & Büros:{" "}
                <Link
                  href="/geld-verdienen/aufsteller"
                  className="font-medium transition-colors hover:underline"
                  style={{ color: BRAND_BLUE }}
                >
                  Werbe-Aufsteller – alle Infos
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tippgeber-Formular */}
      <section
        className="border-b border-slate-200 bg-slate-50/50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
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
