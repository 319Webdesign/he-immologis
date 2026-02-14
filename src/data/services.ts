export interface ServiceCardItem {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  price: string;
  description: string;
  image: string;
  href?: string;
  /** Mehrere Absätze für die Service-Unterseite. Fehlt es, wird description als ein Absatz genutzt. */
  detailSections?: string[];
}

export const DEFAULT_SERVICES: ServiceCardItem[] = [
  {
    id: "1",
    slug: "marktwertanalyse",
    title: "Marktwertanalyse & Wertermittlung als Einzelauftrag",
    price: "595,- EUR als Einzelauftrag",
    description:
      "Professionelle Ermittlung des Marktwertes für Ihren Immobilienverkauf.",
    image: "/img/service-marktwertanalyse.png",
    detailSections: [
      "Eine fundierte Marktwertanalyse bildet die Basis für einen erfolgreichen Immobilienverkauf. Wir ermitteln den aktuellen Marktwert Ihrer Immobilie auf Grundlage vergleichbarer Objekte, der Lage und des Zustands – transparent und nachvollziehbar.",
      "Die Wertermittlung erfolgt als Einzelauftrag unabhängig von einer späteren Vermarktung. So erhalten Sie eine seriöse Einschätzung, ob für Ihre weitere Planung oder für Verhandlungen mit Käufern oder Erben.",
      "Preis: 595,- EUR als Einzelauftrag. Gerne erstellen wir Ihnen ein unverbindliches Angebot.",
    ],
  },
  {
    id: "2",
    slug: "beratung-begleitung",
    title: "Beratung und Begleitung als Einzelauftrag",
    price: "150 EUR / Stunde",
    description:
      "Individuelle Beratung und persönliche Begleitung bei Ihrem Immobilienvorhaben.",
    image:
      "https://placehold.co/800x450/e2e8f0/475569?text=Beratung+%26+Begleitung&font=source-sans",
    detailSections: [
      "Sie brauchen keine Vollvermarktung, sondern gezielte Beratung oder Begleitung in bestimmten Phasen? Wir unterstützen Sie stundenweise mit unserem Know-how – ob bei der Einschätzung von Objekten, der Verhandlung mit der Bank oder der Koordination von Gewerken.",
      "Die Beratung kann vor Ort, per Video oder am Telefon stattfinden. So bleiben Sie flexibel und zahlen nur für das, was Sie wirklich benötigen.",
      "Preis: 150 EUR pro Stunde. Sprechen Sie uns an, wir finden das passende Paket.",
    ],
  },
  {
    id: "3",
    slug: "kaufvertragsabwicklung",
    title: "Kaufvertragsabwicklung",
    price: "1,19 % Provisionshonorar vom Verkaufspreis",
    description:
      "Professionelle Begleitung von der Vertragsunterzeichnung bis zur Schlüsselübergabe.",
    image:
      "https://placehold.co/800x450/cbd5e1/334155?text=Kaufvertragsabwicklung&font=source-sans",
    detailSections: [
      "Der Kaufvertrag ist unterzeichnet – damit beginnt die Phase der Abwicklung: Fristen überwachen, Unterlagen einholen, Notartermin und Finanzierung abstimmen, Übergabe vorbereiten. Wir übernehmen die Koordination und sorgen dafür, dass nichts auf der Strecke bleibt.",
      "Unsere Abwicklung entlastet Verkäufer und Käufer gleichermaßen und reduziert das Risiko von Verzögerungen oder Fehlern.",
      "Honorar: 1,19 % Provisionshonorar vom Verkaufspreis. Gern erläutern wir Ihnen den Ablauf im Detail.",
    ],
  },
  {
    id: "4",
    slug: "immobilienverkauf",
    title: "Immobilienverkauf",
    subtitle: "Ein sicherer Verkauf in 5 klaren Schritten",
    price: "3,57 % inklusive MwSt. vom Verkaufspreis der Immobilie",
    description:
      "Vollständige Vermarktung Ihrer Immobilie – von der Wertermittlung bis zur erfolgreichen Übergabe.",
    image:
      "https://placehold.co/800x450/94a3b8/1e293b?text=Immobilienverkauf&font=source-sans",
    detailSections: [
      "Wir begleiten Sie von der ersten Wertermittlung bis zur Schlüsselübergabe: Wertermittlung, Exposé, Vermarktung, Besichtigungen, Verhandlung und notarielle Abwicklung. Ein sicherer Verkauf in klaren Schritten, ohne versteckte Kosten.",
      "Durch unsere lokale Präsenz in Weinheim und an der Bergstraße kennen wir den Markt und die Nachfrage. So setzen wir Ihre Immobilie optimal in Szene und erreichen die richtigen Interessenten.",
      "Preis: 3,57 % inkl. MwSt. vom Verkaufspreis der Immobilie. Auf Wunsch vereinbaren wir ein unverbindliches Beratungsgespräch.",
    ],
  },
  {
    id: "5",
    slug: "high-end-immobilienaufnahmen",
    title: "High-End-Immobilienaufnahmen",
    subtitle: "Hochwertige Drohnen- und Kameraproduktion für Luxusimmobilien",
    price: "600 € inkl. MwSt.",
    description: "",
    image: "/img/tim.jpeg",
    detailSections: [
      "Für anspruchsvolle Objekte bieten wir professionelle Immobilienaufnahmen: Drohnenaufnahmen für Außenansichten und Lage, hochwertige Innenaufnahmen und eine stimmige Bildsprache, die Ihre Immobilie optimal präsentiert.",
      "Die Aufnahmen eignen sich für Exposés, Portale und Ihre eigene Werbung. Sie erhalten bearbeitete Dateien in hoher Auflösung zur uneingeschränkten Nutzung.",
      "Preis: 600 € inkl. MwSt. inkl. Vor-Ort-Termin und Lieferung der Dateien. Gerne erstellen wir ein individuelles Angebot für größere Objekte oder Pakete.",
    ],
  },
  {
    id: "6",
    slug: "energieausweis",
    title: "Energieausweis & benötigte Unterlagenbeschaffung (Einzelauftrag)",
    price: "150 € inkl. MwSt. pro angefangener Stunde",
    description:
      "Beantragung des Energieausweises und vollständige Beschaffung aller erforderlichen Unterlagen für Ihren Immobilienverkauf.",
    image:
      "https://placehold.co/800x450/f1f5f9/475569?text=Energieausweis&font=source-sans",
    detailSections: [
      "Für den Verkauf einer Immobilie sind Energieausweis und weitere Unterlagen erforderlich. Wir übernehmen die Beantragung des Energieausweises und die Beschaffung aller nötigen Dokumente – so haben Sie schnell alles beisammen und können rechtssicher verkaufen.",
      "Das spart Ihnen Zeit und den Umgang mit Behörden und Sachverständigen. Sie erhalten eine übersichtliche Zusammenstellung für Notar und Käufer.",
      "Preis: 150 € inkl. MwSt. pro angefangener Stunde. Die tatsächlichen Kosten richten sich nach Aufwand und Objekt.",
    ],
  },
  {
    id: "7",
    slug: "objektkoordination",
    title: "Exklusive Objektkoordination und Nachbetreuung nach Übergabe",
    price: "120 € pro angefangener Stunde",
    description:
      "Persönliche Koordination aller Gewerke und kontinuierliche Nachbetreuung nach der Immobilienübergabe.",
    image:
      "https://placehold.co/800x450/e2e8f0/334155?text=Objektkoordination&font=source-sans",
    detailSections: [
      "Nach dem Verkauf oder bei laufenden Sanierungen: Wir koordinieren Gewerke, Termine und Ansprechpartner und behalten Fristen und To-dos im Blick. So läuft Ihr Projekt geordnet und ohne unnötige Verzögerungen.",
      "Auf Wunsch begleiten wir Sie auch nach der Übergabe – z. B. bei der Übergabe an Mieter, bei Mängelangelegenheiten oder der Abwicklung von Nachbesserungen.",
      "Preis: 120 € pro angefangener Stunde. Gern besprechen wir Ihren konkreten Bedarf.",
    ],
  },
  {
    id: "8",
    slug: "verkaeuferschutzmodul",
    title: "Verkäuferschutzmodul. Exposé und qualifizierte Interessentenprüfung",
    price: "120 € inkl. MwSt. pro angefangener Stunde",
    description:
      "Hochwertiges Exposé und sorgfältige Bonitätsprüfung aller Interessenten für Ihren Verkauf.",
    image:
      "https://placehold.co/800x450/cbd5e1/475569?text=Verk%C3%A4uferschutz&font=source-sans",
    detailSections: [
      "Das Verkäuferschutzmodul umfasst ein hochwertiges Exposé Ihrer Immobilie und eine qualifizierte Prüfung der Interessenten. So erhalten Sie nur ernsthafte Kaufinteressenten mit seriöser Finanzierung – weniger Zeit mit unpassenden Anfragen, mehr Fokus auf den richtigen Käufer.",
      "Das Exposé wird professionell erstellt und kann für Portale, Aushänge und Ihre eigene Kommunikation genutzt werden. Die Bonitätsprüfung erfolgt diskret und nach Ihren Wünschen.",
      "Preis: 120 € inkl. MwSt. pro angefangener Stunde. Ideal in Kombination mit unserer Beratung oder vor einer Vollvermarktung.",
    ],
  },
];
