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

const CITIES: { name: string; image?: string }[] = [
  { name: "Weinheim", image: "/img/orte/weinheim.jpeg" },
  { name: "Heppenheim", image: "/img/orte/heppenheim.jpeg" },
  { name: "Bensheim" },
  { name: "Viernheim" },
  { name: "Lorsch" },
  { name: "Ladenburg" },
  { name: "Schriesheim" },
  { name: "Dossenheim" },
  { name: "Lampertheim" },
  { name: "Mannheim" },
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
              <div
                className="flex h-12 w-12 items-center justify-center rounded-lg text-white"
                style={{ backgroundColor: "#4682B4" }}
              >
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
                className="group/city relative shrink-0 rounded-full border border-white/30 bg-white/10 px-2.5 py-1.5 text-xs font-medium text-white sm:text-sm"
              >
                {city.name}
                {city.image && (
                  <span
                    className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 hidden -translate-x-1/2 rounded-lg border-2 shadow-xl group-hover/city:block"
                    style={{ minWidth: 380, borderColor: "#4682B4" }}
                  >
                    <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 -rotate-45 border-l border-t bg-white" style={{ borderColor: "#4682B4" }} />
                    <img
                      src={city.image}
                      alt={city.name}
                      className="rounded-md object-cover"
                      style={{
                        width: 380,
                        height: 214,
                        minWidth: 380,
                        minHeight: 214,
                      }}
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
