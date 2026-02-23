import type { Metadata } from "next";

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
      title: "Imprint",
      description:
        "Imprint and provider identification of HE immologis UG – Real estate and logistics consulting in Weinheim.",
    };
  }
  return {
    title: "Impressum",
    description:
      "Impressum und Anbieterkennzeichnung der HE immologis UG – Immobilien und Logistikberatung in Weinheim.",
  };
}

export default async function ImpressumPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = isValidLocale(rawLang) ? rawLang : "de";
  const isEn = lang === "en";

  if (isEn) {
    return (
      <article className="bg-white">
        <div className={LEGAL_CONTENT}>
          <h1 className="font-sans text-3xl font-semibold tracking-tight text-slate-900">
            Imprint
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Information in accordance with § 5 TMG (German Teleservices Act)
          </p>

          <div className="mt-10 space-y-8 text-slate-700">
            <section>
              <h2 className="font-sans text-lg font-semibold text-slate-900">
                Provider
              </h2>
              <p className="mt-2">
                <strong>HE immologis UG</strong>
                <br />
                <span className="text-base font-normal">(haftungsbeschränkt) i. Gr.</span>
                <br />
                Ahornstr. 59
                <br />
                69469 Weinheim
              </p>
            </section>

            <section>
              <h2 className="font-sans text-lg font-semibold text-slate-900">
                Represented by
              </h2>
              <p className="mt-2">
                Holger Eberhard (Managing Director)
              </p>
            </section>

            <section>
              <h2 className="font-sans text-lg font-semibold text-slate-900">
                Contact
              </h2>
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
                Commercial Register
              </h2>
              <p className="mt-2">
                Register court: Local Court (Amtsgericht) Mannheim
                <br />
                Registration number: HRB 755995
              </p>
            </section>

            <section>
              <h2 className="font-sans text-lg font-semibold text-slate-900">
                VAT Identification Number
              </h2>
              <p className="mt-2">
                VAT identification number in accordance with § 27a of the German VAT Act (UStG):
                <br />
                [VAT ID to be added if applicable]
              </p>
            </section>

            <section>
              <h2 className="font-sans text-lg font-semibold text-slate-900">
                Professional Title and Professional Regulations
              </h2>
              <p className="mt-2">
                Professional title: Real estate agent / Real estate broker
                <br />
                Supervisory body: [e.g. Chamber of Commerce and Industry or relevant professional body – to be added if applicable]
              </p>
            </section>

            <section>
              <h2 className="font-sans text-lg font-semibold text-slate-900">
                Responsible for Content pursuant to § 55 Abs. 2 RStV (German Interstate Broadcasting Treaty)
              </h2>
              <p className="mt-2">
                Holger Eberhard
                <br />
                Ahornstr. 59, 69469 Weinheim
              </p>
            </section>

            <section>
              <h2 className="font-sans text-lg font-semibold text-slate-900">
                EU Dispute Resolution
              </h2>
              <p className="mt-2">
                The European Commission provides a platform for online dispute resolution (ODR):{" "}
                <a
                  href="https://ec.europa.eu/consumers/odr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#4682B4] underline hover:no-underline"
                >
                  https://ec.europa.eu/consumers/odr
                </a>
                . We are neither obliged nor willing to participate in dispute resolution proceedings before a consumer arbitration board.
              </p>
            </section>

            <section>
              <h2 className="font-sans text-lg font-semibold text-slate-900">
                Liability for Content
              </h2>
              <p className="mt-2">
                As a service provider we are responsible for our own content on these pages in accordance with § 7 (1) TMG and the general laws. In accordance with §§ 8 to 10 TMG, we are not obliged as a service provider to monitor third-party information transmitted or stored or to investigate circumstances that indicate illegal activity. Obligations to remove or block the use of information under the general laws remain unaffected. However, liability in this regard is only possible from the time of knowledge of a specific legal violation. Upon becoming aware of corresponding legal violations we will remove such content immediately.
              </p>
            </section>

            <section>
              <h2 className="font-sans text-lg font-semibold text-slate-900">
                Liability for Links
              </h2>
              <p className="mt-2">
                Our website contains links to external third-party websites over whose content we have no influence. We therefore cannot assume any liability for this external content. The respective provider or operator of the linked pages is always responsible for the content of the linked pages. The linked pages were checked for possible legal violations at the time of linking. Illegal content was not recognisable at the time of linking. However, permanent monitoring of the content of the linked pages is not reasonable without concrete evidence of a legal violation. Upon becoming aware of legal violations we will remove such links immediately.
              </p>
            </section>

            <section>
              <h2 className="font-sans text-lg font-semibold text-slate-900">
                Copyright
              </h2>
              <p className="mt-2">
                The content and works created by the site operators on these pages are subject to German copyright law. Reproduction, editing, distribution and any kind of use outside the limits of copyright law require the written consent of the respective author or creator. Downloads and copies of this site are only permitted for private, non-commercial use. In so far as the content on this site was not created by the operator, the copyright of third parties is respected. In particular, third-party content is marked as such. Should you nevertheless become aware of a copyright infringement we ask that you notify us accordingly. Upon becoming aware of legal violations we will remove such content immediately.
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
          Impressum
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Angaben gemäß § 5 TMG
        </p>

        <div className="mt-10 space-y-8 text-slate-700">
          <section>
            <h2 className="font-sans text-lg font-semibold text-slate-900">
              Anbieter
            </h2>
            <p className="mt-2">
              <strong>HE immologis UG</strong>
              <br />
              <span className="text-base font-normal">(haftungsbeschränkt) i. Gr.</span>
              <br />
              Ahornstr. 59
              <br />
              69469 Weinheim
            </p>
          </section>

          <section>
            <h2 className="font-sans text-lg font-semibold text-slate-900">
              Vertreten durch
            </h2>
            <p className="mt-2">
              Holger Eberhard (Geschäftsführer)
            </p>
          </section>

          <section>
            <h2 className="font-sans text-lg font-semibold text-slate-900">
              Kontakt
            </h2>
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
              Registereintrag
            </h2>
            <p className="mt-2">
              Registergericht: Amtsgericht Mannheim
              <br />
              Registernummer: HRB 755995
            </p>
          </section>

          <section>
            <h2 className="font-sans text-lg font-semibold text-slate-900">
              Umsatzsteuer-ID
            </h2>
            <p className="mt-2">
              Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG:
              <br />
              [USt-IdNr. wird bei Bedarf ergänzt]
            </p>
          </section>

          <section>
            <h2 className="font-sans text-lg font-semibold text-slate-900">
              Berufsbezeichnung und berufsrechtliche Regelungen
            </h2>
            <p className="mt-2">
              Berufsbezeichnung: Immobilienmakler / Immobilienvermittler
              <br />
              Zuständige Kammer: [z. B. Industrie- und Handelskammer oder zuständige Berufskammer – bei Bedarf ergänzen]
            </p>
          </section>

          <section>
            <h2 className="font-sans text-lg font-semibold text-slate-900">
              Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
            </h2>
            <p className="mt-2">
              Holger Eberhard
              <br />
              Ahornstr. 59, 69469 Weinheim
            </p>
          </section>

          <section>
            <h2 className="font-sans text-lg font-semibold text-slate-900">
              EU-Streitschlichtung
            </h2>
            <p className="mt-2">
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#4682B4] underline hover:no-underline"
              >
                https://ec.europa.eu/consumers/odr
              </a>
              . Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-lg font-semibold text-slate-900">
              Haftung für Inhalte
            </h2>
            <p className="mt-2">
              Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-lg font-semibold text-slate-900">
              Haftung für Links
            </h2>
            <p className="mt-2">
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-lg font-semibold text-slate-900">
              Urheberrecht
            </h2>
            <p className="mt-2">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
