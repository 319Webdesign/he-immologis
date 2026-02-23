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
import { getLocaleFromHeaders } from "@/lib/i18n";

const BRAND_BLUE = "#4682B4";
const DOWNLOAD_PRIVAT = "/downloads/HE_Immologis_Werbepartne_Aufsteller_privat.pdf";
const DOWNLOAD_GEWERBE = "/downloads/HE_Immologis_Werbepartner_Aufsteller_Gesch.pdf";

const outlineButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-lg border-2 bg-white px-4 py-3 font-medium transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2";

const TEXTS = {
  de: {
    metaTitle: "Werbe-Aufsteller – 500 € Prämie für Geschäfte & Büros | HE immologis",
    metaDescription:
      "Stellen Sie einen Immobilien-Aufsteller von HE immologis auf – ohne Verpflichtung. Auf- und Abbau durch uns. 500 € Prämie bei erfolgreichem Verkauf.",
    metaKeywords: ["Aufsteller Werbung", "Werbefläche Immobilien", "500 € Prämie Aufsteller", "HE immologis"],
    backLink: "Zurück zu Geld verdienen",
    heroTitle: "Geld verdienen mit einem Werbe-Aufsteller",
    heroIntro:
      "Sie haben ein Geschäft, Büro oder privat eine gut sichtbare Fläche im Eingangsbereich? Dann stellen Sie einfach einen Immobilien-Aufsteller von HE immologis auf.",
    heroCta: "500 € Prämie bei erfolgreichem Verkauf",
    vorteileTitle: "Ihre Vorteile",
    v1: "Keine Verpflichtung",
    v1b: " – Sie gehen keine langfristigen Verträge ein.",
    v2: "Kein Aufwand",
    v2b:
      " – Auf- und Abbau übernimmt HE immologis. Der Aufsteller steht nur während der Öffnungszeiten draußen und wird danach wieder hereingestellt.",
    v3: "Rechtlich selbstständig",
    v3b:
      " – Sie müssen niemanden ansprechen oder vermitteln. Eine kleine Stellfläche kann so nebenbei Geld verdienen.",
    ablaufTitle: "So funktioniert's",
    step1Title: "Fläche anbieten",
    step1Text: "Sie melden uns Ihre gut sichtbare Fläche im Eingangsbereich.",
    step2Title: "Aufsteller wird platziert",
    step2Text: "HE immologis stellt den Aufsteller auf und baut ihn bei Bedarf ab – ohne Ihr Zutun.",
    step3Title: "Prämie kassieren",
    step3Text: "Bei erfolgreichem Verkauf über Ihren Aufsteller erhalten Sie 500 € Prämie.",
    content1:
      "Der Aufsteller wird während der Öffnungszeiten sichtbar platziert und danach wieder hereingestellt – mehr müssen Sie nicht tun.",
    content2: "Sie müssen niemanden ansprechen oder vermitteln.",
    content3:
      "Kommt ein Kunde über diesen Aufsteller zu uns und es entsteht daraus ein erfolgreicher Immobilienverkauf, erhalten Sie Ihre Aufsteller-Prämie von ",
    content3b:
      ". Die Auszahlung erfolgt nach Abschluss des notariellen Kaufvertrags und Eingang der Maklercourtage.",
    content4:
      "Sie gehen keine Verpflichtungen ein und handeln rechtlich selbstständig. Eine kleine Stellfläche kann so nebenbei Geld verdienen.",
    content5:
      "Im Anhang finden Sie die Aufstellervereinbarungen Geschäft und Privat. Bei erfolgreichem Abschluss zahlen wir Ihre Prämie direkt an Sie aus.",
    vereinbarungenTitle: "Vereinbarungen & Unterlagen",
    privatTitle: "Privatpersonen",
    privatDesc: "Vereinbarung für private Stellflächen (z. B. im eigenen Geschäft oder Büro).",
    downloadPrivat: "Vereinbarung Privat (PDF) herunterladen",
    gewerbeTitle: "Gewerbe & Ladenbesitzer",
    gewerbeDesc: "Vereinbarung für gewerbliche Stellflächen (Laden, Büro, Praxis).",
    downloadGewerbe: "Vereinbarung Gewerbe (PDF) herunterladen",
    ctaTitle: "Haben Sie eine passende Fläche?",
    ctaSub: "Schicken Sie uns ein Foto oder rufen Sie uns an.",
    orCall: "Oder anrufen:",
  },
  en: {
    metaTitle: "Display advertising – €500 bonus for shops & offices | HE immologis",
    metaDescription:
      "Display a HE immologis property display stand – no commitment. We set up and take down. €500 bonus on successful sale.",
    metaKeywords: ["Display advertising", "Advertising space real estate", "€500 bonus display", "HE immologis"],
    backLink: "Back to Earn money",
    heroTitle: "Earn money with a display stand",
    heroIntro:
      "Do you have a shop, office or a well visible area in your entrance? Then simply display a HE immologis property stand.",
    heroCta: "€500 bonus on successful sale",
    vorteileTitle: "Your benefits",
    v1: "No commitment",
    v1b: " – You are not tied into any long-term contracts.",
    v2: "No effort",
    v2b:
      " – HE immologis sets up and takes down the display. The stand is only outside during opening hours and is brought back in afterwards.",
    v3: "Legally independent",
    v3b:
      " – You don't have to approach or refer anyone. A small display area can earn you money on the side.",
    ablaufTitle: "How it works",
    step1Title: "Offer space",
    step1Text: "You let us know about your well visible area in the entrance.",
    step2Title: "Display is placed",
    step2Text: "HE immologis sets up the display and removes it when needed – no effort on your part.",
    step3Title: "Receive your bonus",
    step3Text: "On successful sale via your display you receive a €500 bonus.",
    content1:
      "The display is placed visibly during opening hours and brought back in afterwards – that's all you need to do.",
    content2: "You don't have to approach or refer anyone.",
    content3:
      "If a customer comes to us via this display and a successful property sale results, you receive your display bonus of ",
    content3b:
      ". Payment is made after completion of the notarial purchase contract and receipt of the commission.",
    content4:
      "You have no obligations and act as an independent party. A small display area can earn you money on the side.",
    content5:
      "In the appendix you will find the display agreements for private and commercial use. On successful completion we pay your bonus directly to you.",
    vereinbarungenTitle: "Agreements & documents",
    privatTitle: "Private individuals",
    privatDesc: "Agreement for private display areas (e.g. in your own shop or office).",
    downloadPrivat: "Download private agreement (PDF)",
    gewerbeTitle: "Business & shop owners",
    gewerbeDesc: "Agreement for commercial display areas (shop, office, practice).",
    downloadGewerbe: "Download commercial agreement (PDF)",
    ctaTitle: "Do you have suitable space?",
    ctaSub: "Send us a photo or give us a call.",
    orCall: "Or call:",
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocaleFromHeaders();
  const t = TEXTS[locale === "en" ? "en" : "de"];
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    keywords: t.metaKeywords,
  };
}

export default async function AufstellerPage() {
  const locale = await getLocaleFromHeaders();
  const t = TEXTS[locale === "en" ? "en" : "de"];
  const prefix = locale === "en" ? "/en" : "";

  return (
    <>
      <section
        className="relative border-b border-slate-200 bg-slate-50 px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
        aria-labelledby="aufsteller-hero-heading"
      >
        <div className="mx-auto max-w-4xl">
          <Link
            href={`${prefix}/geld-verdienen`}
            className="mb-8 inline-flex items-center gap-2 text-slate-600 transition-colors hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            {t.backLink}
          </Link>
          <h1
            id="aufsteller-hero-heading"
            className="font-sans text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl"
          >
            {t.heroTitle}
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            {t.heroIntro}
          </p>
          <p
            className="mt-4 inline-block animate-breathe text-2xl font-bold sm:text-3xl"
            style={{ color: BRAND_BLUE }}
          >
            {t.heroCta}
          </p>
        </div>
      </section>

      <section
        className="border-b border-slate-200 bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
        aria-labelledby="vorteile-heading"
      >
        <div className="mx-auto max-w-4xl">
          <h2
            id="vorteile-heading"
            className="font-sans text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
          >
            {t.vorteileTitle}
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
                <strong className="text-slate-900">{t.v1}</strong>
                {t.v1b}
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
                <strong className="text-slate-900">{t.v2}</strong>
                {t.v2b}
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
                <strong className="text-slate-900">{t.v3}</strong>
                {t.v3b}
              </span>
            </li>
          </ul>
        </div>
      </section>

      <section
        className="border-b border-slate-200 bg-slate-50 px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
        aria-labelledby="ablauf-heading"
      >
        <div className="mx-auto max-w-4xl">
          <h2
            id="ablauf-heading"
            className="font-sans text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
          >
            {t.ablaufTitle}
          </h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <span
                className="flex h-12 w-12 items-center justify-center rounded-full font-sans text-xl font-bold text-white"
                style={{ backgroundColor: BRAND_BLUE }}
              >
                1
              </span>
              <p className="mt-4 font-medium text-slate-900">{t.step1Title}</p>
              <p className="mt-1 text-sm text-slate-600">{t.step1Text}</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <span
                className="flex h-12 w-12 items-center justify-center rounded-full font-sans text-xl font-bold text-white"
                style={{ backgroundColor: BRAND_BLUE }}
              >
                2
              </span>
              <p className="mt-4 font-medium text-slate-900">{t.step2Title}</p>
              <p className="mt-1 text-sm text-slate-600">{t.step2Text}</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <span
                className="flex h-12 w-12 items-center justify-center rounded-full font-sans text-xl font-bold text-white"
                style={{ backgroundColor: BRAND_BLUE }}
              >
                3
              </span>
              <p className="mt-4 font-medium text-slate-900">{t.step3Title}</p>
              <p className="mt-1 text-sm text-slate-600">{t.step3Text}</p>
            </div>
          </div>
          <div className="mt-6 flex justify-center gap-2 text-slate-400" aria-hidden>
            <ArrowRight className="h-5 w-5" />
            <ArrowRight className="h-5 w-5" />
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-6 text-lg leading-relaxed text-slate-700">
          <p>{t.content1}</p>
          <p>{t.content2}</p>
          <p>
            {t.content3}
            <strong className="text-slate-800">{locale === "en" ? "€500" : "500 €"}</strong>
            {t.content3b}
          </p>
          <p>{t.content4}</p>
          <p>{t.content5}</p>
        </div>
      </section>

      <section
        className="border-b border-slate-200 bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
        aria-labelledby="vereinbarungen-heading"
      >
        <div className="mx-auto max-w-4xl">
          <h2
            id="vereinbarungen-heading"
            className="font-sans text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
          >
            {t.vereinbarungenTitle}
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${BRAND_BLUE}18` }}
              >
                <Home className="h-6 w-6" style={{ color: BRAND_BLUE }} />
              </div>
              <h3 className="mt-4 font-sans text-xl font-semibold text-slate-900">{t.privatTitle}</h3>
              <p className="mt-2 text-slate-600">{t.privatDesc}</p>
              <Link
                href={DOWNLOAD_PRIVAT}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-4 inline-flex ${outlineButtonClass} focus:ring-[#4682B4]`}
                style={{ borderColor: BRAND_BLUE, color: BRAND_BLUE }}
              >
                <FileDown className="h-5 w-5 shrink-0" />
                {t.downloadPrivat}
              </Link>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${BRAND_BLUE}18` }}
              >
                <Store className="h-6 w-6" style={{ color: BRAND_BLUE }} />
              </div>
              <h3 className="mt-4 font-sans text-xl font-semibold text-slate-900">{t.gewerbeTitle}</h3>
              <p className="mt-2 text-slate-600">{t.gewerbeDesc}</p>
              <Link
                href={DOWNLOAD_GEWERBE}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-4 inline-flex ${outlineButtonClass} focus:ring-[#4682B4]`}
                style={{ borderColor: BRAND_BLUE, color: BRAND_BLUE }}
              >
                <FileDown className="h-5 w-5 shrink-0" />
                {t.downloadGewerbe}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
        aria-labelledby="cta-heading"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="cta-heading"
            className="font-sans text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
          >
            {t.ctaTitle}
          </h2>
          <p className="mt-3 text-lg text-slate-600">{t.ctaSub}</p>
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
              {t.orCall}{" "}
              <a href="tel:+4917632198462" className="font-medium hover:underline" style={{ color: BRAND_BLUE }}>
                +49 176 321 98 462
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
