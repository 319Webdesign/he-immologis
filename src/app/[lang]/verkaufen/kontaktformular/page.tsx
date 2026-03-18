"use client";

import { useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";

const REDIRECT_TEXTS = {
  de: { title: "Kontaktformular", message: "Weiterleitung zum Kontaktformular …" },
  en: { title: "Contact form", message: "Redirecting to contact form …" },
  tr: { title: "İletişim formu", message: "İletişim formuna yönlendiriliyor …" },
} as const;

/**
 * Weiterleitung von /verkaufen/kontaktformular zur Verkaufsseite
 * direkt zum Anfrage-Formular (#anfrage-formular).
 * Query-Parameter (objekttyp, zustand) werden übernommen.
 * Client-Redirect nötig, damit der Hash (#anfrage-formular) ankommt.
 */
export default function VerkaufenKontaktformularPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const lang = (params?.lang as "de" | "en" | "tr") ?? "de";
  const objekttyp = searchParams?.get("objekttyp");
  const zustand = searchParams?.get("zustand");
  const t = REDIRECT_TEXTS[lang] ?? REDIRECT_TEXTS.de;

  useEffect(() => {
    const qs = new URLSearchParams();
    if (objekttyp) qs.set("objekttyp", objekttyp);
    if (zustand) qs.set("zustand", zustand);
    const query = qs.toString();
    const url = `/${lang}/verkaufen${query ? `?${query}` : ""}#anfrage-formular`;
    window.location.href = url;
  }, [lang, objekttyp, zustand]);

  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 px-4">
      <h1 className="font-sans text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
        {t.title}
      </h1>
      <p className="text-slate-600">{t.message}</p>
    </div>
  );
}
