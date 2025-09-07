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
