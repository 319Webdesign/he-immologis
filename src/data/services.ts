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
  /** Englische Absätze für die Service-Detailseite (wenn gesetzt, wird bei lang=en verwendet). */
  detailSectionsEn?: string[];
  /** Preis-Anzeige auf Englisch (z. B. für Karten auf /en/immobilien-services). */
  priceEn?: string;
}

export const DEFAULT_SERVICES: ServiceCardItem[] = [
  {
    id: "1",
    slug: "marktwertanalyse",
    title: "Bewertungsmodul",
    price: "ab 599,00 € als Einzelauftrag",
    description:
      "Präzise Wertermittlung & Marktanalyse",
    image: "/img/service/bewertungsmodul.jpeg",
    detailSections: [
      "Substanz erkennen. Werte verstehen. Sicher entscheiden.",
      "Wir beginnen dort, wo es zählt – bei Ihrer Immobilie.",
      "Im persönlichen Termin vor Ort erfassen wir alle relevanten Merkmale, prüfen erkennbare Stärken und Schwachstellen und analysieren die tatsächliche Marktposition Ihres Objekts. Dabei geht es nicht nur um den Zustand, sondern um Potenzial, Lagequalität und strategische Einordnung.",
      "Im Anschluss erhalten Sie keine bloße Zahl, sondern eine fundierte, nachvollziehbare Marktwerteinschätzung.",
      "Auf Basis etablierter Bewertungssoftware, aktueller Vergleichsdaten, präziser Lageanalysen und objektspezifischer Faktoren erstellen wir einen transparenten Marktpreisreport mit realistischer Einschätzung des erzielbaren Verkaufspreises.",
      "Die Ergebnisse werden hochwertig dokumentiert und persönlich mit Ihnen besprochen – in unserem Büro in Weinheim, bei Ihnen vor Ort oder digital. Klar. Strukturiert. Verständlich.",
      "Transparente Rahmenbedingungen",
      "Unsere Bewertung stellt kein Gutachten eines öffentlich bestellten oder vereidigten Sachverständigen dar und ersetzt keine bautechnische oder rechtliche Begutachtung.",
      "Es handelt sich um eine qualifizierte Marktwerteinschätzung auf Grundlage unserer regionalen Markterfahrung und digitaler Bewertungsmodelle.",
      "Eine rechtssichere Verwendbarkeit gegenüber Gerichten, Behörden oder Finanzämtern können wir nicht gewährleisten.",
      "Auf Wunsch vermitteln wir Ihnen gerne Architekten, Sachverständige oder unabhängige Gutachter aus unserem bewährten Netzwerk.",
      "Preisgestaltung",
      "Wir unterscheiden in unserer Preisgestaltung nach Objektart und Entfernung. Die Leistungsinhalte sind dabei stets gleich.",
      "Wir berechnen ab Weinheim 70 Cent pro gefahrenem Kilometer für die Hin- und Rückfahrt zum zu bewertenden Objekt. Innerhalb Weinheim und im Umkreis von 5 Kilometer ist die Anfahrt im Preis inbegriffen.",
      "!!! WICHTIG !!! Bei Immobilien, die sich mehr als 30 min von unserem Büro in Weinheim befinden, müssen wir auch den zeitlichen Aufwand in Rechnung stellen. Sie erhalten hierzu auf Anfrage ein gesondertes Angebot.",
      "Die genannten Preise gelten immer für die Bewertung einer Immobilie:",
      "Eigentumswohnung: 599,00 € inkl. MwSt.",
      "Einfamilienhaus: 699,00 € inkl. MwSt.",
      "Zweifamilienhaus: 799,00 € inkl. MwSt.",
      "Mehrfamilienhaus: 899,00 € inkl. MwSt.",
    ],
    detailSectionsEn: [
      "Recognise substance. Understand values. Decide with confidence.",
      "We start where it matters – with your property.",
      "In a personal on-site appointment we capture all relevant features, review visible strengths and weaknesses and analyse the actual market position of your property. It is not only about condition, but potential, location quality and strategic classification.",
      "You will receive not just a figure, but a well-founded, traceable market value assessment.",
      "Based on established valuation software, current comparable data, precise location analyses and property-specific factors we create a transparent market price report with a realistic estimate of the achievable sale price.",
      "The results are documented to a high standard and discussed with you in person – in our office in Weinheim, on site or digitally. Clear. Structured. Understandable.",
      "Transparent framework",
      "Our valuation is not an expert report by a publicly appointed or sworn expert and does not replace a structural or legal assessment.",
      "It is a qualified market value assessment based on our regional market experience and digital valuation models. We cannot guarantee legally secure use vis-à-vis courts, authorities or tax offices. On request we will be happy to put you in touch with architects, experts or independent assessors from our network.",
      "Property Valuation – Pricing",
      "Our pricing structure varies depending on the type of property and the distance. The scope of services remains identical in all cases.",
      "Travel costs are calculated from our office in Weinheim at €0.70 per kilometer (round trip) to the property being evaluated. For properties located within Weinheim and within a radius of 5 kilometers, travel expenses are included in the price.",
      "IMPORTANT: For properties located more than 30 minutes from our office in Weinheim, additional charges may apply for the required time expenditure. A separate quotation will be provided upon request.",
      "The following prices apply per property valuation:",
      "Condominium / Apartment: €599.00 incl. VAT",
      "Single-family house: €699.00 incl. VAT",
      "Two-family house: €799.00 incl. VAT",
      "Multi-family house: €899.00 incl. VAT",
    ],
    priceEn: "From €599.00 per individual assignment",
  },
  {
    id: "2",
    slug: "beratung-begleitung",
    title: "Beratungsmodul",
    price: "149,- EUR / h",
    description:
      "Individuelle Beratung und persönliche Begleitung bei Ihrem Immobilienvorhaben.",
    image: "/img/service/beratungsmodul.jpeg",
    detailSections: [
      "Sie brauchen keine Vollvermarktung, sondern gezielte Beratung oder Begleitung in bestimmten Phasen? Wir unterstützen Sie stundenweise mit unserem Know-how – ob bei der Einschätzung von Objekten, der Verhandlung mit der Bank oder der Koordination von Gewerken.",
      "Die Beratung kann vor Ort, per Video oder am Telefon stattfinden. So bleiben Sie flexibel und zahlen nur für das, was Sie wirklich benötigen.",
      "Preis: 149,- EUR pro Stunde. Sprechen Sie uns an, wir finden das passende Paket.",
    ],
  },
  {
    id: "3",
    slug: "high-end-immobilienaufnahmen",
    title: "High-End Präsentationsmodul",
    subtitle: "Hochwertige Drohnen- und Kameraproduktion für Luxusimmobilien",
    price: "600,- EUR pauschal",
    description: "Exposé, Fotografie, Drohne, Objektaufbereitung",
    image: "/img/tim.jpeg",
    detailSections: [
      "Premium-Visualisierung für Objektpräsentationen, Image-Content und Luxusimmobilien-Marketing",
      "Mit professionellen Luft- und Bodenaufnahmen schärfen Sie die Wahrnehmung Ihrer Immobilie auf ein neues Niveau. Unsere Aufnahmen liefern ästhetische Klarheit, emotionale Wirkung und eine visuelle Sprache, die potenzielle Käufer sofort anspricht und langfristig im Gedächtnis bleibt – technisch präzise, visuell eindrucksvoll und markenstark inszeniert.",
      "Wir kombinieren modernste Kameratechnik mit professioneller Film- und Fotoproduktion, um Ihre Immobilie aus jedem relevanten Blickwinkel darzustellen. Dabei erzählen wir nicht nur Bilder, sondern schaffen Inhalte, die Vertrauen schaffen, Exklusivität transportieren und die Kaufentscheidung emotional unterstützen.",
      "Was Sie erhalten",
      "🎥 Hochwertige Drohnen-Luftaufnahmen",
      "Spektakuläre Perspektiven aus der Vogelperspektive, die Lage, Umfeld und Architektur Ihrer Immobilie in voller Wirkung zeigen – ideal für Exposés, Websites und Social Media.",
      "📸 Professionelle Kamerafotografie bis 4K",
      "Detailstarke Innen- und Außenaufnahmen, die Materialien, Raumwirkung und Lichtführung Ihrer Immobilie perfekt einfangen.",
      "🎬 Anspruchsvolle Postproduktion",
      "Bildoptimierung, Farbkorrektur und stilvolle Sequenzierung – damit jedes Foto und Video nicht nur dokumentiert, sondern inszeniert.",
      "📐 Storytelling & Präsentationsqualität",
      "Visuelles Storytelling statt reiner Dokumentation – Ihre Immobilie wird inhaltlich wie emotional in Szene gesetzt.",
      "Preis",
      "High End Immobilienaufnahmen",
      "Hochwertige Drohnen- und Kameraproduktion für Luxusimmobilien: 600,- EUR pauschal.",
    ],
  },
  {
    id: "4",
    slug: "verkaeuferschutzmodul",
    title: "Verkäuferschutzmodul",
    price: "149,- EUR / h",
    description:
      "Qualifizierte Interessentenprüfung & Bonität",
    image: "/img/service/verkaeuferschutzmodul.jpeg",
    detailSections: [
      "Exposé & geprüfte Kaufinteressenten",
      "Sicherheit beginnt vor der ersten Besichtigung.",
      "Ein Immobilienverkauf ist kein Besichtigungstourismus.",
      "Er verlangt Struktur, Seriosität und wirtschaftliche Klarheit.",
      "Mit unserem Verkäuferschutzmodul stellen wir sicher, dass Ihre Immobilie professionell präsentiert wird – und nur geprüfte Kaufinteressenten Zugang erhalten.",
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
      "149,- EUR inkl. MwSt. pro Stunde.",
      "Abrechnung nach tatsächlichem Zeitaufwand.",
    ],
  },
  {
    id: "5",
    slug: "kaufvertragsabwicklung",
    title: "Notarvertragsmodul",
    price: "1,19 % vom Kaufpreis",
    description:
      "Notarvorbereitung & Kaufvertragsabwicklung",
    image: "/img/service/Notarvertragsmodul.jpeg",
    detailSections: [
      "Der Kaufvertrag ist unterzeichnet – damit beginnt die Phase der Abwicklung: Fristen überwachen, Unterlagen einholen, Notartermin und Finanzierung abstimmen, Übergabe vorbereiten. Wir übernehmen die Koordination und sorgen dafür, dass nichts auf der Strecke bleibt.",
      "Unsere Abwicklung entlastet Verkäufer und Käufer gleichermaßen und reduziert das Risiko von Verzögerungen oder Fehlern.",
      "Honorar: 1,19 % vom Kaufpreis. Gern erläutern wir Ihnen den Ablauf im Detail.",
    ],
  },
  {
    id: "6",
    slug: "energieausweis",
    title: "Dokumentenmodul",
    price: "149,- EUR / h",
    description:
      "Beantragung des Energieausweises und vollständige Beschaffung aller erforderlichen Unterlagen für Ihren Immobilienverkauf.",
    image: "/img/service-dokumentmodul.png",
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
      "Die Vergütung erfolgt auf Stundenbasis mit 149,- EUR inkl. MwSt. pro Stunde, abgerechnet nach tatsächlichem Zeitaufwand. Zusätzlich werden sämtliche Auslagen und Gebühren, die von Behörden, Notariaten, Hausverwaltungen oder sonstigen Institutionen für die Ausstellung oder Bereitstellung der Unterlagen erhoben werden, in tatsächlicher Höhe weiterberechnet.",
      "Haftungsregelung",
      "Wir haften nicht für inhaltliche Richtigkeit, Vollständigkeit oder Aktualität der durch Dritte bereitgestellten Unterlagen. Eine rechtliche oder bautechnische Prüfung der Dokumente ist nicht Bestandteil dieses Auftrags, sofern nicht ausdrücklich gesondert vereinbart.",
    ],
  },
  {
    id: "7",
    slug: "objektkoordination",
    title: "Übergabemodul",
    price: "149,- EUR / h",
    description:
      "Objektübergabe & Nachbetreuung",
    image: "/img/service/uebergabemodul.jpeg",
    detailSections: [
      "Exklusive Objektkoordination und Nachbetreuung nach Übergabe",
      "Nach der Schlüsselübergabe endet mein Service nicht – im Gegenteil: Gerade wenn Sie zeitlich eingebunden sind, weiter entfernt im In- oder Ausland weilen oder schlicht Unterstützung schätzen, stehe ich Ihnen als verlässlicher Koordinator zur Seite.",
      "Ob Elektriker, Maler, Außen- oder Innenbauer, Teppichleger, Küchenbauer, Gartenpflege oder sonstige Handwerksleistungen – ich nutze mein regionales Netzwerk, um die passenden Fachleute zu vermitteln. Ich überwache die Abläufe, sorge dafür, dass alle Arbeiten zuverlässig erledigt werden, und halte Sie kontinuierlich auf dem Laufenden.",
      "Dabei schließe ich selbst keine Verträge – diese erfolgen direkt zwischen Ihnen und den Dienstleistern, sodass die Haftung bei den jeweiligen Firmen liegt. Mein Beitrag ist die reibungslose Koordination.",
      "Für 149,- EUR pro Stunde erhalten Sie damit einen vertrauensvollen Ansprechpartner, der Ihnen stets Transparenz und Ruhe in allen organisatorischen Abläufen verschafft.",
    ],
  },
  {
    id: "8",
    slug: "nachbetreuungsmodul",
    title: "Nachbetreuungsmodul",
    price: "Auf Anfrage",
    description:
      "Persönliche Begleitung und Koordination nach dem Verkauf oder bei laufenden Vorhaben.",
    image: "/img/service/nachbetreung.jpeg",
    detailSections: [
      "Das Nachbetreuungsmodul bietet Ihnen einen verlässlichen Ansprechpartner für alle Schritte nach dem Verkauf oder während laufender Projekte.",
      "Ob Übergabekoordination, Gewerkeabstimmung oder Ansprechpartner für Mieter und Käufer – wir sorgen für Transparenz und reibungslose Abläufe.",
      "Preis und Umfang stimmen wir individuell mit Ihnen ab. Sprechen Sie uns an.",
    ],
  },
  {
    id: "9",
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
      "Für diesen umfassenden Service berechnen wir das ortsübliche Erfolgshonorar von 3,57 % inkl. MwSt., bezogen auf den notariell beurkundeten Kaufpreis. Kommt es wider Erwarten nicht zum Verkauf, berechnen wir eine Aufwandsentschädigung.",
    ],
  },
];
