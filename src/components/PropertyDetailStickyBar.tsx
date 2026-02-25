"use client";

import { useEffect, useState } from "react";
import { Mail } from "lucide-react";

const EXPOSE_SECTION_ID = "expose-anfordern";

interface PropertyDetailStickyBarProps {
  title: string;
  location: string | null;
  priceDisplay: string;
  /** Vorgeformatierte Strings z.B. ["7 Zimmer", "~220 m² Wohnfläche"] */
  facts: string[];
}

export function PropertyDetailStickyBar({
  title,
  location,
  priceDisplay,
  facts,
}: PropertyDetailStickyBarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [barHeight, setBarHeight] = useState(0);
  const scrollThreshold = 450;

  useEffect(() => {
    const bar = document.getElementById("property-detail-sticky-bar");
    if (!bar) return;
    const checkScroll = () => {
      setIsVisible(window.scrollY > scrollThreshold);
    };
    checkScroll();
    window.addEventListener("scroll", checkScroll, { passive: true });
    setBarHeight(bar.offsetHeight);
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  const scrollToExpose = () => {
    document.getElementById(EXPOSE_SECTION_ID)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div
        id="property-detail-sticky-bar"
        className={`z-40 border-b border-zinc-200 bg-white/95 shadow-md backdrop-blur transition-transform duration-200 ${
          isVisible
            ? "fixed left-0 right-0 top-[9rem] translate-y-0"
            : "fixed left-0 right-0 top-[9rem] -translate-y-full"
        }`}
        aria-hidden={!isVisible}
      >
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          {location && (
            <p className="mb-1 truncate text-sm text-zinc-500">{location}</p>
          )}
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <p className="min-w-0 flex-1 truncate font-semibold text-zinc-900 sm:text-base">
              {title}
            </p>
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-sm text-zinc-600">
              <span className="font-medium text-zinc-800">{priceDisplay}</span>
              {facts.slice(0, 4).map((text, i) => (
                <span key={i} className="hidden sm:inline">
                  {text}
                </span>
              ))}
            </div>
            <a
              href={`#${EXPOSE_SECTION_ID}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToExpose();
              }}
              className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-500"
            >
              <Mail className="h-4 w-4" />
              Details anfragen
            </a>
          </div>
        </div>
      </div>
      {isVisible && <div style={{ height: barHeight }} className="shrink-0" aria-hidden />}
    </>
  );
}
