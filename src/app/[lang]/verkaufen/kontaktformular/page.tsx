"use client";

import { useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";

/**
 * Weiterleitung von /verkaufen/kontaktformular zur Verkaufsseite
 * direkt zum Anfrage-Formular (#anfrage-formular).
 * Query-Parameter (objekttyp, zustand) werden übernommen.
 * Client-Redirect nötig, damit der Hash (#anfrage-formular) ankommt.
 */
export default function VerkaufenKontaktformularPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const lang = params?.lang ?? "de";
  const objekttyp = searchParams?.get("objekttyp");
  const zustand = searchParams?.get("zustand");

  useEffect(() => {
    const qs = new URLSearchParams();
    if (objekttyp) qs.set("objekttyp", objekttyp);
    if (zustand) qs.set("zustand", zustand);
    const query = qs.toString();
    const url = `/${lang}/verkaufen${query ? `?${query}` : ""}#anfrage-formular`;
    window.location.href = url;
  }, [lang, objekttyp, zustand]);

  return (
    <div className="flex min-h-[40vh] items-center justify-center px-4">
      <p className="text-slate-600">Weiterleitung zum Kontaktformular …</p>
    </div>
  );
}
