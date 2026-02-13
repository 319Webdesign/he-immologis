"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";

/**
 * Video-Hero für die Startseite.
 * - Platzhalter-Video: /video/hero.mp4 (ersetzen mit echtem Asset)
 * - Platzhalter-Poster (Mobile): /img/hero-poster.jpg (optional; sonst Gradient)
 */
const VIDEO_SRC = "/video/hero.mp4";
const POSTER_SRC = "/img/hero-poster.jpg";

export default function Hero() {
  return (
    <section
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden -mt-[7.5rem]"
      aria-label="Hero-Bereich"
    >
      {/* Hintergrund: Auf Mobile statisches Bild/Gradient (datensparend), ab md Video */}
      <div
        className="absolute inset-0 z-0 md:hidden"
        style={{
          backgroundImage: POSTER_SRC
            ? `url(${POSTER_SRC})`
            : "linear-gradient(135deg, #27272a 0%, #18181b 100%)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 hidden h-full w-full object-cover md:block"
        poster={POSTER_SRC}
        aria-hidden
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>

      {/* Dunkles Overlay für Lesbarkeit */}
      <div
        className="absolute inset-0 z-[1] bg-black/40"
        aria-hidden
      />

      {/* Inhalt zentral */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 pt-[7.5rem] text-center">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-white drop-shadow-md sm:text-5xl md:text-6xl lg:text-7xl">
          HE immologis – Ihre Experten für Immobilien & Logistik in Hessen
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-white/95 drop-shadow sm:text-xl">
          Professionelle Vermittlung und effiziente Transportlösungen aus einer
          Hand.
        </p>

        {/* Zwei-Welten-Weiche: CTAs */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-6">
          <Link
            href="/immobilien"
            className="inline-flex items-center justify-center rounded-lg border-2 border-white bg-white/10 px-8 py-4 text-base font-medium text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-zinc-900 sm:text-lg"
          >
            Bereich Immobilien
          </Link>
          <Link
            href="/logistik"
            className="inline-flex items-center justify-center rounded-lg bg-amber-500 px-8 py-4 text-base font-medium text-zinc-900 transition-colors hover:bg-amber-400 sm:text-lg"
          >
            Bereich Logistik
          </Link>
        </div>
      </div>

      {/* Scroll-Down-Hinweis am unteren Rand */}
      <div className="relative z-10 flex flex-col items-center pb-8">
        <span className="mb-2 text-xs uppercase tracking-widest text-white/70">
          Mehr entdecken
        </span>
        <ChevronDown
          className="h-8 w-8 animate-bounce text-white/80"
          aria-hidden
        />
      </div>
    </section>
  );
}
