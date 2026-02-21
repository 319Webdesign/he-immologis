"use client";

import { useState, useMemo } from "react";
import PropertyGrid from "@/components/PropertyGrid";
import type { Rental } from "@/types";

interface MietenContentProps {
  rentals: Rental[];
}

const OBJEKTTYPEN = ["alle", "Wohnung", "Haus", "Gewerbe"] as const;
const ZIMMER_OPTIONS = [
  { value: "alle", label: "Alle Zimmer" },
  { value: "1", label: "1 Zimmer" },
  { value: "2", label: "2 Zimmer" },
  { value: "3", label: "3 Zimmer" },
  { value: "4", label: "4 Zimmer" },
  { value: "5", label: "5+ Zimmer" },
] as const;
const PREIS_OPTIONS = [
  { value: "alle", label: "Alle Preise" },
  { value: "bis800", label: "bis 800 €" },
  { value: "800-1200", label: "800 – 1.200 €" },
  { value: "1200-1800", label: "1.200 – 1.800 €" },
  { value: "ueber1800", label: "über 1.800 €" },
] as const;

export default function MietenContent({ rentals }: MietenContentProps) {
  const [objekttyp, setObjekttyp] = useState<string>("alle");
  const [zimmer, setZimmer] = useState<string>("alle");
  const [preisspanne, setPreisspanne] = useState<string>("alle");

  const filteredRentals = useMemo(() => {
    return rentals.filter((r) => {
      if (objekttyp !== "alle" && r.objekttyp !== objekttyp) return false;
      if (zimmer !== "alle") {
        const z = parseInt(zimmer, 10);
        if (z === 5 && r.zimmer < 5) return false;
        if (z < 5 && r.zimmer !== z) return false;
      }
      if (preisspanne !== "alle") {
        if (preisspanne === "bis800" && r.kaltmiete > 800) return false;
        if (preisspanne === "800-1200" && (r.kaltmiete < 800 || r.kaltmiete > 1200)) return false;
        if (preisspanne === "1200-1800" && (r.kaltmiete < 1200 || r.kaltmiete > 1800)) return false;
        if (preisspanne === "ueber1800" && r.kaltmiete <= 1800) return false;
      }
      return true;
    });
  }, [rentals, objekttyp, zimmer, preisspanne]);

  return (
    <div className="space-y-10">
      {/* Filter-Leiste: auf dem Handy in einer Reihe */}
      <div className="flex flex-nowrap items-center gap-2 overflow-x-auto rounded-xl border border-zinc-100 bg-white px-3 py-3 shadow-sm sm:gap-4 sm:px-5">
        <select
          id="objekttyp"
          value={objekttyp}
          onChange={(e) => setObjekttyp(e.target.value)}
          className="min-w-0 flex-1 shrink-0 rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-700 outline-none transition-colors focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400/30 sm:flex-initial sm:px-4"
        >
          <option value="alle">Objekttyp</option>
          {OBJEKTTYPEN.filter((o) => o !== "alle").map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <select
          id="zimmer"
          value={zimmer}
          onChange={(e) => setZimmer(e.target.value)}
          className="min-w-0 flex-1 shrink-0 rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-700 outline-none transition-colors focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400/30 sm:flex-initial sm:px-4"
        >
          {ZIMMER_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <select
          id="preisspanne"
          value={preisspanne}
          onChange={(e) => setPreisspanne(e.target.value)}
          className="min-w-0 flex-1 shrink-0 rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-700 outline-none transition-colors focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400/30 sm:flex-initial sm:px-4"
        >
          {PREIS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Immobilien-Grid */}
      <PropertyGrid properties={filteredRentals} />
    </div>
  );
}
