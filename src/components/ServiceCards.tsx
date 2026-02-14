"use client";

import Image from "next/image";
import Link from "next/link";
import {
  DEFAULT_SERVICES,
  type ServiceCardItem,
} from "@/data/services";

const BRAND_BLUE = "#4682B4";

export type { ServiceCardItem };

interface ServiceCardsProps {
  services?: ServiceCardItem[];
}

export default function ServiceCards({ services = DEFAULT_SERVICES }: ServiceCardsProps) {
  return (
    <section
      className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      aria-labelledby="service-cards-heading"
    >
      <div className="mx-auto max-w-7xl">
        <h2
          id="service-cards-heading"
          className="sr-only"
        >
          Unsere Dienstleistungen
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.id}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Bild oben – 16:9, Hover-Zoom */}
              <div className="relative aspect-video overflow-hidden bg-slate-100">
                <Image
                  src={service.image}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-sans text-xl font-semibold tracking-tight text-slate-900">
                  {service.title}
                </h3>
                <span
                  className="mt-3 inline-flex w-fit rounded-lg px-3 py-1.5 text-sm font-semibold"
                  style={{
                    backgroundColor: `${BRAND_BLUE}15`,
                    color: BRAND_BLUE,
                  }}
                >
                  {service.price}
                </span>
                {service.subtitle && (
                  <p className="mt-2 text-sm font-medium text-slate-600">
                    {service.subtitle}
                  </p>
                )}
                {service.description ? (
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                    {service.description}
                  </p>
                ) : (
                  <div className="flex-1" />
                )}

                {/* Aktion – Button */}
                <Link
                  href={service.href ?? `/immobilien-services/${service.slug}`}
                  className="mt-6 flex w-full items-center justify-center rounded-lg px-4 py-3 text-sm font-semibold text-white transition-colors hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-[#4682B4] focus:ring-offset-2"
                  style={{
                    backgroundColor: BRAND_BLUE,
                  }}
                >
                  Mehr Infos
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
