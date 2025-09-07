# Portfolio SPA minimaliste — GitHub Pages

- Routing hash (#/accueil, #/cursus, #/projets, #/liens) pour compatibilité totale GitHub Pages.
- Transitions fluides entre vues (route-enter/route-leave) + fade-in au scroll.
- Projets dynamiques depuis `data/projects.json` ou via `tools/add_project.py`.
- Police modifiable via `assets/css/fonts.css` (variable `--font-stack` + option Google Fonts).

## Démarrer
- Ouvrir `index.html` localement.
- Ajouter des projets: `python3 tools/add_project.py`.

## Déployer
- `git init && git add . && git commit -m "SPA"`
- Pousser sur un repo et activer GitHub Pages (branche main / root).
- URL: `https://<username>.github.io/<repo>/` (hash routing => aucun réglage spécial).

## Changer la police
- Décommente l'import Google Fonts dans `assets/css/fonts.css` si souhaité.
- Mets `--font-stack: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;`

## Personnaliser
- Couleurs/ombres/rayons: `assets/css/base.css` (variables CSS).
- Transitions de route: keyframes `routeIn`/`routeOut`.
- Pages: `assets/js/pages/*.js`
- Router: `assets/js/router.js`
