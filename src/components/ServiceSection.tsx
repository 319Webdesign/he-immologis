"use client";

import { Calculator, Image, FileCheck, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

const BRAND_BLUE = "#4682B4";

const ICON_MAP: Record<string, LucideIcon> = {
  calculator: Calculator,
  image: Image,
  "file-check": FileCheck,
};

interface ServiceSectionProps {
  number: string;
  icon: keyof typeof ICON_MAP;
  title: string;
  description: string;
  features: string[];
}

export default function ServiceSection({
  number,
  icon,
  title,
  description,
  features,
}: ServiceSectionProps) {
  const Icon = ICON_MAP[icon] ?? Calculator;
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="border-b border-slate-200 py-16 last:border-b-0 sm:py-20 lg:py-24"
      aria-labelledby={`service-heading-${number}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">
          {/* Nummer + Icon */}
          <div className="flex shrink-0 items-center gap-6">
            <span
              className="font-sans text-4xl font-semibold tabular-nums tracking-tight sm:text-5xl"
              style={{ color: BRAND_BLUE }}
              aria-hidden
            >
              {number}
            </span>
            <div
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-white sm:h-16 sm:w-16"
              style={{ backgroundColor: BRAND_BLUE }}
              aria-hidden
            >
              <Icon className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={1.75} />
            </div>
          </div>

          {/* Inhalt */}
          <div className="min-w-0 flex-1">
            <h2
              id={`service-heading-${number}`}
              className="font-sans text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
            >
              {title}
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-700">
              {description}
            </p>
            <ul className="mt-6 list-none space-y-2" role="list">
              {features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-3 text-slate-700"
                >
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: BRAND_BLUE }}
                    aria-hidden
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
