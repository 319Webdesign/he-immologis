import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FileDown } from "lucide-react";
import ProvisionsStaffel from "../ProvisionsStaffel";
import TippgeberHowTo from "../TippgeberHowTo";
import DirektkontaktSection from "../DirektkontaktSection";
import { getDictionary } from "@/dictionaries";
import { getLocaleFromHeaders } from "@/lib/i18n";

const BRAND_BLUE = "#4682B4";
const DOWNLOAD_TIPPGEBERVEREINBARUNG = "/downloads/HE_Immologis_Tippgebervereinbarung.pdf";
const DOWNLOAD_HINWEISSCHREIBEN = "/downloads/HE_Immologis_Hinweisschreiben.pdf";

const outlineButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-lg border-2 bg-white px-4 py-3 font-medium transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocaleFromHeaders();
  const dict = await getDictionary(locale);
  return {
    title: dict.tippgeber.metaTitle,
    description: dict.tippgeber.metaDescription,
    keywords: [
      "Tippgeber Immobilien",
      "Provision Immobilientipp",
      "Geld verdienen Immobilie",
      "HE immologis Tippgeber",
    ],
  };
}

export default async function TippGebenPage() {
  const locale = await getLocaleFromHeaders();
  const dict = await getDictionary(locale);
  const t = dict.tippgeber;

  return (
    <>
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
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h1
            id="hero-tipp-heading"
            className="font-sans text-4xl font-semibold tracking-tight text-black sm:text-5xl"
          >
            {t.heroTitle}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-800">
            {t.heroSubline}
          </p>
          <p className="mt-4 text-2xl font-bold text-black sm:text-3xl">
            {t.heroCta}
          </p>
        </div>
      </section>

      <section
        className="border-b border-slate-200 bg-slate-50/50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
        aria-labelledby="staffel-heading"
      >
        <div className="mx-auto max-w-4xl">
          <h2
            id="staffel-heading"
            className="text-center font-sans text-2xl font-semibold tracking-tight text-slate-800 sm:text-3xl"
          >
            {t.staffelTitle}
          </h2>

          <div className="mt-16 space-y-4 text-lg leading-relaxed text-slate-600 sm:mt-20">
            <p className="text-xl font-medium text-slate-800">
              {t.introQuestion}
            </p>
            <p>{t.introText}</p>
          </div>

          <h3 className="mt-14 font-sans text-xl font-semibold tracking-tight text-slate-900">
            {t.howTitle}
          </h3>
          <ol className="mt-4 list-decimal space-y-3 pl-5 text-slate-700">
            {t.howSteps.map((step, i) => (
              <li key={i} className="pl-2">
                {step}
              </li>
            ))}
          </ol>

          <h3 className="mt-14 font-sans text-xl font-semibold tracking-tight text-slate-900">
            {t.premiumTitle}
          </h3>
          <div className="mt-6">
            <ProvisionsStaffel />
          </div>
          <p className="mt-6 text-sm text-slate-600">
            <span className="font-medium">{t.hinweis}</span> {t.hinweisText}
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
              {t.downloadAgreement}
            </Link>
            <Link
              href={DOWNLOAD_HINWEISSCHREIBEN}
              target="_blank"
              rel="noopener noreferrer"
              className={`${outlineButtonClass} focus:ring-[#4682B4]`}
              style={{ borderColor: BRAND_BLUE, color: BRAND_BLUE }}
            >
              <FileDown className="h-5 w-5 shrink-0" />
              {t.downloadLetter}
            </Link>
          </div>

          <p className="mt-6 text-center text-slate-700">{t.afterCheck}</p>

          <div
            className="mt-16 rounded-2xl border-2 px-6 py-6 sm:px-8 sm:py-8"
            style={{ borderColor: BRAND_BLUE, backgroundColor: `${BRAND_BLUE}08` }}
          >
            <h3 className="font-sans text-xl font-semibold tracking-tight text-slate-900">
              {t.contactTitle}
            </h3>
            <p className="mt-2 text-2xl font-semibold text-slate-900">{t.contactName}</p>
            <p className="mt-1 text-slate-600">{t.contactRole}</p>
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
