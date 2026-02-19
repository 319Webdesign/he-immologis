export const SMART_INTRO = {
  title: "Wir drehen Performance kontrolliert nach oben.",
  subtitle: "Menschen. Struktur. Strategie. Netzwerk.",
  acronym: [
    { letter: "S", label: "Schulung" },
    { letter: "M", label: "M & A" },
    { letter: "A", label: "Aufbau Entscheidernetzwerken" },
    { letter: "R", label: "Regionale Interim-Lösungen" },
    { letter: "T", label: "Transportnetzwerkstrategien" },
  ],
  heroDescription:
    "SMART – Beratung und Vertriebsunterstützung für Supply-Chain-Lösungen in temperaturgeführten und nicht temperaturgeführten Logistiknetzwerken",
} as const;

export interface SmartModul {
  slug: string;
  letter: string;
  title: string;
  subtitle?: string;
  shortDescription: string;
  paragraphs: string[];
  /** Optional: sub-sections with heading + paragraphs (e.g. für Modul 5 Transportmodi) */
  subsections?: { heading: string; paragraphs: string[] }[];
}

export const SMART_MODULE: SmartModul[] = [
  {
    slug: "schulung",
    letter: "S",
    title: "Schulung und Beratung",
    shortDescription:
      "Grundlagen- und Aufbauschulungen entlang temperaturgeführter und multimodaler Lieferketten.",
    paragraphs: [
      "Ich biete Grundlagen- und Aufbauschulungen für Ihre Mitarbeiter und Führungskräfte entlang temperaturgeführter und multimodaler Lieferketten an.",
      "In der Praxis treffen häufig sehr unterschiedliche Erfahrungs- und Wissensstände aufeinander. Genau hier setze ich an: verständlich, strukturiert und immer mit Bezug zur realen Anwendung.",
      "Die Teilnehmer erhalten ein klares Markt- und Prozessverständnis über die gesamte Supply Chain – von Pharma- und Healthcare-Logistik bis zu internationalen Transport- und Warehouse-Abläufen. Ohne theoretische Überladung, aber immer nah an der operativen Realität.",
      "Meine Schulungen sind keine klassischen Folienvorträge.",
      "Bereits im ersten Austausch greife ich konkrete Fragen und Situationen der Teilnehmer auf und vermittle Inhalte bedarfsorientiert, greifbar und direkt aus der Praxis heraus.",
      "So entsteht eine gemeinsame Wissensbasis, die Zusammenarbeit vereinfacht, Schnittstellen stabilisiert und operative Sicherheit im Unternehmen erhöht.",
    ],
  },
  {
    slug: "ma",
    letter: "M",
    title: "M & A von Logistikunternehmen",
    shortDescription:
      "Unterstützung beim Kauf familiengeführter Transport- und Logistikbetriebe – mit und ohne Temperaturführung.",
    paragraphs: [
      "Ich unterstütze Investoren und Logistikunternehmen beim Kauf familiengeführter Transport- und Logistikbetriebe – mit und ohne Temperaturführung.",
      "Für nationale und europäische Kaufvorhaben übernehme ich:",
      "Identifikation geeigneter Zielunternehmen",
      "Erstanalysen und strukturierte Vorqualifizierung",
      "Erstellung eines priorisierten Target-Rankings",
      "Erstansprache und Gesprächsführung im Mandat",
      "Laufende Berichterstattung und Entscheidervorbereitung",
      "Ich begleite den gesamten Anbahnungsprozess bis zur Konkretisierung der Verhandlungen und koordiniere alle lokalen Aktivitäten vor Ort. Dadurch können Sie den Prozess effizient steuern, ohne permanent physisch präsent sein zu müssen.",
      "Sie erhalten einen transparent geführten Prozess, kurze Entscheidungswege und eine professionelle Schnittstelle zwischen Käufer und Zielunternehmen.",
    ],
  },
  {
    slug: "entscheidernetzwerke",
    letter: "A",
    title: "Aufbau Entscheidernetzwerke",
    shortDescription:
      "Europäisches Netzwerk aus Entscheidern der Logistik- und Pharmalogistikbranche – strukturiert an einen Tisch.",
    paragraphs: [
      "Ich verfüge über ein gewachsenes europäisches Netzwerk aus Entscheidern der Logistik- und Pharmalogistikbranche.",
      "Ich bringe die richtigen Partner strukturiert an einen Tisch und ermögliche einen gemeinsamen strategischen Netzwerkaufbau über alle Verkehrsträger hinweg – Road, Air, Ocean, Rail und Warehouse.",
      "Mehr als 20 Jahre internationale operative und vertriebliche Erfahrung in Key Account Management, Business Development und Post-Merger-Integrationen innerhalb globaler Logistikorganisationen fließen dabei direkt in die Umsetzung ein.",
      "Ich verbinde Ihr Unternehmen gezielt mit geeigneten Logistikpartnern in Europa – vom Paketdienst bis zur containerbasierten Distribution.",
      "So werden Warenströme effizient in europäische Netzwerke integriert und ebenso zuverlässig in internationale Märkte angebunden.",
      "Besonders in der Pharma- und Healthcare-Logistik stelle ich sicher, dass Produkte kontrolliert, regelkonform und operativ stabil entlang der gesamten Supply Chain bewegt werden können.",
    ],
  },
  {
    slug: "interim",
    letter: "R",
    title: "Regionale Interim-Lösungen",
    shortDescription:
      "Befristet operative und strategische Verantwortung in Vertriebs-, Aufbau- und Transformationsphasen.",
    paragraphs: [
      "Je nach Unternehmenssituation kann ein erfahrener Interim Manager die effektivste Lösung sein, um Veränderungen schnell und sicher umzusetzen.",
      "Ich übernehme befristet operative und strategische Verantwortung in Vertriebs-, Aufbau- und Transformationsphasen – insbesondere in der temperaturgeführten und multimodalen Logistik.",
      "Ob Markteintritt, Aufbau neuer Geschäftsfelder oder Reorganisation bestehender Strukturen:",
      "Ich begleite Sie bei Strategie, Organisation, Personal, Prozesse und Implementierung bis zur stabilen operativen Umsetzung.",
      "Für internationale Unternehmen ohne vollständige Präsenz in Deutschland übernehme ich die regionale oder nationale Verantwortung gegenüber Kunden und Partnern, stelle lokale Präsenz sicher und entwickle Geschäftsbeziehungen nachhaltig weiter.",
      "Im Vertrieb unterstütze ich Ihr Unternehmen als Interim-Partner temporär in Key Account Management und Business Development – für einzelne Kunden, Produktbereiche oder komplette Segmente. Dazu gehören auch anspruchsvolle Verhandlungen, Preisrunden und kritische Kundensituationen.",
      "Ebenso schließe ich temporäre Kapazitätslücken, etwa bei Vakanzen oder längerfristigen Ausfällen, und halte Ihre Kundenbetreuung ohne Qualitätsverlust aufrecht.",
    ],
  },
  {
    slug: "transportnetzwerkstrategien",
    letter: "T",
    title: "Transportnetzwerkstrategien",
    subtitle: "temperaturgeführt / nicht temperaturgeführt",
    shortDescription:
      "Aufbau und Weiterentwicklung europaweiter Transport- und Warehouse-Partnernetzwerke, insbesondere temperaturgeführt.",
    paragraphs: [
      "Ich unterstütze Ihr Unternehmen beim Aufbau und der Weiterentwicklung europaweiter Transport- und Warehouse Partnernetzwerke. Dies gilt insbesondere für den Aufbau qualifizierter temperaturgeführter Transport- und Partnernetzwerke.",
      "Ob internationaler Konzern oder mittelständisches Unternehmen ohne tiefgehende Marktkenntnis: Ich identifiziere passende Logistikpartner, bewerte Alternativen objektiv und führe die richtigen Entscheider strukturiert zusammen.",
      "So entsteht ein belastbares Netzwerk, das operativ funktioniert und strategisch trägt.",
    ],
    subsections: [
      {
        heading: "Transportmodi & Warehousing",
        paragraphs: [
          "Road",
          "Von Paket über Palette bis LTL und FTL – temperaturgeführt oder konventionell. Ich stelle sicher, dass innerhalb Europas alle Straßentransportarten sinnvoll kombiniert werden und der Lieferprozess durchgängig funktioniert.",
          "Rail",
          "Auch Rail-Lösungen integriere ich strategisch, etwa auf der New Silk Way Route Richtung China. Die Bahn positioniert sich zwischen Luft- und Seefracht: schneller als See, wirtschaftlicher als Luft – ideal für planbare internationale Warenströme.",
          "Air & Ocean",
          "Für Luft- und Seefracht binde ich geeignete Carrier und Strukturen in Ihr Netzwerk ein. Luftfracht für zeitkritische Sendungen, Seefracht für kostenoptimierte Volumina – abgestimmt auf Ihre Supply-Chain-Strategie.",
          "Warehouse",
          "Vom temperaturgeführten Lager bis zur Hafen- oder Airport-Anbindung: Ich gestalte Lager- und Umschlagstrukturen so, dass Einlagerung, Handling und Weiterverteilung nahtlos ineinandergreifen.",
        ],
      },
    ],
  },
];
