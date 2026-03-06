"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BedDouble, Bath, LayoutGrid, MapPin, DoorOpen } from "lucide-react";
import type { Property } from "@/lib/onoffice";
import { formatPrice } from "@/lib/format";

const PLACEHOLDER_IMG = "/img/immobilie-placeholder.png";

export type KaufenCardLabels = {
  forSale?: string;
  noTitle?: string;
  rooms?: string;
  bedrooms?: string;
  bathrooms?: string;
  livingArea?: string;
  plot?: string;
  coldRent?: string;
};

interface PropertyCardProps {
  property: Property;
  /** Zum Testen: Vorschau-Bild überschreiben (z.B. zweite Karte) */
  previewImageOverride?: string;
  /** Fallback-Übersetzungen für Singleselect-Werte (Feldname → { rawValue → label }) */
  permittedValues?: Record<string, Record<string, string>>;
  /** Übersetzte Label für Zimmer, Badezimmer, Grundstück etc. */
  cardLabels?: KaufenCardLabels | null;
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

function translateObjektart(
  objektart: string | null | undefined,
  permittedValues?: Record<string, Record<string, string>>
): string {
  if (!objektart?.trim()) return "";
  const raw = objektart.trim();
  const translated = permittedValues?.objektart?.[raw] ?? permittedValues?.objektart?.[raw.toLowerCase()];
  return translated ?? capitalizeObjektart(objektart);
}

export default function PropertyCard({
  property,
  previewImageOverride,
  permittedValues,
  cardLabels,
}: PropertyCardProps) {
  const pathname = usePathname();
  const lang = (pathname?.split("/")[1] ?? "de") as string;
  const cardRef = useRef<HTMLAnchorElement>(null);
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

  const firstImg = previewImageOverride ?? property.galerie?.[0];
  const imageSrc =
    firstImg?.startsWith("http") || firstImg?.startsWith("/")
      ? firstImg
      : PLACEHOLDER_IMG;

  const price = property.kaufpreis ?? property.kaltmiete;
  const priceLabel =
    property.kaufpreis != null ? "" : property.kaltmiete != null ? coldRentLabel : "";
  const showGrundstueck = isHaus(property.objektart) && (property.grundstuecksflaeche ?? 0) > 0;
  const l = cardLabels;
  const coldRentLabel = l?.coldRent ?? "Kaltmiete ";
  const forSale = l?.forSale ?? "Zum Verkauf";
  const noTitle = l?.noTitle ?? "Ohne Titel";
  const roomsLabel = l?.rooms ?? "Zimmer";
  const bedroomsLabel = l?.bedrooms ?? "Schlafzimmer";
  const bathroomsLabel = l?.bathrooms ?? "Badezimmer";
  const plotLabel = l?.plot ?? "Grundstück";

  return (
    <Link
      ref={cardRef}
      href={`/${lang}/kaufen/${encodeURIComponent(property.objektnr_extern || String(property.id))}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:shadow-lg"
      data-incenter={isInCenter}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-200">
        <Image
          src={imageSrc}
          alt={`Haus kaufen Weinheim - ${translateObjektart(property.objektart, permittedValues) || "Immobilie"} in ${property.ort?.trim() || "Bergstraße"} - HE-immologis`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <span
          className="absolute right-3 top-3 rounded px-3 py-1.5 text-sm font-medium text-white shadow-sm"
          style={{ backgroundColor: "#BCB88A" }}
          aria-hidden
        >
          {forSale}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6 transition-colors duration-200 sm:group-hover:bg-[#BCB88A] max-sm:group-data-[incenter=true]:bg-[#BCB88A]">
        <h2 className="font-sans text-xl font-semibold text-zinc-900 sm:group-hover:text-white max-sm:group-data-[incenter=true]:text-white">
          {property.titel || noTitle}
        </h2>
        <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-zinc-600 sm:group-hover:text-white/90 max-sm:group-data-[incenter=true]:text-white/90">
          {property.objektart ? (
            <span className="rounded bg-zinc-100 px-2 py-0.5 font-medium text-zinc-700 sm:group-hover:bg-white/20 sm:group-hover:text-white max-sm:group-data-[incenter=true]:bg-white/20 max-sm:group-data-[incenter=true]:text-white">
              {translateObjektart(property.objektart, permittedValues)}
            </span>
          ) : null}
          {property.anzahl_zimmer != null && property.anzahl_zimmer > 0 && (
            <span className="flex items-center gap-1.5">
              <DoorOpen className="h-4 w-4 shrink-0" />
              {property.anzahl_zimmer} {roomsLabel}
            </span>
          )}
          {property.anzahl_schlafzimmer != null && property.anzahl_schlafzimmer > 0 && (
            <span className="flex items-center gap-1.5">
              <BedDouble className="h-4 w-4 shrink-0" />
              {property.anzahl_schlafzimmer} {bedroomsLabel}
            </span>
          )}
          {property.anzahl_badezimmer != null && property.anzahl_badezimmer > 0 && (
            <span className="flex items-center gap-1.5">
              <Bath className="h-4 w-4 shrink-0" />
              {property.anzahl_badezimmer} {bathroomsLabel}
            </span>
          )}
          {(() => {
            const wohn = property.wohnflaeche ?? 0;
            const nutz = property.nutzflaeche ?? 0;
            const gesamt = wohn > 0 && nutz > 0 ? wohn + nutz : wohn || nutz;
            return gesamt > 0 ? (
              <span className="flex items-center gap-1.5">
                <LayoutGrid className="h-4 w-4 shrink-0" />
                {wohn > 0 && nutz > 0 ? `ca. ${gesamt} m²` : `${gesamt} m²`}
              </span>
            ) : null;
          })()}
          {showGrundstueck && (
            <span className="flex items-center gap-1.5">
              {property.grundstuecksflaeche} m² {plotLabel}
            </span>
          )}
        </div>
        {(price != null && price > 0) && (
          <>
            <hr className="mt-3 border-t border-zinc-300 sm:group-hover:border-white/40 max-sm:group-data-[incenter=true]:border-white/40" />
            <div className="mt-3 flex items-center justify-between gap-4">
              <span className="flex items-center gap-1.5 text-sm text-zinc-600 sm:group-hover:text-white/90 max-sm:group-data-[incenter=true]:text-white/90">
                <MapPin className="h-4 w-4 shrink-0" />
                {[property.plz, property.ort].filter(Boolean).join(" ")}
              </span>
              <p className="text-lg font-semibold text-zinc-900 sm:group-hover:text-white max-sm:group-data-[incenter=true]:text-white">
                {priceLabel}
                {formatPrice(price, lang)}
              </p>
            </div>
          </>
        )}
      </div>
    </Link>
  );
}
