import type { Metadata } from "next";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import SellForm from "@/components/SellForm";
import SellerServices from "@/components/SellerServices";
import FinalCTA from "@/components/FinalCTA";
import ShareSection from "@/components/ShareSection";
import { getDictionary } from "@/dictionaries";
import { getLocaleFromHeaders } from "@/lib/i18n";

/** URL-Parameter für Zustand (ValueBanner) → Index in sellForm.zustaende */
const ZUSTAND_URL_TO_INDEX: Record<string, number> = {
  normal: 0,
  modernisiert: 1,
  kernsaniert: 2,
  modernisierungsbedürftig: 3,
  sanierungsbedürftig: 4,
};

/** Deutsche Objekttyp-Labels in fester Reihenfolge (für URL-Param → Index) */
const OBJEKTYP_ORDER_DE = [
  "Einfamilienhaus",
  "Zweifamilienhaus",
  "Reihenhaus",
  "Doppelhaushälfte",
  "Mehrfamilienhaus",
  "Eigentumswohnung",
  "Grundstück",
  "Gewerbeimmobilie",
  "Gewerbe / Wohnen",
  "Gewerbe- / Wohnimmobilie",
] as const;

interface VerkaufenPageProps {
  searchParams: Promise<{ objekttyp?: string; zustand?: string }>;
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocaleFromHeaders();
  const dict = await getDictionary(locale);
  const m = dict.verkaufen.meta;
  return {
    title: m.title,
    description: m.description,
    keywords: m.keywords,
  };
}

export default async function VerkaufenPage({ searchParams }: VerkaufenPageProps) {
  const locale = await getLocaleFromHeaders();
  const dict = await getDictionary(locale);
  const params = await searchParams;
  const v = dict.verkaufen;
  const prefix = `/${locale}`;

  const initialZustandIndex =
    params.zustand != null ? ZUSTAND_URL_TO_INDEX[params.zustand] ?? -1 : -1;
  const initialObjekttypIndex =
    params.objekttyp != null
      ? (OBJEKTYP_ORDER_DE as readonly string[]).indexOf(params.objekttyp)
      : -1;

  return (
    <>
      <section
        className="relative flex min-h-[70vh] flex-col overflow-hidden px-4 pt-16 pb-24 sm:px-6 sm:pt-24 sm:pb-28 lg:px-8"
        aria-labelledby="hero-verkaufen-heading"
        style={{
          backgroundImage: "url(/img/hero-verkaufen.jpeg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#1e293b",
        }}
      >
        <div className="absolute inset-0 bg-slate-900/40" aria-hidden />
        <div className="relative z-10 mx-auto flex max-w-7xl flex-1 flex-col items-center justify-center pt-20 text-center sm:pt-0">
          <h1
            id="hero-verkaufen-heading"
            className="font-sans text-4xl font-semibold tracking-tight text-white drop-shadow-sm sm:text-5xl"
          >
            <span className="sm:hidden">
              <span dangerouslySetInnerHTML={{ __html: v.hero.titleLine1Mobile }} />
              <br />
              <span className="text-2xl" dangerouslySetInnerHTML={{ __html: v.hero.titleLine2Mobile }} />
            </span>
            <span className="hidden sm:inline">
              {v.hero.titleLine1}
              <br />
              <span className="text-2xl sm:text-3xl">{v.hero.titleLine2}</span>
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/95 drop-shadow-sm">
            <span className="sm:hidden" dangerouslySetInnerHTML={{ __html: v.hero.subtitleMobile }} />
            <span className="hidden sm:inline">{v.hero.subtitle}</span>
          </p>
        </div>
        <a
          href="#anfrage-formular"
          className="absolute bottom-6 left-0 right-0 z-10 flex flex-col items-center gap-1 text-white/90 transition-colors hover:text-white sm:bottom-8"
          aria-label={v.hero.ctaAriaLabel}
        >
          <span className="text-sm font-medium">{v.hero.ctaText}</span>
          <ChevronDown className="h-7 w-7 animate-bounce text-white/80" aria-hidden />
        </a>
      </section>

      <FinalCTA dict={v.finalCta} />

      <section
        id="anfrage-formular"
        className="bg-slate-50/80 px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
      >
        <div className="mx-auto max-w-4xl">
          <SellForm
            dict={v.sellForm}
            lang={locale}
            initialObjekttypIndex={initialObjekttypIndex >= 0 ? initialObjekttypIndex : undefined}
            initialZustandIndex={initialZustandIndex >= 0 ? initialZustandIndex : undefined}
          />
        </div>
      </section>

      <section
        className="border-t border-zinc-200 bg-white px-4 py-10 sm:px-6 sm:py-12 lg:px-8"
        aria-labelledby="provision-hinweis-heading"
      >
        <div className="mx-auto max-w-4xl">
          <h2 id="provision-hinweis-heading" className="sr-only">
            {v.provision.headingSrOnly}
          </h2>
          <div className="rounded-xl border border-zinc-200 bg-zinc-50/80 p-6 text-sm leading-relaxed text-zinc-700 sm:p-8">
            <span className="mb-4 inline-block rounded-full bg-zinc-200/80 px-3 py-1 text-xs font-medium uppercase tracking-wider text-zinc-500">
              {v.provision.badge}
            </span>
            <p className="font-medium text-zinc-800">{v.provision.paragraph1}</p>
            <p className="mt-4 font-medium text-zinc-800">
              {v.provision.paragraph2Prefix}
              <Link
                href={`${prefix}/agb`}
                className="text-[#4682B4] underline hover:no-underline"
              >
                {v.provision.agbLinkText}
              </Link>
              {v.provision.paragraph2Suffix}
            </p>
          </div>
        </div>
      </section>

      <SellerServices dict={v.sellerServices} lang={locale} />

      <ShareSection dict={dict.shareSection} />
    </>
  );
}
