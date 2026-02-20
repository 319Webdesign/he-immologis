import type { Metadata } from "next";
import { Playfair_Display, Geist } from "next/font/google";
import "./globals.css";

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
    icon: "/img/Logo.svg",
  },
  title: {
    default: "HE immologis UG | Immobilien & Logistik Weinheim",
    template: "%s | HE immologis Weinheim",
  },
  description:
    "HE immologis UG – Ihr Partner für Immobilien in Weinheim und Logistik an der Bergstraße. Immobilienvermittlung und zuverlässige Transportlösungen aus einer Hand.",
  keywords: [
    "Immobilien Weinheim",
    "Logistikunternehmen Bergstrasse",
    "HE immologis Weinheim",
    "Immobilien Bergstraße",
    "Spedition Weinheim",
    "Umzug Weinheim",
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
      </body>
    </html>
  );
}
