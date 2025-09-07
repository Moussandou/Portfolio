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

const file = path.join(process.cwd
