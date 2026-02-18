"use client";

import { useState } from "react";
import { Home, Search, Truck, Key } from "lucide-react";

const CARDS = [
  {
    icon: Home,
    title: "Immobilien Verkauf",
    description: "Fokus auf lokale Marktwerte und faire Bewertung – wir verkaufen Ihre Immobilie.",
  },
  {
    icon: Search,
    title: "Kauf & Suche",
    description: "Unterstützung für Suchende in der Region. Wir finden die passende Immobilie für Sie.",
  },
  {
    icon: Key,
    title: "Vermietung",
    description: "Professionelle Mietersuche und vollständige Abwicklung für Eigentümer und Mieter.",
  },
  {
    icon: Truck,
    title: "Logistikberatung",
    description: "Zuverlässige Abwicklung und Beratung. Transportlösungen aus einer Hand.",
    smart: [
      { letter: "S", label: "Schulung" },
      { letter: "M", label: "M & A" },
      { letter: "A", label: "Aufbau von Entscheidernetzwerken" },
      { letter: "R", label: "Regionale Interim-Lösungen" },
      { letter: "T", label: "Transportnetzwerkstrategien" },
    ],
  },
] as const;

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

export default function LocalPresence() {
  const [openCity, setOpenCity] = useState<string | null>(null);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  const handleImageError = (cityName: string) => {
    setFailedImages((prev) => new Set(prev).add(cityName));
  };

  return (
    <section
      className="bg-white py-16 sm:py-20 lg:py-24"
      aria-labelledby="kompetenz-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Titel & Untertitel */}
        <header className="mx-auto max-w-3xl text-center">
          <h2
            id="kompetenz-heading"
            className="font-sans text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
          >
            Verkaufen. Kaufen. Mieten. Services. Suchen.
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Ihr neues Zuhause in Weinheim und an der Bergstraße beginnt hier.
          </p>
        </header>

        {/* Kompetenz-Karten Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {CARDS.map((card) => {
            const { icon: Icon, title, description } = card;
            const smart = "smart" in card ? card.smart : null;
            return (
              <article
                key={title}
                className="flex flex-col rounded-xl border border-slate-200 bg-slate-50/50 p-6 transition-shadow hover:shadow-md lg:p-8"
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
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                    {description}
                  </p>
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
            Zuhause an der Bergstraße
          </h3>
          <div className="mt-6 flex flex-nowrap justify-center gap-2">
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
