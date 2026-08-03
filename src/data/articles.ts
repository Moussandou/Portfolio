export interface Article {
  id: string;
  type: 'press' | 'video';
  source: string;
  date: string;
  titleFr: string;
  titleEn: string;
  excerptFr: string;
  excerptEn: string;
  url: string;
  image?: string;
  organizationId?: string;
}

export const articles: Article[] = [
  {
    id: 'inovgames-epitech',
    type: 'press',
    source: 'epitech.eu',
    date: '9 avr. 2026',
    titleFr: "Epitech lauréat I-NOVGAMES : un projet étudiant innovant au service de la santé",
    titleEn: "Epitech wins I-NOVGAMES: an innovative student project serving healthcare",
    excerptFr: "L'équipe Epitech Marseille remporte le Design Prize avec MedBuddy, un hub intelligent qui centralise les données d'objets connectés pour libérer les infirmiers à domicile de la collecte manuelle.",
    excerptEn: "The Epitech Marseille team wins the Design Prize with MedBuddy, a smart hub centralising connected-device data to free home-care nurses from manual data collection.",
    url: "https://www.epitech.eu/2026/04/09/epitech-laureat-i-novgames-projet-etudiant-innovant-sante/",
    image: "/Portfolio/assets/bambu-buddy-1.png",
    organizationId: 'epitech',
  },
  {
    id: 'hec-epitech',
    type: 'press',
    source: 'epitech.eu',
    date: '3 mai 2026',
    titleFr: "AI Entrepreneurship Certificate — HEC Paris × Epitech",
    titleEn: "AI Entrepreneurship Certificate — HEC Paris × Epitech",
    excerptFr: "Six semaines sur le campus HEC Paris en équipe pluridisciplinaire tech, business et design, pour construire un projet entrepreneurial augmenté par l'IA jusqu'au pitch final.",
    excerptEn: "Six weeks on the HEC Paris campus in a cross-disciplinary tech, business and design team, building an AI-powered venture all the way to the final pitch.",
    url: "https://www.epitech.eu/2026/05/03/ai-entrepreneurship-certification-hec-epitech/",
    image: "/Portfolio/assets/pip-hec-1.png",
    organizationId: 'hec',
  },
  {
    id: 'youtube-pep',
    type: 'video',
    source: 'YouTube',
    date: '2026',
    titleFr: "Projet Pep — présentation vidéo",
    titleEn: "Pep project — video presentation",
    excerptFr: "Présentation du projet Pep, construit en équipe pluridisciplinaire durant le certificat AI Entrepreneurship de HEC Paris.",
    excerptEn: "Presentation of the Pep project, built by a cross-disciplinary team during the HEC Paris AI Entrepreneurship certificate.",
    url: "https://www.youtube.com/watch?v=UlH2Y2J7o7I",
    image: "/Portfolio/assets/pip-hec-2.png",
    organizationId: 'hec',
  },
];

export function getArticlesByIds(ids: string[]): Article[] {
  return ids
    .map((id) => articles.find((a) => a.id === id))
    .filter((a): a is Article => a !== undefined);
}
