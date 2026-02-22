"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle, Mail } from "lucide-react";

const BRAND_BLUE = "#4682B4";
const WHATSAPP_GREEN = "#25D366";

const outlineButtonClass =
  "inline-flex min-h-[48px] flex-1 min-w-0 items-center justify-center gap-2 rounded-xl border-2 px-4 py-3 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

export default function DirektkontaktSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.005 }}
      className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-8 shadow-sm sm:px-8 sm:py-10"
      aria-labelledby="direktkontakt-heading"
    >
      <div className="mx-auto max-w-3xl">
        <span className="inline-block rounded-full bg-slate-200 px-3 py-1 text-xs font-medium text-slate-700">
          Antwort-Garantie &lt; 24h
        </span>
        <h2
          id="direktkontakt-heading"
          className="mt-4 font-sans text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
        >
          Tippgeber | Banner- &amp; Aufsteller-Standortpartner
        </h2>
        <p className="mt-2 text-lg font-medium text-slate-700 sm:text-xl">
          Jetzt Direktkontakt anfragen – Wir melden uns innerhalb von 24 Stunden persönlich bei
          Ihnen.
        </p>
        <p className="mt-3 text-slate-600">
          Teilen Sie uns Ihren Tipp mit oder informieren Sie uns über Ihr Interesse an einer
          Werbepartnerschaft. Diskret. Unverbindlich. Fair vergütet.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
          <Link
            href="https://wa.me/4917632198462?text=Hallo%20Holger,%20ich%20habe%20einen%20Tipp/Interesse%20an%20einer%20Partnerschaft."
            target="_blank"
            rel="noopener noreferrer"
            className={`${outlineButtonClass} w-full sm:w-auto sm:flex-initial text-white focus:ring-[#25D366]`}
            style={{ backgroundColor: WHATSAPP_GREEN, borderColor: WHATSAPP_GREEN }}
          >
            <MessageCircle className="h-5 w-5 shrink-0" />
            <span>Tipp per WhatsApp senden</span>
          </Link>
          <Link
            href="mailto:info@he-immologis.de?subject=Anfrage%20Tippgeber/Standortpartner"
            className={`${outlineButtonClass} w-full sm:w-auto sm:flex-initial text-white focus:ring-[#4682B4]`}
            style={{ backgroundColor: BRAND_BLUE, borderColor: BRAND_BLUE }}
          >
            <Mail className="h-5 w-5 shrink-0" />
            <span>Anfrage per E-Mail</span>
          </Link>
        </div>

        <p className="mt-4 text-center text-slate-600">
          Oder anrufen:{" "}
          <a href="tel:+4917632198462" className="font-medium underline hover:no-underline">
            +49 176 321 98 462
          </a>
        </p>

        <p className="mt-6 text-center text-sm text-slate-500">
          Ihre Daten werden absolut diskret behandelt. Eine Tippgebervergütung erfolgt nach den
          Bedingungen unserer Vereinbarung (siehe Downloads).
        </p>
      </div>
    </motion.section>
  );
}
