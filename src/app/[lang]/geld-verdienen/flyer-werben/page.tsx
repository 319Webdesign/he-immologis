import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, MessageCircle } from "lucide-react";
import DonationOption from "@/components/DonationOption";
import { getLocaleFromHeaders } from "@/lib/i18n";

const BRAND_BLUE = "#F9423A";
const CTA_ACCENT = "#85b09a";

const outlineButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-lg border-2 bg-white px-4 py-3 font-medium transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2";

const TEXTS = {
  de: {
    metaTitle: "Flyer werben – Tippgeber-Flyer verteilen und Prämie sichern",
    metaDescription:
      "Verteilen Sie Tippgeber-Flyer von HE immologis und sichern Sie sich eine Prämie bei erfolgreichem Verkauf. Bestellen Sie Flyer per WhatsApp – kostenlos und unverbindlich.",
    metaKeywords: ["Flyer werben", "Tippgeber-Flyer", "Flyer verteilen", "HE immologis"],
    backLink: "Zurück zu Geld verdienen",
    heroTitle: "Geld verdienen mit Tippgeber-Flyern",
    heroIntro:
      "Bestellen Sie kostenlos Tippgeber-Flyer von HE immologis und verteilen Sie diese in Ihrem Umfeld.\nIn Ihrer Nachbarschaft, Freunden und Bekannten, im Verein, am Arbeitsplatz.",
    heroCta: "Prämie bei erfolgreichem Verkauf",
    flyerPateTitle: "Ihr Stadtviertel. Ihre Flyer. Ihre Provision.",
    flyerPateSubtitle: "Werden Sie Flyer-Pate für Ihr Stadtviertel",
    flyerPateBodyBefore:
      "Sichern Sie sich Ihr Flyer-Gebiet und übernehmen Sie die Verteilung der Flyer in Ihrem Viertel.\nSie bestellen die Flyer ganz unkompliziert per WhatsApp in einem Wort „",
    flyerPateBodyHighlight: "Tippgeber Flyer",
    flyerPateBodyAfter:
      "\".\nIch liefere Ihnen die Flyer persönlich nachhause.\nAuf diese Weise können Sie in Ihrem Umfeld ganz einfach Empfehlungen weitergeben und sich attraktive Provisionen sichern.",
    flyerPateNote:
      "Natürlich erhalten Sie eine offizielle Tippgeber-Vereinbarung. Es gelten dieselben Provisionsregelungen wie für alle anderen Tippgeber.",
    ablaufTitle: "So funktioniert's",
    step1Title: "Flyer bestellen",
    step1TextBefore: 'Senden Sie in einem Wort:\n„',
    step1TextHighlight: "Tippgeber Flyer",
    step1TextAfter: '" per WhatsApp an 0177 636 1394. Wir melden uns innerhalb von 24 Stunden.',
    step2Title: "Flyer verteilen",
    step2Text: "Verteilen Sie die Flyer in Ihrem Umfeld – dort, wo Sie Menschen kennen, die verkaufen möchten.",
    step3Title: "Prämie erhalten",
    step3Text: "Bei erfolgreichem Immobilienverkauf über Ihren Flyer erhalten Sie Ihre Prämie nach notariellem Kaufvertragsabschluss.",
    content2:
      "Sie müssen niemanden ansprechen oder vermitteln – der Flyer spricht für sich. Kommt ein Verkauf zustande, erhalten Sie Ihre Prämie. Bestellung und Verteilung sind kostenlos und unverbindlich. Sie handeln rechtlich selbstständig.",
    ctaTitle: "Tippgeber Flyer bestellen",
    ctaSub: "Schicken Sie uns eine Nachricht per WhatsApp oder E-Mail.",
    orCall: "Oder anrufen:",
  },
  en: {
    metaTitle: "Flyer advertising – Distribute referrer flyers and earn a bonus",
    metaDescription:
      "Distribute HE immologis referrer flyers and earn a bonus on successful sale. Order flyers via WhatsApp – free and non-binding.",
    metaKeywords: ["Flyer advertising", "Referrer flyer", "Distribute flyers", "HE immologis"],
    backLink: "Back to Earn money",
    heroTitle: "Earn money with referrer flyers",
    heroIntro:
      "Order free referrer flyers from HE immologis and distribute them in your area – to neighbours, friends and acquaintances, at your club, or at work.",
    heroCta: "Bonus on successful sale",
    flyerPateTitle: "Your neighbourhood. Your flyers. Your commission.",
    flyerPateSubtitle: "Become a flyer patron for your neighbourhood",
    flyerPateBodyBefore:
      "Secure your flyer area and take over the distribution of flyers in your neighbourhood.\nYou can order the flyers easily via WhatsApp with just one word: „",
    flyerPateBodyHighlight: "Referrer Flyer",
    flyerPateBodyAfter:
      "\".\nI will deliver the flyers to your home personally.\nThis way you can simply pass on recommendations in your area and secure attractive commissions.",
    flyerPateNote:
      "Of course you will receive an official referrer agreement. The same commission rules apply as for all other referrers.",
    ablaufTitle: "How it works",
    step1Title: "Order flyers",
    step1TextBefore: 'Send the message „',
    step1TextHighlight: "Referrer Flyer",
    step1TextAfter: '" via WhatsApp to 0177 636 1394. We will get back to you within 24 hours.',
    step2Title: "Distribute flyers",
    step2Text: "Distribute the flyers in your area – where you know people who want to sell.",
    step3Title: "Receive your bonus",
    step3Text: "On successful property sale through your flyer, you receive your bonus after completion of the notarial purchase contract.",
    content2:
      "You don't have to approach or refer anyone – the flyer speaks for itself. If a sale is completed, you receive your bonus. Ordering and distribution are free and non-binding. You act as an independent party.",
    ctaTitle: "Order referrer flyers",
    ctaSub: "Send us a message via WhatsApp or email.",
    orCall: "Or call:",
  },
  tr: {
    metaTitle: "Broşür reklamı – Öneri veren broşürleri dağıtın, prim kazanın",
    metaDescription:
      "HE immologis öneri veren broşürlerini dağıtın ve başarılı satışta prim kazanın. WhatsApp ile broşür sipariş edin – ücretsiz ve bağlayıcı değil.",
    metaKeywords: ["Broşür reklamı", "Öneri veren broşürü", "Broşür dağıt", "HE immologis"],
    backLink: "Para kazanmaya geri dön",
    heroTitle: "Öneri veren broşürleriyle para kazanın",
    heroIntro:
      "HE immologis'ten ücretsiz öneri veren broşürleri sipariş edin ve çevrenizde dağıtın.\nMahallenizde, arkadaş ve tanıdıklarınıza, dernekte veya işyerinde.",
    heroCta: "Başarılı satışta prim",
    flyerPateTitle: "Mahalleniz. Broşürleriniz. Komisyonunuz.",
    flyerPateSubtitle: "Mahalleniz için broşür patronu olun",
    flyerPateBodyBefore:
      "Broşür bölgenizi güvence altına alın ve mahallenizde broşür dağıtımını üstlenin.\nBroşürleri WhatsApp ile kolayca tek kelimeyle „",
    flyerPateBodyHighlight: "Öneri Veren Broşürü",
    flyerPateBodyAfter:
      "\" sipariş edin.\nBroşürleri size kişisel olarak eve teslim ediyorum.\nBu şekilde çevrenizde kolayca tavsiyeleri iletebilir ve cazip komisyonlar kazanabilirsiniz.",
    flyerPateNote:
      "Tabii ki resmi bir öneri veren sözleşmesi alacaksınız. Tüm diğer öneri verenler için geçerli olan aynı komisyon kuralları uygulanır.",
    ablaufTitle: "Nasıl çalışır",
    step1Title: "Broşür sipariş edin",
    step1TextBefore: '0177 636 1394 numarasına WhatsApp ile tek kelimeyle „',
    step1TextHighlight: "Öneri Veren Broşürü",
    step1TextAfter: '" gönderin. 24 saat içinde size geri dönüş yapacağız.',
    step2Title: "Broşürleri dağıtın",
    step2Text: "Broşürleri çevrenizde dağıtın – satmak isteyen insanları tanıdığınız yerde.",
    step3Title: "Priminizi alın",
    step3Text: "Broşürünüz üzerinden başarılı gayrimenkul satışında noter satış sözleşmesi tamamlandıktan sonra priminizi alırsınız.",
    content2:
      "Kimseye hitap etmeniz veya aracılık yapmanız gerekmiyor – broşür kendisi konuşuyor. Satış gerçekleşirse priminizi alırsınız. Sipariş ve dağıtım ücretsiz ve bağlayıcı değildir. Hukuken bağımsız hareket ediyorsunuz.",
    ctaTitle: "Öneri veren broşürü sipariş edin",
    ctaSub: "Bize WhatsApp veya e-posta ile mesaj gönderin.",
    orCall: "Veya arayın:",
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocaleFromHeaders();
  const t = TEXTS[locale === "tr" ? "tr" : locale === "en" ? "en" : "de"];
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    keywords: [...t.metaKeywords],
  };
}

export default async function FlyerWerbenPage() {
  const locale = await getLocaleFromHeaders();
  const localeKey = locale === "tr" ? "tr" : locale === "en" ? "en" : "de";
  const t = TEXTS[localeKey];
  const prefix = locale === "en" ? "/en" : locale === "tr" ? "/tr" : "";

  return (
    <>
      <section
        className="relative flex min-h-[400px] items-center overflow-hidden border-b border-slate-200 px-4 py-12 sm:min-h-[480px] sm:px-6 sm:py-16 lg:px-8"
        aria-labelledby="flyer-hero-heading"
      >
        {/* Hintergrund: beide Flyer nebeneinander */}
        <div className="absolute inset-0 flex">
          <div className="relative w-1/2">
            <Image
              src="/img/flyerhinten.jpeg"
              alt=""
              fill
              className="object-cover object-right"
              sizes="50vw"
              priority
              quality={90}
              aria-hidden
            />
          </div>
          <div className="relative w-1/2">
            <Image
              src="/img/flyervorne.jpeg"
              alt=""
              fill
              className="object-cover object-left"
              sizes="50vw"
              priority
              quality={90}
              aria-hidden
            />
          </div>
        </div>
        <div className="absolute inset-0 bg-slate-900/70" aria-hidden />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <Link
            href={`${prefix}/geld-verdienen`}
            className="mb-8 inline-flex items-center gap-2 text-white/90 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            {t.backLink}
          </Link>
          <h1
            id="flyer-hero-heading"
            className="w-full font-sans text-3xl font-semibold tracking-tight text-white drop-shadow-sm sm:w-auto sm:text-4xl"
          >
            {t.heroTitle}
          </h1>
          <p className="mt-4 whitespace-pre-line text-lg text-white/95 drop-shadow-sm">
            {t.heroIntro}
          </p>
          <p
            className="mt-4 inline-block animate-breathe text-2xl font-bold drop-shadow-sm sm:text-3xl"
            style={{ color: BRAND_BLUE }}
          >
            {t.heroCta}
          </p>
        </div>
      </section>

      <section
        className="bg-white px-4 pt-12 pb-4 sm:px-6 sm:pt-16 sm:pb-6 lg:px-8"
        aria-labelledby="flyer-pate-heading"
      >
        <div className="mx-auto max-w-4xl">
          <h2
            id="flyer-pate-heading"
            className="font-sans text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
          >
            {t.flyerPateTitle}
          </h2>
          <h3 className="mt-4 font-sans text-xl font-semibold tracking-tight" style={{ color: BRAND_BLUE }}>
            {t.flyerPateSubtitle}
          </h3>
          <p className="mt-4 whitespace-pre-line text-lg leading-relaxed text-slate-700">
            {t.flyerPateBodyBefore}
            <span style={{ color: BRAND_BLUE }}>{t.flyerPateBodyHighlight}</span>
            {t.flyerPateBodyAfter}
          </p>
          <p className="mt-4 text-slate-700">
            {t.flyerPateNote}
          </p>
          <p className="mt-6 text-lg leading-relaxed text-slate-700">
            {t.content2}
          </p>
        </div>
      </section>

      <section
        className="border-t-0 bg-white px-4 pt-6 pb-12 sm:px-6 sm:pt-8 sm:pb-16 lg:px-8"
        aria-labelledby="cta-heading"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="cta-heading"
            className="font-sans text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
          >
            {t.ctaTitle}
          </h2>
          <p className="mt-3 text-lg text-slate-600">{t.ctaSub}</p>
          <div className="mt-8 flex flex-col items-center gap-4">
            <a
              href="https://wa.me/491776361394?text=TIPPGEBER%20FLYER"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 ${outlineButtonClass} text-white focus:ring-[#25D366]`}
              style={{ backgroundColor: "#25D366", borderColor: "#25D366" }}
            >
              <MessageCircle className="h-5 w-5 shrink-0" />
              WhatsApp
            </a>
            <p className="text-slate-600">
              {t.orCall}{" "}
              <a href="tel:+491776361394" className="font-medium underline hover:no-underline" style={{ color: BRAND_BLUE }}>
                +49 177 636 1394
              </a>
            </p>
          </div>
        </div>
      </section>

      <section
        className="border-b border-slate-200 bg-slate-50 px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
        aria-labelledby="ablauf-heading"
      >
        <div className="mx-auto max-w-4xl">
          <h2
            id="ablauf-heading"
            className="font-sans text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
          >
            {t.ablaufTitle}
          </h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <span
                className="flex h-12 w-12 items-center justify-center rounded-full font-sans text-xl font-bold text-white"
                style={{ backgroundColor: CTA_ACCENT }}
              >
                1
              </span>
              <p className="mt-4 font-medium text-slate-900">{t.step1Title}</p>
              <p className="mt-1 whitespace-pre-line text-sm text-slate-600">
                {t.step1TextBefore}
                <span style={{ color: BRAND_BLUE }}>{t.step1TextHighlight}</span>
                {t.step1TextAfter}
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <span
                className="flex h-12 w-12 items-center justify-center rounded-full font-sans text-xl font-bold text-white"
                style={{ backgroundColor: CTA_ACCENT }}
              >
                2
              </span>
              <p className="mt-4 font-medium text-slate-900">{t.step2Title}</p>
              <p className="mt-1 text-sm text-slate-600">{t.step2Text}</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <span
                className="flex h-12 w-12 items-center justify-center rounded-full font-sans text-xl font-bold text-white"
                style={{ backgroundColor: CTA_ACCENT }}
              >
                3
              </span>
              <p className="mt-4 font-medium text-slate-900">{t.step3Title}</p>
              <p className="mt-1 text-sm text-slate-600">{t.step3Text}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-50/50 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <DonationOption
            lang={locale as "de" | "en" | "tr"}
            customDescription={
              locale === "de"
                ? "Verzichten Sie auf die Flyer-Prämie, spendet die Firma HE immologis Ihre volle Provision an eine gemeinnützige Organisation Ihrer Wahl.\n\nOb Tafel, Tierheim oder Kinderhilfe in Weinheim – ebenso unterstützen wir das Deutsche Krebsforschungszentrum (DKFZ) in Heidelberg oder den Deutscher Hospiz- und PalliativVerband (DHPV) in Berlin.\n\nTeilen Sie uns im Erfolgsfall mit, welche Einrichtung wir unterstützen dürfen.\n\nGemeinsam bewirken wir mehr."
                : locale === "en"
                  ? "If you waive the flyer bonus, HE immologis will donate your full commission to a charitable organization of your choice.\n\nWhether food bank, animal shelter or children's charity in Weinheim – we also support the German Cancer Research Center (DKFZ) in Heidelberg or the German Hospice and Palliative Association (DHPV) in Berlin.\n\nLet us know in the event of success which organization we may support.\n\nTogether we achieve more."
                  : "Broşür priminden vazgeçerseniz, HE immologis tam komisyonunuzu seçtiğiniz bir hayır kurumuna bağışlar.\n\nİster Weinheim'da gıda bankası, hayvan barınağı veya çocuk yardımı – Heidelberg'deki Alman Kanser Araştırma Merkezi (DKFZ) veya Berlin'deki Alman Hospiz ve Paliatif Derneği (DHPV) de desteklediğimiz kurumlar arasındadır.\n\nBaşarı durumunda hangi kurumu destekleyebileceğimizi bize bildirin.\n\nBirlikte daha fazlasını başarırız."
            }
          />
        </div>
      </section>
    </>
  );
}
