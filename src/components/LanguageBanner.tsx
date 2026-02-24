"use client";

import Image from "next/image";
const TURKISH_FLAG = " 🇹🇷 ";

export default function LanguageBanner({
  lang,
  bannerText,
}: {
  lang: string;
  bannerText: string | undefined;
}) {
  if (lang !== "tr" || !bannerText) {
    return null;
  }

  // Sätze durch türkische Flagge trennen
  const displayText = bannerText.split(". ").join(`${TURKISH_FLAG}`) + TURKISH_FLAG;
  const stripContent = displayText;

  return (
    <div
      className="relative w-full overflow-x-hidden bg-[#E30A17]"
      role="marquee"
      aria-live="polite"
    >
      {/* Flagge und Text vertikal mittig */}
      <div className="relative mx-auto flex min-h-[4.5rem] items-center max-w-7xl pl-6 pr-4 sm:pl-8 sm:pr-6 lg:pl-10 lg:pr-8 md:min-h-[5rem]">
        {/* Flagge (Bild, vertikal mittig, rechter Rand abgeschnitten) */}
        <div
          className="absolute left-4 top-1/2 z-10 w-9 -translate-y-1/2 shrink-0 overflow-hidden sm:left-6 sm:w-10 lg:left-8 md:w-11"
          aria-hidden
        >
          <Image
            src="/img/flagge.png"
            alt=""
            width={56}
            height={40}
            className="h-8 w-auto object-left object-contain md:h-10"
            aria-hidden
          />
        </div>

        {/* Laufband: Text bis zur Flagge, vertikal mittig */}
        <div className="flex min-h-[4.5rem] flex-1 items-center py-4 px-2 pl-12 md:min-h-[5rem] md:py-5 md:pl-16">
          <div className="min-w-0 flex-1 overflow-x-hidden">
            <div className="flex w-max animate-marquee shrink-0 items-center">
              <span className="flex shrink-0 items-center whitespace-nowrap px-4 text-sm font-bold leading-[1.5] text-white md:text-base">
                {stripContent}
                {stripContent}
              </span>
              <span className="flex shrink-0 items-center whitespace-nowrap px-4 text-sm font-bold leading-[1.5] text-white md:text-base">
                {stripContent}
                {stripContent}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
