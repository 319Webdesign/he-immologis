"use client";

import { useEffect } from "react";

export default function ClientLangSync({ lang }: { lang: string }) {
  useEffect(() => {
    document.documentElement.lang = lang === "en" ? "en" : "de";
  }, [lang]);
  return null;
}
