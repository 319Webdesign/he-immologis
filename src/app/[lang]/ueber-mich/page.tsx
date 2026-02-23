import type { Metadata } from "next";
import Image from "next/image";
import Contact from "@/components/Contact";
import { getDictionary } from "@/dictionaries";
import { getLocaleFromHeaders } from "@/lib/i18n";

const BRAND_BLUE = "#4682B4";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocaleFromHeaders();
  const dict = await getDictionary(locale);
  const m = dict.ueberMich as { metaTitle: string; metaDescription: string; metaKeywords: string[] };
  return {
    title: m.metaTitle,
    description: m.metaDescription,
    keywords: m.metaKeywords,
  };
}

export default async function UeberMichPage() {
  const locale = await getLocaleFromHeaders();
  const dict = await getDictionary(locale);
  const t = dict.ueberMich as {
    heading: string;
    intro: string;
    family: string;
    weinheim: string;
    kapstadt: string;
    tagline: string;
    slogan: string;
    sloganSub: string;
    careerHeading: string;
    career1: string;
    career2: string;
    career3: string;
    regional: string;
    regionalPlaces: string;
    kapstadt2: string;
    kapstadtTip: string;
    whyRealEstateHeading: string;
    attitudeHeading: string;
    attitude1: string;
    attitude2: string;
    whyHeHeading: string;
    whyHe1: string;
    whyHe2: string;
    whyHe3: string;
    whyHe4: string;
    signoff: string;
    managingDirector: string;
    signatureAlt: string;
    companyLine: string;
    companySubline: string;
    contactTitle: string;
    contactSubtitle: string;
  };

  return (
    <>
      <section className="border-b border-slate-200 bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[30%_1fr] lg:gap-12">
            <div className="relative aspect-[3/4] w-full max-w-sm overflow-hidden rounded-2xl bg-slate-100 lg:max-w-none">
              <Image
                src="/img/holger.jpeg"
                alt="Holger Eberhard"
                fill
                className="object-cover"
                sizes="(max-width: 1023px) 100vw, 30vw"
                priority
              />
            </div>

            <div className="min-w-0 max-w-2xl">
              <h1 className="font-sans text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                {t.heading}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-slate-700">{t.intro}</p>
              <p className="mt-4 leading-relaxed text-slate-600">{t.family}</p>
              <p className="mt-4 leading-relaxed text-slate-600">{t.weinheim}</p>
              <p className="mt-4 leading-relaxed text-slate-600">{t.kapstadt}</p>
              <p className="mt-2 font-semibold text-slate-800">{t.tagline}</p>
              <p className="mt-4 leading-relaxed text-slate-600">
                {t.slogan}
                <br />
                {t.sloganSub}
              </p>

              <h2 className="mt-12 font-sans text-2xl font-semibold tracking-tight text-slate-900">
                {t.careerHeading}
              </h2>
              <p className="mt-4 leading-relaxed text-slate-600">{t.career1}</p>
              <p className="mt-4 leading-relaxed text-slate-600">{t.career2}</p>
              <p className="mt-4 leading-relaxed text-slate-600">{t.career3}</p>
              <p className="mt-4 leading-relaxed text-slate-600">
                <strong>{t.regional}</strong>
                <br />
                {t.regionalPlaces}
              </p>
              <p className="mt-4 leading-relaxed text-slate-600">{t.kapstadt2}</p>
              <p className="mt-4 leading-relaxed text-slate-600">{t.kapstadtTip}</p>

              <h2 className="mt-12 font-sans text-2xl font-semibold tracking-tight text-slate-900">
                {t.whyRealEstateHeading}
              </h2>
              <h3 className="mt-6 font-sans text-xl font-semibold tracking-tight text-slate-900">
                {t.attitudeHeading}
              </h3>
              <p className="mt-4 leading-relaxed text-slate-600">{t.attitude1}</p>
              <p className="mt-4 leading-relaxed text-slate-600">{t.attitude2}</p>

              <h2 className="mt-12 font-sans text-2xl font-semibold tracking-tight text-slate-900">
                {t.whyHeHeading}
              </h2>
              <p className="mt-4 leading-relaxed text-slate-600">{t.whyHe1}</p>
              <p className="mt-2 font-semibold text-slate-800">{t.whyHe2}</p>
              <p className="mt-4 leading-relaxed text-slate-600">{t.whyHe3}</p>
              <p className="mt-4 leading-relaxed text-slate-600">{t.whyHe4}</p>

              <div
                className="mt-10 rounded-2xl border-2 px-6 py-6 sm:px-8 sm:py-8"
                style={{ borderColor: BRAND_BLUE, backgroundColor: `${BRAND_BLUE}08` }}
              >
                <p className="font-semibold text-slate-900">{t.signoff}</p>
                <p className="mt-2 text-xl font-semibold text-slate-900">Holger Eberhard</p>
                <p className="mt-1 text-slate-600">{t.managingDirector}</p>
                <Image
                  src="/img/unterschrift.png"
                  alt={t.signatureAlt}
                  width={200}
                  height={80}
                  className="mt-4 object-contain object-left"
                />
                <p className="mt-4 text-slate-700">{t.companyLine}</p>
                <p className="mt-1 text-sm text-slate-600">{t.companySubline}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Contact
        title={t.contactTitle}
        subtitle={t.contactSubtitle}
        accentColor="steelblue"
        formLabels={dict.contactForm}
      />
    </>
  );
}
