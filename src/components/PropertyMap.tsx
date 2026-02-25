"use client";

interface PropertyMapProps {
  lat: number | null;
  lng: number | null;
  /** Fallback: Adresse für Suche (Straße, PLZ Ort) */
  address?: string | null;
}

export function PropertyMap({ lat, lng, address }: PropertyMapProps) {
  const hasCoords =
    lat != null &&
    lng != null &&
    !Number.isNaN(lat) &&
    !Number.isNaN(lng);
  const delta = 0.008;
  const query = address?.trim() ? encodeURIComponent(address) : null;
  const linkUrl = hasCoords
    ? `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}&zoom=16`
    : query
      ? `https://www.openstreetmap.org/search?query=${query}`
      : null;

  if (!hasCoords && !linkUrl) return null;

  if (!hasCoords) {
    return (
      <div className="overflow-hidden rounded-xl border border-zinc-200">
        <div className="flex flex-col items-center justify-center gap-4 bg-zinc-50 px-6 py-12 text-center">
          <p className="text-sm text-zinc-600">
            Karte für diese Adresse anzeigen
          </p>
          <a
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-800"
          >
            Lage bei OpenStreetMap öffnen
          </a>
        </div>
      </div>
    );
  }

  const embedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lng! - delta}%2C${lat! - delta}%2C${lng! + delta}%2C${lat! + delta}&layer=mapnik&marker=${lat}%2C${lng}`;

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200">
      <div className="aspect-[16/10] w-full">
        <iframe
          src={embedUrl}
          title="Lage auf der Karte"
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <a
        href={linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-zinc-50 px-4 py-2 text-center text-sm font-medium text-zinc-600 hover:bg-zinc-100"
      >
        Größere Karte anzeigen
      </a>
    </div>
  );
}
