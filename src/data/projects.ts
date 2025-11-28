
// Images & Videos
const bambuImage1 = '/Portfolio/assets/bambu-buddy-1.png';
const bambuImage2 = '/Portfolio/assets/bambu-buddy-2.png';
const bambuImage3 = '/Portfolio/assets/bambu-buddy-3.png';
const jebImage = '/Portfolio/assets/jeb.png';
const moocImage1 = '/Portfolio/assets/icom1.png';
const moocImage2 = '/Portfolio/assets/icom2.png';
const moocImage3 = '/Portfolio/assets/icom3.png';
const rtypeVideo = '/Portfolio/assets/rtype.mp4';

export interface Project {
    name: string;
    desc: string;
    tech: string;
    color: string;
    role: string;
    icon: string;
    images?: string[];
    image?: string;
    video?: string;
    link?: string;
    github?: string;
}

export const projects: Project[] = [
    {
        name: "Bambu Buddy - 3D Print Manager",
        desc: "Application de gestion d'impression 3D - Suivi de filaments, calcul de coûts, statistiques de ventes. PWA + Desktop (macOS/Windows)",
        tech: "React/TypeScript/Tauri",
        color: "#5DADE2",
        role: "Full-Stack Developer & Creator",
        icon: "react",
        images: [bambuImage1, bambuImage2, bambuImage3],
        link: "https://bambu-buddy.web.app",
        github: "https://github.com/moussandou/bambu-buddy"
    },
    {
        name: "R-Type - Jeu Arcade Multijoueur",
        desc: "Jeu arcade multijoueur géré par un serveur",
        tech: "C++ SFML",
        color: "#85C1E9",
        role: "Développeur Graphique SFML",
        icon: "cpp",
        video: rtypeVideo
    },
    {
        name: "JEB - Plateforme Incubateur",
        desc: "Full-stack React, API intégration, dashboard admin",
        tech: "React",
        color: "#5DADE2",
        role: "Développeur Frontend",
        icon: "react",
        image: jebImage
    },
    {
        name: "Zappy - Jeu Réseau Multijoueur",
        desc: "Serveur TCP/IP, IA clients, protocole personnalisé",
        tech: "C++",
        color: "#85C1E9",
        role: "Développeur Réseau",
        icon: "cpp"
    },
    {
        name: "Mooc Autonomie numérique (Site Wordpress)",
        desc: "autonomie-numerique.fr - UX/UI responsive",
        tech: "WordPress",
        color: "#85C1E9",
        role: "Développeur Web",
        link: "https://autonomie-numerique.fr",
        icon: "wordpress",
        images: [moocImage1, moocImage2, moocImage3]
    },
    {
        name: "Minishell",
        desc: "Implémentation d'un shell Unix complet",
        tech: "C",
        color: "#5DADE2",
        role: "Développeur Système",
        icon: "c"
    },
    {
        name: "Epytodo",
        desc: "Gestionnaire de tâches full-stack JS/SQL",
        tech: "JavaScript",
        color: "#FFFF00",
        role: "Full-Stack Dev",
        icon: "javascript"
    }
];
