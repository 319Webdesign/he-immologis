import type { Metadata } from "next";
import { ShieldCheck, GraduationCap, Search, FileText } from "lucide-react";
import { getDictionary } from "@/dictionaries";
import { getLocaleFromHeaders } from "@/lib/i18n";

const BASE = "/Zertifikate";
const PDFS = [
  `${BASE}/Erlaubnis34CIHK.pdf`,
  `${BASE}/Zertifikat_Immobilienmakler_34C_Fw2.pdf`,
  `${BASE}/Zertifikat34c_Immobilienmakler.pdf`,
  `${BASE}/Zulassung_Immobilienmakler_TA.pdf`,
  `${BASE}/Zertifikat_Wertermittlung_TA.pdf`,
] as const;
const WERTERMITTLUNG_ENGLISH = { href: `${BASE}/Zertifikat_Wertermittlung_Englisch.pdf` };

const CATEGORY_ICONS = [ShieldCheck, GraduationCap, GraduationCap, GraduationCap, Search] as const;
const CATEGORY_KEYS = ["legal", "training", "training", "training", "valuation"] as const;

function CertCard({
  category,
  categoryIcon: Icon,
  title,
  summary,
  pdf,
  viewPdfLabel,
  extraLink,
}: {
  category: string;
  categoryIcon: React.ComponentType<{ className?: string }>;
  title: string;
  summary: string[];
  pdf: string;
  viewPdfLabel: string;
  extraLink?: { label: string; href: string };
}) {
  const encodedPdf = pdf.replace(/ /g, "%20");
  return (
    <article className="flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <span className="inline-flex w-fit items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium uppercase tracking-wider text-slate-600">
        <Icon className="h-3.5 w-3.5" aria-hidden />
        {category}
      </span>
      <h2 className="mt-4 font-sans text-lg font-semibold text-slate-900">
        {title}
      </h2>
      <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-slate-600">
        {summary.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={encodedPdf}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800"
        >
          <FileText className="h-4 w-4" aria-hidden />
          {viewPdfLabel}
        </a>
        {extraLink && (
          <a
            href={extraLink.href.replace(/ /g, "%20")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            {extraLink.label}
          </a>
        )}
      </div>
    </article>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocaleFromHeaders();
  const dict = await getDictionary(locale);
  return {
    title: dict.zertifikate.metaTitle,
    description: dict.zertifikate.metaDescription,
  };
}

export default async function ZertifikatePage() {
  const locale = await getLocaleFromHeaders();
  const dict = await getDictionary(locale);
  const d = dict.zertifikate;
  const categories = d.categories as Record<string, string>;

  return (
    <>
      <section
        className="border-b border-slate-200 bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
        aria-labelledby="zertifikate-hero-heading"
      >
        <div className="mx-auto max-w-3xl text-center">
          <h1
            id="zertifikate-hero-heading"
            className="font-sans text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl"
          >
            {d.heroTitle}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            {d.heroSubline}
          </p>
        </div>
      </section>

      <section
        className="bg-slate-50/50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
        aria-labelledby="zertifikate-grid-heading"
      >
        <div className="mx-auto max-w-6xl">
          <h2 id="zertifikate-grid-heading" className="sr-only">
            {d.ourCertificates}
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
            {d.certs.map((c, i) => (
              <CertCard
                key={c.title}
                category={categories[CATEGORY_KEYS[i]]}
                categoryIcon={CATEGORY_ICONS[i]}
                title={c.title}
                summary={c.summary}
                pdf={PDFS[i]}
                viewPdfLabel={d.viewPdf}
                extraLink={
                  i === 4
                    ? { label: d.wertermittlungExtra, href: WERTERMITTLUNG_ENGLISH.href }
                    : undefined
                }
              />
            ))}
          </div>
        </div>
      </section>

      <section
        className="border-t border-slate-200 bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
        aria-labelledby="weiterbildung-heading"
      >
        <div className="mx-auto max-w-3xl">
          <h2
            id="weiterbildung-heading"
            className="font-sans text-2xl font-semibold tracking-tight text-slate-900"
          >
            {d.weiterbildungTitle}
          </h2>
          <p className="mt-6 leading-relaxed text-slate-700">
            {d.weiterbildungText}
          </p>
        </div>
      </section>
    </>
  );
}
