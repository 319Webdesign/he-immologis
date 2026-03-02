"use client";

import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";

const STEEL_BLUE = "#4682B4";

type Locale = "de" | "en" | "tr";

const TEXTS: Record<
  Locale,
  { headline: string; description: string; cta: string }
> = {
  de: {
    headline: "Spenden statt Prämie",
    description:
      "Verzichten Sie auf die Tippgeber- (siehe Staffel), Banner- oder Aufstellerprämie (je 500,- €), spendet die Firma HE immologis Ihre volle Provision an eine gemeinnützige Organisation Ihrer Wahl.",
    cta: "Mehr zu unseren Projekten erfahren",
  },
  en: {
    headline: "Donate instead of bonus",
    description:
      "If you waive the referrer (see scale), banner or display bonus (€500 each), HE immologis will donate your full commission to a charitable organization of your choice.",
    cta: "Learn more about our projects",
  },
  tr: {
    headline: "Ödül yerine bağış",
    description:
      "Tavsiyeci (kademeye bakın), banner veya pano priminden (her biri 500 €) vazgeçerseniz, HE immologis tam komisyonunuzu seçtiğiniz bir hayır kurumuna bağışlar.",
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
      className="relative overflow-hidden rounded-2xl px-6 py-10 sm:px-8 sm:py-12"
      aria-labelledby="donation-option-heading"
    >
      <video
        src="/video/spenden.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover object-center"
        aria-hidden
      />
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(70, 130, 180, 0.45)" }}
        aria-hidden
      />
      <div className="relative z-10 mx-auto max-w-3xl">
        <div className="flex items-center gap-3">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
            style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
            aria-hidden
          >
            <Heart className="h-6 w-6 text-white" />
          </div>
          <h2
            id="donation-option-heading"
            className="font-sans text-2xl font-semibold tracking-tight text-white sm:text-3xl"
          >
            {t.headline}
          </h2>
        </div>
        <p className="mt-4 text-white leading-relaxed sm:text-lg">
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
