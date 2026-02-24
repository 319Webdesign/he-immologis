import type { Metadata } from "next";
import { Suspense } from "react";
import { ChevronDown } from "lucide-react";
import PropertyFilters from "./PropertyFilters";
import PropertiesGrid from "./PropertiesGrid";
import PropertyGridSkeleton from "./PropertyGridSkeleton";
import Kauftipps from "./Kauftipps";
import Contact from "@/components/Contact";
import ShareSection from "@/components/ShareSection";
import { getDictionary } from "@/dictionaries";
import { getLocaleFromHeaders } from "@/lib/i18n";

interface PageProps {
  searchParams: Promise<{ status?: string; ort?: string }>;
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocaleFromHeaders();
  const dict = await getDictionary(locale);
  const m = dict.kaufen.meta;
  return {
    title: m.title,
    description: m.description,
    keywords: m.keywords,
  };
}

export default async function KaufenPage({ searchParams }: PageProps) {
  const locale = await getLocaleFromHeaders();
  const dict = await getDictionary(locale);
  const params = await searchParams;
  const ortFilter = params.ort ?? "alle";
  const k = dict.kaufen;

  return (
    <>
      <section
        className="relative flex min-h-[70vh] flex-col overflow-hidden px-4 pt-16 pb-24 sm:px-6 sm:pt-24 sm:pb-28 lg:px-8"
        aria-labelledby="hero-kaufen-heading"
        style={{
          backgroundImage: "url(/img/header-kaufen.jpeg)",
          backgroundSize: "cover",
          backgroundPosition: "68% 18%",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#1e293b",
        }}
      >
        <div className="absolute inset-0 bg-slate-900/40" aria-hidden />
        <div className="relative z-10 mx-auto flex max-w-7xl flex-1 flex-col items-center justify-center pt-20 text-center sm:pt-0">
          <h1
            id="hero-kaufen-heading"
            className="font-sans text-4xl font-semibold tracking-tight text-white drop-shadow-sm sm:text-5xl"
          >
            <span className="sm:hidden">
              {k.hero.titleMobileLine1}
              <br />
              {k.hero.titleMobileLine2}
            </span>
            <span className="hidden sm:inline">{k.hero.title}</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/95 drop-shadow-sm">
            <span className="sm:hidden">
              {k.hero.subtitleMobileLine1}
              <br />
              {k.hero.subtitleMobileLine2}
            </span>
            <span className="hidden sm:inline">{k.hero.subtitle}</span>
          </p>
        </div>
        <a
          href="#immobilien"
          className="absolute bottom-6 left-0 right-0 z-10 flex flex-col items-center gap-1 text-white/90 transition-colors hover:text-white sm:bottom-8"
          aria-label={k.hero.ctaAriaLabel}
        >
          <span className="text-sm font-medium">{k.hero.ctaText}</span>
          <ChevronDown className="h-7 w-7 animate-bounce text-white/80" aria-hidden />
        </a>
      </section>

      <section id="immobilien" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Suspense fallback={<div className="h-14 rounded-xl bg-zinc-100 animate-pulse" />}>
          <PropertyFilters dict={k.filters} lang={locale} />
        </Suspense>
        <Suspense fallback={<PropertyGridSkeleton />}>
          <PropertiesGrid ortFilter={ortFilter} noResultsText={k.noResults} />
        </Suspense>
      </section>

      <Kauftipps dict={k.kauftipps} lang={locale} />

      <ShareSection dict={dict.shareSection} />

      <Contact
        title={k.contact.title}
        subtitle={k.contact.subtitle}
        accentColor="steelblue"
        formLabels={dict.contactForm}
      />
    </>
  );
}
