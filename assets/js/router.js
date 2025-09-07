// Router hash (#/accueil, #/cursus, #/projets, #/liens)
const routes = new Map();

export function addRoute(path, loader){ routes.set(path, loader); }

export async function navigate(path){
  const container = document.getElementById('view');
  if (!container) return;
  // transition out
  container.classList.remove('route-enter'); container.classList.add('route-leave');
  await new Promise(r => setTimeout(r, 180));
  // render new view
  const loader = routes.get(path) || routes.get('/accueil');
  container.innerHTML = await loader();
  // transition in
  container.classList.remove('route-leave'); container.classList.add('route-enter');
  // set active link
  document.querySelectorAll('.menu a[data-link]').forEach(a=>{
    a.classList.toggle('active', a.getAttribute('href')===`#${path}`);
  });
  // attach fade-ins from new DOM
  const { attachFadeIns } = await import('./animate.js');
  attachFadeIns(container);
}

function onHashChange(){
  const hash = location.hash || '#/accueil';
  const path = hash.replace('#','');
  navigate(path);
}

export function startRouter(){
  window.addEventListener('hashchange', onHashChange);
  onHashChange();
  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('menu');
  toggle?.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}
