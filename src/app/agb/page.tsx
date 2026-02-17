import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AGB & Widerrufsrecht",
  description:
    "Allgemeine Geschäftsbedingungen und Widerrufsrecht der HE immologis UG – Immobilienvermittlung und Logistikberatung.",
};

const LEGAL_CONTENT = "mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8";

export default function AgbPage() {
  return (
    <article className="bg-white">
      <div className={LEGAL_CONTENT}>
        <h1 className="font-sans text-3xl font-semibold tracking-tight text-slate-900">
          Allgemeine Geschäftsbedingungen (AGB)
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          HE immologis UG (haftungsbeschränkt) i. Gr. · Stand: Februar 2026
        </p>

        <div className="mt-10 space-y-8 text-slate-700">
          <section>
            <h2 className="font-sans text-lg font-semibold text-slate-900">
              § 1 Geltungsbereich
            </h2>
            <p className="mt-2">
              Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen der HE immologis UG (haftungsbeschränkt) i. Gr., Ahornstr. 59, 69469 Weinheim (nachfolgend „Anbieter“), und dem Kunden über die Vermittlung von Immobilien (Kauf, Verkauf, Miete/Pacht), die Wertermittlung von Immobilien sowie die Logistikberatung und damit verbundene Dienstleistungen. Abweichende Bedingungen des Kunden werden nicht anerkannt, sofern der Anbieter nicht ausdrücklich ihrer Geltung schriftlich zugestimmt hat.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-lg font-semibold text-slate-900">
              § 2 Vertragsschluss und Maklertätigkeit
            </h2>
            <p className="mt-2">
              (1) Der Maklervertrag kommt durch schriftliche oder konkludente Auftragserteilung und Annahme durch den Anbieter zustande. Bei Immobilienvermittlung gilt das gesetzliche oder vereinbarte Provisionsmodell (Käufer-/Verkäufer-/Bestellerprinzip) gemäß den jeweils anwendbaren Vorschriften (insbesondere § 656c BGB und landesrechtliche Regelungen).
            </p>
            <p className="mt-2">
              (2) Der Anbieter erbringt seine Leistungen mit der Sorgfalt eines ordentlichen Kaufmanns. Eine Garantie für den Abschluss eines Kauf- oder Mietvertrages wird nicht übernommen.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-lg font-semibold text-slate-900">
              § 3 Provision und Vergütung
            </h2>
            <p className="mt-2">
              (1) Die Höhe der Provision bzw. Vergütung ergibt sich aus der jeweiligen Vereinbarung (Auftrag, Maklervertrag, Honorarvereinbarung). Fehlt eine Vereinbarung, gelten die ortsüblichen Sätze.
            </p>
            <p className="mt-2">
              (2) Die Provision wird mit Abschluss des vermittelten Geschäfts (Kaufvertrag, Mietvertrag o. Ä.) fällig, sofern nicht anders vereinbart. Bei Wertermittlungen und Beratungsleistungen gilt die vereinbarte Vergütung nach Erbringung der Leistung.
            </p>
            <p className="mt-2">
              (3) Rechnungen sind innerhalb der vereinbarten Zahlungsfrist ohne Abzug zahlbar, sofern nicht anders vereinbart.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-lg font-semibold text-slate-900">
              § 4 Mitwirkungspflichten des Kunden
            </h2>
            <p className="mt-2">
              Der Kunde stellt alle für die Durchführung des Auftrags erforderlichen Angaben und Unterlagen wahrheitsgemäß zur Verfügung und informiert den Anbieter unverzüglich über Änderungen. Bei Objektbesichtigungen ist der Kunde für die Einhaltung der vereinbarten Termine verantwortlich.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-lg font-semibold text-slate-900">
              § 5 Haftung
            </h2>
            <p className="mt-2">
              (1) Der Anbieter haftet unbeschränkt für Vorsatz und grobe Fahrlässigkeit sowie für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit.
            </p>
            <p className="mt-2">
              (2) Bei leichter Fahrlässigkeit haftet der Anbieter nur bei Verletzung wesentlicher Vertragspflichten und nur in Höhe des vorhersehbaren, typischerweise eintretenden Schadens. Die Haftung für mittelbare Folgeschäden und entgangenen Gewinn ist ausgeschlossen, soweit nicht zwingend gehaftet wird.
            </p>
          </section>

          <section id="widerruf">
            <h2 className="font-sans text-lg font-semibold text-slate-900">
              § 6 Widerrufsrecht (Verbraucher)
            </h2>
            <p className="mt-2">
              Sofern Sie Verbraucher i. S. d. § 13 BGB sind (also ein Rechtsgeschäft zu einem Zweck abschließen, der weder Ihrer gewerblichen noch Ihrer selbständigen beruflichen Tätigkeit zugerechnet werden kann), steht Ihnen das folgende Widerrufsrecht zu:
            </p>
            <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
              <h3 className="font-sans font-semibold text-slate-900">
                Widerrufsbelehrung
              </h3>
              <p className="mt-2">
                <strong>Widerrufsrecht</strong>
                <br />
                Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsschlusses. Um Ihr Widerrufsrecht auszuüben, müssen Sie uns (HE immologis UG (haftungsbeschränkt) i. Gr., Ahornstr. 59, 69469 Weinheim, E-Mail: info@he-immologis.de, Telefon: 0176 321 98 462) mittels einer eindeutigen Erklärung (z. B. ein mit der Post versandter Brief oder E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren. Sie können dafür das beigefügte Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist. Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.
              </p>
              <p className="mt-2">
                <strong>Folgen des Widerrufs</strong>
                <br />
                Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen Kosten, die sich aus Ihrer Wahl einer anderen Art der Lieferung als der von uns angebotenen, günstigsten Standardlieferung ergeben), unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns eingegangen ist. Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der ursprünglichen Transaktion eingesetzt haben, sofern nicht ausdrücklich mit Ihnen anders vereinbart.
              </p>
              <p className="mt-2">
                <strong>Ende der Widerrufsbelehrung</strong>
              </p>
            </div>
            <p className="mt-2">
              Bei Dienstleistungen: Wenn Sie uns bei Vertragsschluss ausdrücklich zugestimmt haben, dass wir mit der Ausführung der Dienstleistung vor Ende der Widerrufsfrist beginnen, und Sie uns die vollständige Vertragserfüllung bestätigt haben, erlöschen Ihr Widerrufsrecht und Ihre Pflicht zur Zahlung bei vorzeitiger vollständiger Erfüllung.
            </p>
            <p className="mt-2">
              Das Widerrufsrecht besteht nicht bei Verträgen zur Vermittlung von Immobilien, sobald der Makler den Nachweis erbracht hat, dass ein Kauf- oder Mietvertrag zustande gekommen ist, sowie in weiteren gesetzlich geregelten Ausnahmefällen.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-lg font-semibold text-slate-900">
              § 7 Schlussbestimmungen
            </h2>
            <p className="mt-2">
              (1) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.
            </p>
            <p className="mt-2">
              (2) Gerichtsstand für alle Streitigkeiten ist, soweit gesetzlich zulässig, der Sitz des Anbieters (Weinheim).
            </p>
            <p className="mt-2">
              (3) Sollten einzelne Bestimmungen unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.
            </p>
          </section>

          <section className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <h2 className="font-sans text-lg font-semibold text-slate-900">
              Muster-Widerrufsformular
            </h2>
            <p className="mt-2 text-sm">
              Wenn Sie den Vertrag widerrufen wollen, füllen Sie bitte dieses Formular aus und senden Sie es zurück an:
            </p>
            <p className="mt-2 text-sm">
              HE immologis UG (haftungsbeschränkt) i. Gr., Ahornstr. 59, 69469 Weinheim, E-Mail: info@he-immologis.de
            </p>
            <p className="mt-2 text-sm italic">
              Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) am _____________ geschlossenen Vertrag über den Kauf/die Vermittlung folgender Immobilie/folgender Leistung: _____________
              <br /><br />
              Datum: _____________
              <br />
              Unterschrift: _____________
              <br /><br />
              (*) Nicht Zutreffendes streichen.
            </p>
          </section>
        </div>

        <p className="mt-10 text-sm text-slate-500">
          <Link href="/widerruf" className="text-[#4682B4] underline hover:no-underline">
            Widerrufsrecht (kurze Übersicht)
          </Link>
        </p>
      </div>
    </article>
  );
}
