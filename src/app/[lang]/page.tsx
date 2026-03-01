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
    title: "Immobilienmakler Weinheim",
    description:
      "HE immologis – Ihr Partner für Immobilien in Weinheim und Logistik in Deutschland. Immobilienmakler, Immobilienbewertung Bergstraße, Haus kaufen Weinheim. Holger Eberhard. Logistikberatung, Pharmaceutical & Healthcare Logistics.",
    keywords: [
      "Immobilienmakler Weinheim",
      "Haus kaufen Weinheim",
      "Immobilienbewertung Bergstraße",
      "Holger Eberhard Weinheim",
      "Bensheim",
      "Heppenheim",
      "Viernheim",
      "Logistikberatung Deutschland",
      "HE-immologis",
    ],
  },
  en: {
    title: "Real Estate Agent Weinheim",
    description:
      "HE immologis – Your partner for real estate in Weinheim and logistics in Germany. Real estate agent, property valuation Bergstraße, buy house Weinheim. Holger Eberhard. Logistics consulting, Pharmaceutical & Healthcare Logistics.",
    keywords: [
      "Real estate agent Weinheim",
      "Buy house Weinheim",
      "Property valuation Bergstraße",
      "Holger Eberhard Weinheim",
      "Logistics consulting Germany",
      "Pharmaceutical & Healthcare Logistics",
      "HE-immologis",
    ],
  },
  tr: {
    title: "Weinheim Emlak Danışmanı",
    description:
      "HE immologis – Weinheim'da gayrimenkul ve Almanya'da lojistik için iş ortağınız. Emlak danışmanı, Bergstraße değerleme, Weinheim ev satın alma. Holger Eberhard. Lojistik danışmanlığı.",
    keywords: [
      "Weinheim emlak danışmanı",
      "Weinheim ev satın alma",
      "Bergstraße gayrimenkul değerleme",
      "Holger Eberhard Weinheim",
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
