"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const STORAGE_KEY = "he-immologis-cookie-consent";

type Locale = "de" | "en" | "tr";

function getLangFromPathname(pathname: string): Locale {
  const segments = pathname.split("/").filter(Boolean);
  const lang = segments[0];
  if (lang === "de" || lang === "en" || lang === "tr") return lang as Locale;
  return "de";
}

const copy = {
  de: {
    title: "Cookie-Einstellungen",
    text: "Wir verwenden Cookies, um Ihre Erfahrung auf HE-immologis zu verbessern und unseren Service in ganz Baden-Württemberg und Hessen zu optimieren.",
    learnMore: "Mehr erfahren in unseren Cookie-Richtlinien",
    necessary: "Nur notwendige",
    acceptAll: "Alle akzeptieren",
  },
  en: {
    title: "Cookie settings",
    text: "We use cookies to improve your experience on HE-immologis and to optimize our service throughout Baden-Württemberg and Hesse.",
    learnMore: "Learn more in our Cookie Policy",
    necessary: "Essential only",
    acceptAll: "Accept all",
  },
  tr: {
    title: "Çerez ayarları",
    text: "HE-immologis deneyiminizi iyileştirmek ve Baden-Württemberg ve Hessen genelinde hizmetimizi optimize etmek için çerezler kullanıyoruz.",
    learnMore: "Çerez politikamızda daha fazla bilgi edinin",
    necessary: "Sadece gerekli",
    acceptAll: "Tümünü kabul et",
  },
} as const;

export default function CookieBanner() {
  const pathname = usePathname();
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setShowBanner(true);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem(STORAGE_KEY, "all");
    setShowBanner(false);
  };

  const acceptNecessary = () => {
    localStorage.setItem(STORAGE_KEY, "necessary");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  const lang = getLangFromPathname(pathname ?? "/de");
  const t = copy[lang];
  const prefix = `/${lang}`;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-desc"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-800 bg-slate-900 px-4 py-4 shadow-lg sm:px-6 lg:px-8"
    >
      <h2 id="cookie-banner-title" className="sr-only">
        {t.title}
      </h2>
      <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          <p id="cookie-banner-desc" className="text-sm text-white sm:text-base">
            {t.text}{" "}
            <Link
              href={`${prefix}/cookies`}
              className="font-medium text-[#4682B4] underline decoration-[#4682B4]/60 underline-offset-2 transition-colors hover:text-[#5a9fd4] hover:decoration-[#5a9fd4]"
            >
              {t.learnMore}
            </Link>
            .
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:gap-3">
          <button
            type="button"
            onClick={acceptNecessary}
            className="rounded-lg border-2 border-white/60 bg-transparent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            {t.necessary}
          </button>
          <button
            type="button"
            onClick={acceptAll}
            className="rounded-lg bg-[#4682B4] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#5a9fd4] focus:outline-none focus:ring-2 focus:ring-[#4682B4] focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            {t.acceptAll}
          </button>
        </div>
      </div>
    </div>
  );
}
