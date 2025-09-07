#!/usr/bin/env bash
set -euo pipefail

# ---------- Helpers ----------
ask() {
  local prompt="$1"
  local default="${2:-}"
  local answer
  if [ -n "$default" ]; then
    read -r -p "$prompt [$default]: " answer || true
    echo "${answer:-$default}"
  else
    read -r -p "$prompt: " answer || true
    echo "$answer"
  fi
}

# ---------- Metadata (prompts) ----------
AUTHOR_NAME=$(ask "Votre nom complet" "")
ROLE=$(ask "Votre rôle (ex: Développeur Web & Logiciel, Étudiant à Epitech Marseille)" "Développeur Web & Logiciel – Étudiant à Epitech")
CITY=$(ask "Votre ville" "Marseille")
EMAIL=$(ask "Email" "moussandou.mroivili@epitech.eu")
PHONE=$(ask "Téléphone" "07 81 63 32 78")
LINKEDIN=$(ask "URL LinkedIn" "https://www.linkedin.com/in/moussandou/")
GITHUB=$(ask "URL GitHub (facultatif)" "")
SITE_TITLE=$(ask "Titre du site (balise <title>)" "$AUTHOR_NAME — Portfolio")
TAGLINE=$(ask "Baseline (accueil, sous le nom)" "Je conçois des sites et apps sobres, rapides et maintenables.")
ACCENT=$(ask "Couleur d’accent (hex)" "#4f46e5")

# ---------- Tree ----------
mkdir -p assets/css assets/js assets/img/projects pages partials data scripts

# ---------- index.html ----------
cat > index.html <<'HTML'
<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="description" content="Portfolio — développement web et logiciel" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="assets/css/fonts.css">
    <link rel="stylesheet" href="assets/css/main.css">
    <title><!--SITE_TITLE--></title>
  </head>
  <body>
    <header data-include="partials/header.html"></header>

    <main class="container">
      <section class="hero reveal">
        <h1 class="hero__title"><!--AUTHOR_NAME--></h1>
        <p class="hero__role"><!--ROLE--></p>
        <p class="hero__tagline"><!--TAGLINE--></p>
        <div class="hero__cta">
          <a class="btn btn--primary" href="pages/projets.html">Voir mes projets</a>
          <a class="btn" href="pages/cursus.html">Mon cursus</a>
        </div>
      </section>

      <section class="grid-2 gap-xl mt-xxl">
        <div class="card reveal">
          <h2 class="h3">Ce que je fais</h2>
          <ul class="list">
            <li>Création et refonte de sites (WordPress, HTML/CSS/JS)</li>
            <li>Développement d’applications et scripts</li>
            <li>Automatisation (API, N8n) et intégrations</li>
            <li>Optimisation, maintenance et formation</li>
          </ul>
        </div>
        <div class="card reveal">
          <h2 class="h3">Compétences</h2>
          <p>C, C++, Python, JavaScript, SQL, HTML/CSS, Haskell, Assembleur. Git, Linux/Windows, WordPress, Node.js (basique), CSFML, N8n.</p>
        </div>
      </section>

      <section class="mt-xxl reveal">
        <h2 class="h3 mb-m">Sélection de projets</h2>
        <div id="projects-home" class="cards"></div>
        <div class="mt-m">
          <a class="btn" href="pages/projets.html">Tous les projets</a>
        </div>
      </section>
    </main>

    <footer data-include="partials/footer.html"></footer>
    <script src="assets/js/base.js"></script>
    <script src="assets/js/projects.js"></script>
  </body>
</html>
HTML

# ---------- pages/cursus.html ----------
cat > pages/cursus.html <<'HTML'
<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <link rel="stylesheet" href="../assets/css/fonts.css">
    <link rel="stylesheet" href="../assets/css/main.css">
    <title>Cursus — <!--AUTHOR_NAME--></title>
  </head>
  <body>
    <header data-include="../partials/header.html" data-base="../"></header>
    <main class="container">
      <section class="reveal">
        <h1 class="h2 mb-l">Mon cursus</h1>
        <ol class="timeline">
          <li class="timeline__item reveal">
            <div class="timeline__dot"></div>
            <div class="timeline__content">
              <h3 class="h4">Programme Grande École — Informatique (Epitech, Marseille)</h3>
              <p class="muted">2023 – 2028</p>
              <p>Modules: C/C++, Shell, Systèmes, Réseaux, Web, Archi logicielle, Git, ASM.</p>
            </div>
          </li>
          <li class="timeline__item reveal">
            <div class="timeline__dot"></div>
            <div class="timeline__content">
              <h3 class="h4">Baccalauréat Général — Lycée Saint‑Exupéry (Marseille)</h3>
              <p class="muted">2020 – 2023</p>
              <p>Spécialités: Numérique & Sciences Informatiques, Anglais.</p>
            </div>
          </li>
          <li class="timeline__item reveal">
            <div class="timeline__dot"></div>
            <div class="timeline__content">
              <h3 class="h4">Cambridge English Certificate (B2)</h3>
            </div>
          </li>
        </ol>
      </section>
    </main>
    <footer data-include="../partials/footer.html" data-base="../"></footer>
    <script src="../assets/js/base.js"></script>
  </body>
</html>
HTML

# ---------- pages/projets.html ----------
cat > pages/projets.html <<'HTML'
<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <link rel="stylesheet" href="../assets/css/fonts.css">
    <link rel="stylesheet" href="../assets/css/main.css">
    <title>Projets — <!--AUTHOR_NAME--></title>
  </head>
  <body>
    <header data-include="../partials/header.html" data-base="../"></header>
    <main class="container">
      <section class="reveal">
        <h1 class="h2 mb-l">Mes projets</h1>
        <div class="filters">
          <button class="chip is-active" data-filter="all">Tous</button>
          <button class="chip" data-filter="cpp">C/C++</button>
          <button class="chip" data-filter="js">JavaScript</button>
          <button class="chip" data-filter="wp">WordPress</button>
          <button class="chip" data-filter="automation">Automation</button>
        </div>
        <div id="projects-grid" class="cards mt-l"></div>
      </section>
    </main>
    <footer data-include="../partials/footer.html" data-base="../"></footer>
    <script src="../assets/js/base.js"></script>
    <script src="../assets/js/projects.js"></script>
  </body>
</html>
HTML

# ---------- pages/liens.html ----------
cat > pages/liens.html <<'HTML'
<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <link rel="stylesheet" href="../assets/css/fonts.css">
    <link rel="stylesheet" href="../assets/css/main.css">
    <title>Liens — <!--AUTHOR_NAME--></title>
  </head>
  <body>
    <header data-include="../partials/header.html" data-base="../"></header>
    <main class="container">
      <section class="reveal">
        <h1 class="h2 mb-l">Me contacter</h1>
        <div class="cards cards--links">
          <a class="card link-card" href="mailto:<!--EMAIL-->" target="_blank" rel="noopener">Email → <!--EMAIL--></a>
          <a class="card link-card" href="tel:<!--PHONE_URI-->" target="_blank" rel="noopener">Téléphone → <!--PHONE--></a>
          <a class="card link-card" href="<!--LINKEDIN-->" target="_blank" rel="noopener">LinkedIn → Profil</a>
          <!--GITHUB_LINK-->
        </div>
      </section>
    </main>
    <footer data-include="../partials/footer.html" data-base="../"></footer>
    <script src="../assets/js/base.js"></script>
  </body>
</html>
HTML

# ---------- partials/header.html ----------
cat > partials/header.html <<'HTML'
<nav class="nav">
  <div class="nav__brand">
    <a href="./index.html" data-root>← <!--AUTHOR_NAME--></a>
  </div>
  <button class="nav__toggle" aria-label="Menu" aria-expanded="false">☰</button>
  <ul class="nav__links">
    <li><a href="./index.html" data-root>Accueil</a></li>
    <li><a href="./pages/cursus.html" data-root>Mon cursus</a></li>
    <li><a href="./pages/projets.html" data-root>Mes projets</a></li>
    <li><a href="./pages/liens.html" data-root>Liens</a></li>
  </ul>
</nav>
HTML

# ---------- partials/footer.html ----------
cat > partials/footer.html <<'HTML'
<div class="footer container">
  <p class="muted">© <span id="year"></span> <!--AUTHOR_NAME-->. Fait avec HTML/CSS/JS. Hébergé sur GitHub Pages.</p>
</div>
HTML

# ---------- assets/css/fonts.css ----------
cat > assets/css/fonts.css <<'CSS'
/* Changez de police ici: modifiez seulement les deux @import et les variables ci-dessous */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=JetBrains+Mono:wght@400;600&display=swap');

:root {
  --font-sans: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace;
}
CSS

# ---------- assets/css/main.css ----------
cat > assets/css/main.css <<'CSS'
:root{
  --bg:#0f1115; --card:#151820; --fg:#e6e6e6; --muted:#9aa0a6; --line:#23262f; --accent: /*__ACCENT__*/ #4f46e5;
  --radius:14px; --space: clamp(14px, 1.2vw, 18px); --w: 1120px;
}
*{box-sizing:border-box}
html,body{height:100%}
body{
  margin:0; background:var(--bg); color:var(--fg); font-family:var(--font-sans); line-height:1.6;
  -webkit-font-smoothing:antialiased; text-rendering:optimizeLegibility;
}
a{color:var(--fg); text-decoration:none}
.container{max-width:var(--w); margin-inline:auto; padding: calc(var(--space)*2) var(--space)}
.mt-l{margin-top: calc(var(--space)*2)}
.mt-m{margin-top: var(--space)}
.mt-xxl{margin-top: calc(var(--space)*4)}
.mb-l{margin-bottom: calc(var(--space)*2)}
.mb-m{margin-bottom: var(--space)}
.h2{font-size: clamp(28px,3vw,40px); line-height:1.2; margin:0 0 var(--space)}
.h3{font-size: clamp(22px,2.2vw,28px); margin:0 0 var(--space)}
.h4{font-size: clamp(18px,1.8vw,22px); margin:0 0 6px}

.nav{display:flex; align-items:center; justify-content:space-between; gap:var(--space);
  position: sticky; top:0; padding: var(--space); background:rgba(15,17,21,.6); backdrop-filter: blur(8px); border-bottom:1px solid var(--line); z-index:10}
.nav__brand a{font-weight:700}
.nav__links{display:flex; gap:14px; list-style:none; padding:0; margin:0}
.nav__links a{padding:8px 10px; border-radius:8px; color:var(--muted)}
.nav__links a:hover,.nav__links a.is-active{color:var(--fg); background:rgba(255,255,255,.04)}
.nav__toggle{display:none; font-size:22px; background:none; border:1px solid var(--line); color:var(--fg); border-radius:10px; padding:6px 10px}
@media (max-width:800px){
  .nav__toggle{display:block}
  .nav__links{display:none; position:absolute; right:var(--space); top:58px; flex-direction:column; background:#0f1115; border:1px solid var(--line); border-radius:12px; padding:8px}
  .nav__links.is-open{display:flex}
}

.hero{padding-top:clamp(24px,6vw,80px); text-align:left}
.hero__title{font-size: clamp(36px,6vw,64px); margin:0 0 6px; letter-spacing:-.02em}
.hero__role{color:var(--muted); margin:0 0 var(--space)}
.hero__tagline{max-width: 60ch; color:var(--fg); opacity:.9}
.btn{display:inline-block; padding:10px 14px; border:1px solid var(--line); border-radius:12px; transition:transform .2s ease, background .2s ease, color .2s ease}
.btn:hover{transform: translateY(-2px); background:rgba(255,255,255,.04)}
.btn--primary{background:var(--accent); border-color:transparent; color:white; box-shadow:0 6px 18px rgba(79,70,229,.35)}
.btn--primary:hover{filter:brightness(1.05); transform:translateY(-2px)}

.cards{display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:var(--space)}
.card{background:var(--card); border:1px solid var(--line); border-radius:var(--radius); padding:18px; position:relative; overflow:hidden}
.card::after{content:""; position:absolute; inset:-1px; background:linear-gradient(120deg, transparent, rgba(255,255,255,.06), transparent);
  transform: translateX(-100%); transition: transform .8s ease}
.card:hover::after{transform: translateX(100%)}
.link-card{display:block}

.list{margin:0; padding-left:18px}
.muted{color:var(--muted)}

.grid-2{display:grid; grid-template-columns:1fr 1fr; align-items:start}
.gap-xl{gap: calc(var(--space)*2)}
@media (max-width:900px){ .grid-2{grid-template-columns:1fr} }

.timeline{list-style:none; padding:0; margin:0; border-left:2px dashed var(--line)}
.timeline__item{position:relative; padding-left:18px; margin: 0 0 calc(var(--space)*1.2)}
.timeline__dot{position:absolute; left:-7px; top:4px; width:10px; height:10px; background:var(--accent); border-radius:50%}

.filters{display:flex; flex-wrap:wrap; gap:10px}
.chip{padding:8px 12px; border:1px solid var(--line); background:transparent; color:var(--fg); border-radius:999px; cursor:pointer}
.chip.is-active, .chip:hover{background:rgba(255,255,255,.06)}

.reveal{opacity:0; transform: translateY(12px); transition: opacity .6s ease, transform .6s ease}
.reveal.is-visible{opacity:1; transform: translateY(0)}
.footer{border-top:1px solid var(--line); padding: var(--space) var(--space) calc(var(--space)*2)}
CSS

# ---------- assets/js/base.js ----------
cat > assets/js/base.js <<'JS'
// Resolve base path for partials on nested pages
(function(){
  const headers = document.querySelectorAll('[data-include]');
  headers.forEach(el => {
    const base = el.getAttribute('data-base') || '';
    const file = el.getAttribute('data-include');
    fetch(base ? base + file.replace('../','') : file)
      .then(r=>r.text()).then(html => { el.outerHTML = html; activateNav(); initMenu(); setYear(); })
      .catch(()=>{ /* ignore */ });
  });

  function activateNav(){
    const links = document.querySelectorAll('.nav__links a');
    const path = location.pathname.split('/').pop() || 'index.html';
    links.forEach(a=>{
      const href = a.getAttribute('href');
      const target = href.split('/').pop();
      if(target === path) a.classList.add('is-active');
    });
  }
  function initMenu(){
    const btn = document.querySelector('.nav__toggle');
    const ul = document.querySelector('.nav__links');
    if(!btn || !ul) return;
    btn.addEventListener('click', ()=>{
      const open = ul.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(open));
    });
    // Fix root links from nested pages
    document.querySelectorAll('[data-root]').forEach(a=>{
      const href = a.getAttribute('href');
      if(location.pathname.includes('/pages/')) a.setAttribute('href', href.replace('./', '../'));
    });
  }
  function setYear(){
    const y = document.getElementById('year');
    if(y) y.textContent = new Date().getFullYear();
  }

  // IntersectionObserver for reveal animations
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    });
  }, {threshold: .1});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
})();
JS

# ---------- assets/js/projects.js ----------
cat > assets/js/projects.js <<'JS'
(async function(){
  const base = location.pathname.includes('/pages/') ? '../' : './';
  const res = await fetch(base + 'data/projects.json');
  const all = await res.json();

  // Home selection
  const home = document.getElementById('projects-home');
  if(home){
    const featured = all.slice(0, 3);
    home.innerHTML = featured.map(Card).join('');
  }

  // Grid + filters
  const grid = document.getElementById('projects-grid');
  if(grid){
    const chips = document.querySelectorAll('.chip');
    let current = 'all';
    const render = () => {
      const items = current === 'all' ? all : all.filter(p=>p.tags.includes(current));
      grid.innerHTML = items.map(Card).join('');
    };
    chips.forEach(c=>c.addEventListener('click', ()=>{
      chips.forEach(x=>x.classList.remove('is-active'));
      c.classList.add('is-active');
      current = c.dataset.filter;
      render();
    }));
    render();
  }

  function Card(p){
    const img = p.image ? `<img src="${p.image}" alt="" style="width:100%;height:160px;object-fit:cover;border-radius:10px;margin-bottom:10px;border:1px solid var(--line)">` : '';
    const link = p.link ? `<a class="btn" href="${p.link}" target="_blank" rel="noopener">Voir</a>` : '';
    const repo = p.repo ? `<a class="btn" href="${p.repo}" target="_blank" rel="noopener">Code</a>` : '';
    const pills = p.tags.map(t=>`<span class="chip" style="pointer-events:none">${t}</span>`).join(' ');
    return `
      <article class="card reveal">
        ${img}
        <h3 class="h4" style="margin-top:0">${p.title}</h3>
        <p class="muted" style="margin:6px 0 10px">${p.period || ''}</p>
        <p>${p.description}</p>
        <div style="display:flex; gap:8px; flex-wrap:wrap; margin:10px 0">${pills}</div>
        <div style="display:flex; gap:10px; margin-top:8px">${link}${repo}</div>
      </article>
    `;
  }
})();
JS

# ---------- data/projects.json ----------
cat > data/projects.json <<'JSON'
[
  {
    "title": "Jetpack Multiplayer Game",
    "period": "Projet Epitech — C++ / SFML",
    "description": "Jeu 2D multijoueur inspiré de Jetpack Joyride. Client/serveur perso, protocole de synchro, physique, collisions, boucle de jeu.",
    "tags": ["cpp"],
    "image": "assets/img/projects/jetpack.jpg",
    "repo": "",
    "link": ""
  },
  {
    "title": "Minishell",
    "period": "Projet Epitech — C (3 semaines)",
    "description": "Shell Unix minimaliste: parsing de commandes, exécution, gestion des erreurs/redirections.",
    "tags": ["cpp"],
    "image": "assets/img/projects/minishell.jpg",
    "repo": "",
    "link": ""
  },
  {
    "title": "Epytodo",
    "period": "Projet Epitech — JS/SQL (3 semaines)",
    "description": "Site de gestion de tâches en JavaScript avec backend SQL (CRUD, auth, routing minimal).",
    "tags": ["js"],
    "image": "assets/img/projects/epytodo.jpg",
    "repo": "",
    "link": ""
  },
  {
    "title": "Site WordPress — autonomie-numerique.fr",
    "period": "Icom’Provence",
    "description": "Intégration, structure, contenus et mise en ligne. Collaboration avec l’équipe pour adapter aux besoins utilisateurs.",
    "tags": ["wp"],
    "image": "assets/img/projects/wp-autonomie.jpg",
    "link": "https://autonomie-numerique.fr"
  },
  {
    "title": "Hackathon Agent IA — Hacktogone",
    "period": "Mai 2025 — N8n",
    "description": "Développement d’agents IA via N8n. Certif. ID: bf1ccad0-62b9-4c5a-abf1-2c8ef6adacfd.",
    "tags": ["automation","js"],
    "image": "assets/img/projects/hacktogone.jpg",
    "repo": "",
    "link": ""
  }
]
JSON

# ---------- scripts/add-project.mjs ----------
cat > scripts/add-project.mjs <<'NODE'
#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = q => new Promise(res=> rl.question(q, a => res(a.trim())));

const file = path.join(process.cwd(), 'data', 'projects.json');
const projects = JSON.parse(fs.readFileSync(file, 'utf8'));

function slugify(s){
  return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
}

(async ()=>{
  console.log('\n=== Ajouter un projet au portfolio ===\n');
  const title = await ask('Titre: ');
  const period = await ask('Période (ex: "Projet Epitech — C++ / SFML"): ');
  const description = await ask('Description courte: ');
  const tags = (await ask('Tags (séparés par des virgules, ex: cpp,js,wp,automation): '))
    .split(',').map(s=>s.trim()).filter(Boolean);
  let image = await ask('Image (URL HTTP(S) OU chemin local, facultatif): ');
  const repo = await ask('Lien code (GitHub, facultatif): ');
  const link = await ask('Lien démo/site (facultatif): ');
  const at = (await ask('Position (1 = en tête, vide = fin): '));

  // Gérer une image locale: copie vers assets/img/projects
  if(image && !/^https?:\/\//i.test(image)){
    const src = path.resolve(image);
    if(fs.existsSync(src) && fs.statSync(src).isFile()){
      const ext = path.extname(src) || '.png';
      const name = slugify(title) + ext;
      const destDir = path.join(process.cwd(), 'assets', 'img', 'projects');
      fs.mkdirSync(destDir, { recursive: true });
      const dest = path.join(destDir, name);
      fs.copyFileSync(src, dest);
      image = `assets/img/projects/${name}`;
      console.log('→ Image copiée vers', image);
    } else {
      console.log('! Image locale introuvable, champ ignoré.');
      image = '';
    }
  }

  const p = { title, period, description, tags };
  if(image) p.image = image;
  if(repo) p.repo = repo;
  if(link) p.link = link;

  if(at && Number(at) === 1){
    projects.unshift(p);
  } else {
    projects.push(p);
  }
  fs.writeFileSync(file, JSON.stringify(projects, null, 2));
  console.log('\n✅ Projet ajouté à data/projects.json');
  rl.close();
})();
NODE

chmod +x scripts/add-project.mjs

# ---------- scripts/serve.sh ----------
cat > scripts/serve.sh <<'BASH'
#!/usr/bin/env bash
set -euo pipefail
PORT="${1:-8080}"
echo "Serving on http://localhost:${PORT}"
if command -v python3 >/dev/null 2>&1; then
  python3 -m http.server "$PORT" -d .
elif command -v python >/dev/null 2>&1; then
  python -m SimpleHTTPServer "$PORT"
else
  echo "Installez Python pour servir localement, ou utilisez npx serve ."
  exit 1
fi
BASH
chmod +x scripts/serve.sh

# ---------- Assets: images placeholders (SVG) ----------
mkdir -p assets/img/projects
cat > assets/img/projects/jetpack.svg <<'SVG'
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#1f2330"/><stop offset="1" stop-color="#2a2f3f"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/><text x="50%" y="55%" font-family="Inter, Arial, sans-serif" font-size="42" fill="#e6e6e6" text-anchor="middle">Jetpack Multiplayer</text></svg>
SVG
cat > assets/img/projects/minishell.svg <<'SVG'
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#1f2330"/><stop offset="1" stop-color="#2a2f3f"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/><text x="50%" y="55%" font-family="Inter, Arial, sans-serif" font-size="42" fill="#e6e6e6" text-anchor="middle">Minishell</text></svg>
SVG
cat > assets/img/projects/epytodo.svg <<'SVG'
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#1f2330"/><stop offset="1" stop-color="#2a2f3f"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/><text x="50%" y="55%" font-family="Inter, Arial, sans-serif" font-size="42" fill="#e6e6e6" text-anchor="middle">Epytodo</text></svg>
SVG
cat > assets/img/projects/wp-autonomie.svg <<'SVG'
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#1f2330"/><stop offset="1" stop-color="#2a2f3f"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/><text x="50%" y="55%" font-family="Inter, Arial, sans-serif" font-size="42" fill="#e6e6e6" text-anchor="middle">WordPress</text></svg>
SVG
cat > assets/img/projects/hacktogone.svg <<'SVG'
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#1f2330"/><stop offset="1" stop-color="#2a2f3f"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/><text x="50%" y="55%" font-family="Inter, Arial, sans-serif" font-size="42" fill="#e6e6e6" text-anchor="middle">Hackathon</text></svg>
SVG

# Adapter data/projects.json pour .svg
tmpjson="data/projects.json.tmp"
sed -e 's|jetpack\.jpg|jetpack.svg|g' \
    -e 's|minishell\.jpg|minishell.svg|g' \
    -e 's|epytodo\.jpg|epytodo.svg|g' \
    -e 's|wp-autonomie\.jpg|wp-autonomie.svg|g' \
    -e 's|hacktogone\.jpg|hacktogone.svg|g' \
    data/projects.json > "$tmpjson" && mv "$tmpjson" data/projects.json

# ---------- GitHub Pages (.nojekyll) ----------
: > .nojekyll

# ---------- README ----------
cat > README.md <<'MD'
# Portfolio statique (GitHub Pages)

Aperçu local:
- ./scripts/serve.sh 8080
- Ouvrir http://localhost:8080

Déploiement GitHub Pages:
1) Créer un dépôt et pousser le contenu (branche main).
2) Dans Settings > Pages:
   - Source: Deploy from a branch
   - Branch: main / root (/) puis Save
3) Votre site sera servi sur https://<votre_user>.github.io/<nom_repo>/

Ajouter un projet:
- node scripts/add-project.mjs
- Les images locales seront copiées dans assets/img/projects

Changer la police:
- Modifier assets/css/fonts.css (les deux @import + variables --font-sans / --font-mono)

Changer la couleur d’accent:
- Relancer ./scripts/setup.sh ou éditez assets/css/main.css (variable --accent)

MD

# ---------- Remplacements dynamiques (placeholders) ----------
esc(){ printf '%s' "$1" | sed -e 's/[\/&]/\\&/g'; }

A=$(esc "$AUTHOR_NAME")
R=$(esc "$ROLE")
T=$(esc "$TAGLINE")
S=$(esc "$SITE_TITLE")
E=$(esc "$EMAIL")
P=$(esc "$PHONE")
L=$(esc "$LINKEDIN")
G=$(esc "$GITHUB")

# phone URI (format FR -> +33)
RAW=$(printf '%s' "$PHONE" | tr -d ' .-')
if [[ "$RAW" =~ ^0[1-9][0-9]{8}$ ]]; then
  PHONE_URI="+33${RAW:1}"
else
  PHONE_URI="$RAW"
fi
U=$(esc "$PHONE_URI")

# GITHUB card
if [ -n "$GITHUB" ]; then
  GITHUB_CARD="<a class=\"card link-card\" href=\"$GITHUB\" target=\"_blank\" rel=\"noopener\">GitHub → Profil</a>"
else
  GITHUB_CARD=""
fi
GC=$(esc "$GITHUB_CARD")

# fichiers à traiter
FILES=("index.html" "pages/cursus.html" "pages/projets.html" "pages/liens.html" "partials/header.html" "partials/footer.html" "assets/css/main.css" "assets/css/fonts.css")

# ---------- Partials ----------
cat > partials/header.html <<'HTML'
<header class="container">
  <div class="nav">
    <a class="brand" data-href="index.html">__AUTHOR_NAME__</a>
    <nav class="links">
      <a id="nav-home" class="nav-link" data-href="index.html">Accueil</a>
      <a id="nav-cursus" class="nav-link" data-href="pages/cursus.html">Cursus</a>
      <a id="nav-projets" class="nav-link" data-href="pages/projets.html">Projets</a>
      <a id="nav-liens" class="nav-link" data-href="pages/liens.html">Liens</a>
    </nav>
  </div>
</header>
HTML

cat > partials/footer.html <<'HTML'
<footer class="container footer">
  <div class="footer-top">
    <div>
      <div class="h4">__AUTHOR_NAME__</div>
      <div class="muted">__ROLE__</div>
    </div>
    <div class="footer-cta">
      <a class="btn" href="mailto:__EMAIL__">Me contacter</a>
      <a class="btn outline" href="tel:__PHONE_URI__">__PHONE__</a>
    </div>
  </div>
  <div class="muted small">© <span id="year"></span> • Fait à la main • Minimal & rapide</div>
</footer>
HTML

# ---------- Pages ----------
mkdir -p pages

# Pages: injecte CSS/JS via bootstrap inline pour gérer les chemins relatifs (root / pages/)
bootstrap_head='
<script>
(function(){
  var ROOT = location.pathname.indexOf("/pages/")>-1 ? ".." : ".";
  ["assets/css/fonts.css","assets/css/main.css"].forEach(function(h){
    var l=document.createElement("link"); l.rel="stylesheet"; l.href=ROOT+"/"+h; document.head.appendChild(l);
  });
  var s=document.createElement("script"); s.src=ROOT+"/assets/js/base.js"; s.defer=true; document.head.appendChild(s);
})();
</script>
'

cat > pages/cursus.html <<HTML
<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <title>__SITE_TITLE__ — Cursus</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  ${bootstrap_head}
</head>
<body>
  <div id="site-header"></div>

  <main class="container" style="padding-top:28px">
    <h1 class="h2">Mon cursus</h1>
    <section class="timeline">
      <article class="card reveal">
        <h3 class="h4">Programme Grande École — Informatique</h3>
        <p class="muted">Epitech — Marseille • 2023 – 2028</p>
        <p>Modules: C, C++, Shell, Systèmes, Réseaux, Web, Architecture, Git, ASM.</p>
      </article>

      <article class="card reveal">
        <h3 class="h4">Baccalauréat Général</h3>
        <p class="muted">Lycée Saint‑Exupéry — Marseille • 2020 – 2023</p>
        <p>Spécialités: Numérique & Sciences Informatiques, Anglais.</p>
      </article>

      <article class="card reveal">
        <h3 class="h4">Cambridge English Certificate (B2)</h3>
        <p class="muted">2020 – 2023</p>
      </article>

      <h2 class="h3" style="margin-top:24px">Expériences</h2>

      <article class="card reveal">
        <h3 class="h4">Stagiaire Développeur Web — Icom’Provence</h3>
        <p class="muted">Marseille • Août 2024 – Novembre 2024</p>
        <ul class="list">
          <li>Découverte des métiers et fonctionnement de l’entreprise.</li>
          <li>Accompagnement salarié et réalisation de tâches.</li>
          <li>Gestion d’une plateforme CMS, création de sites WordPress.</li>
        </ul>
      </article>

      <article class="card reveal">
        <h3 class="h4">Équipier Polyvalent — Quick Grand Littoral</h3>
        <p class="muted">Marseille • Mai – Septembre 2023</p>
        <ul class="list">
          <li>Accueil, prise de commandes, informations produits.</li>
          <li>Préparation rapide, précise, normes hygiène/qualité.</li>
          <li>Collaboration équipe, gestion stock et réassort.</li>
        </ul>
      </article>
    </section>
  </main>

  <div id="site-footer"></div>
</body>
</html>
HTML

cat > pages/projets.html <<'HTML'
<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <title>__SITE_TITLE__ — Projets</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script>
  (function(){
    var ROOT = location.pathname.indexOf("/pages/")>-1 ? ".." : ".";
    ["assets/css/fonts.css","assets/css/main.css"].forEach(function(h){
      var l=document.createElement("link"); l.rel="stylesheet"; l.href=ROOT+"/"+h; document.head.appendChild(l);
    });
    var s=document.createElement("script"); s.src=ROOT+"/assets/js/base.js"; s.defer=true; document.head.appendChild(s);
    var sp=document.createElement("script"); sp.src=ROOT+"/assets/js/projects.js"; sp.defer=true; document.head.appendChild(sp);
  })();
  </script>
</head>
<body>
  <div id="site-header"></div>

  <main class="container" style="padding-top:28px">
    <h1 class="h2">Projets</h1>
    <p class="muted">Sélection de projets Epitech, associatifs et personnels.</p>
    <div id="projects-grid" class="grid"></div>
  </main>

  <div id="site-footer"></div>
</body>
</html>
HTML

cat > pages/liens.html <<HTML
<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <title>__SITE_TITLE__ — Liens</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  ${bootstrap_head}
</head>
<body>
  <div id="site-header"></div>

  <main class="container" style="padding-top:28px">
    <h1 class="h2">Liens</h1>
    <section class="grid">
      <a class="card link-card reveal" href="__LINKEDIN__" target="_blank" rel="noopener">LinkedIn → Profil</a>
      __GITHUB_CARD__
      <a class="card link-card reveal" href="mailto:__EMAIL__">Email → __EMAIL__</a>
      <a class="card link-card reveal" href="tel:__PHONE_URI__">Téléphone → __PHONE__</a>
    </section>
  </main>

  <div id="site-footer"></div>
</body>
</html>
HTML

# ---------- CSS ----------
mkdir -p assets/css

cat > assets/css/fonts.css <<'CSS'
/* Modifiez facilement la police ici:
   - Changez les @import ci-dessous
   - Ajustez les variables --font-sans et --font-mono
*/
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&display=swap');

:root{
  --font-sans: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Helvetica Neue", Arial, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace;
}
body{ font-family: var(--font-sans); }
code, pre, kbd, samp{ font-family: var(--font-mono); }
CSS

cat > assets/css/main.css <<'CSS'
:root{
  --bg: #0f1220;
  --surface: #14182b;
  --card: #171b2e;
  --text: #e6e6e6;
  --muted: #a9afc1;
  --accent: __ACCENT__;
  --radius: 12px;
  --shadow: 0 6px 18px rgba(0,0,0,0.25);
}

*{ box-sizing:border-box }
html,body{ height:100% }
body{
  margin:0; color:var(--text); background:radial-gradient(1200px 800px at 10% -10%, #1b2040 0%, #0f1220 55%, #0b0e19 100%);
  line-height:1.6;
}
img{ max-width:100%; display:block }
a{ color:inherit; text-decoration:none }
.container{ width:min(1100px, calc(100% - 32px)); margin-inline:auto; }

.h1{ font-size:42px; line-height:1.15; margin:0 0 8px }
.h2{ font-size:32px; line-height:1.2; margin:0 0 10px }
.h3{ font-size:24px; line-height:1.25; margin:0 0 8px }
.h4{ font-size:18px; line-height:1.35; margin:0 0 6px }
.small{ font-size:13px }
.muted{ color:var(--muted) }

.nav{
  display:flex; align-items:center; justify-content:space-between; gap:16px; padding:16px 0;
}
.brand{ font-weight:700; letter-spacing:.3px }
.links{ display:flex; gap:10px; flex-wrap:wrap }
.nav-link{ padding:8px 12px; border-radius:999px; color:var(--muted); transition:.2s ease }
.nav-link[aria-current="page"], .nav-link:hover{ color:#fff; background:rgba(255,255,255,.06) }

.grid{
  display:grid; gap:16px; grid-template-columns: repeat(auto-fill, minmax(260px,1fr));
  align-items:stretch;
}
.card{
  background:linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.0)), var(--card);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding:14px; border:1px solid rgba(255,255,255,.06);
}
.card img{ border-radius:10px; margin-bottom:10px; aspect-ratio: 16/10; object-fit:cover; }

.btn{
  display:inline-block; padding:10px 14px; border-radius:10px; background:var(--accent);
  color:white; font-weight:600; box-shadow:0 4px 12px rgba(0,0,0,.25); transition: transform .15s ease, box-shadow .15s ease;
}
.btn:hover{ transform: translateY(-1px); box-shadow:0 6px 16px rgba(0,0,0,.3) }
.btn.outline{ background:transparent; color:#fff; border:1px solid rgba(255,255,255,.18) }

.footer{ margin:40px 0; padding:16px 0; border-top:1px solid rgba(255,255,255,.08) }
.footer-top{ display:flex; align-items:center; justify-content:space-between; gap:16px; margin-bottom:8px; flex-wrap:wrap }

.link-card{ display:flex; align-items:center; justify-content:center; min-height:80px; font-weight:600; border:1px dashed rgba(255,255,255,.1) }
.link-card:hover{ border-color: rgba(255,255,255,.22) }

.list{ margin:8px 0 0 18px; padding:0 }
.list li{ margin:6px 0 }

.hero{
  padding: 24px 0 4px;
}
.hero .kicker{ color: var(--accent); font-weight:700; letter-spacing:.4px; text-transform: uppercase; font-size:12px }
.hero .lead{ font-size:18px }
.hero-cta{ display:flex; gap:10px; flex-wrap:wrap; margin-top:14px }

.reveal{ opacity:0; transform: translateY(16px); transition: opacity .5s ease, transform .5s ease }
.reveal.visible{ opacity:1; transform:none }

/* Tags */
.pill{
  display:inline-block; padding:6px 10px; border-radius:999px; font-size:12px; font-weight:700; letter-spacing:.2px;
  background:rgba(255,255,255,.08); color:#e8ecff; border:1px solid rgba(255,255,255,.1)
}
.pill--cpp{ background: #264de4; }
.pill--js{ background: #f7df1e; color:#161616 }
.pill--wp{ background: #21759b; }
.pill--automation{ background: #22c55e; color:#092615 }
CSS

# ---------- JS ----------
mkdir -p assets/js

cat > assets/js/base.js <<'JS'
(function(){
  const ROOT = location.pathname.includes('/pages/') ? '..' : '.';

  // Charge header et footer
  async function loadPartials(){
    const [h,f] = await Promise.all([
      fetch(ROOT + '/partials/header.html').then(r=>r.text()),
      fetch(ROOT + '/partials/footer.html').then(r=>r.text())
    ]);
    const headerEl = document.getElementById('site-header');
    const footerEl = document.getElementById('site-footer');
    if(headerEl){ headerEl.innerHTML = h; wireHeaderLinks(headerEl); setActiveNav(); }
    if(footerEl){
      footerEl.innerHTML = f;
      const y = footerEl.querySelector('#year'); if(y) y.textContent = new Date().getFullYear();
    }
  }

  function wireHeaderLinks(scope){
    scope.querySelectorAll('[data-href]').forEach(a=>{
      a.setAttribute('href', ROOT + '/' + a.dataset.href);
    });
  }

  function setActiveNav(){
    const p = location.pathname;
    const map = [
  [/\/(index\.html)?$/, 'nav-home'],
  [/\/pages\/cursus\.html$/, 'nav-cursus'],
  [/\/pages\/projets\.html$/, 'nav-projets'],
  [/\/pages\/liens\.html$/, 'nav-liens'],
    ];
    const id = (map.find(([re])=> re.test(p))||[])[1];
    if(!id) return;
    const link = document.getElementById(id);
    if(link) link.setAttribute('aria-current','page');
  }

  // Animations "reveal"
  function attachReveal(){
    const els = document.querySelectorAll('.reveal');
    if(!('IntersectionObserver' in window)){
      els.forEach(e=> e.classList.add('visible'));
      return;
    }
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(en=>{
        if(en.isIntersecting){
          en.target.classList.add('visible');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });
    els.forEach(e=> io.observe(e));
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    loadPartials().then(attachReveal);
  });

  // Expose ROOT if needed elsewhere
  window.__ROOT__ = ROOT;
})();
JS

# ---------- assets/js/projects.js ----------
cat > assets/js/projects.js <<'JS'
(async function(){
  const ROOT = window.__ROOT__ || (location.pathname.includes('/pages/') ? '..' : '.');
  const grid = document.getElementById('projects-grid');
  if(!grid) return;

  function pillClass(tag){
    const t = (tag||'').toLowerCase();
    if(['c++','cpp','sfml'].includes(t)) return 'pill pill--cpp';
    if(['js','javascript','node','n8n'].includes(t)) return 'pill pill--js';
    if(['wp','wordpress'].includes(t)) return 'pill pill--wp';
    if(['automation','auto','bot'].includes(t)) return 'pill pill--automation';
    return 'pill';
  }

  try{
    const res = await fetch(ROOT + '/data/projects.json', {cache:'no-store'});
    const data = await res.json();

    const frag = document.createDocumentFragment();
    data.forEach(p=>{
      const card = document.createElement('article');
      card.className = 'card reveal';
      const img = p.image ? `<img src="${p.image}" alt="${p.title}">` : '';
      const tags = (p.tags||[]).map(t=> `<span class="${pillClass(t)}">${t}</span>`).join(' ');
      const repo = p.repo ? `<a class="btn outline" href="${p.repo}" target="_blank" rel="noopener">Code</a>` : '';
      const link = p.link ? `<a class="btn" href="${p.link}" target="_blank" rel="noopener">Voir</a>` : '';
      card.innerHTML = `
        ${img}
        <h3 class="h4">${p.title}</h3>
        <p class="muted small">${p.period||''}</p>
        <p>${p.description||''}</p>
        <div style="display:flex; gap:6px; flex-wrap:wrap; margin:10px 0">${tags}</div>
        <div style="display:flex; gap:8px; flex-wrap:wrap">${repo}${link}</div>
      `;
      frag.appendChild(card);
    });
    grid.appendChild(frag);

    // relancer l'animation reveal pour les nouvelles cartes
    setTimeout(()=>{
      document.querySelectorAll('.reveal').forEach(el=> el.classList.add('visible'));
    }, 0);
  }catch(e){
    grid.innerHTML = '<p class="muted">Impossible de charger les projets pour le moment.</p>';
    console.error(e);
  }
})();
JS

# ---------- index.html ----------
cat > index.html <<'HTML'
<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <title>__SITE_TITLE__ — Accueil</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script>
  (function(){
    var ROOT = ".";
    ["assets/css/fonts.css","assets/css/main.css"].forEach(function(h){
      var l=document.createElement("link"); l.rel="stylesheet"; l.href=ROOT+"/"+h; document.head.appendChild(l);
    });
    var s=document.createElement("script"); s.src=ROOT+"/assets/js/base.js"; s.defer=true; document.head.appendChild(s);
  })();
  </script>
</head>
<body>
  <div id="site-header"></div>

  <main class="container hero">
    <div class="kicker">__ROLE__</div>
    <h1 class="h1">__AUTHOR_NAME__</h1>
    <p class="lead">__TAGLINE__</p>
    <div class="hero-cta">
      <a class="btn" href="pages/projets.html">Voir mes projets</a>
      <a class="btn outline" href="pages/cursus.html">Mon cursus</a>
    </div>

    <section style="margin-top:28px" class="grid">
      <article class="card reveal">
        <h3 class="h4">À propos</h3>
        <p>Développeur web et logiciel à Epitech, je conçois des sites, applications et automatisations sur mesure. Polyvalent et curieux, je m’adapte rapidement à vos besoins.</p>
        <div class="hero-cta">
          <a class="btn" href="pages/liens.html">Me contacter</a>
          <a class="btn outline" href="mailto:__EMAIL__">Email</a>
        </div>
      </article>
      <article class="card reveal">
        <h3 class="h4">Compétences</h3>
        <p class="muted small">Langages</p>
        <p>C, C++, Python, JavaScript, SQL, HTML/CSS, Haskell, Assembleur</p>
        <p class="muted small">Outils & Frameworks</p>
        <p>CSFML, Node.js (basique), WordPress, N8n, Git, Trello, VS Code</p>
        <p class="muted small">Systèmes & Méthodo</p>
        <p>Linux, Windows • Agile, travail en équipe</p>
      </article>
    </section>
  </main>

  <div id="site-footer"></div>
</body>
</html>
HTML

# ---------- Appliquer les remplacements ----------
FILES+=("index.html")
for f in "${FILES[@]}"; do
  [ -f "$f" ] || continue
  sed -i \
    -e "s|__AUTHOR_NAME__|$A|g" \
    -e "s|__ROLE__|$R|g" \
    -e "s|__TAGLINE__|$T|g" \
    -e "s|__SITE_TITLE__|$S|g" \
    -e "s|__EMAIL__|$E|g" \
    -e "s|__PHONE__|$P|g" \
    -e "s|__PHONE_URI__|$U|g" \
    -e "s|__LINKEDIN__|$L|g" \
    -e "s|__GITHUB_CARD__|$GC|g" \
    -e "s|__ACCENT__|$ACCENT|g" \
    "$f"
done

echo
echo "✅ Portfolio généré."
echo "• Aperçu: ./scripts/serve.sh 8080  puis http://localhost:8080"
echo "• Ajoutez un projet: node scripts/add-project.mjs"
echo "• Déployez sur GitHub Pages: poussez sur main, puis activez Pages (root)."

