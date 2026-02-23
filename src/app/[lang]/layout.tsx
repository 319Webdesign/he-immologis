import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientLangSync from "@/components/ClientLangSync";
import ScrollToTop from "@/components/ScrollToTop";
import LanguageBanner from "@/components/LanguageBanner";
import { getDictionary } from "@/dictionaries";

const LOCALES = ["de", "en", "tr"] as const;
type Locale = (typeof LOCALES)[number];

function isValidLocale(lang: string): lang is Locale {
  return LOCALES.includes(lang as Locale);
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = isValidLocale(rawLang) ? rawLang : "de";
  const dict = await getDictionary(lang);

  const bannerText =
    lang === "tr" && "home" in dict && dict.home?.hero && "bannerText" in dict.home.hero
      ? (dict.home.hero as { bannerText?: string }).bannerText
      : undefined;

  return (
    <>
      <ClientLangSync lang={lang} />
      <ScrollToTop />
      <Navbar lang={lang} dict={dict.nav} />
      <main className="min-h-screen w-full max-w-full overflow-x-hidden pt-[7.5rem]">
        <LanguageBanner lang={lang} bannerText={bannerText} />
        {children}
      </main>
      <Footer lang={lang} dict={dict.footer} />
    </>
  );
}
