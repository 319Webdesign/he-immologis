"use client";

import { useState } from "react";
import { Home, Search, Truck, Key } from "lucide-react";

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

const CITIES: { name: string; image?: string; aspect?: "16:9" | "9:16" }[] = [
  { name: "Weinheim", image: "/img/orte/weinheim.jpeg" },
  { name: "Heppenheim", image: "/img/orte/heppenheim.jpeg" },
  { name: "Bensheim", image: "/img/orte/bensheim.jpeg" },
  { name: "Viernheim", image: "/img/orte/viernheim.jpeg" },
  { name: "Lorsch", image: "/img/orte/lorsch.jpeg" },
  { name: "Ladenburg", image: "/img/orte/ladenburg.jpeg", aspect: "9:16" },
  { name: "Schriesheim", image: "/img/orte/Schriesheim.jpeg" },
  { name: "Dossenheim", image: "/img/orte/dossenheim.jpeg" },
  { name: "Lampertheim", image: "/img/orte/lampertheim.jpeg" },
  { name: "Mannheim", image: "/img/orte/mannheim.jpeg" },
];

interface LocalPresenceProps {
  dict: LocalPresenceDict;
}

export default function LocalPresence({ dict }: LocalPresenceProps) {
  const { heading, subline, regionTitle, cards } = dict;
  const [openCity, setOpenCity] = useState<string | null>(null);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  const handleImageError = (cityName: string) => {
    setFailedImages((prev) => new Set(prev).add(cityName));
  };

  return (
    <section
      className="w-full max-w-full overflow-x-hidden bg-white py-16 sm:py-20 lg:py-24"
      aria-labelledby="kompetenz-heading"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Titel & Untertitel */}
        <header className="mx-auto max-w-3xl text-center">
          <h2
            id="kompetenz-heading"
            className="font-sans text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
            dangerouslySetInnerHTML={{ __html: heading }}
          />
          <p className="mt-4 text-lg text-slate-600">
            {subline}
          </p>
        </header>

        {/* Kompetenz-Karten Grid: auf Handy zentriert, ab sm Grid */}
        <div className="mt-12 flex flex-col items-center gap-6 sm:mt-16 sm:grid sm:grid-cols-2 sm:items-stretch lg:grid-cols-4 lg:gap-8">
          {cards.map((card, index) => {
            const Icon = ICONS[index];
            const { title, description, smart } = card;
            return (
              <article
                key={title}
                className={`flex w-full max-w-sm flex-col rounded-xl border border-slate-200 p-6 transition-shadow hover:shadow-md sm:max-w-none lg:p-8 ${smart ? "bg-slate-200/90 lg:min-w-[20rem]" : "bg-slate-50/50"}`}
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-lg text-white"
                  style={{ backgroundColor: "#4682B4" }}
                >
                  <Icon className="h-6 w-6" aria-hidden />
                </div>
                <h3 className="mt-4 font-sans text-lg font-semibold text-slate-900">
                  {title}
                </h3>
                {smart ? (
                  <ul className="mt-2 flex-1 space-y-1.5 text-sm leading-relaxed text-slate-600">
                    {smart.map(({ letter, label }) => (
                      <li key={letter}>
                        <strong className="font-semibold text-slate-800">{letter}</strong> – {label}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p
                    className="mt-2 flex-1 text-sm leading-relaxed text-slate-600"
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                )}
              </article>
            );
          })}
        </div>

        {/* Unsere Region */}
        <div
          className="mt-16 rounded-2xl px-4 py-10 sm:mt-20 sm:px-5 sm:py-12 lg:px-6 lg:py-14"
          style={{ backgroundColor: "#4682B4" }}
        >
          <h3 className="text-center font-sans text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            {regionTitle}
          </h3>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {CITIES.map((city) => (
              <span
                key={city.name}
                role={city.image ? "button" : undefined}
                tabIndex={city.image ? 0 : undefined}
                onClick={() => city.image && setOpenCity((c) => (c === city.name ? null : city.name))}
                onKeyDown={(e) => {
                  if (city.image && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    setOpenCity((c) => (c === city.name ? null : city.name));
                  }
                }}
                className="group/city relative shrink-0 cursor-pointer rounded-full border border-white/30 bg-white/10 px-2.5 py-1.5 text-xs font-medium text-white sm:text-sm touch-manipulation"
              >
                {city.name}
                {city.image && !failedImages.has(city.name) && (
                  <span
                    className={`pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 rounded-lg border-2 shadow-xl ${openCity === city.name ? "block" : "hidden group-hover/city:block"}`}
                    style={{
                      minWidth: city.aspect === "9:16" ? 180 : 320,
                      borderColor: "#4682B4",
                    }}
                  >
                    <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 -rotate-45 border-l border-t bg-white" style={{ borderColor: "#4682B4" }} />
                    <img
                      src={city.image}
                      alt={city.name}
                      className="rounded-md object-cover"
                      style={
                        city.aspect === "9:16"
                          ? { width: 180, height: 320, minWidth: 180, minHeight: 320 }
                          : { width: 320, height: 180, minWidth: 320, minHeight: 180 }
                      }
                      onError={() => handleImageError(city.name)}
                    />
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
