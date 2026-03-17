"use client";

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

const CITIES = [
  "Weinheim",
  "Heppenheim",
  "Bensheim",
  "Viernheim",
  "Lorsch",
  "Ladenburg",
  "Schriesheim",
  "Dossenheim",
  "Lampertheim",
  "Mannheim",
];

interface LocalPresenceProps {
  dict: LocalPresenceDict;
}

export default function LocalPresence({ dict }: LocalPresenceProps) {
  const { heading, subline, regionTitle, cards } = dict;

  return (
    <section
      className="w-full max-w-full overflow-x-hidden bg-white pt-10 pb-8 sm:pt-14 sm:pb-10 lg:pt-20 lg:pb-12"
      aria-labelledby="kompetenz-heading"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Titel, Holger-Porträt (rund) & Untertitel – Text exakt mittig, Bild rechts */}
        <header className="relative mx-auto w-full max-w-4xl">
          <div className="w-full text-center sm:pr-[7rem] lg:pr-[10rem]">
            <h2
              id="kompetenz-heading"
              className="font-sans text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
              dangerouslySetInnerHTML={{ __html: heading }}
            />
            <p className="mt-4 text-lg text-slate-600">
              {subline}
            </p>
          </div>
          <div className="mt-6 flex justify-center sm:absolute sm:right-0 sm:top-1/2 sm:mt-0 sm:-translate-y-1/2">
            <img
              src="/img/holger.jpeg"
              alt="Holger Eberhard – Ihr Ansprechpartner für Immobilien in Weinheim und an der Bergstraße"
              className="h-28 w-28 rounded-xl object-cover ring-2 ring-slate-200 sm:h-36 sm:w-36 lg:h-40 lg:w-40"
              width={160}
              height={160}
            />
          </div>
        </header>

        {/* Kompetenz-Karten Grid: auf Handy zentriert, ab sm Grid */}
        <div className="mt-12 flex flex-col items-center gap-6 sm:mt-16 sm:grid sm:grid-cols-2 sm:items-stretch lg:grid-cols-4 lg:gap-8">
          {cards.map((card, index) => {
            const Icon = ICONS[index];
            const { title, description, smart } = card;
            const isLogisticsCard = Boolean(smart);
            return (
              <article
                key={title}
                className={`flex w-full max-w-sm flex-col rounded-xl border border-slate-200 p-6 transition-shadow hover:shadow-md sm:max-w-none lg:p-8 ${
                  isLogisticsCard ? "lg:min-w-[20rem]" : ""
                } ${isLogisticsCard ? "" : "bg-slate-50/50"}`}
                style={isLogisticsCard ? { backgroundColor: "#AEADA8" } : undefined}
              >
                <div className="flex h-10 w-10 items-center justify-center">
                  <Icon className="h-7 w-7 text-[#F37A5A]" aria-hidden />
                </div>
                <h3 className="mt-4 font-sans text-lg font-semibold text-slate-900">
                  {title}
                </h3>
                {smart ? (
                  <ul className="mt-2 flex-1 space-y-1.5 text-sm leading-relaxed text-slate-600">
                    {smart.map(({ letter, label }) => (
                      <li key={letter}>
                        <span className="font-semibold text-slate-800">{letter}</span> – {label}
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
          style={{ backgroundColor: "#8AAFA3" }}
        >
          <h3 className="text-center font-sans text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            {regionTitle}
          </h3>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {CITIES.map((city) => (
              <span
                key={city}
                className="shrink-0 rounded-full border border-white/30 bg-white/10 px-2.5 py-1.5 text-xs font-medium text-white sm:text-sm"
              >
                {city}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
