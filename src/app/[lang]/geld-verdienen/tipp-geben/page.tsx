import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FileDown } from "lucide-react";
import ProvisionsStaffel from "../ProvisionsStaffel";
import TippgeberHowTo from "../TippgeberHowTo";
import DirektkontaktSection from "../DirektkontaktSection";
import TippgeberWhatsAppFlyer from "../TippgeberWhatsAppFlyer";
import DonationOption from "@/components/DonationOption";
import { getDictionary } from "@/dictionaries";
import { getLocaleFromHeaders } from "@/lib/i18n";
import { TIPPGEBER_DOCS } from "@/lib/documents";

const BRAND_BLUE = "#F9423A";
const SECTION_ACCENT = "#85b09a";

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
  const locale = (await getLocaleFromHeaders()) as "de" | "en" | "tr";
  const dict = await getDictionary(locale);
  const t = dict.tippgeber;
  const localeKey = locale === "tr" ? "tr" : locale === "en" ? "en" : "de";

  return (
    <>
      <section
        className="relative flex min-h-[320px] items-center justify-center overflow-hidden border-b border-slate-200 px-4 py-16 sm:min-h-[380px] sm:px-6 sm:py-24 lg:px-8"
        aria-labelledby="hero-tipp-heading"
      >
        <Image
          src="/img/tipp-geben.jpeg"
          alt="Tippgeber-Programm – Immobilienmakler Weinheim und Rhein-Neckar – HE-immologis"
          fill
          className="object-cover object-center scale-105"
          sizes="100vw"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-slate-900/50" aria-hidden />
        <div className="relative z-10 mx-auto max-w-4xl px-2 text-center">
          <h1
            id="hero-tipp-heading"
            className="w-full font-sans text-4xl font-semibold tracking-tight text-white drop-shadow-sm sm:w-auto sm:text-5xl"
          >
            {t.heroTitle}
          </h1>
          <p className="mt-8 inline-block animate-breathe text-2xl font-bold drop-shadow-sm sm:text-3xl" style={{ color: BRAND_BLUE }}>
            {t.heroCta}
          </p>
        </div>
      </section>

      <TippgeberWhatsAppFlyer />

      <section
        className="border-b border-slate-200 bg-slate-50/50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
        aria-labelledby="staffel-heading"
      >
        <div className="mx-auto max-w-4xl">
          <h2
            id="staffel-heading"
            className="text-left font-sans text-2xl font-semibold tracking-tight text-slate-800 sm:text-3xl"
          >
            {t.staffelTitle}
          </h2>

          <div className="mt-6 space-y-4 text-lg leading-relaxed text-slate-600 sm:mt-8">
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
              href={TIPPGEBER_DOCS.vereinbarung[localeKey]}
              target="_blank"
              rel="noopener noreferrer"
              className={`${outlineButtonClass} focus:ring-[#85b09a]`}
              style={{ borderColor: SECTION_ACCENT, color: SECTION_ACCENT }}
            >
              <FileDown className="h-5 w-5 shrink-0" />
              {t.downloadAgreement}
            </Link>
            <Link
              href={TIPPGEBER_DOCS.hinweis[localeKey]}
              target="_blank"
              rel="noopener noreferrer"
              className={`${outlineButtonClass} focus:ring-[#85b09a]`}
              style={{ borderColor: SECTION_ACCENT, color: SECTION_ACCENT }}
            >
              <FileDown className="h-5 w-5 shrink-0" />
              {t.downloadLetter}
            </Link>
          </div>

          <p className="mt-6 text-center text-slate-700">{t.afterCheck}</p>
        </div>
      </section>

      <section
        id="formular-heading"
        className="border-b border-slate-200 bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      >
        <DirektkontaktSection />
      </section>

      <section className="border-b border-slate-200 bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <DonationOption
            lang={locale as "de" | "en" | "tr"}
            customDescription={
              locale === "de"
                ? "Verzichten Sie auf die Tippgeberprämie (siehe Staffel), spendet die Firma HE immologis Ihre volle Provision an eine gemeinnützige Organisation Ihrer Wahl.\n\nOb Tafel, Tierheim oder Kinderhilfe in Weinheim – ebenso unterstützen wir das Deutsche Krebsforschungszentrum (DKFZ) in Heidelberg oder den Deutscher Hospiz- und PalliativVerband (DHPV) in Berlin.\n\nTeilen Sie uns im Erfolgsfall mit, welche Einrichtung wir unterstützen dürfen.\n\nGemeinsam bewirken wir mehr."
                : locale === "en"
                  ? "If you waive the referrer bonus (see scale), HE immologis will donate your full commission to a charitable organization of your choice.\n\nWhether food bank, animal shelter or children's charity in Weinheim – we also support the German Cancer Research Center (DKFZ) in Heidelberg or the German Hospice and Palliative Association (DHPV) in Berlin.\n\nLet us know in the event of success which organization we may support.\n\nTogether we achieve more."
                  : "Tavsiyeci priminden (kademeye bakın) vazgeçerseniz, HE immologis tam komisyonunuzu seçtiğiniz bir hayır kurumuna bağışlar.\n\nİster Weinheim'da gıda bankası, hayvan barınağı veya çocuk yardımı – ayrıca Heidelberg'deki Alman Kanser Araştırma Merkezi (DKFZ) veya Berlin'deki Alman Hospiz ve Palyatif Derneği (DHPV) destekliyoruz.\n\nBaşarı durumunda hangi kurumu destekleyebileceğimizi bize bildirin.\n\nBirlikte daha fazlasını başarırız."
            }
          />
        </div>
      </section>
    </>
  );
}
