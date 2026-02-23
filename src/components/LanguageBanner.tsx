"use client";

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
      {/* Laufband von rechts nach links; Text vertikal nach unten versetzt, nicht an oberer Kante */}
      <div className="flex min-h-[4.5rem] items-center px-2 pt-4 pb-2 md:min-h-[5rem] md:px-4 md:pt-5 md:pb-2.5">
        <div className="flex w-max animate-marquee shrink-0 items-center pt-3 md:pt-4">
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
  );
}
