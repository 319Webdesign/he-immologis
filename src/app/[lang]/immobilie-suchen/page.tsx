import type { Metadata } from "next";
import LocalBusinessSchema from "@/components/seo/LocalBusinessSchema";
import { ChevronDown } from "lucide-react";
import SearchRequestForm from "@/components/SearchRequestForm";
import ShareSection from "@/components/ShareSection";
import { getDictionary } from "@/dictionaries";

const LOCALES = ["de", "en", "tr"] as const;
type Locale = (typeof LOCALES)[number];
function isValidLocale(lang: string): lang is Locale {
  return LOCALES.includes(lang as Locale);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = isValidLocale(rawLang) ? rawLang : "de";
  if (lang === "en") {
    return {
      title: "Property search Weinheim & Bergstraße",
      description:
        "Free property search Weinheim & Bergstraße. HE immologis finds your ideal property in Bensheim, Heppenheim, Viernheim, Lampertheim. Holger Eberhard advises you.",
      keywords: [
        "Property search Weinheim",
        "Real estate agent Weinheim",
        "Buy house Weinheim",
        "Bensheim",
        "Heppenheim",
        "Viernheim",
        "HE-immologis",
      ],
    };
  }
  if (lang === "tr") {
    return {
      title: "Weinheim & Bergstraße gayrimenkul arama",
      description:
        "Weinheim ve Bergstraße'de ücretsiz gayrimenkul arama. HE immologis Bensheim, Heppenheim, Viernheim, Lampertheim'de size uygun gayrimenkulu bulur. Holger Eberhard.",
      keywords: [
        "Weinheim gayrimenkul arama",
        "Weinheim emlak danışmanı",
        "Bergstraße gayrimenkul",
        "Bensheim",
        "Heppenheim",
        "Viernheim",
        "HE-immologis",
      ],
    };
  }
  return {
    title: "Immobilie suchen Weinheim & Rhein-Neckar | HE-immologis",
    description:
      "Kostenloser Suchauftrag Weinheim & Rhein-Neckar. HE immologis findet Ihre Immobilie in Hirschberg, Hemsbach, Viernheim. Holger Eberhard berät Sie. Jetzt Suchauftrag anlegen!",
    keywords: [
      "Immobilie suchen Weinheim",
      "Immobilienmakler Weinheim",
      "Haus kaufen Rhein-Neckar",
      "Immobilienbewertung Weinheim",
      "Hirschberg",
      "Hemsbach",
      "Laudenbach",
      "Viernheim",
      "HE-immologis",
    ],
  };
}

export default async function ImmobilieSuchenPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = isValidLocale(rawLang) ? rawLang : "de";
  const isEn = lang === "en";
  const isTr = lang === "tr";
  const dict = await getDictionary(lang);

  const heroHeading = isEn
    ? "Search in Weinheim and the surrounding area."
    : isTr
      ? "Weinheim ve çevresinde arayın."
      : "Suche in Weinheim und Umgebung.";
  const heroSubline = isEn
    ? "Your requirements – We search specifically for you."
    : isTr
      ? "İstekleriniz – Sizin için hedefli arama yapıyoruz."
      : "Ihre Wünsche – Wir suchen gezielt für Sie.";
  const ctaLabel = isEn
    ? "Let us find for you"
    : isTr
      ? "Sizin için bulalım"
      : "Jetzt entdecken lassen";
  const ctaAria = isEn
    ? "Scroll to search request form"
    : isTr
      ? "Arama talebi formuna kaydır"
      : "Zum Suchauftrag-Formular scrollen";

  return (
    <>
      <LocalBusinessSchema />
      {/* Hero */}
      <section
        className="relative flex min-h-[70vh] flex-col overflow-hidden border-b border-slate-200 bg-cover bg-center bg-no-repeat px-2 pt-16 pb-24 sm:px-6 sm:pt-24 sm:pb-28 lg:bg-[length:100%_auto] lg:px-8"
        aria-labelledby="hero-suche-heading"
        style={{
          backgroundImage: "url(/img/hero-suche.jpeg)",
          backgroundColor: "#1e293b",
        }}
      >
        <div className="absolute inset-0 bg-slate-900/40" aria-hidden />
        <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-2 pt-20 text-center sm:px-0 sm:pt-0">
          <h1
            id="hero-suche-heading"
            className="w-full font-sans text-2xl font-semibold tracking-tight text-white drop-shadow-sm sm:w-auto sm:text-4xl lg:text-5xl"
          >
            {heroHeading}
          </h1>
          <p className="mt-4 text-base text-white/95 drop-shadow-sm sm:mt-8 sm:text-lg">
            {heroSubline}
          </p>
        </div>
        <a
          href="#suchauftrag"
          className="absolute bottom-6 left-0 right-0 z-10 flex flex-col items-center gap-1 text-white/90 transition-colors hover:text-white sm:bottom-8"
          aria-label={isEn ? "Scroll to search request form" : "Zum Suchauftrag-Formular scrollen"}
        >
          <span className="text-sm font-medium">
            {ctaLabel}
          </span>
          <ChevronDown className="h-7 w-7 animate-bounce text-white/80" aria-hidden />
        </a>
      </section>

      {/* Formular */}
      <section id="suchauftrag" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <SearchRequestForm lang={lang} />
      </section>

      <ShareSection dict={{ ...dict.shareSection, buttonLabel: dict.shareSection.pageLabels?.immobilieSuchen ?? dict.shareSection.buttonLabel }} />
    </>
  );
}
