import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { DEFAULT_SERVICES, type ServiceCardItem } from "@/data/services";

const BRAND_BLUE = "#4682B4";

interface PageProps {
  params: Promise<{ slug: string }>;
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

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service: ServiceCardItem | undefined = DEFAULT_SERVICES.find(
    (s) => s.slug === slug
  );

  if (!service) notFound();

  const paragraphs =
    service.detailSections && service.detailSections.length > 0
      ? service.detailSections
      : [service.description];

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
            {service.title}
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
            {service.price}
          </span>

          <div className="mt-8 space-y-6">
            {paragraphs.map((text, i) => (
              <p
                key={i}
                className="text-lg leading-relaxed text-slate-600"
              >
                {text}
              </p>
            ))}
          </div>

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
            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href={`mailto:info@he-immologis.de?subject=Anfrage%20–%20${encodeURIComponent(service.title)}`}
                className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-base font-semibold text-white transition-colors hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-[#4682B4] focus:ring-offset-2"
                style={{ backgroundColor: BRAND_BLUE }}
              >
                E-Mail schreiben
              </a>
              <a
                href="tel:+4917632198462"
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
              >
                Anrufen
              </a>
            </div>
          </section>
        </article>
      </div>
    </>
  );
}
