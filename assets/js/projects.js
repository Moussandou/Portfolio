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
