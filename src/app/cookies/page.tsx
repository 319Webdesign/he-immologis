import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookie-Richtlinie",
  description:
    "Informationen über die Verwendung von Cookies und vergleichbaren Technologien auf der Website der HE immologis UG.",
};

const LEGAL_CONTENT = "mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8";

export default function CookiesPage() {
  return (
    <article className="bg-white">
      <div className={LEGAL_CONTENT}>
        <h1 className="font-sans text-3xl font-semibold tracking-tight text-slate-900">
          Cookie-Richtlinie
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Stand: Februar 2026
        </p>

        <div className="mt-10 space-y-8 text-slate-700">
          <section>
            <h2 className="font-sans text-lg font-semibold text-slate-900">
              1. Was sind Cookies?
            </h2>
            <p className="mt-2">
              Cookies sind kleine Textdateien, die von Websites auf Ihrem Endgerät (Computer, Tablet, Smartphone) gespeichert werden. Sie dienen dazu, die Nutzung der Website zu ermöglichen oder zu erleichtern, Einstellungen zu speichern oder das Verhalten der Nutzer auszuwerten. Man unterscheidet zwischen technisch notwendigen Cookies, funktionalen Cookies und Cookies zu Analyse- oder Marketingzwecken.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-lg font-semibold text-slate-900">
              2. Welche Cookies setzen wir ein?
            </h2>
            <p className="mt-2">
              Wir setzen auf unserer Website nur solche Cookies ein, die für den Betrieb der Seite erforderlich sind oder für die wir eine Einwilligung eingeholt haben:
            </p>
            <ul className="mt-2 list-inside list-disc space-y-1">
              <li>
                <strong>Technisch notwendige Cookies:</strong> Diese sind für die Grundfunktionen der Website (z. B. Session, Sicherheit, Lastverteilung) erforderlich. Auf sie können wir nicht verzichten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse) bzw. Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung).
              </li>
              <li>
                <strong>Funktionale Cookies:</strong> Sie speichern z. B. Ihre Sprachauswahl oder andere Einstellungen und verbessern die Nutzererfahrung. Sie werden nur mit Ihrer Einwilligung gesetzt (Art. 6 Abs. 1 lit. a DSGVO).
              </li>
              <li>
                <strong>Analyse-Cookies:</strong> Falls wir Dienste zur Analyse des Nutzungsverhaltens (z. B. Besucherzahlen, Herkunft) einsetzen, erfolgt dies nur auf Grundlage Ihrer Einwilligung. Rechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-sans text-lg font-semibold text-slate-900">
              3. Speicherdauer
            </h2>
            <p className="mt-2">
              Die Speicherdauer richtet sich nach dem jeweiligen Cookie. Session-Cookies werden beim Schließen des Browsers gelöscht. Persistente Cookies können je nach Zweck Tage bis mehrere Monate oder Jahre gespeichert bleiben, sofern Sie diese nicht vorher in Ihren Browsereinstellungen löschen.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-lg font-semibold text-slate-900">
              4. Ihre Wahlmöglichkeiten
            </h2>
            <p className="mt-2">
              Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden und diese einzeln oder generell ablehnen. Das Deaktivieren von Cookies kann die Funktionalität unserer Website einschränken. Über die Einstellungen Ihres Browsers können Sie bereits gespeicherte Cookies löschen.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-lg font-semibold text-slate-900">
              5. Weitere Informationen
            </h2>
            <p className="mt-2">
              Weitere Details zur Verarbeitung personenbezogener Daten finden Sie in unserer{" "}
              <Link href="/datenschutz" className="text-[#4682B4] underline hover:no-underline">
                Datenschutzerklärung
              </Link>
              . Bei Fragen wenden Sie sich bitte an:{" "}
              <a href="mailto:info@he-immologis.de" className="text-[#4682B4] underline hover:no-underline">
                info@he-immologis.de
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
