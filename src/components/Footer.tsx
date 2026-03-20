import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import SocialIcons from "./SocialIcons";

export type FooterDict = {
  partnerText: string;
  contact: string;
  managingDirector: string;
  openingHours: string;
  openingWeekdays: string;
  openingSaturday: string;
  openingTime1: string;
  openingTime2: string;
  courtInfo: string;
  vatPlaceholder: string;
  ourServices: string;
  quickLinks: string;
  sell: string;
  buy: string;
  rent: string;
  search: string;
  tipGive: string;
  bannerAd: string;
  displayAd: string;
  logistics: string;
  service: string;
  contactLink: string;
  socialFacebook: string;
  socialWhatsApp: string;
  socialLinkedIn: string;
  socialEmail: string;
  bankDetails: string;
  legalLinksAria: string;
  imprint: string;
  privacy: string;
  gtc: string;
  revocation: string;
  cookies: string;
  certificates: string;
  copyright: string;
  designedBy: string;
};

type Locale = "de" | "en" | "tr";

interface FooterProps {
  lang: Locale;
  dict: FooterDict;
}

export default function Footer({ lang, dict }: FooterProps) {
  const prefix = `/${lang}`;
  return (
    <footer className="bg-[#54585a] text-white" role="contentinfo">
      {/* Unsere Leistungen: 10 Quickfacts, 5 pro Zeile */}
      <div className="border-b border-slate-700/80">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h2 className="font-sans text-center text-sm font-semibold uppercase tracking-wider text-white mb-6">
            {dict.ourServices}
          </h2>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 md:grid-cols-5 md:gap-y-4 text-sm [&_li]:text-center">
            <li>
              <Link href={`${prefix}/verkaufen`} className="text-slate-100 transition-colors hover:text-white">
                {dict.sell}
              </Link>
            </li>
            <li>
              <Link href={`${prefix}/kaufen`} className="text-slate-100 transition-colors hover:text-white">
                {dict.buy}
              </Link>
            </li>
            <li>
              <Link href={`${prefix}/mieten`} className="text-slate-100 transition-colors hover:text-white">
                {dict.rent}
              </Link>
            </li>
            <li>
              <Link href={`${prefix}/immobilie-suchen`} className="text-slate-100 transition-colors hover:text-white">
                {dict.search}
              </Link>
            </li>
            <li>
              <Link href={`${prefix}/immobilien-services`} className="text-slate-100 transition-colors hover:text-white">
                {dict.service}
              </Link>
            </li>
            <li>
              <Link href={`${prefix}/geld-verdienen/tipp-geben`} className="text-slate-100 transition-colors hover:text-white">
                {dict.tipGive}
              </Link>
            </li>
            <li>
              <Link href={`${prefix}/geld-verdienen/banner`} className="text-slate-100 transition-colors hover:text-white">
                {dict.bannerAd}
              </Link>
            </li>
            <li>
              <Link href={`${prefix}/geld-verdienen/aufsteller`} className="text-slate-100 transition-colors hover:text-white">
                {dict.displayAd}
              </Link>
            </li>
            <li>
              <Link href={`${prefix}/logistikberatung`} className="text-slate-100 transition-colors hover:text-white">
                {dict.logistics}
              </Link>
            </li>
            <li>
              <a href="mailto:eberhard@he-immologis.de" className="text-slate-100 transition-colors hover:text-white">
                {dict.contactLink}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Hauptbereich: 4 Spalten */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 items-start">
          {/* Spalte 1: Firma & Logo */}
          <div className="flex flex-col">
            <Link href={prefix} className="mb-2 inline-block overflow-visible">
              <Image
                src="/img/logo.jpeg"
                alt="HE immologis"
                width={300}
                height={80}
                className="h-11 w-auto max-w-[180px] object-contain object-left"
              />
            </Link>
            <p
              className="mt-1 text-sm text-slate-100"
              dangerouslySetInnerHTML={{ __html: dict.partnerText }}
            />
            <div className="mt-4 inline-grid max-w-[8.5rem] grid-cols-1 gap-1.5 justify-items-center">
              <a
                href="https://www.he-immologis.de"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full min-w-0 overflow-hidden rounded border border-slate-700 bg-white"
                aria-label="Website aufrufen (QR-Code)"
              >
                <Image
                  src="/img/qr-he-immologis.png"
                  alt="QR-Code Website HE-immologis"
                  width={144}
                  height={144}
                  className="aspect-square h-auto w-full object-cover"
                />
              </a>
              <span className="text-center text-xs text-slate-100">www.he-immologis.de</span>
            </div>
          </div>

          {/* Spalte 2: Kontakt & Geschäftsführung */}
          <div>
            <h3 className="font-sans text-sm font-semibold uppercase tracking-wider text-white">
              {dict.contact}
            </h3>
            <p className="mt-4 text-sm text-slate-100">
              Holger Eberhard
              <span className="block text-slate-200">{dict.managingDirector}</span>
            </p>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="https://www.google.com/maps/search/Ahornstr.+59,+69469+Weinheim"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-sm text-slate-100 transition-colors hover:text-white"
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-200" />
                  <span>Ahornstr. 59<br />69469 Weinheim</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+491776361394"
                  className="flex items-center gap-3 text-sm text-slate-100 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4 shrink-0 text-slate-200" />
                  <span>+49 177 636 1394</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:eberhard@he-immologis.de"
                  className="flex items-center gap-3 text-sm text-slate-100 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4 shrink-0 text-slate-200" />
                  <span>info@he-immologis.de</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Spalte 3: Öffnungszeiten & Rechtliches */}
          <div>
            <h3 className="font-sans text-sm font-semibold uppercase tracking-wider text-white">
              {dict.openingHours}
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-100">
              <li>
                <span className="block font-medium text-white">{dict.openingWeekdays}</span>
                <span className="block pl-0">{dict.openingTime1}</span>
              </li>
              <li>
                <span className="block font-medium text-white">{dict.openingSaturday}</span>
                <span className="block pl-0">{dict.openingTime2}</span>
              </li>
            </ul>
          </div>

          {/* Spalte 4: Social Media (Liste) & Bankverbindung */}
          <div>
            <div className="-mt-4">
            <SocialIcons
              variant="list"
              labels={{
                facebook: dict.socialFacebook,
                whatsapp: dict.socialWhatsApp,
                linkedin: dict.socialLinkedIn,
                email: dict.socialEmail,
              }}
            />
            </div>
            <div className="mt-5 border-t border-slate-700 pt-4">
              <h3 className="font-sans text-sm font-semibold uppercase tracking-wider text-white">
                {dict.bankDetails}
              </h3>
              <p className="mt-4 text-sm text-slate-100">
                Volksbank Kurpfalz eG
                <br />
                <span className="font-mono text-slate-200">
                  IBAN: DE80 8709 2300 0034 1874 79
                </span>
                <br />
                <span className="font-mono text-slate-200">
                  BIC: GENODE61WNM
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer-Bottom: Rechtliche Links & Copyright */}
      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
          <nav
            className="flex flex-wrap items-center justify-center gap-6 text-sm"
            aria-label={dict.legalLinksAria}
          >
            <Link
              href={`${prefix}/impressum`}
              className="text-slate-200 transition-colors hover:text-white"
            >
              {dict.imprint}
            </Link>
            <Link
              href={`${prefix}/datenschutz`}
              className="text-slate-200 transition-colors hover:text-white"
            >
              {dict.privacy}
            </Link>
            <Link
              href={`${prefix}/agb`}
              className="text-slate-200 transition-colors hover:text-white"
            >
              {dict.gtc}
            </Link>
            <Link
              href={`${prefix}/widerruf`}
              className="text-slate-200 transition-colors hover:text-white"
            >
              {dict.revocation}
            </Link>
            <Link
              href={`${prefix}/cookies`}
              className="text-slate-200 transition-colors hover:text-white"
            >
              {dict.cookies}
            </Link>
            <Link
              href={`${prefix}/zertifikate`}
              className="text-slate-200 transition-colors hover:text-white"
            >
              {dict.certificates}
            </Link>
          </nav>
          <p className="text-center text-xs text-slate-300 sm:text-left">
            {dict.copyright}
          </p>
        </div>
        <div className="border-t border-slate-800">
          <div className="mx-auto flex max-w-7xl justify-center px-4 py-4 sm:px-6 lg:px-8">
            <p className="text-center text-xs text-slate-300">
              {dict.designedBy}{" "}
              <a
                href="https://319webdesign.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold transition-colors hover:opacity-80"
                style={{ color: "#F9423A" }}
              >
                319Webdesign
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
