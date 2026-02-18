import type { Metadata } from "next";
import { Suspense } from "react";
import { ChevronDown } from "lucide-react";
import propertiesData from "@/data/properties.json";
import type { Property } from "@/types";
import PropertyCard from "./PropertyCard";
import PropertyFilters from "./PropertyFilters";
import Kauftipps from "./Kauftipps";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Immobilien Weinheim",
  description:
    "Exklusive Immobilien in Weinheim und an der Bergstraße. Wohnungen, Häuser und Gewerbeimmobilien – seriös und hochwertig vermittelt von HE immologis.",
  keywords: [
    "Immobilien Weinheim",
    "Immobilien Bergstraße",
    "Wohnung Weinheim",
    "Haus kaufen Weinheim",
    "HE immologis",
  ],
};

const allProperties = propertiesData as Property[];

interface PageProps {
  searchParams: Promise<{ status?: string; ort?: string }>;
}

export default async function KaufenPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const statusFilter = params.status ?? "alle";
  const ortFilter = params.ort ?? "alle";

  const properties = allProperties.filter((p) => {
    if (statusFilter !== "alle" && p.status !== statusFilter) return false;
    if (ortFilter !== "alle" && p.ort !== ortFilter) return false;
    return true;
  });
  return (
    <>
      <section className="relative flex min-h-[70vh] flex-col bg-white px-4 pt-16 pb-24 sm:px-6 sm:pt-24 sm:pb-28 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-1 flex-col items-center justify-center text-center">
          <h1 className="font-sans text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
            Kaufen in Weinheim und Umgebung.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600">
            Gezielt ausgewählt. Klar geprüft. Sicher umgesetzt.
          </p>
        </div>
        <a
          href="#immobilien"
          className="absolute bottom-6 left-0 right-0 flex flex-col items-center gap-1 text-zinc-600 transition-colors hover:text-zinc-900 sm:bottom-8"
          aria-label="Zu den Immobilien scrollen"
        >
          <span className="text-sm font-medium">Jetzt Immobilien ansehen</span>
          <ChevronDown className="h-7 w-7 animate-bounce text-zinc-500" aria-hidden />
        </a>
      </section>

      <section id="immobilien" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Suspense fallback={<div className="h-14 rounded-xl bg-zinc-100" />}>
          <PropertyFilters />
        </Suspense>
        {properties.length > 0 ? (
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <p className="mt-10 text-center text-zinc-500">
            Keine Immobilien entsprechen den gewählten Filtern.
          </p>
        )}
      </section>

      <Kauftipps />

      <Contact
        title="Immobilien-Anfrage"
        subtitle="Interessieren Sie sich für eine unserer Immobilien oder möchten Sie Ihre Immobilie verkaufen? Wir beraten Sie gerne und unverbindlich."
        accentColor="steelblue"
      />
    </>
  );
}
