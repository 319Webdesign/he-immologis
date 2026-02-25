"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Heart, List, Mail, Share2 } from "lucide-react";

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
  const parts = pathname?.split("/") ?? [];
  const lang = (parts[1] ?? "de") as string;
  const listingSection = (parts[2] === "mieten" ? "mieten" : "kaufen") as "kaufen" | "mieten";

  // Hydration-sicher: shareUrl/mailto erst nach Mount setzen, damit Server und Client identisch rendern
  const baseMailto = `mailto:info@he-immologis.de?subject=Objektanfrage: ${encodeURIComponent(propertyTitle)}&body=Guten Tag,%0D%0A%0D%0Aich interessiere mich für folgende Immobilie:%0D%0A`;
  const [mailto, setMailto] = useState(baseMailto);

  useEffect(() => {
    const shareUrl = `${window.location.origin}/${lang}/${listingSection}/${propertyId}`;
    setMailto(
      `mailto:info@he-immologis.de?subject=Objektanfrage: ${encodeURIComponent(propertyTitle)}&body=Guten Tag,%0D%0A%0D%0Aich interessiere mich für folgende Immobilie:%0D%0A${encodeURIComponent(shareUrl)}`
    );
  }, [lang, listingSection, propertyId, propertyTitle]);

  const handleShare = async () => {
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}/${lang}/${listingSection}/${propertyId}`
        : "";
    const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");
    if (navigator.share && shareUrl) {
      try {
        await navigator.share({
          title: propertyTitle,
          url: shareUrl,
          text: propertyTitle,
        });
      } catch {
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
