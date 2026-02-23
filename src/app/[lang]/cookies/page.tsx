import type { Metadata } from "next";
import Link from "next/link";

const LEGAL_CONTENT = "mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8";

const LOCALES = ["de", "en", "tr"] as const;
type Locale = (typeof LOCALES)[number];
function isValidLocale(lang: string): lang is Locale {
  return LOCALES.includes(lang as Locale);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = isValidLocale(rawLang) ? rawLang : "de";
  if (lang === "en") {
    return {
      title: "Cookie Policy",
      description:
        "Information on the use of cookies and similar technologies on the website of HE immologis UG.",
    };
  }
  return {
    title: "Cookie-Richtlinie",
    description:
      "Informationen über die Verwendung von Cookies und vergleichbaren Technologien auf der Website der HE immologis UG.",
  };
}

export default async function CookiesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = isValidLocale(rawLang) ? rawLang : "de";
  const isEn = lang === "en";
  const prefix = lang ? `/${lang}` : "";

  if (isEn) {
    return (
      <article className="bg-white">
        <div className={LEGAL_CONTENT}>
          <h1 className="font-sans text-3xl font-semibold tracking-tight text-slate-900">
            Cookie Policy
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Last updated: February 2026
          </p>

          <div className="mt-10 space-y-8 text-slate-700">
            <section>
              <h2 className="font-sans text-lg font-semibold text-slate-900">
                1. What are cookies?
              </h2>
              <p className="mt-2">
                Cookies are small text files that are stored on your device (computer, tablet, smartphone) by websites. They are used to enable or facilitate the use of the website, to save settings or to analyse user behaviour. A distinction is made between technically necessary cookies, functional cookies and cookies used for analysis or marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="font-sans text-lg font-semibold text-slate-900">
                2. Which cookies do we use?
              </h2>
              <p className="mt-2">
                We only use cookies on our website that are necessary for the operation of the site or for which we have obtained your consent:
              </p>
              <ul className="mt-2 list-inside list-disc space-y-1">
                <li>
                  <strong>Technically necessary cookies:</strong> These are required for the basic functions of the website (e.g. session, security, load distribution). We cannot do without them. The legal basis is Art. 6(1)(f) GDPR (legitimate interest) or Art. 6(1)(b) GDPR (contract performance).
                </li>
                <li>
                  <strong>Functional cookies:</strong> They store, for example, your language preference or other settings and improve the user experience. They are only set with your consent (Art. 6(1)(a) GDPR).
                </li>
                <li>
                  <strong>Analytics cookies:</strong> If we use services to analyse usage behaviour (e.g. visitor numbers, origin), this is only done on the basis of your consent. The legal basis is Art. 6(1)(a) GDPR.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-sans text-lg font-semibold text-slate-900">
                3. Storage duration
              </h2>
              <p className="mt-2">
                The storage duration depends on the respective cookie. Session cookies are deleted when you close your browser. Persistent cookies may remain stored for days to several months or years depending on their purpose, unless you delete them earlier in your browser settings.
              </p>
            </section>

            <section>
              <h2 className="font-sans text-lg font-semibold text-slate-900">
                4. Your choices
              </h2>
              <p className="mt-2">
                You can set your browser to notify you when cookies are set and to accept or reject them individually or in general. Disabling cookies may limit the functionality of our website. You can delete cookies that have already been stored via your browser settings.
              </p>
            </section>

            <section>
              <h2 className="font-sans text-lg font-semibold text-slate-900">
                5. Further information
              </h2>
              <p className="mt-2">
                For more details on the processing of personal data, please see our{" "}
                <Link href={`${prefix}/datenschutz`} className="text-[#4682B4] underline hover:no-underline">
                  Privacy Policy
                </Link>
                . If you have any questions, please contact us at:{" "}
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

  // German version (with locale-prefixed link)
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
              <Link href={`${prefix}/datenschutz`} className="text-[#4682B4] underline hover:no-underline">
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
