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
      {/* Weißer Halbmond links (wie in der türkischen Flagge) */}
      <div
        className="absolute left-0 top-1/2 z-10 -translate-y-[20%] shrink-0"
        aria-hidden
      >
        <svg
          width="56"
          height="40"
          viewBox="0 0 56 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-11 md:h-10 md:w-14"
        >
          <defs>
            <mask id="crescent-mask">
              <circle cx="28" cy="20" r="18" fill="white" />
              <circle cx="36" cy="20" r="14" fill="black" />
            </mask>
          </defs>
          {/* Weiße Sichel (innen transparent) */}
          <circle cx="28" cy="20" r="18" fill="white" mask="url(#crescent-mask)" />
          {/* Kleiner weißer Stern wie auf der türkischen Flagge (in der Öffnung des Halbmonds) */}
          <polygon
            fill="white"
            points="46,16 47.2,18.4 49.8,18.8 47.9,20.6 48.4,23.2 46,22 43.6,23.2 44.1,20.6 42.2,18.8 44.8,18.4"
          />
        </svg>
      </div>

      {/* Laufband: Text endet am Halbmond (wird links abgeschnitten) */}
      <div className="flex min-h-[4.5rem] items-center px-2 pt-4 pb-2 pl-14 md:min-h-[5rem] md:px-4 md:pl-20 md:pt-5 md:pb-2.5">
        <div className="min-w-0 flex-1 overflow-x-hidden">
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
    </div>
  );
}
