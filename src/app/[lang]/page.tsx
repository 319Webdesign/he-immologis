import Hero from "@/components/Hero";
import LanguageBanner from "@/components/LanguageBanner";
import LocalPresence from "@/components/LocalPresence";
import PhilosophyAlternative from "@/components/PhilosophyAlternative";
import ValueBanner from "@/components/ValueBanner";
import { getDictionary } from "@/dictionaries";
import type { Locale } from "@/lib/i18n";

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
      <Hero dict={dict.home.hero} lang={locale} />
      <LanguageBanner lang={locale} bannerText={bannerText} />
      <ValueBanner dict={dict.valueBanner} lang={locale} />
      <LocalPresence dict={dict.localPresence} />
      <PhilosophyAlternative dict={dict.philosophy} />
    </>
  );
}
