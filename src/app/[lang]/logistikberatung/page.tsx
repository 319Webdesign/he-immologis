import type { Metadata } from "next";
import Link from "next/link";
import {
  SMART_INTRO,
  SMART_INTRO_EN,
  SMART_MODULE,
  SMART_MODULE_EN,
} from "@/data/logistikberatung";
import Contact from "@/components/Contact";
import { getDictionary } from "@/dictionaries";
import { getLocaleFromHeaders } from "@/lib/i18n";

const BRAND_BLUE = "#4682B4";

const META = {
  de: {
    title: "Logistikberatung – SMART | HE immologis UG",
    description:
      "SMART – Beratung und Vertriebsunterstützung in Supply Chain und temperaturgeführter Logistik. Schulung, M&A, Entscheidernetzwerke, Interim-Lösungen, Transportnetzwerkstrategien.",
    keywords: [
      "Logistikberatung",
      "SMART",
      "Supply Chain",
      "temperaturgeführte Logistik",
      "HE immologis",
      "Weinheim",
    ],
  },
  en: {
    title: "Logistics consulting – SMART | HE immologis UG",
    description:
      "SMART – Consulting and sales support in supply chain and temperature-controlled logistics. Training, M&A, decision-maker networks, interim solutions, transport network strategies.",
    keywords: [
      "Logistics consulting",
      "SMART",
      "Supply chain",
      "Temperature-controlled logistics",
      "HE immologis",
      "Weinheim",
    ],
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocaleFromHeaders();
  const m = META[locale === "en" ? "en" : "de"];
  return {
    title: m.title,
    description: m.description,
    keywords: m.keywords,
  };
}

export default async function LogistikberatungPage() {
  const locale = await getLocaleFromHeaders();
  const dict = await getDictionary(locale);
  const lb = dict.logistikberatung as {
    introText: string;
    moreInfo: string;
    eiswuerfelQuote: string;
    contactTitle: string;
    contactSubtitle: string;
    srOnlyModules: string;
    srOnlyEiswuerfel: string;
    moduleLabel: string;
  };
  const smartIntro = locale === "en" ? SMART_INTRO_EN : SMART_INTRO;
  const smartModule = locale === "en" ? SMART_MODULE_EN : SMART_MODULE;
  const prefix = locale === "en" ? "/en" : "";

  return (
    <>
      <section
        className="relative min-h-[70vh] border-b border-slate-200 bg-cover bg-center bg-no-repeat px-4 py-16 sm:px-6 sm:py-24 lg:bg-[length:100%_auto] lg:px-8"
        aria-labelledby="hero-logistik-heading"
        style={{
          backgroundImage: "url(/img/hero-logistikberatung.jpeg)",
          backgroundColor: "#1e293b",
        }}
      >
        <div className="absolute inset-0 bg-slate-900/50" aria-hidden />
        <div className="relative z-10 mx-auto max-w-4xl pt-20 text-center sm:pt-0">
          <h1
            id="hero-logistik-heading"
            className="font-sans text-4xl font-semibold tracking-tight text-white drop-shadow-sm sm:text-5xl"
          >
            {smartIntro.title.map((line, i) => (
              <span key={i}>
                {line}
                {i < smartIntro.title.length - 1 && <br />}
              </span>
            ))}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-white/95 drop-shadow-sm">
            {smartIntro.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-4">
            {smartIntro.acronym.map(({ letter, label }) => (
              <span
                key={letter}
                className="rounded-lg px-4 py-2 text-sm text-white"
                style={{ backgroundColor: BRAND_BLUE }}
                title={label}
              >
                <strong>{letter}</strong> – {label}
              </span>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-3xl text-center text-lg leading-relaxed text-white/95 drop-shadow-sm">
            {smartIntro.heroDescription.map((line, i) => (
              <span key={i}>
                {line}
                {i < smartIntro.heroDescription.length - 1 && <br />}
              </span>
            ))}
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-center text-lg leading-relaxed text-slate-700">
            {lb.introText}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <h2 className="sr-only">{lb.srOnlyModules}</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {smartModule.map((modul) => (
            <Link
              key={modul.slug}
              href={`${prefix}/logistikberatung/${modul.slug}`}
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md"
            >
              <span
                className="inline-flex h-12 w-12 items-center justify-center rounded-xl text-xl font-bold text-white"
                style={{ backgroundColor: BRAND_BLUE }}
              >
                {modul.letter}
              </span>
              <h3 className="mt-4 font-sans text-xl font-semibold tracking-tight text-slate-900">
                <span className="block">{lb.moduleLabel} {modul.letter}</span>
                <span className="mt-0.5 block text-base font-semibold text-slate-700">
                  – {modul.title}
                </span>
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                {modul.shortDescription}
              </p>
              <span
                className="mt-4 inline-flex items-center text-sm font-semibold"
                style={{ color: BRAND_BLUE }}
              >
                {lb.moreInfo}
                <span className="ml-1 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section
        className="border-b border-slate-200 bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
        aria-labelledby="eiswuerfel-heading"
      >
        <div className="mx-auto max-w-5xl">
          <h2 id="eiswuerfel-heading" className="sr-only">
            {lb.srOnlyEiswuerfel}
          </h2>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="overflow-hidden rounded-2xl bg-slate-100">
              <video
                src="/video/eiswuerfel.webm"
                autoPlay
                muted
                loop
                playsInline
                className="h-auto w-full"
                preload="auto"
              >
                {locale === "en"
                  ? "Your browser does not support playback of this video."
                  : "Ihr Browser unterstützt die Wiedergabe dieses Videos nicht."}
              </video>
            </div>
            <p className="text-lg leading-relaxed text-slate-700">
              {lb.eiswuerfelQuote}
            </p>
          </div>
        </div>
      </section>

      <Contact
        variant="white"
        accentColor="steelblue"
        title={lb.contactTitle}
        subtitle={lb.contactSubtitle}
        formLabels={dict.contactForm}
      />
    </>
  );
}
