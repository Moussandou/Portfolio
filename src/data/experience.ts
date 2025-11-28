export interface Experience {
    role: string;
    company: string;
    period: string;
    description: string;
    icon: string;
    color: string;
}

export const experiences: Experience[] = [
    {
        role: "Assistant SEO",
        company: "ES DIGITAL SOLUTIONS",
        period: "Sept 2025 - Présent",
        description: "SEO technique, analyse de données, IA pour contenu",
        icon: "seo",
        color: "#5DADE2"
    },
    {
        role: "Professeur Informatique",
        company: "École Lacordaire",
        period: "Sept 2025 - Présent",
        description: "Enseignement HTML/CSS/Python, pédagogie interactive",
        icon: "teacher",
        color: "#85C1E9"
    },
    {
        role: "Stagiaire Développeur",
        company: "ICOM'Provence",
        period: "Août - Nov 2024",
        description: "Création site WordPress, UX/UI, médiation numérique",
        icon: "wordpress",
        color: "#85C1E9"
    }
];

export const education = [
    {
        title: "Programme Grande École – Informatique",
        school: "Epitech – Marseille",
        period: "2023 - 2028",
        details: "C, C++, Shell, Systèmes, Réseaux, Web, Architecture logicielle, Git, ASM"
    },
    {
        title: "Baccalauréat Général",
        school: "Lycée Saint-Exupéry – Marseille",
        period: "2020 - 2023",
        details: "Spécialités : Numérique & Sciences Informatiques, Anglais"
    }
];
