import Hero from "@/components/Hero";
import LocalPresence from "@/components/LocalPresence";
import PhilosophyAlternative from "@/components/PhilosophyAlternative";
import ValueBanner from "@/components/ValueBanner";
import { getDictionary } from "@/dictionaries";
import type { Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return [{ lang: "de" }, { lang: "en" }];
}

interface HomePageProps {
  params: Promise<{ lang: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { lang } = await params;
  const locale = (lang === "en" ? "en" : "de") as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <Hero />
      <ValueBanner dict={dict.valueBanner} lang={locale} />
      <LocalPresence />
      <PhilosophyAlternative />
    </>
  );
}
