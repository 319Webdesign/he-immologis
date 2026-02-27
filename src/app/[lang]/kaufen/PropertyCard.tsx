"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BedDouble, Bath, LayoutGrid, MapPin } from "lucide-react";
import type { Property } from "@/lib/onoffice";

const PLACEHOLDER_IMG = "/img/immobilie-placeholder.png";

interface PropertyCardProps {
  property: Property;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(price);
}

function isHaus(objektart?: string | null): boolean {
  const ot = (objektart ?? "").toLowerCase();
  return ot.includes("haus") || ot.includes("einfamilien") || ot.includes("mehrfamilien");
}

function capitalizeObjektart(s?: string | null): string {
  if (!s) return "";
  const t = s.trim().toLowerCase();
  return t ? t.charAt(0).toUpperCase() + t.slice(1) : s;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const pathname = usePathname();
  const lang = (pathname?.split("/")[1] ?? "de") as string;
  const firstImg = property.galerie?.[0];
  const imageSrc =
    firstImg?.startsWith("http") || firstImg?.startsWith("/")
      ? firstImg
      : PLACEHOLDER_IMG;

  const price = property.kaufpreis ?? property.kaltmiete;
  const priceLabel =
    property.kaufpreis != null ? "" : property.kaltmiete != null ? "Kaltmiete " : "";
  const showGrundstueck = isHaus(property.objektart) && (property.grundstuecksflaeche ?? 0) > 0;

  return (
    <Link
      href={`/${lang}/kaufen/${encodeURIComponent(property.objektnr_extern || String(property.id))}`}
      className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-200">
        <Image
          src={imageSrc}
          alt={property.titel || "Immobilie"}
          fill
          className="object-contain transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <span
          className="absolute right-3 top-3 rounded px-3 py-1.5 text-sm font-medium text-white shadow-sm"
          style={{ backgroundColor: "#E30A17" }}
          aria-hidden
        >
          Zum Verkauf
        </span>
      </div>
      <div className="p-6">
        <h2 className="font-sans text-xl font-semibold text-zinc-900 group-hover:text-[#E30A17]">
          {property.titel || "Ohne Titel"}
        </h2>
        <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-zinc-600">
          {property.objektart ? (
            <span className="rounded bg-zinc-100 px-2 py-0.5 font-medium text-zinc-700">
              {capitalizeObjektart(property.objektart)}
            </span>
          ) : null}
          {property.anzahl_schlafzimmer != null && property.anzahl_schlafzimmer > 0 && (
            <span className="flex items-center gap-1.5">
              <BedDouble className="h-4 w-4 shrink-0" />
              {property.anzahl_schlafzimmer} Schlafzimmer
            </span>
          )}
          {property.anzahl_badezimmer != null && property.anzahl_badezimmer > 0 && (
            <span className="flex items-center gap-1.5">
              <Bath className="h-4 w-4 shrink-0" />
              {property.anzahl_badezimmer} Badezimmer
            </span>
          )}
          {property.wohnflaeche != null && property.wohnflaeche > 0 && (
            <span className="flex items-center gap-1.5">
              <LayoutGrid className="h-4 w-4 shrink-0" />
              {property.wohnflaeche} m²
            </span>
          )}
          {showGrundstueck && (
            <span className="flex items-center gap-1.5">
              {property.grundstuecksflaeche} m² Grundstück
            </span>
          )}
        </div>
        {(price != null && price > 0) && (
          <>
            <hr className="mt-3 border-t border-zinc-300" />
            <div className="mt-3 flex items-center justify-between gap-4">
              <span className="flex items-center gap-1.5 text-sm text-zinc-600">
                <MapPin className="h-4 w-4 shrink-0" />
                {[property.plz, property.ort].filter(Boolean).join(" ")}
              </span>
              <p className="text-lg font-semibold text-zinc-900">
                {priceLabel}
                {formatPrice(price)}
              </p>
            </div>
          </>
        )}
      </div>
    </Link>
  );
}
