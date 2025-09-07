import { addRoute, startRouter } from './router.js';

// Pages (chargées à la demande)
addRoute('/accueil', async ()=> (await import('./pages/home.js')).render());
addRoute('/cursus',  async ()=> (await import('./pages/cursus.js')).render());
addRoute('/projets', async ()=> (await import('./pages/projets.js')).render());
addRoute('/liens',   async ()=> (await import('./pages/liens.js')).render());

document.addEventListener('DOMContentLoaded', () => {
  startRouter();
});
