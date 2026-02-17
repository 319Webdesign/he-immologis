"use client";

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
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 pb-24 pt-[10rem] text-center sm:pb-32 sm:pt-[11rem]">
        <h1 className="font-sans text-4xl font-semibold tracking-tight text-white drop-shadow-md sm:text-5xl md:text-6xl lg:text-7xl">
          Neues kann endlich beginnen.
          <br />
          Verkaufen. Finden. Möglich machen.
        </h1>
        <p className="mt-6 text-lg font-normal tracking-wide text-white/90 sm:text-xl md:mt-8">
          Weinheim. Bergstraße.
        </p>
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
