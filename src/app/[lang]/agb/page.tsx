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
      title: "Terms and Conditions & Right of Withdrawal",
      description:
        "General Terms and Conditions and right of withdrawal of HE immologis UG – Real estate brokerage and logistics consulting.",
    };
  }
  return {
    title: "AGB & Widerrufsrecht",
    description:
      "Allgemeine Geschäftsbedingungen und Widerrufsrecht der HE immologis UG – Immobilienvermittlung und Logistikberatung.",
  };
}

export default async function AgbPage({
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
          <p className="text-sm text-slate-600">
            HE immologis UG (haftungsbeschränkt) i. Gr. · Ahornstr. 59 · 69469 Weinheim
          </p>
          <h1 className="mt-4 font-sans text-3xl font-semibold tracking-tight text-slate-900">
            General Terms and Conditions
          </h1>
          <p className="mt-1 font-sans text-lg text-slate-700">
            of HE immologis UG (haftungsbeschränkt) i. Gr.
          </p>

          <div className="mt-10 space-y-8 text-slate-700">
            <section>
              <h2 className="font-sans text-lg font-semibold text-slate-900">
                Preliminary Note
              </h2>
              <p className="mt-2">
                These General Terms and Conditions form the basis for HE immologis UG (haftungsbeschränkt) i. Gr. in its business dealings with its clients. They simplify, expedite and standardise the conclusion of contracts through a pre-formulated set of rules. For merchants within the meaning of the German Commercial Code (HGB), they also apply to future business relationships without the need for express agreement.
              </p>
            </section>

            <section>
              <h2 className="font-sans text-lg font-semibold text-slate-900">
                §1 Confidentiality & Disclosure to Third Parties
              </h2>
              <p className="mt-2">
                All information and documents provided by HE immologis UG (haftungsbeschränkt) i. Gr., including property details, are intended solely for our client and may only be passed on to third parties with the written consent of HE immologis UG (haftungsbeschränkt) i. Gr. Breaches of this obligation may render the person passing on the information liable for damages in the event that a main contract (lease or purchase agreement) is concluded. If a contract is consequently concluded with the third party, the client shall owe HE immologis UG (haftungsbeschränkt) i. Gr. the agreed commission. The client reserves the right to prove that HE immologis UG (haftungsbeschränkt) i. Gr. has suffered no loss or a lesser loss.
              </p>
            </section>

            <section>
              <h2 className="font-sans text-lg font-semibold text-slate-900">
                §2 Data Protection
              </h2>
              <p className="mt-2">
                The client expressly agrees that HE immologis UG (haftungsbeschränkt) i. Gr. is authorised to process the client’s personal data as necessary for the performance of its obligations in accordance with the applicable legal provisions.
              </p>
            </section>

            <section>
              <h2 className="font-sans text-lg font-semibold text-slate-900">
                §3 Limitation of Liability
              </h2>
              <p className="mt-2">
                HE immologis UG (haftungsbeschränkt) i. Gr. points out that the property information, documents, plans etc. passed on by HE immologis UG (haftungsbeschränkt) i. Gr. originate from the seller or landlord. HE immologis UG (haftungsbeschränkt) i. Gr. therefore does not assume any liability or warranty for the accuracy or completeness of such information. It is the responsibility of the client of HE immologis UG (haftungsbeschränkt) i. Gr. to verify the accuracy of the property information and details contained therein. HE immologis UG (haftungsbeschränkt) i. Gr. shall only be liable in cases of intent, gross negligence, absence of guaranteed characteristics or culpable breach of a fundamental contractual obligation. Otherwise, the statutory limitation periods apply. If the client is a merchant, claims for damages shall become time-barred after three years from their accrual, at the latest three years after termination of the mandate. Otherwise, the statutory provisions apply.
              </p>
            </section>

            <section>
              <h2 className="font-sans text-lg font-semibold text-slate-900">
                §4 Dual Agency
              </h2>
              <p className="mt-2">
                Acting for remuneration for both parties to the contract is expressly permitted. HE immologis UG (haftungsbeschränkt) i. Gr. may also act on a commission basis for the other party in relation to transactions aimed at concluding a purchase agreement. If dual agency is anticipated, the other party will be separately informed of this before conclusion of the respective brokerage agreement. In the case of mandates for rental or tenancy searches, dual agency is excluded from the outset, unless the parties have agreed otherwise in advance.
              </p>
            </section>

            <section>
              <h2 className="font-sans text-lg font-semibold text-slate-900">
                §5 Engagement of Additional Brokers
              </h2>
              <p className="mt-2">
                HE immologis UG (haftungsbeschränkt) i. Gr. is entitled to engage one or more additional brokers to fulfil the mandate.
              </p>
            </section>

            <section id="widerruf">
              <h2 className="font-sans text-lg font-semibold text-slate-900">
                §6 Right of Withdrawal
              </h2>
              <p className="mt-2">
                If the client is a consumer within the meaning of § 13 of the German Civil Code (BGB) and the brokerage agreement is concluded away from business premises or by means of distance communication (e.g. by email, telephone, online form), the client has a statutory right of withdrawal.
              </p>
              <p className="mt-2">
                The client has the right to withdraw from this contract within fourteen (14) days without giving any reason.
              </p>
              <p className="mt-2">
                The withdrawal period is fourteen days from the day of conclusion of the contract.
              </p>
              <p className="mt-2">
                To exercise the right of withdrawal, the client must inform HE immologis UG (haftungsbeschränkt) i. Gr., Ahornstr. 59, 69469 Weinheim, email info@he-immologis.de, mobile +49 176 321 98 462, of the decision to withdraw from this contract by means of a clear statement (e.g. by letter or email). The client may use the model withdrawal form provided for this purpose, although its use is not mandatory.
              </p>
              <p className="mt-2">
                To comply with the withdrawal period, it is sufficient for the client to send the notification of exercise of the right of withdrawal before the expiry of the withdrawal period.
              </p>
              <h3 className="mt-4 font-sans text-base font-semibold text-slate-900">
                Consequences of Withdrawal
              </h3>
              <p className="mt-2">
                If the client withdraws from this contract, HE immologis UG (haftungsbeschränkt) i. Gr. shall reimburse all payments received from the client without undue delay and at the latest within fourteen days of the day on which the notification of withdrawal from this contract was received.
              </p>
              <p className="mt-2">
                If the client has expressly requested that the brokerage services commence during the withdrawal period, the client shall pay HE immologis UG (haftungsbeschränkt) i. Gr. a reasonable amount corresponding to the proportion of services already provided by the time of withdrawal in relation to the total scope of the services contractually agreed.
              </p>
              <p className="mt-2">
                The right of withdrawal expires prematurely in the case of a contract for the provision of services if the service has been fully performed and performance of the service only began after the client had given express consent and had at the same time acknowledged that he or she would lose the right of withdrawal upon full performance of the contract.
              </p>
            </section>

            <section>
              <h2 className="font-sans text-lg font-semibold text-slate-900">
                §7 Contact with the Property Owner
              </h2>
              <p className="mt-2">
                Contact with the property owner must always be initiated through HE immologis UG (haftungsbeschränkt) i. Gr.
              </p>
            </section>

            <section>
              <h2 className="font-sans text-lg font-semibold text-slate-900">
                §8 Property Details / Exposé
              </h2>
              <p className="mt-2">
                Property details and exposés are based on information provided by the owner or client. Only the respective provider of the information is liable for information supplied by the owner or client, including towards third parties. HE immologis UG (haftungsbeschränkt) i. Gr. therefore does not assume any liability or warranty for the accuracy and completeness of the details.
              </p>
            </section>

            <section>
              <h2 className="font-sans text-lg font-semibold text-slate-900">
                §9 Commission
              </h2>
              <p className="mt-2">
                HE immologis UG (haftungsbeschränkt) i. Gr.’s claim to commission arises upon conclusion of the legally effective main contract or a contract-like commitment (e.g. preliminary contract, contractual offer, right of first refusal or service contract for brokerage), provided that commission has been agreed and is not in conflict with statutory requirements.
              </p>
              <p className="mt-2">
                Commission is earned and due as soon as the main contract (lease or purchase agreement) has been concluded. In the case of a purchase agreement for a property, the commission rates of the respective federal state apply. In Baden-Württemberg, a commission claim arises: of 3.57% including statutory VAT each for the buyer and for the seller.
              </p>
              <p className="mt-2">
                In the case of a lease as the main contract, commission is only payable by the tenant seeking accommodation if HE immologis UG (haftungsbeschränkt) i. Gr. obtained the rental offer exclusively due to the mandate of the tenant and commission was agreed in advance. If the mandate was given by the landlord or was also placed by the landlord, HE immologis UG (haftungsbeschränkt) i. Gr. may only claim commission from the landlord if agreed accordingly in advance. It is payable within ten days of invoicing. If our proof or brokerage activity results in the desired main contract, both the amount of the commission and the respective payment by the client are determined by the location of the property and the local customary commission or the provisions of § 3(2) of the Act on the Regulation of Housing Brokerage (limitation to two months’ rent plus statutory VAT), unless a different commission rate is expressly stated in the respective offer.
              </p>
              <ul className="mt-2 list-inside list-disc space-y-1">
                <li>for rental or lease, the commission upon contract conclusion is 2.38 months’ rent/lease incl. VAT for the landlord/lessor</li>
                <li>for commercial property 3.57 months’ rent/lease incl. VAT for the tenant/lessee.</li>
              </ul>
              <p className="mt-2">
                A reservation and effort fee of 10% of the agreed brokerage commission is charged for reservations. If the notarial purchase agreement is concluded, the advance payment is offset. If the purchase agreement is not concluded, the fee remains with HE immologis UG (haftungsbeschränkt) i. Gr. as remuneration for the services provided. Commission becomes due upon conclusion of the purchase, lease or tenancy agreement. Commission is calculated on the basis of the proven or brokered contract. If no contract is submitted, calculation is based on the offer data.
              </p>
              <p className="mt-2">
                Resale, subletting and subleasing remain reserved.
              </p>
            </section>

            <section>
              <h2 className="font-sans text-lg font-semibold text-slate-900">
                §10 Continuation of Commission Claim
              </h2>
              <p className="mt-2">
                The commission claim remains in force even if the contract is terminated due to a resolutive condition, a right of rescission or for other reasons.
              </p>
            </section>

            <section>
              <h2 className="font-sans text-lg font-semibold text-slate-900">
                §11 Transactions with Relatives or Connected Third Parties
              </h2>
              <p className="mt-2">
                The commission claim also arises if a family member or an economically connected third party concludes the contract instead of the client.
              </p>
            </section>

            <section>
              <h2 className="font-sans text-lg font-semibold text-slate-900">
                §12 Attendance at Notarial Appointment
              </h2>
              <p className="mt-2">
                HE immologis UG (haftungsbeschränkt) i. Gr. is entitled to attend the notarial execution of the contract.
              </p>
            </section>

            <section>
              <h2 className="font-sans text-lg font-semibold text-slate-900">
                §13 Proof or Brokerage Activity
              </h2>
              <p className="mt-2">
                Unless otherwise agreed in writing, HE immologis UG (haftungsbeschränkt) i. Gr. provides proof or brokerage services. Proof activity is limited to the naming and description of a specific property.
              </p>
            </section>

            <section>
              <h2 className="font-sans text-lg font-semibold text-slate-900">
                §14 Follow-on Transactions
              </h2>
              <p className="mt-2">
                HE immologis UG (haftungsbeschränkt) i. Gr. also has a claim to commission in respect of follow-on transactions concluded within a temporal and economic context from the original contract. A follow-on transaction exists when an extension or modification of the concluded contract opportunity occurs.
              </p>
            </section>

            <section>
              <h2 className="font-sans text-lg font-semibold text-slate-900">
                §15 Default of Payment
              </h2>
              <p className="mt-2">
                In the event of default of payment, the client shall owe default interest at 5% above the base rate, but at least 6%. If no consumer is involved, the interest rate is at least 8% above the base rate. The base rate is adjusted semi-annually on 1 January and 1 July of each year by the Deutsche Bundesbank. In accordance with BGB § 288, the rate for default interest is linked to the current base rate. The client reserves the right to prove that a lesser loss was suffered.
              </p>
            </section>

            <section>
              <h2 className="font-sans text-lg font-semibold text-slate-900">
                §16 Proof or Brokerage Activity
              </h2>
              <p className="mt-2">
                Unless otherwise agreed in writing, HE immologis UG (haftungsbeschränkt) i. Gr. provides proof or brokerage services. Proof activity is limited to the naming and description of a specific property.
              </p>
            </section>

            <section>
              <h2 className="font-sans text-lg font-semibold text-slate-900">
                §17 Prior Knowledge of the Property
              </h2>
              <p className="mt-2">
                If the client is already aware of the property proved to them, they must notify HE immologis UG (haftungsbeschränkt) i. Gr. thereof in writing without undue delay, at the latest within 5 working days, and provide evidence. If the client fails to give such notification, the property shall be deemed unknown.
              </p>
              <p className="mt-2">
                The client is obliged to inform HE immologis UG (haftungsbeschränkt) i. Gr. whether, when and with whom a contract was concluded and what purchase price or rent or lease was agreed. The contract must be submitted immediately after conclusion. HE immologis UG (haftungsbeschränkt) i. Gr. is entitled to obtain information from land registries, notaries and other parties involved for this purpose.
              </p>
            </section>

            <section>
              <h2 className="font-sans text-lg font-semibold text-slate-900">
                §18 Prior Knowledge of Property and Owner’s Duty to Enquire
              </h2>
              <p className="mt-2">
                For properties that have been entrusted to HE immologis UG (haftungsbeschränkt) i. Gr. for marketing, the owner is obliged to enquire in writing with HE immologis UG (haftungsbeschränkt) i. Gr. before concluding an intended main contract (in particular purchase or lease agreement), stating the name and full address of the intended contracting party, whether the introduction of this contracting party is attributable to the activity of HE immologis UG (haftungsbeschränkt) i. Gr. The main contract may only be concluded after corresponding information or confirmation has been provided by HE immologis UG (haftungsbeschränkt) i. Gr.
              </p>
            </section>

            <section>
              <h2 className="font-sans text-lg font-semibold text-slate-900">
                §19 Side Agreements
              </h2>
              <p className="mt-2">
                Side agreements require written confirmation by HE immologis UG (haftungsbeschränkt) i. Gr. to be effective.
              </p>
            </section>

            <section>
              <h2 className="font-sans text-lg font-semibold text-slate-900">
                §20 Severability Clause
              </h2>
              <p className="mt-2">
                Should one or more of the foregoing provisions be or become invalid, the validity of the remaining provisions shall not be affected. The invalid provision shall be replaced by the statutory provision in accordance with § 306(2) BGB, provided that continued adherence to the contract does not constitute an unreasonable hardship for either party.
              </p>
            </section>

            <section>
              <h2 className="font-sans text-lg font-semibold text-slate-900">
                §21 Place of Jurisdiction
              </h2>
              <p className="mt-2">
                Where legally permissible, the place of jurisdiction is Weinheim. If our client is a merchant within the meaning of the HGB, Weinheim is also agreed as the place of jurisdiction. German law applies.
              </p>
            </section>

            <p className="mt-8 text-slate-600">
              Weinheim – 18 February 2026
            </p>
          </div>

          <p className="mt-10 text-sm text-slate-500">
            <Link href={`${prefix}/widerruf`} className="text-[#4682B4] underline hover:no-underline">
              Right of withdrawal (short overview)
            </Link>
          </p>
        </div>
      </article>
    );
  }

  // German version (unchanged structure, fix Link to use prefix)
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
              Die HE immologis UG (haftungsbeschränkt) i.Gr. ist berechtigt, einen oder weitere Makler zur Erfüllung des Auftrags hinzuzuziehen.
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
              Um das Widerrufsrecht auszuüben, muss der Auftraggeber der HE immologis UG (haftungsbeschränkt) i. Gr., Ahornstr. 59, 69469 Weinheim, E-Mail info@he-immologis.de, Mobil +49 176 321 98 462, mittels einer eindeutigen Erklärung (z. B. per Brief oder E-Mail) über seinen Entschluss, diesen Vertrag zu widerrufen, informieren. Der Auftraggeber kann dafür das beigefügte Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist.
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
              Die Kontaktaufnahme mit dem Anbieter ist stets über die HE immologis UG (haftungsbeschränkt) i.Gr. einzuleiten.
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
          <Link href={`${prefix}/widerruf`} className="text-[#4682B4] underline hover:no-underline">
            Widerrufsrecht (kurze Übersicht)
          </Link>
        </p>
      </div>
    </article>
  );
}
