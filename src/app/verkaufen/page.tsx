import type { Metadata } from "next";
import SellForm from "@/components/SellForm";
import SellerServices from "@/components/SellerServices";
import FinalCTA from "@/components/FinalCTA";

export const metadata: Metadata = {
  title: "Immobilie verkaufen",
  description:
    "Ihre Immobilie in besten Händen – Stellen Sie jetzt eine unverbindliche Verkaufsanfrage. HE immologis UG berät Sie kompetent beim Verkauf Ihrer Immobilie in Weinheim und der Region.",
  keywords: [
    "Immobilie verkaufen Weinheim",
    "Verkaufsanfrage Immobilie",
    "HE immologis Verkauf",
    "Immobilienverkauf Bergstraße",
  ],
};

interface VerkaufenPageProps {
  searchParams: Promise<{ objekttyp?: string; zustand?: string }>;
}

export default async function VerkaufenPage({ searchParams }: VerkaufenPageProps) {
  const params = await searchParams;
  return (
    <>
      <section className="border-b border-slate-200/90 bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-sans text-3xl font-semibold tracking-tight text-slate-800 sm:text-4xl">
            Ihre Immobilie verkaufen.
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Ich finde den richtigen Käufer.
          </p>
        </div>
      </section>

      <FinalCTA />

      <section
        id="anfrage-formular"
        className="bg-slate-50/80 px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
      >
        <div className="mx-auto max-w-4xl">
          <SellForm
            initialObjekttyp={params.objekttyp}
            initialZustand={params.zustand}
          />
        </div>
      </section>

      {/* Hinweis Maklerprovision – direkt unter dem Formular */}
      <section className="border-t border-zinc-200 bg-white px-4 py-10 sm:px-6 sm:py-12 lg:px-8" aria-labelledby="provision-hinweis-heading">
        <div className="mx-auto max-w-4xl">
          <h2 id="provision-hinweis-heading" className="sr-only">Hinweis zur Maklerprovision</h2>
          <div className="rounded-xl border border-zinc-200 bg-zinc-50/80 p-6 text-sm leading-relaxed text-zinc-700 sm:p-8">
            <span className="mb-4 inline-block rounded-full bg-zinc-200/80 px-3 py-1 text-xs font-medium uppercase tracking-wider text-zinc-500">
              Hinweis
            </span>
            <p className="font-medium text-zinc-800">
              Zur guten Ordnung weisen wir darauf hin, dass im Falle der Beauftragung eine Maklerprovision von jeweils 3,57 % des notariell beurkundeten Kaufpreises anfällt, inklusive gesetzlicher Mehrwertsteuer. Diese Provision wird jeweils zur Hälfte von Käufer und Verkäufer getragen, sofern nicht abweichend vereinbart. Der Anspruch auf die Provision entsteht, sobald der Makler mit der Vermittlungstätigkeit beauftragt ist und der Kaufvertrag notariell beurkundet wurde. Sollte der Maklervertrag zurückgezogen werden, obwohl die Tätigkeit bereits durchgeführt wurde, fällt eine Rücktrittsgebühr in Höhe von 10 % des später erzielten Kaufpreises an. Alternativ, falls kein Verkauf zustande kommt, werden die Aufwendungen aufwandsgemäß erstattet, jedoch mindestens in Höhe von 950 Euro. Sollte es zu einem anderen Verkauf kommen, obwohl ein qualifizierter Maklerauftrag vorliegt, gelten die rechtlichen Bestimmungen des qualifizierten Maklervertrags und die Provision wird entsprechend abgerechnet.
            </p>
          </div>
        </div>
      </section>

      <SellerServices />
    </>
  );
}
