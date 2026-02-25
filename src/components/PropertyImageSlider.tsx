"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const PLACEHOLDER_SRC = "/img/immobilie-placeholder.png";

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
  const displayImages = hasRealImages ? validImages : [PLACEHOLDER_SRC];
  const currentSrc = displayImages[currentIndex];

  useEffect(() => {
    setCurrentIndex(0);
  }, [images]);

  const goNext = () => {
    setCurrentIndex((i) => (i + 1) % displayImages.length);
  };

  const goPrev = () => {
    setCurrentIndex((i) => (i - 1 + displayImages.length) % displayImages.length);
  };

  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-zinc-200">
      <div className="relative aspect-[16/10] w-full">
        {showPlaceholder ? (
          <div className="flex h-full w-full flex-col items-center justify-center bg-zinc-100 px-6 text-zinc-500">
            <div className="mb-4 text-2xl font-semibold tracking-tight text-zinc-700">
              HE immologis
            </div>
            <p className="text-sm">Bild folgt</p>
          </div>
        ) : (
          <>
            <Image
              src={currentSrc.startsWith("http") || currentSrc.startsWith("/") ? currentSrc : PLACEHOLDER_SRC}
              alt={hasRealImages ? `${alt} – Bild ${currentIndex + 1}` : alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 960px"
              priority
              unoptimized={currentSrc.startsWith("http")}
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
                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                  {displayImages.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setCurrentIndex(i)}
                      className={`h-2 rounded-full transition ${
                        i === currentIndex
                          ? "w-6 bg-white"
                          : "w-2 bg-white/60 hover:bg-white/80"
                      }`}
                      aria-label={`Bild ${i + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
