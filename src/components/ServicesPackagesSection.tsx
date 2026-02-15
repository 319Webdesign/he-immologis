"use client";

import { motion } from "framer-motion";
import { DEFAULT_SERVICES } from "@/data/services";
import MainServiceCard from "@/components/MainServiceCard";
import { ServiceCard } from "@/components/ServiceCards";

const EINZELMODUL_SLUGS = [
  "marktwertanalyse",
  "beratung-begleitung",
  "high-end-immobilienaufnahmen",
  "verkaeuferschutzmodul",
  "kaufvertragsabwicklung",
  "energieausweis",
  "objektkoordination",
] as const;

const ZUSATZMODULE = EINZELMODUL_SLUGS.map(
  (slug) => DEFAULT_SERVICES.find((s) => s.slug === slug)!
).filter(Boolean);

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function ServicesPackagesSection() {
  return (
    <section
      className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
      aria-labelledby="zusatzmodule-heading"
    >
      <div className="mx-auto max-w-7xl">
        <MainServiceCard />

        {/* Verbindung: Verlauf von Karte zu Modulen (Baukasten-Gedanke) */}
        <div
          className="mt-12 h-2 w-full rounded-full opacity-30 sm:mt-16"
          style={{
            background:
              "linear-gradient(180deg, #4682B4 0%, #4682B480 50%, transparent 100%)",
          }}
          aria-hidden
        />

        <h2
          id="zusatzmodule-heading"
          className="mt-12 font-sans text-2xl font-semibold tracking-tight text-slate-900 sm:mt-16 sm:text-3xl"
        >
          Einzelmodule
        </h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {ZUSATZMODULE.map((service) => (
            <motion.div key={service.id} variants={item}>
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
