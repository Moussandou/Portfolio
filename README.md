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

