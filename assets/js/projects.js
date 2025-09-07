export async function fetchProjects() {
  const res = await fetch('data/projects.json', { cache: 'no-store' });
  if (!res.ok) throw new Error('Impossible de charger projects.json');
  const list = await res.json();
  return list.sort((a,b) => (b.date||'').localeCompare(a.date||''));
}

function projectCard(p){
  const thumb = p.thumb ? `<img src="\${p.thumb}" alt="\${p.title}">` : `<div class="project__thumb">Aperçu</div>`;
  const tags = (p.tags||[]).map(t=>`<span class="tag">\${t}</span>`).join('');
  const links = [
    p.link ? `<a class="btn" href="\${p.link}" target="_blank" rel="noopener">Voir</a>` : '',
    p.repo ? `<a class="btn btn--ghost" href="\${p.repo}" target="_blank" rel="noopener">Code</a>` : ''
  ].join(' ');
  return `
    <article class="card project fade-in" data-kind="\${(p.kind||[]).join(' ')}">
      <div class="project__thumb">\${thumb}</div>
      <h3>\${p.title}</h3>
      <p class="project__meta">\${p.date || ''} — \${p.role || ''}</p>
      <p>\${p.desc || ''}</p>
      <div class="project__tags">\${tags}</div>
      <div class="hero__cta">\${links}</div>
    </article>`;
}

export async function renderProjects({ mount, filter='all', limit }){
  const target = typeof mount === 'string' ? document.getElementById(mount) : mount;
  if (!target) return;
  try {
    const projects = await fetchProjects();
    const list = (filter==='all') ? projects : projects.filter(p => (p.kind||[]).includes(filter));
    const subset = limit ? list.slice(0, limit) : list;
    target.innerHTML = subset.map(projectCard).join('');
    // lazy attach fade-ins
    const { attachFadeIns } = await import('./animate.js');
    attachFadeIns(target);
  } catch(e) {
    target.innerHTML = `<p style="color:#ff9aa2">Erreur: \${e.message}</p>`;
  }
}
