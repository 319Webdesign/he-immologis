"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const KAUFTIPPS: { title: string; content: string | React.ReactNode }[] = [
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

export default function Kauftipps() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
          Tipps beim Kauf einer Immobilie
        </h2>
        <p className="mt-2 text-zinc-600">
          Der Kauf einer Immobilie ist eine weitreichende Entscheidung. Mit der richtigen Vorbereitung treffen Sie fundierte und sichere Entscheidungen.
        </p>

        <ul className="mt-8 space-y-3">
          {KAUFTIPPS.map((tip, index) => {
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
