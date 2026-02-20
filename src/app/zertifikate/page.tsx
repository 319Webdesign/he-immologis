import type { Metadata } from "next";
import { ShieldCheck, GraduationCap, Search, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Qualifikation & Zertifikate",
  description:
    "Zertifikate und Qualifikationen der HE immologis UG – Professionalität durch stetige Weiterbildung. Erlaubnis § 34c GewO, Immobilienmakler, Wertermittlung.",
};

const BASE = "/Zertifikate";

const certs = [
  {
    category: "Gesetzliche Erlaubnis",
    categoryIcon: ShieldCheck,
    title: "Erlaubnis nach § 34c GewO",
    summary: [
      "Gewerbsmäßige Immobilienberatung und -vermittlung",
      "IHK-Prüfung nach § 34c GewO bestanden",
      "Amtliche Erlaubnis zur Ausübung des Maklerberufs",
    ],
    pdf: `${BASE}/Erlaubnis 34C IHK.pdf`,
  },
  {
    category: "Fachfortbildung",
    categoryIcon: GraduationCap,
    title: "Zertifikat Immobilienmakler 34c (Fw2)",
    summary: [
      "Geprüfte Fachkenntnis Immobilienmakler",
      "Rechtliche und kaufmännische Grundlagen",
      "Beratung und Vermittlung nach § 34c",
    ],
    pdf: `${BASE}/Fw2. Zertifikat Immobilienmakler 34C.pdf`,
  },
  {
    category: "Fachfortbildung",
    categoryIcon: GraduationCap,
    title: "Zertifikat 34c Immobilienmakler",
    summary: [
      "Qualifikation Immobilienmakler § 34c GewO",
      "Sachkunde und Berufspraxis",
      "Vermittlung und Beratung von Immobilien",
    ],
    pdf: `${BASE}/Zertifikat 34c Immobilienmakler.pdf`,
  },
  {
    category: "Wertermittlung",
    categoryIcon: Search,
    title: "Zertifikat Wertermittlung",
    summary: [
      "Sachwertverfahren",
      "Ertragswertverfahren",
      "Vergleichswertverfahren und Bewertungsgrundlagen",
    ],
    pdf: `${BASE}/Zertifikat Wertermittlung TA.pdf`,
  },
];

// Wertermittlung-Karte: Zusatzlink für englische Version
const wertermittlungEnglisch = {
  label: "Internationale Version (Englisch)",
  href: `${BASE}/Zertifikat Wertermittlung Englisch.pdf`,
};

function CertCard({
  category,
  categoryIcon: Icon,
  title,
  summary,
  pdf,
  extraLink,
}: {
  category: string;
  categoryIcon: React.ComponentType<{ className?: string }>;
  title: string;
  summary: string[];
  pdf: string;
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
          Zertifikat einsehen (PDF)
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

export default function ZertifikatePage() {
  return (
    <>
      {/* Hero */}
      <section
        className="border-b border-slate-200 bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
        aria-labelledby="zertifikate-hero-heading"
      >
        <div className="mx-auto max-w-3xl text-center">
          <h1
            id="zertifikate-hero-heading"
            className="font-sans text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl"
          >
            Qualifikation & Zertifikate
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            Professionalität durch stetige Weiterbildung. Als inhabergeführtes
            Unternehmen lege ich größten Wert auf fachliche Fundierung und
            rechtliche Sicherheit.
          </p>
        </div>
      </section>

      {/* Zertifikate-Grid */}
      <section
        className="bg-slate-50/50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
        aria-labelledby="zertifikate-grid-heading"
      >
        <div className="mx-auto max-w-6xl">
          <h2
            id="zertifikate-grid-heading"
            className="sr-only"
          >
            Unsere Zertifikate
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
            {certs.map((c) => (
              <CertCard
                key={c.title}
                category={c.category}
                categoryIcon={c.categoryIcon}
                title={c.title}
                summary={c.summary}
                pdf={c.pdf}
                extraLink={
                  c.title.includes("Wertermittlung") && !c.title.includes("Englisch")
                    ? wertermittlungEnglisch
                    : undefined
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* Weiterbildungspflicht */}
      <section
        className="border-t border-slate-200 bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
        aria-labelledby="weiterbildung-heading"
      >
        <div className="mx-auto max-w-3xl">
          <h2
            id="weiterbildung-heading"
            className="font-sans text-2xl font-semibold tracking-tight text-slate-900"
          >
            Weiterbildungspflicht
          </h2>
          <p className="mt-6 leading-relaxed text-slate-700">
            Gemäß § 34c Abs. 2a GewO und § 15b MaBV erfüllen wir regelmäßig die
            gesetzliche Fortbildungspflicht von mindestens 20 Stunden innerhalb
            von 3 Jahren. So bleiben wir für Sie immer auf dem neuesten Stand
            der Rechtsprechung und Marktentwicklung.
          </p>
        </div>
      </section>
    </>
  );
}
