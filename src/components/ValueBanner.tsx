"use client";

import Link from "next/link";
import { Home, Search } from "lucide-react";
import { useState } from "react";

const OBJEKTTYPEN = [
  "Einfamilienhaus",
  "Zweifamilienhaus",
  "Mehrfamilienhaus",
  "Reihenhaus",
  "Eigentumswohnung",
  "Grundstück",
  "Gewerbe- / Wohnimmobilie",
] as const;

const ZUSTAENDE = [
  "normal",
  "modernisiert",
  "kernsaniert",
  "modernisierungsbedürftig",
  "sanierungsbedürftig",
  "sonstiges",
] as const;

export default function ValueBanner() {
  const [objekttyp, setObjekttyp] = useState("");
  const [zustand, setZustand] = useState("");

  const wertermittlungHref = (() => {
    const params = new URLSearchParams();
    if (objekttyp) params.set("objekttyp", objekttyp);
    if (zustand) params.set("zustand", zustand);
    const qs = params.toString();
    return `/anbieten${qs ? `?${qs}` : ""}#anfrage-formular`;
  })();

  return (
    <section
      className="relative py-10 sm:py-12"
      style={{ backgroundColor: "#D3EFDE" }}
      aria-labelledby="wertermittlung-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-between lg:gap-8">
          {/* Links: Icon + Headline + Begleittext */}
          <div className="flex flex-1 items-center gap-4">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-2 border-slate-200 bg-white shadow-sm text-slate-600"
              aria-hidden
            >
              <span className="relative">
                <Home className="h-6 w-6 text-slate-600" strokeWidth={1.75} />
                <Search
                  className="absolute -right-1.5 -top-1.5 h-3.5 w-3.5 text-[#3d6d99]"
                  strokeWidth={2}
                />
              </span>
            </div>
            <div>
              <h2
                id="wertermittlung-heading"
                className="font-sans text-xl font-bold tracking-tight text-slate-800 sm:text-2xl"
              >
                Kostenlose Immobilien-Wertermittlung
              </h2>
              <p className="mt-1 text-sm leading-snug text-slate-600 sm:text-base">
                Erhalten Sie eine fundierte Markteinschätzung für Ihr Objekt in
                der Region.
              </p>
            </div>
          </div>

          {/* Rechts: 2 Dropdowns + Button (CTA) */}
          <div
            className="flex w-full shrink-0 flex-wrap items-center gap-2 sm:flex-row sm:gap-3 lg:w-auto"
          >
            <label htmlFor="objekttyp" className="sr-only">
              Objekttyp
            </label>
            <select
              id="objekttyp"
              value={objekttyp}
              onChange={(e) => setObjekttyp(e.target.value)}
              className="rounded-lg border-2 border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-800 shadow-sm outline-none transition-colors focus:border-[#4682B4] focus:ring-2 focus:ring-[#4682B4]/25"
            >
              <option value="">Objekttyp</option>
              {OBJEKTTYPEN.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
            <label htmlFor="zustand" className="sr-only">
              Zustand der Immobilie
            </label>
            <select
              id="zustand"
              value={zustand}
              onChange={(e) => setZustand(e.target.value)}
              className="rounded-lg border-2 border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-800 shadow-sm outline-none transition-colors focus:border-[#4682B4] focus:ring-2 focus:ring-[#4682B4]/25"
            >
              <option value="">Zustand</option>
              {ZUSTAENDE.map((z) => (
                <option key={z} value={z}>
                  {z}
                </option>
              ))}
            </select>
            <Link
              href={wertermittlungHref}
              className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-base font-semibold text-white shadow-lg transition-all hover:opacity-95 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#4682B4] focus:ring-offset-2"
              style={{
                backgroundColor: "#4682B4",
                boxShadow: "0 10px 15px -3px rgba(70, 130, 180, 0.35)",
              }}
            >
              Wertermittlung
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
