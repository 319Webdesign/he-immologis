"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Scrollt bei jedem Seitenwechsel nach ganz oben.
 * Behebt das Problem, dass auf dem Handy nach Navigation etwas nach unten
 * gesprungen wird und man hochscrollen muss.
 */
export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    scrollToTop();
    // Ein Frame später nochmal, falls Mobile-Browser oder Layout die Position nach dem Paint ändern
    const raf = requestAnimationFrame(() => {
      scrollToTop();
    });
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return null;
}
