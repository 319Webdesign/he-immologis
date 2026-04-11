import type { Metadata } from "next";
import Script from "next/script";
import { Playfair_Display, Montserrat, GFS_Didot } from "next/font/google";
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

const gfsDidot = GFS_Didot({
  variable: "--font-didot",
  weight: "400",
  subsets: ["greek"],
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
    default: "Immobilienmakler Weinheim | Rhein-Neckar",
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
        className={`${playfair.variable} ${montserrat.variable} ${gfsDidot.variable} font-sans antialiased`}
      >
        <Script
          src="https://api.pirsch.io/pa.js"
          strategy="afterInteractive"
          id="pianjs"
          data-code="DAG8u3MqsqoDFyFHIz5DXp5MhDsBuTge"
        />
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
