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
    id: 'hec-entrepreneuriat',
    title: "Certificat Entrepreneuriat IA",
    issuer: "HEC Paris",
    date: "2026",
    descriptionFr: "Formation intensive à l'entrepreneuriat appliqué à l'intelligence artificielle.",
    descriptionEn: "Intensive training in entrepreneurship applied to artificial intelligence.",
    skillsFr: ["IA", "Entrepreneuriat", "Business Model", "Innovation"],
    skillsEn: ["AI", "Entrepreneurship", "Business Model", "Innovation"],
    logo: "/Portfolio/assets/logos/hec.png"
  },
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
  },
  {
    id: 'cambridge-b2',
    title: "Anglais B2",
    issuer: "Cambridge Assessment English",
    date: "2023",
    descriptionFr: "Certification officielle en langue anglaise niveau B2 du cadre européen (CECRL).",
    descriptionEn: "Official English language certification at B2 level of the European framework (CEFR).",
    skillsFr: ["Anglais", "Communication", "B2 CECRL"],
    skillsEn: ["English", "Communication", "B2 CEFR"],
    logo: "/Portfolio/assets/logos/cambridge.png"
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
    roleFr: "Mentor Bénévole",
    roleEn: "Volunteer Mentor",
    organization: "Article 1",
    periodFr: "nov. 2025",
    periodEn: "Nov. 2025",
    descriptionFr: "Accompagnement d'étudiants sur les parcours d'études supérieures lors de forums d'orientation.",
    descriptionEn: "Mentoring students on higher education pathways during orientation forums.",
    pointsFr: [
      "Accompagnement d'étudiants sur les parcours d'études supérieures",
      "Participation à des forums d'orientation"
    ],
    pointsEn: [
      "Mentoring students on higher education pathways",
      "Participation in orientation forums"
    ],
    logo: "/Portfolio/assets/logos/a1.png"
  },
  {
    id: 'olivier-bleu',
    roleFr: "Coordinateur Bénévole",
    roleEn: "Volunteer Coordinator",
    organization: "L'Olivier Bleu",
    periodFr: "janv. - févr. 2023",
    periodEn: "Jan. - Feb. 2023",
    descriptionFr: "Organisation de maraudes en soutien aux personnes en situation de précarité.",
    descriptionEn: "Organizing outreach patrols to support people in precarious situations.",
    pointsFr: [
      "Organisation de maraudes en soutien aux personnes en situation de précarité"
    ],
    pointsEn: [
      "Organizing outreach patrols to support people in precarious situations"
    ]
  }
];
