import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Maximize2, BedDouble } from "lucide-react";
import propertiesData from "@/data/properties.json";
import type { Property } from "@/types";

const properties = propertiesData as Property[];

interface PageProps {
  params: Promise<{ id: string }>;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(price);
}

export async function generateStaticParams() {
  return properties.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const property = properties.find((p) => p.id === id);
  if (!property) return { title: "Immobilie nicht gefunden" };
  return {
    title: property.titel,
    description: property.beschreibung.slice(0, 160),
  };
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const { id } = await params;
  const property = properties.find((p) => p.id === id);

  if (!property) notFound();

  const isExternalImage = (url: string) => url.startsWith("http");

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/immobilien"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-zinc-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Zurück zur Übersicht
        </Link>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Galerie */}
          <div className="space-y-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-200">
              {isExternalImage(property.vorschaubild) ? (
                <Image
                  src={property.vorschaubild}
                  alt={property.titel}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-zinc-400">
                  <Maximize2 className="h-24 w-24" />
                </div>
              )}
            </div>
            {property.galerie.length > 1 && (
              <div className="grid grid-cols-3 gap-2">
                {property.galerie.slice(0, 3).map((img, i) => (
                  <div
                    key={i}
                    className="relative aspect-video overflow-hidden rounded-lg bg-zinc-200"
                  >
                    {isExternalImage(img) ? (
                      <Image
                        src={img}
                        alt={`${property.titel} ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="150px"
                      />
                    ) : null}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <span
              className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                property.status === "verfügbar"
                  ? "bg-green-100 text-green-800"
                  : property.status === "reserviert"
                    ? "bg-amber-100 text-amber-800"
                    : "bg-zinc-100 text-zinc-600"
              }`}
            >
              {property.status}
            </span>
            <h1 className="mt-4 font-sans text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
              {property.titel}
            </h1>
            <p className="mt-6 text-2xl font-semibold text-amber-800">
              {formatPrice(property.preis)}
            </p>
            <div className="mt-6 flex flex-wrap gap-6 text-zinc-600">
              <span className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                {property.ort}
              </span>
              {property.zimmer > 0 && (
                <span className="flex items-center gap-2">
                  <BedDouble className="h-5 w-5" />
                  {property.zimmer} Zimmer
                </span>
              )}
              <span>{property.quadratmeter} m²</span>
            </div>
            <p className="mt-8 text-lg leading-relaxed text-zinc-600">
              {property.beschreibung}
            </p>
            <div className="mt-10">
              <a
                href="mailto:info@he-immologis.de?subject=Anfrage%20Immobilie"
                className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-8 py-3 font-medium text-white transition-colors hover:bg-zinc-800"
              >
                Anfrage senden
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
