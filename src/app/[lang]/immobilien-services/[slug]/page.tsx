import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { DEFAULT_SERVICES, type ServiceCardItem } from "@/data/services";

const BRAND_BLUE = "#4682B4";

interface PageProps {
  params: Promise<{ lang?: string; slug: string }>;
}

export async function generateStaticParams() {
  return DEFAULT_SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = DEFAULT_SERVICES.find((s) => s.slug === slug);
  if (!service) return { title: "Service nicht gefunden" };
  return {
    title: `${service.title} | HE immologis UG`,
    description:
      service.description ||
      `${service.title} – Professioneller Service von HE immologis in Weinheim.`,
  };
}

function KomplettmandatContent({
  service,
}: {
  service: ServiceCardItem;
}) {
  const sections = service.detailSections ?? [];
  const intro = sections.slice(0, 2);
  const steps = [
    sections[2],
    sections[3],
    sections[4],
    sections[5],
    sections[6],
    sections[7],
    sections[8],
    sections[9],
    sections[10],
    sections[11],
  ];
  const verguetungTitle = sections[12];
  const verguetungBody = sections[13];

  return (
    <>
      <div className="mt-8 space-y-6">
        {intro.map((text, i) => (
          <p key={i} className="text-lg leading-relaxed text-slate-600">
            {text}
          </p>
        ))}
      </div>

      <div className="mt-12 space-y-6">
        {[0, 2, 4, 6, 8].map((idx) => (
          <div
            key={idx}
            className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:gap-5 sm:p-7"
          >
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-lg font-bold text-white sm:h-12 sm:w-12"
              style={{ backgroundColor: BRAND_BLUE }}
            >
              {idx / 2 + 1}
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="font-sans text-xl font-semibold tracking-tight text-slate-900">
                {steps[idx]?.replace(/^\d+\.\s*/, "")}
              </h3>
              <p className="mt-2 text-slate-600 leading-relaxed">
                {steps[idx + 1]}
              </p>
            </div>
          </div>
        ))}
      </div>

      <section
        className="mt-12 rounded-2xl border-2 px-6 py-7 sm:px-8 sm:py-8"
        style={{
          borderColor: BRAND_BLUE,
          backgroundColor: `${BRAND_BLUE}08`,
        }}
        aria-labelledby="verguetung-heading"
      >
        <h2
          id="verguetung-heading"
          className="font-sans text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl"
        >
          {verguetungTitle}
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-slate-700">
          {verguetungBody}
        </p>
        <p className="mt-4 text-lg leading-relaxed text-slate-700">
          Hier gelten unsere Allgemeinen Geschäftsbedingungen (
          <Link href="/agb" className="text-[#4682B4] underline hover:no-underline">
            AGB
          </Link>
          ) sowie die gesetzlichen Bestimmungen.
        </p>
      </section>
    </>
  );
}

const DOKUMENTMODUL_LIST_INTRO =
  "Hierzu zählen insbesondere, jedoch nicht abschließend:";
const DOKUMENTMODUL_LIST_LENGTH = 6;

function DefaultContent({
  paragraphs,
  slug,
}: {
  paragraphs: string[];
  slug?: string;
}) {
  const isDokumentmodul = slug === "energieausweis";
  const listIntroIndex = isDokumentmodul
    ? paragraphs.findIndex((p) => p === DOKUMENTMODUL_LIST_INTRO)
    : -1;
  const listStart = listIntroIndex >= 0 ? listIntroIndex + 1 : 0;
  const listEnd = listStart + DOKUMENTMODUL_LIST_LENGTH;

  return (
    <div className="mt-8 space-y-8">
      {paragraphs.map((text, i) => {
        if (isDokumentmodul && listIntroIndex >= 0 && i === listIntroIndex)
          return null;
        if (isDokumentmodul && listIntroIndex >= 0 && i >= listStart && i < listEnd) {
          if (i > listStart) return null;
          return (
            <div key="dokumentmodul-list" className="space-y-3">
              <h3 className="font-sans text-xl font-semibold tracking-tight text-slate-900 pt-4 border-t border-slate-200 mt-8">
                {DOKUMENTMODUL_LIST_INTRO}
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-lg leading-relaxed text-slate-600">
                {paragraphs.slice(listStart, listEnd).map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            </div>
          );
        }
        const isH2 = i === 0 && text.length < 80;
        const isHeading =
          !isH2 &&
          text.length < 70 &&
          !text.endsWith(".") &&
          !text.endsWith(",") &&
          text.length > 0;
        if (isH2)
          return (
            <h2
              key={i}
              className="font-sans text-2xl font-semibold tracking-tight text-slate-900"
            >
              {text}
            </h2>
          );
        if (isHeading)
          return (
            <h3
              key={i}
              className="font-sans text-xl font-semibold tracking-tight text-slate-900 pt-4 first:pt-0 border-t border-slate-200 first:border-t-0 mt-8 first:mt-0"
            >
              {text}
            </h3>
          );
        if (text.startsWith("!!! WICHTIG !!! ")) {
          return (
            <p key={i} className="text-lg leading-relaxed text-slate-600">
              <span className="inline-flex items-center rounded-md bg-amber-100 px-2.5 py-1 text-sm font-semibold text-amber-800 ring-1 ring-amber-200">
                WICHTIG
              </span>{" "}
              {text.slice(16)}
            </p>
          );
        }
        if (text.startsWith("IMPORTANT: ")) {
          return (
            <p key={i} className="text-lg leading-relaxed text-slate-600">
              <span className="inline-flex items-center rounded-md bg-amber-100 px-2.5 py-1 text-sm font-semibold text-amber-800 ring-1 ring-amber-200">
                IMPORTANT
              </span>{" "}
              {text.slice(11)}
            </p>
          );
        }
        return (
          <p key={i} className="text-lg leading-relaxed text-slate-600">
            {text}
          </p>
        );
      })}
    </div>
  );
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { lang, slug } = await params;
  const locale = lang === "en" ? "en" : "de";
  const service: ServiceCardItem | undefined = DEFAULT_SERVICES.find(
    (s) => s.slug === slug
  );

  if (!service) notFound();

  const sections =
    locale === "en" && service.detailSectionsEn && service.detailSectionsEn.length > 0
      ? service.detailSectionsEn
      : service.detailSections;
  const paragraphs =
    sections && sections.length > 0 ? sections : [service.description];
  const displayPrice = locale === "en" && service.priceEn ? service.priceEn : service.price;

  const isKomplettmandat =
    slug === "immobilienverkauf" && (service.detailSections?.length ?? 0) >= 14;

  return (
    <>
      <div className="mx-auto max-w-3xl px-4 pt-16 pb-8 sm:px-6 sm:pt-20 lg:px-8">
        <Link
          href="/immobilien-services"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Zurück zu allen Services
        </Link>

        <article>
          <h1 className="font-sans text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {slug === "immobilienverkauf" ? (
              <>
                Der ganzheitliche Verkaufsprozess
                <span className="mt-1 block text-xl font-semibold text-slate-900 sm:text-2xl">
                  – von der Bewertung bis zur Übergabe
                </span>
              </>
            ) : (
              service.title
            )}
          </h1>
          {service.subtitle && (
            <p className="mt-2 text-lg font-medium text-slate-600">
              {service.subtitle}
            </p>
          )}
          <span
            className="mt-4 inline-flex rounded-lg px-3 py-1.5 text-sm font-semibold"
            style={{
              backgroundColor: `${BRAND_BLUE}15`,
              color: BRAND_BLUE,
            }}
          >
            {displayPrice}
          </span>

          {isKomplettmandat ? (
            <KomplettmandatContent service={service} />
          ) : (
            <DefaultContent paragraphs={paragraphs} slug={slug} />
          )}

          {slug === "high-end-immobilienaufnahmen" && (
            <section
              className="mt-12 rounded-xl border border-slate-200 bg-white px-5 py-5 sm:px-6 sm:py-6"
              aria-labelledby="heinerfilm-heading"
            >
              <h2
                id="heinerfilm-heading"
                className="font-sans text-lg font-semibold tracking-tight text-slate-900"
              >
                Heinerfilm
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Die professionellen Film- und Fotoaufnahmen realisieren wir in Kooperation mit Heinerfilm.
              </p>
              <a
                href="https://heinerfilm.de"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center text-sm font-medium"
                style={{ color: BRAND_BLUE }}
              >
                Mehr erfahren auf heinerfilm.de →
              </a>
            </section>
          )}

          {/* Anfrage-Sektion */}
          <section
            className="mt-16 rounded-2xl border border-slate-200 bg-slate-50 px-6 py-8 sm:px-8 sm:py-10"
            aria-labelledby="anfrage-heading"
          >
            <h2
              id="anfrage-heading"
              className="font-sans text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl"
            >
              Anfrage zu diesem Service
            </h2>
            <p className="mt-3 text-slate-600">
              Haben Sie Fragen oder möchten Sie ein unverbindliches Angebot?
              Schreiben Sie uns – wir melden uns zeitnah bei Ihnen.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a
                href={`mailto:info@he-immologis.de?subject=Anfrage%20–%20${encodeURIComponent(service.title)}`}
                className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-base font-semibold text-white transition-colors hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-[#4682B4] focus:ring-offset-2"
                style={{ backgroundColor: BRAND_BLUE }}
              >
                E-Mail schreiben
              </a>
              <p className="text-slate-600">
                Oder anrufen:{" "}
                <a
                  href="tel:+4917632198462"
                  className="font-medium text-slate-900 underline hover:no-underline"
                >
                  0176 321 98 462
                </a>
              </p>
            </div>
          </section>
        </article>
      </div>
    </>
  );
}
