"use client";

import { ChevronDown } from "lucide-react";

/**
 * Video-Hero für die Startseite.
 * - Video: /video/startseitefilm.webm (alle Geräte inkl. Handy)
 * - Poster: /img/hero-poster.jpg als Erstbild bis das Video lädt
 */
const VIDEO_SRC = "/video/startseitefilm.webm";
const POSTER_SRC = "/img/hero-poster.jpg";

export type HomeHeroDict = {
  line1: string;
  line2: string;
  subline: string;
  discoverMore: string;
};

interface HeroProps {
  dict: HomeHeroDict;
}

export default function Hero({ dict }: HeroProps) {
  return (
    <section
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden -mt-[7.5rem]"
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
          </h1>
          <p className="mt-4 text-base font-normal tracking-wide text-white/90 sm:text-lg md:mt-6">
            {dict.subline}
          </p>
        </div>
      </div>

      {/* Scroll-Down-Hinweis am unteren Rand */}
      <div className="absolute bottom-0 left-0 right-0 z-10 flex flex-col items-center pb-8">
        <span className="mb-2 text-xs uppercase tracking-widest text-white/70">
          {dict.discoverMore}
        </span>
        <ChevronDown
          className="h-8 w-8 animate-bounce text-white/80"
          aria-hidden
        />
      </div>
    </section>
  );
}
