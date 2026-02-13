"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function PropertyFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get("status") ?? "alle";
  const ort = searchParams.get("ort") ?? "alle";

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "alle") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`/immobilien${params.toString() ? `?${params}` : ""}`);
  };

  return (
    <div className="flex flex-wrap gap-4 rounded-xl bg-white p-4 shadow-sm">
      <div>
        <label htmlFor="status" className="sr-only">
          Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => updateFilter("status", e.target.value)}
          className="rounded-lg border border-zinc-300 px-4 py-2 text-sm focus:border-amber-500 focus:ring-amber-500"
        >
          <option value="alle">Alle Status</option>
          <option value="verfügbar">Verfügbar</option>
          <option value="reserviert">Reserviert</option>
          <option value="verkauft">Verkauft</option>
        </select>
      </div>
      <div>
        <label htmlFor="ort" className="sr-only">
          Ort
        </label>
        <select
          id="ort"
          value={ort}
          onChange={(e) => updateFilter("ort", e.target.value)}
          className="rounded-lg border border-zinc-300 px-4 py-2 text-sm focus:border-amber-500 focus:ring-amber-500"
        >
          <option value="alle">Alle Orte</option>
          <option value="Weinheim">Weinheim</option>
        </select>
      </div>
    </div>
  );
}
