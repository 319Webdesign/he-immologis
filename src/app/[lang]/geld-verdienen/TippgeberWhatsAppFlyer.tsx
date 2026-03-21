"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

const TEXTS = {
  de: {
    tippgeberTitle: "Schnell per WhatsApp",
    tippgeberTextBefore:
      'Melden Sie Ihren Tippgeberhinweis ganz bequem per WhatsApp. Senden Sie einfach das Stichwort „',
    tippgeberTextAfter: '" an 0177 636 1394. Wir melden uns innerhalb von 24 Stunden bei Ihnen.',
    tippgeberCta: "WhatsApp öffnen",
    whatsappTippgeberHref: "https://wa.me/491776361394?text=TIPPGEBER",
  },
  en: {
    tippgeberTitle: "Quick via WhatsApp",
    tippgeberTextBefore:
      'Report your referrer tip conveniently via WhatsApp. Simply send the keyword „',
    tippgeberTextAfter: '" to 0177 636 1394. We will get back to you within 24 hours.',
    tippgeberCta: "Open WhatsApp",
    whatsappTippgeberHref: "https://wa.me/491776361394?text=TIPPGEBER",
  },
  tr: {
    tippgeberTitle: "WhatsApp ile hızlı",
    tippgeberTextBefore:
      'Öneri veren ipucunuzu WhatsApp ile rahatça bildirin. Sadece „',
    tippgeberTextAfter: '" anahtar kelimesini 0177 636 1394 numarasına gönderin. 24 saat içinde size geri dönüş yapacağız.',
    tippgeberCta: "WhatsApp'ı aç",
    whatsappTippgeberHref: "https://wa.me/491776361394?text=TIPPGEBER",
  },
} as const;

export default function TippgeberWhatsAppFlyer() {
  const pathname = usePathname();
  const isEn = pathname?.startsWith("/en");
  const isTr = pathname?.startsWith("/tr");
  const t = isTr ? TEXTS.tr : isEn ? TEXTS.en : TEXTS.de;

  return (
    <section
      className="bg-white px-4 py-8 sm:px-6 sm:py-10 lg:px-8"
      aria-label="Tippgeber per WhatsApp"
    >
      <div className="mx-auto max-w-4xl">
        <div className="mx-auto max-w-xl text-center">
          <div
            className="rounded-xl border border-slate-200 bg-slate-50 p-5"
            aria-labelledby="tippgeber-heading"
          >
            <h3
              id="tippgeber-heading"
              className="font-sans text-lg font-semibold tracking-tight text-slate-900"
            >
              {t.tippgeberTitle}
            </h3>
            <p className="mt-3 text-slate-600 leading-relaxed text-sm">
              {t.tippgeberTextBefore}
              <span style={{ color: "#F9423A", fontWeight: 600 }}>TIPPGEBER</span>
              {t.tippgeberTextAfter}
            </p>
            <Link
              href={t.whatsappTippgeberHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 px-4 py-3 font-medium text-white transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#25D366]"
              style={{ backgroundColor: "#25D366", borderColor: "#25D366" }}
            >
              <MessageCircle className="h-5 w-5 shrink-0" />
              <span>{t.tippgeberCta}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
