
export interface Project {
    id: string;
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
    featured?: boolean;
    longDesc?: string;
    features?: string[];
}

export const projects: Project[] = [
    {
        id: "bingeki",
        name: "Bingeki",
        desc: "Anime & Manga Tracker avec gamification (XP, classements).",
        tech: "React / Firebase / Jikan API",
        color: "#A85D8E",
        role: "Développeur",
        icon: "lucide:tv",
        image: '/Portfolio/assets/bingeki-1.png',
        images: ['/Portfolio/assets/bingeki-1.png', '/Portfolio/assets/bingeki-2.png', '/Portfolio/assets/bingeki-3.png', '/Portfolio/assets/bingeki-4.png', '/Portfolio/assets/bingeki-5.png', '/Portfolio/assets/bingeki-6.png'],
        link: "https://bingeki.web.app/fr/",
        github: "https://github.com/Moussandou/Bingeki-V2",
        featured: true,
        longDesc: "Bingeki est une plateforme moderne permettant de traquer la progression de vos animes et mangas favoris. Connectée à l'API Jikan, elle offre des statistiques en temps réel, un système de progression des utilisateurs (XP, niveaux) et des classements (leaderboard). L'interface a été intégralement pensée pour être rapide, élégante et axée sur l'engagement de l'utilisateur.",
        features: ["Consommation de l'API REST Jikan (MyAnimeList)", "Système complet de gamification (XP, Quêtes, Niveaux)", "Profils utilisateurs et leaderboards temps réel", "Mode sombre et UI premium"]
    },
    {
        id: "gameboy-sp",
        name: "GameBoy Advance SP Online",
        image: "/Portfolio/assets/gameboy-1.png",
        images: ["/Portfolio/assets/gameboy-1.png", "/Portfolio/assets/gameboy-2.png", "/Portfolio/assets/gameboy-3.png"],
        desc: "Expérience d'émulateur premium avec un OS personnalisé inspiré de la Wii et de la 3DS.",
        tech: "React 19 / TypeScript / Tailwind CSS 4 / Vite",
        color: "#3A9EFF",
        role: "Créateur & Développeur Full-Stack",
        icon: "lucide:gamepad-2",
        github: "https://github.com/Moussandou/Gameboy",
        link: "https://gameboy-moussandou.web.app/",
        featured: true,
        longDesc: "GameBoy Advance SP Online est bien plus qu'un simple émulateur. Il intègre un système d'exploitation complet (Moussandou OS) avec des effets de glassmorphism, une barre latérale raffinée et une bibliothèque de jeux classiques (Snake, Tetris, Wall Breaker). L'interface est entièrement responsive, passant d'une expérience desktop à un émulateur mobile optimisé.",
        features: ["Moussandou OS : Desktop environment avec glassmorphism", "Bibliothèque de jeux arcade classiques intégrée", "Système de settings (Volume, Luminosité, Skins)", "CI/CD automatisé via GitHub Actions & Firebase Hosting"]
    },
    {
        id: "censor-box",
        name: "Censor Box",
        image: "/Portfolio/assets/censorbox-1.png",
        images: ["/Portfolio/assets/censorbox-1.png", "/Portfolio/assets/censorbox-2.png", "/Portfolio/assets/censorbox-3.png", "/Portfolio/assets/censorbox-4.png", "/Portfolio/assets/censorbox-5.png"],
        desc: "Jeu de simulation de terminal de renseignement rétro-futuriste avec une esthétique \"Top Secret\".",
        tech: "React 19 / TypeScript / Vite",
        color: "#E8D9C5",
        role: "Créateur & Développeur Full-Stack",
        icon: "lucide:shield-alert",
        github: "https://github.com/Moussandou/Censor-Box",
        link: "https://censor-box-moussandou.web.app/",
        featured: true,
        longDesc: "Censor Box est une expérience immersive où vous incarnez un agent chargé de censurer des documents confidentiels. Le jeu mélange rapidité et précision avec une interface CRT rétro, des effets de scanlines et un paysage sonore suspensif. Le défi consiste à classifier les mots par taille pour éviter les fuites d'information.",
        features: ["Interface Rétro Immersive (Effet CRT, Scanlines)", "Gameplay basé sur la rapidité et la classification de texte", "Système de rapports de mission et niveaux de difficulté", "Contrôles clavier réalistes et interface responsive"]
    },
    {
        id: "magichand",
        name: "MagicHand",
        image: "/Portfolio/assets/magichand-banner.jpg",
        desc: "Moteur AR cybernétique haute performance pour la reconnaissance gestuelle en temps réel.",
        tech: "Next.js / MediaPipe / Zustand / Tailwind CSS 4",
        color: "#00D1FF",
        role: "Créateur & Développeur Full-Stack",
        icon: "lucide:zap",
        github: "https://github.com/Moussandou/MagicHand",
        link: "https://jarvishand-web-ar.web.app/",
        featured: true,
        longDesc: "MagicHand est un moteur de Réalité Augmentée web conçu pour la reconnaissance précise des mains et l'overlay d'effets visuels. Propulsé par MediaPipe, il permet de déclencher des 'capacités cybernétiques' (boucliers, rayons thermiques) via des gestes naturels. L'architecture est modulaire, permettant d'ajouter facilement de nouvelles techniques et effets visuels.",
        features: ["Reconnaissance gestuelle de précision via MediaPipe Vision", "Système de plugins modulaires pour nouvelles capacités", "Pipeline de rendu canvas optimisé pour les effets FX", "Interface HUD immersive et responsive"]
    },
    {
        id: "scrappi",
        name: "Scrappi",
        image: "/Portfolio/assets/scrappi-1.png",
        images: ["/Portfolio/assets/scrappi-1.png", "/Portfolio/assets/scrappi-2.png", "/Portfolio/assets/scrappi-3.png"],
        desc: "Application moderne et artistique de création de scrapbooks numériques avec une esthétique premium.",
        tech: "Next.js 15 / React 19 / Tailwind CSS / Konva.js / Firebase",
        color: "#4A6741",
        role: "Créateur & Développeur Full-Stack",
        icon: "lucide:palette",
        github: "https://github.com/Moussandou/Scrappi",
        link: "https://scrappi-app.web.app/",
        featured: true,
        longDesc: "Scrappi est une application de création de carnets de collages (scrapbooks) numériques, conçue pour offrir une expérience tactile et artistique. Utilisant Konva.js pour le rendu du canvas, elle permet de manipuler images, textes et stickers avec fluidité. L'esthétique est basée sur des textures de papier et des ombres douces pour un rendu premium.",
        features: ["Éditeur de Canvas Artistique (Drag & Drop, Dessin, Texte)", "Gestion Multi-Support : Cloud (Firebase) et stockage local", "Esthétique Premium avec textures et typographie soignée", "Recherche d'images intégrée via l'API Pixabay"]
    },
    {
        id: "gdg-discord-bot",
        name: "GDG Discord Bot",
        image: "/Portfolio/assets/gdg-bot-1.png",
        images: ["/Portfolio/assets/gdg-bot-1.png", "/Portfolio/assets/gdg-bot-2.png", "/Portfolio/assets/gdg-bot-3.png", "/Portfolio/assets/gdg-bot-4.png", "/Portfolio/assets/gdg-bot-5.png"],
        desc: "Bot Discord de veille technologique automatisée avec l'IA pour le GDG Marseille.",
        tech: "Node.js / Discord.js / Gemini AI / SQLite",
        color: "#4285F4",
        role: "Créateur & Développeur",
        icon: "lucide:bot",
        github: "https://github.com/Moussandou/GDG-Discord-Bot",
        featured: true,
        longDesc: "Bot Discord de veille technologique automatisée conçu pour le Google Developer Group Marseille. Il scanne chaque jour de multiples sources RSS (Google Developpers, Hacker News, etc.), génère des résumés en français via Google Gemini AI et les publie dans des salons thématiques. L'architecture backend comprend une base SQLite locale pour la déduplication des articles, des jobs de scraping planifiés (cron), ainsi que des commandes slash natives pour l'administration et l'interaction des membres.",
        features: ["Scraping automatique sur 12+ sources RSS", "Génération de résumés IA avec points clés via l'API Gemini", "Publication planifiée et déduplication via SQLite", "Création automatique de fils de discussion et commandes slash interactives"]
    },
    {
        id: "spritelab",
        name: "SpriteLab",
        desc: "Outil de Gestion Spritesheet. Découper, animer et organiser des spritesheets.",
        tech: "React 18 / TypeScript / Vite",
        color: "#8A2BE2",
        role: "Creator & Full-Stack Developer",
        icon: "lucide:layers",
        link: "https://moussandou.github.io/SpriteLab/",
        github: "https://github.com/Moussandou/SpriteLab",
        image: '/Portfolio/assets/spritelab-logo.png',
        images: ['/Portfolio/assets/spritelab-1.png', '/Portfolio/assets/spritelab-2.png', '/Portfolio/assets/spritelab-3.png', '/Portfolio/assets/spritelab-4.png'],
        featured: true,
        longDesc: "SpriteLab est une solution open-source conçue pour simplifier le flux de travail des développeurs de jeux 2D. Cette application permet de découper, animer, et gérer facilement des feuilles de sprites complètes. J'ai conçu cette plateforme pour répondre à mes propres besoins de développement de jeu, et l'ai rendue accessible à tous avec une interface utilisateur fluide, réactive et intuitive.",
        features: ["Découpage automatique de sprites", "Création et prévisualisation d'animations fluides", "Exportation sous différents formats standards", "Sauvegarde de session locale et interface drag & drop"]
    },
    {
        id: "blentertuto",
        name: "BlenderTuto",
        desc: "Plateforme d'apprentissage interactive pour l'animation 3D.",
        tech: "React 18 / Vite / Firebase",
        color: "#E87D0D",
        role: "Full-Stack Creator",
        icon: "lucide:box",
        image: '/Portfolio/assets/blender-tuto-1.png',
        images: ['/Portfolio/assets/blender-tuto-1.png', '/Portfolio/assets/blender-tuto-2.png', '/Portfolio/assets/blender-tuto-3.png', '/Portfolio/assets/blender-tuto-4.png', '/Portfolio/assets/blender-tuto-5.png', '/Portfolio/assets/blender-tuto-6.png'],
        link: "https://blender-tuto-site-34489.web.app/",
        featured: true,
        longDesc: "BlenderTuto est une toute nouvelle interface dédiée à l'apprentissage interactif de la modélisation et de l'animation 3D sur Blender. La plateforme réunit vidéos, astuces, raccourcis et quiz pour offrir un apprentissage ludique et progressif aux étudiants.",
        features: ["Lecteur vidéo personnalisé intégré", "Système d'authentification et suivi de la progression", "Base de données NoSQL via Firebase pour les cours", "Design responsive orienté mobile-first"]
    },
    {
        id: "bambubuddy",
        name: "Bambu Buddy",
        desc: "Gestion d'impression 3D - Suivi de filaments et calcul de coûts.",
        tech: "React / TypeScript / Tauri",
        color: "#5DADE2",
        role: "Full-Stack Developer & Creator",
        icon: "lucide:printer",
        image: '/Portfolio/assets/bambu-buddy-1.png',
        images: ['/Portfolio/assets/bambu-buddy-1.png', '/Portfolio/assets/bambu-buddy-2.png', '/Portfolio/assets/bambu-buddy-3.png'],
        link: "https://bambu-buddy.web.app",
        github: "https://github.com/moussandou/bambu-buddy",
        featured: true,
        longDesc: "Bambu Buddy est un projet d'outil de bureau et web permettant le suivi, l'estimation de durée et de coûts liés à l'impression 3D. Idéal pour les makers qui cherchent à gérer leur stock de filaments de manière précise.",
        features: ["Application multi-plateforme via Tauri", "Calculateurs de coûts personnalisables et gestion des bobines", "Tableaux de bord des durées d'impression et statistiques"]
    },
    {
        id: "rtype",
        name: "R-Type",
        desc: "Jeu arcade multijoueur géré par un serveur C++.",
        tech: "C++ SFML",
        color: "#85C1E9",
        role: "Développeur Graphique SFML",
        icon: "lucide:gamepad-2",
        video: '/Portfolio/assets/rtype.mp4',
        featured: false,
        longDesc: "R-Type est un clone multijoueur du célèbre jeu d'arcade, entièrement développé en C++ avec l'architecture logicielle ECS (Entity-Component-System). Le projet met l'accent sur un protocole réseau performant, permettant à plusieurs joueurs de s'affronter simultanément sans latence perceptible.",
        features: ["Architecture réseau client-serveur propriétaire UDP", "Motel de conception ECS complet conçu from scratch", "Rendu graphique optimisé avec la SFML en C++", "Gestion avancée de l'intelligence artificielle ennemie"]
    },
    {
        id: "jeb",
        name: "JEB",
        desc: "Plateforme Incubateur - Dashboard admin et intégration API.",
        tech: "React",
        color: "#5DADE2",
        role: "Développeur Frontend",
        icon: "lucide:rocket",
        image: '/Portfolio/assets/jeb.png',
        featured: false,
        longDesc: "Participation au développement front-end d'un tableau de bord de gestion pour un incubateur. Cette plateforme permet d'interagir facilement avec l'API interne afin d'administrer les inscriptions, événements et les startups hébergées.",
        features: ["Implémentation de tableaux de données dynamiques", "Intégration et sécurisation via des requêtes API REST (JWT)", "Architecture de code fortement modulaire sous React"]
    },
    {
        id: "mooc-autonomie",
        name: "Mooc Autonomie",
        desc: "Plateforme d'apprentissage pour l'autonomie numérique.",
        tech: "WordPress",
        color: "#85C1E9",
        role: "Développeur Web",
        link: "https://autonomie-numerique.fr",
        icon: "lucide:globe",
        image: '/Portfolio/assets/icom1.png',
        images: ['/Portfolio/assets/icom1.png', '/Portfolio/assets/icom2.png', '/Portfolio/assets/icom3.png'],
        featured: false,
        longDesc: "Mooc Autonomie est une formation en ligne asynchrone pour l'apprentissage du numérique par des publics éloignés ou en insertion, élaborée pour garantir un fonctionnement hors-ligne, fluide et accessible à toutes et tous.",
        features: ["Conception et structuration CMS via WordPress", "Optimisation SEO et de l'accessibilité", "Déploiement, maintenance et sécurisation du serveur web"]
    }
];
