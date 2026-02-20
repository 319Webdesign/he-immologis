import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Widerrufsrecht",
  description:
    "Widerrufsbelehrung und Widerrufsformular der HE immologis UG – Informationen für Verbraucher.",
};

const LEGAL_CONTENT = "mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8";

export default function WiderrufPage() {
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
            <Link href="/agb#widerruf" className="text-[#4682B4] underline hover:no-underline">
              AGB (§ 6 Widerrufsbelehrung)
            </Link>
            .
          </p>
          <p>
            <strong>Kurzüberblick:</strong> Die Widerrufsfrist beträgt 14 Tage ab Vertragsschluss. Zur Ausübung des Widerrufs genügt eine eindeutige Erklärung (z. B. per E-Mail oder Post) an uns. Unsere Kontaktdaten finden Sie im{" "}
            <Link href="/impressum" className="text-[#4682B4] underline hover:no-underline">
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
