# Configuration Firebase pour le Livre d'Or

## Étapes de configuration

### 1. Créer un projet Firebase

1. Allez sur [Firebase Console](https://console.firebase.google.com/)
2. Cliquez sur "Ajouter un projet"
3. Nommez votre projet (ex: "portfolio-moussandou")
4. Désactivez Google Analytics (optionnel)
5. Cliquez sur "Créer le projet"

### 2. Ajouter une application Web

1. Dans la console Firebase, cliquez sur l'icône Web `</>`
2. Donnez un nom à votre app (ex: "Portfolio")
3. Cochez "Configurer Firebase Hosting" (optionnel)
4. Cliquez sur "Enregistrer l'application"

### 3. Copier les clés de configuration

Firebase vous donnera un objet `firebaseConfig` qui ressemble à :

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "votre-projet.firebaseapp.com",
  projectId: "votre-projet",
  storageBucket: "votre-projet.firebasestorage.app",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcd1234"
};
```

**Copiez ces valeurs et remplacez-les dans `src/lib/firebase.ts`**

### 4. Activer Firestore Database

1. Dans le menu de gauche, cliquez sur "Firestore Database"
2. Cliquez sur "Créer une base de données"
3. Choisissez "Démarrer en mode production"
4. Sélectionnez votre région (ex: `europe-west`)
5. Cliquez sur "Activer"

### 5. Configurer les règles de sécurité

Dans l'onglet "Règles" de Firestore, collez ces règles :

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /guestbook/{entry} {
      // Tout le monde peut lire
      allow read: if true;

      // Tout le monde peut créer (avec limitations)
      allow create: if request.auth == null
        && request.resource.data.name is string
        && request.resource.data.name.size() >= 2
        && request.resource.data.name.size() <= 50
        && request.resource.data.message is string
        && request.resource.data.message.size() >= 5
        && request.resource.data.message.size() <= 500
        && request.resource.data.timestamp is timestamp;

      // Personne ne peut modifier ou supprimer (sauf vous via la console)
      allow update, delete: if false;
    }
  }
}
```

6. Cliquez sur "Publier"

### 6. Tester localement

```bash
npm run dev
```

Visitez http://localhost:5173 et testez le livre d'or !

### 7. Déployer

```bash
npm run deploy
```

## Modération

Le système inclut une modération automatique des mots inappropriés. Pour modérer manuellement :

1. Allez dans Firebase Console > Firestore Database
2. Cliquez sur la collection `guestbook`
3. Vous pouvez supprimer les messages indésirables

## Quotas gratuits Firebase

- **Lectures** : 50,000 / jour
- **Écritures** : 20,000 / jour
- **Stockage** : 1 GB

Largement suffisant pour un portfolio personnel ! 🎉

## Variables d'environnement (optionnel)

Pour plus de sécurité, vous pouvez utiliser des variables d'environnement :

1. Créez un fichier `.env` :

```env
VITE_FIREBASE_API_KEY=votre_clé_api
VITE_FIREBASE_AUTH_DOMAIN=votre-projet.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=votre-projet
VITE_FIREBASE_STORAGE_BUCKET=votre-projet.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcd1234
```

2. Modifiez `src/lib/firebase.ts` :

```typescript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};
```

3. Ajoutez `.env` au `.gitignore`

## Support

En cas de problème, consultez la [documentation Firebase](https://firebase.google.com/docs/firestore).
