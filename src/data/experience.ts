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
    id: 'devid',
    roleFr: "Stagiaire Développement Web & Mobile",
    roleEn: "Web & Mobile Development Intern",
    company: "Dev-id",
    typeFr: "Stage",
    typeEn: "Internship",
    periodFr: "avr. 2026 - aujourd'hui",
    periodEn: "Apr. 2026 - Present",
    location: "Marseille",
    descriptionFr: "Développement d'applications mobiles en équipe agile sur des projets clients réels.",
    descriptionEn: "Mobile application development in an agile team on real client projects.",
    pointsFr: [
      "Développement d'applications mobiles avec React Native",
      "Renforcement TypeScript/JS sur des projets clients réels",
      "Travail en équipe agile"
    ],
    pointsEn: [
      "Mobile app development with React Native",
      "TypeScript/JS strengthening on real client projects",
      "Agile team collaboration"
    ],
    skillsFr: ["React Native", "TypeScript", "Agile"],
    skillsEn: ["React Native", "TypeScript", "Agile"]
  },
  {
    id: 'bingeki-founder',
    roleFr: "Fondateur & Développeur Principal",
    roleEn: "Founder & Lead Developer",
    company: "Bingeki",
    typeFr: "Projet Personnel",
    typeEn: "Personal Project",
    periodFr: "déc. 2025 - aujourd'hui",
    periodEn: "Dec. 2025 - Present",
    location: "bingeki.web.app",
    descriptionFr: "Création d'une plateforme communautaire manga/anime avec système de gamification.",
    descriptionEn: "Creating a manga/anime community platform with a gamification system.",
    pointsFr: [
      "Création de la plateforme communautaire manga/anime (React/Firebase)",
      "Bibliothèque personnelle, progression XP, badges & fonctionnalités sociales"
    ],
    pointsEn: [
      "Built the manga/anime community platform (React/Firebase)",
      "Personal library, XP progression, badges & social features"
    ],
    skillsFr: ["React", "Firebase", "JavaScript", "UX/UI"],
    skillsEn: ["React", "Firebase", "JavaScript", "UX/UI"]
  },
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
    roleFr: "Développeur Web & Spécialiste SEO",
    roleEn: "Web Developer & SEO Specialist",
    company: "ES Digital Solutions",
    typeFr: "Stage",
    typeEn: "Internship",
    periodFr: "sept. 2025 - févr. 2026",
    periodEn: "Sept. 2025 - Feb. 2026",
    location: "Marseille",
    descriptionFr: "Refonte de sites vitrines et optimisation SEO local pour des PME.",
    descriptionEn: "Redesigning showcase websites and local SEO optimization for SMEs.",
    pointsFr: [
      "Refonte de sites vitrines pour PME",
      "Optimisation de fiches Google Business pour le SEO local",
      "Analyse via Search Console, Screaming Frog, Babbar"
    ],
    pointsEn: [
      "Redesigning showcase websites for SMEs",
      "Optimizing Google Business profiles for local SEO",
      "Analysis via Search Console, Screaming Frog, Babbar"
    ],
    skillsFr: ["SEO technique", "SEO local", "Search Console", "WordPress"],
    skillsEn: ["Technical SEO", "Local SEO", "Search Console", "WordPress"]
  },
  {
    id: 'gdg',
    roleFr: "Développeur Bénévole",
    roleEn: "Volunteer Developer",
    company: "GDG Aix-Marseille",
    typeFr: "Bénévolat / Communauté",
    typeEn: "Volunteering / Community",
    periodFr: "mars 2026 - aujourd'hui",
    periodEn: "Mar. 2026 - Present",
    location: "Aix-Marseille",
    logo: "/Portfolio/assets/logos/gdg.png",
    descriptionFr: "Google Developer Group (GDG) Aix-Marseille : Contribution à des initiatives communautaires et projets collaboratifs.",
    descriptionEn: "Google Developer Group (GDG) Aix-Marseille: Contribution to community initiatives and collaborative projects.",
    pointsFr: [
      "Développement d’un Job Board pour la communauté tech locale",
      "Création d’un bot Discord relayant automatiquement les actualités Google en temps réel via API"
    ],
    pointsEn: [
      "Built a Job Board for the local tech community",
      "Created a Discord bot automatically relaying Google news in real time via API"
    ],
    skillsFr: ["Communauté", "Node.js", "Discord API", "Tech Google"],
    skillsEn: ["Community", "Node.js", "Discord API", "Google Tech"]
  },
  {
    id: 'lacordaire',
    roleFr: "Enseignant en Informatique",
    roleEn: "Computer Science Teacher",
    company: "École Lacordaire",
    typeFr: "Freelance",
    typeEn: "Freelance",
    periodFr: "sept. 2025 - févr. 2026",
    periodEn: "Sept. 2025 - Feb. 2026",
    location: "Marseille",
    logo: "/Portfolio/assets/logos/lacordaire.jpg",
    descriptionFr: "Animation d'un atelier d'informatique hebdomadaire pour des collégiens.",
    descriptionEn: "Running a weekly computer workshop for middle schoolers.",
    pointsFr: [
      "Enseignement des bases du web (HTML/CSS)",
      "Initiation à la logique algorithmique en Python",
      "Accompagnement dans la réalisation de projets pratiques",
      "Ateliers hebdomadaires pour plus de 20 élèves (6e–3e)"
    ],
    pointsEn: [
      "Teaching web development basics (HTML/CSS)",
      "Introduction to algorithmic logic with Python",
      "Supporting students in building practical projects",
      "Weekly workshops for 20+ students (grades 6–9)"
    ],
    skillsFr: ["Pédagogie", "Python", "Bases Web", "Transmission"],
    skillsEn: ["Pedagogy", "Python", "Web Basics", "Teaching"]
  },
  {
    id: 'icom',
    roleFr: "Stagiaire Développement Web",
    roleEn: "Web Development Intern",
    company: "Icom'Provence",
    typeFr: "Stage",
    typeEn: "Internship",
    periodFr: "août - nov. 2024",
    periodEn: "Aug. - Nov. 2024",
    location: "Marseille",
    descriptionFr: "Création et mise en ligne d'un site e-learning pour un public non technique.",
    descriptionEn: "Creating and deploying an e-learning website for a non-technical audience.",
    pointsFr: [
      "Création et mise en ligne d'autonomie-numerique.fr (WordPress)",
      "Intégration de contenus pédagogiques pour un public non technique"
    ],
    pointsEn: [
      "Built and deployed autonomie-numerique.fr (WordPress)",
      "Integration of educational content for a non-technical audience"
    ],
    skillsFr: ["WordPress", "SEO", "Intégration Web"],
    skillsEn: ["WordPress", "SEO", "Web Integration"]
  }
];
