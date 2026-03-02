"use client";

import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";

const STEEL_BLUE = "#4682B4";
const LIGHT_BG = "#faf8f5";

type Locale = "de" | "en" | "tr";

const TEXTS: Record<
  Locale,
  { headline: string; description: string; cta: string }
> = {
  de: {
    headline: "Spenden statt Prämie",
    description:
      "Verzichten Sie auf Ihre Tippgeber- oder Werbeprämie und lassen Sie stattdessen 500 € in ein regionales Projekt fließen. HE immologis leitet den Betrag transparent an ausgewählte soziale oder gemeinnützige Vorhaben in der Region weiter.",
    cta: "Mehr zu unseren Projekten erfahren",
  },
  en: {
    headline: "Donate instead of bonus",
    description:
      "Waive your referrer or advertising bonus and let €500 go to a regional project instead. HE immologis forwards the amount transparently to selected social or charitable initiatives in the region.",
    cta: "Learn more about our projects",
  },
  tr: {
    headline: "Ödül yerine bağış",
    description:
      "Tavsiye veya reklam ödülünüzden vazgeçin ve 500 €'yu bölgesel bir projeye aktarın. HE immologis tutarı bölgede seçilmiş sosyal veya hayır kurumlarına şeffaf bir şekilde iletir.",
    cta: "Projelerimiz hakkında daha fazla bilgi",
  },
};

interface DonationOptionProps {
  lang: Locale;
}

export default function DonationOption({ lang }: DonationOptionProps) {
  const locale = lang in TEXTS ? (lang as Locale) : "de";
  const t = TEXTS[locale];

  return (
    <section
      className="rounded-2xl px-6 py-10 sm:px-8 sm:py-12"
      style={{ backgroundColor: LIGHT_BG }}
      aria-labelledby="donation-option-heading"
    >
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center gap-3">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
            style={{ backgroundColor: `${STEEL_BLUE}22` }}
            aria-hidden
          >
            <Heart className="h-6 w-6" style={{ color: STEEL_BLUE }} />
          </div>
          <h2
            id="donation-option-heading"
            className="font-sans text-2xl font-semibold tracking-tight text-slate-800 sm:text-3xl"
          >
            {t.headline}
          </h2>
        </div>
        <p className="mt-4 text-slate-700 leading-relaxed sm:text-lg">
          {t.description}
        </p>
        <Link
          href={`/${lang}/spenden`}
          className="mt-6 inline-flex items-center gap-2 rounded-lg px-5 py-3 font-semibold text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4682B4]"
          style={{ backgroundColor: STEEL_BLUE }}
        >
          {t.cta}
          <ArrowRight className="h-5 w-5" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
