export interface Education {
  id: string;
  school: string;
  degree: string;
  period: string;
  description: string;
  points: string[];
  skills: string[];
  logo?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  link?: string;
  description?: string;
  skills: string[];
  logo?: string;
}

export interface Volunteer {
  id: string;
  role: string;
  organization: string;
  period: string;
  description: string;
  points?: string[];
  logo?: string;
}

export const education: Education[] = [
  {
    id: 'epitech',
    school: "Epitech - L'école de l'excellence informatique",
    degree: "Expert en Technologies de l'Information (Bac+5)",
    period: "2023 - 2028 (Actuellement en 3ᵉ année)",
    description: "Développement de compétences en informatique à travers des projets concrets, innovants et orientés impact.",
    points: [
      "Apprentissage par projets (Piscines C, C++, JS/TS)",
      "Architecture logicielle et gestion d'équipe (Scrum/Agile)",
      "Développement de projets innovants (Epitech Innovative Project)",
      "Immersion dans l'écosystème tech et réseau professionnel"
    ],
    skills: ["JS/TS", "C/C++", "Architecture", "Git", "Unix"],
    logo: "/Portfolio/assets/logos/epitech.png"
  },
  {
    id: 'yeungnam',
    school: "Yeungnam University (Corée du Sud)",
    degree: "Échange Académique d'un an",
    period: "À partir de 2026",
    description: "Échange académique international pour développer une vision globale du monde technologique et entrepreneurial.",
    points: [
      "Systems Administration",
      "Business Science",
      "International Business"
    ],
    skills: ["Administration Système", "Business Science", "International Business", "Adaptabilité"],
    logo: "/Portfolio/assets/logos/YU.png"
  },
  {
    id: 'saint-ex',
    school: "Lycée Saint-Exupéry (Marseille)",
    degree: "Baccalauréat Général - Mention Bien",
    period: "2020 - 2023",
    description: "Parcours scientifique avec une forte spécialisation en informatique et mathématiques appliquées.",
    points: [
      "Spécialité NSI (Numérique et Sciences Informatiques)",
      "Spécialité Mathématiques & AMC (Anglais Monde Contemporain)",
      "Premier prix au concours local de programmation Python",
      "Délégué de classe et membre actif du CVL"
    ],
    skills: ["Python", "Algorithmique", "Réseaux", "Maths"],
    logo: "/Portfolio/assets/logos/saint-ex.jpg"
  }
];

export const certifications: Certification[] = [
  {
    id: 'inovgames',
    title: "I-NOVGAMES 2025-2026",
    issuer: "Campus d'Excellence Industrie du futur",
    date: "2026",
    description: "Programme de formation avancée en systèmes embarqués et microélectronique industrielle.",
    link: "https://openbadgefactory.com/obv3/credentials/76aab2385d47cff39e93f7acf06f19e657319a78.html",
    skills: ["STM32", "C Embarqué", "Microélectronique", "IoT"],
    logo: "/Portfolio/assets/logos/st.jpg"
  },
  {
    id: 'mantu',
    title: "The Mantu Manager Program",
    issuer: "Mantu",
    date: "2025",
    description: "Formation à l'acquisition d'affaires, la gestion de comptes et la stratégie de croissance.",
    skills: ["Business Acquisition", "Pitching", "CRM", "Négociation"],
    logo: "/Portfolio/assets/logos/mantu.jpg"
  },
  {
    id: 'hacktogone',
    title: "Hackathon Agent AI (HACKTOGONE)",
    issuer: "HACKTOGONE",
    date: "2025",
    description: "Développement d'agents autonomes intelligents lors d'une compétition intensive de 48h.",
    link: "https://credsverse.com/credentials/bf1ccad0-62b9-4c5a-abf1-2c8ef6adacfd",
    skills: ["IA", "LLMs", "RAG", "Agentic Workflows"],
    logo: "/Portfolio/assets/logos/hacktogone.jpg"
  }
];

export const volunteering: Volunteer[] = [
  {
    id: 'ambassador',
    role: "Étudiant Ambassadeur",
    organization: "Epitech",
    period: "2023 - Aujourd'hui",
    description: "Représentation de l'école et accompagnement des futurs étudiants dans leur découverte de l'informatique.",
    points: [
      "Animation d'ateliers découverte (Coding Club) pour collégiens et lycéens",
      "Présence sur les salons étudiants et journées portes ouvertes",
      "Accompagnement et tutorat de nouveaux arrivants lors des piscines",
      "Organisation d'événements communautaires et tech talks"
    ],
    logo: "/Portfolio/assets/logos/epitech.png"
  },
  {
    id: 'article1',
    role: "Bénévole Étudiant",
    organization: "Article 1",
    period: "2024 - 2025",
    description: "Accompagnement de lycéens issus de milieux modestes pour favoriser l'égalité des chances.",
    points: [
      "Partage d'expérience sur le parcours en école d'informatique",
      "Aide à l'orientation et à la préparation des dossiers de candidature",
      "Animation de sessions d'ateliers 'Inspirer' en milieu scolaire"
    ],
    logo: "/Portfolio/assets/logos/a1.png"
  }
];
