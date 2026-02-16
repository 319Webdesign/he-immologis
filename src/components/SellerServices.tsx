import Link from "next/link";
import {
  BarChart3,
  Camera,
  FileText,
  UserCheck,
  Gavel,
  Handshake,
  type LucideIcon,
} from "lucide-react";

const BRAND_BLUE = "#3d6d99";
const STEELBLUE = "#4682B4";

const SERVICES: {
  title: string;
  text: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Professionelle Wertermittlung",
    text: "Fundierte Marktanalyse für den optimalen Verkaufspreis.",
    icon: BarChart3,
  },
  {
    title: "High-End Immobilienfotos",
    text: "Visuelles Marketing durch Profi-Aufnahmen und Drohnenbilder.",
    icon: Camera,
  },
  {
    title: "Energieausweis-Service",
    text: "Wir kümmern uns um alle notwendigen gesetzlichen Unterlagen.",
    icon: FileText,
  },
  {
    title: "Qualifizierte Interessenten-Prüfung",
    text: "Besichtigungen nur mit geprüften Käufern und Bonitätscheck.",
    icon: UserCheck,
  },
  {
    title: "Notar- & Vertragsmanagement",
    text: "Komplette Vorbereitung und Begleitung zum Beurkundungstermin.",
    icon: Gavel,
  },
  {
    title: "After-Sales-Betreuung",
    text: "Auch nach dem Verkauf bleiben wir Ihr Ansprechpartner für die Übergabe.",
    icon: Handshake,
  },
];

export default function SellerServices() {
  return (
    <section
      className="border-t border-slate-200/80 bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      aria-labelledby="seller-services-heading"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="seller-services-heading"
          className="text-center font-sans text-2xl font-semibold tracking-tight text-slate-800 sm:text-3xl"
        >
          Mehr als nur Vermittlung – Unser Full-Service-Versprechen
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
          Unser Premium-Service für Verkäufer
        </p>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="flex min-h-[200px] flex-col rounded-xl p-6 text-white shadow-md transition-shadow duration-200 hover:shadow-lg"
                style={{ backgroundColor: STEELBLUE }}
              >
                <div
                  className="mb-4 flex h-10 w-10 shrink-0 items-center justify-center text-white"
                >
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <h3 className="font-sans text-lg font-semibold text-white">
                  {service.title}
                </h3>
                <p className="mt-2 min-h-[2.75rem] flex-1 text-sm leading-relaxed text-white/90">
                  {service.text}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/logistikberatung"
            className="inline-flex items-center justify-center rounded-lg px-6 py-3.5 text-base font-semibold text-white transition-colors hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#3d6d99]/40 focus:ring-offset-2"
            style={{ backgroundColor: BRAND_BLUE }}
          >
            Zu meinen Services
          </Link>
        </div>
      </div>
    </section>
  );
}
