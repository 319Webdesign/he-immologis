import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Instagram, Linkedin } from "lucide-react";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white" role="contentinfo">
      {/* Hauptbereich: 4 Spalten */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Spalte 1: Firma & Logo */}
          <div className="flex flex-col">
            <Link href="/" className="-mt-2 mb-4 inline-block">
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
              Ihr Partner für Immobilien und Logistikberatung in Baden-Württemberg & Hessen.
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
                href="https://wa.me/4917632198462"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 transition-colors hover:text-white"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/he-immologis/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 transition-colors hover:text-white"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
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
                  <span>info@he-immologis.de</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Spalte 3: Öffnungszeiten & Rechtliches */}
          <div>
            <h3 className="font-sans text-sm font-semibold uppercase tracking-wider text-white">
              Öffnungszeiten
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li>
                <span className="block font-medium text-white">Mo. – Fr.</span>
                <span className="block pl-0">9:00 Uhr – 18:00 Uhr</span>
              </li>
              <li>
                <span className="block font-medium text-white">Sa.</span>
                <span className="block pl-0">9:00 Uhr – 12:00 Uhr</span>
              </li>
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
                  href="/anbieten"
                  className="text-sm text-slate-300 transition-colors hover:text-white"
                >
                  Verkaufen
                </Link>
              </li>
              <li>
                <Link
                  href="/verkaufen"
                  className="text-sm text-slate-300 transition-colors hover:text-white"
                >
                  Kaufen
                </Link>
              </li>
              <li>
                <Link
                  href="/mieten"
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
                <Link
                  href="/immobilien-services"
                  className="text-sm text-slate-300 transition-colors hover:text-white"
                >
                  Service
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
            <Link
              href="/zertifikate"
              className="text-slate-400 transition-colors hover:text-white"
            >
              Zertifikate
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
