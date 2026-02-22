import type { Metadata } from "next";
import Link from "next/link";

const LEGAL_CONTENT = "mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8";

const LOCALES = ["de", "en"] as const;
type Locale = (typeof LOCALES)[number];
function isValidLocale(lang: string): lang is Locale {
  return LOCALES.includes(lang as Locale);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = isValidLocale(rawLang) ? rawLang : "de";
  if (lang === "en") {
    return {
      title: "Right of Withdrawal",
      description:
        "Right of withdrawal notice and withdrawal form of HE immologis UG – Information for consumers.",
    };
  }
  return {
    title: "Widerrufsrecht",
    description:
      "Widerrufsbelehrung und Widerrufsformular der HE immologis UG – Informationen für Verbraucher.",
  };
}

export default async function WiderrufPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = isValidLocale(rawLang) ? rawLang : "de";
  const isEn = lang === "en";
  const prefix = lang ? `/${lang}` : "";

  if (isEn) {
    return (
      <article className="bg-white">
        <div className={LEGAL_CONTENT}>
          <h1 className="font-sans text-3xl font-semibold tracking-tight text-slate-900">
            Right of Withdrawal
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Consumers have the right to withdraw from the contract under the statutory conditions.
          </p>

          <div className="mt-10 space-y-6 text-slate-700">
            <p>
              The complete withdrawal notice and the model withdrawal form can be found in our{" "}
              <Link href={`${prefix}/agb#widerruf`} className="text-[#4682B4] underline hover:no-underline">
                Terms and Conditions (§ 6 Right of Withdrawal)
              </Link>
              .
            </p>
            <p>
              <strong>Short overview:</strong> The withdrawal period is 14 days from the date of conclusion of the contract. To exercise the right of withdrawal, a clear statement (e.g. by email or post) to us is sufficient. You can find our contact details in the{" "}
              <Link href={`${prefix}/impressum`} className="text-[#4682B4] underline hover:no-underline">
                Imprint
              </Link>
              .
            </p>
            <p className="text-sm text-slate-600">
              Note: In the case of real estate brokerage, the right of withdrawal lapses in the circumstances provided for by law (e.g. after conclusion of the purchase or lease agreement). For details please see the Terms and Conditions.
            </p>
          </div>
        </div>
      </article>
    );
  }

  // German version (with locale-prefixed links)
  return (
    <article className="bg-white">
      <div className={LEGAL_CONTENT}>
        <h1 className="font-sans text-3xl font-semibold tracking-tight text-slate-900">
          Widerrufsrecht
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Verbraucher haben das Recht, den Vertrag unter den gesetzlichen Voraussetzungen zu widerrufen.
        </p>

        <div className="mt-10 space-y-6 text-slate-700">
          <p>
            Die vollständige Widerrufsbelehrung und das Muster-Widerrufsformular finden Sie in unseren{" "}
            <Link href={`${prefix}/agb#widerruf`} className="text-[#4682B4] underline hover:no-underline">
              AGB (§ 6 Widerrufsbelehrung)
            </Link>
            .
          </p>
          <p>
            <strong>Kurzüberblick:</strong> Die Widerrufsfrist beträgt 14 Tage ab Vertragsschluss. Zur Ausübung des Widerrufs genügt eine eindeutige Erklärung (z. B. per E-Mail oder Post) an uns. Unsere Kontaktdaten finden Sie im{" "}
            <Link href={`${prefix}/impressum`} className="text-[#4682B4] underline hover:no-underline">
              Impressum
            </Link>
            .
          </p>
          <p className="text-sm text-slate-600">
            Hinweis: Bei der Vermittlung von Immobilien erlischt das Widerrufsrecht in den gesetzlich vorgesehenen Fällen (z. B. nach Zustandekommen des Kauf- oder Mietvertrages). Details siehe AGB.
          </p>
        </div>
      </div>
    </article>
  );
}
