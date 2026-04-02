"use client";

import { useState, useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mail } from "lucide-react";
import type { Locale } from "@/lib/i18n";

const STORAGE_KEY = "he-immologis-coming-soon-dismissed";
const WHATSAPP_HREF = "https://wa.me/491776361394";
const CONTACT_EMAIL = "info@he-immologis.de";

/** 11.05.2026, 08:00 Uhr (Mitteleuropäische Sommerzeit, Weinheim) */
const LAUNCH_AT = new Date("2026-05-11T08:00:00+02:00");

const copy = {
  de: {
    title: "Countdown 11. Mai 2026",
    body:
      "Ab dem 11.05.2026 gehen wir als Ihr Immobilienmakler in Weinheim und der Rhein-Neckar-Region an den Start. Bereits heute erreichen Sie uns per WhatsApp oder E-Mail.",
    units: {
      days: "Tage",
      hours: "Std",
      minutes: "Min",
      seconds: "Sek",
    },
    emailHint: "E-Mail",
    whatsappHint: "WhatsApp",
    button: "Erste Einblicke entdecken",
  },
  en: {
    title: "Countdown 11 May 2026",
    body:
      "From 11 May 2026 we will launch as your real estate agent in Weinheim and the Rhine-Neckar region. You can already reach us via WhatsApp or email.",
    units: {
      days: "Days",
      hours: "Hrs",
      minutes: "Min",
      seconds: "Sec",
    },
    emailHint: "Email",
    whatsappHint: "WhatsApp",
    button: "Discover first impressions",
  },
  tr: {
    title: "Geri sayım 11 Mayıs 2026",
    body:
      "11 Mayıs 2026 tarihinden itibaren Weinheim ve Ren-Neckar bölgesinde emlak danışmanınız olarak faaliyete geçiyoruz. Bugünden itibaren bize WhatsApp veya e-posta ile ulaşabilirsiniz.",
    units: {
      days: "Gün",
      hours: "Sa",
      minutes: "Dk",
      seconds: "Sn",
    },
    emailHint: "E-posta",
    whatsappHint: "WhatsApp",
    button: "İlk izlenimleri keşfedin",
  },
} as const;

type CountdownUnitLabels = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};

function useCountdown(target: Date) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return useMemo(() => {
    const ms = Math.max(0, target.getTime() - now);
    const totalSec = Math.floor(ms / 1000);
    return {
      days: Math.floor(totalSec / 86400),
      hours: Math.floor((totalSec % 86400) / 3600),
      minutes: Math.floor((totalSec % 3600) / 60),
      seconds: totalSec % 60,
      expired: ms === 0,
    };
  }, [now, target]);
}

function CountdownGrid({
  target,
  units,
}: {
  target: Date;
  units: CountdownUnitLabels;
}) {
  const { days, hours, minutes, seconds, expired } = useCountdown(target);

  const pad2 = (n: number) => n.toString().padStart(2, "0");
  const ariaLabel = expired
    ? "0"
    : `${days} ${units.days}, ${hours} ${units.hours}, ${minutes} ${units.minutes}, ${seconds} ${units.seconds}`;

  const cells = [
    { value: String(expired ? 0 : days), label: units.days, wide: true },
    { value: pad2(expired ? 0 : hours), label: units.hours, wide: false },
    { value: pad2(expired ? 0 : minutes), label: units.minutes, wide: false },
    { value: pad2(expired ? 0 : seconds), label: units.seconds, wide: false },
  ];

  return (
    <div className="mt-5">
      <p className="sr-only" aria-live="polite">
        {ariaLabel}
      </p>
      <div
        className="grid grid-cols-4 gap-2 sm:gap-3"
        aria-hidden
      >
        {cells.map((cell) => (
          <div
            key={cell.label}
            className={`rounded-xl border border-emerald-200/90 bg-emerald-50/95 px-1 py-2.5 shadow-sm shadow-emerald-900/5 ring-1 ring-emerald-100/80 sm:py-3 ${cell.wide ? "min-w-0" : ""}`}
          >
            <div
              className={`font-sans font-semibold tabular-nums text-emerald-950 ${cell.wide ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"}`}
            >
              {cell.value}
            </div>
            <div className="mt-0.5 text-[0.65rem] font-medium uppercase tracking-wide text-emerald-700/90 sm:text-[0.7rem]">
              {cell.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface ComingSoonModalProps {
  lang: Locale;
}

export default function ComingSoonModal({ lang }: ComingSoonModalProps) {
  const [open, setOpen] = useState(false);
  const t = copy[lang];

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(STORAGE_KEY)) return;
    queueMicrotask(() => setOpen(true));
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const dismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore quota / private mode */
    }
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="coming-soon-overlay"
          className="fixed inset-0 z-[100] flex items-end justify-center p-4 pb-6 sm:items-center sm:pb-4"
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
        >
          <div
            className="absolute inset-0 bg-stone-900/45 backdrop-blur-md"
            aria-hidden
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="countdown-modal-title"
            aria-describedby="countdown-modal-desc"
            className="relative w-full max-w-md rounded-2xl border border-stone-200/80 bg-stone-50 px-5 py-6 shadow-xl shadow-stone-900/10 sm:px-7 sm:py-8"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="text-center">
              <h2
                id="countdown-modal-title"
                className="font-sans text-xl font-semibold tracking-tight text-stone-900 sm:text-2xl"
              >
                {t.title}
              </h2>
              <CountdownGrid target={LAUNCH_AT} units={t.units} />
            </div>
            <p
              id="countdown-modal-desc"
              className="mt-5 text-sm leading-relaxed text-stone-600 sm:text-base"
            >
              {t.body}
            </p>

            <div className="mt-4 flex flex-col gap-3 text-sm text-stone-500 sm:text-base">
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center gap-2 rounded-lg border border-stone-200/90 bg-white/80 px-3 py-2.5 text-stone-700 transition-colors hover:border-emerald-300/80 hover:bg-emerald-50/50 hover:text-stone-900 sm:py-2"
              >
                <span
                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#25D366]/12"
                  aria-hidden
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="#25D366"
                    aria-hidden
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </span>
                <span className="text-left leading-snug">
                  <span className="block text-xs font-normal text-stone-500">
                    {t.whatsappHint}
                  </span>
                  <span className="font-medium text-stone-800">
                    +49 177 636 1394
                  </span>
                </span>
              </a>

              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex w-full items-center gap-2 rounded-lg border border-stone-200/90 bg-white/80 px-3 py-2.5 text-stone-700 transition-colors hover:border-[#F9423A]/40 hover:bg-[#F9423A]/[0.06] hover:text-stone-900 sm:py-2"
              >
                <span
                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-stone-200/80 text-stone-600"
                  aria-hidden
                >
                  <Mail className="h-4 w-4" strokeWidth={2} />
                </span>
                <span className="min-w-0 flex-1 text-left leading-snug">
                  <span className="block text-xs font-normal text-stone-500">
                    {t.emailHint}
                  </span>
                  <span className="break-words font-medium text-stone-800">
                    {CONTACT_EMAIL}
                  </span>
                </span>
              </a>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={dismiss}
                className="w-full rounded-xl bg-[#F9423A] px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#fb6a5a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F9423A] focus-visible:ring-offset-2 sm:text-base"
              >
                {t.button}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
