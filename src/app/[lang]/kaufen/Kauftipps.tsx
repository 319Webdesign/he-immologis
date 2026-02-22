"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export type KaufenKauftippsDict = {
  heading: string;
  intro: string;
  tipTitles: string[];
  tipContents?: string[];
};

const KAUFTIPPS_DE: { title: string; content: string | React.ReactNode }[] = [
  {
    title: "Erstgespräch",
    content: (
      <div className="space-y-5">
        <p>
          Der Kauf einer Immobilie gehört zu den wichtigsten Entscheidungen im Leben.
          Neben Emotionen spielen rechtliche, finanzielle und bauliche Aspekte eine große Rolle – und genau deshalb sollte dieser Schritt strukturiert begleitet werden.
          Gerade in der Region Bergstraße und im Rhein-Neckar-Raum unterscheiden sich Lagen oft stärker, als es auf den ersten Blick wirkt:
          Zwischen Hanglage, Tal, Ortsteil und Nachbarstadt können Wertentwicklung, Alltagstauglichkeit und Lebensqualität deutlich variieren.
          Deshalb verstehen wir unsere Aufgabe nicht darin, Ihnen einfach Immobilien zu zeigen.
          Unser Ziel ist es, gemeinsam mit Ihnen herauszufinden, welche Immobilie wirklich zu Ihrem Leben passt.
        </p>
        <div>
          <h3 className="font-sans font-semibold text-zinc-900">Die Grundlage: Ihre persönliche Situation</h3>
          <p className="mt-1 text-zinc-700">Bevor wir suchen, klären wir gemeinsam:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-zinc-700">
            <li>Wie möchten Sie heute wohnen – und in fünf oder zehn Jahren?</li>
            <li>Wie sieht Ihr realistischer Finanzierungsrahmen aus?</li>
            <li>Welche Wege müssen im Alltag funktionieren (Arbeit, Schule, Verkehr)?</li>
            <li>Soll die Immobilie langfristig Zuhause oder auch Vermögensanlage sein?</li>
          </ul>
          <p className="mt-2 text-zinc-700">Erst daraus entsteht ein klares Suchprofil.</p>
        </div>
        <div>
          <h3 className="font-sans font-semibold text-zinc-900">Die richtige Lage – nicht nur die richtige Adresse</h3>
          <p className="mt-1 text-zinc-700">In Weinheim, an der Bergstraße und im Rhein-Neckar-Gebiet entscheiden oft Details:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-zinc-700">
            <li>Hanglage oder Ebene</li>
            <li>Innenstadt, Ortsteil oder Randlage</li>
            <li>Verkehrsanbindung Richtung Mannheim / Heidelberg</li>
            <li>Infrastruktur und Nahversorgung</li>
            <li>Entwicklungsperspektiven einzelner Wohngebiete</li>
          </ul>
          <p className="mt-2 text-zinc-700">
            Wir helfen Ihnen dabei, nicht nur ein schönes Haus zu finden –
            sondern einen Standort, der langfristig zu Ihrem Leben passt.
          </p>
        </div>
        <div>
          <h3 className="font-sans font-semibold text-zinc-900">Unser Anspruch</h3>
          <p className="mt-1 text-zinc-700">
            Ein Immobilienkauf ist kein Einzeltermin, sondern ein Prozess.
            Wir begleiten Sie strukturiert von der ersten Überlegung bis nach dem Einzug.
            Unser Ziel ist nicht nur ein erfolgreicher Abschluss.
            Unser Ziel ist eine Entscheidung, die sich auch Jahre später noch richtig anfühlt.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "Finanzierung",
    content: (
      <div className="space-y-5">
        <div>
          <h3 className="font-sans font-semibold text-zinc-900">1. Finanzierungsplanung</h3>
          <p className="mt-2 text-zinc-700 font-medium">Eigene finanzielle Situation prüfen</p>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-zinc-700">
            <li>Eigenkapital und Rücklagen ermitteln</li>
            <li>Monatlich verfügbares Einkommen berechnen</li>
            <li>Laufende Verpflichtungen berücksichtigen (Kredite, Leasing, Unterhalt)</li>
            <li>Persönlichen finanziellen Puffer festlegen</li>
          </ul>
          <p className="mt-2 text-zinc-700 font-medium">Kaufnebenkosten einplanen</p>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-zinc-700">
            <li>Grunderwerbsteuer</li>
            <li>Notar- und Grundbuchkosten</li>
            <li>ggf. Maklerprovision</li>
            <li>Versicherungen</li>
            <li>Renovierungs- und Instandhaltungsrücklagen</li>
          </ul>
          <p className="mt-2 text-zinc-700 font-medium">Finanzierung vergleichen</p>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-zinc-700">
            <li>Sollzins und Effektivzins vergleichen</li>
            <li>Zinsbindung wählen (10 / 15 / 20 / 30 Jahre)</li>
            <li>Tilgungssatz festlegen</li>
            <li>Sondertilgungsmöglichkeiten prüfen</li>
            <li>Förderprogramme (z. B. KfW) berücksichtigen</li>
          </ul>
          <p className="mt-2 text-zinc-700 font-medium">Finanzierungsbestätigung einholen</p>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-zinc-700">
            <li>Maximales Budget bestimmen</li>
            <li>Monatliche Rate kalkulieren</li>
            <li>Schneller handlungsfähig beim Kaufangebot</li>
          </ul>
        </div>
        <div>
          <h3 className="font-sans font-semibold text-zinc-900">2. Immobiliensuche</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-zinc-700">
            <li>Lage, Größe und Budget festlegen</li>
            <li>Wunschkriterien priorisieren (Must-Have / Nice-to-Have)</li>
            <li>Infrastruktur und Umgebung prüfen</li>
            <li>Zukunftsplanung berücksichtigen (Familie, Homeoffice, Mobilität)</li>
          </ul>
        </div>
        <div>
          <h3 className="font-sans font-semibold text-zinc-900">3. Besichtigung &amp; Hausprüfung</h3>
          <p className="mt-2 text-zinc-700 font-medium">Erste Besichtigung</p>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-zinc-700">
            <li>Allgemeiner Eindruck</li>
            <li>Raumaufteilung und Helligkeit</li>
            <li>Lärm, Nachbarschaft, Verkehr</li>
            <li>Parkmöglichkeiten</li>
          </ul>
          <p className="mt-2 text-zinc-700 font-medium">Zweite Besichtigung mit Sachverständigem</p>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-zinc-700">
            <li>Bausubstanz</li>
            <li>Modernisierungsbedarf</li>
            <li>realistische Renovierungskosten</li>
          </ul>
          <p className="mt-2 text-zinc-700 font-medium">Technische Prüfung</p>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-zinc-700">
            <li>Dach und Dämmung</li>
            <li>Fassade und Keller (Feuchtigkeit)</li>
            <li>Elektrik und Leitungen</li>
            <li>Sanitärinstallation</li>
            <li>Heizung und Warmwasseranlage</li>
            <li>Fenster und Abdichtungen</li>
            <li>Hinweise auf Schimmel oder Schädlingsbefall</li>
          </ul>
          <p className="mt-2 text-zinc-700 font-medium">Energieausweis prüfen</p>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-zinc-700">
            <li>Energieeffizienzklasse</li>
            <li>Heizungsart</li>
            <li>Dämmstandard</li>
            <li>mögliche gesetzliche Sanierungspflichten</li>
            <li>langfristige Energiekosten abschätzen</li>
          </ul>
        </div>
        <div>
          <h3 className="font-sans font-semibold text-zinc-900">4. Kaufentscheidung</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-zinc-700">
            <li>Marktpreis mit Vergleichsobjekten prüfen</li>
            <li>Renovierungskosten berücksichtigen</li>
            <li>Finanzierung final abstimmen</li>
            <li>Kaufpreisangebot formulieren</li>
          </ul>
        </div>
        <div>
          <h3 className="font-sans font-semibold text-zinc-900">5. Kaufabwicklung</h3>
          <p className="mt-2 text-zinc-700 font-medium">Vor dem Notartermin</p>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-zinc-700">
            <li>Finanzierungszusage der Bank</li>
            <li>Grundbuch prüfen</li>
            <li>Teilungserklärung &amp; Protokolle (bei Wohnung)</li>
            <li>Energieausweis und Bauunterlagen einsehen</li>
          </ul>
          <p className="mt-2 text-zinc-700 font-medium">Notartermin</p>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-zinc-700">
            <li>Kaufvertrag verstehen und prüfen</li>
            <li>Zahlungsfristen beachten</li>
            <li>Auflassungsvormerkung im Grundbuch</li>
          </ul>
          <p className="mt-2 text-zinc-700 font-medium">Nach dem Kauf</p>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-zinc-700">
            <li>Kaufpreiszahlung</li>
            <li>Schlüsselübergabe mit Protokoll</li>
            <li>Zählerstände dokumentieren</li>
            <li>Versicherungen abschließen</li>
            <li>Ummeldungen vornehmen</li>
          </ul>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3">
          <p className="font-sans font-semibold text-zinc-900">Tipp</p>
          <p className="mt-1 text-zinc-700">
            Erst Finanzierung klären, dann suchen – so vermeiden Sie Enttäuschungen und gewinnen Verhandlungssicherheit.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "Suche und finde",
    content:
      "Wir sichten fortlaufend den Markt in Weinheim und der Region Bergstraße und melden uns bei Ihnen, sobald ein Objekt zu Ihren Kriterien passt. Sie erhalten von uns eine klare, verständliche Objektbeschreibung und können in Ruhe entscheiden, ob Sie eine Besichtigung wünschen. So verpassen Sie keine passende Gelegenheit und sparen Zeit bei der Suche.",
  },
  {
    title: "Zustandsprüfung",
    content:
      "Bei der Besichtigung prüfen wir gemeinsam den Zustand der Immobilie: Bausubstanz, Heizung, Elektrik, Feuchtigkeit, Schäden und mögliche Sanierungsbedarfe. Wir empfehlen, bei Bedarf einen unabhängigen Gutachter oder Bausachverständigen hinzuzuziehen. So gehen Sie keine bösen Überraschungen ein und können den Kaufpreis und Ihre Planung realistisch einschätzen.",
  },
  {
    title: "Dokumente und Einträge prüfen",
    content:
      "Vor dem Kauf sollten Grundbuchauszug, Grundriss, Energieausweis, Teilungserklärung (bei Wohnungseigentum) und – falls vorhanden – Protokolle der Eigentümerversammlung geprüft werden. Wir unterstützen Sie dabei, Unstimmigkeiten oder Belastungen zu erkennen. So wissen Sie, was Sie kaufen und welche Rechte und Pflichten mit der Immobilie verbunden sind.",
  },
  {
    title: "Preisverhandlung",
    content:
      "Auf Basis von Marktvergleich, Zustand und Ihrer Finanzierung erarbeiten wir eine realistische Preisempfehlung. Wir führen die Verhandlung mit dem Verkäufer bzw. dessen Makler und setzen uns für faire Konditionen ein. Unser Ziel ist ein für beide Seiten tragfähiger Abschluss – transparent und ohne unnötige Verzögerungen.",
  },
  {
    title: "Beurkundung",
    content:
      "Der notarielle Kaufvertrag ist der rechtlich verbindliche Abschluss. Wir bereiten die Unterlagen mit Ihnen vor und begleiten Sie optional zum Notartermin. Der Notar erklärt den Vertrag, beurkundet die Übergabe und leitet die Eintragung im Grundbuch ein. Mit der Auflassung und der Eintragung wird die Immobilie rechtlich Ihnen zugeordnet.",
  },
  {
    title: "Übergabe und Einzug",
    content:
      "Bei der Übergabe werden Schlüssel übergeben, Zählerstände festgehalten und der Zustand der Immobilie protokolliert. Wir koordinieren Termine zwischen Verkäufer und Ihnen und stehen bei Rückfragen zur Verfügung. So geht der Einzug geordnet vonstatten und Sie starten ohne offene Punkte in Ihr neues Zuhause.",
  },
  {
    title: "Nachbetreuung",
    content:
      "Auch nach dem Kauf bleiben wir Ihr Ansprechpartner. Bei Fragen zu Abrechnungen, Versicherungen, Handwerkerempfehlungen oder späteren Veräußerungen können Sie sich an uns wenden. Wir begleiten Sie gerne dauerhaft als Ihr Partner für Immobilien in Weinheim und an der Bergstraße.",
  },
];

/** Full English content for each buying tip (titles come from dict.tipTitles). */
const KAUFTIPPS_EN: { content: string | React.ReactNode }[] = [
  {
    content: (
      <div className="space-y-5">
        <p>
          Buying a property is one of the most important decisions in life. Alongside emotions, legal, financial and structural aspects play a major role – and that is exactly why this step should be accompanied in a structured way. Especially in the Bergstraße region and the Rhine-Neckar area, locations often differ more than they appear at first glance: between hillside, valley, district and neighbouring town, value development, everyday suitability and quality of life can vary significantly. We therefore see our task not simply as showing you properties. Our aim is to work with you to find out which property really fits your life.
        </p>
        <div>
          <h3 className="font-sans font-semibold text-zinc-900">The foundation: your personal situation</h3>
          <p className="mt-1 text-zinc-700">Before we search, we clarify together:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-zinc-700">
            <li>How do you want to live today – and in five or ten years?</li>
            <li>What is your realistic financing framework?</li>
            <li>Which routes need to work in everyday life (work, school, transport)?</li>
            <li>Should the property be a long-term home or also an investment?</li>
          </ul>
          <p className="mt-2 text-zinc-700">Only then does a clear search profile emerge.</p>
        </div>
        <div>
          <h3 className="font-sans font-semibold text-zinc-900">The right location – not just the right address</h3>
          <p className="mt-1 text-zinc-700">In Weinheim, the Bergstraße and the Rhine-Neckar region, details often make the difference:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-zinc-700">
            <li>Hillside or flat land</li>
            <li>Town centre, district or outskirts</li>
            <li>Transport links towards Mannheim / Heidelberg</li>
            <li>Infrastructure and local supply</li>
            <li>Development prospects of individual residential areas</li>
          </ul>
          <p className="mt-2 text-zinc-700">
            We help you find not just a nice house – but a location that fits your life in the long term.
          </p>
        </div>
        <div>
          <h3 className="font-sans font-semibold text-zinc-900">Our approach</h3>
          <p className="mt-1 text-zinc-700">
            Buying a property is not a one-off appointment but a process. We support you in a structured way from the first consideration until after move-in. Our goal is not only a successful conclusion. Our goal is a decision that still feels right years later.
          </p>
        </div>
      </div>
    ),
  },
  {
    content: (
      <div className="space-y-5">
        <div>
          <h3 className="font-sans font-semibold text-zinc-900">1. Financing planning</h3>
          <p className="mt-2 text-zinc-700 font-medium">Review your own financial situation</p>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-zinc-700">
            <li>Determine equity and reserves</li>
            <li>Calculate monthly disposable income</li>
            <li>Take into account ongoing commitments (loans, leasing, maintenance)</li>
            <li>Define a personal financial buffer</li>
          </ul>
          <p className="mt-2 text-zinc-700 font-medium">Plan purchase costs</p>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-zinc-700">
            <li>Land transfer tax</li>
            <li>Notary and land registry costs</li>
            <li>Broker commission if applicable</li>
            <li>Insurance</li>
            <li>Renovation and maintenance reserves</li>
          </ul>
          <p className="mt-2 text-zinc-700 font-medium">Compare financing options</p>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-zinc-700">
            <li>Compare nominal and effective interest rates</li>
            <li>Choose interest rate fixation (10 / 15 / 20 / 30 years)</li>
            <li>Set repayment rate</li>
            <li>Check options for extra repayments</li>
            <li>Consider subsidy programmes (e.g. KfW)</li>
          </ul>
          <p className="mt-2 text-zinc-700 font-medium">Obtain financing certificate</p>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-zinc-700">
            <li>Determine maximum budget</li>
            <li>Calculate monthly repayment</li>
            <li>Act quickly when making an offer</li>
          </ul>
        </div>
        <div>
          <h3 className="font-sans font-semibold text-zinc-900">2. Property search</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-zinc-700">
            <li>Define location, size and budget</li>
            <li>Prioritise wish list (must-have / nice-to-have)</li>
            <li>Check infrastructure and surroundings</li>
            <li>Consider future plans (family, home office, mobility)</li>
          </ul>
        </div>
        <div>
          <h3 className="font-sans font-semibold text-zinc-900">3. Viewing &amp; property inspection</h3>
          <p className="mt-2 text-zinc-700 font-medium">First viewing</p>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-zinc-700">
            <li>General impression</li>
            <li>Room layout and light</li>
            <li>Noise, neighbourhood, traffic</li>
            <li>Parking</li>
          </ul>
          <p className="mt-2 text-zinc-700 font-medium">Second viewing with surveyor</p>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-zinc-700">
            <li>Building fabric</li>
            <li>Refurbishment needs</li>
            <li>Realistic renovation costs</li>
          </ul>
          <p className="mt-2 text-zinc-700 font-medium">Technical inspection</p>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-zinc-700">
            <li>Roof and insulation</li>
            <li>Facade and cellar (moisture)</li>
            <li>Electrical and wiring</li>
            <li>Plumbing</li>
            <li>Heating and hot water</li>
            <li>Windows and seals</li>
            <li>Signs of mould or pest infestation</li>
          </ul>
          <p className="mt-2 text-zinc-700 font-medium">Check energy certificate</p>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-zinc-700">
            <li>Energy efficiency class</li>
            <li>Type of heating</li>
            <li>Insulation standard</li>
            <li>Possible statutory refurbishment obligations</li>
            <li>Estimate long-term energy costs</li>
          </ul>
        </div>
        <div>
          <h3 className="font-sans font-semibold text-zinc-900">4. Purchase decision</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-zinc-700">
            <li>Check market price against comparable properties</li>
            <li>Include renovation costs</li>
            <li>Finalise financing</li>
            <li>Formulate purchase offer</li>
          </ul>
        </div>
        <div>
          <h3 className="font-sans font-semibold text-zinc-900">5. Purchase process</h3>
          <p className="mt-2 text-zinc-700 font-medium">Before the notary appointment</p>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-zinc-700">
            <li>Bank financing commitment</li>
            <li>Check land register</li>
            <li>Declaration of division &amp; minutes (for condominiums)</li>
            <li>Review energy certificate and building documents</li>
          </ul>
          <p className="mt-2 text-zinc-700 font-medium">Notary appointment</p>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-zinc-700">
            <li>Understand and review purchase contract</li>
            <li>Observe payment deadlines</li>
            <li>Priority notice of conveyance in land register</li>
          </ul>
          <p className="mt-2 text-zinc-700 font-medium">After purchase</p>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-zinc-700">
            <li>Purchase price payment</li>
            <li>Key handover with protocol</li>
            <li>Document meter readings</li>
            <li>Take out insurance</li>
            <li>Register change of address</li>
          </ul>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3">
          <p className="font-sans font-semibold text-zinc-900">Tip</p>
          <p className="mt-1 text-zinc-700">
            Clarify financing first, then search – this way you avoid disappointment and gain confidence in negotiations.
          </p>
        </div>
      </div>
    ),
  },
  {
    content:
      "We continuously monitor the market in Weinheim and the Bergstraße region and will contact you when a property matches your criteria. You receive a clear, understandable property description from us and can decide in peace whether you would like a viewing. This way you do not miss suitable opportunities and save time in your search.",
  },
  {
    content:
      "During the viewing we jointly check the condition of the property: building fabric, heating, electrics, moisture, defects and possible refurbishment needs. We recommend involving an independent surveyor or building expert if needed. This way you avoid nasty surprises and can assess the purchase price and your planning realistically.",
  },
  {
    content:
      "Before purchase, the land register extract, floor plan, energy certificate, declaration of division (for condominiums) and – if available – minutes of the owners’ meeting should be reviewed. We support you in identifying discrepancies or encumbrances. This way you know what you are buying and what rights and obligations are associated with the property.",
  },
  {
    content:
      "Based on market comparison, condition and your financing we develop a realistic price recommendation. We conduct the negotiation with the seller or their agent and work for fair terms. Our goal is a result that works for both sides – transparent and without unnecessary delay.",
  },
  {
    content:
      "The notarial purchase contract is the legally binding conclusion. We prepare the documents with you and can accompany you to the notary appointment. The notary explains the contract, certifies the transfer and initiates the land register entry. With the conveyance and registration, the property is legally assigned to you.",
  },
  {
    content:
      "At handover, keys are handed over, meter readings recorded and the condition of the property documented. We coordinate appointments between the seller and you and are available for any questions. This way move-in proceeds in an orderly manner and you start your new home without loose ends.",
  },
  {
    content:
      "We remain your contact after the purchase. For questions on utilities, insurance, tradespeople recommendations or future sales you can turn to us. We are happy to support you in the long term as your partner for property in Weinheim and the Bergstraße.",
  },
];

interface KauftippsProps {
  dict: KaufenKauftippsDict;
  lang: string;
}

export default function Kauftipps({ dict, lang }: KauftippsProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const useEnContent = lang === "en" && KAUFTIPPS_EN.length >= (dict.tipTitles?.length ?? 0);
  const tips = useEnContent
    ? dict.tipTitles.map((title, i) => ({ title, content: KAUFTIPPS_EN[i]?.content ?? "" }))
    : KAUFTIPPS_DE.map((tip, i) => ({ title: dict.tipTitles[i] ?? tip.title, content: tip.content }));

  return (
    <section
      className="border-t border-zinc-200 bg-zinc-50/50 px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
      aria-labelledby="kauftipps-heading"
    >
      <div className="mx-auto max-w-4xl">
        <h2
          id="kauftipps-heading"
          className="font-sans text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl"
        >
          {dict.heading}
        </h2>
        <p className="mt-2 text-zinc-600">
          {dict.intro}
        </p>

        <ul className="mt-8 space-y-3">
          {tips.map((tip, index) => {
            const isOpen = openIndex === index;
            return (
              <li key={tip.title}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 rounded-xl border border-zinc-200 bg-white px-4 py-4 text-left shadow-sm transition-colors hover:border-zinc-300 hover:bg-zinc-50/80 sm:px-5 sm:py-5"
                  aria-expanded={isOpen}
                  aria-controls={`kauftipp-content-${index}`}
                  id={`kauftipp-trigger-${index}`}
                >
                  <span className="font-sans font-semibold text-zinc-900">
                    {index + 1}. {tip.title}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-zinc-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    aria-hidden
                  />
                </button>
                <div
                  id={`kauftipp-content-${index}`}
                  role="region"
                  aria-labelledby={`kauftipp-trigger-${index}`}
                  className={`overflow-hidden transition-all duration-200 ease-out ${isOpen ? "max-h-[4500px] opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <div className="rounded-b-xl border border-t-0 border-zinc-200 bg-white px-4 py-5 shadow-sm sm:px-5 sm:py-6">
                    {typeof tip.content === "string" ? (
                      <p className="leading-relaxed text-zinc-700">{tip.content}</p>
                    ) : (
                      <div className="leading-relaxed text-zinc-700">{tip.content}</div>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
