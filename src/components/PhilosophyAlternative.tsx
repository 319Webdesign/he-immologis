import {
  Crown,
  Clock,
  Layers,
} from "lucide-react";

const SECTION_ICONS = [Crown, Clock, Layers] as const;
const SECTION_ORDERS: ("text-first" | "image-first")[] = ["text-first", "image-first", "text-first"];

export type PhilosophySection = {
  id: string;
  headline: string;
  tagline: string;
  paragraphs: string[];
  extra: string;
};

export type PhilosophyDict = {
  heading: string;
  sections: PhilosophySection[];
};

interface PhilosophyAlternativeProps {
  dict: PhilosophyDict;
}

export default function PhilosophyAlternative({ dict }: PhilosophyAlternativeProps) {
  const { heading, sections } = dict;
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
          {heading}
        </h2>

        <div className="space-y-24 sm:space-y-32 lg:space-y-40">
          {sections.map(({ id, headline, paragraphs, tagline, extra }, index) => {
            const Icon = SECTION_ICONS[index];
            const order = SECTION_ORDERS[index];
            return (
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
                <p className="relative z-10 mt-2 text-lg font-bold text-black">
                  {tagline}
                </p>
                <div
                  className={`relative z-10 mt-6 max-w-xl space-y-4 text-base leading-relaxed text-black sm:text-lg ${
                    order === "image-first" ? "md:ml-auto md:text-right" : ""
                  }`}
                >
                  {paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                  <p className="pt-2 font-bold text-black">
                    {extra}
                  </p>
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
          );
          })}
        </div>

        {/* Feine Trennlinie zwischen den Sektionen würde hier redundant sein – der Weißraum trennt */}
      </div>
    </section>
  );
}
