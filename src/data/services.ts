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
    title: "Bewertungsmodul",
    price: "595,- EUR als Einzelauftrag",
    description:
      "Präzise Wertermittlung & Marktanalyse",
    image: "/img/service-marktwertanalyse.png",
    detailSections: [
      "Substanz erkennen. Werte verstehen. Sicher entscheiden.",
      "Wir beginnen dort, wo es zählt – bei Ihrer Immobilie.",
      "Im persönlichen Termin vor Ort erfassen wir alle relevanten Merkmale, prüfen erkennbare Stärken und Schwachstellen und analysieren die tatsächliche Marktposition Ihres Objekts. Dabei geht es nicht nur um den Zustand, sondern um Potenzial, Lagequalität und strategische Einordnung.",
      "Im Anschluss erhalten Sie keine bloße Zahl, sondern eine fundierte, nachvollziehbare Marktwerteinschätzung.",
      "Auf Basis etablierter Bewertungssoftware, aktueller Vergleichsdaten, präziser Lageanalysen und objektspezifischer Faktoren erstellen wir einen transparenten Marktpreisreport mit realistischer Einschätzung des erzielbaren Verkaufspreises.",
      "Die Ergebnisse werden hochwertig dokumentiert und persönlich mit Ihnen besprochen – in unserem Büro in Radolfzell, bei Ihnen vor Ort oder digital. Klar. Strukturiert. Verständlich.",
      "Transparente Rahmenbedingungen",
      "Unsere Bewertung stellt kein Gutachten eines öffentlich bestellten oder vereidigten Sachverständigen dar und ersetzt keine bautechnische oder rechtliche Begutachtung.",
      "Es handelt sich um eine qualifizierte Marktwerteinschätzung auf Grundlage unserer regionalen Markterfahrung und digitaler Bewertungsmodelle.",
      "Eine rechtssichere Verwendbarkeit gegenüber Gerichten, Behörden oder Finanzämtern können wir nicht gewährleisten.",
      "Auf Wunsch vermitteln wir Ihnen gerne Architekten, Sachverständige oder unabhängige Gutachter aus unserem bewährten Netzwerk.",
      "Klare Konditionen",
      "Im Rahmen einer konkreten Verkaufs- oder Kaufabsicht ist die professionelle Wertermittlung inklusive Marktpreisreport für Sie kostenfrei und wird mit der Maklerprovision verrechnet.",
      "Erfolgt die Bewertung als eigenständiger Service ohne anschließende Vermarktung, berechnen wir ein einmaliges Honorar von 595,- EUR.",
      "Beauftragen Sie uns später mit dem Verkauf Ihrer Immobilie, wird dieses Honorar ebenfalls selbstverständlich vollständig mit der Maklerprovision verrechnet.",
    ],
  },
  {
    id: "2",
    slug: "beratung-begleitung",
    title: "Beratungsmodul",
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
    slug: "high-end-immobilienaufnahmen",
    title: "Präsentationsmodul",
    subtitle: "Hochwertige Drohnen- und Kameraproduktion für Luxusimmobilien",
    price: "600 € inkl. MwSt.",
    description: "Exposé, Fotografie, Drohne, Objektaufbereitung",
    image: "/img/tim.jpeg",
    detailSections: [
      "Für anspruchsvolle Objekte bieten wir professionelle Immobilienaufnahmen: Drohnenaufnahmen für Außenansichten und Lage, hochwertige Innenaufnahmen und eine stimmige Bildsprache, die Ihre Immobilie optimal präsentiert.",
      "Die Aufnahmen eignen sich für Exposés, Portale und Ihre eigene Werbung. Sie erhalten bearbeitete Dateien in hoher Auflösung zur uneingeschränkten Nutzung.",
      "Preis: 600 € inkl. MwSt. inkl. Vor-Ort-Termin und Lieferung der Dateien. Gerne erstellen wir ein individuelles Angebot für größere Objekte oder Pakete.",
    ],
  },
  {
    id: "4",
    slug: "verkaeuferschutzmodul",
    title: "Verkäuferschutz-Modul",
    price: "120 € inkl. MwSt. pro angefangener Stunde",
    description:
      "Qualifizierte Interessentenprüfung & Bonität",
    image:
      "https://placehold.co/800x450/cbd5e1/475569?text=Verk%C3%A4uferschutz&font=source-sans",
    detailSections: [
      "Exposé & geprüfte Kaufinteressenten",
      "Sicherheit beginnt vor der ersten Besichtigung.",
      "Ein Immobilienverkauf ist kein Besichtigungstourismus.",
      "Er verlangt Struktur, Seriosität und wirtschaftliche Klarheit.",
      "Mit unserem Verkäuferschutz-Modul stellen wir sicher, dass Ihre Immobilie professionell präsentiert wird – und nur geprüfte Kaufinteressenten Zugang erhalten.",
      "Was wir für Sie tun",
      "Hochwertiges Exposé",
      "Ihre Immobilie wird klar, vollständig und marktgerecht positioniert.",
      "Professionelle Aufbereitung, transparente Objektinformationen und eine überzeugende Darstellung schaffen Vertrauen – von Anfang an.",
      "Geprüfte Kaufinteressenten",
      "Bevor es zu Besichtigungen oder Preisverhandlungen kommt, prüfen wir: Besteht eine echte Kaufabsicht? Ist die Finanzierung realistisch darstellbar? Liegt eine belastbare Finanzierungsbestätigung vor? Erfolgt eine Bonitätsprüfung über unseren Finanzierungspartner?",
      "So vermeiden Sie unnötige Termine, reduzieren Ihr Risiko und schützen Ihre Verhandlungsposition.",
      "Unser Anspruch:",
      "Keine Neugierigen. Keine Zeitverschwendung.",
      "Sondern geprüfte Interessenten mit ernsthafter Kaufabsicht.",
      "Honorar",
      "120 € inkl. MwSt. pro angefangener Stunde",
      "Abrechnung nach tatsächlichem Zeitaufwand.",
    ],
  },
  {
    id: "5",
    slug: "kaufvertragsabwicklung",
    title: "Vertragsmodul",
    price: "1,19 % Provisionshonorar vom Verkaufspreis",
    description:
      "Notarvorbereitung & Kaufvertragsabwicklung",
    image:
      "https://placehold.co/800x450/cbd5e1/334155?text=Kaufvertragsabwicklung&font=source-sans",
    detailSections: [
      "Der Kaufvertrag ist unterzeichnet – damit beginnt die Phase der Abwicklung: Fristen überwachen, Unterlagen einholen, Notartermin und Finanzierung abstimmen, Übergabe vorbereiten. Wir übernehmen die Koordination und sorgen dafür, dass nichts auf der Strecke bleibt.",
      "Unsere Abwicklung entlastet Verkäufer und Käufer gleichermaßen und reduziert das Risiko von Verzögerungen oder Fehlern.",
      "Honorar: 1,19 % Provisionshonorar vom Verkaufspreis. Gern erläutern wir Ihnen den Ablauf im Detail.",
    ],
  },
  {
    id: "6",
    slug: "energieausweis",
    title: "Dokumentmodul",
    price: "150 € inkl. MwSt. pro angefangener Stunde",
    description:
      "Beantragung des Energieausweises und vollständige Beschaffung aller erforderlichen Unterlagen für Ihren Immobilienverkauf.",
    image:
      "https://placehold.co/800x450/f1f5f9/475569?text=Energieausweis&font=source-sans",
    detailSections: [
      "Die Beschaffung objektbezogener Unterlagen erfolgt ausschließlich auf Grundlage eines gesonderten, schriftlich oder in Textform erteilten Einzelauftrags sowie nach ausdrücklicher Freigabe des Eigentümers.",
      "Wir übernehmen im Rahmen dieses Auftrags die organisatorische Koordination und Anforderung erforderlicher Dokumente bei zuständigen Behörden, Notariaten, Hausverwaltungen, Energieberatern oder sonstigen Dritten.",
      "Hierzu zählen insbesondere, jedoch nicht abschließend:",
      "Energieausweis (Verbrauchs- oder Bedarfsausweis)",
      "Grundrisse / Wohnflächenberechnungen",
      "Flur- oder Liegenschaftskarten",
      "Grundbuchauszüge",
      "Teilungserklärungen und Aufteilungspläne",
      "Behörden- oder Verwalterauskünfte",
      "Ein Anspruch auf Beschaffung bestimmter Unterlagen besteht nur im Rahmen der tatsächlichen rechtlichen und tatsächlichen Verfügbarkeit.",
      "Vergütung",
      "Die Vergütung erfolgt auf Stundenbasis mit 150 € inkl. MwSt. pro angefangener Stunde, abgerechnet nach tatsächlichem Zeitaufwand. Zusätzlich werden sämtliche Auslagen und Gebühren, die von Behörden, Notariaten, Hausverwaltungen oder sonstigen Institutionen für die Ausstellung oder Bereitstellung der Unterlagen erhoben werden, in tatsächlicher Höhe weiterberechnet.",
      "Haftungsregelung",
      "Wir haften nicht für inhaltliche Richtigkeit, Vollständigkeit oder Aktualität der durch Dritte bereitgestellten Unterlagen. Eine rechtliche oder bautechnische Prüfung der Dokumente ist nicht Bestandteil dieses Auftrags, sofern nicht ausdrücklich gesondert vereinbart.",
    ],
  },
  {
    id: "7",
    slug: "objektkoordination",
    title: "Übergabemodul",
    price: "120 € pro angefangener Stunde",
    description:
      "Objektübergabe & Nachbetreuung",
    image: "/img/übergabemodul.jpeg",
    detailSections: [
      "Exklusive Objektkoordination und Nachbetreuung nach Übergabe",
      "Nach der Schlüsselübergabe endet mein Service nicht – im Gegenteil: Gerade wenn Sie zeitlich eingebunden sind, weiter entfernt im In- oder Ausland weilen oder schlicht Unterstützung schätzen, stehe ich Ihnen als verlässlicher Koordinator zur Seite.",
      "Ob Elektriker, Maler, Außen- oder Innenbauer, Teppichleger, Küchenbauer, Gartenpflege oder sonstige Handwerksleistungen – ich nutze mein regionales Netzwerk, um die passenden Fachleute zu vermitteln. Ich überwache die Abläufe, sorge dafür, dass alle Arbeiten zuverlässig erledigt werden, und halte Sie kontinuierlich auf dem Laufenden.",
      "Dabei schließe ich selbst keine Verträge – diese erfolgen direkt zwischen Ihnen und den Dienstleistern, sodass die Haftung bei den jeweiligen Firmen liegt. Mein Beitrag ist die reibungslose Koordination.",
      "Für 120 € pro angefangener Stunde erhalten Sie damit einen vertrauensvollen Ansprechpartner, der Ihnen stets Transparenz und Ruhe in allen organisatorischen Abläufen verschafft.",
    ],
  },
  {
    id: "8",
    slug: "immobilienverkauf",
    title: "Der ganzheitliche Verkaufsprozess – von der Bewertung bis zur Übergabe",
    subtitle: "Ein sicherer Verkauf in 5 klaren Schritten",
    price: "3,57 % inklusive MwSt. vom Verkaufspreis der Immobilie",
    description:
      "Vollständige Vermarktung Ihrer Immobilie – von der Wertermittlung bis zur erfolgreichen Übergabe.",
    image:
      "https://placehold.co/800x450/94a3b8/1e293b?text=Immobilienverkauf&font=source-sans",
    detailSections: [
      "Ein erfolgreicher Immobilienverkauf braucht Struktur, Marktkenntnis und eine klare Strategie.",
      "Unser 5-Schritte-Konzept führt Sie sicher, transparent und effizient vom ersten Gespräch bis zur Übergabe.",
      "1. Präzise Wertermittlung",
      "Nach einer persönlichen Besichtigung erhalten Sie eine fundierte Marktanalyse mit realistischer Preisempfehlung. Keine Luftschlösser – sondern ein Preis, der am Markt erzielbar ist.",
      "2. Hochwertige Aufbereitung",
      "Professionelle Architekturfotografie, Exposé-Erstellung, auf Wunsch Drohnenaufnahmen – Ihre Immobilie wird optimal positioniert.",
      "3. Gezieltes Marketing & Käuferprüfung",
      "Individuelles Vermarktungskonzept, Ansprache vorgemerkter Kunden, Präsentation auf relevanten Plattformen sowie persönliche Einzelbesichtigungen. Bonitäts- und Seriositätsprüfung aller Kaufinteressenten sind selbstverständlich.",
      "4. Finanzierungssicherheit",
      "Vorbereitung aller Unterlagen und Sicherstellung einer belastbaren Finanzierungsbestätigung vor dem Notartermin.",
      "5. Notar & Übergabe",
      "Koordination der Beurkundung, Begleitung zum Notar sowie strukturierte Objektübergabe mit Protokoll.",
      "Transparente Vergütung",
      "Für diesen umfassenden Service berechnen wir das ortsübliche Erfolgshonorar von 3,57 % inkl. MwSt., bezogen auf den notariell beurkundeten Kaufpreis. Kommt es wider Erwarten nicht zum Verkauf, berechnen wir eine Aufwandsentschädigung von 950 € brutto.",
    ],
  },
];
