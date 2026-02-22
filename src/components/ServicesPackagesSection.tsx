"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { DEFAULT_SERVICES, type ServiceCardItem } from "@/data/services";
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
  "nachbetreuungsmodul",
] as const;

function buildZusatzmodule(): ServiceCardItem[] {
  const list: ServiceCardItem[] = [];
  for (const slug of EINZELMODUL_SLUGS) {
    const service = DEFAULT_SERVICES.find((s) => s.slug === slug);
    if (service) list.push(service);
  }
  return list;
}

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

export type ServicesPackagesSectionDict = {
  mainCard: {
    badge: string;
    title: string;
    subtitle: string;
    stepsIntro: string;
    features: string[];
    priceParagraph: string;
    moreInfoButton: string;
  };
  modulesHeading: string;
  modulesAriaLabel: string;
  cardMoreInfo: string;
};

interface ServicesPackagesSectionProps {
  dict: ServicesPackagesSectionDict;
  lang: string;
}

export default function ServicesPackagesSection({ dict, lang }: ServicesPackagesSectionProps) {
  const zusatzmodule = useMemo(buildZusatzmodule, []);

  return (
    <section
      className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
      aria-labelledby="zusatzmodule-heading"
    >
      <div className="mx-auto max-w-7xl">
        <MainServiceCard dict={dict.mainCard} lang={lang} />

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
          {dict.modulesHeading}
        </h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          aria-label={`${zusatzmodule.length} ${dict.modulesAriaLabel}`}
        >
          {zusatzmodule.map((service) => (
            <motion.div key={service.slug} variants={item}>
              <ServiceCard service={service} lang={lang} moreInfoText={dict.cardMoreInfo} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
