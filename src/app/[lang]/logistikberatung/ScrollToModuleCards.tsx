"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

const MODULE_CARDS_ID = "module-cards";
const HEADER_OFFSET = 100;

function scrollToModuleCards() {
  const el = document.getElementById(MODULE_CARDS_ID);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  window.scrollTo({ top, behavior: "smooth" });
}

export default function ScrollToModuleCards() {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const scrollTarget = searchParams.get("scroll");
    if (scrollTarget !== MODULE_CARDS_ID) return;
    scrollToModuleCards();
    const t = setTimeout(scrollToModuleCards, 250);
    const cleanUrl = () => {
      const url = new URL(window.location.href);
      url.searchParams.delete("scroll");
      url.hash = MODULE_CARDS_ID;
      window.history.replaceState(null, "", url.pathname + "#" + MODULE_CARDS_ID);
    };
    const t2 = setTimeout(cleanUrl, 800);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, [searchParams]);

  return null;
}
