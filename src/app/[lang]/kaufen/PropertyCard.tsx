"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin } from "lucide-react";
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

export default function PropertyCard({ property }: PropertyCardProps) {
  const pathname = usePathname();
  const lang = (pathname?.split("/")[1] ?? "de") as string;
  const imageSrc =
    property.titelbild?.startsWith("http") || property.titelbild?.startsWith("/")
      ? property.titelbild
      : PLACEHOLDER_IMG;

  const price = property.kaufpreis ?? property.kaltmiete;
  const priceLabel =
    property.kaufpreis != null ? "" : property.kaltmiete != null ? "Kaltmiete " : "";

  return (
    <Link
      href={`/${lang}/kaufen/${property.id}`}
      className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-200">
        <Image
          src={imageSrc}
          alt={property.titel || "Immobilie"}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="p-6">
        <h2 className="font-sans text-xl font-semibold text-zinc-900 group-hover:text-amber-800">
          {property.titel || "Ohne Titel"}
        </h2>
        <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-zinc-600">
          {property.objektart ? (
            <span className="rounded bg-zinc-100 px-2 py-0.5 font-medium text-zinc-700">
              {property.objektart}
            </span>
          ) : null}
          {property.ort ? (
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {property.ort}
            </span>
          ) : null}
          {property.wohnflaeche != null && (
            <span>{property.wohnflaeche} m²</span>
          )}
        </div>
        {(price != null && price > 0) && (
          <p className="mt-4 text-lg font-semibold text-amber-800">
            {priceLabel}{formatPrice(price)}
          </p>
        )}
      </div>
    </Link>
  );
}
