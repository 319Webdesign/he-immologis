import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import SocialIcons from "./SocialIcons";

export type FooterDict = {
  companyLine1: string;
  companyLine2: string;
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
    <footer className="bg-slate-900 text-white" role="contentinfo">
      {/* Hauptbereich: 4 Spalten */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Spalte 1: Firma & Logo */}
          <div className="flex flex-col">
            <Link href={prefix} className="-mt-2 mb-4 inline-block overflow-visible">
              <Image
                src="/img/logo.png"
                alt="HE immologis"
                width={150}
                height={54}
                className="h-11 w-auto max-w-[150px] object-contain object-left brightness-0 invert"
              />
            </Link>
            <p className="font-sans text-lg leading-tight text-white">
              <strong className="font-semibold">{dict.companyLine1}</strong>
              <br />
              <span className="text-base font-normal">{dict.companyLine2}</span>
            </p>
            <p
              className="mt-2 text-sm text-slate-300"
              dangerouslySetInnerHTML={{ __html: dict.partnerText }}
            />
            <div className="mt-4">
              <SocialIcons />
            </div>
            {/* QR-Code & Website-URL: Breite des QR-Codes = Breite des Textes (Grid legt Spalte fest) */}
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
                  alt=""
                  width={144}
                  height={144}
                  className="aspect-square h-auto w-full object-cover"
                />
              </a>
              <span className="text-center text-xs text-slate-300">www.he-immologis.de</span>
            </div>
          </div>

          {/* Spalte 2: Kontakt & Geschäftsführung */}
          <div>
            <h3 className="font-sans text-sm font-semibold uppercase tracking-wider text-white">
              {dict.contact}
            </h3>
            <p className="mt-4 text-sm text-slate-300">
              Holger Eberhard
              <span className="block text-slate-400">{dict.managingDirector}</span>
            </p>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="https://www.google.com/maps/search/Ahornstr.+59,+69469+Weinheim"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-sm text-slate-300 transition-colors hover:text-white"
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                  <span>Ahornstr. 59<br />69469 Weinheim</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+4917632198462"
                  className="flex items-center gap-3 text-sm text-slate-300 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4 shrink-0 text-slate-400" />
                  <span>+49 176 321 98 462</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:eberhard@he-immologis.de"
                  className="flex items-center gap-3 text-sm text-slate-300 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4 shrink-0 text-slate-400" />
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
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li>
                <span className="block font-medium text-white">{dict.openingWeekdays}</span>
                <span className="block pl-0">{dict.openingTime1}</span>
              </li>
              <li>
                <span className="block font-medium text-white">{dict.openingSaturday}</span>
                <span className="block pl-0">{dict.openingTime2}</span>
              </li>
            </ul>
            <div className="mt-6 border-t border-slate-700 pt-4">
              <p className="text-xs text-slate-400">
                {dict.courtInfo}
                <br />
                {dict.vatPlaceholder}
              </p>
            </div>
          </div>

          {/* Spalte 4: Quick Links & Bankverbindung */}
          <div>
            <h3 className="font-sans text-sm font-semibold uppercase tracking-wider text-white">
              {dict.quickLinks}
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href={`${prefix}/verkaufen`}
                  className="text-sm text-slate-300 transition-colors hover:text-white"
                >
                  {dict.sell}
                </Link>
              </li>
              <li>
                <Link
                  href={`${prefix}/kaufen`}
                  className="text-sm text-slate-300 transition-colors hover:text-white"
                >
                  {dict.buy}
                </Link>
              </li>
              <li>
                <Link
                  href={`${prefix}/mieten`}
                  className="text-sm text-slate-300 transition-colors hover:text-white"
                >
                  {dict.rent}
                </Link>
              </li>
              <li>
                <Link
                  href={`${prefix}/immobilie-suchen`}
                  className="text-sm text-slate-300 transition-colors hover:text-white"
                >
                  {dict.search}
                </Link>
              </li>
              <li>
                <Link
                  href={`${prefix}/geld-verdienen/tipp-geben`}
                  className="text-sm text-slate-300 transition-colors hover:text-white"
                >
                  {dict.tipGive}
                </Link>
              </li>
              <li>
                <Link
                  href={`${prefix}/geld-verdienen/banner`}
                  className="text-sm text-slate-300 transition-colors hover:text-white"
                >
                  {dict.bannerAd}
                </Link>
              </li>
              <li>
                <Link
                  href={`${prefix}/geld-verdienen/aufsteller`}
                  className="text-sm text-slate-300 transition-colors hover:text-white"
                >
                  {dict.displayAd}
                </Link>
              </li>
              <li>
                <Link
                  href={`${prefix}/logistikberatung`}
                  className="text-sm text-slate-300 transition-colors hover:text-white"
                >
                  {dict.logistics}
                </Link>
              </li>
              <li>
                <Link
                  href={`${prefix}/immobilien-services`}
                  className="text-sm text-slate-300 transition-colors hover:text-white"
                >
                  {dict.service}
                </Link>
              </li>
              <li>
                <a
                  href="mailto:eberhard@he-immologis.de"
                  className="text-sm text-slate-300 transition-colors hover:text-white"
                >
                  {dict.contactLink}
                </a>
              </li>
            </ul>
            <div className="mt-6 border-t border-slate-700 pt-4">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                {dict.bankDetails}
              </p>
              <p className="mt-2 text-sm text-slate-300">
                Volksbank Kurpfalz eG
                <br />
                <span className="font-mono text-slate-400">
                  IBAN: DE80 8709 2300 0034 1874 79
                </span>
                <br />
                <span className="font-mono text-slate-400">
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
              className="text-slate-400 transition-colors hover:text-white"
            >
              {dict.imprint}
            </Link>
            <Link
              href={`${prefix}/datenschutz`}
              className="text-slate-400 transition-colors hover:text-white"
            >
              {dict.privacy}
            </Link>
            <Link
              href={`${prefix}/agb`}
              className="text-slate-400 transition-colors hover:text-white"
            >
              {dict.gtc}
            </Link>
            <Link
              href={`${prefix}/widerruf`}
              className="text-slate-400 transition-colors hover:text-white"
            >
              {dict.revocation}
            </Link>
            <Link
              href={`${prefix}/cookies`}
              className="text-slate-400 transition-colors hover:text-white"
            >
              {dict.cookies}
            </Link>
            <Link
              href={`${prefix}/zertifikate`}
              className="text-slate-400 transition-colors hover:text-white"
            >
              {dict.certificates}
            </Link>
          </nav>
          <p className="text-center text-xs text-slate-500 sm:text-left">
            {dict.copyright}
          </p>
        </div>
        <div className="border-t border-slate-800">
          <div className="mx-auto flex max-w-7xl justify-center px-4 py-4 sm:px-6 lg:px-8">
            <p className="text-center text-xs text-slate-500">
              {dict.designedBy}{" "}
              <a
                href="https://319webdesign.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold transition-colors hover:opacity-80"
                style={{ color: "#D3EFDE" }}
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
