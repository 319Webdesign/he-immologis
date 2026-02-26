"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const LOGO_PLACEHOLDER = "/img/Logo.svg";

function isValidImageUrl(src: string | null | undefined): boolean {
  if (!src || typeof src !== "string") return false;
  const s = src.trim();
  return s.startsWith("http") || s.startsWith("/");
}

interface PropertyImageSliderProps {
  images: string[];
  alt: string;
  /** Platzhalter: Logo + "Bild folgt" wenn keine echten Bilder */
  usePlaceholder?: boolean;
}

export function PropertyImageSlider({
  images,
  alt,
  usePlaceholder = true,
}: PropertyImageSliderProps) {
  const validImages = images.filter(isValidImageUrl);
  const hasRealImages = validImages.length > 0;
  const showPlaceholder = !hasRealImages && usePlaceholder;

  const [currentIndex, setCurrentIndex] = useState(0);
  const displayImages = hasRealImages ? validImages : [];

  useEffect(() => {
    setCurrentIndex(0);
  }, [images]);

  const goNext = () => {
    setCurrentIndex((i) => (i + 1) % displayImages.length);
  };

  const goPrev = () => {
    setCurrentIndex((i) => (i - 1 + displayImages.length) % displayImages.length);
  };

  if (showPlaceholder) {
    return (
      <div className="relative w-full overflow-hidden rounded-2xl bg-zinc-100">
        <div className="relative aspect-[16/10] w-full">
          <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-b from-zinc-50 to-zinc-100 px-6">
            <Image
              src={LOGO_PLACEHOLDER}
              alt="HE immologis"
              width={180}
              height={60}
              className="mb-4 opacity-80"
            />
            <p className="text-sm font-medium text-zinc-500">Bild folgt</p>
          </div>
        </div>
      </div>
    );
  }

  const currentSrc = displayImages[currentIndex];
  const isExternalUrl = currentSrc.startsWith("http");

  return (
    <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-zinc-200 mx-auto">
      {/* Hauptbild mit Lazy Loading (nur erstes Bild mit priority) */}
      <div className="relative aspect-[16/10] w-full">
        <Image
          src={currentSrc}
          alt={hasRealImages ? `${alt} – Bild ${currentIndex + 1}` : alt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 960px"
          priority={currentIndex === 0}
          loading={currentIndex === 0 ? undefined : "lazy"}
          unoptimized={isExternalUrl}
        />
        {displayImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-zinc-800 shadow-lg transition hover:bg-white"
              aria-label="Vorheriges Bild"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={goNext}
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-zinc-800 shadow-lg transition hover:bg-white"
              aria-label="Nächstes Bild"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Thumbnails bei mehreren Bildern */}
      {displayImages.length > 1 && (
        <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
          {displayImages.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrentIndex(i)}
              className={`relative h-16 w-20 shrink-0 overflow-hidden rounded-lg transition focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 ${
                i === currentIndex ? "ring-2 ring-zinc-900 ring-offset-2" : "opacity-70 hover:opacity-100"
              }`}
              aria-label={`Bild ${i + 1} anzeigen`}
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover"
                sizes="80px"
                loading="lazy"
                unoptimized={src.startsWith("http")}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
