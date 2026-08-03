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
    id: 'hec-paris-edu',
    school: "HEC Paris",
    degreeFr: "Certificat Entrepreneuriat IA",
    degreeEn: "AI Entrepreneurship Certificate",
    periodFr: "Avr. - Mai 2026",
    periodEn: "Apr. - May 2026",
    descriptionFr: "Formation intensive à l'entrepreneuriat appliqué aux technologies d'IA et création de projet.",
    descriptionEn: "Intensive training in entrepreneurship applied to AI technologies and project creation.",
    pointsFr: [
      "Modèles d'affaires pour l'intelligence artificielle",
      "Pitch investisseurs et stratégies d'incubation",
      "Conception produit Privacy by Design"
    ],
    pointsEn: [
      "AI-driven business models",
      "Investor pitching & incubation strategies",
      "Privacy by Design product strategy"
    ],
    skillsFr: ["IA", "Entrepreneuriat", "Pitch", "Business Model"],
    skillsEn: ["AI", "Entrepreneurship", "Pitching", "Business Model"],
    logo: "/Portfolio/assets/logos/hec.png"
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
