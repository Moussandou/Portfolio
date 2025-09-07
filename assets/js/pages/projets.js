import { renderProjects } from '../projects.js';

export async function render(){
  const html = `
  <section class="fade-in">
    <h1 class="section-title">Projets</h1>
    <div class="filters">
      <button class="chip" data-filter="all">Tous</button>
      <button class="chip" data-filter="c-cpp">C/C++</button>
      <button class="chip" data-filter="js">JavaScript</button>
      <button class="chip" data-filter="wp">WordPress</button>
    </div>
    <div id="projects" class="cards"></div>
  </section>`;
  queueMicrotask(() => {
    renderProjects({ mount:'projects' });
    const grid = document.getElementById('projects');
    document.querySelectorAll('.chip[data-filter]').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const f = btn.dataset.filter;
        // Filtrage côté client instantané
        grid.querySelectorAll('.project').forEach(card=>{
          const kinds = (card.getAttribute('data-kind')||'').split(' ');
          card.style.display = (f==='all' || kinds.includes(f)) ? '' : 'none';
        });
      });
    });
  });
  return html;
}
