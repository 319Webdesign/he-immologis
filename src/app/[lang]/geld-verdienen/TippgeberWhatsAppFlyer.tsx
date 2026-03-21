"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { MessageCircle, FileText } from "lucide-react";

const TEXTS = {
  de: {
    tippgeberTitle: "Schnell per WhatsApp",
    tippgeberText:
      'Melden Sie Ihren Tippgeberhinweis ganz bequem per WhatsApp. Senden Sie einfach das Stichwort „TIPPGEBER" an 0177 636 1394. Wir melden uns innerhalb von 24 Stunden bei Ihnen.',
    tippgeberCta: "WhatsApp öffnen",
    whatsappTippgeberHref: "https://wa.me/491776361394?text=TIPPGEBER",
    flyerTitle: "Tippgeber-Flyer",
    flyerText:
      'Bestellen Sie Ihre Tippgeber-Flyer ganz bequem per WhatsApp. Senden Sie einfach das Stichwort „TIPPGEBER FLYER" an 0177 636 1394. Wir melden uns innerhalb von 24 Stunden bei Ihnen.',
    flyerCta: "Flyer bestellen",
    whatsappFlyerHref: "https://wa.me/491776361394?text=TIPPGEBER%20FLYER",
  },
  en: {
    tippgeberTitle: "Quick via WhatsApp",
    tippgeberText:
      'Report your referrer tip conveniently via WhatsApp. Simply send the keyword „TIPPGEBER" to 0177 636 1394. We will get back to you within 24 hours.',
    tippgeberCta: "Open WhatsApp",
    whatsappTippgeberHref: "https://wa.me/491776361394?text=TIPPGEBER",
    flyerTitle: "Referrer flyer",
    flyerText:
      'Order your referrer flyers conveniently via WhatsApp. Simply send the keyword „TIPPGEBER FLYER" to 0177 636 1394. We will get back to you within 24 hours.',
    flyerCta: "Order flyer",
    whatsappFlyerHref: "https://wa.me/491776361394?text=TIPPGEBER%20FLYER",
  },
  tr: {
    tippgeberTitle: "WhatsApp ile hızlı",
    tippgeberText:
      'Öneri veren ipucunuzu WhatsApp ile rahatça bildirin. Sadece „TIPPGEBER" anahtar kelimesini 0177 636 1394 numarasına gönderin. 24 saat içinde size geri dönüş yapacağız.',
    tippgeberCta: "WhatsApp'ı aç",
    whatsappTippgeberHref: "https://wa.me/491776361394?text=TIPPGEBER",
    flyerTitle: "Öneri veren broşürü",
    flyerText:
      'Öneri veren broşürlerinizi WhatsApp ile rahatça sipariş edin. Sadece „TIPPGEBER FLYER" anahtar kelimesini 0177 636 1394 numarasına gönderin. 24 saat içinde size geri dönüş yapacağız.',
    flyerCta: "Broşür sipariş et",
    whatsappFlyerHref: "https://wa.me/491776361394?text=TIPPGEBER%20FLYER",
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
      aria-label="Tippgeber per WhatsApp und Flyer bestellen"
    >
      <div className="mx-auto max-w-4xl">
        <div className="grid gap-6 sm:grid-cols-2">
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
              {t.tippgeberText}
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

          <div
            className="rounded-xl border border-slate-200 bg-slate-50 p-5"
            aria-labelledby="flyer-heading"
          >
            <h3
              id="flyer-heading"
              className="font-sans text-lg font-semibold tracking-tight text-slate-900"
            >
              {t.flyerTitle}
            </h3>
            <p className="mt-3 text-slate-600 leading-relaxed text-sm">
              {t.flyerText}
            </p>
            <Link
              href={t.whatsappFlyerHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 px-4 py-3 font-medium text-white transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#25D366]"
              style={{ backgroundColor: "#25D366", borderColor: "#25D366" }}
            >
              <FileText className="h-5 w-5 shrink-0" />
              <span>{t.flyerCta}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
