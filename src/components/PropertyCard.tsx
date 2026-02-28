"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, BedDouble, Bath, LayoutGrid } from "lucide-react";
import type { Rental } from "@/types";

const PLACEHOLDER_IMG = "/img/immobilie-placeholder.png";

export type RentalCardLabels = {
  badgeLabel?: string;
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
  const cardRef = useRef<HTMLElement>(null);
  const [isInCenter, setIsInCenter] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInCenter(entry.isIntersecting),
      { rootMargin: "0px -15% 0px -15%", threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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

  const badgeLabel = cardLabels?.badgeLabel ?? "Zur Vermietung";
  const statusLabel =
    cardLabels && STATUS_MAP[property.status]
      ? cardLabels[STATUS_MAP[property.status]]
      : property.status;
  const netRentSuffix = cardLabels?.netRentSuffix ?? "Kalt";
  const roomsLabel = cardLabels?.roomsLabel ?? "Zimmer";
  const viewDetails = cardLabels?.viewDetails ?? "Details ansehen";
  const baseHref = lang ? `/${lang}/mieten` : "/mieten";
  const detailSlug = property.objektnr_extern || property.id;
  const detailHref = `${baseHref}/${encodeURIComponent(detailSlug)}`;

  const showGrundstueck =
    property.objekttyp === "Haus" && (property.grundstuecksflaeche ?? 0) > 0;

  return (
    <article
      ref={cardRef}
      className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:shadow-md"
      data-incenter={isInCenter}
    >
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
            className="absolute right-3 top-3 rounded px-3 py-1.5 text-sm font-medium text-white shadow-sm"
            style={{ backgroundColor: "#E30A17" }}
            aria-hidden
          >
            {badgeLabel}
          </span>
        </div>
      </Link>
      <div className="flex flex-col p-6 transition-colors duration-200 sm:group-hover:bg-[#4682b4] max-sm:group-data-[incenter=true]:bg-[#4682b4]">
        <h2 className="font-sans text-xl font-semibold text-zinc-900 sm:group-hover:text-white max-sm:group-data-[incenter=true]:text-white">
          <Link href={detailHref}>{property.titel}</Link>
        </h2>
        <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-zinc-600 sm:group-hover:text-white/90 max-sm:group-data-[incenter=true]:text-white/90">
          <span className="rounded bg-zinc-100 px-2 py-0.5 font-medium text-zinc-700 sm:group-hover:bg-white/20 sm:group-hover:text-white max-sm:group-data-[incenter=true]:bg-white/20 max-sm:group-data-[incenter=true]:text-white">
            {property.objekttyp}
          </span>
          {property.schlafzimmer != null && property.schlafzimmer > 0 && (
            <span className="flex items-center gap-1.5">
              <BedDouble className="h-4 w-4 shrink-0" />
              {property.schlafzimmer} Schlafzimmer
            </span>
          )}
          {property.badezimmer != null && property.badezimmer > 0 && (
            <span className="flex items-center gap-1.5">
              <Bath className="h-4 w-4 shrink-0" />
              {property.badezimmer} Badezimmer
            </span>
          )}
          {property.quadratmeter > 0 && (
            <span className="flex items-center gap-1.5">
              <LayoutGrid className="h-4 w-4 shrink-0" />
              {property.quadratmeter} m²
            </span>
          )}
          {showGrundstueck && (
            <span className="flex items-center gap-1.5">
              {property.grundstuecksflaeche} m² Grundstück
            </span>
          )}
        </div>
        {(property.kaltmiete > 0 || property.nebenkosten != null) && (
          <>
            <hr className="mt-3 border-t border-zinc-300 sm:group-hover:border-white/40 max-sm:group-data-[incenter=true]:border-white/40" />
            <div className="mt-3 flex items-center justify-between gap-4">
              <span className="flex items-center gap-1.5 text-sm text-zinc-600 sm:group-hover:text-white/90 max-sm:group-data-[incenter=true]:text-white/90">
                <MapPin className="h-4 w-4 shrink-0" />
                {[property.plz, property.ort].filter(Boolean).join(" ")}
              </span>
              <div className="text-right text-sm font-semibold text-zinc-900 sm:group-hover:text-white max-sm:group-data-[incenter=true]:text-white">
                {property.kaltmiete > 0 && (
                  <span>Kaltmiete {formatRent(property.kaltmiete, "")}</span>
                )}
                {property.kaltmiete > 0 && property.nebenkosten != null && property.nebenkosten > 0 && (
                  <span className="mx-2">·</span>
                )}
                {property.nebenkosten != null && property.nebenkosten > 0 && (
                  <span>Nebenkosten {formatRent(property.nebenkosten, "")}</span>
                )}
              </div>
            </div>
          </>
        )}
        <Link
          href={detailHref}
          className="mt-6 inline-flex w-full items-center justify-center rounded-lg border border-zinc-900 px-4 py-3 text-sm font-medium text-zinc-900 transition-colors sm:group-hover:border-white sm:group-hover:text-white max-sm:group-data-[incenter=true]:border-white max-sm:group-data-[incenter=true]:text-white hover:bg-white hover:text-[#4682b4] sm:w-auto"
        >
          {viewDetails}
        </Link>
      </div>
    </article>
  );
}
