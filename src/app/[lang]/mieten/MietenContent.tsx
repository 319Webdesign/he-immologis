"use client";

import { useState, useMemo } from "react";
import PropertyGrid from "@/components/PropertyGrid";
import type { Rental } from "@/types";

const ZIMMER_VALUES = ["alle", "1", "2", "3", "4", "5"] as const;
const PREIS_VALUES = ["alle", "bis800", "800-1200", "1200-1800", "ueber1800"] as const;

export type MietenDict = {
  filters: {
    labelPropertyType: string;
    propertyTypeOptions: { value: string; label: string }[];
    allRooms: string;
    roomOptions: string[];
    allPrices: string;
    priceOptions: string[];
  };
  noRentals: { text: string; buttonText: string };
  card: {
    badgeLabel?: string;
    viewDetails: string;
    netRentSuffix: string;
    roomsLabel: string;
    statusNew: string;
    statusReserved: string;
    statusAvailable: string;
  };
};

interface MietenContentProps {
  rentals: Rental[];
  dict: MietenDict;
  lang: string;
}

export default function MietenContent({ rentals, dict, lang }: MietenContentProps) {
  const [objekttyp, setObjekttyp] = useState<string>("alle");
  const [zimmer, setZimmer] = useState<string>("alle");
  const [preisspanne, setPreisspanne] = useState<string>("alle");

  const f = dict.filters;
  const roomOptions = [
    { value: "alle", label: f.allRooms },
    ...f.roomOptions.map((label, i) => ({ value: ZIMMER_VALUES[i + 1], label })),
  ];
  const priceOptions = [
    { value: "alle", label: f.allPrices },
    ...f.priceOptions.map((label, i) => ({ value: PREIS_VALUES[i + 1], label })),
  ];

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
      {/* Filter-Leiste */}
      <div className="flex flex-nowrap items-center gap-2 overflow-x-auto rounded-xl border border-zinc-100 bg-white px-3 py-3 shadow-sm sm:gap-4 sm:px-5">
        <select
          id="objekttyp"
          value={objekttyp}
          onChange={(e) => setObjekttyp(e.target.value)}
          className="min-w-0 flex-1 shrink-0 rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-700 outline-none transition-colors focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400/30 sm:flex-initial sm:px-4"
        >
          <option value="alle">{f.labelPropertyType}</option>
          {f.propertyTypeOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <select
          id="zimmer"
          value={zimmer}
          onChange={(e) => setZimmer(e.target.value)}
          className="min-w-0 flex-1 shrink-0 rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-700 outline-none transition-colors focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400/30 sm:flex-initial sm:px-4"
        >
          {roomOptions.map((opt) => (
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
          {priceOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <PropertyGrid
        properties={filteredRentals}
        lang={lang}
        noRentalsText={dict.noRentals.text}
        noRentalsButtonText={dict.noRentals.buttonText}
        cardLabels={dict.card}
      />
    </div>
  );
}
