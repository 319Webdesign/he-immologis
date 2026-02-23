"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Printer, PenLine, Mail, ArrowRight } from "lucide-react";

const BRAND_BLUE = "#4682B4";

const STEPS_DE = [
  {
    step: 1,
    icon: Printer,
    text: "Laden Sie sich das Tippgeber-Formular herunter und drucken Sie es bequem aus.",
  },
  {
    step: 2,
    icon: PenLine,
    text: "Tragen Sie Ihre Daten und die Informationen zur Immobilie ein. Diskretion ist für uns selbstverständlich.",
  },
  {
    step: 3,
    icon: Mail,
    text: "Senden Sie das Foto oder den Scan des Formulars einfach an info@he-immologis.de oder per WhatsApp.",
  },
];

const STEPS_EN = [
  {
    step: 1,
    icon: Printer,
    text: "Download the referrer form and print it at your convenience.",
  },
  {
    step: 2,
    icon: PenLine,
    text: "Enter your details and the property information. Discretion is a matter of course for us.",
  },
  {
    step: 3,
    icon: Mail,
    text: "Simply send a photo or scan of the form to info@he-immologis.de or via WhatsApp.",
  },
];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const HEADING_DE = "So einfach werden Sie zum Tippgeber";
const HEADING_EN = "It's that simple to become a referrer";

export default function TippgeberHowTo() {
  const pathname = usePathname();
  const isEn = pathname?.startsWith("/en");
  const steps = isEn ? STEPS_EN : STEPS_DE;
  const heading = isEn ? HEADING_EN : HEADING_DE;
  const stepCount = steps.length;

  return (
    <div className="mt-14">
      <h3 className="font-sans text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
        {heading}
      </h3>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6"
      >
        {steps.map(({ step, icon: Icon, text }, index) => (
          <motion.div
            key={step}
            variants={item}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative flex flex-col items-center text-center"
          >
            <span
              className="mb-3 inline-flex h-7 min-w-7 items-center justify-center rounded-full px-2 text-sm font-semibold text-white"
              style={{ backgroundColor: BRAND_BLUE }}
            >
              {step}
            </span>
            <div
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-50"
              aria-hidden
            >
              <Icon className="h-7 w-7" style={{ color: BRAND_BLUE }} />
            </div>
            <p className="mt-4 font-sans text-slate-700">{text}</p>
            {index < stepCount - 1 && (
              <div
                className="absolute -right-3 top-14 hidden md:block"
                aria-hidden
              >
                <ArrowRight className="h-5 w-5 shrink-0 text-slate-300" />
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>

    </div>
  );
}
