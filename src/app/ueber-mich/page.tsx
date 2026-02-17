import type { Metadata } from "next";
import Image from "next/image";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Über mich",
  description:
    "Holger Eberhard – Ihr Ansprechpartner für Immobilien und Logistik in Weinheim und an der Bergstraße. Persönlich, kompetent, mit regionaler Expertise.",
  keywords: [
    "HE immologis",
    "Holger Eberhard",
    "Immobilien Weinheim",
    "Bergstraße",
    "Über mich",
  ],
};

const BRAND_BLUE = "#4682B4";

export default function UeberMichPage() {
  return (
    <>
      {/* Zwei Spalten: 30% Bild links, 70% Text rechts */}
      <section className="border-b border-slate-200 bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[30%_1fr] lg:gap-12">
            {/* Links: Bild */}
            <div className="relative aspect-[3/4] w-full max-w-sm overflow-hidden rounded-2xl bg-slate-100 lg:max-w-none">
              <Image
                src="/img/holger.jpeg"
                alt="Holger Eberhard"
                fill
                className="object-cover"
                sizes="(max-width: 1023px) 100vw, 30vw"
                priority
              />
            </div>

            {/* Rechts: Text */}
            <div className="min-w-0">
              <h1 className="font-sans text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Über mich
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-slate-700">
                Mein Name ist Holger Eberhard.
              </p>
              <p className="mt-4 leading-relaxed text-slate-600">
                Verheiratet mit Anni, stolzer Patchwork-Vater von Noah und offiziell geduldeter Mitbewohner
                <br /> unseres Zwergrauhaardackels Houdini.
              </p>
              <p className="mt-4 leading-relaxed text-slate-600">
                Seit vielen Jahren leben wir im Herzen von Weinheim. Hier kenne ich die Straßen, Menschen
                <br /> und einige Geschichten hinter mancher Immobilie.
              </p>
              <p className="mt-4 leading-relaxed text-slate-600">
                Gleichzeitig ist Kapstadt für uns zu einem zweiten Zuhause geworden.             
                Diese Verbindung zwischen Weinheim und Südafrika prägt mein Denken und Handeln:
              </p>
              <p className="mt-2 font-semibold text-slate-800">
                Lokal verwurzelt. Global orientiert.
              </p>
              <p className="mt-4 leading-relaxed text-slate-600">
                „Local roots. Global vision.“ ist für mich kein Slogan – sondern gelebte Realität.
              </p>

              <h2 className="mt-12 font-sans text-2xl font-semibold tracking-tight text-slate-900">
                Mein beruflicher Weg
              </h2>
              <p className="mt-4 leading-relaxed text-slate-600">
                Über viele Jahre bin ich im internationalen Bereich Vertrieb und Entwicklung in der
                <br /> Logistikwelt tätig. Ich habe die Zusammenarbeit internationaler Vertriebsteams in
                <br /> Projekten harmoniert, komplexe Großprojekte über alle Verkehrsträger hinweg
                <br /> verantwortet, M&A Prozesse begleitet und komplexe temperaturgeführte
                <br /> Supply-Chain-Lösungen entwickelt.
              </p>
              <p className="mt-4 leading-relaxed text-slate-600">
                Dies geht nur mit Struktur, Eigenverantwortung und wirtschaftlicher Tragfähigkeit.
              </p>
              <p className="mt-4 leading-relaxed text-slate-600">
                Diese unternehmerische Erfahrung bringe ich heute in den regionalen Immobilienmarkt
                <br /> entlang der Bergstraße ein. Denn auch Immobilien erfordern Strategie,
                <br /> Verhandlungssicherheit, Marktverständnis und klare Entscheidungen.
              </p>
              <p className="mt-4 leading-relaxed text-slate-600">
                Parallel möchte ich mich künftig in logistischen Hilfsprojekten nach Südfrika engagieren und
                <br /> branchenbasierte M&A und Schulungsprojekte in Europa begleiten.
              </p>
              <p className="mt-4 leading-relaxed text-slate-600">
                Unternehmertum bedeutet für mich Verantwortung – wirtschaftlich wie gesellschaftlich.
              </p>

              <h2 className="mt-12 font-sans text-2xl font-semibold tracking-tight text-slate-900">
                Meine Haltung zu Immobilien
              </h2>
              <p className="mt-4 leading-relaxed text-slate-600">
                Immobilien sind für mich mehr als Objekte.        
                Sie sind Lebensentscheidungen. Übergänge. Neuanfänge.
              </p>
              <p className="mt-4 leading-relaxed text-slate-600">
                Ob Verkauf, Kauf oder Vermietung – ich begleite meine Kunden persönlich, diskret und
                <br /> strukturiert durch den gesamten Prozess: von der fundierten Wertermittlung über eine klare
                <br /> Vermarktungsstrategie bis zum erfolgreichen Abschluss.
              </p>
              <p className="mt-4 leading-relaxed text-slate-600">
                Mein Anspruch:
              </p>
              <p className="mt-2 leading-relaxed text-slate-600">
                wirtschaftlich tragfähige Lösungen zu schaffen – und dabei stets den Menschen hinter der
                <br /> Immobilie im Blick zu behalten.
              </p>

              <h2 className="mt-12 font-sans text-2xl font-semibold tracking-tight text-slate-900">
                Warum HE immologis?
              </h2>
              <p className="mt-4 leading-relaxed text-slate-600">
                Aus meiner internationalen Logistik- und Beratungserfahrung und meiner regionalen
                <br /> Immobilienleidenschaft entstand mein Unternehmensname:
              </p>
              <p className="mt-2 font-semibold text-slate-800">
                Immo & Logis – HE immologis.
              </p>
              <p className="mt-4 leading-relaxed text-slate-600">
                Er verbindet zwei Welten, die auf den ersten Blick gegensätzlich erscheinen:
                <br /> globale Strukturkompetenz und regionales Vertrauen.
              </p>
              <p className="mt-4 leading-relaxed text-slate-600">
                Heute lebe und arbeite ich genau in dieser Schnittstelle.
             
                Ich freue mich darauf, auch Ihre Geschichte ein Stück begleiten zu dürfen.
              </p>
              <div
                className="mt-10 rounded-2xl border-2 px-6 py-6 sm:px-8 sm:py-8"
                style={{ borderColor: BRAND_BLUE, backgroundColor: `${BRAND_BLUE}08` }}
              >
                <p className="font-semibold text-slate-900">Herzlich</p>
                <p className="mt-2 text-xl font-semibold text-slate-900">Holger Eberhard</p>
                <p className="mt-1 text-slate-600">Geschäftsführer</p>
                <Image
                  src="/img/unterschrift.png"
                  alt="Unterschrift Holger Eberhard"
                  width={200}
                  height={80}
                  className="mt-4 object-contain object-left"
                />
                <p className="mt-4 text-slate-700">HE immologis UG (haftungsbeschränkt) i. G.</p>
                <p className="mt-1 text-sm text-slate-600">
                  Immobilien- und Logistikberatung · Wertermittlung (TA)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Contact
        title="Kontakt aufnehmen"
        subtitle="Haben Sie Fragen oder möchten Sie unverbindlich ins Gespräch kommen? Ich freue mich auf Ihre Nachricht."
        accentColor="steelblue"
      />
    </>
  );
}
