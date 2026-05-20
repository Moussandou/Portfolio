export interface Education {
  id: string;
  school: string;
  degreeFr: string;
  degreeEn: string;
  periodFr: string;
  periodEn: string;
  descriptionFr: string;
  descriptionEn: string;
  pointsFr: string[];
  pointsEn: string[];
  skillsFr: string[];
  skillsEn: string[];
  logo?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  link?: string;
  descriptionFr?: string;
  descriptionEn?: string;
  skillsFr: string[];
  skillsEn: string[];
  logo?: string;
}

export interface Volunteer {
  id: string;
  roleFr: string;
  roleEn: string;
  organization: string;
  periodFr: string;
  periodEn: string;
  descriptionFr: string;
  descriptionEn: string;
  pointsFr?: string[];
  pointsEn?: string[];
  logo?: string;
}

export const education: Education[] = [
  {
    id: 'epitech',
    school: "Epitech - L'école de l'excellence informatique",
    degreeFr: "Expert en Technologies de l'Information (Bac+5)",
    degreeEn: "Expert in Information Technologies (Master's level, Bac+5)",
    periodFr: "2023 - 2028 (Actuellement en 3ᵉ année)",
    periodEn: "2023 - 2028 (Currently in 3rd year)",
    descriptionFr: "Développement de compétences en informatique à travers des projets concrets, innovants et orientés impact.",
    descriptionEn: "Developing computer science skills through concrete, innovative, and impact-oriented projects.",
    pointsFr: [
      "Apprentissage par projets (Piscines C, C++, JS/TS)",
      "Architecture logicielle et gestion d'équipe (Scrum/Agile)",
      "Développement de projets innovants (Epitech Innovative Project)",
      "Immersion dans l'écosystème tech et réseau professionnel"
    ],
    pointsEn: [
      "Project-based learning (C, C++, JS/TS bootcamps/Piscinces)",
      "Software architecture and team management (Scrum/Agile)",
      "Development of innovative projects (Epitech Innovative Project)",
      "Immersion in the tech ecosystem and professional networking"
    ],
    skillsFr: ["JS/TS", "C/C++", "Architecture", "Git", "Unix"],
    skillsEn: ["JS/TS", "C/C++", "Architecture", "Git", "Unix"],
    logo: "/Portfolio/assets/logos/epitech.png"
  },
  {
    id: 'yeungnam',
    school: "Yeungnam University (Corée du Sud)",
    degreeFr: "Échange Académique d'un an",
    degreeEn: "One-Year Academic Exchange",
    periodFr: "À partir de 2026",
    periodEn: "Starting in 2026",
    descriptionFr: "Échange académique international pour développer une vision globale du monde technologique et entrepreneurial.",
    descriptionEn: "International academic exchange to develop a global vision of the technological and entrepreneurial world.",
    pointsFr: [
      "Systems Administration",
      "Business Science",
      "International Business"
    ],
    pointsEn: [
      "Systems Administration",
      "Business Science",
      "International Business"
    ],
    skillsFr: ["Administration Système", "Business Science", "International Business", "Adaptabilité"],
    skillsEn: ["System Administration", "Business Science", "International Business", "Adaptability"],
    logo: "/Portfolio/assets/logos/YU.png"
  },
  {
    id: 'saint-ex',
    school: "Lycée Saint-Exupéry (Marseille)",
    degreeFr: "Baccalauréat Général - Mention Bien",
    degreeEn: "General Baccalaureate - High Honors (Mention Bien)",
    periodFr: "2020 - 2023",
    periodEn: "2020 - 2023",
    descriptionFr: "Parcours scientifique avec une forte spécialisation en informatique et mathématiques appliquées.",
    descriptionEn: "Scientific track with a strong specialization in computer science and applied mathematics.",
    pointsFr: [
      "Spécialité NSI (Numérique et Sciences Informatiques)",
      "Spécialité Mathématiques & AMC (Anglais Monde Contemporain)",
      "Premier prix au concours local de programmation Python",
      "Délégué de classe et membre actif du CVL"
    ],
    pointsEn: [
      "Specialty in NSI (Computer Science)",
      "Specialty in Mathematics & AMC (Contemporary English World)",
      "First prize in the local Python programming competition",
      "Class representative and active member of the student union (CVL)"
    ],
    skillsFr: ["Python", "Algorithmique", "Réseaux", "Maths"],
    skillsEn: ["Python", "Algorithms", "Networks", "Maths"],
    logo: "/Portfolio/assets/logos/saint-ex.jpg"
  }
];

export const certifications: Certification[] = [
  {
    id: 'inovgames',
    title: "I-NOVGAMES 2025-2026",
    issuer: "Campus d'Excellence Industrie du futur",
    date: "2026",
    descriptionFr: "Programme de formation avancée en systèmes embarqués et microélectronique industrielle.",
    descriptionEn: "Advanced training program in embedded systems and industrial microelectronics.",
    link: "https://openbadgefactory.com/obv3/credentials/76aab2385d47cff39e93f7acf06f19e657319a78.html",
    skillsFr: ["STM32", "C Embarqué", "Microélectronique", "IoT"],
    skillsEn: ["STM32", "Embedded C", "Microelectronics", "IoT"],
    logo: "/Portfolio/assets/logos/st.jpg"
  },
  {
    id: 'mantu',
    title: "The Mantu Manager Program",
    issuer: "Mantu",
    date: "2025",
    descriptionFr: "Formation à l'acquisition d'affaires, la gestion de comptes et la stratégie de croissance.",
    descriptionEn: "Training in business acquisition, account management, and growth strategy.",
    skillsFr: ["Business Acquisition", "Pitching", "CRM", "Négociation"],
    skillsEn: ["Business Acquisition", "Pitching", "CRM", "Negotiation"],
    logo: "/Portfolio/assets/logos/mantu.jpg"
  },
  {
    id: 'hacktogone',
    title: "Hackathon Agent AI (HACKTOGONE)",
    issuer: "HACKTOGONE",
    date: "2025",
    descriptionFr: "Développement d'agents autonomes intelligents lors d'une compétition intensive de 48h.",
    descriptionEn: "Development of intelligent autonomous agents during an intensive 48-hour competition.",
    link: "https://credsverse.com/credentials/bf1ccad0-62b9-4c5a-abf1-2c8ef6adacfd",
    skillsFr: ["IA", "LLMs", "RAG", "Agentic Workflows"],
    skillsEn: ["AI", "LLMs", "RAG", "Agentic Workflows"],
    logo: "/Portfolio/assets/logos/hacktogone.jpg"
  }
];

export const volunteering: Volunteer[] = [
  {
    id: 'ambassador',
    roleFr: "Étudiant Ambassadeur",
    roleEn: "Student Ambassador",
    organization: "Epitech",
    periodFr: "2023 - Aujourd'hui",
    periodEn: "2023 - Present",
    descriptionFr: "Représentation de l'école et accompagnement des futurs étudiants dans leur découverte de l'informatique.",
    descriptionEn: "Representing the school and supporting prospective students in discovering computer science.",
    pointsFr: [
      "Animation d'ateliers découverte (Coding Club) pour collégiens et lycéens",
      "Présence sur les salons étudiants et journées portes ouvertes",
      "Accompagnement et tutorat de nouveaux arrivants lors des piscines",
      "Organisation d'événements communautaires et tech talks"
    ],
    pointsEn: [
      "Hosting discovery workshops (Coding Club) for middle and high school students",
      "Representing the school at student fairs and open houses",
      "Supporting and tutoring new arrivals during bootcamps (Piscinces)",
      "Organizing community events and tech talks"
    ],
    logo: "/Portfolio/assets/logos/epitech.png"
  },
  {
    id: 'article1',
    roleFr: "Bénévole Étudiant",
    roleEn: "Student Volunteer",
    organization: "Article 1",
    periodFr: "2024 - 2025",
    periodEn: "2024 - 2025",
    descriptionFr: "Accompagnement de lycéens issus de milieux modestes pour favoriser l'égalité des chances.",
    descriptionEn: "Supporting high schoolers from low-income backgrounds to promote equal opportunities.",
    pointsFr: [
      "Partage d'expérience sur le parcours en école d'informatique",
      "Aide à l'orientation et à la préparation des dossiers de candidature",
      "Animation de sessions d'ateliers 'Inspirer' en milieu scolaire"
    ],
    pointsEn: [
      "Sharing experience about the computer science curriculum",
      "Assisting with academic orientation and application files preparation",
      "Facilitating 'Inspirer' workshop sessions in schools"
    ],
    logo: "/Portfolio/assets/logos/a1.png"
  }
];
