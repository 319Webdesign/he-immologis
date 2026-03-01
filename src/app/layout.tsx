import type { Metadata } from "next";
import { Playfair_Display, Geist } from "next/font/google";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  icons: {
    icon: { url: "/img/Logo.svg", type: "image/svg+xml" },
  },
  title: {
    default: "Immobilienmakler Weinheim | HE-immologis",
    template: "%s | HE-immologis",
  },
  description:
    "HE immologis UG – Immobilienmakler Weinheim & Logistikberatung Deutschland. Immobilienbewertung Bergstraße, Haus kaufen Weinheim, Holger Eberhard. Pharmaceutical & Healthcare Logistics, Logistik M&A advisory.",
  keywords: [
    "Immobilienmakler Weinheim",
    "Haus kaufen Weinheim",
    "Immobilienbewertung Bergstraße",
    "Holger Eberhard Weinheim",
    "Logistikberatung Deutschland",
    "Pharmaceutical & Healthcare Logistics",
    "Logistics M&A advisory",
    "Supply Chain Beratung Europa",
    "HE-immologis",
    "Bensheim",
    "Heppenheim",
    "Viernheim",
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
        className={`${playfair.variable} ${geistSans.variable} font-sans antialiased`}
      >
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
