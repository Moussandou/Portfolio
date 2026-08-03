# Refonte de la page principale — Design

Date : 2026-08-03
Statut : validé en brainstorming, prêt pour le plan d'implémentation

## 1. Objectif

La home présente aujourd'hui le parcours sous forme de listes empilées dans trois cartes
violettes génériques (`EducationCard`, `ExperienceCard`, `VolunteerCard`). Rien ne distingue
Epitech de HEC, ni Taker de Bingeki : tout se ressemble et rien ne ressort.

La refonte remplace ces listes par des **cartes-organisations aux couleurs de chaque marque**,
regroupe le contenu en **sections thématiques titrées**, et ajoute deux thèmes aujourd'hui
absents du site alors qu'ils sont les plus valorisants : les **prix et distinctions** et les
**articles de presse**. Une page **Recommandations** est créée, alimentée par les 12
recommandations LinkedIn.

## 2. Décisions validées

| Sujet | Décision |
|---|---|
| Structure de la home | Sections thématiques empilées (abandon du bento uniforme) |
| Branding des cartes | Plein branding **et** géométrie propre à chaque marque |
| Modèle de données | Une carte = une organisation, qui agrège tout ce qui s'y rattache |
| Sections retenues | Hero · Parcours · Projets phares · Prix & certifications · Articles · Recommandations · Contact |
| Certifications | Pas de section dédiée : fusionnées dans « Prix, distinctions & certifications » |
| Traitement des images | Bord à bord, cadrage depuis le haut, texte par-dessus sur dégradé |
| Photos recos manquantes | Avatar initiales pour Romain Lavielle et Majdi Rabia, remplacé automatiquement si la photo est déposée |
| Effet magnétique BentoGrid | Retiré, remplacé par un hover d'élévation par carte |

## 3. Le garde-fou du branding

Le plein branding avec géométrie libre est le choix le plus expressif et le plus risqué : sans
règle, la page devient un patchwork. La règle qui l'encadre :

> **Chaque carte est libre à l'intérieur de son rectangle. Les rectangles ne le sont pas.**

**Varie par marque** : couleur de fond, couleur de texte, couleur d'accent, `border-radius`,
bordure, ombre, famille typographique, texture de fond.

**Ne varie jamais** : largeur max de page (1080px), nombre de colonnes, gouttières, hauteur des
cartes d'une même rangée, style des titres de section, rythme vertical entre sections.

La cohérence vient de la charpente, pas des cartes.

## 4. Architecture des données

### 4.1 `src/data/brands.ts` (nouveau)

```ts
export interface Brand {
  id: string;
  name: string;
  logo?: string;              // absent → carte typographique
  bg: string;
  fg: string;
  muted: string;
  accent: string;
  accentAlt?: string;         // seconde couleur d'accent (Bingeki, GDG)
  radius: string;
  border: string;
  shadow: string;
  fontKey: 'display' | 'serif' | 'mono';
  texture: 'grid' | 'dots' | 'none';
}
```

Les valeurs sont relevées sur les logos réels de `public/assets/logos/`, pas inventées.

| id | bg | fg | accent | radius | border | shadow | font | texture |
|---|---|---|---|---|---|---|---|---|
| `epitech` | `#0B1E2D` | `#FFFFFF` | `#0091CE` | `20px` | `none` | `0 12px 32px rgba(0,145,206,.22)` | display | grid |
| `hec` | `#06427C` | `#FFFFFF` | `#C8A45C` | `28px` | `1px solid rgba(200,164,92,.4)` | `0 12px 32px rgba(6,66,124,.25)` | serif | none |
| `yeungnam` | `#05468C` | `#FFFFFF` | `#E8442E` | `24px` | `none` | `0 12px 32px rgba(5,70,140,.25)` | display | none |
| `taker` | `#10243D` | `#FFFFFF` | `#5BC8E0` | `16px` | `none` | `0 12px 32px rgba(16,36,61,.28)` | display | dots |
| `bingeki` | `#F5F0E6` | `#111111` | `#FF2E88` / alt `#00D9E0` | `0px` | `4px solid #000` | `8px 8px 0 #000` | display | none |
| `gdg` | `#FFFFFF` | `#202124` | `#4285F4` | `24px` | `2px solid #202124` | `0 12px 32px rgba(32,33,36,.14)` | display | none |
| `devid` | `#0E2A33` | `#FFFFFF` | `#3ECFB2` | `20px` | `none` | `0 12px 32px rgba(14,42,51,.26)` | display | none |

`texture` est un calque en `::before` posé sur le fond, en opacité 0,06 : `grid` est un quadrillage
de 24px en `repeating-linear-gradient`, `dots` une trame de points de 3px en `radial-gradient`,
`none` désactive le calque. Aucune image n'est nécessaire.

Les organisations compactes (ES Digital, Icom'Provence, Lacordaire, Article 1, Saint-Exupéry,
L'Olivier Bleu) utilisent une entrée `neutral` reprenant la palette violette du site avec un
liseré d'accent.

`fontKey` mappe sur les familles **déjà chargées** : `display` → Outfit, `mono` → Share Tech
Mono, `serif` → pile système `ui-serif, Georgia, serif`. Aucune webfont supplémentaire n'est
ajoutée — le gain visuel ne justifierait pas le coût de chargement.

Les cartes consomment ces tokens via **CSS custom properties** (`--brand-bg`, `--brand-radius`,
`--brand-shadow`…) posées en style inline sur la carte. Pas de `switch` par marque dans le JSX :
`BrandCard` reste un composant unique et lisible.

### 4.2 `src/data/organizations.ts` (nouveau)

`education.ts` et `experience.ts` restent la **source de vérité**. `organizations.ts` ne duplique
aucune donnée : il référence par id.

```ts
export interface Organization {
  id: string;
  brandId: string;
  headlineFr: string;  headlineEn: string;
  periodFr: string;    periodEn: string;
  educationIds: string[];
  experienceIds: string[];
  volunteerIds: string[];
  awardIds: string[];
  articleIds: string[];
  certificationIds: string[];
  projectIds: string[];
  featured: boolean;
  span: 2 | 3 | 4;     // colonnes occupées sur la grille de 6
}
```

Bénéfice : ajouter une ligne de CV se fait dans un seul fichier et la carte se met à jour seule ;
une même expérience ne peut pas diverger entre deux endroits de la page.

**Organisations en vedette** (cartes pleines) :

- `epitech` (span 4) — formation PGE 2023-2028, Étudiant Ambassadeur, International Ambassador, article I-NOVGAMES, certification I-NOVGAMES
- `yeungnam` (span 2) — échange académique 2026-2027
- `taker` (span 3) — Chargé d'affaires, Prix Meilleure Étude en Ingénierie, certification interne 195/215, Top 30 JE de France
- `hec` (span 3) — certificat AI Entrepreneurship (10 ECTS), article epitech.eu, projet Pep
- `devid` (span 3) — stage Web & Mobile, React Native
- `gdg` (span 3) — Job Board, bot Discord

**Organisations compactes** (lignes, pas de cartes) : `es-digital`, `icom`, `lacordaire`,
`article1`, `saint-ex`, `olivier-bleu`.

Dev-id n'a pas de logo disponible : sa carte est **typographique** (nom en grand sur fond de
marque). Le jour où un logo est ajouté, il se pose dans l'emplacement prévu sans changement de
code.

Bingeki n'apparaît **pas** dans Parcours : le rôle de fondateur est affiché sur la carte projet
Bingeki de la section Projets phares, ce qui évite de présenter deux fois la même chose.

### 4.3 `src/data/awards.ts` (nouveau)

```ts
export interface Award {
  id: string;
  type: 'award' | 'certification';
  titleFr: string;  titleEn: string;
  issuer: string;
  date: string;
  descFr: string;   descEn: string;
  link?: string;
  logo?: string;
  organizationId?: string;
}
```

10 entrées — 5 prix, 5 certifications :

| id | type | titre | émetteur | date |
|---|---|---|---|---|
| `prix-meilleure-etude` | award | Prix de la Meilleure Étude en Ingénierie | CNJE × ALTEN | 2026 |
| `design-prize-inovgames` | award | Design Prize I-NOVGAMES (MedBuddy) | I-NOVGAMES / STMicroelectronics | avr. 2026 |
| `taker-certif-interne` | award | Certification interne — 195/215, meilleur score de la promo | Junior Conseil Taker | 2026 |
| `taker-top30` | award | Entrée dans le Top 30 des Junior-Entreprises de France | CNJE | 2026 |
| `prix-python-lycee` | award | 1er prix au concours local de programmation Python | Lycée Saint-Exupéry | 2023 |
| `hec-entrepreneuriat` | certification | AI Entrepreneurship Certificate (10 ECTS) | HEC Paris | mai 2026 |
| `inovgames` | certification | I-NOVGAMES 2025-2026 | Campus d'Excellence Industrie du futur | 2026 |
| `mantu` | certification | The Mantu Manager Program | Mantu | 2025 |
| `hacktogone` | certification | Hackathon Agent AI | HACKTOGONE | 2025 |
| `cambridge-b2` | certification | Anglais B2 | Cambridge Assessment English | 2023 |

Les 5 certifications reprennent celles de `certifications` dans `education.ts` (liens
openbadgefactory et credsverse inclus). `certifications` est supprimé de `education.ts` au profit
de `awards.ts` — une seule source pour cette information.

### 4.4 `src/data/articles.ts` (nouveau)

```ts
export interface Article {
  id: string;
  type: 'press' | 'video';
  source: string;
  date: string;
  titleFr: string;   titleEn: string;
  excerptFr: string; excerptEn: string;
  url: string;
  image?: string;
  organizationId?: string;
}
```

3 entrées :

1. `inovgames-epitech` — press — epitech.eu — 9 avr. 2026 — « Epitech lauréat I-NOVGAMES : un projet étudiant innovant au service de la santé » — <https://www.epitech.eu/2026/04/09/epitech-laureat-i-novgames-projet-etudiant-innovant-sante/>
2. `hec-epitech` — press — epitech.eu — 3 mai 2026 — « AI Entrepreneurship Certificate — HEC Paris × Epitech » — <https://www.epitech.eu/2026/05/03/ai-entrepreneurship-certification-hec-epitech/>
3. `youtube-pep` — video — YouTube — 2026 — <https://www.youtube.com/watch?v=UlH2Y2J7o7I>

### 4.5 `src/data/recommendations.ts` (nouveau)

```ts
export interface Recommendation {
  id: string;
  name: string;
  title: string;                     // intitulé professionnel, VO
  relation: 'mentor' | 'manager' | 'teacher' | 'peer';
  relationLabelFr: string;
  relationLabelEn: string;
  date: string;
  text: string;                      // texte intégral, version originale
  photo?: string;                    // /Portfolio/assets/reco/<slug>.png
  initials: string;                  // fallback si la photo est absente
}
```

12 entrées :

| id | nom | relation | date | photo |
|---|---|---|---|---|
| `romain-lavielle` | Romain Lavielle | mentor | 11 juin 2026 | absente → `RL` |
| `majdi-rabia` | Majdi Rabia | mentor | 10 juin 2026 | absente → `MR` |
| `isabelle-gastaldi` | Isabelle Gastaldi | mentor | 28 mai 2026 | `isabelle.png` |
| `olivier-ravut` | Olivier Ravut | mentor | 27 mai 2026 | `olivier.png` |
| `yanis-zacharia-picard` | Yanis Zacharia Picard | peer | 21 mai 2026 | `zacharia.png` |
| `theo-gaillardon` | Théo Gaillardon | teacher | 21 mai 2026 | `theo.png` |
| `nabeel-chauhan` | Nabeel Chauhan | peer | 20 mai 2026 | `nabeel.png` |
| `martin-ohresser` | Martin OHRESSER | teacher | 20 mai 2026 | `martin.png` |
| `meryl-stretti` | Méryl Stretti | manager | 20 mai 2026 | `meryl.png` |
| `maxime-finaud` | Maxime Finaud | peer | 20 mai 2026 | `maxime.png` |
| `charles-duprat` | Charles Duprat | manager | 16 déc. 2025 | `charles.png` |
| `naima-sarhan` | Naïma Sarhan | peer | 8 oct. 2025 | `naima.png` |

Les textes sont conservés **en version originale** (majoritairement anglais). Traduire une
citation la falsifie : seule l'interface est bilingue.

Source des photos : `~/Cowork Station/Code/recommandation/`, copiées vers
`public/assets/reco/<slug>.png`.

## 5. Layout de la home

Grille inchangée : 6 colonnes desktop, 1080px max, gouttières 32px, 1 colonne en mobile.
Nouveauté : la grille est découpée en sections titrées au lieu d'une nappe continue.

Répartition des responsabilités entre les deux composants de structure :

- `BentoGrid` conserve la définition de la grille (colonnes, gouttières, `auto-rows`) et perd son
  effet magnétique. Il ne rend plus qu'un conteneur de grille.
- `Section` rend le titre, le sous-titre et le rythme vertical, puis délègue la grille à
  `BentoGrid`. Toutes les sections l'utilisent, ce qui garantit que le pas de la grille est
  identique partout.

### 5.1 Hero

Bloc identité étendu (4 col) + carte avatar / réseaux / CV (2 col), repris tel quel de la home
actuelle : marquee de skills, badge « Disponible », dégradés de bord. En dessous, `StatusCard`
et `GithubCard` en 3 colonnes chacune.

### 5.2 Parcours & Organisations

```
┌──────────────────────────┐ ┌────────────┐
│  EPITECH          (4)    │ │ YEUNGNAM(2)│
└──────────────────────────┘ └────────────┘
┌───────────────┐ ┌───────────────┐
│  TAKER    (3) │ │  HEC      (3) │
└───────────────┘ └───────────────┘
┌───────────────┐ ┌───────────────┐
│  DEV-ID   (3) │ │  GDG      (3) │
└───────────────┘ └───────────────┘
 · ES Digital  · Icom'Provence  · Lacordaire
 · Article 1   · Saint-Exupéry  · L'Olivier Bleu
```

Anatomie d'une carte-organisation :

```
┌────────────────────────────────────┐
│ [logo]                2023 — 2028  │
│                                    │
│ EPITECH                            │  typo de la marque
│ Expert en Technologies de l'Info.  │  headline
│                                    │
│ ▸ Formation PGE · Bac+5            │
│ ▸ Étudiant Ambassadeur             │  items agrégés
│ ▸ International Ambassador  🇰🇷     │
│ 🏆 Design Prize I-NOVGAMES          │  les prix ressortent
│ 📰 Article epitech.eu           ↗  │  seul élément cliquable
│                                    │
│ ⟨C⟩ ⟨C++⟩ ⟨Git⟩ ⟨Unix⟩              │
└────────────────────────────────────┘
```

Les cartes ne sont **pas** cliquables dans leur ensemble : il n'existe pas de page
`/organizations/:id`. Seuls les liens externes le sont.

### 5.3 Projets phares

```
┌──────────────────────────┐ ┌────────────┐
│  BINGEKI (4)  brutalist  │ │ SEORAK (2) │
└──────────────────────────┘ └────────────┘
┌────────────┐ ┌──────────────────────────┐
│  PEP   (2) │ │  → TOUS MES PROJETS (4)  │
└────────────┘ └──────────────────────────┘
```

Bingeki applique son design system documenté : `radius: 0`, bordure noire 4px, ombre décalée
`8px 8px 0 #000`, hot pink et cyan. Sa capture est en plein cadre avec le traitement décrit en
§5.7. La carte affiche aussi le rôle « Fondateur & Développeur principal · déc. 2025 → ».

`AllProjectsCard` est conservée et renvoie vers `/projects`, page inchangée.

### 5.4 Prix, distinctions & certifications

Grille de 10 vignettes compactes en 3 colonnes. Chacune : logo de l'émetteur, titre, émetteur,
date, et un badge distinguant 🏆 prix de 🎓 certification. Lien externe quand `link` est présent.

### 5.5 Articles & Publications

3 cartes presse de 2 colonnes chacune : image en plein cadre avec dégradé, source + date, titre,
extrait 2 lignes, lien externe. La vidéo YouTube porte un badge ▶ distinct.

### 5.6 Recommandations — aperçu

3 recommandations choisies pour couvrir trois angles : `romain-lavielle` (mentor HEC),
`meryl-stretti` (manager GDG), `martin-ohresser` (professeur Epitech). Chacune : photo ronde,
nom, intitulé, relation, extrait 3 lignes. CTA « Voir les 12 recommandations » vers
`/recommendations`.

### 5.7 Contact

Le grand CTA violet actuel, conservé tel quel.

### 5.8 Traitement des images

Règle appliquée partout où une carte porte un visuel (projets, articles, organisations) :

- `object-fit: cover` + `object-position: top` — l'image remplit la carte, le rognage se fait par
  le bas, ce qui préserve le haut des captures d'interface où se trouve l'essentiel.
- Dégradé sombre sur le tiers bas de l'image.
- Titre, technologies et description **par-dessus** l'image sur ce dégradé, au lieu d'être dans
  une zone séparée sous une image contenue.
- Ratio minimum de carte garanti pour éviter les bandes trop écrasées en mobile.

### 5.9 Interactions

L'effet magnétique de `BentoGrid` est retiré : avec des cartes portant leurs propres ombres
décalées et bordures épaisses, le déplacement mutuel devient visuellement sale, et l'effet
traverse les frontières de section alors que les sections sont des blocs distincts.

Remplacement : hover par carte — élévation de 4px, ombre renforcée, transition 300ms. Respect de
`prefers-reduced-motion`.

## 6. Page `/recommendations`

```
      ← Retour à l'accueil

      Ce qu'on dit de moi
      12 recommandations LinkedIn — mentors, managers,
      professeurs et coéquipiers.

      [ Toutes 12 ] [ Mentors 4 ] [ Managers 2 ]
      [ Professeurs 2 ] [ Équipe & pairs 4 ]

┌─────────────────────────┐ ┌─────────────────────────┐
│ (◕)  Romain Lavielle    │ │ (◕)  Méryl Stretti      │
│      Mentor · juin 2026 │ │      Manager · mai 2026 │
│                         │ │                         │
│ " I've been coaching    │ │ " Moussandou joined the │
│   Moussandou during the │ │   GDG Marseille team    │
│   … "         Lire plus │ │   … "        Lire plus  │
└─────────────────────────┘ └─────────────────────────┘
```

- **Filtres par relation**, même mécanique que les filtres de `/projects` : Toutes (12) ·
  Mentors (4) · Managers (2) · Professeurs (2) · Équipe & pairs (4).
- **Troncature** : clamp à 4 lignes, bouton « Lire plus » qui déplie sur place. Plusieurs recos
  font 10 lignes ; sans clamp la grille est illisible.
- **Photos** : `<img>` avec `onError` basculant sur un avatar initiales en dégradé violet, même
  diamètre et même anneau blanc. Déposer `romain-lavielle.png` dans `public/assets/reco/` suffit
  à afficher la vraie photo, sans modification de code.
- **CTA final** vers le profil LinkedIn. Pas de lien vers les profils individuels : leurs URLs ne
  sont pas connues et les inventer serait pire que de ne rien mettre.

## 7. Header et routing

Un lien ajouté : `Accueil · Projets · Recommandations · Contact`, plus le switch FR/EN inchangé.
Route `/recommendations` (en anglais, cohérent avec `/projects` et `/contact`). Le menu mobile
existant absorbe l'entrée sans modification structurelle.

## 8. Internationalisation

Toutes les chaînes d'interface nouvelles passent par `translations.ts` (FR + EN) : titres et
sous-titres de section, libellés de filtres, « Lire plus », CTA. Les données bilingues suivent la
convention existante en `xxxFr` / `xxxEn`.

Exception assumée : le corps des recommandations reste en VO.

## 9. Fichiers touchés

**Créés**

- `src/data/brands.ts`
- `src/data/organizations.ts`
- `src/data/awards.ts`
- `src/data/articles.ts`
- `src/data/recommendations.ts`
- `src/components/brand/BrandCard.tsx` — carte-organisation générique pilotée par tokens
- `src/components/brand/BrandAvatar.tsx` — logo ou fallback typographique
- `src/components/sections/Section.tsx` — titre + sous-titre + grille, rythme uniforme
- `src/components/sections/JourneySection.tsx`
- `src/components/sections/FeaturedProjectsSection.tsx`
- `src/components/sections/AwardsSection.tsx`
- `src/components/sections/ArticlesSection.tsx`
- `src/components/sections/RecommendationsPreview.tsx`
- `src/components/common/RecommendationCard.tsx`
- `src/pages/Home.tsx` — extraction de la home aujourd'hui inline dans `App.tsx`
- `src/pages/Recommendations.tsx`
- `public/assets/reco/*.png` — 10 photos copiées depuis `~/Cowork Station/Code/recommandation/`

**Modifiés**

- `src/App.tsx` — ne garde que le routeur et les providers
- `src/components/layout/Header.tsx` — lien Recommandations
- `src/components/layout/BentoGrid.tsx` — suppression de l'effet magnétique
- `src/components/common/ProjectCard.tsx` — image plein cadre, variante brandée
- `src/data/education.ts` — suppression du tableau `certifications`, migré vers `awards.ts`
- `src/data/translations.ts` — chaînes des nouvelles sections et de la page recos
- `src/styles/globals.css` — utilitaires de tokens de marque, textures, hover d'élévation

**Supprimés**

- `src/components/common/EducationCard.tsx`
- `src/components/common/ExperienceCard.tsx`
- `src/components/common/VolunteerCard.tsx`

Ces trois composants ne sont utilisés que dans la home actuelle ; `BrandCard` les remplace.

## 10. Hors périmètre

- Pas de page détail par organisation.
- Pas de scraping LinkedIn — authentification requise et interdit par les CGU.
- Pas de backend ni de CMS : les données restent des fichiers TypeScript statiques.
- Pas de refonte de `/projects`, `/projects/:id` ni `/contact`, hors effet de bord du §5.8.

## 11. Points de vigilance

**Travail non commité.** Le dépôt contient des modifications en cours sur `ProjectCard.tsx`,
`projects.ts` (5 projets ajoutés) et `ProjectList.tsx` (filtres). Elles doivent être commitées
avant de démarrer : l'implémentation s'appuie dessus au lieu de les écraser.

**Effet de bord sur `/projects`.** `ProjectCard` est partagée : le nouveau traitement d'image
change aussi l'apparence des 24 cartes de la page projets. C'est cohérent avec la demande, mais
c'est un changement visible non demandé explicitement sur cette page.

**Contraste et accessibilité.** Le plein branding produit des paires de couleurs très variées.
Chaque combinaison texte/fond doit atteindre un ratio de contraste AA (4,5:1 pour le corps de
texte). Le cas le plus tendu est GDG, texte sombre sur fond blanc avec accents quadri, et
Bingeki, noir sur papier.

**Densité de la carte Epitech.** C'est l'organisation qui agrège le plus d'éléments (formation,
deux rôles d'ambassadeur, un article, une certification). Si la carte déborde, la règle est de
limiter l'affichage aux 5 items les plus significatifs plutôt que d'agrandir la carte et de
casser la rangée.

**Deux photos manquantes.** Romain Lavielle et Majdi Rabia s'affichent en avatar initiales tant
que les fichiers ne sont pas déposés dans `public/assets/reco/`.

## 12. Découpage suggéré pour le plan

L'ensemble touche une vingtaine de fichiers. Un ordre qui laisse le site fonctionnel à chaque
étape :

1. **Socle données** — `brands.ts`, `organizations.ts`, `awards.ts`, `articles.ts`,
   `recommendations.ts`, migration des `certifications` hors de `education.ts`. Aucun rendu ne
   change encore.
2. **Socle rendu** — `Section.tsx`, `BrandCard.tsx`, `BrandAvatar.tsx`, tokens CSS, suppression
   de l'effet magnétique de `BentoGrid`.
3. **Extraction de la home** — `Home.tsx` sorti de `App.tsx`, à rendu identique.
4. **Sections, une par une** — Parcours, puis Projets phares, Prix, Articles, aperçu
   Recommandations. Chaque section remplace le bloc correspondant de l'ancienne home ; les
   anciennes cartes ne sont supprimées qu'une fois leur remplaçante en place.
5. **Traitement des images** — `ProjectCard` en plein cadre, avec vérification sur `/projects`.
6. **Page Recommandations** — copie des photos, `Recommendations.tsx`, route, lien header.
7. **Finitions** — contraste AA, responsive 320→1440px, `build` et `lint`.

## 13. Critères d'acceptation

1. La home ne contient plus aucune carte-liste générique : chaque organisation a sa propre carte
   aux couleurs de sa marque.
2. Les sections sont visuellement séparées et titrées, dans l'ordre : Hero, Parcours, Projets
   phares, Prix & certifications, Articles, Recommandations, Contact.
3. Aucune carte portant un visuel ne laisse de vide autour de l'image : toutes remplissent leur
   cadre bord à bord.
4. La carte Bingeki applique sa géométrie brutaliste, visuellement distincte des cartes voisines.
5. `/recommendations` affiche les 12 recommandations, filtrables par relation, avec les 10 photos
   disponibles et 2 avatars initiales.
6. Le header propose Recommandations en desktop et en mobile, en FR et en EN.
7. `npm run build` et `npm run lint` passent sans erreur ni warning.
8. La page ne défile pas horizontalement entre 320px et 1440px de large.
