import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  FileDown,
  Home,
  Store,
  Check,
  Mail,
  MessageCircle,
} from "lucide-react";
import { getLocaleFromHeaders } from "@/lib/i18n";

const BRAND_BLUE = "#4682B4";
const DOWNLOAD_PRIVAT = "/downloads/HE_Immologis_Tippgeber_Banner_privat.pdf";
const DOWNLOAD_GEWERBE = "/downloads/HE_Immologis_Werbepartner_Banner_Gesch.pdf";

const outlineButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-lg border-2 bg-white px-4 py-3 font-medium transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2";

const TEXTS = {
  de: {
    metaTitle: "Banner werben – 500 € Prämie für Privatgrundstücke & Zäune | HE immologis",
    metaDescription:
      "Vermieten Sie Werbefläche: Banner von HE immologis an Zaun, Garage oder Grundstück. Dauerhaft sichtbar, ohne Platz zu nehmen. 500 € Prämie bei Verkauf.",
    metaKeywords: ["Banner Werbung Immobilien", "Werbefläche vermieten", "500 € Prämie Banner", "HE immologis"],
    backLink: "Zurück zu Geld verdienen",
    heroTitle: "Geld verdienen mit einer Bannerfläche",
    heroIntro:
      "Sie besitzen einen Zaun, ein Grundstück oder eine gut sichtbare Fläche? Dann stellen Sie diese einfach für ein Immobilien-Werbebanner von HE immologis für einen von Ihnen freigegebenen Zeitraum zur Verfügung.",
    heroCta: "500 € Prämie bei erfolgreichem Verkauf",
    vorteileTitle: "Ihre Vorteile",
    v1: "Keine Verpflichtung",
    v1b: " – Sie gehen keine langfristigen Verträge ein.",
    v2: "Dauerhaft sichtbar, ohne Aufwand",
    v2b:
      " – Das Banner hängt dauerhaft und nimmt keinen Platz weg. Anbringung und Material kommen von HE immologis.",
    v3: "Rechtlich selbstständig",
    v3b:
      " – Sie müssen niemanden ansprechen oder vermitteln. Ihre Fläche wird zur Einnahmequelle.",
    ablaufTitle: "So funktioniert's",
    step1Title: "Fläche anbieten",
    step1Text: "Sie melden uns Ihre Fläche – Zaun, Garage oder Grundstück.",
    step2Title: "Banner wird platziert",
    step2Text: "HE immologis bringt das Banner an. Es hängt dauerhaft und nimmt keinen Platz weg.",
    step3Title: "Prämie kassieren",
    step3Text: "Bei erfolgreichem Verkauf über Ihr Banner erhalten Sie 500 € Prämie.",
    content1: "Sie müssen nichts betreuen oder auf- und abbauen – das Banner hängt dauerhaft sichtbar.",
    content2:
      "Kommt ein Kunde über dieses Banner zu uns und es entsteht daraus ein erfolgreicher Immobilienverkauf, erhalten Sie Ihre Banner-Prämie von ",
    content2b:
      ". Die Auszahlung erfolgt nach notariellem Kaufvertragsabschluss und Eingang der Maklercourtage.",
    content3:
      "Sie gehen keinerlei Verpflichtung ein und handeln rechtlich selbstständig. Eine einfache Fläche kann so nebenbei Geld verdienen.",
    content4: "Bei erfolgreichem Abschluss zahlen wir Ihre Prämie direkt an Sie aus.",
    vereinbarungenTitle: "Vereinbarungen & Unterlagen",
    privatTitle: "Privatpersonen",
    privatDesc: "Mustervertrag Werbefläche für private Grundstücke, Zäune, Garagen.",
    downloadPrivat: "Vereinbarung Privat (PDF) herunterladen",
    gewerbeTitle: "Gewerbe & Ladenbesitzer",
    gewerbeDesc: "Mustervertrag Werbefläche für gewerbliche Flächen.",
    downloadGewerbe: "Vereinbarung Gewerbe (PDF) herunterladen",
    ctaTitle: "Haben Sie eine passende Fläche?",
    ctaSub: "Schicken Sie uns ein Foto oder rufen Sie uns an.",
    orCall: "Oder anrufen:",
  },
  en: {
    metaTitle: "Banner advertising – €500 bonus for private land & fences | HE immologis",
    metaDescription:
      "Rent out advertising space: HE immologis banner on fence, garage or land. Permanently visible, no space lost. €500 bonus on sale.",
    metaKeywords: ["Banner advertising real estate", "Rent advertising space", "€500 bonus banner", "HE immologis"],
    backLink: "Back to Earn money",
    heroTitle: "Earn money with banner space",
    heroIntro:
      "Do you have a fence, a plot of land or a well visible area? Then simply make it available for a HE immologis property advertising banner for a period you choose.",
    heroCta: "€500 bonus on successful sale",
    vorteileTitle: "Your benefits",
    v1: "No commitment",
    v1b: " – You are not tied into any long-term contracts.",
    v2: "Permanently visible, no effort",
    v2b:
      " – The banner is displayed permanently and takes up no space. Installation and material are provided by HE immologis.",
    v3: "Legally independent",
    v3b:
      " – You don't have to approach or refer anyone. Your space becomes a source of income.",
    ablaufTitle: "How it works",
    step1Title: "Offer space",
    step1Text: "You let us know about your space – fence, garage or land.",
    step2Title: "Banner is placed",
    step2Text: "HE immologis installs the banner. It stays up permanently and takes up no space.",
    step3Title: "Receive your bonus",
    step3Text: "On successful sale via your banner you receive a €500 bonus.",
    content1: "You don't have to maintain or set up anything – the banner is permanently visible.",
    content2:
      "If a customer comes to us via this banner and a successful property sale results, you receive your banner bonus of ",
    content2b:
      ". Payment is made after completion of the notarial purchase contract and receipt of the commission.",
    content3:
      "You have no obligations and act as an independent party. A simple space can earn you money on the side.",
    content4: "On successful completion we pay your bonus directly to you.",
    vereinbarungenTitle: "Agreements & documents",
    privatTitle: "Private individuals",
    privatDesc: "Sample agreement for advertising space on private land, fences, garages.",
    downloadPrivat: "Download private agreement (PDF)",
    gewerbeTitle: "Business & shop owners",
    gewerbeDesc: "Sample agreement for advertising space on commercial premises.",
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
    keywords: [...t.metaKeywords],
  };
}

export default async function BannerPage() {
  const locale = await getLocaleFromHeaders();
  const t = TEXTS[locale === "en" ? "en" : "de"];
  const prefix = locale === "en" ? "/en" : "";

  return (
    <>
      <section
        className="relative flex min-h-[400px] items-center overflow-hidden border-b border-slate-200 px-4 py-12 sm:min-h-[480px] sm:px-6 sm:py-16 lg:px-8"
        aria-labelledby="banner-hero-heading"
        style={{
          backgroundImage: "url(/img/hero-banner.jpeg)",
          backgroundSize: "cover",
          backgroundPosition: "center 85%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-slate-900/75" aria-hidden />
        <div className="relative z-10 mx-auto max-w-4xl">
          <Link
            href={`${prefix}/geld-verdienen`}
            className="mb-8 inline-flex items-center gap-2 text-white/90 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            {t.backLink}
          </Link>
          <h1
            id="banner-hero-heading"
            className="font-sans text-3xl font-semibold tracking-tight text-white drop-shadow-sm sm:text-4xl"
          >
            {t.heroTitle}
          </h1>
          <p className="mt-4 text-lg text-white/95 drop-shadow-sm">
            {t.heroIntro}
          </p>
          <p
            className="mt-4 inline-block animate-breathe text-2xl font-bold text-white drop-shadow-sm sm:text-3xl"
            style={{ color: "#93c5fd" }}
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
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-6 text-lg leading-relaxed text-slate-700">
          <p>{t.content1}</p>
          <p>
            {t.content2}
            <strong className="text-slate-800">{locale === "en" ? "€500" : "500 €"}</strong>
            {t.content2b}
          </p>
          <p>{t.content3}</p>
          <p>{t.content4}</p>
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
