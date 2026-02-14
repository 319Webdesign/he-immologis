import { Home, Search, Truck, Key } from "lucide-react";

const CARDS = [
  {
    icon: Home,
    title: "Immobilien Verkauf",
    description: "Fokus auf lokale Marktwerte und faire Bewertung – wir verkaufen Ihre Immobilie professionell an der Bergstraße.",
  },
  {
    icon: Search,
    title: "Suche & Kauf",
    description: "Unterstützung für Suchende in der Region. Wir finden die passende Immobilie für Sie.",
  },
  {
    icon: Truck,
    title: "Logistik & Transport",
    description: "Zuverlässige Abwicklung und Beratung. Transportlösungen aus einer Hand.",
  },
  {
    icon: Key,
    title: "Vermietung",
    description: "Professionelle Mietersuche und vollständige Abwicklung für Eigentümer und Mieter.",
  },
] as const;

const CITIES = [
  "Weinheim",
  "Heppenheim",
  "Bensheim",
  "Viernheim",
  "Lorsch",
  "Ladenburg",
];

export default function LocalPresence() {
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
            Verkaufen. Kaufen. Mieten. Services
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Kurze Wege, lokale Marktkenntnis und individuelle Betreuung für
            Immobilien und Logistik.
          </p>
        </header>

        {/* Kompetenz-Karten Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {CARDS.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="flex flex-col rounded-xl border border-slate-200 bg-slate-50/50 p-6 transition-shadow hover:shadow-md lg:p-8"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-800 text-white">
                <Icon className="h-6 w-6" aria-hidden />
              </div>
              <h3 className="mt-4 font-sans text-lg font-semibold text-slate-900">
                {title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                {description}
              </p>
            </article>
          ))}
        </div>

        {/* Unsere Region */}
        <div className="mt-16 rounded-2xl bg-slate-800 px-6 py-10 sm:mt-20 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
          <h3 className="font-sans text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Zuhause an der Bergstraße
          </h3>
          <div className="mt-6 flex flex-wrap gap-3">
            {CITIES.map((city) => (
              <span
                key={city}
                className="rounded-full border border-slate-600 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-200"
              >
                {city}
              </span>
            ))}
          </div>
        </div>

        {/* Vertrauens-Element */}
        <div className="mx-auto mt-12 max-w-3xl text-center sm:mt-16">
          <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
            Als inhabergeführtes Unternehmen mit Sitz in Weinheim kennen wir den
            lokalen Markt und die Menschen hier persönlich. Wir sind kein
            anonymer Großkonzern, sondern Ihr Partner auf Augenhöhe.
          </p>
        </div>
      </div>
    </section>
  );
}
