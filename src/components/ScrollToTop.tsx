"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Scrollt bei jedem Seitenwechsel nach ganz oben – außer wenn ein Hash-Anker
 * gesetzt ist (z. B. #anfrage-formular), dann zum Anker scrollen.
 */
export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash.slice(1) : "";
    if (hash) {
      // Anker gesetzt: zum Element scrollen, nicht nach oben (z. B. /verkaufen#anfrage-formular)
      const scrollToAnchor = () => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      };
      scrollToAnchor();
      const t1 = requestAnimationFrame(scrollToAnchor);
      const t2 = setTimeout(scrollToAnchor, 150);
      const t3 = setTimeout(scrollToAnchor, 400);
      return () => {
        cancelAnimationFrame(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    scrollToTop();
    const raf = requestAnimationFrame(() => scrollToTop());
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return null;
}
