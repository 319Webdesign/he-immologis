"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const BRAND_BLUE = "#4682B4";
const IMAGE_SRC = "/img/hausvorschau.jpeg";

const FEATURES = [
  "Präzise Wertermittlung",
  "Hochwertige Aufbereitung",
  "Gezieltes Marketing & Käuferprüfung",
  "Finanzierungssicherheit",
  "Notar & Übergabe",
];

export default function MainServiceCard() {
  return (
    <motion.article
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md transition-all duration-300 hover:shadow-xl"
      aria-labelledby="main-service-title"
    >
      <div className="grid min-h-[320px] grid-cols-1 lg:grid-cols-2">
        {/* Bild-Seite */}
        <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[320px]">
          <Image
            src={IMAGE_SRC}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          <span
            className="absolute right-4 top-4 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg"
            style={{ backgroundColor: BRAND_BLUE }}
          >
            Komplettmandat
          </span>
        </div>

        {/* Text + Checkliste */}
        <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
          <h2
            id="main-service-title"
            className="font-sans text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
          >
            Der komplette Verkaufsprozess
            <span className="mt-1 block text-lg font-semibold text-slate-900 sm:text-xl">
              – von der Bewertung bis zur Übergabe
            </span>
          </h2>
          <p className="mt-3 text-slate-600">
            Ein sicherer Verkauf in 5 klaren Schritten
          </p>
          <ul className="mt-6 space-y-3" aria-label="Enthaltene Leistungen">
            {FEATURES.map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-700">
                <span
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white"
                  style={{ backgroundColor: BRAND_BLUE }}
                >
                  <Check className="h-3.5 w-3.5" aria-hidden />
                </span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-slate-700">
            Für diesen umfassenden Service berechnen wir das ortsübliche Erfolgshonorar von 3,57 % inkl. MwSt., bezogen auf den notariell beurkundeten Kaufpreis.
          </p>
          <Link
            href="/immobilien-services/immobilienverkauf"
            className="mt-6 flex w-full items-center justify-center rounded-lg px-4 py-3 text-sm font-semibold text-white transition-colors hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-[#4682B4] focus:ring-offset-2 sm:w-auto"
            style={{ backgroundColor: BRAND_BLUE }}
          >
            Mehr Infos
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
