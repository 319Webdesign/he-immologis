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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.he-immologis.de";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: { url: "/img/Logo.svg", type: "image/svg+xml" },
    apple: "/apple-touch-icon.png",
  },
  title: {
    default: "Immobilienmakler Weinheim & Bergstraße | HE-immologis",
    template: "%s | HE-immologis",
  },
  description:
    "Ihr Experte für Immobilien in Weinheim. Haus kaufen, Wohnung verkaufen oder professionelle Immobilienbewertung an der Bergstraße. Holger Eberhard berät Sie persönlich.",
  keywords: [
    "Immobilienmakler Weinheim",
    "Haus kaufen Bergstraße",
    "Bensheim",
    "Heppenheim",
    "Lampertheim",
    "GDP-compliant transport networks",
    "Pharmaceutical & Healthcare Logistics",
    "M&A advisory Europe",
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
        className={`${playfair.variable} ${geistSans.variable} font-sans antialiased`}
      >
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
