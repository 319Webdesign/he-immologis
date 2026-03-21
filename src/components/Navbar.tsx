"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Phone,
  Mail,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

const LOGISTIKBERATUNG_HREFS = [
  "/logistikberatung",
  "/logistikberatung/schulung",
  "/logistikberatung/ma",
  "/logistikberatung/entscheidernetzwerke",
  "/logistikberatung/interim",
  "/logistikberatung/transportnetzwerkstrategien",
] as const;

const TIPP_PRAEMIE_HREFS = [
  "/geld-verdienen/tipp-geben",
  "/geld-verdienen/flyer-werben",
  "/geld-verdienen/banner",
  "/geld-verdienen/aufsteller",
] as const;

export type NavDict = {
  sell: string;
  buy: string;
  rent: string;
  service: string;
  search: string;
  referralBonus: string;
  referralSub: { label: string }[];
  logistics: string;
  logisticsSub: { label: string }[];
  aboutMe: string;
  contactNow: string;
  menuOpen: string;
  menuClose: string;
  ariaLangSwitchDe: string;
  ariaLangSwitchEn: string;
  ariaLangSwitchTr: string;
  logoAlt: string;
};

type Locale = "de" | "en" | "tr";

interface NavbarProps {
  lang: Locale;
  dict: NavDict;
}

export default function Navbar({ lang, dict }: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logistikOpen, setLogistikOpen] = useState(false);
  const [tippPraemieOpen, setTippPraemieOpen] = useState(false);
  const [mobileTippOpen, setMobileTippOpen] = useState(false);
  const [mobileLogistikOpen, setMobileLogistikOpen] = useState(false);

  const prefix = `/${lang}`;
  const pathWithoutLang = pathname.replace(/^\/(de|en|tr)/, "") || "/";
  const switchToDe = pathWithoutLang === "/" ? "/de" : `/de${pathWithoutLang}`;
  const switchToEn = pathWithoutLang === "/" ? "/en" : `/en${pathWithoutLang}`;
  const switchToTr = pathWithoutLang === "/" ? "/tr" : `/tr${pathWithoutLang}`;

  const utilityLinkClass = (variant: "bar" | "mobile") =>
    variant === "bar"
      ? "flex items-center gap-2 text-xs text-black transition-colors hover:opacity-80"
      : "flex items-center gap-2 text-xs text-black transition-colors hover:opacity-80";

  const utilityLinks = (variant: "bar" | "mobile") => (
    <div className="flex items-center gap-4 lg:gap-2 min-[1200px]:gap-0.5">
      <a href="mailto:info@he-immologis.de" className={utilityLinkClass(variant)}>
        <Mail className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">info@he-immologis.de</span>
      </a>
      <div className="flex items-center gap-4">
        <a href="tel:+491776361394" className={utilityLinkClass(variant)}>
          <Phone className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">+49 177 636 1394</span>
        </a>
        <span className={`${utilityLinkClass(variant)} flex items-center gap-1`} role="group" aria-label={lang === "de" ? dict.ariaLangSwitchDe : lang === "en" ? dict.ariaLangSwitchEn : dict.ariaLangSwitchTr}>
        <span className="flex items-center gap-1 [&_img]:align-middle">
          <Link href={switchToDe} title="Deutsch" className="flex h-4 shrink-0 items-center">
            <Image
              src="/img/flags/de.svg"
              alt=""
              width={24}
              height={16}
              className={`block h-4 w-6 rounded-sm object-contain object-center transition-opacity ${lang === "de" ? "opacity-100 ring-1 ring-slate-500 ring-offset-1" : "opacity-50 hover:opacity-75"}`}
              aria-hidden
            />
          </Link>
          <Link href={switchToEn} title="English" className="flex h-4 shrink-0 items-center">
            <Image
              src="/img/flags/en.svg"
              alt=""
              width={24}
              height={16}
              className={`block h-4 w-6 rounded-sm object-contain object-center transition-opacity ${lang === "en" ? "opacity-100 ring-1 ring-slate-500 ring-offset-1" : "opacity-50 hover:opacity-75"}`}
              aria-hidden
            />
          </Link>
          <Link href={switchToTr} title="Türkçe" className="flex h-4 shrink-0 items-center">
            <Image
              src="/img/flags/tr.svg"
              alt=""
              width={24}
              height={16}
              className={`block h-4 w-6 rounded-sm object-contain object-center transition-opacity ${lang === "tr" ? "opacity-100 ring-1 ring-slate-500 ring-offset-1" : "opacity-50 hover:opacity-75"}`}
              aria-hidden
            />
          </Link>
        </span>
      </span>
      </div>
    </div>
  );

  const navLinkClass = (href: string) =>
    `whitespace-nowrap rounded-lg px-3 py-2 text-base font-normal text-black transition-colors hover:opacity-80 ${
      pathname === href || pathname.startsWith(href + "/") ? "opacity-100" : "opacity-90"
    }`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr] items-center gap-x-4 px-4 pt-2 pb-1 sm:px-6 lg:px-8">
        {/* Zeile 1: Platzhalter (lg) | Utility (E-Mail, Telefon, Flaggen) – Spalte 2, rechtsbündig */}
        <div className="hidden lg:block" aria-hidden />
        <div className="col-start-2 flex min-w-0 justify-end pr-4 text-sm text-black lg:pr-6">
          {utilityLinks("bar")}
        </div>

        {/* Zeile 2: Logo (Spalte 1) | Nav-Punkte + Hamburger (Spalte 2) */}
        <nav className="flex items-center pt-1 pb-1 lg:pt-0 lg:pb-0" aria-label="Hauptnavigation">
          <Link
            href={prefix}
            className="block shrink-0 overflow-visible transition-opacity hover:opacity-80 max-[1240px]:max-w-[180px]"
          >
            <Image
              src="/img/logo-neu.png"
              alt={dict.logoAlt}
              width={320}
              height={90}
              className="block mb-1 h-12 w-auto max-w-full object-contain object-left sm:h-14"
              sizes="(max-width: 640px) 240px, 320px"
              priority
            />
          </Link>
        </nav>

        <div className="flex min-w-0 items-center justify-end gap-2 pt-1 pb-1 pr-4 lg:pr-6 lg:pt-0 lg:pb-0">
          <div className="hidden flex-nowrap items-center gap-1 xl:gap-2 lg:flex">
            <Link href={`${prefix}/verkaufen`} className={navLinkClass(`${prefix}/verkaufen`)}>
              {dict.sell}
            </Link>
            <Link href={`${prefix}/kaufen`} className={navLinkClass(`${prefix}/kaufen`)}>
              {dict.buy}
            </Link>
            <Link href={`${prefix}/mieten`} className={navLinkClass(`${prefix}/mieten`)}>
              {dict.rent}
            </Link>
            <Link
              href={`${prefix}/immobilien-services`}
              className={navLinkClass(`${prefix}/immobilien-services`)}
            >
              {dict.service}
            </Link>

            {/* Tipp-Prämie / Referral Bonus mit Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setTippPraemieOpen(true)}
              onMouseLeave={() => setTippPraemieOpen(false)}
            >
              <button
                type="button"
                className={`flex shrink-0 items-center gap-1 whitespace-nowrap rounded-lg px-3 py-2 text-base font-normal text-black transition-colors hover:opacity-80 ${
                  pathname.includes("/geld-verdienen") ? "opacity-100" : "opacity-90"
                }`}
              >
                {dict.referralBonus}
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    tippPraemieOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {tippPraemieOpen && (
                <div className="absolute left-0 top-full pt-1">
                  <div className="min-w-[200px] whitespace-nowrap rounded-lg border border-zinc-100 bg-white py-2 shadow-lg">
                    {dict.referralSub.map((item, i) => (
                      <Link
                        key={item.label}
                        href={`${prefix}${TIPP_PRAEMIE_HREFS[i]}`}
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
                  pathname.includes("/logistikberatung") ? "opacity-100" : "opacity-90"
                }`}
              >
                {dict.logistics}
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    logistikOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {logistikOpen && (
                <div className="absolute left-0 top-full pt-1">
                  <div className="min-w-[320px] whitespace-nowrap rounded-lg border border-zinc-100 bg-white py-2 shadow-lg">
                    {dict.logisticsSub.map((item, i) => (
                      <Link
                        key={item.label}
                        href={`${prefix}${LOGISTIKBERATUNG_HREFS[i]}`}
                        className="block px-4 py-2 text-sm text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-900"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link href={`${prefix}/ueber-mich`} className={navLinkClass(`${prefix}/ueber-mich`)}>
              {dict.aboutMe}
            </Link>
            <Link
              href={`${prefix}/ueber-mich#kontakt`}
              className={`${navLinkClass(`${prefix}/ueber-mich#kontakt`)} pr-0`}
            >
              {dict.contactNow}
            </Link>
          </div>

          <button
            type="button"
            className="rounded-lg p-2 text-zinc-600 transition-colors hover:bg-zinc-100 lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? dict.menuClose : dict.menuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menü */}
      {mobileMenuOpen && (
        <div className="border-t border-zinc-100 bg-white lg:hidden max-h-[calc(100vh-7.5rem)] overflow-y-auto overscroll-contain">
          <div className="space-y-2 px-4 py-4 pb-8">
            <div className="flex flex-col gap-1">
                <Link
                  href={`${prefix}/verkaufen`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg px-4 py-3 text-base font-semibold text-black hover:bg-zinc-50"
                >
                  {dict.sell}
                </Link>
              <Link
                href={`${prefix}/kaufen`}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-base font-semibold text-black hover:bg-zinc-50"
              >
                {dict.buy}
              </Link>
              <Link
                href={`${prefix}/mieten`}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-base font-semibold text-black hover:bg-zinc-50"
              >
                {dict.rent}
              </Link>
              <Link
                href={`${prefix}/immobilien-services`}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-base font-semibold text-black hover:bg-zinc-50"
              >
                {dict.service}
              </Link>
              <Link
                href={`${prefix}/ueber-mich#kontakt`}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-base font-semibold text-black hover:bg-zinc-50"
              >
                {dict.contactNow}
              </Link>
              <div className="rounded-lg">
                <button
                  type="button"
                  onClick={() => setMobileTippOpen((o) => !o)}
                  className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-base font-semibold text-black hover:bg-zinc-50"
                  aria-expanded={mobileTippOpen}
                >
                  <span className="font-semibold">{dict.referralBonus}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 transition-transform ${mobileTippOpen ? "rotate-180" : ""}`}
                    aria-hidden
                  />
                </button>
                {mobileTippOpen && (
                  <div className="flex flex-col gap-0 pl-2 pb-2">
                    {dict.referralSub.map((item, i) => (
                      <Link
                        key={item.label}
                        href={`${prefix}${TIPP_PRAEMIE_HREFS[i]}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="rounded-lg px-3 py-2 text-base font-normal text-black hover:bg-zinc-50"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <div className="rounded-lg">
                <button
                  type="button"
                  onClick={() => setMobileLogistikOpen((o) => !o)}
                  className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-base font-semibold text-black hover:bg-zinc-50"
                  aria-expanded={mobileLogistikOpen}
                >
                  <span className="font-semibold">{dict.logistics}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 transition-transform ${mobileLogistikOpen ? "rotate-180" : ""}`}
                    aria-hidden
                  />
                </button>
                {mobileLogistikOpen && (
                  <div className="flex flex-col gap-0 pl-2 pb-2">
                    {dict.logisticsSub.map((item, i) => (
                      <Link
                        key={item.label}
                        href={`${prefix}${LOGISTIKBERATUNG_HREFS[i]}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="rounded-lg px-3 py-2 text-base font-normal text-black hover:bg-zinc-50"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <Link
                href={`${prefix}/ueber-mich`}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-base font-semibold text-black hover:bg-zinc-50"
              >
                {dict.aboutMe}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
