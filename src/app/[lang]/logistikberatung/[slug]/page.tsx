import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SMART_MODULE } from "@/data/logistikberatung";
import Contact from "@/components/Contact";

const BRAND_BLUE = "#4682B4";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return SMART_MODULE.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const modul = SMART_MODULE.find((m) => m.slug === slug);
  if (!modul) return { title: "Logistikberatung | HE immologis UG" };
  const title = `SMART Modul ${modul.letter} – ${modul.title} | HE immologis UG`;
  const description =
    modul.shortDescription.slice(0, 155) + (modul.shortDescription.length > 155 ? "…" : "");
  return {
    title,
    description,
    keywords: ["Logistikberatung", "SMART", modul.title, "HE immologis"],
  };
}

export default async function LogistikberatungSlugPage({ params }: Props) {
  const { slug } = await params;
  const modulIndex = SMART_MODULE.findIndex((m) => m.slug === slug);
  const modul = modulIndex >= 0 ? SMART_MODULE[modulIndex] : undefined;
  if (!modul) notFound();
  const nextModul = modulIndex >= 0 && modulIndex < SMART_MODULE.length - 1
    ? SMART_MODULE[modulIndex + 1]
    : null;

  type Block =
    | { type: "p"; text: string }
    | { type: "h3"; text: string }
    | { type: "ul"; items: string[] };
  const blocks: Block[] = [];
  let i = 0;
  while (i < modul.paragraphs.length) {
    const text = modul.paragraphs[i];
    const prev = modul.paragraphs[i - 1] ?? "";
    const short = text.length < 80 && !text.trim().endsWith(".");
    const afterColon = prev.trim().endsWith(":");
    if (afterColon && short && text.length > 2) {
      const listItems: string[] = [];
      while (
        i < modul.paragraphs.length &&
        modul.paragraphs[i].length < 80 &&
        !modul.paragraphs[i].trim().endsWith(".")
      ) {
        listItems.push(modul.paragraphs[i]);
        i++;
      }
      blocks.push({ type: "ul", items: listItems });
      continue;
    }
    if (text.length < 60 && !text.endsWith(".") && !text.endsWith(":")) {
      blocks.push({ type: "h3", text });
      i++;
      continue;
    }
    blocks.push({ type: "p", text });
    i++;
  }

  return (
    <>
      {/* Hero / Breadcrumb */}
      <section
        className="border-b border-slate-200 px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
        style={{ backgroundColor: "#f8fafc" }}
      >
        <div className="mx-auto max-w-3xl">
          <Link
            href="/logistikberatung"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
          >
            ← Logistikberatung SMART
          </Link>
          <div
            className="mt-2 inline-flex h-12 w-12 items-center justify-center rounded-xl text-xl font-bold text-white"
            style={{ backgroundColor: BRAND_BLUE }}
          >
            {modul.letter}
          </div>
          <h1 className="mt-4 font-sans text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            SMART Modul {modul.letter}
            <br />
            <span className="text-2xl sm:text-3xl">– {modul.title}</span>
          </h1>
          {modul.subtitle && (
            <p className="mt-2 text-lg text-slate-600">({modul.subtitle})</p>
          )}
        </div>
      </section>

      {/* Inhalt */}
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="prose prose-slate prose-lg max-w-none">
          {blocks.map((block, idx) => {
            if (block.type === "p") {
              return (
                <p key={idx} className="text-slate-600 leading-relaxed">
                  {block.text}
                </p>
              );
            }
            if (block.type === "h3") {
              return (
                <h3
                  key={idx}
                  className="mt-8 border-b border-slate-200 pb-2 font-sans text-xl font-semibold text-slate-900"
                >
                  {block.text}
                </h3>
              );
            }
            return (
              <ul key={idx} className="ml-4 mt-2 list-disc space-y-1 text-slate-600">
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            );
          })}

          {modul.subsections?.map((sub, idx) => (
            <div key={idx} className="mt-12">
              <h2 className="font-sans text-2xl font-semibold tracking-tight text-slate-900">
                {sub.heading}
              </h2>
              <div className="mt-4 space-y-4">
                {sub.paragraphs.map((p, j) => {
                  const isSubhead =
                    p.length < 50 &&
                    !p.endsWith(".") &&
                    !p.endsWith(",") &&
                    (sub.paragraphs[j + 1]?.length ?? 0) > 50;
                  if (isSubhead) {
                    return (
                      <h4
                        key={j}
                        className="mt-6 font-sans text-lg font-semibold text-slate-800"
                      >
                        {p}
                      </h4>
                    );
                  }
                  return (
                    <p key={j} className="text-slate-600 leading-relaxed">
                      {p}
                    </p>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/logistikberatung"
            className="inline-flex items-center text-sm font-semibold"
            style={{ color: BRAND_BLUE }}
          >
            ← Alle SMART Module
          </Link>
          {nextModul && (
            <Link
              href={`/logistikberatung/${nextModul.slug}`}
              className="inline-flex items-center text-sm font-semibold"
              style={{ color: BRAND_BLUE }}
            >
              Modul {nextModul.letter} – {nextModul.title} →
            </Link>
          )}
        </div>
      </section>

      <Contact
        variant="dark"
        title="Kontakt – SMART Logistikberatung"
        subtitle="Sprechen Sie uns an – wir freuen uns auf Ihr Anliegen."
      />
    </>
  );
}
