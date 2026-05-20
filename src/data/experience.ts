export interface Experience {
  id: string;
  roleFr: string;
  roleEn: string;
  company: string;
  typeFr: string;
  typeEn: string;
  periodFr: string;
  periodEn: string;
  location: string;
  descriptionFr: string;
  descriptionEn: string;
  pointsFr: string[];
  pointsEn: string[];
  achievementsFr?: string[];
  achievementsEn?: string[];
  skillsFr?: string[];
  skillsEn?: string[];
  logo?: string;
}

export const experiences: Experience[] = [
  {
    id: 'taker',
    roleFr: "Chargé d'affaires",
    roleEn: "Business Developer & Project Manager",
    company: "Junior Conseil Taker",
    typeFr: "CDD / Mission",
    typeEn: "Contract / Project",
    periodFr: "déc. 2025 - aujourd'hui",
    periodEn: "Dec. 2025 - Present",
    location: "Marseille",
    logo: "/Portfolio/assets/logos/taker.jpg",
    descriptionFr: "Accompagnement d'entreprises dans leurs projets digitaux, de l'analyse des besoins à la gestion de bout en bout.",
    descriptionEn: "Assisting companies with their digital projects, from requirements analysis to end-to-end management.",
    pointsFr: [
      "Analyse des besoins et construction de solutions sur mesure",
      "Pilotage des projets de A à Z",
      "Mobilisation des compétences des étudiants d'Epitech"
    ],
    pointsEn: [
      "Requirements analysis and building customized solutions",
      "Managing projects from initiation to delivery",
      "Leveraging the skills and talents of Epitech students"
    ],
    skillsFr: ["Gestion de projet", "Analyse de besoins", "Relation client"],
    skillsEn: ["Project Management", "Requirements Analysis", "Client Relations"]
  },
  {
    id: 'es-digital',
    roleFr: "Assistant SEO",
    roleEn: "SEO Assistant",
    company: "ES Digital Solutions",
    typeFr: "Stage",
    typeEn: "Internship",
    periodFr: "sept. 2025 - févr. 2026",
    periodEn: "Sept. 2025 - Feb. 2026",
    location: "Marseille",
    descriptionFr: "Accompagnement des entreprises dans leur stratégie de référencement naturel.",
    descriptionEn: "Assisting companies with their search engine optimization strategies.",
    pointsFr: [
      "Optimisation technique des sites vitrines",
      "Amélioration du SEO local (Google My Business)",
      "Analyse de données et recommandations stratégiques"
    ],
    pointsEn: [
      "Technical optimization of showcase websites",
      "Improving local SEO (Google My Business)",
      "Data analysis and strategic recommendations"
    ],
    skillsFr: ["SEO technique", "SEO local", "Analyse de données"],
    skillsEn: ["Technical SEO", "Local SEO", "Data Analysis"]
  },
  {
    id: 'gdg',
    roleFr: "Développeur",
    roleEn: "Developer",
    company: "GDG Aix-Marseille",
    typeFr: "Bénévolat / Communauté",
    typeEn: "Volunteering / Community",
    periodFr: "2024 - aujourd'hui",
    periodEn: "2024 - Present",
    location: "Aix-Marseille",
    logo: "/Portfolio/assets/logos/gdg.png",
    descriptionFr: "Google Developer Group (GDG) Aix-Marseille : Contribution à des initiatives communautaires et projets collaboratifs.",
    descriptionEn: "Google Developer Group (GDG) Aix-Marseille: Contribution to community initiatives and collaborative projects.",
    pointsFr: [
      "Participation aux événements techniques",
      "Contribution aux projets open source et collaboratifs",
      "Échange technique autour des technologies Google"
    ],
    pointsEn: [
      "Participation in technical events",
      "Contributing to open source and collaborative projects",
      "Technical exchanges around Google technologies"
    ],
    skillsFr: ["Communauté", "Collaboration", "Tech Google"],
    skillsEn: ["Community", "Collaboration", "Google Tech"]
  },
  {
    id: 'lacordaire',
    roleFr: "Professeur d’informatique",
    roleEn: "Computer Science Teacher",
    company: "Collège / Lycée",
    typeFr: "Freelance",
    typeEn: "Freelance",
    periodFr: "sept. 2025 - aujourd'hui",
    periodEn: "Sept. 2025 - Present",
    location: "Marseille",
    logo: "/Portfolio/assets/logos/lacordaire.jpg",
    descriptionFr: "Animation d'un atelier d'informatique hebdomadaire pour des collégiens.",
    descriptionEn: "Running a weekly computer workshop for middle schoolers.",
    pointsFr: [
      "Enseignement des bases du web (HTML/CSS)",
      "Initiation à la logique algorithmique en Python",
      "Accompagnement dans la réalisation de projets pratiques"
    ],
    pointsEn: [
      "Teaching web development basics (HTML/CSS)",
      "Introduction to algorithmic logic with Python",
      "Supporting students in building practical projects"
    ],
    skillsFr: ["Pédagogie", "Python", "Bases Web", "Transmission"],
    skillsEn: ["Pedagogy", "Python", "Web Basics", "Teaching"]
  }
];
