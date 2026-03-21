"use client";

import { useEffect } from "react";

const MODULE_CARDS_ID = "module-cards";
const HEADER_OFFSET = 100;

function scrollToModuleCards() {
  const el = document.getElementById(MODULE_CARDS_ID);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  window.scrollTo({ top, behavior: "smooth" });
}

function shouldScroll() {
  return typeof window !== "undefined" && window.location.hash.slice(1) === MODULE_CARDS_ID;
}

export default function ScrollToModuleCards() {
  useEffect(() => {
    if (!shouldScroll()) return;
    scrollToModuleCards();
    const t = setTimeout(scrollToModuleCards, 250);
    const onHashChange = () => {
      if (shouldScroll()) scrollToModuleCards();
    };
    window.addEventListener("hashchange", onHashChange);
    return () => {
      clearTimeout(t);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  return null;
}
