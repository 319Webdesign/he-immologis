import type { Metadata } from "next";
import logisticsData from "@/data/logistics.json";
import type { LogisticsService } from "@/types";
import {
  Truck,
  Globe,
  Warehouse,
  PackageCheck,
  Home,
  type LucideIcon,
} from "lucide-react";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Logistik & Transport Weinheim",
  description:
    "Logistikunternehmen Bergstraße – nationale und internationale Spedition, Lager, Express-Lieferung und Umzugslogistik aus Weinheim. Effizient und zuverlässig.",
  keywords: [
    "Logistikunternehmen Bergstrasse",
    "Spedition Weinheim",
    "Transport Weinheim",
    "Lager Weinheim",
    "HE immologis",
  ],
};

const iconMap: Record<string, LucideIcon> = {
  truck: Truck,
  globe: Globe,
  warehouse: Warehouse,
  "package-check": PackageCheck,
  home: Home,
};

const services = logisticsData as LogisticsService[];

export default function LogistikPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-zinc-900 px-4 py-16 text-white sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="font-sans text-4xl font-semibold tracking-tight sm:text-5xl">
            Logistik & Transport
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-300">
            Effizient. Dynamisch. Zuverlässig. Ihr Logistikpartner an der
            Bergstraße – von Weinheim aus für die Region und darüber hinaus.
          </p>
        </div>
      </section>

      {/* Leistungsübersicht */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-sans text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
          Unsere Leistungen
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-zinc-600">
          Von der nationalen Spedition bis zur internationalen Logistik – wir
          bieten maßgeschneiderte Lösungen für Ihr Unternehmen.
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const IconComponent =
              iconMap[service["icon-name"]] || Truck;
            return (
              <div
                key={service.id}
                className="group rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm transition-all duration-300 hover:border-amber-200 hover:shadow-md"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-amber-100 text-amber-800 transition-colors group-hover:bg-amber-200">
                  <IconComponent className="h-7 w-7" />
                </div>
                <h3 className="font-sans text-xl font-semibold text-zinc-900">
                  {service.titel}
                </h3>
                <p className="mt-3 text-zinc-600">{service.beschreibung}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Kontakt-Sektion */}
      <Contact
        variant="dark"
        title="Logistik-Anfrage"
        subtitle="Benötigen Sie eine maßgeschneiderte Transport- oder Logistiklösung? Kontaktieren Sie uns – wir beraten Sie gerne und erstellen ein individuelles Angebot."
      />
    </>
  );
}
