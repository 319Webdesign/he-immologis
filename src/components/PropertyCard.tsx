"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, BedDouble, Square } from "lucide-react";
import type { Rental } from "@/types";

const PLACEHOLDER_IMG = "/img/immobilie-placeholder.png";

export type RentalCardLabels = {
  viewDetails: string;
  netRentSuffix: string;
  roomsLabel: string;
  statusNew: string;
  statusReserved: string;
  statusAvailable: string;
};

const STATUS_MAP: Record<string, keyof RentalCardLabels> = {
  Neu: "statusNew",
  Reserviert: "statusReserved",
  Verfügbar: "statusAvailable",
};

interface PropertyCardProps {
  property: Rental;
  lang?: string;
  cardLabels?: RentalCardLabels | null;
}

function formatRent(amount: number, suffix: string): string {
  return (
    new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(amount) +
    " " +
    suffix
  );
}

export default function PropertyCard({ property, lang = "de", cardLabels }: PropertyCardProps) {
  const imageSrc =
    property.vorschaubild?.startsWith("http") ||
    property.vorschaubild?.startsWith("/")
      ? property.vorschaubild
      : PLACEHOLDER_IMG;

  const statusStyles: Record<string, string> = {
    Neu: "bg-emerald-100 text-emerald-800",
    Reserviert: "bg-amber-100 text-amber-800",
    Verfügbar: "bg-zinc-100 text-zinc-600",
  };

  const statusLabel =
    cardLabels && STATUS_MAP[property.status]
      ? cardLabels[STATUS_MAP[property.status]]
      : property.status;
  const netRentSuffix = cardLabels?.netRentSuffix ?? "Kalt";
  const roomsLabel = cardLabels?.roomsLabel ?? "Zimmer";
  const viewDetails = cardLabels?.viewDetails ?? "Details ansehen";
  const baseHref = lang ? `/${lang}/mieten` : "/mieten";
  const detailHref = `${baseHref}/${property.id}`;

  return (
    <article className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:shadow-md">
      <Link href={detailHref} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-zinc-200">
          <Image
            src={imageSrc}
            alt={property.titel}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <span
            className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-medium ${
              statusStyles[property.status] ?? "bg-zinc-100 text-zinc-600"
            }`}
          >
            {statusLabel}
          </span>
        </div>
      </Link>
      <div className="flex flex-col p-6">
        <p className="text-xl font-bold text-zinc-900">
          {formatRent(property.kaltmiete, netRentSuffix)}
        </p>
        <h2 className="mt-2 font-sans text-lg font-semibold text-zinc-800 group-hover:text-amber-800">
          <Link href={detailHref}>{property.titel}</Link>
        </h2>
        <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-zinc-600">
          <span className="flex items-center gap-1.5">
            <Square className="h-4 w-4 shrink-0" strokeWidth={2} />
            {property.quadratmeter} m²
          </span>
          {property.zimmer > 0 && (
            <span className="flex items-center gap-1.5">
              <BedDouble className="h-4 w-4 shrink-0" />
              {property.zimmer} {roomsLabel}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4 shrink-0" />
            {property.ort}
          </span>
        </div>
        <Link
          href={detailHref}
          className="mt-6 inline-flex w-full items-center justify-center rounded-lg border border-zinc-900 px-4 py-3 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-900 hover:text-white sm:w-auto"
        >
          {viewDetails}
        </Link>
      </div>
    </article>
  );
}
