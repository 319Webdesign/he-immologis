import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.he-immologis.de";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "./",
  },
  icons: {
    icon: { url: "/img/favicon.jpeg", type: "image/jpeg" },
    apple: { url: "/img/favicon.jpeg", type: "image/jpeg", sizes: "180x180" },
  },
  title: {
    default: "Immobilienmakler Weinheim | HE-immologis | Rhein-Neckar",
    template: "%s | HE-immologis",
  },
  description:
    "Immobilienmakler Weinheim & Rhein-Neckar: Haus kaufen, Wohnung verkaufen, Immobilienbewertung. Holger Eberhard – Ihre Adresse vor Ort. Jetzt beraten.",
  keywords: [
    "Immobilienmakler Weinheim",
    "Haus kaufen Rhein-Neckar",
    "Immobilienbewertung Weinheim",
    "Wohnung verkaufen Bergstraße",
    "Hirschberg",
    "Hemsbach",
    "Laudenbach",
    "Viernheim",
    "HE-immologis",
  ],
  openGraph: {
    locale: "de_DE",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${montserrat.variable} font-sans antialiased`}
      >
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
