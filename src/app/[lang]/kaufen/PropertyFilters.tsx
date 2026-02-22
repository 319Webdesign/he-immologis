"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

export type KaufenFiltersDict = {
  labelStatus: string;
  labelLocation: string;
  allStatus: string;
  allLocations: string;
  statusAvailable: string;
  statusReserved: string;
  statusSold: string;
};

interface PropertyFiltersProps {
  dict: KaufenFiltersDict;
  lang: string;
}

const STATUS_VALUES = ["alle", "verfügbar", "reserviert", "verkauft"] as const;

export default function PropertyFilters({ dict, lang }: PropertyFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const status = searchParams.get("status") ?? "alle";
  const ort = searchParams.get("ort") ?? "alle";

  const statusLabel = (value: string) => {
    if (value === "alle") return dict.allStatus;
    if (value === "verfügbar") return dict.statusAvailable;
    if (value === "reserviert") return dict.statusReserved;
    if (value === "verkauft") return dict.statusSold;
    return value;
  };

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "alle") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`/${lang}/kaufen${params.toString() ? `?${params}` : ""}`);
  };

  return (
    <div className="flex flex-wrap gap-4 rounded-xl bg-white p-4 shadow-sm">
      <div>
        <label htmlFor="status" className="sr-only">
          {dict.labelStatus}
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => updateFilter("status", e.target.value)}
          className="rounded-lg border border-zinc-300 px-4 py-2 text-sm focus:border-amber-500 focus:ring-amber-500"
        >
          {STATUS_VALUES.map((v) => (
            <option key={v} value={v}>
              {statusLabel(v)}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="ort" className="sr-only">
          {dict.labelLocation}
        </label>
        <select
          id="ort"
          value={ort}
          onChange={(e) => updateFilter("ort", e.target.value)}
          className="rounded-lg border border-zinc-300 px-4 py-2 text-sm focus:border-amber-500 focus:ring-amber-500"
        >
          <option value="alle">{dict.allLocations}</option>
          <option value="Weinheim">Weinheim</option>
        </select>
      </div>
    </div>
  );
}
