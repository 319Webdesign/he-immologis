"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle, Mail, FileText } from "lucide-react";

const BRAND_BLUE = "#F9423A";
const CTA_ACCENT = "#85b09a";

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
    contactLabel: "Ihr Ansprechpartner",
    disclaimer:
      "Ihre Daten werden absolut diskret behandelt. Eine Tippgebervergütung erfolgt nach den Bedingungen unserer Vereinbarung (siehe Downloads).",
    whatsappHref:
      "https://wa.me/491776361394?text=Hallo%20Holger,%20ich%20habe%20einen%20Tipp/Interesse%20an%20einer%20Partnerschaft.",
    mailtoSubject: "Anfrage%20Tippgeber/Standortpartner",
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
    guarantee: "Response guarantee < 24h",
    heading: "Referrer | Banner & display location partner",
    subheading:
      "Request direct contact now – We will get back to you personally within 24 hours.",
    body: "Share your tip with us or let us know about your interest in an advertising partnership. Discreet. Non-binding. Fairly compensated.",
    whatsapp: "Send tip via WhatsApp",
    email: "Inquiry via e-mail",
    orCall: "Or call:",
    contactLabel: "Your contact person",
    disclaimer:
      "Your data will be treated in strict confidence. Referrer fees are paid according to the terms of our agreement (see Downloads).",
    whatsappHref:
      "https://wa.me/491776361394?text=Hi%20Holger,%20I%20have%20a%20tip/interest%20in%20a%20partnership.",
    mailtoSubject: "Enquiry%20Referrer/Location%20partner",
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
    guarantee: "24 saat içinde yanıt garantisi",
    heading: "Öneri veren | Banner & Dikici reklam alanı ortağı",
    subheading:
      "Şimdi doğrudan iletişim talep edin – 24 saat içinde size kişisel olarak geri dönüş yapacağız.",
    body: "Önerinizi bizimle paylaşın veya reklam ortaklığı konusundaki ilginizi bildirin. Gizli. Bağlayıcı değil. Adil ücretlendirme.",
    whatsapp: "Öneriyi WhatsApp ile gönder",
    email: "E-posta ile talepte bulun",
    orCall: "Veya arayın:",
    contactLabel: "İletişim kişiniz",
    disclaimer:
      "Verileriniz kesinlikle gizli tutulacaktır. Öneri veren ücreti anlaşmamızın koşullarına göre ödenir (İndirmeler bölümüne bakın).",
    whatsappHref:
      "https://wa.me/491776361394?text=Merhaba%20Holger,%20bir%20önerim/ortaklık%20ilgim%20var.",
    mailtoSubject: "Talep%20Öneri%20veren/Alan%20ortaklığı",
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

export default function DirektkontaktSection() {
  const pathname = usePathname();
  const isEn = pathname?.startsWith("/en");
  const isTr = pathname?.startsWith("/tr");
  const t = isTr ? TEXTS.tr : isEn ? TEXTS.en : TEXTS.de;

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.005 }}
      className="mx-auto max-w-6xl rounded-2xl border border-slate-200 bg-slate-50 px-6 py-8 shadow-sm sm:px-8 sm:py-10"
      aria-labelledby="direktkontakt-heading"
    >
      <div className="space-y-8">
        <div className="grid gap-6 sm:grid-cols-2">
          <div
            className="rounded-xl border border-slate-200 bg-white p-5"
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
            className="rounded-xl border border-slate-200 bg-white p-5"
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

        <div className="border-t border-slate-200 pt-8">
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
              className={`${outlineButtonClass} w-full sm:w-auto sm:flex-initial text-white focus:ring-[#85b09a]`}
              style={{ backgroundColor: CTA_ACCENT, borderColor: CTA_ACCENT }}
            >
              <MessageCircle className="h-5 w-5 shrink-0" />
              <span>{t.whatsapp}</span>
            </Link>
            <Link
              href={`mailto:info@he-immologis.de?subject=${t.mailtoSubject}`}
              className={`${outlineButtonClass} w-full sm:w-auto sm:flex-initial text-white focus:ring-[#85b09a]`}
              style={{ backgroundColor: CTA_ACCENT, borderColor: CTA_ACCENT }}
            >
              <Mail className="h-5 w-5 shrink-0" />
              <span>{t.email}</span>
            </Link>
          </div>

          <p className="mt-4 text-center text-slate-600">
            {t.orCall}{" "}
            <a href="tel:+491776361394" className="font-medium underline hover:no-underline" style={{ color: "#F9423A" }}>
              +49 177 636 1394
            </a>
          </p>

          <div className="mt-6 flex flex-col items-center">
            <p className="text-sm font-medium text-slate-700">{t.contactLabel}</p>
            <p className="mt-1 text-lg font-semibold text-slate-900">Holger Eberhard</p>
            <Image
              src="/img/unterschrift-neu.png"
              alt="Unterschrift Holger Eberhard"
              width={200}
              height={80}
              className="mt-3 max-h-16 w-auto object-contain object-center"
            />
          </div>

          <p className="mt-6 text-center text-sm text-slate-500">
            {t.disclaimer}
          </p>
        </div>
      </div>
    </motion.section>
  );
}
