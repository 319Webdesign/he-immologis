import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientLangSync from "@/components/ClientLangSync";
import ScrollToTop from "@/components/ScrollToTop";
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

  return (
    <>
      <ClientLangSync lang={lang} />
      <ScrollToTop />
      <Navbar lang={lang} dict={dict.nav} />
      <main className="min-h-screen w-full max-w-full overflow-x-hidden pt-[7.5rem]">
        {children}
      </main>
      <Footer lang={lang} dict={dict.footer} />
    </>
  );
}
