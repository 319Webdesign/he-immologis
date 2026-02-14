import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, BedDouble, Square } from "lucide-react";
import rentalsData from "@/data/rentals.json";
import type { Rental } from "@/types";

const rentals = rentalsData as Rental[];
const PLACEHOLDER_IMG = "/img/immobilie-placeholder.png";

interface PageProps {
  params: Promise<{ id: string }>;
}

function formatRent(amount: number): string {
  return (
    new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(amount) + " Kaltmiete"
  );
}

export async function generateStaticParams() {
  return rentals.map((r) => ({ id: r.id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const rental = rentals.find((r) => r.id === id);
  if (!rental) return { title: "Mietobjekt nicht gefunden" };
  return {
    title: rental.titel,
    description: rental.beschreibung?.slice(0, 160) ?? rental.titel,
  };
}

export default async function MietenDetailPage({ params }: PageProps) {
  const { id } = await params;
  const rental = rentals.find((r) => r.id === id);

  if (!rental) notFound();

  const imageSrc =
    rental.vorschaubild?.startsWith("http") || rental.vorschaubild?.startsWith("/")
      ? rental.vorschaubild
      : PLACEHOLDER_IMG;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/mieten"
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-zinc-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Zurück zur Übersicht
      </Link>

      <div className="grid gap-12 lg:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-200">
          <Image
            src={imageSrc}
            alt={rental.titel}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>

        <div>
          <span className="inline-block rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
            {rental.status}
          </span>
          <h1 className="mt-4 font-sans text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
            {rental.titel}
          </h1>
          <p className="mt-6 text-2xl font-bold text-zinc-900">
            {formatRent(rental.kaltmiete)}
          </p>
          <div className="mt-6 flex flex-wrap gap-6 text-zinc-600">
            <span className="flex items-center gap-2">
              <Square className="h-5 w-5" />
              {rental.quadratmeter} m²
            </span>
            {rental.zimmer > 0 && (
              <span className="flex items-center gap-2">
                <BedDouble className="h-5 w-5" />
                {rental.zimmer} Zimmer
              </span>
            )}
            <span className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              {rental.ort}
            </span>
            <span>{rental.objekttyp}</span>
          </div>
          {rental.beschreibung && (
            <p className="mt-8 text-lg leading-relaxed text-zinc-600">
              {rental.beschreibung}
            </p>
          )}
          <a
            href="mailto:info@he-immologis.de?subject=Anfrage%20Mietobjekt"
            className="mt-10 inline-flex items-center justify-center rounded-lg bg-zinc-900 px-8 py-3 font-medium text-white transition-colors hover:bg-zinc-800"
          >
            Anfrage senden
          </a>
        </div>
      </div>
    </div>
  );
}
