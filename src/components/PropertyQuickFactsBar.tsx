"use client";

import { useEffect, useState } from "react";
import { Home, BedDouble } from "lucide-react";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

interface PropertyQuickFactsBarProps {
  /** Kaltmiete oder Kaufpreis */
  price: number | null | undefined;
  priceLabel: "Kaltmiete" | "Kaufpreis";
  wohnflaeche: number | null | undefined;
  anzahlZimmer: number | null | undefined;
}

export function PropertyQuickFactsBar({
  price,
  priceLabel,
  wohnflaeche,
  anzahlZimmer,
}: PropertyQuickFactsBarProps) {
  const [isSticky, setIsSticky] = useState(false);
  const [barHeight, setBarHeight] = useState(0);

  useEffect(() => {
    const bar = document.getElementById("property-quick-facts-bar");
    if (!bar) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "-1px 0px 0px 0px" }
    );
    const sentinel = document.getElementById("property-hero-end");
    if (sentinel) observer.observe(sentinel);
    setBarHeight(bar.offsetHeight);
    return () => observer.disconnect();
  }, []);

  const items: { value: string; icon?: React.ReactNode }[] = [];
  if (price != null && price > 0) {
    items.push({ value: `${priceLabel}: ${formatPrice(price)}` });
  }
  if (wohnflaeche != null && wohnflaeche > 0) {
    items.push({ value: `${wohnflaeche} m²`, icon: <Home className="h-4 w-4 shrink-0" /> });
  }
  if (anzahlZimmer != null && anzahlZimmer > 0) {
    items.push({ value: `${anzahlZimmer} Zimmer`, icon: <BedDouble className="h-4 w-4 shrink-0" /> });
  }

  if (items.length === 0) return null;

  return (
    <>
      <div id="property-hero-end" className="h-0" aria-hidden />
      <div
        id="property-quick-facts-bar"
        className={`z-30 border-b border-zinc-200 bg-white/95 backdrop-blur transition-all ${
          isSticky ? "fixed left-0 right-0 top-0 shadow-sm" : ""
        }`}
      >
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-6 px-4 py-3 sm:gap-8">
          {items.map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-2 text-sm font-medium text-zinc-700 sm:text-base"
            >
              {item.icon}
              {item.value}
            </span>
          ))}
        </div>
      </div>
      {isSticky && <div style={{ height: barHeight }} />}
    </>
  );
}
