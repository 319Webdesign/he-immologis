/**
 * LocalBusiness JSON-LD Schema für Immobilien-Seiten.
 * Standort: Weinheim. Service-Gebiet: Weinheim, Rhein-Neckar-Kreis, Pfungstadt, Darmstadt.
 */
const SERVES_POSTAL_CODES = [
  { postalCode: "69469", addressLocality: "Weinheim" },
  { postalCode: "64319", addressLocality: "Pfungstadt" },
  { postalCode: "64283", addressLocality: "Darmstadt" },
  { postalCode: "69493", addressLocality: "Hirschberg" },
  { postalCode: "69502", addressLocality: "Hemsbach" },
  { postalCode: "69514", addressLocality: "Laudenbach" },
  { postalCode: "68519", addressLocality: "Viernheim" },
  { postalCode: "64625", addressLocality: "Bensheim" },
  { postalCode: "64646", addressLocality: "Heppenheim" },
  { postalCode: "68623", addressLocality: "Lampertheim" },
  { postalCode: "64653", addressLocality: "Lorsch" },
];

export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": "https://www.he-immologis.de/#localbusiness",
    name: "HE immologis UG",
    description:
      "Immobilienmakler in Weinheim und Rhein-Neckar-Kreis. Immobilienbewertung, Verkauf, Kauf und Vermietung in Weinheim, Hirschberg, Hemsbach, Laudenbach, Viernheim, Pfungstadt, Darmstadt und der Bergstraße.",
    url: "https://www.he-immologis.de",
    telephone: "+49 177 636 1394",
    email: "info@he-immologis.de",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Ahornstr. 59",
      addressLocality: "Weinheim",
      postalCode: "69469",
      addressRegion: "Baden-Württemberg",
      addressCountry: "DE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 49.5529,
      longitude: 8.6722,
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Weinheim", postalCode: "69469" },
      { "@type": "AdministrativeArea", name: "Rhein-Neckar-Kreis" },
      { "@type": "AdministrativeArea", name: "Pfungstadt", postalCode: "64319" },
      { "@type": "AdministrativeArea", name: "Darmstadt", postalCode: "64283" },
      { "@type": "AdministrativeArea", name: "Hirschberg", postalCode: "69493" },
      { "@type": "AdministrativeArea", name: "Hemsbach", postalCode: "69502" },
      { "@type": "AdministrativeArea", name: "Laudenbach", postalCode: "69514" },
      { "@type": "AdministrativeArea", name: "Viernheim", postalCode: "68519" },
      { "@type": "AdministrativeArea", name: "Bensheim", postalCode: "64625" },
      { "@type": "AdministrativeArea", name: "Heppenheim", postalCode: "64646" },
      { "@type": "AdministrativeArea", name: "Lampertheim", postalCode: "68623" },
      { "@type": "AdministrativeArea", name: "Lorsch", postalCode: "64653" },
    ],
    servesPostalCode: SERVES_POSTAL_CODES.map((p) => p.postalCode),
    sameAs: [],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
