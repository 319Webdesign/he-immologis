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

interface AnbietenPageProps {
  searchParams: Promise<{ objekttyp?: string; zustand?: string }>;
}

export default async function AnbietenPage({ searchParams }: AnbietenPageProps) {
  const params = await searchParams;
  return (
    <>
      {/* Header-Bereich */}
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

      {/* CTA (vor dem Formular) */}
      <FinalCTA />

      {/* Formular-Bereich */}
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

      {/* Premium-Service für Verkäufer */}
      <SellerServices />
    </>
  );
}
