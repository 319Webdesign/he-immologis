"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Key } from "lucide-react";

/**
 * Video-Hero für die Startseite.
 * - Video: /video/startseitefilm.webm (alle Geräte inkl. Handy)
 * - Poster: /img/hero-poster.jpg als Erstbild bis das Video lädt
 */
const VIDEO_SRC = "/video/startseitefilm.webm";
const POSTER_SRC = "/img/hero-poster.jpg";
const MINT = "#D3EFDE";

export type HomeHeroDict = {
  line1: string;
  line2: string;
  line2Next: string;
  subline: string;
  ctaBuy: string;
  ctaRent: string;
};

interface HeroProps {
  dict: HomeHeroDict;
  lang?: string;
}

export default function Hero({ dict, lang: langProp }: HeroProps) {
  const pathname = usePathname();
  const lang = langProp ?? (pathname?.split("/")[1] ?? "de");

  return (
    <section
      className={`relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden ${lang === "tr" ? "mt-0" : "-mt-[7.5rem]"}`}
      aria-label="Hero-Bereich"
    >
      {/* Video auf allen Geräten (muted + playsInline für Mobile-Autoplay) */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 z-0 h-full w-full object-cover"
        poster={POSTER_SRC}
        aria-hidden
      >
        <source src={VIDEO_SRC} type="video/webm" />
      </video>

      {/* Dunkles Overlay für Lesbarkeit */}
      <div
        className="absolute inset-0 z-[1] bg-black/40"
        aria-hidden
      />

      {/* Inhalt zentral – auf Handy etwas nach unten, ab sm zentriert */}
      <div className="absolute inset-0 z-10 flex items-center justify-center px-4 pt-20 sm:pt-0">
        <div className="text-center hero-text-fade">
          <h1 className="font-sans text-2xl font-semibold tracking-tight text-white drop-shadow-md sm:text-3xl md:text-4xl lg:text-5xl">
            {dict.line1}
            <br />
            {dict.line2}
            <br />
            <span className="whitespace-nowrap">{dict.line2Next}</span>
          </h1>
          <p className="mt-4 text-base font-normal tracking-wide text-white/90 sm:text-lg md:mt-6">
            {dict.subline}
          </p>
        </div>
      </div>

      {/* CTA-Buttons: auf kleinen Handys deutlich höher, damit vollständig sichtbar */}
      <div className="absolute bottom-0 left-0 right-0 z-10 flex flex-col items-center px-2 pb-[9rem] min-[480px]:pb-24 sm:px-0 sm:pb-8">
        <div className="rounded-lg bg-black/25 px-3 py-2.5 shadow-[0_2px_12px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:px-4 sm:py-2.5">
          <div className="flex flex-row gap-2 sm:gap-3">
            <Link
              href={`/${lang}/kaufen`}
              className="inline-flex items-center justify-center gap-1.5 rounded-md px-4 py-2.5 text-sm font-medium shadow transition-all duration-200 hover:scale-[1.03] hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/30"
              style={{ backgroundColor: MINT, color: "#1e293b" }}
            >
              <Home className="h-4 w-4 shrink-0" aria-hidden />
              {dict.ctaBuy}
            </Link>
            <Link
              href={`/${lang}/mieten`}
              className="inline-flex items-center justify-center gap-1.5 rounded-md px-4 py-2.5 text-sm font-medium shadow transition-all duration-200 hover:scale-[1.03] hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/30"
              style={{ backgroundColor: MINT, color: "#1e293b" }}
            >
              <Key className="h-4 w-4 shrink-0" aria-hidden />
              {dict.ctaRent}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
