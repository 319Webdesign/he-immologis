export const SMART_INTRO = {
  title: ["EIN STANDORT, DER BEWEGT.", "Ihre Logistik im Mittelpunkt."],
  subtitle: "Menschen. Struktur. Strategie. Netzwerk.",
  acronym: [
    { letter: "S", label: "Schulung" },
    { letter: "M", label: "Mergers & Acquisition" },
    { letter: "A", label: "Aufbau Entscheidernetzwerk" },
    { letter: "R", label: "Regionale Interim-Lösungen" },
    { letter: "T", label: "Transportnetzwerkstrategien" },
  ],
  heroDescription: [
    "-SMART-",
    "Beratung und Vertriebsunterstützung für Supply-Chain-Lösungen",
    "in temperaturgeführten und nicht temperaturgeführten Logistiknetzwerken",
  ],
} as const;

export const SMART_INTRO_EN = {
  title: ["ONE LOCATION THAT MOVES.", "Your logistics at center stage."],
  subtitle: "People. Structure. Strategy. Network.",
  acronym: [
    { letter: "S", label: "Training" },
    { letter: "M", label: "Mergers & Acquisition" },
    { letter: "A", label: "Building decision-maker networks" },
    { letter: "R", label: "Regional interim solutions" },
    { letter: "T", label: "Transport network strategies" },
  ],
  heroDescription: [
    "-SMART-",
    "Consulting and sales support for supply chain solutions",
    "in temperature-controlled and non-temperature-controlled logistics networks",
  ],
} as const;

export const SMART_INTRO_TR = {
  title: ["HAREKET EDEN BİR KONUM.", "Lojistiğiniz odak noktasında."],
  subtitle: "İnsanlar. Yapı. Strateji. Ağ.",
  acronym: [
    { letter: "S", label: "Eğitim" },
    { letter: "M", label: "Mergers & Acquisition" },
    { letter: "A", label: "Karar verici ağları kurma" },
    { letter: "R", label: "Bölgesel geçici çözümler" },
    { letter: "T", label: "Taşıma ağı stratejileri" },
  ],
  heroDescription: [
    "-SMART-",
    "Tedarik zinciri çözümleri için danışmanlık ve satış desteği",
    "kontrol edilmiş ve normal sıcaklık lojistik ağlarında",
  ],
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
    title: "Aufbau Entscheidernetzwerk",
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

export const SMART_MODULE_EN: SmartModul[] = [
  {
    slug: "schulung",
    letter: "S",
    title: "Training and consulting",
    shortDescription:
      "Basic and advanced training along temperature-controlled and multimodal supply chains.",
    paragraphs: [
      "I offer basic and advanced training for your staff and managers along temperature-controlled and multimodal supply chains.",
      "In practice, very different levels of experience and knowledge often meet. That is exactly where I come in: clear, structured and always with reference to real-world application.",
      "Participants gain a clear understanding of markets and processes across the entire supply chain – from pharma and healthcare logistics to international transport and warehouse operations. Without theoretical overload, but always close to operational reality.",
      "My training sessions are not classic slide presentations.",
      "From the first exchange I pick up on participants’ concrete questions and situations and convey content in a needs-oriented, tangible way, directly from practice.",
      "This creates a shared knowledge base that simplifies collaboration, stabilises interfaces and increases operational security within the company.",
    ],
  },
  {
    slug: "ma",
    letter: "M",
    title: "M & A of logistics companies",
    shortDescription:
      "Support with the acquisition of family-run transport and logistics businesses – with and without temperature control.",
    paragraphs: [
      "I support investors and logistics companies in acquiring family-run transport and logistics businesses – with and without temperature control.",
      "For national and European acquisition projects I provide:",
      "Identification of suitable target companies",
      "Initial analyses and structured pre-qualification",
      "Creation of a prioritised target ranking",
      "First approach and mandate-led dialogue",
      "Ongoing reporting and decision-maker preparation",
      "I accompany the entire initiation process up to the concretisation of negotiations and coordinate all local activities on the ground. This allows you to manage the process efficiently without having to be physically present at all times.",
      "You get a transparently managed process, short decision paths and a professional interface between buyer and target company.",
    ],
  },
  {
    slug: "entscheidernetzwerke",
    letter: "A",
    title: "Building decision-maker networks",
    shortDescription:
      "European network of decision-makers from the logistics and pharma logistics sector – brought together in a structured way.",
    paragraphs: [
      "I have an established European network of decision-makers from the logistics and pharma logistics sector.",
      "I bring the right partners to the table in a structured way and enable joint strategic network building across all modes of transport – road, air, ocean, rail and warehouse.",
      "More than 20 years of international operational and sales experience in key account management, business development and post-merger integration within global logistics organisations flow directly into implementation.",
      "I connect your company with suitable logistics partners in Europe – from parcel services to container-based distribution.",
      "This allows goods flows to be integrated efficiently into European networks and connected just as reliably to international markets.",
      "Particularly in pharma and healthcare logistics I ensure that products can be moved in a controlled, compliant and operationally stable manner along the entire supply chain.",
    ],
  },
  {
    slug: "interim",
    letter: "R",
    title: "Regional interim solutions",
    shortDescription:
      "Temporary operational and strategic responsibility in sales, set-up and transformation phases.",
    paragraphs: [
      "Depending on the company situation, an experienced interim manager can be the most effective solution to implement change quickly and safely.",
      "I take on temporary operational and strategic responsibility in sales, set-up and transformation phases – especially in temperature-controlled and multimodal logistics.",
      "Whether market entry, building new business areas or reorganising existing structures:",
      "I support you with strategy, organisation, personnel, processes and implementation through to stable operational execution.",
      "For international companies without a full presence in Germany I take on regional or national responsibility towards customers and partners, ensure local presence and develop business relationships sustainably.",
      "In sales I support your company as an interim partner in key account management and business development – for individual customers, product areas or entire segments. This also includes demanding negotiations, price rounds and critical customer situations.",
      "I also fill temporary capacity gaps, for example in the case of vacancies or longer absences, and maintain your customer care without loss of quality.",
    ],
  },
  {
    slug: "transportnetzwerkstrategien",
    letter: "T",
    title: "Transport network strategies",
    subtitle: "temperature-controlled / non-temperature-controlled",
    shortDescription:
      "Building and developing Europe-wide transport and warehouse partner networks, especially temperature-controlled.",
    paragraphs: [
      "I support your company in building and developing Europe-wide transport and warehouse partner networks. This applies in particular to building qualified temperature-controlled transport and partner networks.",
      "Whether international corporation or medium-sized company without in-depth market knowledge: I identify suitable logistics partners, evaluate alternatives objectively and bring the right decision-makers together in a structured way.",
      "The result is a robust network that works operationally and supports you strategically.",
    ],
    subsections: [
      {
        heading: "Transport modes & warehousing",
        paragraphs: [
          "Road",
          "From parcel to pallet to LTL and FTL – temperature-controlled or conventional. I ensure that all road transport types within Europe are combined sensibly and the delivery process works end-to-end.",
          "Rail",
          "I also integrate rail solutions strategically, for example on the New Silk Way route towards China. Rail positions itself between air and sea freight: faster than sea, more economical than air – ideal for plannable international goods flows.",
          "Air & Ocean",
          "For air and sea freight I integrate suitable carriers and structures into your network. Air freight for time-critical shipments, sea freight for cost-optimised volumes – aligned with your supply chain strategy.",
          "Warehouse",
          "From temperature-controlled storage to port or airport connection: I design storage and handling structures so that storage, handling and redistribution dovetail seamlessly.",
        ],
      },
    ],
  },
];

export const SMART_MODULE_TR: SmartModul[] = [
  {
    slug: "schulung",
    letter: "S",
    title: "Eğitim ve danışmanlık",
    shortDescription:
      "Kontrol edilmiş sıcaklıkta ve multimodal tedarik zincirleri boyunca temel ve ileri eğitimler.",
    paragraphs: [
      "Personeliniz ve yöneticileriniz için kontrol edilmiş sıcaklıkta ve multimodal tedarik zincirleri boyunca temel ve ileri eğitimler sunuyorum.",
      "Uygulamada çok farklı deneyim ve bilgi seviyeleri bir araya gelir. Tam burada devreye giriyorum: anlaşılır, yapılandırılmış ve her zaman gerçek uygulamaya referansla.",
      "Katılımcılar, ilaç ve sağlık lojistiğinden uluslararası taşıma ve depo işlemlerine kadar tüm tedarik zinciri boyunca net bir pazar ve süreç anlayışı kazanır. Teorik aşırı yükleme olmadan, her zaman operatif gerçekliğe yakın.",
      "Eğitimlerim klasik slayt sunumları değildir.",
      "İlk alışverişten itibaren katılımcıların somut sorularını ve durumlarını ele alıyor ve içerikleri ihtiyaca yönelik, somut ve doğrudan pratikten aktarıyorum.",
      "Böylece iş birliğini kolaylaştıran, ara yüzleri stabilize eden ve işletmede operatif güvenliği artıran ortak bir bilgi temeli oluşur.",
    ],
  },
  {
    slug: "ma",
    letter: "M",
    title: "Lojistik şirketlerinde M & A",
    shortDescription:
      "Aile işletmesi taşıma ve lojistik şirketlerinin satın alınmasında destek – kontrol edilmiş sıcaklıkta veya normal.",
    paragraphs: [
      "Yatırımcıları ve lojistik şirketlerini aile işletmesi taşıma ve lojistik şirketlerinin satın alınmasında destekliyorum – kontrol edilmiş sıcaklıkta veya normal.",
      "Ulusal ve Avrupa satın alma projeleri için üstleniyorum:",
      "Uygun hedef şirketlerin tespiti",
      "İlk analizler ve yapılandırılmış ön niteliklendirme",
      "Öncelikli hedef sıralaması oluşturma",
      "Vekâlet altında ilk temas ve görüşme yönetimi",
      "Devam eden raporlama ve karar verici hazırlığı",
      "Müzakerelerin somutlaşmasına kadar tüm başlatma sürecini eşlik ediyor ve sahada tüm yerel faaliyetleri koordine ediyorum. Böylece süreci sürekli fiziksel olarak orada olmadan verimli yönetebilirsiniz.",
      "Şeffaf yönetilen bir süreç, kısa karar yolları ve alıcı ile hedef şirket arasında profesyonel bir ara yüz elde edersiniz.",
    ],
  },
  {
    slug: "entscheidernetzwerke",
    letter: "A",
    title: "Karar verici ağları kurma",
    shortDescription:
      "Lojistik ve ilaç lojistiği sektöründen karar vericilerden oluşan Avrupa ağı – yapılandırılmış şekilde bir araya getirildi.",
    paragraphs: [
      "Lojistik ve ilaç lojistiği sektöründen karar vericilerden oluşan köklü bir Avrupa ağına sahibim.",
      "Doğru ortakları yapılandırılmış şekilde bir araya getiriyorum ve tüm taşıma türleri boyunca – kara, hava, deniz, demiryolu ve depo – ortak stratejik ağ kurulumunu mümkün kılıyorum.",
      "20 yıldan fazla uluslararası operasyonel ve satış deneyimi – ana hesap yönetimi, iş geliştirme ve küresel lojistik organizasyonlarında birleşme sonrası entegrasyonda – doğrudan uygulamaya yansıyor.",
      "Şirketinizi Avrupa'da uygun lojistik ortaklarıyla hedefli olarak bağlıyorum – paket hizmetinden konteyner tabanlı dağıtıma kadar.",
      "Böylece mal akışları verimli bir şekilde Avrupa ağlarına entegre edilir ve uluslararası pazarlara güvenilir şekilde bağlanır.",
      "Özellikle ilaç ve sağlık lojistiğinde ürünlerin tüm tedarik zinciri boyunca kontrollü, uyumlu ve operatif olarak stabil taşınabileceğini sağlıyorum.",
    ],
  },
  {
    slug: "interim",
    letter: "R",
    title: "Bölgesel geçici çözümler",
    shortDescription:
      "Satış, kurulum ve dönüşüm aşamalarında geçici operatif ve stratejik sorumluluk.",
    paragraphs: [
      "Şirket durumuna bağlı olarak deneyimli bir geçici yönetici, değişiklikleri hızlı ve güvenli uygulamak için en etkili çözüm olabilir.",
      "Satış, kurulum ve dönüşüm aşamalarında – özellikle kontrol edilmiş sıcaklıkta ve multimodal lojistikte – geçici operatif ve stratejik sorumluluk üstleniyorum.",
      "İster pazar girişi, yeni iş alanları kurma ya da mevcut yapıları yeniden düzenleme:",
      "Strateji, organizasyon, personel, süreçler ve implementasyondan stabil operatif uygulamaya kadar size eşlik ediyorum.",
      "Almanya'da tam varlığı olmayan uluslararası şirketler için müşterilere ve ortaklara karşı bölgesel veya ulusal sorumluluk üstleniyorum, yerel varlığı sağlıyorum ve iş ilişkilerini sürdürülebilir şekilde geliştiriyorum.",
      "Satışta ana hesap yönetimi ve iş geliştirmede şirketinize geçici ortak olarak destek veriyorum – tek müşteriler, ürün alanları veya tam segmentler için. Zorlu müzakereler, fiyat turları ve kritik müşteri durumları da dahildir.",
      "Ayrıca boş kadrolar veya uzun süreli devamsızlıklar gibi geçici kapasite boşluklarını dolduruyor ve müşteri bakımınızı kalite kaybı olmadan sürdürüyorum.",
    ],
  },
  {
    slug: "transportnetzwerkstrategien",
    letter: "T",
    title: "Taşıma ağı stratejileri",
    subtitle: "kontrol edilmiş sıcaklık / normal sıcaklık",
    shortDescription:
      "Avrupa çapında taşıma ve depo ortak ağlarının kurulması ve geliştirilmesi, özellikle kontrol edilmiş sıcaklıkta.",
    paragraphs: [
      "Şirketinizi Avrupa çapında taşıma ve depo ortak ağlarının kurulması ve geliştirilmesinde destekliyorum. Bu özellikle nitelikli kontrol edilmiş sıcaklıkta taşıma ve ortak ağlarının kurulması için geçerlidir.",
      "İster uluslararası holding ister derinlemesine pazar bilgisi olmayan KOBİ: Uygun lojistik ortaklarını tespit ediyorum, alternatifleri objektif değerlendiriyorum ve doğru karar vericileri yapılandırılmış şekilde bir araya getiriyorum.",
      "Sonuç operatif çalışan ve stratejik olarak sizi destekleyen dayanıklı bir ağdır.",
    ],
    subsections: [
      {
        heading: "Taşıma modları ve depolama",
        paragraphs: [
          "Kara",
          "Paketten palete LTL ve FTL'ye – kontrol edilmiş sıcaklıkta veya konvansiyonel. Avrupa içinde tüm karayolu taşıma türlerinin mantıklı birleştirildiğini ve teslimat sürecinin uçtan uca çalıştığını sağlıyorum.",
          "Demiryolu",
          "Demiryolu çözümlerini de stratejik entegre ediyorum, örn. Yeni İpek Yolu güzergâhında Çin'e doğru. Demiryolu hava ile deniz arasında konumlanır: denizden hızlı, havadan ekonomik – planlanabilir uluslararası mal akışları için ideal.",
          "Hava ve Deniz",
          "Hava ve deniz taşımacılığı için uygun taşıyıcıları ve yapıları ağınıza entegre ediyorum. Zaman kritik gönderiler için hava taşımacılığı, maliyet optimize hacimler için deniz taşımacılığı – tedarik zinciri stratejinize uyumlu.",
          "Depo",
          "Kontrol edilmiş sıcaklıkta depodan liman veya havalimanı bağlantısına kadar: Depolama ve aktarma yapılarını depolama, elleçleme ve yeniden dağıtımın sorunsuz birleşeceği şekilde tasarlıyorum.",
        ],
      },
    ],
  },
];
