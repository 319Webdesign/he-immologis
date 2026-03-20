"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Wallet } from "lucide-react";

const CARD_ACCENT = "#85b09a";
const BRAND_COLOR = "#F9423A";

const STAFFEL_DE = [
  { range: "Bis 250.000 €", provision: "1.000 €", from: 0, to: 250 },
  { range: "250.000 € – 500.000 €", provision: "1.500 €", from: 250, to: 500 },
  { range: "500.000 € – 1.000.000 €", provision: "2.500 €", from: 500, to: 1000 },
  { range: "Ab 1.000.000 €", provision: "5.000 €", from: 1000, to: 1000 },
];

const STAFFEL_EN = [
  { range: "Up to €250,000", provision: "€1,000", from: 0, to: 250 },
  { range: "€250,000 – €500,000", provision: "€1,500", from: 250, to: 500 },
  { range: "€500,000 – €1,000,000", provision: "€2,500", from: 500, to: 1000 },
  { range: "From €1,000,000", provision: "€5,000", from: 1000, to: 1000 },
];

const STAFFEL_TR = [
  { range: "250.000 €'ye kadar", provision: "1.000 €", from: 0, to: 250 },
  { range: "250.000 € – 500.000 €", provision: "1.500 €", from: 250, to: 500 },
  { range: "500.000 € – 1.000.000 €", provision: "2.500 €", from: 500, to: 1000 },
  { range: "1.000.000 € ve üzeri", provision: "5.000 €", from: 1000, to: 1000 },
];

export default function ProvisionsStaffel() {
  const pathname = usePathname();
  const isEn = pathname?.startsWith("/en");
  const isTr = pathname?.startsWith("/tr");
  const staffel = isTr ? STAFFEL_TR : isEn ? STAFFEL_EN : STAFFEL_DE;
  const labelKaufpreis = isTr ? "Satış fiyatı" : isEn ? "Purchase price" : "Kaufpreis";
  const labelProvision = isTr ? "Komisyon" : isEn ? "Commission" : "Provision";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mt-12"
    >
      {/* Desktop: horizontale Karten mit Fortschritts-Visualisierung */}
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:items-stretch">
        {staffel.map((stufe, i) => (
          <div
            key={stufe.range}
            className="relative flex flex-col rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            style={{ borderColor: i === staffel.length - 1 ? CARD_ACCENT : undefined }}
          >
            {i === staffel.length - 1 && (
              <div
                className="absolute -top-2 right-4 rounded-full px-3 py-0.5 text-xs font-semibold text-white"
                style={{ backgroundColor: BRAND_COLOR }}
              >
                {isTr ? "Maks." : "Max."}
              </div>
            )}
            <div className="flex items-center gap-2 text-slate-600">
              <Wallet className="h-5 w-5 shrink-0" style={{ color: BRAND_COLOR }} />
              <span className="text-sm font-medium">{labelKaufpreis}</span>
            </div>
            <div className={i === 0 || i === staffel.length - 1 ? "mt-4" : "mt-auto pt-4"}>
              <p className="font-semibold text-slate-800">{stufe.range}</p>
            </div>
            <div className="mt-auto pt-3">
              <p className="text-2xl font-bold" style={{ color: CARD_ACCENT }}>
                {stufe.provision}
              </p>
              <p className="mt-1 text-sm text-slate-500">{labelProvision}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile: Tabelle */}
      <div className="sm:hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left">
          <thead>
            <tr style={{ backgroundColor: `${CARD_ACCENT}12` }}>
              <th className="px-4 py-3 text-sm font-semibold text-slate-800">{labelKaufpreis}</th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-800 text-right">{labelProvision}</th>
            </tr>
          </thead>
          <tbody>
            {staffel.map((stufe) => (
              <tr key={stufe.range} className="border-t border-slate-100">
                <td className="px-4 py-3 text-slate-700">{stufe.range}</td>
                <td className="px-4 py-3 text-right font-semibold" style={{ color: CARD_ACCENT }}>
                  {stufe.provision}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
