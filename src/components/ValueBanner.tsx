"use client";

import { Home, Search } from "lucide-react";
import { useState } from "react";

export default function ValueBanner() {
  const [plz, setPlz] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder: Hier kann z.B. Navigation zur Wertermittlungs-Seite erfolgen
    if (plz.trim()) {
      // Optional: Weiterleitung oder API-Aufruf
    }
  };

  return (
    <section
      className="border-y border-slate-200/90 bg-white py-6 sm:py-8"
      aria-labelledby="wertermittlung-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-between lg:gap-8">
          {/* Links: Headline + Begleittext */}
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
                der Region Weinheim.
              </p>
            </div>
          </div>

          {/* Rechts: Eingabefeld + Button */}
          <form
            onSubmit={handleSubmit}
            className="flex w-full shrink-0 flex-col gap-3 sm:flex-row sm:items-center sm:gap-3 lg:w-auto"
          >
            <label htmlFor="plz-wertermittlung" className="sr-only">
              Postleitzahl eingeben
            </label>
            <input
              id="plz-wertermittlung"
              type="text"
              inputMode="numeric"
              maxLength={5}
              placeholder="Postleitzahl"
              value={plz}
              onChange={(e) => setPlz(e.target.value.replace(/\D/g, ""))}
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none transition-colors placeholder:text-slate-400 focus:border-[#3d6d99] focus:ring-1 focus:ring-[#3d6d99]/30 sm:w-36"
              aria-describedby="wertermittlung-heading"
            />
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
