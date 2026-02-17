import {
  Crown,
  Clock,
  Layers,
} from "lucide-react";

const SECTIONS = [
  {
    id: "01",
    headline: "Exklusivität",
    paragraphs: [
      "Bei mir wird Ihre Immobilie nicht einfach neben vielen anderen im Schaufenster präsentiert. Sie steht im Fokus.",
      "Sie erhalten vom ersten Gespräch bis zum erfolgreichen Abschluss eine persönliche, direkte und verbindliche Begleitung.",
      "Ich übernehme bewusst nur eine begrenzte Anzahl an Mandaten. So sichere ich Ihrer Immobilie die Aufmerksamkeit, Sorgfalt und Exklusivität, die sie verdient — und Ihnen die Betreuung, die Sie erwarten dürfen.",
    ],
    tagline: "Ihre Immobilie. Im Mittelpunkt.",
    Icon: Crown,
    order: "text-first",
  },
  {
    id: "02",
    headline: "Flexible Kontaktmöglichkeiten.",
    paragraphs: [
      "Sie können sich darauf verlassen, dass ich flexibel und zuverlässig agiere, wann immer wir Termine vereinbaren. Pünktlichkeit und Erreichbarkeit sind für mich selbstverständlich. Auch außerhalb der klassischen Geschäftszeiten bin ich erreichbar – sei es telefonisch, per WhatsApp oder auf einem Weg, der Ihnen am besten passt.",
    ],
    tagline: "Ihre Immobilie. Jederzeit erreichbar.",
    Icon: Clock,
    order: "image-first",
  },
  {
    id: "03",
    headline: "Flexibilität",
    paragraphs: [
      "Flexibilität ist kein Schlagwort, sondern war für mich schon immer Arbeitsprinzip.",
      "Jede Immobilie, jeder Eigentümer und jede Situation ist anders — deshalb gibt es bei mir keine Standardabläufe, sondern passgenaue Lösungen. Termine, Vermarktungswege, Besichtigungsmodelle und Abstimmungen richte ich konsequent an Ihren Bedürfnissen und den Marktgegebenheiten aus.",
      "Ich reagiere schnell, denke voraus und passe Strategien an, wenn sich Rahmenbedingungen ändern.",
      "So entstehen bewegliche Prozesse — mit klarem Ziel und verlässlicher Struktur.",
    ],
    tagline: "Ihre Immobilie. Volle Aufmerksamkeit.",
    Icon: Layers,
    order: "text-first",
  },
] as const;

export default function PhilosophyAlternative() {
  return (
    <section
      className="bg-white py-20 sm:py-24 lg:py-32"
      aria-labelledby="philosophy-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2
          id="philosophy-heading"
          className="mb-16 font-sans text-3xl font-bold tracking-tight text-black sm:mb-20 sm:text-4xl lg:mb-24 lg:text-5xl"
        >
          Mehr Wert. Ihr Plus.
        </h2>

        <div className="space-y-24 sm:space-y-32 lg:space-y-40">
          {SECTIONS.map(({ id, headline, paragraphs, tagline, Icon, order }) => (
            <article
              key={id}
              className="relative flex flex-col gap-12 md:flex-row md:items-center md:gap-16 lg:gap-24"
            >
              {/* Text-Block */}
              <div
                className={`relative z-10 flex flex-1 flex-col ${
                  order === "text-first"
                    ? "md:order-first"
                    : "md:order-last md:text-right"
                }`}
              >
                {/* Dezente Hintergrund-Nummerierung – unter dem Text (niedriger z-index) */}
                <span
                  className={`pointer-events-none absolute -top-2 z-0 select-none font-sans text-[5rem] font-bold leading-none sm:text-[6rem] lg:text-[7rem] ${
                    order === "image-first" ? "right-0" : "left-0"
                  }`}
                  style={{ color: "rgba(70, 130, 180, 0.25)" }}
                  aria-hidden
                >
                  {id}
                </span>
                <h3
                  className="relative z-10 font-sans text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
                  style={{ color: "#4682B4" }}
                >
                  {headline}
                </h3>
                {id === "01" && (
                  <p className="relative z-10 mt-2 text-lg font-bold text-black">
                    Ihre Immobilie. Im Mittelpunkt.
                  </p>
                )}
                {id === "02" && (
                  <p className="relative z-10 mt-2 text-lg font-bold text-black">
                    Ihre Immobilie. Jederzeit erreichbar.
                  </p>
                )}
                {id === "03" && (
                  <p className="relative z-10 mt-2 text-lg font-bold text-black">
                    Ihre Immobilie. Volle Aufmerksamkeit.
                  </p>
                )}
                <div
                  className={`relative z-10 mt-6 max-w-xl space-y-4 text-base leading-relaxed text-black sm:text-lg ${
                    order === "image-first" ? "md:ml-auto md:text-right" : ""
                  }`}
                >
                  {paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                  {id === "01" && (
                    <p className="pt-2 font-bold text-black">
                      Wenige Mandate. Höchste Sorgsamkeit
                    </p>
                  )}
                  {id === "02" && (
                    <p className="pt-2 font-bold text-black">
                      Wenn Sie mich brauchen: einfach da.
                    </p>
                  )}
                  {id === "03" && (
                    <p className="pt-2 font-bold text-black">
                      Verlässlich. Ordentlich. Transparent.
                    </p>
                  )}
                </div>
              </div>

              {/* Design-Element (Icon) */}
              <div
                className={`relative z-10 flex flex-1 items-center justify-center ${
                  order === "text-first"
                    ? "md:order-last md:justify-end"
                    : "md:order-first md:justify-start"
                }`}
              >
                <div
                  className="flex h-28 w-28 items-center justify-center rounded-2xl bg-slate-50 text-slate-300 sm:h-36 sm:w-36 lg:h-40 lg:w-40"
                  style={{ animation: "float 4s ease-in-out infinite" }}
                >
                  <Icon
                    className="h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24"
                    strokeWidth={1}
                    aria-hidden
                  />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Feine Trennlinie zwischen den Sektionen würde hier redundant sein – der Weißraum trennt */}
      </div>
    </section>
  );
}
