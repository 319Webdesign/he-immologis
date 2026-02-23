import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ChevronDown } from "lucide-react";
import MietenContent from "./MietenContent";
import rentalsData from "@/data/rentals.json";
import type { Rental } from "@/types";
import ShareSection from "@/components/ShareSection";
import { getDictionary } from "@/dictionaries";
import { getLocaleFromHeaders } from "@/lib/i18n";

const allRentals = rentalsData as Rental[];

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocaleFromHeaders();
  const dict = await getDictionary(locale);
  const m = dict.mieten.meta;
  return {
    title: m.title,
    description: m.description,
    keywords: m.keywords,
  };
}

export default async function MietenPage() {
  const locale = await getLocaleFromHeaders();
  const dict = await getDictionary(locale);
  const m = dict.mieten;
  const prefix = `/${locale}`;

  return (
    <>
      {/* Hero mit Hintergrundbild */}
      <section
        className="relative flex min-h-[70vh] flex-col overflow-hidden border-b border-zinc-100 bg-cover bg-center bg-no-repeat px-4 pt-16 pb-24 sm:px-6 sm:pt-24 sm:pb-28 lg:bg-[length:100%_auto] lg:px-8"
        aria-labelledby="hero-mieten-heading"
        style={{
          backgroundImage: "url(/img/hero-mieten.jpeg)",
          backgroundColor: "#1e293b",
        }}
      >
        <div className="absolute inset-0 bg-slate-900/40" aria-hidden />
        <div className="relative z-10 mx-auto flex max-w-7xl flex-1 flex-col items-center justify-center pt-20 text-center sm:pt-0">
          <h1
            id="hero-mieten-heading"
            className="font-sans text-4xl font-semibold tracking-tight text-white drop-shadow-sm sm:text-5xl"
          >
            {m.hero.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/95 drop-shadow-sm">
            {m.hero.subtitle}
          </p>
        </div>
        <a
          href="#mietobjekte"
          className="absolute bottom-6 left-0 right-0 z-10 flex flex-col items-center gap-1 text-white/90 transition-colors hover:text-white sm:bottom-8"
          aria-label={m.hero.ctaAriaLabel}
        >
          <span className="text-sm font-medium">{m.hero.ctaText}</span>
          <ChevronDown className="h-7 w-7 animate-bounce text-white/80" aria-hidden />
        </a>
      </section>

      {/* Filter + Grid */}
      <section id="mietobjekte" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Suspense fallback={<div className="h-14 rounded-xl bg-zinc-100" />}>
          <MietenContent rentals={allRentals} dict={m} lang={locale} />
        </Suspense>
      </section>

      {/* Hinweis Maklerprovision / Bestellerprinzip */}
      <section
        className="border-t border-zinc-200 bg-white px-4 py-10 sm:px-6 sm:py-12 lg:px-8"
        aria-labelledby="mieten-hinweis-heading"
      >
        <div className="mx-auto max-w-4xl">
          <h2 id="mieten-hinweis-heading" className="sr-only">
            {m.provision.headingSrOnly}
          </h2>
          <div className="rounded-xl border border-zinc-200 bg-zinc-50/80 p-6 text-sm leading-relaxed text-zinc-700 sm:p-8">
            <span className="mb-4 inline-block rounded-full bg-zinc-200/80 px-3 py-1 text-xs font-medium uppercase tracking-wider text-zinc-500">
              {m.provision.badge}
            </span>
            <p className="font-medium text-zinc-800">
              {m.provision.paragraph1}
            </p>
            <p className="mt-4 font-medium text-zinc-800">
              {m.provision.paragraph2Prefix}
              <Link href={`${prefix}/agb`} className="text-[#4682B4] underline hover:no-underline">
                {m.provision.agbLinkText}
              </Link>
              {m.provision.paragraph2Suffix}
            </p>
          </div>
        </div>
      </section>

      <ShareSection dict={dict.shareSection} />
    </>
  );
}
