import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
  description:
    "Impressum und Anbieterkennzeichnung der HE immologis UG – Immobilien und Logistikberatung in Weinheim.",
};

const LEGAL_CONTENT = "mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8";

export default function ImpressumPage() {
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
              <strong>HE immologis UG (haftungsbeschränkt) i. Gr.</strong>
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
            <p className="mt-2">
              Telefon:{" "}
              <a href="tel:+4917632198462" className="text-[#4682B4] underline hover:no-underline">
                0176 321 98 462
              </a>
              <br />
              E-Mail:{" "}
              <a href="mailto:info@he-immologis.de" className="text-[#4682B4] underline hover:no-underline">
                info@he-immologis.de
              </a>
            </p>
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
