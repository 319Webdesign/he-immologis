import Hero from "@/components/Hero";
import LanguageBanner from "@/components/LanguageBanner";
import LocalPresence from "@/components/LocalPresence";
import PhilosophyAlternative from "@/components/PhilosophyAlternative";
import ValueBanner from "@/components/ValueBanner";
import LocalBusinessSchema from "@/components/seo/LocalBusinessSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import { getDictionary } from "@/dictionaries";
import type { Locale } from "@/lib/i18n";

const HOME_META = {
  de: {
    title: "Immobilienmakler Weinheim & Bergstraße",
    description:
      "Ihr Experte für Immobilien in Weinheim. Haus kaufen, Wohnung verkaufen oder professionelle Immobilienbewertung an der Bergstraße. Holger Eberhard berät Sie persönlich.",
    keywords: [
      "Immobilienmakler Weinheim",
      "Haus kaufen Bergstraße",
      "Bensheim",
      "Heppenheim",
      "Lampertheim",
      "HE-immologis",
    ],
  },
  en: {
    title: "Real Estate Agent Weinheim & Bergstraße",
    description:
      "Your expert for real estate in Weinheim. Buy a house, sell an apartment or professional property valuation at the Bergstraße. Holger Eberhard advises you personally.",
    keywords: [
      "Real estate agent Weinheim",
      "Buy house Bergstraße",
      "Bensheim",
      "Heppenheim",
      "Lampertheim",
      "HE-immologis",
    ],
  },
  tr: {
    title: "Weinheim & Bergstraße Emlak Danışmanı",
    description:
      "Weinheim'da gayrimenkul uzmanınız. Ev satın alma, daire satışı veya Bergstraße'de profesyonel değerleme. Holger Eberhard size kişisel danışmanlık sunar.",
    keywords: [
      "Weinheim emlak danışmanı",
      "Bergstraße ev satın alma",
      "Bensheim",
      "Heppenheim",
      "Lampertheim",
      "HE-immologis",
    ],
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<import("next").Metadata> {
  const { lang } = await params;
  const locale = (lang === "en" ? "en" : lang === "tr" ? "tr" : "de") as Locale;
  const m = HOME_META[locale];
  return {
    title: m.title,
    description: m.description,
    keywords: [...m.keywords],
  };
}

export function generateStaticParams() {
  return [{ lang: "de" }, { lang: "en" }, { lang: "tr" }];
}

interface HomePageProps {
  params: Promise<{ lang: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { lang } = await params;
  const locale = (lang === "en" ? "en" : lang === "tr" ? "tr" : "de") as Locale;
  const dict = await getDictionary(locale);

  const bannerText =
    locale === "tr" && dict.home?.hero && "bannerText" in dict.home.hero
      ? (dict.home.hero as { bannerText?: string }).bannerText
      : undefined;

  return (
    <>
      <LocalBusinessSchema />
      <ServiceSchema />
      <Hero dict={dict.home.hero} lang={locale} />
      <LanguageBanner lang={locale} bannerText={bannerText} />
      <ValueBanner dict={dict.valueBanner} lang={locale} />
      <LocalPresence dict={dict.localPresence} />
      <PhilosophyAlternative dict={dict.philosophy} />
    </>
  );
}
