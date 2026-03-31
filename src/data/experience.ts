export interface Experience {
  id: string;
  role: string;
  company: string;
  type: string;
  period: string;
  location: string;
  description: string;
  points: string[];
  achievements?: string[];
  skills?: string[];
  logo?: string;
}

export const experiences: Experience[] = [
  {
    id: 'taker',
    role: "Chargé d'affaires",
    company: "Junior Conseil Taker",
    type: "CDD / Mission",
    period: "déc. 2025 - aujourd'hui",
    location: "Marseille",
    logo: "/Portfolio/assets/logos/taker.jpg",
    description: "Accompagnement d'entreprises dans leurs projets digitaux, de l'analyse des besoins à la gestion de bout en bout.",
    points: [
      "Analyse des besoins et construction de solutions sur mesure",
      "Pilotage des projets de A à Z",
      "Mobilisation des compétences des étudiants d'Epitech"
    ],
    skills: ["Gestion de projet", "Analyse de besoins", "Relation client"]
  },
  {
    id: 'es-digital',
    role: "Assistant SEO",
    company: "ES Digital Solutions",
    type: "Stage",
    period: "sept. 2025 - févr. 2026",
    location: "Marseille",
    description: "Accompagnement des entreprises dans leur stratégie de référencement naturel.",
    points: [
      "Optimisation technique des sites vitrines",
      "Amélioration du SEO local (Google My Business)",
      "Analyse de données et recommandations stratégiques"
    ],
    skills: ["SEO technique", "SEO local", "Analyse de données"]
  },
  {
    id: 'gdg',
    role: "Développeur",
    company: "GDG Aix-Marseille",
    type: "Bénévolat / Communauté",
    period: "2024 - aujourd'hui",
    location: "Aix-Marseille",
    logo: "/Portfolio/assets/logos/gdg.png",
    description: "Google Developer Group (GDG) Aix-Marseille : Contribution à des initiatives communautaires et projets collaboratifs.",
    points: [
      "Participation aux événements techniques",
      "Contribution aux projets open source et collaboratifs",
      "Échange technique autour des technologies Google"
    ],
    skills: ["Communauté", "Collaboration", "Tech Google"]
  },
  {
    id: 'lacordaire',
    role: "Professeur d’informatique",
    company: "Collège / Lycée",
    type: "Freelance",
    period: "sept. 2025 - aujourd'hui",
    location: "Marseille",
    logo: "/Portfolio/assets/logos/lacordaire.jpg",
    description: "Animation d'un atelier d'informatique hebdomadaire pour des collégiens.",
    points: [
      "Enseignement des bases du web (HTML/CSS)",
      "Initiation à la logique algorithmique en Python",
      "Accompagnement dans la réalisation de projets pratiques"
    ],
    skills: ["Pédagogie", "Python", "Bases Web", "Transmission"]
  }
];
