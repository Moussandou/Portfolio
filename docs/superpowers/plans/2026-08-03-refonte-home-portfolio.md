# Refonte de la home du portfolio — Plan d'implémentation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remplacer les cartes-listes génériques de la home par des cartes-organisations aux couleurs de chaque marque, regroupées en sections thématiques, et ajouter une page Recommandations alimentée par les 12 recommandations LinkedIn.

**Architecture:** Un registre de marques (`brands.ts`) expose des tokens visuels consommés en CSS custom properties par un composant `BrandCard` unique. Un fichier `organizations.ts` agrège par référence d'id les données déjà présentes dans `education.ts` / `experience.ts` / `projects.ts`, sans les dupliquer. La home devient une pile de sections titrées partageant une grille unique.

**Tech Stack:** React 18, TypeScript 5.3, Vite 5, Tailwind 3.4, react-router-dom 7 (HashRouter), lucide-react.

**Spec de référence:** `docs/superpowers/specs/2026-08-03-refonte-home-portfolio-design.md`

## Global Constraints

- **Aucun framework de test dans ce projet.** Pas de vitest, jest ni testing-library dans `package.json`. **N'en ajoutez pas** — c'est hors périmètre. La vérification de chaque tâche est : `npm run build`, puis `npm run lint`, puis un contrôle visuel via `npm run dev`.
- `npm run build` exécute `tsc --noEmit --skipLibCheck && vite build`. Toute erreur de type casse le build.
- `npm run lint` exécute `eslint . --ext ts,tsx --max-warnings 0`. **Zéro warning toléré.** En particulier : pas de `any` (`@typescript-eslint/no-explicit-any`), pas d'import inutilisé.
- Base Vite `/Portfolio/` : toute URL d'asset s'écrit `/Portfolio/assets/...` et le fichier vit dans `public/assets/...`.
- Bilinguisme : toute chaîne d'interface passe par `src/data/translations.ts`, en FR **et** EN. Les données bilingues suivent la convention existante `xxxFr` / `xxxEn`.
- Polices réellement chargées : **Fredoka** (via `.font-display`) et **Quicksand** (body). `font-outfit`, `font-inter` et `font-mono` sont déclarées dans `tailwind.config.js` mais **non chargées** — ne les utilisez pas pour du texte important.
- Palette du site : `--candy #C5A8E9`, `--grape #6D4499`, `--violet #4F2D7F`, fond de page `#F1ECF9`, texte foncé `#3B2356`.
- Contraste AA obligatoire (4,5:1) pour tout corps de texte sur fond de marque.
- Commit après chaque tâche, message en anglais, préfixe conventionnel (`feat:`, `refactor:`, `style:`, `docs:`).

## Prérequis avant de démarrer

Le dépôt contient du travail non commité sur `src/components/common/ProjectCard.tsx`, `src/data/projects.ts` et `src/pages/ProjectList.tsx`, plus des assets non suivis dans `public/assets/`. **Committez-le avant la Tâche 1** — ce plan s'appuie dessus.

```bash
git add -A && git commit -m "feat: add project filters, five new projects and their assets"
```

## Structure des fichiers

**Créés — données**

| Fichier | Responsabilité |
|---|---|
| `src/data/brands.ts` | Tokens visuels par marque. Aucune logique. |
| `src/data/awards.ts` | Prix et certifications, source unique. |
| `src/data/articles.ts` | Articles de presse et vidéos. |
| `src/data/recommendations.ts` | Les 12 recommandations LinkedIn. |
| `src/data/organizations.ts` | Agrégation par référence d'id. Ne duplique aucune donnée. |

**Créés — rendu**

| Fichier | Responsabilité |
|---|---|
| `src/components/brand/brandStyle.ts` | Convertit un `Brand` en `React.CSSProperties` de custom properties. |
| `src/components/brand/BrandAvatar.tsx` | Logo de marque, ou pastille typographique si absent. |
| `src/components/brand/BrandCard.tsx` | Carte-organisation générique pilotée par tokens. |
| `src/components/sections/Section.tsx` | Titre + sous-titre + rythme vertical, délègue la grille à `BentoGrid`. |
| `src/components/sections/JourneySection.tsx` | Section Parcours. |
| `src/components/sections/FeaturedProjectsSection.tsx` | Section Projets phares. |
| `src/components/sections/AwardsSection.tsx` | Section Prix & certifications. |
| `src/components/sections/ArticlesSection.tsx` | Section Articles. |
| `src/components/sections/RecommendationsPreview.tsx` | Aperçu 3 recos + CTA. |
| `src/components/common/RecommendationCard.tsx` | Carte reco, partagée home / page dédiée. |
| `src/pages/Home.tsx` | La home, extraite de `App.tsx`. |
| `src/pages/Recommendations.tsx` | Page `/recommendations`. |

**Modifiés :** `App.tsx`, `Header.tsx`, `BentoGrid.tsx`, `ProjectCard.tsx`, `education.ts`, `translations.ts`, `globals.css`.

**Supprimés :** `EducationCard.tsx`, `ExperienceCard.tsx`, `VolunteerCard.tsx` — uniquement en Tâche 10, une fois leur remplaçante en place.

---

## Phase 1 — Socle données

Aucun rendu ne change dans cette phase. Le site doit rester strictement identique à l'écran.

### Task 1: Registre de marques

**Files:**
- Create: `src/data/brands.ts`

**Interfaces:**
- Produces: `interface Brand`, `export const brands: Record<string, Brand>`, `export function getBrand(id: string): Brand` — retourne la marque `neutral` si l'id est inconnu, jamais `undefined`.

- [ ] **Step 1: Créer le fichier**

```ts
export interface Brand {
  id: string;
  name: string;
  logo?: string;
  bg: string;
  fg: string;
  muted: string;
  accent: string;
  accentAlt?: string;
  radius: string;
  border: string;
  shadow: string;
  fontKey: 'display' | 'serif' | 'mono';
  texture: 'grid' | 'dots' | 'none';
}

export const brands: Record<string, Brand> = {
  epitech: {
    id: 'epitech',
    name: 'Epitech',
    logo: '/Portfolio/assets/logos/epitech.png',
    bg: '#0B1E2D',
    fg: '#FFFFFF',
    muted: 'rgba(255,255,255,0.65)',
    accent: '#0091CE',
    radius: '20px',
    border: 'none',
    shadow: '0 12px 32px rgba(0,145,206,0.22)',
    fontKey: 'display',
    texture: 'grid',
  },
  hec: {
    id: 'hec',
    name: 'HEC Paris',
    logo: '/Portfolio/assets/logos/hec.png',
    bg: '#06427C',
    fg: '#FFFFFF',
    muted: 'rgba(255,255,255,0.70)',
    accent: '#C8A45C',
    radius: '28px',
    border: '1px solid rgba(200,164,92,0.4)',
    shadow: '0 12px 32px rgba(6,66,124,0.25)',
    fontKey: 'serif',
    texture: 'none',
  },
  yeungnam: {
    id: 'yeungnam',
    name: 'Yeungnam University',
    logo: '/Portfolio/assets/logos/YU.png',
    bg: '#05468C',
    fg: '#FFFFFF',
    muted: 'rgba(255,255,255,0.70)',
    accent: '#E8442E',
    radius: '24px',
    border: 'none',
    shadow: '0 12px 32px rgba(5,70,140,0.25)',
    fontKey: 'display',
    texture: 'none',
  },
  taker: {
    id: 'taker',
    name: 'Junior Conseil Taker',
    logo: '/Portfolio/assets/logos/taker.jpg',
    bg: '#10243D',
    fg: '#FFFFFF',
    muted: 'rgba(255,255,255,0.65)',
    accent: '#5BC8E0',
    radius: '16px',
    border: 'none',
    shadow: '0 12px 32px rgba(16,36,61,0.28)',
    fontKey: 'display',
    texture: 'dots',
  },
  bingeki: {
    id: 'bingeki',
    name: 'Bingeki',
    bg: '#F5F0E6',
    fg: '#111111',
    muted: 'rgba(17,17,17,0.65)',
    accent: '#FF2E88',
    accentAlt: '#00D9E0',
    radius: '0px',
    border: '4px solid #000000',
    shadow: '8px 8px 0 #000000',
    fontKey: 'display',
    texture: 'none',
  },
  gdg: {
    id: 'gdg',
    name: 'GDG Aix-Marseille',
    logo: '/Portfolio/assets/logos/gdg.png',
    bg: '#FFFFFF',
    fg: '#202124',
    muted: 'rgba(32,33,36,0.60)',
    accent: '#4285F4',
    accentAlt: '#EA4335',
    radius: '24px',
    border: '2px solid #202124',
    shadow: '0 12px 32px rgba(32,33,36,0.14)',
    fontKey: 'display',
    texture: 'none',
  },
  devid: {
    id: 'devid',
    name: 'Dev-id',
    bg: '#0E2A33',
    fg: '#FFFFFF',
    muted: 'rgba(255,255,255,0.65)',
    accent: '#3ECFB2',
    radius: '20px',
    border: 'none',
    shadow: '0 12px 32px rgba(14,42,51,0.26)',
    fontKey: 'display',
    texture: 'none',
  },
  neutral: {
    id: 'neutral',
    name: '',
    bg: '#E9DEF8',
    fg: '#3B2356',
    muted: 'rgba(59,35,86,0.65)',
    accent: '#6D4499',
    radius: '22px',
    border: 'none',
    shadow: '0 8px 24px rgba(109,68,153,0.14)',
    fontKey: 'display',
    texture: 'none',
  },
};

export function getBrand(id: string): Brand {
  return brands[id] ?? brands.neutral;
}
```

- [ ] **Step 2: Vérifier la compilation**

Run: `npm run build`
Expected: succès. Le fichier n'est encore importé nulle part — c'est normal, `tsc --noEmit` ne se plaint pas d'un module non consommé.

- [ ] **Step 3: Vérifier le lint**

Run: `npm run lint`
Expected: 0 erreur, 0 warning.

- [ ] **Step 4: Commit**

```bash
git add src/data/brands.ts
git commit -m "feat: add brand token registry"
```

---

### Task 2: Prix et certifications

**Files:**
- Create: `src/data/awards.ts`
- Modify: `src/data/education.ts` — supprimer `interface Certification` et `export const certifications`

**Interfaces:**
- Produces: `interface Award`, `export const awards: Award[]`, `export function getAwardsByIds(ids: string[]): Award[]`

- [ ] **Step 1: Créer `src/data/awards.ts`**

```ts
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
```

- [ ] **Step 2: Vérifier que le logo `st.png` existe**

Run: `ls public/assets/logos/`
Expected: `st.png` présent. `education.ts` référençait `st.jpg` — si seul `st.jpg` existe, utilisez `st.jpg` dans `awards.ts` et corrigez les deux entrées concernées (`design-prize-inovgames`, `inovgames`). Ne laissez pas un chemin d'image mort.

- [ ] **Step 3: Retirer les certifications de `education.ts`**

Dans `src/data/education.ts`, supprimer l'`interface Certification` (lignes 17-28) et tout le tableau `export const certifications: Certification[] = [...]` (lignes 143-201). Laisser `education`, `Volunteer` et `volunteering` intacts.

- [ ] **Step 4: Trouver et corriger les imports cassés**

Run: `grep -rn "certifications\|Certification" src/`
Expected: repérer chaque consommateur. `src/components/common/EducationCard.tsx` en est un — il sera supprimé en Tâche 10, mais il doit compiler **maintenant**. Remplacez-y l'import par `import { awards } from '../../data/awards';` et filtrez sur `awards.filter((a) => a.type === 'certification')`, en adaptant les champs : `title` devient `titleFr`/`titleEn`, `skillsFr`/`skillsEn` n'existent plus sur `Award` — supprimez l'affichage des puces de compétences dans cette carte, elle disparaît en Tâche 10.

- [ ] **Step 5: Vérifier build et lint**

Run: `npm run build && npm run lint`
Expected: succès, 0 warning.

- [ ] **Step 6: Contrôle visuel**

Run: `npm run dev` puis ouvrir la home.
Expected: la carte Cursus & Certifs affiche toujours les 5 certifications, sans les puces de compétences.

- [ ] **Step 7: Commit**

```bash
git add src/data/awards.ts src/data/education.ts src/components/common/EducationCard.tsx
git commit -m "feat: move certifications into a unified awards dataset"
```

---

### Task 3: Articles et publications

**Files:**
- Create: `src/data/articles.ts`

**Interfaces:**
- Produces: `interface Article`, `export const articles: Article[]`, `export function getArticlesByIds(ids: string[]): Article[]`

- [ ] **Step 1: Créer le fichier**

```ts
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
    organizationId: 'hec',
  },
];

export function getArticlesByIds(ids: string[]): Article[] {
  return ids
    .map((id) => articles.find((a) => a.id === id))
    .filter((a): a is Article => a !== undefined);
}
```

- [ ] **Step 2: Vérifier build et lint**

Run: `npm run build && npm run lint`
Expected: succès, 0 warning.

- [ ] **Step 3: Commit**

```bash
git add src/data/articles.ts
git commit -m "feat: add press articles dataset"
```

---

### Task 4: Recommandations et photos

**Files:**
- Create: `src/data/recommendations.ts`
- Create: `public/assets/reco/*.png` (10 fichiers copiés)

**Interfaces:**
- Produces: `interface Recommendation`, `type RecoRelation = 'mentor' | 'manager' | 'teacher' | 'peer'`, `export const recommendations: Recommendation[]`

- [ ] **Step 1: Copier les 10 photos**

```bash
mkdir -p public/assets/reco
SRC="/Users/moussandou/Cowork Station/Code/recommandation"
cp "$SRC/isabelle.png"  public/assets/reco/isabelle-gastaldi.png
cp "$SRC/olivier.png"   public/assets/reco/olivier-ravut.png
cp "$SRC/zacharia.png"  public/assets/reco/yanis-zacharia-picard.png
cp "$SRC/theo.png"      public/assets/reco/theo-gaillardon.png
cp "$SRC/nabeel.png"    public/assets/reco/nabeel-chauhan.png
cp "$SRC/martin.png"    public/assets/reco/martin-ohresser.png
cp "$SRC/meryl.png"     public/assets/reco/meryl-stretti.png
cp "$SRC/maxime.png"    public/assets/reco/maxime-finaud.png
cp "$SRC/charles.png"   public/assets/reco/charles-duprat.png
cp "$SRC/naima.png"     public/assets/reco/naima-sarhan.png
ls public/assets/reco/
```

Expected: 10 fichiers listés. Romain Lavielle et Majdi Rabia n'ont volontairement pas de fichier.

- [ ] **Step 2: Créer `src/data/recommendations.ts`**

Les textes sont en version originale, non traduits. Ne les reformulez pas, ne les raccourcissez pas.

```ts
export type RecoRelation = 'mentor' | 'manager' | 'teacher' | 'peer';

export interface Recommendation {
  id: string;
  name: string;
  title: string;
  relation: RecoRelation;
  relationLabelFr: string;
  relationLabelEn: string;
  date: string;
  text: string;
  photo?: string;
  initials: string;
}

export const recommendations: Recommendation[] = [
  {
    id: 'romain-lavielle',
    name: 'Romain Lavielle',
    title: "I help early-stage entrepreneurs become cash-ready (300+ startups mentored)",
    relation: 'mentor',
    relationLabelFr: 'Mentor — HEC Paris',
    relationLabelEn: 'Mentor — HEC Paris',
    date: '11 juin 2026',
    text: "I've been coaching Moussandou during the HEC Paris Entrepreneurship certificate, as part of a multi-background team. Moussandou showed high curiosity in learning from fields that aren't originally in his tech background: market research, problem identification, ICP definition and was then able to translate the solution the group has imagined into a vibrant MVP in less than 2 weeks. A great example of a modern tech profile: curious, willing to understand before executing at fast pace. Congrats!",
    initials: 'RL',
  },
  {
    id: 'majdi-rabia',
    name: 'Majdi Rabia',
    title: "Fractional CDO · Ex music-tech founder · AI for entrepreneurs @ HEC & ENSTA",
    relation: 'mentor',
    relationLabelFr: 'Mentor — HEC Paris',
    relationLabelEn: 'Mentor — HEC Paris',
    date: '10 juin 2026',
    text: "Moussandou was part of the AI Entrepreneurship certificate @HEC and he definitely stood out. His tech abilities helped him build a great MVP for his team. He was more than happy to get out of his comfort zone and talk to potential users to understand and validate a problem. He will go on to achieve great things if he keeps the same resilience and builder mentality at the age of AI.",
    initials: 'MR',
  },
  {
    id: 'isabelle-gastaldi',
    name: 'Isabelle Gastaldi',
    title: "Bilan de compétences · Coaching professionnel",
    relation: 'mentor',
    relationLabelFr: 'Mentor — Epitech',
    relationLabelEn: 'Mentor — Epitech',
    date: '28 mai 2026',
    text: "During his three years of study at Epitech, Moussandou demonstrated a natural talent for leading a project team; he knows how to unite and guide a team to high performance and creative solutions to solve problems. He embodies excellent values for a Team Builder: cooperation, quality relationship, open-mind, proactive approach, creative solutions and above all, active listening. If I were recruiting a Team Leader, he would be on my shortlist!",
    photo: '/Portfolio/assets/reco/isabelle-gastaldi.png',
    initials: 'IG',
  },
  {
    id: 'olivier-ravut',
    name: 'Olivier Ravut',
    title: "Expert CRM Associations et Fédérations · Certifié approche systémique École de Palo Alto",
    relation: 'mentor',
    relationLabelFr: 'Mentor',
    relationLabelEn: 'Mentor',
    date: '27 mai 2026',
    text: "I had the pleasure of working with Moussandou for several months. What primarily characterizes him is, first and foremost, his remarkable quick wit, which allows him to adapt to every situation with a constant focus on improvement. He also has a natural ability to translate his ideas into concrete actions, making them achievable. To do this, he draws upon his natural abilities, but he also relies on collective intelligence and teamwork. Moussandou will go far, I'm certain of it. If you give him a supportive environment that allows him to fully utilize his many natural talents, he will be the kind of colleague who brings innovative and humane leadership to your company.",
    photo: '/Portfolio/assets/reco/olivier-ravut.png',
    initials: 'OR',
  },
  {
    id: 'yanis-zacharia-picard',
    name: 'Yanis Zacharia Picard',
    title: "Software Engineering Intern · Interested in Cloud & DevOps",
    relation: 'peer',
    relationLabelFr: 'Camarade de promotion',
    relationLabelEn: 'Studied together',
    date: '21 mai 2026',
    text: "I had the chance to work with Moussandou Mroivili for three years at Epitech. He often took the lead during group projects and always gave his best to move the team forward. He was very involved, helped create good team cohesion, and was always motivated to innovate and solve problems in computer science. Working with him was a great experience.",
    photo: '/Portfolio/assets/reco/yanis-zacharia-picard.png',
    initials: 'YP',
  },
  {
    id: 'theo-gaillardon',
    name: 'Théo Gaillardon',
    title: "Epitech — European Institute of Technology",
    relation: 'teacher',
    relationLabelFr: 'Professeur — Epitech',
    relationLabelEn: 'Teacher — Epitech',
    date: '21 mai 2026',
    text: "During his years at Epitech, Moussandou was always a striving student, leading projects and being recognized by his peers as a true leader and leading developer. He was always willing to invest himself in external and internal events. He showed an incredible work ethic and ability to improve himself and uplift others. I would gladly work with him if any opportunities arise.",
    photo: '/Portfolio/assets/reco/theo-gaillardon.png',
    initials: 'TG',
  },
  {
    id: 'nabeel-chauhan',
    name: 'Nabeel Chauhan',
    title: "GTM Engineer/AE who builds the machine, then runs it · HEC Paris",
    relation: 'peer',
    relationLabelFr: 'Coéquipier — HEC Paris',
    relationLabelEn: 'Teammate — HEC Paris',
    date: '20 mai 2026',
    text: "I worked with Moussandou on the AI and Entrepreneurship certificate during my time at HEC Paris. Considering that I am a business school graduate with a few years of work experience and Moussandou is only just starting his career and is still completing his bachelor's, I was immensely impressed by his business acumen and his bias to action when it came to developing our product for the certificate. He far surpassed my expectations and could think in business and technical terms very well, showcasing that he had a natural ability towards developing tech products and also understanding a complex business landscape. He was very proactive and had really good input in terms of what features to put and how they solve a specific customer problem at the same time. It would be a pleasure to work with Moussandou again and anyone who gets the chance to work with him will see it for himself.",
    photo: '/Portfolio/assets/reco/nabeel-chauhan.png',
    initials: 'NC',
  },
  {
    id: 'martin-ohresser',
    name: 'Martin OHRESSER',
    title: "Développeur & Accompagnateur Pédagogique · C/C#/C++ & Python · Full Stack Web & Mobile",
    relation: 'teacher',
    relationLabelFr: 'Professeur — Epitech',
    relationLabelEn: 'Teacher — Epitech',
    date: '20 mai 2026',
    text: "Over the past three years at Epitech, Moussandou has consistently been recognized by his classmates as a natural leader and was often chosen to lead group projects. He never shies away from work and always strives to bring projects to completion, and often beyond expectations. He has also consistently pushed himself further by participating in external events and challenges to expand his knowledge, improve his skills, and achieve excellence. What stands out even more is his positive attitude. He never blames others and is always focused on finding solutions rather than creating problems within a team environment. Beyond his leadership skills, Moussandou also demonstrated strong technical abilities and a real capacity to learn quickly when facing new challenges. I would gladly work with him if the opportunity ever arises.",
    photo: '/Portfolio/assets/reco/martin-ohresser.png',
    initials: 'MO',
  },
  {
    id: 'meryl-stretti',
    name: 'Méryl Stretti',
    title: "Fondatrice de KWD Creative · CRM, Data et IA",
    relation: 'manager',
    relationLabelFr: 'Responsable directe — GDG Marseille',
    relationLabelEn: 'Direct manager — GDG Marseille',
    date: '20 mai 2026',
    text: "Moussandou joined the GDG Marseille team when we first started, and it has been a true pleasure working with him. He arrived with a great deal of enthusiasm and immediately dedicated himself to driving our technical projects forward. Beyond his commitment and developer skills, he is, above all, a driving force for the team: he is reliable, proactive, and always very curious. He is the kind of person you can count on to get things done. I am delighted to have him with us and recommend him without hesitation!",
    photo: '/Portfolio/assets/reco/meryl-stretti.png',
    initials: 'MS',
  },
  {
    id: 'maxime-finaud',
    name: 'Maxime Finaud',
    title: "Étudiant Epitech Bac+4 · Développeur Backend orienté DevOps · APIs, CI/CD, Docker & Kubernetes",
    relation: 'peer',
    relationLabelFr: 'Coéquipier — Bingeki',
    relationLabelEn: 'Teammate — Bingeki',
    date: '20 mai 2026',
    text: "I highly recommend Moussandou Mroivili for his dedication and professionalism during the Bingeki study project. Throughout the project, he demonstrated strong motivation, reliability, and the ability to adapt quickly to new challenges in a collaborative academic environment. Moussandou consistently showed excellent teamwork and communication skills while completing his tasks with seriousness and autonomy. His positive attitude and commitment contributed greatly to the success of the project. I am confident that he will be a valuable asset to any future team or organization.",
    photo: '/Portfolio/assets/reco/maxime-finaud.png',
    initials: 'MF',
  },
  {
    id: 'charles-duprat',
    name: 'Charles Duprat',
    title: "Chargé de mission inclusion numérique · Digital Inclusion Lead",
    relation: 'manager',
    relationLabelFr: "Responsable direct — Icom'Provence",
    relationLabelEn: "Direct manager — Icom'Provence",
    date: '16 déc. 2025',
    text: "I had the pleasure of supervising Moussandou during his internship at ICOM'Provence in late 2024. He played a key role in the development of our MOOC on digital autonomy for people with disabilities (autonomie-numerique.fr). Moussandou is highly proficient in web development and CMS management (WordPress). Beyond his technical skills, he is a reliable professional with excellent team spirit and a strong ability to adapt. I highly recommend him for any future opportunity, whether in France or abroad.",
    photo: '/Portfolio/assets/reco/charles-duprat.png',
    initials: 'CD',
  },
  {
    id: 'naima-sarhan',
    name: 'Naïma Sarhan',
    title: "Vibe coding & Digital Marketing Specialist · Master Innovation, Création & Communication Digitale",
    relation: 'peer',
    relationLabelFr: 'Collaboration — HACKTOGONE',
    relationLabelEn: 'Collaboration — HACKTOGONE',
    date: '8 oct. 2025',
    text: "I had the pleasure of working with Moussandou during the first AI agent hackathon, HACKTOGONE, where we collaborated as part of the same team. From the very beginning, he stood out for his dedication, reliability, as well as his kindness and strong sense of teamwork. Moussandou is a highly skilled developer, always ready to help others and share his insights to move the project forward. His commitment and professionalism made a real difference during the event, and his positive attitude helped create a great team dynamic. I'm confident that Moussandou will bring the same level of enthusiasm, technical excellence, and collaboration to any future professional experience. It was truly a pleasure working with him!",
    photo: '/Portfolio/assets/reco/naima-sarhan.png',
    initials: 'NS',
  },
];
```

- [ ] **Step 3: Vérifier les compteurs par relation**

Run: `node -e "const s=require('fs').readFileSync('src/data/recommendations.ts','utf8');['mentor','manager','teacher','peer'].forEach(r=>console.log(r, (s.match(new RegExp(\"relation: '\"+r+\"'\",'g'))||[]).length))"`
Expected: `mentor 4`, `manager 2`, `teacher 2`, `peer 4`. Total 12. Ces nombres sont affichés dans les filtres en Tâche 16 — s'ils diffèrent, corrigez les données avant de continuer.

- [ ] **Step 4: Vérifier build et lint**

Run: `npm run build && npm run lint`
Expected: succès, 0 warning.

- [ ] **Step 5: Commit**

```bash
git add src/data/recommendations.ts public/assets/reco
git commit -m "feat: add LinkedIn recommendations dataset and profile photos"
```

---

### Task 5: Agrégation par organisation

**Files:**
- Create: `src/data/organizations.ts`

**Interfaces:**
- Consumes: `getBrand` (Task 1), `getAwardsByIds` (Task 2), `getArticlesByIds` (Task 3)
- Produces: `interface Organization`, `export const organizations: Organization[]`, `export const featuredOrganizations: Organization[]`, `export const compactOrganizations: Organization[]`

- [ ] **Step 1: Créer le fichier**

Les `span` d'une même rangée doivent totaliser 6. Ordre du tableau = ordre d'affichage.

```ts
export interface Organization {
  id: string;
  brandId: string;
  headlineFr: string;
  headlineEn: string;
  periodFr: string;
  periodEn: string;
  educationIds: string[];
  experienceIds: string[];
  volunteerIds: string[];
  awardIds: string[];
  articleIds: string[];
  projectIds: string[];
  featured: boolean;
  span: 2 | 3 | 4;
}

export const organizations: Organization[] = [
  {
    id: 'epitech',
    brandId: 'epitech',
    headlineFr: "Expert en Technologies de l'Information",
    headlineEn: "Expert in Information Technologies",
    periodFr: "2023 — 2028",
    periodEn: "2023 — 2028",
    educationIds: ['epitech'],
    experienceIds: [],
    volunteerIds: ['ambassador'],
    awardIds: ['design-prize-inovgames', 'inovgames'],
    articleIds: ['inovgames-epitech'],
    projectIds: [],
    featured: true,
    span: 4,
  },
  {
    id: 'yeungnam',
    brandId: 'yeungnam',
    headlineFr: "Échange académique d'un an",
    headlineEn: "One-year academic exchange",
    periodFr: "2026 — 2027",
    periodEn: "2026 — 2027",
    educationIds: ['yeungnam'],
    experienceIds: [],
    volunteerIds: [],
    awardIds: [],
    articleIds: [],
    projectIds: ['yu-course-planner'],
    featured: true,
    span: 2,
  },
  {
    id: 'taker',
    brandId: 'taker',
    headlineFr: "Chargé d'affaires",
    headlineEn: "Business Manager",
    periodFr: "déc. 2025 — aujourd'hui",
    periodEn: "Dec. 2025 — Present",
    educationIds: [],
    experienceIds: ['taker'],
    volunteerIds: [],
    awardIds: ['prix-meilleure-etude', 'taker-certif-interne', 'taker-top30'],
    articleIds: [],
    projectIds: [],
    featured: true,
    span: 3,
  },
  {
    id: 'hec',
    brandId: 'hec',
    headlineFr: "Certificat AI Entrepreneurship",
    headlineEn: "AI Entrepreneurship Certificate",
    periodFr: "avr. — juin 2026",
    periodEn: "Apr. — Jun. 2026",
    educationIds: ['hec-paris-edu'],
    experienceIds: [],
    volunteerIds: [],
    awardIds: ['hec-entrepreneuriat'],
    articleIds: ['hec-epitech', 'youtube-pep'],
    projectIds: ['pep'],
    featured: true,
    span: 3,
  },
  {
    id: 'devid',
    brandId: 'devid',
    headlineFr: "Stagiaire Développement Web & Mobile",
    headlineEn: "Web & Mobile Development Intern",
    periodFr: "avr. 2026 — aujourd'hui",
    periodEn: "Apr. 2026 — Present",
    educationIds: [],
    experienceIds: ['devid'],
    volunteerIds: [],
    awardIds: [],
    articleIds: [],
    projectIds: [],
    featured: true,
    span: 3,
  },
  {
    id: 'gdg',
    brandId: 'gdg',
    headlineFr: "Développeur bénévole",
    headlineEn: "Volunteer Developer",
    periodFr: "mars 2026 — aujourd'hui",
    periodEn: "Mar. 2026 — Present",
    educationIds: [],
    experienceIds: ['gdg'],
    volunteerIds: [],
    awardIds: [],
    articleIds: [],
    projectIds: ['gdg-marseille-site', 'gdg-discord-bot'],
    featured: true,
    span: 3,
  },
  {
    id: 'es-digital',
    brandId: 'neutral',
    headlineFr: "Développeur Web & Spécialiste SEO",
    headlineEn: "Web Developer & SEO Specialist",
    periodFr: "sept. 2025 — févr. 2026",
    periodEn: "Sept. 2025 — Feb. 2026",
    educationIds: [],
    experienceIds: ['es-digital'],
    volunteerIds: [],
    awardIds: [],
    articleIds: [],
    projectIds: [],
    featured: false,
    span: 2,
  },
  {
    id: 'icom',
    brandId: 'neutral',
    headlineFr: "Stagiaire Développement Web",
    headlineEn: "Web Development Intern",
    periodFr: "août — nov. 2024",
    periodEn: "Aug. — Nov. 2024",
    educationIds: [],
    experienceIds: ['icom'],
    volunteerIds: [],
    awardIds: [],
    articleIds: [],
    projectIds: ['mooc-autonomie'],
    featured: false,
    span: 2,
  },
  {
    id: 'lacordaire',
    brandId: 'neutral',
    headlineFr: "Enseignant en informatique",
    headlineEn: "Computer Science Teacher",
    periodFr: "sept. 2025 — févr. 2026",
    periodEn: "Sept. 2025 — Feb. 2026",
    educationIds: [],
    experienceIds: ['lacordaire'],
    volunteerIds: [],
    awardIds: [],
    articleIds: [],
    projectIds: [],
    featured: false,
    span: 2,
  },
  {
    id: 'article1',
    brandId: 'neutral',
    headlineFr: "Mentor bénévole",
    headlineEn: "Volunteer Mentor",
    periodFr: "nov. 2025",
    periodEn: "Nov. 2025",
    educationIds: [],
    experienceIds: [],
    volunteerIds: ['article1'],
    awardIds: [],
    articleIds: [],
    projectIds: [],
    featured: false,
    span: 2,
  },
  {
    id: 'saint-ex',
    brandId: 'neutral',
    headlineFr: "Baccalauréat Général — Mention Bien",
    headlineEn: "General Baccalaureate — High Honors",
    periodFr: "2020 — 2023",
    periodEn: "2020 — 2023",
    educationIds: ['saint-ex'],
    experienceIds: [],
    volunteerIds: [],
    awardIds: ['prix-python-lycee'],
    articleIds: [],
    projectIds: [],
    featured: false,
    span: 2,
  },
  {
    id: 'olivier-bleu',
    brandId: 'neutral',
    headlineFr: "Coordinateur bénévole",
    headlineEn: "Volunteer Coordinator",
    periodFr: "janv. — févr. 2023",
    periodEn: "Jan. — Feb. 2023",
    educationIds: [],
    experienceIds: [],
    volunteerIds: ['olivier-bleu'],
    awardIds: [],
    articleIds: [],
    projectIds: [],
    featured: false,
    span: 2,
  },
];

export const featuredOrganizations = organizations.filter((o) => o.featured);
export const compactOrganizations = organizations.filter((o) => !o.featured);
```

- [ ] **Step 2: Vérifier que tous les ids référencés existent**

Chaque id doit exister dans son fichier source, sinon la carte affichera un trou silencieux.

```bash
node --input-type=module -e "
import {organizations} from './src/data/organizations.ts';
" 2>/dev/null || echo "Node ne lit pas le TS directement — faites la vérification manuelle ci-dessous."
```

Vérification manuelle, à faire réellement :

```bash
grep -n "id: '" src/data/education.ts   # attendus : epitech, hec-paris-edu, yeungnam, saint-ex
grep -n "id: '" src/data/experience.ts  # attendus : devid, taker, es-digital, gdg, lacordaire, icom
grep -n "id: '" src/data/projects.ts    # attendus : pep, yu-course-planner, gdg-marseille-site, gdg-discord-bot, mooc-autonomie
```

Expected: chaque id cité dans `organizations.ts` apparaît dans le fichier correspondant. Note : `education.ts` utilise `hec-paris-edu` (et non `hec`) ; `volunteering` utilise `ambassador`, `article1`, `olivier-bleu`. Corrigez `organizations.ts` en cas d'écart, jamais les fichiers sources.

- [ ] **Step 3: Vérifier la somme des spans**

Rangées attendues, dans l'ordre du tableau `featuredOrganizations` : epitech 4 + yeungnam 2 = 6 · taker 3 + hec 3 = 6 · devid 3 + gdg 3 = 6.
Expected: chaque rangée totalise 6.

- [ ] **Step 4: Vérifier build et lint**

Run: `npm run build && npm run lint`
Expected: succès, 0 warning.

- [ ] **Step 5: Commit**

```bash
git add src/data/organizations.ts
git commit -m "feat: add organization aggregation layer"
```

---

## Phase 2 — Socle rendu

### Task 6: Tokens CSS et retrait de l'effet magnétique

**Files:**
- Modify: `src/styles/globals.css`
- Modify: `src/components/layout/BentoGrid.tsx`

**Interfaces:**
- Produces: classes CSS `.brand-card`, `.brand-card--texture-grid`, `.brand-card--texture-dots`, `.hover-lift` ; `BentoGrid` conserve sa signature `{ children, className }`.

- [ ] **Step 1: Ajouter les styles de marque à `globals.css`**

À insérer après le bloc `@layer components` existant.

```css
/* ── Brand cards ─────────────────────────────── */
.brand-card {
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 24px;
  background: var(--brand-bg);
  color: var(--brand-fg);
  border-radius: var(--brand-radius);
  border: var(--brand-border);
  box-shadow: var(--brand-shadow);
  font-family: var(--brand-font);
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s ease;
}

.brand-card__texture {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.06;
}

.brand-card--texture-grid .brand-card__texture {
  background-image:
    repeating-linear-gradient(0deg, var(--brand-fg) 0 1px, transparent 1px 24px),
    repeating-linear-gradient(90deg, var(--brand-fg) 0 1px, transparent 1px 24px);
}

.brand-card--texture-dots .brand-card__texture {
  background-image: radial-gradient(var(--brand-fg) 1.5px, transparent 1.5px);
  background-size: 18px 18px;
}

.hover-lift {
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s ease;
}
.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 44px rgba(59, 35, 86, 0.22);
}

@media (prefers-reduced-motion: reduce) {
  .hover-lift:hover { transform: none; }
}
```

- [ ] **Step 2: Retirer l'effet magnétique de `BentoGrid.tsx`**

Remplacer intégralement le contenu du fichier. Tout le code de `applyMagnetic`, `resetAll`, les refs et les listeners disparaît. Le `useEffect` de nettoyage de `stagger-children` est conservé : sans lui, l'animation d'entrée fige les cartes.

```tsx
import React, { useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  // Remove the stagger class once the entrance animation is done,
  // otherwise the cards keep their animated transform.
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const timer = setTimeout(() => {
      grid.classList.remove('stagger-children');
      grid.querySelectorAll<HTMLElement>('.bento-card, .brand-card').forEach((card) => {
        card.style.animation = 'none';
      });
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={gridRef}
      className={cn(
        'grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 auto-rows-[160px] gap-6 md:gap-8 max-w-[1080px] mx-auto stagger-children',
        className
      )}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 3: Vérifier build et lint**

Run: `npm run build && npm run lint`
Expected: succès, 0 warning. Si le lint signale `HOVER_SCALE`/`PUSH_STRENGTH` inutilisés, c'est qu'il reste des constantes de l'ancien fichier — supprimez-les.

- [ ] **Step 4: Contrôle visuel**

Run: `npm run dev`
Expected: la home s'affiche normalement, les cartes ne se repoussent plus au survol, l'animation d'entrée en cascade fonctionne toujours.

- [ ] **Step 5: Commit**

```bash
git add src/styles/globals.css src/components/layout/BentoGrid.tsx
git commit -m "refactor: drop magnetic hover, add brand card tokens"
```

---

### Task 7: BrandAvatar et helper de style

**Files:**
- Create: `src/components/brand/brandStyle.ts`
- Create: `src/components/brand/BrandAvatar.tsx`

**Interfaces:**
- Consumes: `Brand`, `getBrand` (Task 1)
- Produces: `export function brandStyle(brand: Brand): React.CSSProperties` ; `export function BrandAvatar({ brand, size }: { brand: Brand; size?: number })`

- [ ] **Step 1: Créer `brandStyle.ts`**

Le cast en `React.CSSProperties` est nécessaire : TypeScript n'accepte pas les custom properties dans le type natif. Utilisez `as React.CSSProperties` sur l'objet complet, pas `any` — `no-explicit-any` ferait échouer le lint.

```ts
import type React from 'react';
import type { Brand } from '../../data/brands';

const FONT_STACKS: Record<Brand['fontKey'], string> = {
  display: "'Fredoka', sans-serif",
  serif: "ui-serif, Georgia, 'Times New Roman', serif",
  mono: "ui-monospace, SFMono-Regular, Menlo, monospace",
};

export function brandStyle(brand: Brand): React.CSSProperties {
  return {
    '--brand-bg': brand.bg,
    '--brand-fg': brand.fg,
    '--brand-muted': brand.muted,
    '--brand-accent': brand.accent,
    '--brand-accent-alt': brand.accentAlt ?? brand.accent,
    '--brand-radius': brand.radius,
    '--brand-border': brand.border,
    '--brand-shadow': brand.shadow,
    '--brand-font': FONT_STACKS[brand.fontKey],
  } as React.CSSProperties;
}
```

- [ ] **Step 2: Créer `BrandAvatar.tsx`**

Deux cas : logo présent, ou pastille typographique avec l'initiale. L'`onError` couvre le cas d'un fichier manquant.

```tsx
import { useState } from 'react';
import type { Brand } from '../../data/brands';

interface BrandAvatarProps {
  brand: Brand;
  size?: number;
}

export function BrandAvatar({ brand, size = 44 }: BrandAvatarProps) {
  const [failed, setFailed] = useState(false);
  const showLogo = Boolean(brand.logo) && !failed;

  return (
    <div
      className="shrink-0 rounded-xl overflow-hidden flex items-center justify-center"
      style={{
        width: size,
        height: size,
        background: showLogo ? '#FFFFFF' : 'var(--brand-accent)',
      }}
    >
      {showLogo ? (
        <img
          src={brand.logo}
          alt={brand.name}
          className="w-full h-full object-contain p-1"
          onError={() => setFailed(true)}
        />
      ) : (
        <span
          className="font-display font-black text-lg leading-none"
          style={{ color: 'var(--brand-bg)' }}
        >
          {brand.name.charAt(0).toUpperCase()}
        </span>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Vérifier build et lint**

Run: `npm run build && npm run lint`
Expected: succès, 0 warning.

- [ ] **Step 4: Commit**

```bash
git add src/components/brand/
git commit -m "feat: add brand style helper and brand avatar"
```

---

### Task 8: BrandCard

**Files:**
- Create: `src/components/brand/BrandCard.tsx`

**Interfaces:**
- Consumes: `brandStyle`, `BrandAvatar` (Task 7), `getBrand` (Task 1), `Organization` (Task 5), `education`/`volunteering` (`education.ts`), `experiences` (`experience.ts`), `getAwardsByIds` (Task 2), `getArticlesByIds` (Task 3)
- Produces: `export function BrandCard({ organization, className }: { organization: Organization; className?: string })`

- [ ] **Step 1: Créer le composant**

Règle de densité de la spec : au maximum **5 items** affichés, priorité aux prix puis aux articles. Au-delà, la carte déborderait et casserait la rangée.

```tsx
import { getBrand } from '../../data/brands';
import type { Organization } from '../../data/organizations';
import { education, volunteering } from '../../data/education';
import { experiences } from '../../data/experience';
import { getAwardsByIds } from '../../data/awards';
import { getArticlesByIds } from '../../data/articles';
import { useI18n } from '../../context/I18nContext';
import { cn } from '../../lib/utils';
import { brandStyle } from './brandStyle';
import { BrandAvatar } from './BrandAvatar';
import { Award as AwardIcon, Newspaper, ExternalLink } from 'lucide-react';

const MAX_ITEMS = 5;

interface BrandCardProps {
  organization: Organization;
  className?: string;
}

interface CardItem {
  key: string;
  label: string;
  kind: 'role' | 'award' | 'article';
  url?: string;
}

export function BrandCard({ organization, className }: BrandCardProps) {
  const { language } = useI18n();
  const brand = getBrand(organization.brandId);
  const fr = language === 'fr';

  const roleItems: CardItem[] = [
    ...organization.educationIds.map((id) => {
      const e = education.find((x) => x.id === id);
      return e ? { key: `edu-${id}`, label: fr ? e.degreeFr : e.degreeEn, kind: 'role' as const } : null;
    }),
    ...organization.experienceIds.map((id) => {
      const x = experiences.find((v) => v.id === id);
      return x ? { key: `exp-${id}`, label: fr ? x.roleFr : x.roleEn, kind: 'role' as const } : null;
    }),
    ...organization.volunteerIds.map((id) => {
      const v = volunteering.find((x) => x.id === id);
      return v ? { key: `vol-${id}`, label: fr ? v.roleFr : v.roleEn, kind: 'role' as const } : null;
    }),
  ].filter((i): i is CardItem => i !== null);

  const awardItems: CardItem[] = getAwardsByIds(organization.awardIds).map((a) => ({
    key: `award-${a.id}`,
    label: fr ? a.titleFr : a.titleEn,
    kind: 'award',
    url: a.link,
  }));

  const articleItems: CardItem[] = getArticlesByIds(organization.articleIds).map((a) => ({
    key: `article-${a.id}`,
    label: a.source,
    kind: 'article',
    url: a.url,
  }));

  // Awards and articles carry the most signal — they get the remaining slots first.
  const items = [...awardItems, ...articleItems, ...roleItems].slice(0, MAX_ITEMS);

  const skills =
    organization.educationIds
      .map((id) => education.find((e) => e.id === id))
      .flatMap((e) => (e ? (fr ? e.skillsFr : e.skillsEn) : [])) ??
    [];
  const expSkills = organization.experienceIds
    .map((id) => experiences.find((x) => x.id === id))
    .flatMap((x) => (x ? ((fr ? x.skillsFr : x.skillsEn) ?? []) : []));
  const allSkills = [...skills, ...expSkills].slice(0, 4);

  return (
    <div
      style={brandStyle(brand)}
      className={cn(
        'brand-card hover-lift',
        brand.texture === 'grid' && 'brand-card--texture-grid',
        brand.texture === 'dots' && 'brand-card--texture-dots',
        className
      )}
    >
      <div className="brand-card__texture" aria-hidden="true" />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start justify-between gap-3 mb-4">
          <BrandAvatar brand={brand} />
          <span
            className="text-[10px] font-black uppercase tracking-[0.18em] pt-1"
            style={{ color: 'var(--brand-muted)' }}
          >
            {fr ? organization.periodFr : organization.periodEn}
          </span>
        </div>

        <h3 className="text-xl font-black leading-tight" style={{ color: 'var(--brand-fg)' }}>
          {brand.name}
        </h3>
        <p className="text-[12px] font-semibold mt-1 mb-4" style={{ color: 'var(--brand-muted)' }}>
          {fr ? organization.headlineFr : organization.headlineEn}
        </p>

        <ul className="space-y-1.5 flex-1 min-h-0">
          {items.map((item) => {
            const content = (
              <>
                {item.kind === 'award' && (
                  <AwardIcon size={13} className="shrink-0 mt-0.5" style={{ color: 'var(--brand-accent)' }} />
                )}
                {item.kind === 'article' && (
                  <Newspaper size={13} className="shrink-0 mt-0.5" style={{ color: 'var(--brand-accent)' }} />
                )}
                {item.kind === 'role' && (
                  <span
                    className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full"
                    style={{ background: 'var(--brand-accent)' }}
                  />
                )}
                <span className="text-[12px] font-semibold leading-snug" style={{ color: 'var(--brand-fg)' }}>
                  {item.label}
                </span>
                {item.url && <ExternalLink size={11} className="shrink-0 mt-0.5 opacity-60" />}
              </>
            );

            return (
              <li key={item.key}>
                {item.url ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-2 hover:opacity-75 transition-opacity"
                  >
                    {content}
                  </a>
                ) : (
                  <div className="flex items-start gap-2">{content}</div>
                )}
              </li>
            );
          })}
        </ul>

        {allSkills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {allSkills.map((s) => (
              <span
                key={s}
                className="px-2 py-0.5 text-[9px] font-black uppercase tracking-wider rounded-full"
                style={{
                  color: 'var(--brand-fg)',
                  background: 'color-mix(in srgb, var(--brand-accent) 22%, transparent)',
                }}
              >
                {s}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Vérifier build et lint**

Run: `npm run build && npm run lint`
Expected: succès, 0 warning. Si `skillsFr` est optionnel sur `Experience`, le `?? []` gère le cas — vérifiez que le type ne remonte pas `string[] | undefined`.

- [ ] **Step 3: Commit**

```bash
git add src/components/brand/BrandCard.tsx
git commit -m "feat: add branded organization card"
```

---

### Task 9: Composant Section

**Files:**
- Create: `src/components/sections/Section.tsx`

**Interfaces:**
- Consumes: `BentoGrid` (Task 6)
- Produces: `export function Section({ title, subtitle, children, className }: { title: string; subtitle?: string; children: React.ReactNode; className?: string })`

- [ ] **Step 1: Créer le composant**

```tsx
import React from 'react';
import { BentoGrid } from '../layout/BentoGrid';
import { cn } from '../../lib/utils';

interface SectionProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export function Section({ title, subtitle, children, className }: SectionProps) {
  return (
    <section className={cn('mt-20 md:mt-28 first:mt-0', className)}>
      <div className="mb-8 md:mb-10">
        <div className="flex items-center gap-3">
          <span className="h-[2px] w-8 rounded-full bg-[#6D4499]/30" />
          <h2 className="text-2xl md:text-3xl font-black font-display tracking-tight text-[#3B2356]">
            {title}
          </h2>
        </div>
        {subtitle && (
          <p className="mt-2 text-[13px] font-semibold text-[#6D4499]/70 max-w-xl leading-relaxed pl-11">
            {subtitle}
          </p>
        )}
      </div>
      <BentoGrid>{children}</BentoGrid>
    </section>
  );
}
```

- [ ] **Step 2: Vérifier build et lint**

Run: `npm run build && npm run lint`
Expected: succès, 0 warning.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Section.tsx
git commit -m "feat: add titled section wrapper"
```

---

## Phase 3 — Extraction de la home

### Task 10: Sortir la home de App.tsx

**Files:**
- Create: `src/pages/Home.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Produces: `export function Home()`

Cette tâche est un **déplacement pur**. Le rendu doit être strictement identique avant et après. Ne changez aucun style.

- [ ] **Step 1: Créer `src/pages/Home.tsx`**

Déplacez-y : le composant `Star`, la constante `COLORS`, et l'intégralité du composant `Home` (lignes 30 à 206 de `App.tsx` actuel). Ajoutez en tête les imports nécessaires, chemins ajustés d'un niveau (`./components/...` devient `../components/...`) :

```tsx
import { useNavigate } from 'react-router-dom';
import { BentoGrid } from '../components/layout/BentoGrid';
import { ProjectCard, AllProjectsCard } from '../components/common/ProjectCard';
import { projects } from '../data/projects';
import { GithubCard } from '../components/common/GithubCard';
import { ExperienceCard } from '../components/common/ExperienceCard';
import { EducationCard } from '../components/common/EducationCard';
import { VolunteerCard } from '../components/common/VolunteerCard';
import { StatusCard } from '../components/common/StatusCard';
import { cn } from '../lib/utils';
import { useI18n } from '../context/I18nContext';
import { MapPin, Sparkles, Code2, GraduationCap, Github, Linkedin, Instagram, Mail, FileText, ArrowRight } from 'lucide-react';
```

Puis `export function Home() { ... }` avec le corps inchangé, y compris le `<footer>`.

- [ ] **Step 2: Alléger `App.tsx`**

```tsx
import { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Clouds } from './components/decorative/Clouds';
import { Home } from './pages/Home';
import { ProjectList } from './pages/ProjectList';
import { ProjectDetail } from './pages/ProjectDetail';
import { Contact } from './pages/Contact';
import { I18nProvider } from './context/I18nContext';

/* Scrolls back to the top whenever the route changes */
function ScrollRestore() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <HashRouter>
      <I18nProvider>
        <div className="min-h-screen bg-[#F1ECF9]">
          <ScrollRestore />
          <Clouds />
          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<ProjectList />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </I18nProvider>
    </HashRouter>
  );
}
```

- [ ] **Step 3: Vérifier build et lint**

Run: `npm run build && npm run lint`
Expected: succès, 0 warning.

- [ ] **Step 4: Contrôle visuel — le point critique de cette tâche**

Run: `npm run dev`
Expected: la home est **pixel pour pixel identique** à avant. Si quelque chose bouge, c'est qu'un style ou un import a été perdu pendant le déplacement.

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx src/pages/Home.tsx
git commit -m "refactor: extract Home page out of App"
```

---

## Phase 4 — Sections thématiques

### Task 11: Traductions des nouvelles sections

**Files:**
- Modify: `src/data/translations.ts`

**Interfaces:**
- Produces: clés `header.recommendations`, `sections.*`, `recommendations.*` disponibles via `t()`.

- [ ] **Step 1: Ajouter les clés côté `fr`**

Dans l'objet `fr`, ajouter `recommendations: 'Recommandations'` à `header`, puis ces deux blocs au même niveau que `home` :

```ts
    sections: {
      journey_title: 'Mon parcours',
      journey_desc: "Les organisations où j'apprends, construis et livre — formation, missions et distinctions réunies.",
      projects_title: 'Projets phares',
      projects_desc: 'Une sélection de trois projets que je porte de bout en bout, du concept à la mise en production.',
      other_experiences: 'Autres expériences',
      awards_title: 'Prix, distinctions & certifications',
      awards_desc: 'Ce que des jurys, des écoles et des entreprises ont validé en chemin.',
      articles_title: 'Articles & publications',
      articles_desc: 'Ce que la presse et mon école ont écrit sur mes projets.',
      recos_title: 'Ce qu\'on dit de moi',
      recos_desc: 'Mentors, managers, professeurs et coéquipiers — extraits de mes recommandations LinkedIn.',
      recos_cta: 'Voir les 12 recommandations',
    },
    recommendations: {
      back: "Retour à l'accueil",
      title: "Ce qu'on dit de moi",
      desc: '12 recommandations LinkedIn — mentors, managers, professeurs et coéquipiers.',
      filter_all: 'Toutes',
      filter_mentor: 'Mentors',
      filter_manager: 'Managers',
      filter_teacher: 'Professeurs',
      filter_peer: 'Équipe & pairs',
      read_more: 'Lire plus',
      read_less: 'Réduire',
      linkedin_cta: 'Voir mon profil LinkedIn',
    },
```

- [ ] **Step 2: Ajouter les clés côté `en`**

Dans l'objet `en`, ajouter `recommendations: 'Recommendations'` à `header`, puis :

```ts
    sections: {
      journey_title: 'My journey',
      journey_desc: 'The organisations where I learn, build and deliver — studies, roles and awards in one place.',
      projects_title: 'Featured projects',
      projects_desc: 'Three projects I own end to end, from concept to production.',
      other_experiences: 'Other experiences',
      awards_title: 'Awards & certifications',
      awards_desc: 'What juries, schools and companies have validated along the way.',
      articles_title: 'Articles & publications',
      articles_desc: 'What the press and my school wrote about my projects.',
      recos_title: 'What people say',
      recos_desc: 'Mentors, managers, teachers and teammates — excerpts from my LinkedIn recommendations.',
      recos_cta: 'Read all 12 recommendations',
    },
    recommendations: {
      back: 'Back to home',
      title: 'What people say',
      desc: '12 LinkedIn recommendations — mentors, managers, teachers and teammates.',
      filter_all: 'All',
      filter_mentor: 'Mentors',
      filter_manager: 'Managers',
      filter_teacher: 'Teachers',
      filter_peer: 'Team & peers',
      read_more: 'Read more',
      read_less: 'Show less',
      linkedin_cta: 'View my LinkedIn profile',
    },
```

- [ ] **Step 3: Vérifier la symétrie FR/EN**

Run: `npm run build`
Expected: succès. Les deux objets doivent avoir exactement les mêmes clés — une clé manquante d'un côté renverrait le nom de la clé brut à l'écran.

- [ ] **Step 4: Commit**

```bash
git add src/data/translations.ts
git commit -m "feat: add translations for the new home sections"
```

---

### Task 12: Section Parcours

**Files:**
- Create: `src/components/sections/JourneySection.tsx`
- Modify: `src/pages/Home.tsx`
- Delete: `src/components/common/EducationCard.tsx`, `src/components/common/ExperienceCard.tsx`, `src/components/common/VolunteerCard.tsx`

**Interfaces:**
- Consumes: `Section` (Task 9), `BrandCard` (Task 8), `featuredOrganizations`/`compactOrganizations` (Task 5)
- Produces: `export function JourneySection()`

- [ ] **Step 1: Créer `JourneySection.tsx`**

Le `span` de chaque organisation pilote les colonnes. Le mapping doit être écrit en classes littérales : Tailwind purge les classes construites dynamiquement.

```tsx
import { Section } from './Section';
import { BrandCard } from '../brand/BrandCard';
import { featuredOrganizations, compactOrganizations } from '../../data/organizations';
import { getBrand } from '../../data/brands';
import { education, volunteering } from '../../data/education';
import { experiences } from '../../data/experience';
import { useI18n } from '../../context/I18nContext';

const SPAN_CLASS: Record<2 | 3 | 4, string> = {
  2: 'md:col-span-2 md:row-span-2',
  3: 'md:col-span-3 md:row-span-2',
  4: 'md:col-span-4 md:row-span-2',
};

export function JourneySection() {
  const { t, language } = useI18n();
  const fr = language === 'fr';

  return (
    <Section title={t('sections.journey_title')} subtitle={t('sections.journey_desc')}>
      {featuredOrganizations.map((org) => (
        <BrandCard
          key={org.id}
          organization={org}
          className={`row-span-2 ${SPAN_CLASS[org.span]}`}
        />
      ))}

      <div className="row-span-2 md:col-span-6 md:row-span-1 bento-card bg-white/45 justify-center">
        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#6D4499]/50 mb-3">
          {t('sections.other_experiences')}
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
          {compactOrganizations.map((org) => {
            const brand = getBrand(org.brandId);
            const name =
              brand.name ||
              education.find((e) => e.id === org.educationIds[0])?.school ||
              experiences.find((x) => x.id === org.experienceIds[0])?.company ||
              volunteering.find((v) => v.id === org.volunteerIds[0])?.organization ||
              org.id;

            return (
              <li key={org.id} className="flex items-baseline gap-2 min-w-0">
                <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-[#6D4499]/40" />
                <span className="text-[12px] font-bold text-[#3B2356] truncate">{name}</span>
                <span className="text-[11px] font-semibold text-[#6D4499]/60 truncate">
                  — {fr ? org.headlineFr : org.headlineEn}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Brancher la section dans `Home.tsx`**

Dans `Home.tsx`, supprimer les trois lignes qui rendent `<ExperienceCard />`, `<EducationCard />` et `<VolunteerCard />`, ainsi que leurs imports. Fermer le `<BentoGrid>` du hero après la carte `StatusCard`, puis ajouter `<JourneySection />` juste après, à l'intérieur du `<main>`.

- [ ] **Step 3: Supprimer les trois composants remplacés**

```bash
git rm src/components/common/EducationCard.tsx src/components/common/ExperienceCard.tsx src/components/common/VolunteerCard.tsx
grep -rn "EducationCard\|ExperienceCard\|VolunteerCard" src/
```

Expected: le `grep` ne renvoie plus rien. S'il reste une référence, supprimez-la.

- [ ] **Step 4: Vérifier build et lint**

Run: `npm run build && npm run lint`
Expected: succès, 0 warning.

- [ ] **Step 5: Contrôle visuel**

Run: `npm run dev`
Expected: la section Parcours affiche 6 cartes brandées — Epitech en bleu nuit, HEC en bleu marine, GDG sur fond blanc bordé de noir — plus la bande des autres expériences. Chaque rangée est pleine, aucune colonne orpheline.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: replace list cards with branded organization section"
```

---

### Task 13: Section Projets phares

**Files:**
- Create: `src/components/sections/FeaturedProjectsSection.tsx`
- Modify: `src/pages/Home.tsx`

**Interfaces:**
- Consumes: `Section` (Task 9), `ProjectCard`/`AllProjectsCard` (existants), `projects` (existant)
- Produces: `export function FeaturedProjectsSection()`

- [ ] **Step 1: Créer le composant**

Projets retenus, dans cet ordre : `bingeki` (span 4), `pep` (span 2), `gameboy-sp` (span 2), puis `AllProjectsCard` (span 4).

```tsx
import { useNavigate } from 'react-router-dom';
import { Section } from './Section';
import { ProjectCard, AllProjectsCard } from '../common/ProjectCard';
import { projects } from '../../data/projects';
import { useI18n } from '../../context/I18nContext';

const FEATURED_IDS = ['bingeki', 'pep', 'gameboy-sp'] as const;
const SPANS: Record<string, string> = {
  bingeki: 'md:col-span-4 md:row-span-2',
  pep: 'md:col-span-2 md:row-span-2',
  'gameboy-sp': 'md:col-span-2 md:row-span-2',
};

export function FeaturedProjectsSection() {
  const navigate = useNavigate();
  const { t } = useI18n();

  const featured = FEATURED_IDS.map((id) => projects.find((p) => p.id === id)).filter(
    (p): p is NonNullable<typeof p> => p !== undefined
  );

  return (
    <Section title={t('sections.projects_title')} subtitle={t('sections.projects_desc')}>
      {featured.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          className={`row-span-2 ${SPANS[project.id]}`}
        />
      ))}
      <AllProjectsCard
        className="row-span-2 md:col-span-4 md:row-span-2"
        onClick={() => navigate('/projects')}
      />
    </Section>
  );
}
```

- [ ] **Step 2: Vérifier que les trois ids existent**

Run: `grep -n "id: \"bingeki\"\|id: \"pep\"\|id: \"gameboy-sp\"" src/data/projects.ts`
Expected: 3 lignes. Si un id diffère, corrigez `FEATURED_IDS` — un id absent ferait disparaître silencieusement la carte.

- [ ] **Step 3: Brancher dans `Home.tsx`**

Retirer les deux `<ProjectCard project={mainFeatured[...]} />` et l'`<AllProjectsCard />` du bloc hero, ainsi que la variable `mainFeatured` devenue inutile. Ajouter `<FeaturedProjectsSection />` après `<JourneySection />`.

- [ ] **Step 4: Vérifier build et lint**

Run: `npm run build && npm run lint`
Expected: succès, 0 warning. Un warning sur `projects` ou `mainFeatured` inutilisé signale un import oublié dans `Home.tsx`.

- [ ] **Step 5: Contrôle visuel**

Run: `npm run dev`
Expected: 3 projets plus la carte « Voir mes travaux », en deux rangées pleines.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add featured projects section"
```

---

### Task 14: Section Prix et certifications

**Files:**
- Create: `src/components/sections/AwardsSection.tsx`
- Modify: `src/pages/Home.tsx`

**Interfaces:**
- Consumes: `Section` (Task 9), `awards` (Task 2)
- Produces: `export function AwardsSection()`

- [ ] **Step 1: Créer le composant**

```tsx
import { Section } from './Section';
import { awards } from '../../data/awards';
import { useI18n } from '../../context/I18nContext';
import { Trophy, GraduationCap, ExternalLink } from 'lucide-react';

export function AwardsSection() {
  const { t, language } = useI18n();
  const fr = language === 'fr';

  return (
    <Section title={t('sections.awards_title')} subtitle={t('sections.awards_desc')}>
      {awards.map((award) => {
        const isAward = award.type === 'award';
        const body = (
          <>
            <div className="flex items-start justify-between gap-2 mb-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: isAward ? 'rgba(217,119,6,0.14)' : 'rgba(109,68,153,0.12)' }}
              >
                {isAward ? (
                  <Trophy size={16} className="text-amber-600" />
                ) : (
                  <GraduationCap size={16} className="text-[#6D4499]" />
                )}
              </div>
              {award.link && <ExternalLink size={13} className="text-[#6D4499]/40 mt-1" />}
            </div>
            <h3 className="text-[13px] font-black leading-snug text-[#3B2356] line-clamp-3">
              {fr ? award.titleFr : award.titleEn}
            </h3>
            <p className="mt-auto pt-3 text-[10px] font-black uppercase tracking-[0.15em] text-[#6D4499]/55">
              {award.issuer} · {award.date}
            </p>
          </>
        );

        const className =
          'bento-card hover-lift bg-white/55 row-span-1 md:col-span-2 md:row-span-1 text-left';

        return award.link ? (
          <a
            key={award.id}
            href={award.link}
            target="_blank"
            rel="noopener noreferrer"
            className={className}
          >
            {body}
          </a>
        ) : (
          <div key={award.id} className={className}>
            {body}
          </div>
        );
      })}
    </Section>
  );
}
```

- [ ] **Step 2: Brancher dans `Home.tsx`**

Ajouter `<AwardsSection />` après `<FeaturedProjectsSection />`.

- [ ] **Step 3: Vérifier build et lint**

Run: `npm run build && npm run lint`
Expected: succès, 0 warning.

- [ ] **Step 4: Contrôle visuel**

Run: `npm run dev`
Expected: 10 vignettes sur 5 rangées de 3 colonnes (2 colonnes de grille chacune). Les 5 prix portent un trophée ambre, les 5 certifications une toque violette.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add awards and certifications section"
```

---

### Task 15: Section Articles

**Files:**
- Create: `src/components/sections/ArticlesSection.tsx`
- Modify: `src/pages/Home.tsx`

**Interfaces:**
- Consumes: `Section` (Task 9), `articles` (Task 3)
- Produces: `export function ArticlesSection()`

- [ ] **Step 1: Créer le composant**

Aucun article n'a d'image pour l'instant (`image` est optionnel et non renseigné). Le composant gère les deux cas : visuel si présent, aplat de marque sinon. N'inventez pas d'URL d'image.

```tsx
import { Section } from './Section';
import { articles } from '../../data/articles';
import { useI18n } from '../../context/I18nContext';
import { Newspaper, Play, ArrowUpRight } from 'lucide-react';

export function ArticlesSection() {
  const { t, language } = useI18n();
  const fr = language === 'fr';

  return (
    <Section title={t('sections.articles_title')} subtitle={t('sections.articles_desc')}>
      {articles.map((article) => (
        <a
          key={article.id}
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="bento-card hover-lift group p-0 row-span-2 md:col-span-2 md:row-span-2 bg-[#E9DEF8] overflow-hidden"
        >
          <div className="relative flex-1 min-h-0 w-full bg-[#6D4499]/10">
            {article.image ? (
              <img
                src={article.image}
                alt=""
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                {article.type === 'video' ? (
                  <Play size={30} className="text-[#6D4499]/45" />
                ) : (
                  <Newspaper size={30} className="text-[#6D4499]/45" />
                )}
              </div>
            )}
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#3B2356]/85 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 p-4">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/70">
                {article.source} · {article.date}
              </p>
              <h3 className="mt-1 text-[14px] font-black text-white leading-snug line-clamp-2">
                {fr ? article.titleFr : article.titleEn}
              </h3>
            </div>
            <div className="absolute top-3 right-3 w-7 h-7 rounded-lg bg-white/85 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight size={14} className="text-[#6D4499]" />
            </div>
          </div>
          <p className="px-5 py-4 text-[11px] font-medium text-[#3B2356]/75 leading-relaxed line-clamp-2">
            {fr ? article.excerptFr : article.excerptEn}
          </p>
        </a>
      ))}
    </Section>
  );
}
```

- [ ] **Step 2: Brancher dans `Home.tsx`**

Ajouter `<ArticlesSection />` après `<AwardsSection />`.

- [ ] **Step 3: Vérifier build et lint**

Run: `npm run build && npm run lint`
Expected: succès, 0 warning.

- [ ] **Step 4: Contrôle visuel**

Run: `npm run dev` puis cliquer chaque carte.
Expected: 3 cartes sur une rangée, chacune ouvrant son lien dans un nouvel onglet.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add press articles section"
```

---

### Task 16: Carte reco et aperçu sur la home

**Files:**
- Create: `src/components/common/RecommendationCard.tsx`
- Create: `src/components/sections/RecommendationsPreview.tsx`
- Modify: `src/pages/Home.tsx`

**Interfaces:**
- Consumes: `Recommendation` (Task 4), `Section` (Task 9)
- Produces: `export function RecommendationCard({ reco, expandable }: { reco: Recommendation; expandable?: boolean })`, `export function RecommendationsPreview()`

`RecommendationCard` est partagée entre la home (`expandable={false}`, texte tronqué) et la page dédiée (`expandable`, bouton Lire plus). Écrite ici, réutilisée en Tâche 18.

- [ ] **Step 1: Créer `RecommendationCard.tsx`**

```tsx
import { useState } from 'react';
import type { Recommendation } from '../../data/recommendations';
import { useI18n } from '../../context/I18nContext';
import { cn } from '../../lib/utils';
import { Quote } from 'lucide-react';

interface RecommendationCardProps {
  reco: Recommendation;
  expandable?: boolean;
  className?: string;
}

export function RecommendationCard({ reco, expandable = false, className }: RecommendationCardProps) {
  const { t, language } = useI18n();
  const [expanded, setExpanded] = useState(false);
  const [photoFailed, setPhotoFailed] = useState(false);

  const showPhoto = Boolean(reco.photo) && !photoFailed;
  const relationLabel = language === 'fr' ? reco.relationLabelFr : reco.relationLabelEn;

  return (
    <div className={cn('bento-card hover-lift bg-white/60', className)}>
      <div className="flex items-center gap-3 mb-3">
        {showPhoto ? (
          <img
            src={reco.photo}
            alt={reco.name}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-sm shrink-0"
            onError={() => setPhotoFailed(true)}
          />
        ) : (
          <div
            className="w-12 h-12 rounded-full ring-2 ring-white shadow-sm shrink-0 flex items-center justify-center bg-gradient-to-br from-[#C5A8E9] to-[#6D4499]"
            aria-hidden="true"
          >
            <span className="text-white font-display font-black text-sm">{reco.initials}</span>
          </div>
        )}
        <div className="min-w-0">
          <p className="text-[13px] font-black text-[#3B2356] truncate">{reco.name}</p>
          <p className="text-[10px] font-bold text-[#6D4499]/70 truncate">{reco.title}</p>
        </div>
      </div>

      <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#6D4499]/55 mb-2">
        {relationLabel} · {reco.date}
      </p>

      <div className="relative">
        <Quote size={14} className="absolute -left-0.5 -top-0.5 text-[#6D4499]/20" />
        <p
          className={cn(
            'text-[12px] leading-relaxed text-[#3B2356]/80 pl-5',
            !expanded && (expandable ? 'line-clamp-4' : 'line-clamp-3')
          )}
        >
          {reco.text}
        </p>
      </div>

      {expandable && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 self-start text-[11px] font-black text-[#6D4499] hover:text-[#3B2356] transition-colors"
        >
          {expanded ? t('recommendations.read_less') : t('recommendations.read_more')}
        </button>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Vérifier que `line-clamp` est disponible**

Run: `grep -n "line-clamp" src/ -r`
Expected: la classe est déjà utilisée dans `ProjectCard.tsx`. Tailwind 3.3+ l'inclut nativement — si le rendu ne tronque pas, ajoutez `@tailwindcss/line-clamp` aux plugins. Vérifiez visuellement plutôt que de supposer.

- [ ] **Step 3: Créer `RecommendationsPreview.tsx`**

```tsx
import { useNavigate } from 'react-router-dom';
import { Section } from './Section';
import { RecommendationCard } from '../common/RecommendationCard';
import { recommendations } from '../../data/recommendations';
import { useI18n } from '../../context/I18nContext';
import { ArrowRight } from 'lucide-react';

const PREVIEW_IDS = ['romain-lavielle', 'meryl-stretti', 'martin-ohresser'];

export function RecommendationsPreview() {
  const navigate = useNavigate();
  const { t } = useI18n();

  const preview = PREVIEW_IDS.map((id) => recommendations.find((r) => r.id === id)).filter(
    (r): r is NonNullable<typeof r> => r !== undefined
  );

  return (
    <Section title={t('sections.recos_title')} subtitle={t('sections.recos_desc')}>
      {preview.map((reco) => (
        <RecommendationCard
          key={reco.id}
          reco={reco}
          className="row-span-2 md:col-span-2 md:row-span-2"
        />
      ))}
      <button
        onClick={() => navigate('/recommendations')}
        className="bento-card hover-lift row-span-1 md:col-span-6 md:row-span-1 bg-[#C5A8E9] items-center justify-center flex-row gap-2 group"
      >
        <span className="text-sm font-black text-white uppercase tracking-widest">
          {t('sections.recos_cta')}
        </span>
        <ArrowRight size={16} className="text-white group-hover:translate-x-1 transition-transform" />
      </button>
    </Section>
  );
}
```

- [ ] **Step 4: Brancher dans `Home.tsx`**

Ajouter `<RecommendationsPreview />` après `<ArticlesSection />`, avant le bloc Contact.

- [ ] **Step 5: Vérifier build et lint**

Run: `npm run build && npm run lint`
Expected: succès, 0 warning. Le bouton vers `/recommendations` mènera à une page blanche tant que la Tâche 18 n'est pas faite — c'est attendu.

- [ ] **Step 6: Contrôle visuel**

Run: `npm run dev`
Expected: 3 cartes. Romain Lavielle affiche l'avatar initiales `RL` en dégradé violet, les deux autres leur photo.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add recommendations preview section"
```

---

## Phase 5 — Images plein cadre

### Task 17: ProjectCard bord à bord

**Files:**
- Modify: `src/components/common/ProjectCard.tsx`

**Interfaces:**
- Consumes: rien de nouveau
- Produces: signature `ProjectCard` inchangée

Règle de la spec : `object-cover` + `object-position: top`, dégradé sur le tiers bas, titre et description **par-dessus** l'image.

- [ ] **Step 1: Restructurer le rendu de `ProjectCard`**

Remplacer le corps de la fonction `ProjectCard` (le `return`) par la version ci-dessous. Conservez inchangés le haut du fichier : imports, `useState`, `imagesList`, `handleNextImg`, `handlePrevImg`, `desc`.

```tsx
  return (
    <div
      onClick={() => navigate(`/projects/${project.id}`)}
      className={cn(
        'bento-card hover-lift group h-full p-0 overflow-hidden cursor-pointer relative',
        className
      )}
      style={{ background: project.color }}
    >
      {/* Full-bleed visual */}
      <div className="absolute inset-0">
        {project.video ? (
          <video
            src={project.video}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-top"
          />
        ) : imagesList.length > 0 ? (
          <img
            src={imagesList[currentImgIdx]}
            alt={project.name}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-5xl font-black font-display text-white/25 uppercase">
              {project.name.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Legibility gradient */}
      <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/85 via-black/45 to-transparent pointer-events-none" />

      {/* External links */}
      <div className="absolute top-3 right-3 z-20 flex gap-1.5">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            aria-label={`${project.name} — GitHub`}
            className="p-2 rounded-xl bg-black/40 backdrop-blur-md hover:bg-black/60 text-white/90 hover:text-white transition-all"
          >
            <Github size={14} />
          </a>
        )}
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            aria-label={`${project.name} — site`}
            className="p-2 rounded-xl bg-black/40 backdrop-blur-md hover:bg-black/60 text-white/90 hover:text-white transition-all"
          >
            <ExternalLink size={14} />
          </a>
        )}
      </div>

      {/* Carousel controls */}
      {imagesList.length > 1 && (
        <>
          <div className="absolute inset-y-0 inset-x-0 z-20 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <button
              onClick={handlePrevImg}
              aria-label="Previous image"
              className="pointer-events-auto p-1.5 rounded-full bg-black/55 hover:bg-black/75 text-white backdrop-blur-sm transition-all active:scale-90"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={handleNextImg}
              aria-label="Next image"
              className="pointer-events-auto p-1.5 rounded-full bg-black/55 hover:bg-black/75 text-white backdrop-blur-sm transition-all active:scale-90"
            >
              <ChevronRight size={16} />
            </button>
          </div>
          <div className="absolute top-3 left-3 z-20 flex gap-1">
            {imagesList.map((_, i) => (
              <span
                key={i}
                className={cn(
                  'h-1 rounded-full transition-all',
                  i === currentImgIdx ? 'w-4 bg-white' : 'w-1.5 bg-white/45'
                )}
              />
            ))}
          </div>
        </>
      )}

      {/* Text over the image */}
      <div className="relative z-10 mt-auto p-5">
        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/65 mb-1 font-display">
          {project.tech}
        </p>
        <h3 className="text-xl font-black text-white font-display leading-tight">
          {project.name}
        </h3>
        <p className="mt-1.5 text-[11px] text-white/80 line-clamp-2 leading-relaxed font-medium">
          {desc}
        </p>
      </div>
    </div>
  );
```

- [ ] **Step 2: Vérifier build et lint**

Run: `npm run build && npm run lint`
Expected: succès, 0 warning.

- [ ] **Step 3: Contrôle visuel sur les deux pages**

Run: `npm run dev`, puis inspecter la home **et** `/projects`.
Expected sur la home : aucune bande de fond colorée visible autour des images, elles remplissent la carte. Le titre reste lisible sur le dégradé.
Expected sur `/projects` : les 24 cartes ont le même traitement. Vérifiez en particulier un projet sans image — il doit afficher l'initiale sur l'aplat de couleur, sans carte cassée.

- [ ] **Step 4: Commit**

```bash
git add src/components/common/ProjectCard.tsx
git commit -m "feat: make project card images full-bleed with overlaid text"
```

---

## Phase 6 — Page Recommandations

### Task 18: Page, route et lien header

**Files:**
- Create: `src/pages/Recommendations.tsx`
- Modify: `src/App.tsx`
- Modify: `src/components/layout/Header.tsx`

**Interfaces:**
- Consumes: `RecommendationCard` (Task 16), `recommendations` (Task 4)
- Produces: `export function Recommendations()`, route `/recommendations`

- [ ] **Step 1: Créer `src/pages/Recommendations.tsx`**

```tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { recommendations, type RecoRelation } from '../data/recommendations';
import { RecommendationCard } from '../components/common/RecommendationCard';
import { useI18n } from '../context/I18nContext';
import { cn } from '../lib/utils';
import { ArrowLeft, Linkedin } from 'lucide-react';

type Filter = 'all' | RecoRelation;

export function Recommendations() {
  const navigate = useNavigate();
  const { t } = useI18n();
  const [filter, setFilter] = useState<Filter>('all');

  const filters: { id: Filter; labelKey: string }[] = [
    { id: 'all', labelKey: 'recommendations.filter_all' },
    { id: 'mentor', labelKey: 'recommendations.filter_mentor' },
    { id: 'manager', labelKey: 'recommendations.filter_manager' },
    { id: 'teacher', labelKey: 'recommendations.filter_teacher' },
    { id: 'peer', labelKey: 'recommendations.filter_peer' },
  ];

  const countFor = (id: Filter) =>
    id === 'all' ? recommendations.length : recommendations.filter((r) => r.relation === id).length;

  const visible =
    filter === 'all' ? recommendations : recommendations.filter((r) => r.relation === filter);

  return (
    <>
      <main className="relative z-10 max-w-[1080px] mx-auto px-6 py-12">
        <div className="page-enter">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#6D4499] hover:text-[#3B2356] transition-all mb-8 bg-white/40 hover:bg-white/60 px-4 py-2 rounded-xl shadow-sm hover:-translate-x-1"
          >
            <ArrowLeft size={16} /> {t('recommendations.back')}
          </button>

          <h1 className="text-4xl md:text-5xl font-black font-display tracking-tight text-[#3B2356]">
            {t('recommendations.title')}
          </h1>
          <p className="mt-3 text-sm font-semibold text-[#6D4499]/75 max-w-xl leading-relaxed">
            {t('recommendations.desc')}
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={cn(
                  'px-4 py-2 rounded-xl text-xs font-black transition-all',
                  filter === f.id
                    ? 'bg-[#6D4499] text-white shadow-sm'
                    : 'bg-white/45 text-[#6D4499] hover:bg-white/70'
                )}
              >
                {t(f.labelKey)} <span className="opacity-60">{countFor(f.id)}</span>
              </button>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {visible.map((reco) => (
              <RecommendationCard key={reco.id} reco={reco} expandable />
            ))}
          </div>

          <a
            href="https://www.linkedin.com/in/moussandou/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-12 mx-auto flex w-fit items-center gap-2 px-6 py-3 rounded-2xl bg-[#6D4499] text-white text-sm font-black hover:bg-[#4F2D7F] transition-colors shadow-lg"
          >
            <Linkedin size={16} /> {t('recommendations.linkedin_cta')}
          </a>
        </div>
      </main>

      <footer className="py-10 text-center">
        <p className="text-xs font-black uppercase tracking-[0.25em] text-[#3B2356]/25 font-display">
          © 2026 Moussandou Mroivili
        </p>
      </footer>
    </>
  );
}
```

- [ ] **Step 2: Déclarer la route dans `App.tsx`**

Ajouter l'import `import { Recommendations } from './pages/Recommendations';` et la route, avant celle de `/contact` :

```tsx
            <Route path="/recommendations" element={<Recommendations />} />
```

- [ ] **Step 3: Ajouter le lien au header**

Dans `src/components/layout/Header.tsx`, les entrées de navigation sont déclarées **deux fois** — une pour le desktop (~ligne 66), une pour le mobile (~ligne 129). Modifiez **les deux** tableaux à l'identique :

```tsx
([['/', 'header.home'], ['/projects', 'header.projects'], ['/recommendations', 'header.recommendations'], ['/contact', 'header.contact']] as const)
```

- [ ] **Step 4: Vérifier build et lint**

Run: `npm run build && npm run lint`
Expected: succès, 0 warning.

- [ ] **Step 5: Contrôle visuel complet**

Run: `npm run dev`
Expected:
- Le header montre 4 liens en desktop et 4 dans le menu mobile.
- `/recommendations` affiche 12 cartes ; les compteurs de filtres indiquent 12 / 4 / 2 / 2 / 4.
- Chaque filtre renvoie le bon nombre de cartes.
- « Lire plus » déplie le texte et devient « Réduire ».
- Romain Lavielle et Majdi Rabia affichent `RL` et `MR` ; les 10 autres leur photo.
- Le switch FR/EN traduit l'interface ; les citations restent en anglais — c'est voulu.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add recommendations page with relation filters"
```

---

## Phase 7 — Finitions

### Task 19: Contraste, responsive et vérification finale

**Files:**
- Modify: selon les constats, principalement `src/data/brands.ts` et `src/styles/globals.css`

- [ ] **Step 1: Vérifier le contraste des cartes de marque**

Ouvrez la home, puis pour chaque carte-organisation, contrôlez le ratio texte/fond avec les DevTools (inspecter le texte → panneau Accessibilité → Contrast).
Expected: ≥ 4,5:1 pour tout corps de texte.
Les deux cas à surveiller d'après la spec : **GDG** (texte `#202124` sur `#FFFFFF`, doit passer largement) et **Bingeki** (`#111111` sur `#F5F0E6`, doit passer). Le point réellement risqué est `--brand-muted` sur les fonds sombres : `rgba(255,255,255,0.65)` sur `#0B1E2D` est limite. Si un ratio échoue, montez l'opacité du `muted` de la marque concernée à `0.78` dans `brands.ts` — ne changez pas la couleur de fond, elle porte l'identité.

- [ ] **Step 2: Vérifier le responsive**

Dans les DevTools, tester les largeurs 320, 375, 768, 1024, 1440 px.
Expected: aucun défilement horizontal à aucune largeur. En mobile, chaque carte occupe toute la largeur. Les titres de section restent lisibles.

Si un débordement apparaît, la cause la plus probable est une carte avec `md:col-span-*` sans classe mobile correspondante — vérifiez que chaque carte a bien un `row-span-*` de base.

- [ ] **Step 3: Vérifier le mouvement réduit**

Dans les DevTools → Rendering → « Emulate CSS prefers-reduced-motion: reduce ».
Expected: le hover d'élévation ne déplace plus les cartes, les animations d'entrée sont instantanées.

- [ ] **Step 4: Vérification finale**

Run: `npm run build && npm run lint`
Expected: build réussi, 0 erreur, 0 warning.

- [ ] **Step 5: Parcourir tous les critères d'acceptation de la spec**

Reprendre le §13 de `docs/superpowers/specs/2026-08-03-refonte-home-portfolio-design.md` point par point et vérifier chacun à l'écran.

- [ ] **Step 6: Commit final**

```bash
git add -A
git commit -m "style: fix brand card contrast and responsive edge cases"
```

---

## Auto-revue du plan

**Couverture de la spec** — chaque section de la spec a sa tâche : §4.1 → T1, §4.2 → T5, §4.3 → T2, §4.4 → T3, §4.5 → T4, §5.1 → T10, §5.2 → T12, §5.3 → T13, §5.4 → T14, §5.5 → T15, §5.6 → T16, §5.7 → conservé en T10, §5.8 → T17, §5.9 → T6, §6 → T18, §7 → T18, §8 → T11, §11 (contraste, responsive) → T19.

**Cohérence des types** — `Brand.fontKey` défini en T1 et consommé en T7 ; `Organization.span` (`2 | 3 | 4`) défini en T5 et indexé par `SPAN_CLASS` en T12 avec les mêmes clés ; `RecoRelation` défini en T4 et réutilisé comme `Filter` en T18 ; `getAwardsByIds`/`getArticlesByIds` définis en T2/T3 et consommés en T8.

**Points d'attention connus, déjà traités dans les steps** — le logo `st.png` vs `st.jpg` (T2 step 2), l'id `hec-paris-edu` et non `hec` dans `education.ts` (T5 step 2), les deux tableaux de navigation du header (T18 step 3), la disponibilité de `line-clamp` (T16 step 2).
