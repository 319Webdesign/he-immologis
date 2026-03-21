"use client";

import { useState, useEffect } from "react";
import { Home, Search, Truck, Key, X } from "lucide-react";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    setIsMobile(mq.matches);
    const handler = () => setIsMobile(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isMobile;
}

const ICONS = [Home, Search, Key, Truck] as const;

export type LocalPresenceCard = {
  title: string;
  description: string;
  smart?: { letter: string; label: string }[];
};

export type LocalPresenceDict = {
  heading: string;
  subline: string;
  regionTitle: string;
  cards: LocalPresenceCard[];
};

const CITIES = [
  "Weinheim",
  "Hemsbach",
  "Mannheim",
  "Heidelberg",
  "Viernheim",
  "Heppenheim",
  "Bensheim",
  "Lorsch",
  "Ladenburg",
  "Lampertheim",
];

function getCityImagePath(city: string): string {
  const slug = city.toLowerCase().replace(/\s+/g, "-");
  const ext = city === "Hemsbach" ? "png" : "jpeg";
  return `/img/orte/${slug}.${ext}`;
}

/** Fallback-Bild, wenn Ortsbild fehlt (z. B. schriesheim.jpeg) */
const FALLBACK_ORT_IMG = "/img/holger.jpeg";

interface LocalPresenceProps {
  dict: LocalPresenceDict;
}

export default function LocalPresence({ dict }: LocalPresenceProps) {
  const { heading, subline, regionTitle, cards } = dict;
  const [mobileSelectedCity, setMobileSelectedCity] = useState<string | null>(null);
  const isMobile = useIsMobile();

  return (
    <section
      className="w-full max-w-full overflow-x-hidden bg-white pt-10 pb-8 sm:pt-14 sm:pb-10 lg:pt-20 lg:pb-12"
      aria-labelledby="kompetenz-heading"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Titel, Holger-Porträt & Untertitel – ab lg gleiches Grid wie Karten, Bild bündig mit Logistikberatung */}
        <header className="relative mx-auto w-full max-w-4xl lg:grid lg:max-w-full lg:grid-cols-4 lg:items-start lg:gap-8">
          <div className="w-full text-center sm:pr-[7rem] lg:col-span-3 lg:pr-0">
            <h2
              id="kompetenz-heading"
              className="font-sans text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
              dangerouslySetInnerHTML={{ __html: heading }}
            />
            <p
              className="mt-4 text-xl text-slate-600"
              dangerouslySetInnerHTML={{ __html: subline }}
            />
          </div>
          <div className="mt-6 flex justify-center sm:absolute sm:right-0 sm:bottom-0 sm:mt-0 lg:relative lg:right-auto lg:bottom-auto lg:col-span-1 lg:mt-0 lg:self-end lg:justify-center">
            <img
              src="/img/holger.jpeg"
              alt="Holger Eberhard – Ihr Ansprechpartner für Immobilien in Weinheim und an der Bergstraße"
              className="h-36 w-36 rounded-xl object-cover object-center ring-2 ring-slate-200 sm:h-44 sm:w-44 lg:h-48 lg:w-48"
              width={400}
              height={500}
            />
          </div>
        </header>

        {/* Karten und Region zentriert, gleiche Breite */}
        <div className="mt-8 flex flex-col items-center gap-6 sm:mt-10 sm:gap-6 lg:mt-8 lg:gap-8">
          <div className="flex w-full justify-center">
            <div className="flex w-full flex-col gap-6 lg:w-max lg:gap-8">
              <div
                className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 sm:items-stretch lg:grid-cols-4 lg:gap-8"
              >
                {/* Kompetenz-Karten */}
                {cards.map((card, index) => {
            const Icon = ICONS[index];
            const { title, description, smart } = card;
            const isLogisticsCard = Boolean(smart);
            return (
              <article
                key={title}
                className={`flex min-w-0 w-full flex-col rounded-xl border border-slate-200 p-6 transition-shadow hover:shadow-md lg:p-8 ${
                  isLogisticsCard ? "" : "bg-slate-50/50"
                }`}
                style={isLogisticsCard ? { backgroundColor: "#BFB8AF" } : undefined}
              >
                <div className="flex h-10 w-10 items-center justify-center">
                  <Icon className="h-7 w-7 text-[#F9423A]" aria-hidden />
                </div>
                <h3 className="mt-4 font-sans text-base font-semibold text-slate-900">
                  {title}
                </h3>
                {smart ? (
                  <ul className="mt-2 flex-1 space-y-1.5 break-words text-xs leading-relaxed text-slate-600">
                    {smart.map(({ letter, label }) => (
                      <li key={letter}>
                        <span className="font-semibold text-slate-600">{letter}</span> – {label}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p
                    className="mt-2 flex-1 text-xs leading-relaxed text-slate-600"
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                )}
              </article>
            );
          })}
              </div>
              {/* Unsere Region – gleiche Breite wie Karten, mittig */}
              <div
                className="w-full rounded-2xl px-4 py-10 sm:px-5 sm:py-12 lg:px-6 lg:py-14"
                style={{ backgroundColor: "#85b09a" }}
              >
            <h3 className="text-center font-sans text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              {regionTitle}
            </h3>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {CITIES.map((city) => (
                <span
                  key={city}
                  className="group relative shrink-0 cursor-pointer rounded-full border border-white/30 bg-white/10 px-2.5 py-1.5 text-xs font-medium text-white sm:cursor-default sm:text-sm"
                  role="button"
                  tabIndex={0}
                  onClick={() => isMobile && setMobileSelectedCity((prev) => (prev === city ? null : city))}
                  onKeyDown={(e) => {
                    if (isMobile && (e.key === "Enter" || e.key === " ")) {
                      e.preventDefault();
                      setMobileSelectedCity((prev) => (prev === city ? null : city));
                    }
                  }}
                >
                  {city}
                  {/* Desktop: Hover-Tooltip */}
                  <span className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 hidden w-48 -translate-x-1/2 overflow-hidden rounded-xl border border-white/20 shadow-xl sm:block sm:w-56 sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100">
                    <img
                      src={getCityImagePath(city)}
                      alt={`${city} – Immobilien in Weinheim und Rhein-Neckar, Ortsbild`}
                      className="aspect-video w-full object-cover"
                      width={224}
                      height={126}
                      onError={(e) => {
                        const el = e.currentTarget;
                        if (el.src !== FALLBACK_ORT_IMG) el.src = FALLBACK_ORT_IMG;
                      }}
                    />
                  </span>
                </span>
              ))}
            </div>
            {/* Mobile: Overlay beim Tippen */}
            {isMobile && mobileSelectedCity && (
              <div
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4"
                onClick={() => setMobileSelectedCity(null)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Escape" && setMobileSelectedCity(null)}
                aria-label="Bild schließen"
              >
                <div
                  className="relative max-h-[85vh] max-w-full overflow-hidden rounded-xl border-2 border-white/30 shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    className="absolute right-2 top-2 z-10 rounded-full bg-black/50 p-1.5 text-white transition-colors hover:bg-black/70"
                    onClick={() => setMobileSelectedCity(null)}
                    aria-label="Schließen"
                  >
                    <X className="h-5 w-5" />
                  </button>
                  <img
                    src={getCityImagePath(mobileSelectedCity)}
                    alt={`${mobileSelectedCity} – Immobilien in Weinheim und Rhein-Neckar, Ortsbild`}
                    className="max-h-[80vh] w-auto object-contain"
                    onError={(e) => {
                      const el = e.currentTarget;
                      if (el.src !== FALLBACK_ORT_IMG) el.src = FALLBACK_ORT_IMG;
                    }}
                  />
                  <p className="bg-white/20 px-4 py-2 text-center font-semibold text-white">
                    {mobileSelectedCity}
                  </p>
                </div>
              </div>
            )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
