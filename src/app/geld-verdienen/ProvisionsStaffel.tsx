"use client";

import { motion } from "framer-motion";
import { Wallet } from "lucide-react";

const BRAND_BLUE = "#4682B4";

const STAFFEL = [
  { range: "Bis 250.000 €", provision: "1.000 €", from: 0, to: 250 },
  { range: "250.000 € – 500.000 €", provision: "1.500 €", from: 250, to: 500 },
  { range: "500.000 € – 1 Mio. €", provision: "2.500 €", from: 500, to: 1000 },
  { range: "Ab 1 Mio. €", provision: "5.000 €", from: 1000, to: 1000 },
];

export default function ProvisionsStaffel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mt-12"
    >
      {/* Desktop: horizontale Karten mit Fortschritts-Visualisierung */}
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STAFFEL.map((stufe, i) => (
          <div
            key={stufe.range}
            className="relative flex flex-col rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            style={{ borderColor: i === STAFFEL.length - 1 ? BRAND_BLUE : undefined }}
          >
            {i === STAFFEL.length - 1 && (
              <div
                className="absolute -top-2 right-4 rounded-full px-3 py-0.5 text-xs font-semibold text-white"
                style={{ backgroundColor: BRAND_BLUE }}
              >
                Max.
              </div>
            )}
            <div className="flex items-center gap-2 text-slate-600">
              <Wallet className="h-5 w-5 shrink-0" style={{ color: BRAND_BLUE }} />
              <span className="text-sm font-medium">Kaufpreis</span>
            </div>
            <p className="mt-2 font-semibold text-slate-800">{stufe.range}</p>
            <p className="mt-3 text-2xl font-bold" style={{ color: BRAND_BLUE }}>
              {stufe.provision}
            </p>
            <p className="mt-1 text-sm text-slate-500">Provision</p>
          </div>
        ))}
      </div>

      {/* Mobile: Tabelle */}
      <div className="sm:hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left">
          <thead>
            <tr style={{ backgroundColor: `${BRAND_BLUE}12` }}>
              <th className="px-4 py-3 text-sm font-semibold text-slate-800">Kaufpreis</th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-800 text-right">Provision</th>
            </tr>
          </thead>
          <tbody>
            {STAFFEL.map((stufe) => (
              <tr key={stufe.range} className="border-t border-slate-100">
                <td className="px-4 py-3 text-slate-700">{stufe.range}</td>
                <td className="px-4 py-3 text-right font-semibold" style={{ color: BRAND_BLUE }}>
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
