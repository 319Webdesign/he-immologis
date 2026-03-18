import type { Metadata } from "next";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { getLocaleFromHeaders } from "@/lib/i18n";

const STEEL_BLUE = "#F37A5A";

type ProjectItem = { title: string; description: string; url: string; image: string };

const TEXTS = {
  de: {
    metaTitle: "Spenden & Soziales Engagement Weinheim | HE immologis spendet",
    metaDescription:
      "HE-immologis spendet: Tippgeber-Prämie spenden Bergstraße. Soziales Engagement Weinheim – Ihr Verzicht auf die Prämie wird zu regionalen Projekten. Transparent. Gemeinsam Gutes bewirken.",
    heroTitle: "Ihre Empfehlung. Unsere Spende.",
    heroSubline: "Gemeinsam Gutes bewirken.",
    intro1:
      "Kommt es durch Ihren Tipp oder Werbung zu einem Haus- oder Wohnungsverkauf, steht Ihnen eine Prämie zu.",
    intro2:
      "Verzichten Sie auf die Tippgeber-, Banner- oder Aufstellerprämie, spendet die Firma HE immologis Ihre volle Provision an eine gemeinnützige Organisation Ihrer Wahl.",
    intro3:
      "Ob Tafel, Tierheim oder Kinderhilfe in Weinheim – ebenso unterstützen wir das Deutsche Krebsforschungszentrum (DKFZ) in Heidelberg oder den Deutscher Hospiz- und PalliativVerband (DHPV) in Berlin.",
    intro4:
      "Teilen Sie uns im Erfolgsfall mit, welche Einrichtung wir unterstützen dürfen. <br><span class=\"mt-3 block text-xl text-red-800 font-medium\">Gemeinsam bewirken wir mehr.</span>",
    ctaButton: "Jetzt Tipp einreichen",
    disclaimer:
      "Bitte beachten Sie, dass die Spende der HE immologis pro erfolgreich vermittelten Immobilienverkauf auf die Höhe der aufgeführten Prämienregelung begrenzt ist.",
    projects: [
      {
        title: "Kinder- und Bildungseinrichtung",
        description:
          "Auf Wunsch spenden wir an die Kinder- und Bildungseinrichtung Maria-Montessori-Schulkindergarten Sternschnuppe in Weinheim.",
        url: "https://www.pilgerhaus.de/spenden",
        image: "/img/sternschnuppe.jpeg",
      },
      {
        title: "Tafel",
        description:
          'Auf Wunsch spenden wir an die Tafel Weinheim „Appel + Ei“.',
        url: "https://www.caritas-hdrn.de/tafel-weinheim/",
        image: "/img/caritas.jpeg",
      },
      {
        title: "Tierheim",
        description:
          "Auf Wunsch spenden wir an das Tierheim Weinheim.",
        url: "https://www.tierheim-weinheim.de/",
        image: "/tierheim.jpeg",
      },
      {
        title: "DKFZ Heidelberg",
        description:
          "Auf Wunsch spenden wir an die Einrichtung der medizinischen Forschung – das Deutsche Krebsforschungszentrum (DKFZ) in Heidelberg.",
        url: "https://www.dkfz.de/spenden",
        image: "/img/dkfz.jpeg",
      },
      {
        title: "DHPV Berlin",
        description:
          "Auf Wunsch spenden wir an die Organisation der Hospiz- und Palliativarbeit – Deutscher Hospiz- und PalliativVerband (DHPV) in Berlin.",
        url: "https://www.dhpv.de/engagement_geldspenden.html",
        image: "/img/palliativ.jpeg",
      },
    ] as ProjectItem[],
  },
  en: {
    metaTitle: "Donations & Social Commitment Weinheim | HE immologis donates",
    metaDescription:
      "HE immologis donates: donate referrer bonus Bergstraße. Social commitment Weinheim – your waiver of the bonus goes to regional projects. Transparent. Doing good together.",
    heroTitle: "Your recommendation. Our donation.",
    heroSubline: "Doing good together.",
    intro1:
      "If a house or apartment sale results from your tip or advertising, you are entitled to a bonus.",
    intro2:
      "If you waive the referrer, banner or display bonus, HE immologis will donate your full commission to a charitable organization of your choice.",
    intro3:
      "Whether food bank, animal shelter or children's charity in Weinheim – we also support the German Cancer Research Center (DKFZ) in Heidelberg or the German Hospice and Palliative Association (DHPV) in Berlin.",
    intro4:
      "Let us know in the event of success which organization we may support. <br><span class=\"mt-3 block text-xl text-red-800 font-medium\">Together we achieve more.</span>",
    ctaButton: "Submit tip now",
    disclaimer:
      "Please note that HE immologis's donation per successfully brokered property sale is limited to the amount of the stated bonus scheme.",
    projects: [
      {
        title: "Children's and education",
        description:
          "On request we donate to the children's and education facility Maria-Montessori school kindergarten Sternschnuppe in Weinheim.",
        url: "https://www.pilgerhaus.de/spenden",
        image: "/img/sternschnuppe.jpeg",
      },
      {
        title: "Food bank",
        description:
          'On request we donate to Tafel Weinheim "Appel + Ei".',
        url: "https://www.caritas-hdrn.de/tafel-weinheim/",
        image: "/img/caritas.jpeg",
      },
      {
        title: "Animal shelter",
        description:
          "On request we donate to Tierheim Weinheim.",
        url: "https://www.tierheim-weinheim.de/",
        image: "/tierheim.jpeg",
      },
      {
        title: "DKFZ Heidelberg",
        description:
          "On request we donate to the medical research institution – the German Cancer Research Center (DKFZ) in Heidelberg.",
        url: "https://www.dkfz.de/spenden",
        image: "/img/dkfz.jpeg",
      },
      {
        title: "DHPV Berlin",
        description:
          "On request we donate to the hospice and palliative care organization – the German Hospice and Palliative Association (DHPV) in Berlin.",
        url: "https://www.dhpv.de/engagement_geldspenden.html",
        image: "/img/palliativ.jpeg",
      },
    ] as ProjectItem[],
  },
  tr: {
    metaTitle: "Bağış & Sosyal Sorumluluk Weinheim | HE immologis bağışlıyor",
    metaDescription:
      "HE immologis bağışlıyor: Tavsiyeci primi Bergstraße'da bağış. Weinheim'da sosyal sorumluluk – priminiz bölgesel projelere gidiyor. Şeffaf. Birlikte iyilik.",
    heroTitle: "Sizin tavsiyeniz. Bizim bağışımız.",
    heroSubline: "Birlikte iyilik.",
    intro1:
      "Tavsiyeniz veya reklam sayesinde bir ev veya daire satışı gerçekleşirse, size bir prim hak edersiniz.",
    intro2:
      "Tavsiyeci, banner veya pano priminden vazgeçerseniz, HE immologis tam komisyonunuzu seçtiğiniz bir hayır kurumuna bağışlar.",
    intro3:
      "İster Weinheim'da gıda bankası, hayvan barınağı veya çocuk yardımı – ayrıca Heidelberg'deki Alman Kanser Araştırma Merkezi (DKFZ) veya Berlin'deki Alman Hospiz ve Palyatif Derneği (DHPV) destekliyoruz.",
    intro4:
      "Başarı durumunda hangi kurumu destekleyebileceğimizi bize bildirin. <br><span class=\"mt-3 block text-xl text-red-800 font-medium\">Birlikte daha fazlasını başarırız.</span>",
    ctaButton: "Şimdi tavsiye gönder",
    disclaimer:
      "HE immologis'in başarıyla aracılık edilen her gayrimenkul satışı için bağışı, belirtilen prim düzenlemesinin tutarıyla sınırlıdır.",
    projects: [
      {
        title: "Çocuk ve eğitim",
        description:
          "Talep üzerine Weinheim'daki çocuk ve eğitim kurumu Maria-Montessori okul anaokulu Sternschnuppe'ye bağışlıyoruz.",
        url: "https://www.pilgerhaus.de/spenden",
        image: "/img/sternschnuppe.jpeg",
      },
      {
        title: "Gıda bankası",
        description:
          'Talep üzerine Tafel Weinheim "Appel + Ei"e bağışlıyoruz.',
        url: "https://www.caritas-hdrn.de/tafel-weinheim/",
        image: "/img/caritas.jpeg",
      },
      {
        title: "Hayvan barınağı",
        description:
          "Talep üzerine Tierheim Weinheim'a bağışlıyoruz.",
        url: "https://www.tierheim-weinheim.de/",
        image: "/tierheim.jpeg",
      },
      {
        title: "DKFZ Heidelberg",
        description:
          "Talep üzerine tıbbi araştırma kurumuna – Heidelberg'deki Alman Kanser Araştırma Merkezi (DKFZ) – bağışlıyoruz.",
        url: "https://www.dkfz.de/spenden",
        image: "/img/dkfz.jpeg",
      },
      {
        title: "DHPV Berlin",
        description:
          "Talep üzerine hospice ve palyatif bakım organizasyonuna – Berlin'deki Alman Hospiz ve Palyatif Derneği (DHPV) – bağışlıyoruz.",
        url: "https://www.dhpv.de/engagement_geldspenden.html",
        image: "/img/palliativ.jpeg",
      },
    ] as ProjectItem[],
  },
};

type Locale = keyof typeof TEXTS;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocaleFromHeaders();
  const t = TEXTS[locale in TEXTS ? (locale as Locale) : "de"];
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    keywords: [
      "Soziales Engagement Weinheim",
      "HE-immologis spendet",
      "Tippgeber Prämie spenden Bergstraße",
      "Spenden Weinheim",
      "regionale Projekte Bergstraße",
    ],
  };
}

export default async function SpendenPage() {
  const locale = await getLocaleFromHeaders();
  const lang = (locale in TEXTS ? locale : "de") as Locale;
  const t = TEXTS[lang];
  return (
    <>
      {/* Emotionale Hero-Sektion */}
      <section
        className="relative flex min-h-[360px] items-center justify-center overflow-hidden border-b border-slate-200 px-4 py-20 sm:min-h-[420px] sm:px-6 sm:py-28 lg:px-8"
        aria-labelledby="spenden-hero-heading"
      >
        <video
          src="/video/spenden.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover object-center"
          aria-hidden
        />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(174, 173, 168, 0.5)" }} aria-hidden />
        <div className="relative z-10 mx-auto max-w-4xl px-2 text-center">
          <h1
            id="spenden-hero-heading"
            className="font-sans text-4xl font-semibold tracking-tight drop-shadow-sm sm:text-5xl"
            style={{ color: "#425159" }}
          >
            {lang === "de" ? (
              <>
                <span style={{ color: "#8B0000" }}>Ihre</span> Empfehlung. Unsere <span style={{ color: "#8B0000" }}>Spende.</span>
              </>
            ) : (
              t.heroTitle
            )}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed drop-shadow-sm sm:text-xl" style={{ color: "#425159" }}>
            {t.heroSubline}
          </p>
        </div>
      </section>

      <section
        className="border-b border-slate-200 bg-slate-50/50 px-4 pb-10 pt-16 sm:px-6 sm:pb-12 sm:pt-20 lg:px-8"
        aria-labelledby="spenden-intro-heading"
      >
        <div className="mx-auto max-w-3xl">
          <h2 id="spenden-intro-heading" className="sr-only">
            {t.heroSubline}
          </h2>
          <p className="text-lg leading-relaxed text-slate-700">{t.intro1}</p>
          <p className="mt-4 text-lg leading-relaxed text-slate-700">
            {t.intro2}
          </p>
          <p className="mt-4 text-lg leading-relaxed text-slate-700">
            {t.intro3}
          </p>
          <p
            className="mt-4 text-lg font-medium leading-relaxed text-slate-800"
            dangerouslySetInnerHTML={{ __html: t.intro4 }}
          />
        </div>
      </section>

      <section
        id="einrichtungen"
        className="scroll-mt-4 border-b border-slate-200 bg-white px-4 pt-4 pb-16 sm:px-6 sm:pb-20 lg:px-8"
        aria-labelledby="spenden-projects-heading"
      >
        <div className="mx-auto max-w-6xl">
          <h2
            id="spenden-projects-heading"
            className="inline-flex w-full justify-center rounded-lg px-6 py-3.5 font-sans text-2xl font-semibold tracking-tight text-slate-800 sm:text-3xl"
            style={{ backgroundColor: "#D3EFDE" }}
          >
            {lang === "de"
              ? "Unterstützte Einrichtungen"
              : lang === "en"
                ? "Supported organizations"
                : "Desteklenen kurumlar"}
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {t.projects.map((project, index) => (
              <article
                key={index}
                className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-[4/3] w-full shrink-0 bg-white">
                  <Image
                    src={project.image}
                    alt=""
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="font-sans text-lg font-semibold text-slate-800">
                    {project.title}
                  </h3>
                  <p className="mt-2 flex-1 text-slate-600 leading-relaxed">
                    {project.description}
                  </p>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:underline"
                    style={{ color: STEEL_BLUE }}
                  >
                    {lang === "de"
                      ? "Zur Website"
                      : lang === "en"
                        ? "Visit website"
                        : "Web sitesine git"}
                    <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
                  </a>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-12 text-sm leading-relaxed text-slate-600">
            {t.disclaimer}
          </p>
        </div>
      </section>
    </>
  );
}
