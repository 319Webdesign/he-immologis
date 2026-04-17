import type { Metadata } from "next";
import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { DEFAULT_SERVICES, type ServiceCardItem } from "@/data/services";
import LocalBusinessSchema from "@/components/seo/LocalBusinessSchema";

const BRAND_BLUE = "#F9423A";
/** Mint-Akzent (wie Preisgestaltung-Box) für Hervorhebungen im Marktwert-Preisraster. */
const MARKTWERT_MINT_ACCENT = "#85b09a";

interface PageProps {
  params: Promise<{ lang?: string; slug: string }>;
}

export async function generateStaticParams() {
  const slugs = DEFAULT_SERVICES.map((s) => s.slug);
  const params: { lang: string; slug: string }[] = [];
  for (const lang of ["de", "en", "tr"]) {
    for (const slug of slugs) {
      params.push({ lang, slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const service = DEFAULT_SERVICES.find((s) => s.slug === slug);
  if (!service) return { title: lang === "en" ? "Service not found" : lang === "tr" ? "Hizmet bulunamadı" : "Service nicht gefunden" };
  const title = (lang === "tr" && service.titleTr) ? service.titleTr : (lang === "en" && service.titleEn) ? service.titleEn : service.title;
  const description = (lang === "tr" && service.descriptionTr) ? service.descriptionTr : (lang === "en" && service.descriptionEn) ? service.descriptionEn : service.description;
  return {
    title: `${title}`,
    description:
      description ||
      (lang === "en" ? `${title} – Professional service from HE immologis in Weinheim.` : `${title} – Professioneller Service von HE immologis in Weinheim.`),
  };
}

const DOKUMENTMODUL_LIST_INTRO_TR =
  "Buna özellikle ancak kapsamlı olmamak üzere şunlar dahildir:";

function KomplettmandatContent({
  sections,
  locale,
}: {
  sections: string[];
  locale: "de" | "en" | "tr";
}) {
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

  const agbIntro =
    locale === "en"
      ? "Our General Terms and Conditions ("
      : locale === "tr"
        ? "Genel kullanım koşullarımız ("
        : "Hier gelten unsere Allgemeinen Geschäftsbedingungen (";
  const agbLinkText = locale === "en" ? "GTC" : locale === "tr" ? "Kullanım koşulları" : "AGB";
  const agbOutro =
    locale === "en"
      ? ") as well as statutory provisions apply."
      : locale === "tr"
        ? ") ve yasal düzenlemeler geçerlidir."
        : ") sowie die gesetzlichen Bestimmungen.";

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
              style={{ backgroundColor: "#85b09a" }}
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
          borderColor: "#85b09a",
          backgroundColor: "#85b09a15",
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
          {agbIntro}
          <Link href={locale === "en" ? "/en/agb" : locale === "tr" ? "/tr/agb" : "/agb"} className="text-[#F9423A] underline hover:no-underline">
            {agbLinkText}
          </Link>
          {agbOutro}
        </p>
      </section>
    </>
  );
}

const DOKUMENTMODUL_LIST_INTRO_DE =
  "Hierzu zählen insbesondere, jedoch nicht abschließend:";
const DOKUMENTMODUL_LIST_INTRO_EN =
  "This includes in particular, but not exclusively:";
const DOKUMENTMODUL_LIST_LENGTH = 6;

const MARKTWERT_PREIS_HEADINGS = new Set([
  "Preisgestaltung",
  "Property Valuation – Pricing",
  "Fiyatlandırma",
]);

/** Erster Absatz der Preisliste – liegt absichtlich außerhalb der Mint-Box. */
const MARKTWERT_AFTER_MINT_INTRO: Record<"de" | "en" | "tr", string> = {
  de: "Die genannten Preise gelten immer für die Bewertung einer Immobilie:",
  en: "The following prices apply per property valuation:",
  tr: "Belirtilen fiyatlar her zaman tek bir gayrimenkul değerlemesi için geçerlidir:",
};

const MARKTWERT_TRANSPARENT_HEADINGS = new Set([
  "Transparente Rahmenbedingungen",
  "Transparent framework",
  "Şeffaf çerçeve",
]);

function highlightMarktwertGridTitle(
  text: string,
  locale: "de" | "en" | "tr",
  column: "left" | "right",
  options?: {
    omitLineBreak?: boolean;
    /** Nur schmal: Zeilenumbruch nach „Marktwerteinschätzung“ / „Market value estimate“. */
    breakAfterEstimateMobile?: boolean;
  }
): ReactNode {
  if (options?.breakAfterEstimateMobile && locale === "tr") {
    const needle = "piyasa değeri tahmini";
    const idx = text.indexOf(needle);
    if (idx > 0) {
      const head = text.slice(0, idx).trimEnd();
      const tail = text.slice(idx);
      if (head && tail) {
        const pass = {
          omitLineBreak: options.omitLineBreak,
          breakAfterEstimateMobile: false as const,
        };
        return (
          <>
            {highlightMarktwertGridTitle(head, locale, column, pass)}
            <br />
            {highlightMarktwertGridTitle(tail, locale, column, pass)}
          </>
        );
      }
    }
  }
  const re =
    column === "left"
      ? locale === "de"
        ? /(\bmit\b)/
        : locale === "en"
          ? /(\bwith\b)/
          : /(niyetiyle)/
      : locale === "de"
        ? /(\bohne\b)/
        : locale === "en"
          ? /(\bwithout\b)/
          : /(olmadan)/;
  const parts = text.split(re);
  const showLineBreak =
    column === "right" &&
    !options?.omitLineBreak &&
    !options?.breakAfterEstimateMobile;
  const mobileHeadBreak =
    Boolean(options?.breakAfterEstimateMobile) &&
    (locale === "de" || locale === "en");
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <Fragment key={i}>
            <span
              className="font-semibold"
              style={{ color: MARKTWERT_MINT_ACCENT }}
            >
              {part}
            </span>
            {showLineBreak ? <br /> : null}
          </Fragment>
        ) : i === 0 && mobileHeadBreak ? (
          <Fragment key={i}>
            <span>{part.trimEnd()}</span>
            <br />
          </Fragment>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

const ZERO_PRICE_TOKENS = new Set(["€0", "0€", "0 €"]);

function highlightMarktwertZeroPrice(value: string): ReactNode {
  const parts = value.split(/(€0|0€|0 €)/);
  return (
    <>
      {parts.map((part, i) =>
        ZERO_PRICE_TOKENS.has(part) ? (
          <span
            key={i}
            className="font-semibold tabular-nums"
            style={{ color: MARKTWERT_MINT_ACCENT }}
          >
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

/** Rechte Marktwert-Spalte: ganze Euro ohne ,00 / .00 (z. B. 599,00 € → 599€). */
function formatMarktwertRightPriceValue(value: string): string {
  return value
    .trim()
    .replace(/,00(\s*€|€)/g, "€")
    .replace(/€(\d[\d,.]*)\.00\b/g, "€$1")
    .replace(/(\d[\d,.]*)\.00\s*€/g, "$1€");
}

const MARKTWERT_VERKAUF_GRID: Record<
  "de" | "en" | "tr",
  { title: string; rightTitle: string; rows: string[] }
> = {
  de: {
    title: "Marktwerteinschätzung mit Verkaufsabsicht:",
    rightTitle: "Marktwerteinschätzung ohne Verkaufsabsicht:",
    rows: [
      "Eigentumswohnung: 0€",
      "Einfamilienhaus: 0€",
      "Zweifamilienhaus: 0€",
    ],
  },
  en: {
    title: "Market value estimate with intention to sell:",
    rightTitle: "Market value estimate without intention to sell:",
    rows: [
      "Condominium / apartment: €0",
      "Single-family house: €0",
      "Two-family house: €0",
    ],
  },
  tr: {
    title: "Satış niyetiyle piyasa değeri tahmini:",
    rightTitle: "Satış niyeti olmadan piyasa değeri tahmini:",
    rows: [
      "Satılık daire: 0 €",
      "Müstakil ev: 0 €",
      "İki ailelik ev: 0 €",
    ],
  },
};

const MARKTWERT_DOC_FEES_FOOTNOTE: Record<"de" | "en" | "tr", string> = {
  de: "*Ausgaben für Dokumente\nwerden berechnet.",
  en: "*Expenses for documents are charged.",
  tr: "*Belge masrafları ayrıca faturalandırılır.",
};

function MarktwertAfterMintPrices({
  locale,
  paragraphs,
}: {
  locale: "de" | "en" | "tr";
  paragraphs: string[];
}) {
  const intro = MARKTWERT_AFTER_MINT_INTRO[locale];
  const [head, ...rest] = paragraphs;
  if (!head || head !== intro) {
    return (
      <DefaultContent
        paragraphs={paragraphs}
        slug="marktwertanalyse"
        locale={locale}
        skipMarktwertPreisBox
        suppressLeadingH2
      />
    );
  }
  const rightLines = rest.filter((line) => !line.trimStart().startsWith("*"));
  const grid = MARKTWERT_VERKAUF_GRID[locale];

  return (
    <div className="mt-8 space-y-6">
      <h3 className="font-sans text-xl font-semibold tracking-tight text-slate-900 border-t border-slate-200 pt-4">
        {head}
      </h3>
      <div className="flex flex-col gap-8 sm:grid sm:grid-cols-[minmax(0,1fr)_minmax(0,1.65fr)] sm:gap-10">
        <div className="min-w-0 space-y-3">
          <p className="mb-5 font-sans text-lg font-semibold text-slate-900 sm:mb-6">
            <span className="sm:hidden">
              {highlightMarktwertGridTitle(grid.title, locale, "left", {
                breakAfterEstimateMobile: true,
              })}
            </span>
            <span className="hidden sm:inline">
              {highlightMarktwertGridTitle(grid.title, locale, "left")}
            </span>
          </p>
          <div className="grid max-w-md grid-cols-[max-content_auto] gap-x-2.5 gap-y-3 items-baseline text-lg leading-relaxed">
            {grid.rows.map((row, i) => {
              const m = row.match(/^(.+?):\s*(.+)$/);
              const label = m?.[1]?.trim() ?? row;
              const value = m?.[2]?.trim() ?? "";
              if (!m) {
                return (
                  <p key={i} className="col-span-2 text-slate-600">
                    {row}
                  </p>
                );
              }
              return (
                <Fragment key={i}>
                  <span className="text-slate-600">{label}:</span>
                  <span className="justify-self-start font-medium tabular-nums text-slate-700">
                    {highlightMarktwertZeroPrice(value)}
                  </span>
                </Fragment>
              );
            })}
          </div>
          <p className="mt-4 max-w-md whitespace-pre-line text-xs leading-relaxed text-slate-500">
            {MARKTWERT_DOC_FEES_FOOTNOTE[locale]}
          </p>
        </div>
        <div className="min-w-0 space-y-3 border-t border-slate-200 pt-6 sm:border-t-0 sm:border-l sm:border-slate-200 sm:pt-0 sm:pl-10 [@media(max-width:410px)]:overflow-x-auto">
          <p className="mb-5 font-sans text-lg font-semibold text-slate-900 sm:mb-6">
            <span className="sm:hidden">
              {highlightMarktwertGridTitle(grid.rightTitle, locale, "right", {
                breakAfterEstimateMobile: true,
              })}
            </span>
            <span className="hidden sm:inline">
              {highlightMarktwertGridTitle(grid.rightTitle, locale, "right")}
            </span>
          </p>
          <div className="grid max-w-md grid-cols-[max-content_auto] gap-x-2.5 gap-y-3 items-baseline text-lg leading-relaxed [@media(max-width:410px)]:text-base">
            {rightLines.map((row, i) => {
              const m = row.match(/^(.+?):\s*(.+)$/);
              const label = m?.[1]?.trim();
              const value = m?.[2]?.trim();
              if (!m || !label || !value) {
                return (
                  <p
                    key={i}
                    className="col-span-2 text-lg leading-relaxed text-slate-600"
                  >
                    {row}
                  </p>
                );
              }
              return (
                <Fragment key={i}>
                  <span className="text-slate-600">{label}:</span>
                  <span
                    className="justify-self-start font-semibold tabular-nums [@media(max-width:410px)]:whitespace-nowrap"
                    style={{ color: MARKTWERT_MINT_ACCENT }}
                  >
                    {formatMarktwertRightPriceValue(value)}
                  </span>
                </Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Helles Rot für Hervorhebung „kostenfrei“ (Bewertungsmodul). */
const MARKTWERT_KOSTENFREI_COLOR = "#fb7185";

function highlightMarktwertKostenfrei(
  text: string,
  slug: string | undefined,
  locale: "de" | "en" | "tr" | undefined
): ReactNode {
  if (slug !== "marktwertanalyse" || !locale) return text;
  const phrase =
    locale === "en"
      ? "free of charge"
      : locale === "tr"
        ? "ücretsizdir"
        : "kostenfrei";
  const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`(${escaped})`, "gi");
  const parts = text.split(re);
  if (parts.length < 2) return text;
  return parts.map((part, idx) => {
    const isHit = part.toLowerCase() === phrase.toLowerCase();
    return (
      <span
        key={idx}
        className={isHit ? "font-semibold" : undefined}
        style={isHit ? { color: MARKTWERT_KOSTENFREI_COLOR } : undefined}
      >
        {part}
      </span>
    );
  });
}

function DefaultContent({
  paragraphs,
  slug,
  locale,
  skipMarktwertPreisBox,
  noOuterTopMargin,
  firstBlockHeadingId,
  suppressLeadingH2,
}: {
  paragraphs: string[];
  slug?: string;
  locale?: "de" | "en" | "tr";
  /** Verhindert rekursive Aufteilung des Preisblocks (marktwertanalyse). */
  skipMarktwertPreisBox?: boolean;
  /** Innerer Block in der Preis-Box ohne zusätzliches `mt-8`. */
  noOuterTopMargin?: boolean;
  /** `id` für die erste H2 im Preisblock (aria-labelledby). */
  firstBlockHeadingId?: string;
  /** Ersten kurzen Absatz nicht als H2 setzen (z. B. Fortsetzung nach Mint-Box). */
  suppressLeadingH2?: boolean;
}) {
  if (slug === "marktwertanalyse" && !skipMarktwertPreisBox) {
    const loc = locale ?? "de";
    const priceStart = paragraphs.findIndex(
      (p) => p === MARKTWERT_AFTER_MINT_INTRO[loc]
    );
    const preisIdx = paragraphs.findIndex((p) => MARKTWERT_PREIS_HEADINGS.has(p));
    const transparentIdx = paragraphs.findIndex((p) =>
      MARKTWERT_TRANSPARENT_HEADINGS.has(p)
    );
    if (
      preisIdx >= 0 &&
      priceStart >= 0 &&
      transparentIdx > preisIdx
    ) {
      const intro = paragraphs.slice(0, priceStart);
      const priceBlock = paragraphs.slice(priceStart, preisIdx);
      const inMint = paragraphs.slice(preisIdx, transparentIdx);
      const afterTransparent = paragraphs.slice(transparentIdx);
      return (
        <>
          <DefaultContent
            paragraphs={intro}
            slug={slug}
            locale={locale}
            skipMarktwertPreisBox
          />
          {priceBlock.length > 0 && (
            <MarktwertAfterMintPrices locale={loc} paragraphs={priceBlock} />
          )}
          <section
            className="mt-8 rounded-2xl border-2 px-6 py-7 sm:px-8 sm:py-8"
            style={{
              borderColor: "#85b09a",
              backgroundColor: "#85b09a15",
            }}
            aria-labelledby="marktwert-preisgestaltung-heading"
          >
            <DefaultContent
              paragraphs={inMint}
              slug={slug}
              locale={locale}
              skipMarktwertPreisBox
              noOuterTopMargin
              firstBlockHeadingId="marktwert-preisgestaltung-heading"
            />
          </section>
          {afterTransparent.length > 0 && (
            <DefaultContent
              paragraphs={afterTransparent}
              slug={slug}
              locale={locale}
              skipMarktwertPreisBox
              suppressLeadingH2
            />
          )}
        </>
      );
    }
  }

  const isDokumentmodul = slug === "energieausweis";
  const listIntro =
    locale === "en" ? DOKUMENTMODUL_LIST_INTRO_EN : locale === "tr" ? DOKUMENTMODUL_LIST_INTRO_TR : DOKUMENTMODUL_LIST_INTRO_DE;
  const listIntroIndex = isDokumentmodul
    ? paragraphs.findIndex(
        (p) => p === DOKUMENTMODUL_LIST_INTRO_DE || p === DOKUMENTMODUL_LIST_INTRO_EN || p === DOKUMENTMODUL_LIST_INTRO_TR
      )
    : -1;
  const listStart = listIntroIndex >= 0 ? listIntroIndex + 1 : 0;
  const listEnd = listStart + DOKUMENTMODUL_LIST_LENGTH;

  return (
    <div className={noOuterTopMargin ? "space-y-8" : "mt-8 space-y-8"}>
      {paragraphs.map((text, i) => {
        if (isDokumentmodul && listIntroIndex >= 0 && i === listIntroIndex)
          return null;
        if (isDokumentmodul && listIntroIndex >= 0 && i >= listStart && i < listEnd) {
          if (i > listStart) return null;
          return (
            <div key="dokumentmodul-list" className="space-y-3">
              <h3 className="font-sans text-xl font-semibold tracking-tight text-slate-900 pt-4 border-t border-slate-200 mt-8">
                {listIntro}
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-lg leading-relaxed text-slate-600">
                {paragraphs.slice(listStart, listEnd).map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            </div>
          );
        }
        const isH2 =
          !suppressLeadingH2 && i === 0 && text.length < 80;
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
              id={i === 0 && firstBlockHeadingId ? firstBlockHeadingId : undefined}
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
        if (text.startsWith("ÖNEMLİ: ")) {
          return (
            <p key={i} className="text-lg leading-relaxed text-slate-600">
              <span className="inline-flex items-center rounded-md bg-amber-100 px-2.5 py-1 text-sm font-semibold text-amber-800 ring-1 ring-amber-200">
                ÖNEMLİ
              </span>{" "}
              {text.slice(8)}
            </p>
          );
        }
        return (
          <p key={i} className="whitespace-pre-line text-lg leading-relaxed text-slate-600">
            {highlightMarktwertKostenfrei(text, slug, locale)}
          </p>
        );
      })}
    </div>
  );
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { lang, slug } = await params;
  const locale = lang === "en" ? "en" : lang === "tr" ? "tr" : "de";
  const service: ServiceCardItem | undefined = DEFAULT_SERVICES.find(
    (s) => s.slug === slug
  );

  if (!service) notFound();

  const sections =
    locale === "tr" && service.detailSectionsTr && service.detailSectionsTr.length > 0
      ? service.detailSectionsTr
      : locale === "en" && service.detailSectionsEn && service.detailSectionsEn.length > 0
        ? service.detailSectionsEn
        : service.detailSections;
  const paragraphs =
    sections && sections.length > 0 ? sections : [service.description];
  const displayPrice = (locale === "tr" && service.priceTr) ? service.priceTr : (locale === "en" && service.priceEn) ? service.priceEn : service.price;
  const displayTitle = (locale === "tr" && service.titleTr) ? service.titleTr : (locale === "en" && service.titleEn) ? service.titleEn : service.title;
  const displaySubtitle = (locale === "tr" && service.subtitleTr) ? service.subtitleTr : (locale === "en" && service.subtitleEn) ? service.subtitleEn : service.subtitle;

  const isKomplettmandat =
    slug === "immobilienverkauf" && (paragraphs?.length ?? 0) >= 14;

  return (
    <>
      <LocalBusinessSchema />
      <div className="mx-auto max-w-3xl px-4 pt-16 pb-8 sm:px-6 sm:pt-20 lg:px-8">
        <Link
          href={locale ? `/${locale}/immobilien-services` : "/immobilien-services"}
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          {locale === "en" ? "Back to all services" : locale === "tr" ? "Tüm hizmetlere dön" : "Zurück zu allen Services"}
        </Link>

        <article>
          <h1 className="font-sans text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {displaySubtitle ? (
              <>
                {displayTitle}
                <span className="mt-1 block text-xl font-semibold text-slate-900 sm:text-2xl">
                  {displaySubtitle}
                </span>
              </>
            ) : (
              displayTitle
            )}
          </h1>
          <span
            className="mt-4 inline-flex rounded-lg px-3 py-1.5 text-sm font-semibold"
            style={{
              backgroundColor: "#85b09a15",
              color: "#000000",
            }}
          >
            {displayPrice}
          </span>

          {isKomplettmandat ? (
            <KomplettmandatContent sections={paragraphs} locale={locale} />
          ) : (
            <DefaultContent paragraphs={paragraphs} slug={slug} locale={locale} />
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
                {locale === "en"
                  ? "We produce the professional film and photo shoots in cooperation with Heinerfilm."
                  : locale === "tr"
                    ? "Profesyonel film ve fotoğraf çekimlerini Heinerfilm ile iş birliğinde gerçekleştiriyoruz."
                    : "Die professionellen Film- und Fotoaufnahmen realisieren wir in Kooperation mit Heinerfilm."}
              </p>
              <a
                href="https://heinerfilm.de"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center text-sm font-medium"
                style={{ color: BRAND_BLUE }}
              >
                {locale === "en" ? "Find out more at heinerfilm.de →" : locale === "tr" ? "Daha fazlası heinerfilm.de'de →" : "Mehr erfahren auf heinerfilm.de →"}
              </a>
            </section>
          )}

          {slug === "immobilienfinanzierung" && (
            <section
              className="mt-12 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
              aria-labelledby="finance-contact-heading"
            >
              <h2
                id="finance-contact-heading"
                className="font-sans text-xl font-semibold tracking-tight text-slate-900"
              >
                {locale === "en" ? "Contact person for financing" : locale === "tr" ? "Finansman için iletişim" : "Kontakt für Immobilienfinanzierung"}
              </h2>
              <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-start">
                <div className="relative h-36 w-36 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-white">
                  <Image
                    src="/img/nil-2w.png"
                    alt="Nil Zubari"
                    fill
                    className="object-contain p-1"
                    sizes="144px"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-lg font-semibold text-slate-900">Nil Zubari</p>
                  <p className="text-slate-600">Senior Financial Consultant</p>
                  <p className="text-slate-600">Diplom-Betriebswirtin</p>
                  <div className="mt-4 space-y-2 text-slate-700">
                    <p className="font-medium">{locale === "en" ? "Contact details:" : locale === "tr" ? "İletişim bilgileri:" : "Kontaktdaten:"}</p>
                    <p>
                      <a
                        href="tel:+491775967495"
                        className="font-semibold underline hover:no-underline"
                        style={{ color: BRAND_BLUE }}
                      >
                        0177 5967495
                      </a>
                    </p>
                    <p className="text-slate-600">
                      {locale === "en"
                        ? "Feel free to call me at any time."
                        : locale === "tr"
                          ? "Beni istediğiniz zaman arayabilirsiniz."
                          : "Rufen Sie mich gerne jederzeit an."}
                    </p>
                    <a
                      href="https://mlp-heidelberg.de/team/profile/nil-zubari/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center font-medium underline hover:no-underline"
                      style={{ color: BRAND_BLUE }}
                    >
                      {locale === "en" ? "Profile at MLP Heidelberg" : locale === "tr" ? "MLP Heidelberg profili" : "Profil bei MLP Heidelberg"}
                    </a>
                  </div>
                </div>
              </div>
            </section>
          )}

          {slug === "neubau-massivhaus" && (
            <section
              className="mt-12 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
              aria-labelledby="massivhaus-contact-heading"
            >
              <h2
                id="massivhaus-contact-heading"
                className="font-sans text-xl font-semibold tracking-tight text-slate-900"
              >
                {locale === "en" ? "Contact for new-build solid homes" : locale === "tr" ? "Yeni inşa masif evler için iletişim" : "Kontakt Neubau Massivhaus"}
              </h2>
              <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-start">
                <div className="relative h-36 w-36 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-white">
                  <Image
                    src="/img/service-town-country.png"
                    alt="Sven Riedmann - Town & Country Haus"
                    fill
                    className="object-cover"
                    sizes="144px"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-lg font-semibold text-slate-900">Sven Riedmann</p>
                  <p className="text-slate-600">Town & Country Haus</p>
                  <div className="mt-4 space-y-2 text-slate-700">
                    <p className="font-medium">{locale === "en" ? "Contact details:" : locale === "tr" ? "İletişim bilgileri:" : "Kontaktdaten:"}</p>
                    <p>
                      <a
                        href="tel:+491715353698"
                        className="font-semibold underline hover:no-underline"
                        style={{ color: BRAND_BLUE }}
                      >
                        0171 5353698
                      </a>
                    </p>
                    <p>
                      <a
                        href="mailto:sven.riedmann@tc.de"
                        className="font-semibold underline hover:no-underline"
                        style={{ color: BRAND_BLUE }}
                      >
                        sven.riedmann@tc.de
                      </a>
                    </p>
                    <a
                      href="https://www.riedmann-hausbau.de"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center font-medium underline hover:no-underline"
                      style={{ color: BRAND_BLUE }}
                    >
                      www.riedmann-hausbau.de
                    </a>
                  </div>
                </div>
              </div>
            </section>
          )}

          {slug !== "immobilienfinanzierung" && slug !== "neubau-massivhaus" && (
            <section
              className="mt-16 rounded-2xl border border-slate-200 bg-slate-50 px-6 py-8 sm:px-8 sm:py-10"
              aria-labelledby="anfrage-heading"
            >
              <h2
                id="anfrage-heading"
                className="font-sans text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl"
              >
                {locale === "en" ? "Enquiry for this service" : locale === "tr" ? "Bu hizmet için talepte bulunun" : "Anfrage zu diesem Service"}
              </h2>
              <p className="mt-3 text-slate-600">
                {locale === "en"
                  ? "Do you have questions or would you like a non-binding quote? Get in touch – we will get back to you promptly."
                  : locale === "tr"
                    ? "Sorularınız mı var veya bağlayıcı olmayan bir teklif mi istiyorsunuz? Bize ulaşın – size en kısa sürede geri dönelim."
                    : "Haben Sie Fragen oder möchten Sie ein unverbindliches Angebot? Schreiben Sie uns – wir melden uns zeitnah bei Ihnen."}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <a
                  href={`mailto:info@he-immologis.de?subject=${encodeURIComponent(locale === "en" ? "Enquiry – " + displayTitle : locale === "tr" ? "Talep – " + displayTitle : "Anfrage – " + service.title)}`}
                  className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-base font-semibold text-white transition-colors hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-[#F9423A] focus:ring-offset-2"
                  style={{ backgroundColor: BRAND_BLUE }}
                >
                  {locale === "en" ? "Send email" : locale === "tr" ? "E-posta gönder" : "E-Mail schreiben"}
                </a>
                <p className="text-slate-600">
                  {locale === "en" ? "Or call: " : locale === "tr" ? "Veya arayın: " : "Oder anrufen: "}
                  <a
                    href="tel:+491776361394"
                    className="font-medium underline hover:no-underline"
                    style={{ color: BRAND_BLUE }}
                  >
                    +49 177 636 1394
                  </a>
                </p>
              </div>
            </section>
          )}
        </article>
      </div>
    </>
  );
}
