"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const KAUFTIPPS: { title: string; content: string }[] = [
  {
    title: "Erstgespräch",
    content:
      "Im persönlichen Erstgespräch klären wir Ihre Wünsche, Ihr Budget und Ihre Zeitplanung. Wir erfassen, welche Art von Immobilie Sie suchen, in welchen Lagen und mit welchen Ausstattungsmerkmalen. So können wir gezielt passende Objekte auswählen und Sie nicht mit unnötigen Vorschlägen überhäufen. Gleichzeitig erhalten Sie von uns eine Einschätzung zum aktuellen Markt in Weinheim und der Bergstraße.",
  },
  {
    title: "Finanzierung",
    content:
      "Eine solide Finanzierung ist die Basis für Ihren Kauf. Wir empfehlen, frühzeitig mit Ihrer Bank oder einem unabhängigen Finanzierungsberater zu sprechen. Klären Sie Ihre monatliche Belastbarkeit, den Eigenanteil und mögliche Fördermittel. Mit einer Finanzierungsbestätigung oder zumindest einer groben Einschätzung Ihrer Kaufkraft können wir Verhandlungen und Besichtigungen zielgerichtet angehen und Sie wirken gegenüber Verkäufern und Maklern seriös vorbereitet.",
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
                  className={`overflow-hidden transition-all duration-200 ease-out ${isOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <div className="rounded-b-xl border border-t-0 border-zinc-200 bg-white px-4 py-5 shadow-sm sm:px-5 sm:py-6">
                    <p className="leading-relaxed text-zinc-700">{tip.content}</p>
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
