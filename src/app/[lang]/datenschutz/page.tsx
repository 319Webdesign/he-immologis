import type { Metadata } from "next";
import Link from "next/link";

const LEGAL_CONTENT = "mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8";

const LOCALES = ["de", "en"] as const;
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
      title: "Privacy Policy",
      description:
        "Privacy policy of HE immologis UG – Information on the processing of your personal data.",
    };
  }
  return {
    title: "Datenschutz",
    description:
      "Datenschutzerklärung der HE immologis UG – Informationen zur Verarbeitung Ihrer personenbezogenen Daten.",
  };
}

export default async function DatenschutzPage({
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
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Last updated: February 2026
          </p>

          <div className="mt-10 space-y-8 text-slate-700">
            <section>
              <h2 className="font-sans text-lg font-semibold text-slate-900">
                1. Data Controller
              </h2>
              <p className="mt-2">
                The controller responsible for data processing on this website is:
              </p>
              <p className="mt-2">
                <strong>HE immologis UG</strong>
                <br />
                <span className="text-base font-normal">(haftungsbeschränkt) i. Gr.</span>
                <br />
                Ahornstr. 59, 69469 Weinheim
              </p>
              <div className="mt-2 grid grid-cols-[auto_1fr] items-baseline gap-x-2 gap-y-0.5">
                <span>Phone:</span>
                <a href="tel:+4917632198462" className="text-[#4682B4] underline hover:no-underline">
                  +49 176 321 98 462
                </a>
                <span>Email:</span>
                <a href="mailto:info@he-immologis.de" className="text-[#4682B4] underline hover:no-underline">
                  info@he-immologis.de
                </a>
              </div>
            </section>

            <section>
              <h2 className="font-sans text-lg font-semibold text-slate-900">
                2. Collection and Storage of Personal Data
              </h2>
              <p className="mt-2">
                When you access our website, your browser automatically sends information to our server. This information is temporarily stored in a so-called log file. The following data is collected, among others:
              </p>
              <ul className="mt-2 list-inside list-disc space-y-1">
                <li>IP address of the requesting device</li>
                <li>Date and time of access</li>
                <li>Name and URL of the requested file</li>
                <li>Website from which access is made (referrer URL)</li>
                <li>Browser used and, if applicable, operating system</li>
              </ul>
              <p className="mt-2">
                We process this data to ensure a smooth connection, for system security and to evaluate the use of our website. The data is not intended to be linked to any specific person and we do not do so.
              </p>
            </section>

            <section>
              <h2 className="font-sans text-lg font-semibold text-slate-900">
                3. Contact and Enquiry Forms
              </h2>
              <p className="mt-2">
                When you contact us via contact form, email or telephone, we process the data you provide (e.g. name, email, telephone number, address, property details) to handle your enquiry and for pre-contractual measures or contract performance (e.g. real estate brokerage, valuation, logistics consulting). The legal basis is Art. 6(1)(b) GDPR and Art. 6(1)(f) GDPR (legitimate interest in processing your enquiry). Data is deleted once it is no longer required for the purpose for which it was processed, unless statutory retention obligations apply.
              </p>
            </section>

            <section>
              <h2 className="font-sans text-lg font-semibold text-slate-900">
                4. Property Enquiries and Client Relationships
              </h2>
              <p className="mt-2">
                In the context of sale, purchase or rental enquiries and when you instruct us as a broker, we process your personal data (e.g. contact details, property information, financing data) for the performance of the contract and to comply with legal obligations (e.g. retention under the German Commercial Code (HGB), GoBD). Data is only passed on to third parties to the extent necessary for contract performance (e.g. cooperation partners, notaries, banks) or on the basis of your consent.
              </p>
            </section>

            <section>
              <h2 className="font-sans text-lg font-semibold text-slate-900">
                5. Cookies and Local Storage
              </h2>
              <p className="mt-2">
                We use cookies and similar technologies on our website where necessary for the operation of the site or where you have given your consent. For details please see our{" "}
                <Link href={`${prefix}/cookies`} className="text-[#4682B4] underline hover:no-underline">
                  Cookie Policy
                </Link>
                .
              </p>
            </section>

            <section>
              <h2 className="font-sans text-lg font-semibold text-slate-900">
                6. Disclosure of Data
              </h2>
              <p className="mt-2">
                Your data is not transmitted to third parties for purposes other than those stated above. Exceptions apply where we are legally obliged to disclose data (e.g. to authorities) or where disclosure is necessary to assert or defend legal claims.
              </p>
            </section>

            <section>
              <h2 className="font-sans text-lg font-semibold text-slate-900">
                7. Your Rights
              </h2>
              <p className="mt-2">
                You have the following rights in relation to your personal data:
              </p>
              <ul className="mt-2 list-inside list-disc space-y-1">
                <li>Right of access (Art. 15 GDPR)</li>
                <li>Right to rectification (Art. 16 GDPR)</li>
                <li>Right to erasure (Art. 17 GDPR)</li>
                <li>Right to restriction of processing (Art. 18 GDPR)</li>
                <li>Right to data portability (Art. 20 GDPR)</li>
                <li>Right to object (Art. 21 GDPR)</li>
                <li>Right to withdraw consent (Art. 7(3) GDPR)</li>
              </ul>
              <p className="mt-2">
                You also have the right to lodge a complaint with a data protection supervisory authority. The competent authority includes the State Commissioner for Data Protection and Freedom of Information of Baden-Württemberg (Landesbeauftragter für den Datenschutz und die Informationsfreiheit Baden-Württemberg).
              </p>
            </section>

            <section>
              <h2 className="font-sans text-lg font-semibold text-slate-900">
                8. Data Security
              </h2>
              <p className="mt-2">
                We implement technical and organisational measures to protect your data against accidental or intentional manipulation, loss, destruction or access by unauthorised persons. Communication via our website may be encrypted using TLS (indicated by „https://“). However, complete protection against all risks cannot be guaranteed.
              </p>
            </section>

            <section>
              <h2 className="font-sans text-lg font-semibold text-slate-900">
                9. Changes to This Policy
              </h2>
              <p className="mt-2">
                We reserve the right to update this privacy policy to reflect changes in the law or in our services. The current version is available on this page.
              </p>
            </section>
          </div>
        </div>
      </article>
    );
  }

  // German version (unchanged)
  return (
    <article className="bg-white">
      <div className={LEGAL_CONTENT}>
        <h1 className="font-sans text-3xl font-semibold tracking-tight text-slate-900">
          Datenschutzerklärung
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Stand: Februar 2026
        </p>

        <div className="mt-10 space-y-8 text-slate-700">
          <section>
            <h2 className="font-sans text-lg font-semibold text-slate-900">
              1. Verantwortlicher
            </h2>
            <p className="mt-2">
              Verantwortlich für die Datenverarbeitung auf dieser Website ist:
            </p>
            <p className="mt-2">
              <strong>HE immologis UG</strong>
              <br />
              <span className="text-base font-normal">(haftungsbeschränkt) i. Gr.</span>
              <br />
              Ahornstr. 59, 69469 Weinheim
            </p>
            <div className="mt-2 grid grid-cols-[auto_1fr] items-baseline gap-x-2 gap-y-0.5">
              <span>Telefon:</span>
              <a href="tel:+4917632198462" className="text-[#4682B4] underline hover:no-underline">
                +49 176 321 98 462
              </a>
              <span>E-Mail:</span>
              <a href="mailto:info@he-immologis.de" className="text-[#4682B4] underline hover:no-underline">
                info@he-immologis.de
              </a>
            </div>
          </section>

          <section>
            <h2 className="font-sans text-lg font-semibold text-slate-900">
              2. Erhebung und Speicherung personenbezogener Daten
            </h2>
            <p className="mt-2">
              Beim Aufruf unserer Website werden durch den Browser auf Ihrem Endgerät automatisch Informationen an den Server gesendet. Diese Informationen werden temporär in einem sogenannten Logfile gespeichert. Erfasst werden u. a.:
            </p>
            <ul className="mt-2 list-inside list-disc space-y-1">
              <li>IP-Adresse des anfragenden Rechners</li>
              <li>Datum und Uhrzeit des Zugriffs</li>
              <li>Name und URL der abgerufenen Datei</li>
              <li>Website, von der aus der Zugriff erfolgt (Referrer-URL)</li>
              <li>verwendeter Browser und ggf. Betriebssystem</li>
            </ul>
            <p className="mt-2">
              Die genannten Daten werden durch uns zu Zwecken der Gewährleistung eines reibungslosen Verbindungsaufbaus, zur Systemsicherheit und zur Auswertung der Nutzung unserer Website verarbeitet. Eine Zuordnung zu einer bestimmten Person ist nicht vorgesehen und erfolgt nicht.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-lg font-semibold text-slate-900">
              3. Kontakt- und Anfrageformulare
            </h2>
            <p className="mt-2">
              Wenn Sie uns per Kontaktformular, E-Mail oder Telefon kontaktieren, verarbeiten wir die von Ihnen angegebenen Daten (z. B. Name, E-Mail, Telefonnummer, Adresse, Objektdaten) zur Bearbeitung Ihrer Anfrage und für die Durchführung vorvertraglicher Maßnahmen bzw. zur Vertragserfüllung (z. B. Immobilienvermittlung, Wertermittlung, Logistikberatung). Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO sowie Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Bearbeitung Ihrer Anfrage). Die Daten werden gelöscht, sobald sie für die Erreichung des Verarbeitungszwecks nicht mehr erforderlich sind, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-lg font-semibold text-slate-900">
              4. Immobilienanfragen und Mandantenverhältnis
            </h2>
            <p className="mt-2">
              Im Rahmen von Verkaufs-, Kauf- oder Mietanfragen sowie bei der Erteilung eines Maklerauftrags verarbeiten wir Ihre personenbezogenen Daten (z. B. Kontaktdaten, Objektangaben, Finanzierungsdaten) zur Durchführung des Vertrages und zur Erfüllung gesetzlicher Pflichten (z. B. Aufbewahrung nach HGB, GoBD). Eine Weitergabe an Dritte erfolgt nur im zur Vertragserfüllung erforderlichen Umfang (z. B. Kooperationspartner, Notare, Banken) oder auf Grundlage Ihrer Einwilligung.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-lg font-semibold text-slate-900">
              5. Cookies und lokale Speicherung
            </h2>
            <p className="mt-2">
              Wir setzen auf unserer Website Cookies und vergleichbare Technologien ein, soweit dies für den Betrieb der Seite erforderlich ist oder Sie hierin eingewilligt haben. Details entnehmen Sie unserer{" "}
              <Link href={`${prefix}/cookies`} className="text-[#4682B4] underline hover:no-underline">
                Cookie-Richtlinie
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="font-sans text-lg font-semibold text-slate-900">
              6. Weitergabe von Daten
            </h2>
            <p className="mt-2">
              Eine Übermittlung Ihrer Daten an Dritte zu anderen als den genannten Zwecken erfolgt nicht. Ausgenommen sind Weitergaben, zu denen wir gesetzlich verpflichtet sind (z. B. an Behörden) oder die zur Geltendmachung oder Verteidigung von Rechtsansprüchen erforderlich sind.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-lg font-semibold text-slate-900">
              7. Ihre Rechte
            </h2>
            <p className="mt-2">
              Sie haben gegenüber uns folgende Rechte hinsichtlich der Sie betreffenden personenbezogenen Daten:
            </p>
            <ul className="mt-2 list-inside list-disc space-y-1">
              <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
              <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
              <li>Recht auf Löschung (Art. 17 DSGVO)</li>
              <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
              <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
              <li>Recht auf Widerspruch (Art. 21 DSGVO)</li>
              <li>Recht auf Widerruf einer Einwilligung (Art. 7 Abs. 3 DSGVO)</li>
            </ul>
            <p className="mt-2">
              Sie haben zudem das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren. Zuständig ist u. a. der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Baden-Württemberg.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-lg font-semibold text-slate-900">
              8. Datensicherheit
            </h2>
            <p className="mt-2">
              Wir setzen technische und organisatorische Maßnahmen ein, um Ihre Daten gegen zufällige oder vorsätzliche Manipulation, Verlust, Zerstörung oder Zugriff unberechtigter Personen zu schützen. Die Kommunikation über unsere Website kann per TLS verschlüsselt werden (erkennbar an „https://“). Eine lückenlose Sicherheit gegen alle Risiken kann jedoch nicht gewährleistet werden.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-lg font-semibold text-slate-900">
              9. Änderungen dieser Erklärung
            </h2>
            <p className="mt-2">
              Wir behalten uns vor, diese Datenschutzerklärung anzupassen, um sie an geänderte Rechtslage oder bei Änderungen unseres Angebots zu aktualisieren. Die jeweils aktuelle Version finden Sie auf dieser Seite.
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
