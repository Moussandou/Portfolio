#!/usr/bin/env python3
import json, os, sys, datetime
DATA = os.path.join(os.path.dirname(__file__), '..', 'data', 'projects.json')

def prompt(prompt, default=""):
    v = input(f"{prompt} [{default}]: ").strip()
    return v or default

def main():
    print("Ajout d'un nouveau projet au portfolio (SPA)")
    today = datetime.date.today().isoformat()
    p = {
        "title": prompt("Titre"),
        "date": prompt("Date (YYYY-MM-DD)", today),
        "role": prompt("Rôle / stack"),
        "desc": prompt("Description courte"),
        "tags": [],
        "kind": [],
        "repo": prompt("Lien repo Git (optionnel)"),
        "link": prompt("Lien projet/démo (optionnel)"),
        "thumb": prompt("Chemin miniature (assets/img/..., optionnel)")
    }
    tags = prompt("Tags (séparés par des virgules, ex: C++, Réseau)").split(',')
    p["tags"] = [t.strip() for t in tags if t.strip()]
    kinds = prompt("Catégories (space-separated) [c-cpp js wp py other]", "other").split()
    p["kind"] = [k for k in kinds if k in ["c-cpp","js","wp","py","other"]]

    with open(DATA, 'r', encoding='utf-8') as f: arr = json.load(f)
    arr.append(p)
    with open(DATA, 'w', encoding='utf-8') as f: json.dump(arr, f, ensure_ascii=False, indent=2)
    print("✅ Projet ajouté dans data/projects.json")

if __name__ == "__main__":
    try: main()
    except KeyboardInterrupt: sys.exit(1)
