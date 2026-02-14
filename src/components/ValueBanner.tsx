"use client";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section
      className="relative border-y-2 border-slate-200 bg-gradient-to-r from-slate-50 via-blue-50/40 to-slate-50 py-8 sm:py-10"
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

          {/* Rechts: 2 Dropdowns + Button */}
          <form
            onSubmit={handleSubmit}
            className="flex w-full shrink-0 flex-wrap items-center gap-2 sm:flex-row sm:gap-3 lg:w-auto"
          >
            <label htmlFor="objekttyp" className="sr-only">
              Objekttyp
            </label>
            <select
              id="objekttyp"
              value={objekttyp}
              onChange={(e) => setObjekttyp(e.target.value)}
              className="rounded-lg border-2 border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-800 shadow-sm outline-none transition-colors focus:border-[#3d6d99] focus:ring-2 focus:ring-[#3d6d99]/25"
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
              className="rounded-lg border-2 border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-800 shadow-sm outline-none transition-colors focus:border-[#3d6d99] focus:ring-2 focus:ring-[#3d6d99]/25"
            >
              <option value="">Zustand</option>
              {ZUSTAENDE.map((z) => (
                <option key={z} value={z}>
                  {z}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-lg bg-emerald-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-emerald-500/35 transition-all hover:bg-emerald-600 hover:shadow-xl hover:shadow-emerald-500/40 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              Wert prüfen
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
