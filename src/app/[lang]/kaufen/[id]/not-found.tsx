import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

/** Back-Link zur Kaufen-Übersicht (relativ, behält [lang]). */
export default function KaufenNotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center sm:px-6">
      <h1 className="font-sans text-2xl font-semibold text-zinc-900">
        Objekt nicht gefunden
      </h1>
      <p className="mt-4 text-zinc-600">
        Die angeforderte Immobilie existiert nicht oder ist nicht mehr verfügbar.
      </p>
      <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Link
          href=".."
          className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-6 py-3 font-medium text-white transition-colors hover:bg-zinc-800"
        >
          <ArrowLeft className="h-4 w-4" />
          Zurück zur Kaufen-Übersicht
        </Link>
        <Link
          href="../.."
          className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 px-6 py-3 font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
        >
          <Home className="h-4 w-4" />
          Zur Startseite
        </Link>
      </div>
    </div>
  );
}
