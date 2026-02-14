import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white" role="contentinfo">
      {/* Hauptbereich: 4 Spalten */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Spalte 1: Firma & Logo */}
          <div className="flex flex-col">
            <Link href="/" className="mb-4 inline-block">
              <Image
                src="/img/logo.png"
                alt="HE immologis"
                width={120}
                height={36}
                className="brightness-0 invert"
              />
            </Link>
            <p className="font-sans text-lg font-semibold text-white">
              HE immologis (haftungsbeschränkt) i. Gr.
            </p>
            <p className="mt-2 text-sm text-slate-300">
              Ihr Partner für Immobilien und Logistik in Hessen.
            </p>
            <div className="mt-4 flex gap-4" aria-label="Social Media">
              <a
                href="https://www.instagram.com/heimmologis/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 transition-colors hover:text-white"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/heimmologis/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 transition-colors hover:text-white"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Spalte 2: Kontakt & Geschäftsführung */}
          <div>
            <h3 className="font-sans text-sm font-semibold uppercase tracking-wider text-white">
              Kontakt
            </h3>
            <p className="mt-4 text-sm text-slate-300">
              Holger Eberhard
              <span className="block text-slate-400">Geschäftsführer</span>
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
                  <span>Ahornstr. 59, 69469 Weinheim</span>
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
                  <span>eberhard@he-immologis.de</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Spalte 3: Öffnungszeiten & Rechtliches */}
          <div>
            <h3 className="font-sans text-sm font-semibold uppercase tracking-wider text-white">
              Öffnungszeiten
            </h3>
            <ul className="mt-4 space-y-1 text-sm text-slate-300">
              <li>Mo. – Fr. 9:00 Uhr – 18:00 Uhr</li>
              <li>Sa. 9:00 Uhr – 12:00 Uhr</li>
            </ul>
            <div className="mt-6 border-t border-slate-700 pt-4">
              <p className="text-xs text-slate-400">
                Amtsgericht Mannheim, HRB 755995
                <br />
                USt.-Ident. [Platzhalter]
              </p>
            </div>
          </div>

          {/* Spalte 4: Quick Links & Bankverbindung */}
          <div>
            <h3 className="font-sans text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/immobilien"
                  className="text-sm text-slate-300 transition-colors hover:text-white"
                >
                  Verkaufen
                </Link>
              </li>
              <li>
                <Link
                  href="/immobilien"
                  className="text-sm text-slate-300 transition-colors hover:text-white"
                >
                  Kaufen
                </Link>
              </li>
              <li>
                <Link
                  href="/immobilien"
                  className="text-sm text-slate-300 transition-colors hover:text-white"
                >
                  Mieten
                </Link>
              </li>
              <li>
                <Link
                  href="/logistik"
                  className="text-sm text-slate-300 transition-colors hover:text-white"
                >
                  Logistik
                </Link>
              </li>
              <li>
                <a
                  href="mailto:eberhard@he-immologis.de"
                  className="text-sm text-slate-300 transition-colors hover:text-white"
                >
                  Kontakt
                </a>
              </li>
            </ul>
            <div className="mt-6 border-t border-slate-700 pt-4">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Bankverbindung
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
            aria-label="Rechtliche Links"
          >
            <Link
              href="/impressum"
              className="text-slate-400 transition-colors hover:text-white"
            >
              Impressum
            </Link>
            <Link
              href="/datenschutz"
              className="text-slate-400 transition-colors hover:text-white"
            >
              Datenschutz
            </Link>
            <Link
              href="/agb"
              className="text-slate-400 transition-colors hover:text-white"
            >
              AGB
            </Link>
          </nav>
          <p className="text-center text-xs text-slate-500 sm:text-left">
            © 2026 HE immologis UG. Alle Rechte vorbehalten.
          </p>
        </div>
        <div className="border-t border-slate-800">
          <div className="mx-auto flex max-w-7xl justify-center px-4 py-4 sm:px-6 lg:px-8">
            <p className="text-center text-xs text-slate-500">
              Designed by{" "}
              <a
                href="https://319webdesign.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-emerald-400 transition-colors hover:text-emerald-300"
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
