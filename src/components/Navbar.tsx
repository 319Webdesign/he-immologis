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

/* Dropdown: Logistikberatung SMART – Übersicht + 5 Module */
const LOGISTIKBERATUNG_SUB = [
  { label: "Übersicht SMART", href: "/logistikberatung" },
  { label: "S – Schulung", href: "/logistikberatung/schulung" },
  { label: "M – M & A", href: "/logistikberatung/ma" },
  { label: "A – Entscheidernetzwerke", href: "/logistikberatung/entscheidernetzwerke" },
  { label: "R – Interim-Lösungen", href: "/logistikberatung/interim" },
  { label: "T – Transportnetzwerkstrategien", href: "/logistikberatung/transportnetzwerkstrategien" },
] as const;

/* Dropdown: Tipp-Prämie */
const TIPP_PRAEMIE_SUB = [
  { label: "Tipp geben", href: "/geld-verdienen" },
  { label: "Banner werben", href: "/geld-verdienen#werbeflaeche-heading" },
  { label: "Aufsteller werben", href: "/geld-verdienen/aufsteller" },
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logistikOpen, setLogistikOpen] = useState(false);
  const [tippPraemieOpen, setTippPraemieOpen] = useState(false);
  const [lang, setLang] = useState<"DE" | "EN">("DE");

  const toggleLang = () => setLang((prev) => (prev === "DE" ? "EN" : "DE"));

  const utilityLinkClass = (variant: "bar" | "mobile") =>
    variant === "bar"
      ? "flex items-center gap-2 text-xs text-slate-700 transition-colors hover:opacity-80"
      : "flex items-center gap-2 text-xs text-black transition-colors hover:opacity-80";

  const utilityLinks = (variant: "bar" | "mobile") => (
    <div className="flex items-center gap-6">
      <a href="mailto:info@he-immologis.de" className={utilityLinkClass(variant)}>
        <Mail className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">info@he-immologis.de</span>
      </a>
      <a href="tel:+4917632198462" className={utilityLinkClass(variant)}>
        <Phone className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">0176 321 98 462</span>
      </a>
      <button
        type="button"
        onClick={toggleLang}
        className={`${utilityLinkClass(variant)} flex items-center gap-1.5`}
        aria-label={lang === "DE" ? "Sprache wechseln (aktuell: Deutsch)" : "Switch language (current: English)"}
      >
        <Globe className="h-3.5 w-3.5 shrink-0" aria-hidden />
        <span className="flex items-center gap-1">
          <span title="Deutsch" className="block">
            <Image
              src="/img/flags/de.svg"
              alt=""
              width={24}
              height={16}
              className={`block h-4 w-6 rounded-sm object-cover transition-opacity ${lang === "DE" ? "opacity-100 ring-1 ring-slate-500 ring-offset-1" : "opacity-50 hover:opacity-75"}`}
              aria-hidden
            />
          </span>
          <span title="English" className="block">
            <Image
              src="/img/flags/en.svg"
              alt=""
              width={24}
              height={12}
              className={`block h-4 w-6 rounded-sm object-cover transition-opacity ${lang === "EN" ? "opacity-100 ring-1 ring-slate-500 ring-offset-1" : "opacity-50 hover:opacity-75"}`}
              aria-hidden
            />
          </span>
        </span>
      </button>
    </div>
  );

  const navLinkClass = (href: string) =>
    `whitespace-nowrap rounded-lg px-3 py-2 text-base font-normal text-black transition-colors hover:opacity-80 ${
      pathname.startsWith(href) ? "opacity-100" : "opacity-90"
    }`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white">
      {/* Obere Utility-Leiste */}
      <div
        className="border-b border-slate-300/50"
        style={{ backgroundColor: "#D3EFDE" }}
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
          className="block shrink-0 overflow-visible transition-opacity hover:opacity-80"
        >
          <Image
            src="/img/logo.png"
            alt="HE immologis"
            width={280}
            height={100}
            className="block h-16 w-auto object-contain object-left sm:h-20"
            sizes="(max-width: 640px) 220px, 280px"
            priority
          />
        </Link>

        {/* Nav-Punkte zentriert */}
        <div className="hidden flex-1 justify-center lg:flex">
          <div className="flex flex-nowrap items-center gap-1 xl:gap-2">
            <Link href="/verkaufen" className={navLinkClass("/verkaufen")}>
              Verkaufen
            </Link>
            <Link href="/kaufen" className={navLinkClass("/kaufen")}>
              Kaufen
            </Link>
            <Link href="/mieten" className={navLinkClass("/mieten")}>
              Mieten
            </Link>
            <Link
              href="/immobilien-services"
              className={navLinkClass("/immobilien-services")}
            >
              Service
            </Link>
            <Link
              href="/immobilie-suchen"
              className={navLinkClass("/immobilie-suchen")}
            >
              Suchen
            </Link>
            {/* Tipp-Prämie mit Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setTippPraemieOpen(true)}
              onMouseLeave={() => setTippPraemieOpen(false)}
            >
              <button
                type="button"
                className={`flex shrink-0 items-center gap-1 whitespace-nowrap rounded-lg px-3 py-2 text-base font-normal text-black transition-colors hover:opacity-80 ${
                  pathname.startsWith("/geld-verdienen") ? "opacity-100" : "opacity-90"
                }`}
              >
                Tipp-Prämie
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    tippPraemieOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {tippPraemieOpen && (
                <div className="absolute left-0 top-full pt-1">
                  <div className="min-w-[200px] whitespace-nowrap rounded-lg border border-zinc-100 bg-white py-2 shadow-lg">
                    {TIPP_PRAEMIE_SUB.map((item) => (
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

            {/* Logistikberatung mit Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setLogistikOpen(true)}
              onMouseLeave={() => setLogistikOpen(false)}
            >
              <button
                type="button"
                className={`flex shrink-0 items-center gap-1 whitespace-nowrap rounded-lg px-3 py-2 text-base font-normal text-black transition-colors hover:opacity-80 ${
                  pathname.startsWith("/logistikberatung") ? "opacity-100" : "opacity-90"
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
                  <div className="min-w-[320px] whitespace-nowrap rounded-lg border border-zinc-100 bg-white py-2 shadow-lg">
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

            <Link href="/ueber-mich" className={navLinkClass("/ueber-mich")}>
              Über mich
            </Link>
          </div>
        </div>

        {/* Rechts: CTA */}
        <div className="hidden md:block">
          <Link
            href="/ueber-mich#kontakt"
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
              href="/ueber-mich#kontakt"
              onClick={() => setMobileMenuOpen(false)}
              className="flex w-full items-center justify-center rounded-md px-5 py-3 text-sm font-medium text-white transition-colors hover:opacity-90"
              style={{ backgroundColor: "#4682B4" }}
            >
              Jetzt kontaktieren
            </Link>

            <div className="flex flex-col gap-1">
                <Link
                  href="/verkaufen"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg px-4 py-3 text-base font-normal text-black hover:bg-zinc-50"
                >
                  Verkaufen
                </Link>
              <Link
                href="/kaufen"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-base font-normal text-black hover:bg-zinc-50"
              >
                Kaufen
              </Link>
              <Link
                href="/mieten"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-base font-normal text-black hover:bg-zinc-50"
              >
                Mieten
              </Link>
              <Link
                href="/immobilien-services"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-base font-normal text-black hover:bg-zinc-50"
              >
                Service
              </Link>
              <Link
                href="/immobilie-suchen"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-base font-normal text-black hover:bg-zinc-50"
              >
                Suchen
              </Link>
              <div className="rounded-lg px-4 py-2">
                <p className="mb-1 text-base font-semibold uppercase tracking-wider text-black">
                  Tipp-Prämie
                </p>
                {TIPP_PRAEMIE_SUB.map((item) => (
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
                href="/ueber-mich"
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
