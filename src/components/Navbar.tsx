"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Phone,
  Mail,
  Globe,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

/* Dropdown-Unterpunkte für Logistikberatung */
const LOGISTIKBERATUNG_SUB = [
  { label: "Nationale Spedition", href: "/logistik" },
  { label: "Internationaler Transport", href: "/logistik" },
  { label: "Lager & Kommissionierung", href: "/logistik" },
  { label: "Express-Lieferung", href: "/logistik" },
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logistikOpen, setLogistikOpen] = useState(false);
  const [lang, setLang] = useState<"DE" | "EN">("DE");

  const toggleLang = () => setLang((prev) => (prev === "DE" ? "EN" : "DE"));

  const utilityLinkClass = (variant: "bar" | "mobile") =>
    variant === "bar"
      ? "flex items-center gap-2 text-xs text-white transition-colors hover:opacity-80"
      : "flex items-center gap-2 text-xs text-black transition-colors hover:opacity-80";

  const utilityLinks = (variant: "bar" | "mobile") => (
    <div className="flex items-center gap-6">
      <a href="mailto:info@he-immologis.de" className={utilityLinkClass(variant)}>
        <Mail className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">info@he-immologis.de</span>
      </a>
      <a href="tel:+496201123456" className={utilityLinkClass(variant)}>
        <Phone className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">+49 6201 123 456</span>
      </a>
      <button
        type="button"
        onClick={toggleLang}
        className={utilityLinkClass(variant)}
        aria-label="Sprache wechseln"
      >
        <Globe className="h-3.5 w-3.5" />
        <span>{lang}</span>
      </button>
    </div>
  );

  const navLinkClass = (href: string) =>
    `rounded-lg px-3 py-2 text-lg font-normal text-black transition-colors hover:opacity-80 ${
      pathname.startsWith(href) ? "opacity-100" : "opacity-90"
    }`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white">
      {/* Obere Utility-Leiste */}
      <div
        className="border-b border-slate-500/30"
        style={{ backgroundColor: "#4682B4" }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-end px-4 py-2.5 text-sm sm:px-6 lg:px-8">
          {utilityLinks("bar")}
        </div>
      </div>

      {/* Haupt-Navigation */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 border-b border-zinc-200 px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo links */}
        <Link
          href="/"
          className="block shrink-0 transition-opacity hover:opacity-80"
        >
          <Image
            src="/img/logo.png"
            alt="HE immologis"
            width={110}
            height={33}
            className="block"
            sizes="(max-width: 640px) 90px, 110px"
            priority
          />
        </Link>

        {/* Nav-Punkte zentriert */}
        <div className="hidden flex-1 justify-center lg:flex">
          <div className="flex flex-nowrap items-center gap-1 xl:gap-2">
            <Link href="/immobilien" className={navLinkClass("/immobilien")}>
              Verkaufen
            </Link>
            <Link href="/immobilien" className={navLinkClass("/immobilien")}>
              Kaufen
            </Link>
            <Link href="/immobilien" className={navLinkClass("/immobilien")}>
              Mieten
            </Link>
            <Link
              href="/logistik#services"
              className={navLinkClass("/logistik")}
            >
              Service
            </Link>

            {/* Logistikberatung mit Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setLogistikOpen(true)}
              onMouseLeave={() => setLogistikOpen(false)}
            >
              <button
                type="button"
                className={`flex items-center gap-1 rounded-lg px-3 py-2 text-lg font-normal text-black transition-colors hover:opacity-80 ${
                  pathname.startsWith("/logistik") ? "opacity-100" : "opacity-90"
                }`}
              >
                Logistikberatung
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    logistikOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {logistikOpen && (
                <div className="absolute left-0 top-full pt-1">
                  <div className="min-w-[220px] rounded-lg border border-zinc-100 bg-white py-2 shadow-lg">
                    {LOGISTIKBERATUNG_SUB.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="block px-4 py-2 text-sm text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-900"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link href="/logistik" className={navLinkClass("/logistik")}>
              Über mich
            </Link>
          </div>
        </div>

        {/* Rechts: CTA */}
        <div className="hidden md:block">
          <Link
            href="mailto:info@he-immologis.de"
            className="inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-medium text-white transition-colors hover:opacity-90"
            style={{ backgroundColor: "#4682B4" }}
          >
            Jetzt kontaktieren
          </Link>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-zinc-600 transition-colors hover:bg-zinc-100 lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Menü schließen" : "Menü öffnen"}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menü */}
      {mobileMenuOpen && (
        <div className="border-t border-zinc-100 bg-white lg:hidden">
          <div className="space-y-2 px-4 py-4">
            <div className="flex flex-wrap gap-4 border-b border-zinc-100 pb-4">
              {utilityLinks("mobile")}
            </div>
            <Link
              href="mailto:info@he-immologis.de"
              onClick={() => setMobileMenuOpen(false)}
              className="flex w-full items-center justify-center rounded-md px-5 py-3 text-sm font-medium text-white transition-colors hover:opacity-90"
              style={{ backgroundColor: "#4682B4" }}
            >
              Jetzt kontaktieren
            </Link>

            <div className="flex flex-col gap-1">
              <Link
                href="/immobilien"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-base font-normal text-black hover:bg-zinc-50"
              >
                Verkaufen
              </Link>
              <Link
                href="/immobilien"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-base font-normal text-black hover:bg-zinc-50"
              >
                Kaufen
              </Link>
              <Link
                href="/immobilien"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-base font-normal text-black hover:bg-zinc-50"
              >
                Mieten
              </Link>
              <Link
                href="/logistik#services"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-base font-normal text-black hover:bg-zinc-50"
              >
                Service
              </Link>
              <div className="rounded-lg px-4 py-2">
                <p className="mb-1 text-base font-semibold uppercase tracking-wider text-black">
                  Logistikberatung
                </p>
                {LOGISTIKBERATUNG_SUB.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block rounded-lg px-3 py-2 text-base font-medium text-black hover:bg-zinc-50"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <Link
                href="/logistik"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-base font-normal text-black hover:bg-zinc-50"
              >
                Über mich
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
