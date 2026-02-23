import { NextRequest, NextResponse } from "next/server";

const LOCALES = ["de", "en", "tr"] as const;
type Locale = (typeof LOCALES)[number];

/**
 * Ermittelt die bevorzugte Sprache aus dem Accept-Language-Header.
 * Einfache Logik: erste passende Sprache (de/en/tr) in der Reihenfolge der Client-Präferenz.
 */
function getPreferredLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return "de";
  const parts = acceptLanguage
    .split(",")
    .map((p) => p.split(";")[0].trim().toLowerCase().slice(0, 2));
  for (const p of parts) {
    if (p === "de") return "de";
    if (p === "en") return "en";
    if (p === "tr") return "tr";
  }
  return "de";
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Statische Dateien und Next-internes nicht anfassen
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/img") ||
    pathname.startsWith("/Zertifikate") ||
    pathname.startsWith("/downloads") ||
    pathname.includes(".") // favicon, etc.
  ) {
    return NextResponse.next();
  }

  const hasLocale = LOCALES.some(
    (loc) => pathname === `/${loc}` || pathname.startsWith(`/${loc}/`)
  );

  if (hasLocale) {
    const locale = pathname.split("/")[1] as Locale;
    const response = NextResponse.next();
    response.headers.set("x-next-locale", locale);
    return response;
  }

  const locale = getPreferredLocale(request.headers.get("accept-language"));
  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
