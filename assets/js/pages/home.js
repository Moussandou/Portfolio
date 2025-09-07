import { renderProjects } from '../projects.js';

export async function render(){
  const html = `
  <section class="hero fade-in">
    <h1 class="hero__title">Développeur Web & Logiciel</h1>
    <p class="hero__subtitle">Étudiant à Epitech — Sites, apps et automatisations sur mesure.</p>
    <div class="hero__cta">
      <a class="btn" href="#/projets">Voir mes projets</a>
      <a class="btn btn--ghost" href="#/liens">Me contacter</a>
    </div>
  </section>

  <section class="grid-2 fade-in">
    <article class="card">
      <h2>Polyvalent, Minimaliste</h2>
      <p>Performance, clarté, accessibilité.</p>
    </article>
    <article class="card">
      <h2>Tech & Outils</h2>
      <p>C, C++, Python, JavaScript, SQL, WordPress, Git, Linux.</p>
    </article>
  </section>

  <section class="fade-in">
    <h2 class="section-title">Derniers projets</h2>
    <div id="latest-projects" class="cards"></div>
  </section>
  `;
  // Après insertion dans #view, on hydrate la liste
  queueMicrotask(() => renderProjects({ mount:'latest-projects', limit:3 }));
  return html;
}
