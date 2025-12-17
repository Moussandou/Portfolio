
// Images & Videos
const bambuImage1 = '/Portfolio/assets/bambu-buddy-1.png';
const bambuImage2 = '/Portfolio/assets/bambu-buddy-2.png';
const bambuImage3 = '/Portfolio/assets/bambu-buddy-3.png';
const jebImage = '/Portfolio/assets/jeb.png';
const moocImage1 = '/Portfolio/assets/icom1.png';
const moocImage2 = '/Portfolio/assets/icom2.png';
const moocImage3 = '/Portfolio/assets/icom3.png';
const blenderTutoImage1 = '/Portfolio/assets/blender-tuto-1.png';
const blenderTutoImage2 = '/Portfolio/assets/blender-tuto-2.png';
const blenderTutoImage3 = '/Portfolio/assets/blender-tuto-3.png';
const blenderTutoImage4 = '/Portfolio/assets/blender-tuto-4.png';
const blenderTutoImage5 = '/Portfolio/assets/blender-tuto-5.png';
const blenderTutoImage6 = '/Portfolio/assets/blender-tuto-6.png';
const bingekiImage1 = '/Portfolio/assets/bingeki-1.png';
const bingekiImage2 = '/Portfolio/assets/bingeki-2.png';
const bingekiImage3 = '/Portfolio/assets/bingeki-3.png';
const bingekiImage4 = '/Portfolio/assets/bingeki-4.png';
const bingekiImage5 = '/Portfolio/assets/bingeki-5.png';
const bingekiImage6 = '/Portfolio/assets/bingeki-6.png';
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
        name: "Bingeki - Anime & Manga Tracker",
        desc: "Application web responsive de suivi anime/manga avec gamification (XP, classements). Catalogue temps réel via Jikan API.",
        tech: "React / Firebase / Jikan API",
        color: "#FF2D55",
        role: "Full-Stack Developer",
        icon: "react",
        images: [bingekiImage1, bingekiImage2, bingekiImage3, bingekiImage4, bingekiImage5, bingekiImage6],
        link: "https://bingeki.web.app/",
        github: "https://github.com/Moussandou/Bingeki-V2"
    },
    {
        name: "BlenderTuto - Learning Platform",
        desc: "Interactive MOOC for 3D Animation. React/Firebase/Gamification.",
        tech: "React 18 / Vite / Firebase",
        color: "#E87D0D",
        role: "Full-Stack Creator",
        icon: "react",
        images: [blenderTutoImage1, blenderTutoImage2, blenderTutoImage3, blenderTutoImage4, blenderTutoImage5, blenderTutoImage6],
        link: "https://blender-tuto-site-34489.web.app/",
        github: "https://github.com/moussandou" // Placeholder as direct repo not found, waiting for user confirmation
    },
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
