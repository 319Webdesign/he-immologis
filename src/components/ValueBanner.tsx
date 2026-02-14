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
      className="border-y border-slate-200/90 bg-white py-6 sm:py-8"
      aria-labelledby="wertermittlung-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-between lg:gap-8">
          {/* Links: Icon + Headline + Begleittext */}
          <div className="flex flex-1 items-center gap-4">
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-slate-200/80 bg-slate-50/80 text-slate-600"
              aria-hidden
            >
              <span className="relative">
                <Home className="h-5 w-5 text-slate-500" strokeWidth={1.75} />
                <Search
                  className="absolute -right-1.5 -top-1.5 h-3 w-3 text-slate-500"
                  strokeWidth={2}
                />
              </span>
            </div>
            <div>
              <h2
                id="wertermittlung-heading"
                className="font-sans text-lg font-semibold tracking-tight text-slate-800 sm:text-xl"
              >
                Kostenlose Immobilien-Wertermittlung
              </h2>
              <p className="mt-0.5 text-sm leading-snug text-slate-600">
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
              className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition-colors focus:border-[#3d6d99] focus:ring-1 focus:ring-[#3d6d99]/30"
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
              className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition-colors focus:border-[#3d6d99] focus:ring-1 focus:ring-[#3d6d99]/30"
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
              className="inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-white transition-colors hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#3d6d99]/40 focus:ring-offset-2"
              style={{ backgroundColor: "#3d6d99" }}
            >
              Wert prüfen
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
