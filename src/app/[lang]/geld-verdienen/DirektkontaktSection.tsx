"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle, Mail } from "lucide-react";

const BRAND_BLUE = "#4682B4";
const WHATSAPP_GREEN = "#25D366";

const outlineButtonClass =
  "inline-flex min-h-[48px] flex-1 min-w-0 items-center justify-center gap-2 rounded-xl border-2 px-4 py-3 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

const TEXTS = {
  de: {
    guarantee: "Antwort-Garantie < 24h",
    heading: "Tippgeber | Banner- & Aufsteller-Standortpartner",
    subheading:
      "Jetzt Direktkontakt anfragen – Wir melden uns innerhalb von 24 Stunden persönlich bei Ihnen.",
    body: "Teilen Sie uns Ihren Tipp mit oder informieren Sie uns über Ihr Interesse an einer Werbepartnerschaft. Diskret. Unverbindlich. Fair vergütet.",
    whatsapp: "Tipp per WhatsApp senden",
    email: "Anfrage per E-Mail",
    orCall: "Oder anrufen:",
    disclaimer:
      "Ihre Daten werden absolut diskret behandelt. Eine Tippgebervergütung erfolgt nach den Bedingungen unserer Vereinbarung (siehe Downloads).",
    whatsappHref:
      "https://wa.me/4917632198462?text=Hallo%20Holger,%20ich%20habe%20einen%20Tipp/Interesse%20an%20einer%20Partnerschaft.",
    mailtoSubject: "Anfrage%20Tippgeber/Standortpartner",
  },
  en: {
    guarantee: "Response guarantee < 24h",
    heading: "Referrer | Banner & display location partner",
    subheading:
      "Request direct contact now – We will get back to you personally within 24 hours.",
    body: "Share your tip with us or let us know about your interest in an advertising partnership. Discreet. Non-binding. Fairly compensated.",
    whatsapp: "Send tip via WhatsApp",
    email: "Inquiry via e-mail",
    orCall: "Or call:",
    disclaimer:
      "Your data will be treated in strict confidence. Referrer fees are paid according to the terms of our agreement (see Downloads).",
    whatsappHref:
      "https://wa.me/4917632198462?text=Hi%20Holger,%20I%20have%20a%20tip/interest%20in%20a%20partnership.",
    mailtoSubject: "Enquiry%20Referrer/Location%20partner",
  },
} as const;

export default function DirektkontaktSection() {
  const pathname = usePathname();
  const isEn = pathname?.startsWith("/en");
  const t = isEn ? TEXTS.en : TEXTS.de;

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
          {t.guarantee}
        </span>
        <h2
          id="direktkontakt-heading"
          className="mt-4 font-sans text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
        >
          {t.heading}
        </h2>
        <p className="mt-2 text-lg font-medium text-slate-700 sm:text-xl">
          {t.subheading}
        </p>
        <p className="mt-3 text-slate-600">
          {t.body}
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
          <Link
            href={t.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className={`${outlineButtonClass} w-full sm:w-auto sm:flex-initial text-white focus:ring-[#25D366]`}
            style={{ backgroundColor: WHATSAPP_GREEN, borderColor: WHATSAPP_GREEN }}
          >
            <MessageCircle className="h-5 w-5 shrink-0" />
            <span>{t.whatsapp}</span>
          </Link>
          <Link
            href={`mailto:info@he-immologis.de?subject=${t.mailtoSubject}`}
            className={`${outlineButtonClass} w-full sm:w-auto sm:flex-initial text-white focus:ring-[#4682B4]`}
            style={{ backgroundColor: BRAND_BLUE, borderColor: BRAND_BLUE }}
          >
            <Mail className="h-5 w-5 shrink-0" />
            <span>{t.email}</span>
          </Link>
        </div>

        <p className="mt-4 text-center text-slate-600">
          {t.orCall}{" "}
          <a href="tel:+4917632198462" className="font-medium underline hover:no-underline">
            +49 176 321 98 462
          </a>
        </p>

        <p className="mt-6 text-center text-sm text-slate-500">
          {t.disclaimer}
        </p>
      </div>
    </motion.section>
  );
}
