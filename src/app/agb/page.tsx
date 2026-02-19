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
        <p className="text-sm text-slate-600">
          HE immologis UG (haftungsbeschränkt) i. Gr. · Ahornstr. 59 · 69469 Weinheim
        </p>
        <h1 className="mt-4 font-sans text-3xl font-semibold tracking-tight text-slate-900">
          Allgemeine Geschäftsbedingungen
        </h1>
        <p className="mt-1 font-sans text-lg text-slate-700">
          der HE immologis UG (haftungsbeschränkt) i. Gr.
        </p>

        <div className="mt-10 space-y-8 text-slate-700">
          <section>
            <h2 className="font-sans text-lg font-semibold text-slate-900">
              Vormerkung
            </h2>
            <p className="mt-2">
              Die Allgemeinen Geschäftsbedingungen sind die Grundlage der HE immologis UG (haftungsbeschränkt) i. Gr. für den Geschäftsverkehr mit ihren Kunden. Sie bewirken eine Vereinfachung, Beschleunigung und Standardisierung des Vertragsabschlusses durch ein vorformuliertes Regelwerk. Für Kaufleute im Sinne des HGB gelten sie auch für künftige Geschäftsbeziehungen, ohne dass es einer ausdrücklichen Vereinbarung bedarf.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-lg font-semibold text-slate-900">
              §1 Vertraulichkeit & Weitergabe an Dritte
            </h2>
            <p className="mt-2">
              Alle durch die HE immologis UG (haftungsbeschränkt) i. Gr. erteilten Informationen und Unterlagen inklusive der Objektnachweise sind ausschließlich für unseren Auftraggeber bestimmt und dürfen nur mit schriftlicher Einwilligung von HE immologis UG (haftungsbeschränkt) i. Gr. an Dritte weitergegeben werden. Schuldhafte Zuwiderhandlungen können den Weitergebenden gegebenenfalls im Falle des Zustandekommens eines Hauptvertrages (Miet- oder Kaufvertrages) zu Schadensersatzzahlungen verpflichten. Kommt infolgedessen ein Vertrag mit dem Dritten zustande, schuldet der Auftraggeber der HE immologis UG (haftungsbeschränkt) i. Gr. die vereinbarte Provision. Dem Auftraggeber bleibt der Nachweis vorbehalten, dass der HE immologis UG (haftungsbeschränkt) i. Gr. kein oder ein geringerer Schaden entstanden ist.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-lg font-semibold text-slate-900">
              §2 Datenschutz
            </h2>
            <p className="mt-2">
              Der Auftraggeber erklärt sich ausdrücklich damit einverstanden, dass die HE immologis UG (haftungsbeschränkt) i. Gr. zur Erfüllung Ihrer Verpflichtungen befugt ist, die notwendigen personenbezogenen Daten des Auftraggebers nach Maßgabe der gesetzlichen Regelungen zu verarbeiten.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-lg font-semibold text-slate-900">
              §3 Haftungsbeschränkung
            </h2>
            <p className="mt-2">
              Die HE immologis UG (haftungsbeschränkt) i. Gr. weist darauf hin, dass die von der HE immologis UG (haftungsbeschränkt) i. Gr. weitergegebenen Objektinformationen, Unterlagen, Pläne etc. vom Veräußerer bzw. Vermieter stammen. Eine Haftung beziehungsweise Gewähr für die Richtigkeit oder Vollständigkeit der Angaben übernimmt die HE immologis UG (haftungsbeschränkt) i. Gr. daher nicht. Es obliegt daher an den Kunden der HE immologis UG (haftungsbeschränkt) i. Gr., die darin enthaltenen Objektinformationen und Angaben auf ihre Richtigkeit hin zu überprüfen. Die HE immologis UG (haftungsbeschränkt) i. Gr. haftet nur bei Vorsatz, grober Fahrlässigkeit, dem Fehlen garantierter Eigenschaften oder bei schuldhafter Verletzung einer Kardinalspflicht. Im Übrigen gelten die gesetzlichen Verjährungsvorschriften. Ist der Auftraggeber Kaufmann, verjähren Schadensersatzansprüche in drei Jahren ab Entstehung, spätestens drei Jahre nach Beendigung des Auftrags. Ansonsten gilt die Regelung nach den gesetzlichen Bestimmungen.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-lg font-semibold text-slate-900">
              §4 Doppeltätigkeit
            </h2>
            <p className="mt-2">
              Eine entgeltliche Tätigkeit für beide Vertragsparteien ist ausdrücklich gestattet. Die HE immologis (haftungsbeschränkt) i. Gr. kann im Hinblick auf Geschäftsbeziehungen, die auf einen Kaufvertragsabschluss abzielen, auch für den anderen Vertragspartner provisionspflichtig tätig werden. Sollte sich eine Doppeltätigkeit anbahnen, wird der Vertragspartner hierauf gesondert vor Abschluss des jeweiligen Maklervertrages hingewiesen. Bei Aufträgen als Miet- bzw. Vermietungsgesuch ist eine Doppeltätigkeit von vornherein ganz ausgeschlossen. Es sei denn, dass die Parteien im Vorhinein eine andere Vereinbarung treffen.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-lg font-semibold text-slate-900">
              §5 Einschaltung weitere Makler
            </h2>
            <p className="mt-2">
              Die HE immologis UG (haftungsbeschränkt) i. G. ist berechtigt, einen oder weitere Makler zur Erfüllung des Auftrags hinzuzuziehen.
            </p>
          </section>

          <section id="widerruf">
            <h2 className="font-sans text-lg font-semibold text-slate-900">
              §6 Widerrufsbelehrung
            </h2>
            <p className="mt-2">
              Ist der Auftraggeber Verbraucher im Sinne des § 13 BGB und wird der Maklervertrag außerhalb von Geschäftsräumen oder im Fernabsatz (z. B. per E-Mail, Telefon, Online-Formular) geschlossen, steht dem Auftraggeber ein gesetzliches Widerrufsrecht zu.
            </p>
            <p className="mt-2">
              Der Auftraggeber hat das Recht, binnen vierzehn (14) Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.
            </p>
            <p className="mt-2">
              Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsabschlusses.
            </p>
            <p className="mt-2">
              Um das Widerrufsrecht auszuüben, muss der Auftraggeber der HE immologis UG (haftungsbeschränkt) i. Gr., Ahornstr. 59, 69469 Weinheim, E-Mail info@he-immologis.de, Mobil 0176 321 98 462, mittels einer eindeutigen Erklärung (z. B. per Brief oder E-Mail) über seinen Entschluss, diesen Vertrag zu widerrufen, informieren. Der Auftraggeber kann dafür das beigefügte Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist.
            </p>
            <p className="mt-2">
              Zur Wahrung der Widerrufsfrist reicht es aus, dass die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist abgesendet wird.
            </p>
            <h3 className="mt-4 font-sans text-base font-semibold text-slate-900">
              Folgen des Widerrufs
            </h3>
            <p className="mt-2">
              Widerruft der Auftraggeber diesen Vertrag, hat die HE immologis UG (haftungsbeschränkt) i. Gr. alle Zahlungen, die sie vom Auftraggeber erhalten hat, unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über den Widerruf dieses Vertrags eingegangen ist.
            </p>
            <p className="mt-2">
              Hat der Auftraggeber ausdrücklich verlangt, dass die Maklertätigkeit während der Widerrufsfrist beginnen soll, so hat der Auftraggeber der HE immologis UG (haftungsbeschränkt) i. Gr. einen angemessenen Betrag zu zahlen, der dem Anteil der bis zum Zeitpunkt des Widerrufs bereits erbrachten Leistungen im Vergleich zum Gesamtumfang der vertraglich vorgesehenen Leistungen entspricht.
            </p>
            <p className="mt-2">
              Das Widerrufsrecht erlischt bei einem Vertrag zur Erbringung von Dienstleistungen vorzeitig, wenn die Dienstleistung vollständig erbracht wurde und mit der Ausführung der Dienstleistung erst begonnen wurde, nachdem der Auftraggeber dazu seine ausdrückliche Zustimmung gegeben hat und gleichzeitig seine Kenntnis davon bestätigt hat, dass er sein Widerrufsrecht bei vollständiger Vertragserfüllung verliert.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-lg font-semibold text-slate-900">
              §7 Kontaktaufnahme mit dem Anbieter
            </h2>
            <p className="mt-2">
              Die Kontaktaufnahme mit dem Anbieter ist stets über die HE immologis UG (haftungsbeschränkt) in Gründung einzuleiten.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-lg font-semibold text-slate-900">
              §8 Objektangaben / Exposé
            </h2>
            <p className="mt-2">
              Objektangaben sowie Exposés beruhen auf den vom Anbieter bzw. Auftraggeber erteilten Informationen. Für die vom Anbieter oder Auftraggeber gelieferten Informationen haftet ausschließlich der jeweilige Informationsgeber auch gegenüber Dritten. Eine Haftung bzw. Gewähr für die Richtigkeit und Vollständigkeit der Angaben wird daher von der HE immologis UG (haftungsbeschränkt) i. Gr. nicht übernommen.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-lg font-semibold text-slate-900">
              §9 Provision
            </h2>
            <p className="mt-2">
              Der Provisionsanspruch der HE immologis UG (haftungsbeschränkt) i. Gr. entsteht mit Vertragsabschluss des rechtswirksamen Hautvertrages oder einer vertragsähnlichen Bindung (z. B. Vorvertrag, Vertragsangebot, Vorkaufsrecht oder Dienstvertrag über die Vermittlung), sofern eine Provision vereinbart wurde und nicht zu gesetzlichen Vorgaben in Widerspruch steht.
            </p>
            <p className="mt-2">
              Die Provision ist verdient und fällig, sobald der Hauptvertrag (Miet- oder Kaufvertrag) zustande gekommen ist. Handelt es sich bei dem Hauptvertrag um einen Kaufvertrag einer Immobilie, fallen die Provisionssätze des jeweiligen Bundeslandes an. In Baden-Württemberg entsteht ein Provisionsanspruch: in Höhe von 3,57 % inklusive gesetzlicher MwSt. jeweils für Käufer und für Verkäufer.
            </p>
            <p className="mt-2">
              Handelt es sich bei dem Hauptvertrag zudem um einen Mietvertrag, ist eine Provision von Seiten des Wohnungssuchenden nur dann zu leisten, wenn HE immologis UG (haftungsbeschränkt) i. Gr. ausschließlich wegen des Auftrages des Wohnungssuchenden das Wohnungsangebot eingeholt und eine Provisionspflicht zuvor vereinbart wurde. Ist der Auftrag jedoch vom Vermieter ausgegangen bzw. von diesem ebenfalls gestellt, so kann die HE immologis UG (haftungsbeschränkt) i. Gr. nur von diesem eine Provision einfordern, sofern entsprechend vorher vereinbart. Sie ist innerhalb von zehn Tagen nach Rechnungsstellung zahlbar. Sollte unsere Nachweis- oder Vermittlungstätigkeit der gewünschte Hauptvertrag zustande kommen, sowohl die Höhe der Provision, als auch die jeweilige Zahlung des Auftraggebers richtet sich nach dem Standort der Immobilie und der dort ortsüblichen Provision bzw. den Vorgaben des § 3 Absatz 2 des Gesetzes zur Regelung der Wohnungsvermittlung (Begrenzung auf zwei Monatsmieten zuzüglich der gesetzlichen Umsatzsteuer), soweit in dem jeweiligen Angebot nicht ausdrücklich ein anderer Provisionssatz genannt ist.
            </p>
            <ul className="mt-2 list-inside list-disc space-y-1">
              <li>bei Vermietung oder Verpachtung beträgt die Provision bei Vertragsabschluss 2,38 Monatsmieten/Pacht inkl. MwSt. für den Vermieter/Verpächter</li>
              <li>bei Gewerbe 3,57 Monatsmieten/Pacht inkl. MwSt. für den Mieter/Pächter.</li>
            </ul>
            <p className="mt-2">
              Für Reservierungen wird ein Reservierungs- und Bemühungsentgelt in Höhe von 10 % der vereinbarten Maklerprovision erhoben. Kommt der notarielle Kaufvertrag zustande, wird der Vorschuss verrechnet. Sofern der Kaufvertrag nicht zustande kommt, verbleibt das Entgelt als Vergütung für die Tätigkeit bei der HE immologis UG (haftungsbeschränkt) i. Gr. Die Provision wird mit Abschluss des Kauf-, Miet- oder Pachtvertrages fällig. Die Provisionsabrechnung erfolgt auf Grundlage des nachgewiesenen oder vermittelten Vertrages. Wird kein Vertrag vorgelegt, erfolgt die Berechnung nach den Angebotsdaten.
            </p>
            <p className="mt-2">
              Zwischenverkauf, Zwischenvermietung und Zwischenverpachtung bleiben vorbehalten.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-lg font-semibold text-slate-900">
              §10 Fortbestand des Provisionsanspruchs
            </h2>
            <p className="mt-2">
              Der Provisionsanspruch bleibt bestehen, auch wenn der Vertrag aufgrund einer auflösenden Bedingung, eines Rücktrittsrechts oder aus sonstigen Gründen aufgehoben wird.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-lg font-semibold text-slate-900">
              §11 Geschäfte mit Angehörigen oder verbundenen Dritten
            </h2>
            <p className="mt-2">
              Der Provisionsanspruch entsteht ebenfalls, wenn anstelle des Auftraggebers ein Familienangehöriger oder ein wirtschaftlich verbundener Dritter den Vertrag abschließt.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-lg font-semibold text-slate-900">
              §12 Anwesenheit beim Notartermin
            </h2>
            <p className="mt-2">
              Die HE immologis UG (haftungsbeschränkt) i. Gr. ist berechtigt, am notariellen Vertragsabschluss teilzunehmen.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-lg font-semibold text-slate-900">
              §13 Nachweis- oder Vermittlungstätigkeit
            </h2>
            <p className="mt-2">
              Soweit keine abweichende schriftliche Vereinbarung getroffen wurde, erbringt die HE immologis UG (haftungsbeschränkt) i. Gr. eine Nachweis- oder Vermittlungstätigkeit. Die Nachweistätigkeit beschränkt sich auf die Benennung und Beschreibung eines konkreten Objektes.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-lg font-semibold text-slate-900">
              §14 Folgegeschäft
            </h2>
            <p className="mt-2">
              Ein Provisionsanspruch der HE immologis UG (haftungsbeschränkt) i. Gr. besteht auch bei Folgegeschäften, die innerhalb eines zeitlichen und wirtschaftlichen Zusammenhangs seit dem Ursprungsvertrag abgeschlossen werden. Ein Folgegeschäfts liegt dabei vor, wenn eine Erweiterung oder Veränderung der abgeschlossenen Vertragsgelegenheit eintritt.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-lg font-semibold text-slate-900">
              §15 Zahlungsverzug
            </h2>
            <p className="mt-2">
              Bei Zahlungsverzug schuldet der Auftraggeber Verzugszinsen in Höhe von 5 % über dem Basiszinssatz, mindestens jedoch 6 %. Ist kein Verbraucher beteiligt, beträgt der Zinssatz mindestens 8 % über dem Basiszinssatz. Der Basiszinssatz (oder kurz Basiszins) wird halbjährlich jeweils zum 1. Januar und 1. Juli jedes Jahres durch die Deutsche Bundesbank angepasst. Gemäß BGB § 288 lehnt sich der Zinssatz für Verzugszinsen an den jeweils aktuellen Basiszinssatz an. Dem Auftraggeber bleibt der Nachweis eines geringeren Schadens vorbehalten.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-lg font-semibold text-slate-900">
              §16 Nachweis- oder Vermittlungstätigkeit
            </h2>
            <p className="mt-2">
              Soweit keine abweichende schriftliche Vereinbarung getroffen wurde, erbringt die HE immologis UG (haftungsbeschränkt) i. Gr. eine Nachweis- oder Vermittlungstätigkeit. Die Nachweistätigkeit beschränkt sich auf die Benennung und Beschreibung eines konkreten Objektes.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-lg font-semibold text-slate-900">
              §17 Vorkenntnis des Objekts
            </h2>
            <p className="mt-2">
              Ist dem Auftraggeber das nachgewiesene Objekt bereits bekannt, hat er dies unverzüglich, spätestens innerhalb von 5 Werktagen, schriftlich mitzuteilen und nachzuweisen. Unterlässt der Auftraggeber die Mitteilung, gilt das Objekt als unbekannt.
            </p>
            <p className="mt-2">
              Der Auftraggeber ist verpflichtet mitzuteilen, ob, wann und mit wem ein Vertrag zustande kam sowie welcher Kaufpreis bzw. Miet- oder Pachtzins vereinbart wurde. Der Vertrag ist unmittelbar nach Abschluss vorzulegen. Die HE immologis UG (haftungsbeschränkt) i. Gr. ist berechtigt, hierzu Auskünfte bei Grundbuchämtern, Notaren und sonstigen Beteiligten einzuholen.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-lg font-semibold text-slate-900">
              §18 Vorkenntnis Objekt und Rückfragepflicht des Eigentümers
            </h2>
            <p className="mt-2">
              Für Objekte, die der HE immologis UG (haftungsbeschränkt) i. Gr. zur Vermarktung überlassen wurden, ist der Eigentümer verpflichtet, vor Abschluss eines beabsichtigten Hauptvertrages (insbesondere Kauf- oder Mietvertrag) unter Angabe von Namen und vollständiger Anschrift des vorgesehenen Vertragspartners bei der HE immologis UG (haftungsbeschränkt) i. Gr. schriftlich anzufragen, ob die Zuführung dieses Vertragspartners auf eine Tätigkeit der HE immologis UG (haftungsbeschränkt) i. Gr. zurückzuführen ist. Der Hauptvertrag darf erst nach entsprechender Auskunft bzw. Bestätigung durch die HE immologis UG (haftungsbeschränkt) i. Gr. abgeschlossen werden.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-lg font-semibold text-slate-900">
              §19 Nebenabreden
            </h2>
            <p className="mt-2">
              Nebenabreden bedürfen zu ihrer Wirksamkeit der schriftlichen Bestätigung durch die HE immologis UG (haftungsbeschränkt) i. Gr.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-lg font-semibold text-slate-900">
              §20 Salvatorische Klausel
            </h2>
            <p className="mt-2">
              Sollten eine oder mehrere der vorstehenden Bestimmungen ungültig sein oder werden, so soll die Wirksamkeit der übrigen Bestimmungen hiervon nicht berührt werden. Die unwirksame Bestimmung soll gemäß § 306 Abs. 2 BGB durch die gesetzliche Regelung ersetzt werden, sofern das weitere Festhalten an dem Vertrag keine unzumutbare Härte für eine Vertragspartei darstellt.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-lg font-semibold text-slate-900">
              §21 Gerichtsstand
            </h2>
            <p className="mt-2">
              Soweit gesetzlich zulässig, ist Gerichtsstand Weinheim. Handelt es sich bei unserem Kunden um einen Kaufmann im Sinne des HGB, ist ebenfalls als Gerichtsstand Weinheim vereinbart. Es gilt deutsches Recht.
            </p>
          </section>

          <p className="mt-8 text-slate-600">
            Weinheim – 18. Februar 2026
          </p>
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
