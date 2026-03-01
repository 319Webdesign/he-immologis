/**
 * ProfessionalService/Organization JSON-LD Schema für Logistik-Seiten.
 * Fokus: areaServed Europe, knowsAbout Pharma & Logistics M&A.
 */
export default function ServiceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://www.he-immologis.de/logistik/#service",
    name: "HE immologis – Logistikberatung & Supply Chain",
    description:
      "Logistikberatung in Europa: Pharmaceutical Logistics, GDP Compliance, Logistics M&A. Supply Chain Beratung, temperaturgeführte Logistik, Interim Management.",
    url: "https://www.he-immologis.de/de/logistikberatung",
    provider: {
      "@type": "Organization",
      name: "HE immologis UG (haftungsbeschränkt) i. Gr.",
      url: "https://www.he-immologis.de",
    },
    areaServed: "Europe",
    knowsAbout: [
      "Pharmaceutical Logistics",
      "GDP Compliance",
      "Logistics M&A",
    ],
    serviceType: [
      "Pharmaceutical & Healthcare Logistics",
      "GDP-compliant transport networks",
      "Logistics M&A advisory",
      "Interim Management Logistik",
      "Supply Chain Beratung Europa",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
