import type { Metadata } from "next";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
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
      <section
        className="relative flex min-h-[70vh] flex-col overflow-hidden px-4 pt-16 pb-24 sm:px-6 sm:pt-24 sm:pb-28 lg:px-8"
        aria-labelledby="hero-verkaufen-heading"
        style={{
          backgroundImage: "url(/img/hero-verkaufen.jpeg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#1e293b",
        }}
      >
        <div className="absolute inset-0 bg-slate-900/40" aria-hidden />
        <div className="relative z-10 mx-auto flex max-w-7xl flex-1 flex-col items-center justify-center text-center">
          <h1
            id="hero-verkaufen-heading"
            className="font-sans text-4xl font-semibold tracking-tight text-white drop-shadow-sm sm:text-5xl"
          >
            Verkaufen in Weinheim und Umgebung.
            <br />
            <span className="text-3xl sm:text-4xl">Keine Burgen – Gerne Ihre Immobilie.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/95 drop-shadow-sm">
            Klar bewertet. Optimal positioniert. Sicher verkauft.
          </p>
        </div>
        <a
          href="#anfrage-formular"
          className="absolute bottom-6 left-0 right-0 z-10 flex flex-col items-center gap-1 text-white/90 transition-colors hover:text-white sm:bottom-8"
          aria-label="Zum Verkaufsanfrage-Formular scrollen"
        >
          <span className="text-sm font-medium">Jetzt Verkaufswert ermitteln</span>
          <ChevronDown className="h-7 w-7 animate-bounce text-white/80" aria-hidden />
        </a>
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
              Zur guten Ordnung weisen wir darauf hin, dass im Falle der Beauftragung eine Maklerprovision von jeweils 3,57 % des notariell beurkundeten Kaufpreises anfällt, inklusive gesetzlicher Mehrwertsteuer. Diese Provision wird jeweils zur Hälfte von Käufer und Verkäufer getragen, sofern nicht abweichend vereinbart. Der Anspruch auf die Provision entsteht, sobald der Makler mit der Vermittlungstätigkeit beauftragt ist und der Kaufvertrag notariell beurkundet wurde.
            </p>
            <p className="mt-4 font-medium text-zinc-800">
              Hier gelten unsere Allgemeinen Geschäftsbedingungen (
              <Link href="/agb" className="text-[#4682B4] underline hover:no-underline">
                AGB
              </Link>
              ) sowie die gesetzlichen Bestimmungen.
            </p>
          </div>
        </div>
      </section>

      <SellerServices />
    </>
  );
}
