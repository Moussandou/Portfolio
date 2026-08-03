export interface Award {
  id: string;
  type: 'award' | 'certification';
  titleFr: string;
  titleEn: string;
  issuer: string;
  date: string;
  descFr: string;
  descEn: string;
  link?: string;
  logo?: string;
  organizationId?: string;
}

export const awards: Award[] = [
  {
    id: 'prix-meilleure-etude',
    type: 'award',
    titleFr: "Prix de la Meilleure Étude en Ingénierie",
    titleEn: "Best Engineering Project Award",
    issuer: "CNJE × ALTEN",
    date: "2026",
    descFr: "Distinction nationale décernée par la Confédération Nationale des Junior-Entreprises, évaluée par un jury d'experts industriels et académiques.",
    descEn: "National award from the French Confederation of Junior Enterprises, judged by a panel of industry and academic experts.",
    logo: '/Portfolio/assets/logos/taker.jpg',
    organizationId: 'taker',
  },
  {
    id: 'design-prize-inovgames',
    type: 'award',
    titleFr: "Design Prize I-NOVGAMES — MedBuddy",
    titleEn: "I-NOVGAMES Design Prize — MedBuddy",
    issuer: "I-NOVGAMES / STMicroelectronics",
    date: "avr. 2026",
    descFr: "Récompense l'ergonomie du hub, la qualité des interfaces et l'expérience utilisateur d'une solution d'aide aux infirmiers à domicile.",
    descEn: "Awarded for the hub's ergonomics, interface quality and overall user experience of a solution supporting home-care nurses.",
    logo: '/Portfolio/assets/logos/st.png',
    organizationId: 'epitech',
  },
  {
    id: 'taker-certif-interne',
    type: 'award',
    titleFr: "Certification interne — 195/215, meilleur score de la promotion",
    titleEn: "Internal certification — 195/215, top score of the cohort",
    issuer: "Junior Conseil Taker",
    date: "2026",
    descFr: "Meilleur score de la promotion à l'issue du programme de formation intensif de 3 semaines.",
    descEn: "Top score of the cohort at the end of the 3-week intensive training program.",
    logo: '/Portfolio/assets/logos/taker.jpg',
    organizationId: 'taker',
  },
  {
    id: 'taker-top30',
    type: 'award',
    titleFr: "Entrée dans le Top 30 des Junior-Entreprises de France",
    titleEn: "Entry into France's Top 30 Junior Enterprises",
    issuer: "CNJE",
    date: "2026",
    descFr: "Reconnaissance collective obtenue lors du Congrès Régional de Printemps Île-de-France.",
    descEn: "Collective recognition earned at the Île-de-France Spring Regional Congress.",
    logo: '/Portfolio/assets/logos/taker.jpg',
    organizationId: 'taker',
  },
  {
    id: 'prix-python-lycee',
    type: 'award',
    titleFr: "1ᵉʳ prix au concours local de programmation Python",
    titleEn: "1st prize in the local Python programming competition",
    issuer: "Lycée Saint-Exupéry",
    date: "2023",
    descFr: "Premier prix du concours de programmation Python organisé au niveau local.",
    descEn: "First prize in the locally organised Python programming competition.",
    logo: '/Portfolio/assets/logos/saint-ex.jpg',
    organizationId: 'saint-ex',
  },
  {
    id: 'hec-entrepreneuriat',
    type: 'certification',
    titleFr: "Certificat AI Entrepreneurship (10 ECTS)",
    titleEn: "AI Entrepreneurship Certificate (10 ECTS)",
    issuer: "HEC Paris",
    date: "mai 2026",
    descFr: "Programme intensif de 6 semaines sur le campus HEC Paris : de l'identification du problème au pitch devant jury.",
    descEn: "Six-week intensive program on the HEC Paris campus: from problem identification to the final pitch before a jury.",
    logo: '/Portfolio/assets/logos/hec.png',
    organizationId: 'hec',
  },
  {
    id: 'inovgames',
    type: 'certification',
    titleFr: "I-NOVGAMES 2025-2026",
    titleEn: "I-NOVGAMES 2025-2026",
    issuer: "Campus d'Excellence Industrie du futur",
    date: "2026",
    descFr: "Programme de formation avancée en systèmes embarqués et microélectronique industrielle.",
    descEn: "Advanced training program in embedded systems and industrial microelectronics.",
    link: "https://openbadgefactory.com/obv3/credentials/76aab2385d47cff39e93f7acf06f19e657319a78.html",
    logo: '/Portfolio/assets/logos/st.png',
    organizationId: 'epitech',
  },
  {
    id: 'mantu',
    type: 'certification',
    titleFr: "The Mantu Manager Program",
    titleEn: "The Mantu Manager Program",
    issuer: "Mantu",
    date: "2025",
    descFr: "Formation à l'acquisition d'affaires, la gestion de comptes et la stratégie de croissance.",
    descEn: "Training in business acquisition, account management and growth strategy.",
    logo: '/Portfolio/assets/logos/mantu.jpg',
  },
  {
    id: 'hacktogone',
    type: 'certification',
    titleFr: "Hackathon Agent AI",
    titleEn: "AI Agent Hackathon",
    issuer: "HACKTOGONE",
    date: "2025",
    descFr: "Développement d'agents autonomes intelligents lors d'une compétition intensive de 48 h.",
    descEn: "Building intelligent autonomous agents during an intensive 48-hour competition.",
    link: "https://credsverse.com/credentials/bf1ccad0-62b9-4c5a-abf1-2c8ef6adacfd",
    logo: '/Portfolio/assets/logos/hacktogone.jpg',
  },
  {
    id: 'cambridge-b2',
    type: 'certification',
    titleFr: "Anglais B2",
    titleEn: "English B2",
    issuer: "Cambridge Assessment English",
    date: "2023",
    descFr: "Certification officielle en langue anglaise, niveau B2 du cadre européen (CECRL).",
    descEn: "Official English language certification, level B2 of the European framework (CEFR).",
    logo: '/Portfolio/assets/logos/cambridge.png',
  },
];

export function getAwardsByIds(ids: string[]): Award[] {
  return ids
    .map((id) => awards.find((a) => a.id === id))
    .filter((a): a is Award => a !== undefined);
}
