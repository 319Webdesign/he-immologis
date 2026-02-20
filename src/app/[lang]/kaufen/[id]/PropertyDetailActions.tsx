"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Heart,
  List,
  Mail,
  Share2,
  Send,
} from "lucide-react";

interface PropertyDetailActionsProps {
  propertyId: string;
  propertyTitle: string;
}

export function PropertyActionIcons({
  propertyId,
  propertyTitle,
}: PropertyDetailActionsProps) {
  const [merken, setMerken] = useState(false);
  const pathname = usePathname();
  const lang = (pathname?.split("/")[1] ?? "de") as string;

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/${lang}/kaufen/${propertyId}`
      : "";
  const mailto = `mailto:info@he-immologis.de?subject=Objektanfrage: ${encodeURIComponent(propertyTitle)}&body=Guten Tag,%0D%0A%0D%0Aich interessiere mich für folgende Immobilie:%0D%0A${encodeURIComponent(shareUrl)}`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: propertyTitle,
          url: shareUrl || window.location.href,
          text: propertyTitle,
        });
      } catch {
        if (typeof window !== "undefined")
          window.navigator.clipboard?.writeText(window.location.href);
      }
    } else if (typeof window !== "undefined") {
      window.navigator.clipboard?.writeText(window.location.href);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-4">
      <button
        type="button"
        onClick={() => setMerken(!merken)}
        className="flex items-center gap-2 rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
        aria-pressed={merken}
      >
        <Heart
          className={`h-4 w-4 ${merken ? "fill-red-500 text-red-500" : ""}`}
        />
        Objekt merken
      </button>
      <button
        type="button"
        className="flex items-center gap-2 rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
      >
        <List className="h-4 w-4" />
        Vergleichsliste anzeigen
      </button>
      <a
        href={mailto}
        className="flex items-center gap-2 rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
      >
        <Mail className="h-4 w-4" />
        Objekt verschicken
      </a>
      <button
        type="button"
        onClick={handleShare}
        className="flex items-center gap-2 rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
      >
        <Share2 className="h-4 w-4" />
        Objekt teilen
      </button>
    </div>
  );
}

interface ExposeFormProps {
  propertyTitle: string;
}

export function ExposeForm({ propertyTitle }: ExposeFormProps) {
  const pathname = usePathname();
  const lang = (pathname?.split("/")[1] ?? "de") as string;
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    nachricht: "",
    datenschutz: false,
    agb: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormState((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!formState.datenschutz)
      newErrors.datenschutz =
        "Bitte akzeptieren Sie die Datenschutzbedingungen.";
    if (!formState.agb) newErrors.agb = "Bitte akzeptieren Sie die AGB.";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    console.log("Exposé anfordern:", { ...formState, propertyTitle });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="expose-name" className="block text-sm font-medium text-zinc-700">
            Name *
          </label>
          <input
            type="text"
            id="expose-name"
            name="name"
            required
            value={formState.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border border-zinc-300 px-4 py-2 focus:border-amber-500 focus:ring-amber-500"
          />
        </div>
        <div>
          <label htmlFor="expose-email" className="block text-sm font-medium text-zinc-700">
            E-Mail *
          </label>
          <input
            type="email"
            id="expose-email"
            name="email"
            required
            value={formState.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border border-zinc-300 px-4 py-2 focus:border-amber-500 focus:ring-amber-500"
          />
        </div>
      </div>
      <div>
        <label htmlFor="expose-phone" className="block text-sm font-medium text-zinc-700">
          Telefon
        </label>
        <input
          type="tel"
          id="expose-phone"
          name="phone"
          value={formState.phone}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border border-zinc-300 px-4 py-2 focus:border-amber-500 focus:ring-amber-500"
        />
      </div>
      <div>
        <label htmlFor="expose-nachricht" className="block text-sm font-medium text-zinc-700">
          Nachricht
        </label>
        <textarea
          id="expose-nachricht"
          name="nachricht"
          rows={4}
          value={formState.nachricht}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border border-zinc-300 px-4 py-2 focus:border-amber-500 focus:ring-amber-500"
          placeholder="Ihre Nachricht oder Anmerkungen..."
        />
      </div>

      <div className="space-y-4 border-t border-zinc-200 pt-6">
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            name="datenschutz"
            checked={formState.datenschutz}
            onChange={handleChange}
            className="mt-1 h-4 w-4 rounded border-zinc-300 text-amber-600 focus:ring-amber-500"
            aria-invalid={!!errors.datenschutz}
          />
          <span className="text-sm text-zinc-700">
            Ich akzeptiere die{" "}
            <Link href={`/${lang}/datenschutz`} className="text-[#4682B4] underline hover:no-underline">
              Datenschutzbedingungen
            </Link>{" "}
            der HE immologis UG (haftungsbeschränkt) i.Gr. und bin damit einverstanden, dass mich die HE immologis UG (haftungsbeschränkt) i.Gr. kontaktiert (telefonisch oder per E-Mail) und meine angegebenen Daten speichert. *
          </span>
        </label>
        {errors.datenschutz && (
          <p className="text-sm text-red-600">{errors.datenschutz}</p>
        )}

        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            name="agb"
            checked={formState.agb}
            onChange={handleChange}
            className="mt-1 h-4 w-4 rounded border-zinc-300 text-amber-600 focus:ring-amber-500"
            aria-invalid={!!errors.agb}
          />
          <span className="text-sm text-zinc-700">
            AGB (erforderlich): Ich habe die{" "}
            <Link href={`/${lang}/agb`} className="text-[#4682B4] underline hover:no-underline">
              Allgemeinen Geschäftsbedingungen
            </Link>{" "}
            gelesen und akzeptiert. *
          </span>
        </label>
        {errors.agb && <p className="text-sm text-red-600">{errors.agb}</p>}
      </div>

      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-900 px-6 py-3 font-medium text-white transition-colors hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 sm:w-auto"
      >
        <Send className="h-5 w-5" />
        Absenden
      </button>
    </form>
  );
}
