#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = q => new Promise(res=> rl.question(q, a => res(a.trim())));

const file = path.join(process.cwd(), 'data', 'projects.json');
const projects = JSON.parse(fs.readFileSync(file, 'utf8'));

function slugify(s){
  return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
}

(async ()=>{
  console.log('\n=== Ajouter un projet au portfolio ===\n');
  const title = await ask('Titre: ');
  const period = await ask('Période (ex: "Projet Epitech — C++ / SFML"): ');
  const description = await ask('Description courte: ');
  const tags = (await ask('Tags (séparés par des virgules, ex: cpp,js,wp,automation): '))
    .split(',').map(s=>s.trim()).filter(Boolean);
  let image = await ask('Image (URL HTTP(S) OU chemin local, facultatif): ');
  const repo = await ask('Lien code (GitHub, facultatif): ');
  const link = await ask('Lien démo/site (facultatif): ');
  const at = (await ask('Position (1 = en tête, vide = fin): '));

  // Gérer une image locale: copie vers assets/img/projects
  if(image && !/^https?:\/\//i.test(image)){
    const src = path.resolve(image);
    if(fs.existsSync(src) && fs.statSync(src).isFile()){
      const ext = path.extname(src) || '.png';
      const name = slugify(title) + ext;
      const destDir = path.join(process.cwd(), 'assets', 'img', 'projects');
      fs.mkdirSync(destDir, { recursive: true });
      const dest = path.join(destDir, name);
      fs.copyFileSync(src, dest);
      image = `assets/img/projects/${name}`;
      console.log('→ Image copiée vers', image);
    } else {
      console.log('! Image locale introuvable, champ ignoré.');
      image = '';
    }
  }

  const p = { title, period, description, tags };
  if(image) p.image = image;
  if(repo) p.repo = repo;
  if(link) p.link = link;

  if(at && Number(at) === 1){
    projects.unshift(p);
  } else {
    projects.push(p);
  }
  fs.writeFileSync(file, JSON.stringify(projects, null, 2));
  console.log('\n✅ Projet ajouté à data/projects.json');
  rl.close();
})();
