import { useState, useEffect } from 'react';
import { collection, addDoc, query, orderBy, limit, onSnapshot, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  timestamp: Timestamp;
}

interface GuestbookProps {
  isHackMode?: boolean;
}

// Liste de mots interdits pour la modération (français et anglais)
const BLOCKED_WORDS = [
  // Français
  'con', 'connard', 'connasse', 'salaud', 'salope', 'putain', 'pute', 'puta',
  'merde', 'chier', 'chiasse', 'fdp', 'enculé', 'enculer', 'encule', 'enfoiré',
  'bite', 'bites', 'couille', 'couilles', 'cul', 'sexe', 'porn', 'porno',
  'taré', 'tarée', 'débile', 'abruti', 'abrutie', 'crétin', 'crétine',
  'imbécile', 'idiot', 'idiote', 'nique', 'niquer', 'batard', 'bâtard',
  'salop', 'fils de pute', 'pd', 'pédé', 'tantouze', 'tapette',
  'gros con', 'grosse conne', 'fils de', 'va te faire', 'va te',
  'ta gueule', 'ferme ta gueule', 'ta mere', 'ta mère', 'nique ta mère',
  'nique ta mere', 'ntm', 'tg', 'ftg', 'connard', 'sale',

  // Anglais
  'fuck', 'fucker', 'fucking', 'fucked', 'shit', 'shitty', 'bullshit',
  'dick', 'dickhead', 'ass', 'asshole', 'bitch', 'bitches',
  'damn', 'dammit', 'hell', 'cunt', 'pussy', 'cock',
  'bastard', 'motherfucker', 'mofo', 'whore', 'slut',
  'nigger', 'nigga', 'fag', 'faggot', 'retard', 'retarded',
  'wtf', 'stfu', 'kys'
];

// Fonction de modération améliorée
const moderateContent = (text: string): boolean => {
  // Normalisation du texte
  let normalizedText = text.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Supprime les accents
    .replace(/[^a-z0-9\s]/g, ' ') // Remplace la ponctuation par des espaces
    .replace(/\s+/g, ' ') // Normalise les espaces multiples
    .trim();

  // Vérification des mots interdits
  for (const word of BLOCKED_WORDS) {
    const normalizedWord = word.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '');

    // Vérifie le mot exact avec des espaces ou début/fin de texte
    const wordRegex = new RegExp(`(^|\\s)${normalizedWord}(\\s|$)`, 'i');
    if (wordRegex.test(normalizedText)) {
      return false;
    }

    // Vérifie aussi les variantes avec leet speak (0 pour o, 1 pour i, 3 pour e, etc.)
    const leetText = normalizedText
      .replace(/0/g, 'o')
      .replace(/1/g, 'i')
      .replace(/3/g, 'e')
      .replace(/4/g, 'a')
      .replace(/5/g, 's')
      .replace(/7/g, 't')
      .replace(/8/g, 'b');

    if (wordRegex.test(leetText)) {
      return false;
    }
  }

  return true;
};

export function Guestbook({ isHackMode = false }: GuestbookProps) {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Écouter les changements en temps réel
    const q = query(
      collection(db, 'guestbook'),
      orderBy('timestamp', 'desc'),
      limit(20)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as GuestbookEntry));
      setEntries(data);
    }, (error) => {
      console.error('Error fetching guestbook:', error);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Validation
    if (!name.trim() || !message.trim()) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    if (name.length < 2 || name.length > 50) {
      setError('Le nom doit contenir entre 2 et 50 caractères');
      return;
    }

    if (message.length < 5 || message.length > 500) {
      setError('Le message doit contenir entre 5 et 500 caractères');
      return;
    }

    // Modération
    if (!moderateContent(name) || !moderateContent(message)) {
      setError('Votre message contient du contenu inapproprié');
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, 'guestbook'), {
        name: name.trim(),
        message: message.trim(),
        timestamp: Timestamp.now()
      });

      setName('');
      setMessage('');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Error adding entry:', err);
      setError('Erreur lors de l\'envoi. Réessayez plus tard.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp: Timestamp) => {
    const date = timestamp.toDate();
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'À l\'instant';
    if (diffMins < 60) return `Il y a ${diffMins} min`;
    if (diffHours < 24) return `Il y a ${diffHours}h`;
    if (diffDays < 7) return `Il y a ${diffDays}j`;

    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  };

  return (
    <div className="space-y-4">
      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className={`block text-xs mb-1 ${isHackMode ? 'text-[#A855F7]' : 'text-[#D2691E]'}`}>
            Nom / Pseudo
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Votre nom..."
            maxLength={50}
            className={`w-full px-3 py-2 rounded border text-sm ${
              isHackMode
                ? 'bg-[#1a1a1a] border-[#A855F7]/30 text-white placeholder-gray-500 focus:border-[#A855F7]'
                : 'bg-white border-[#D2691E]/40 text-[#8B7355] placeholder-gray-400 focus:border-[#D2691E]'
            } outline-none transition-colors`}
          />
        </div>

        <div>
          <label className={`block text-xs mb-1 ${isHackMode ? 'text-[#A855F7]' : 'text-[#D2691E]'}`}>
            Message
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Laissez un avis, un commentaire..."
            maxLength={500}
            rows={3}
            className={`w-full px-3 py-2 rounded border text-sm resize-none ${
              isHackMode
                ? 'bg-[#1a1a1a] border-[#A855F7]/30 text-white placeholder-gray-500 focus:border-[#A855F7]'
                : 'bg-white border-[#D2691E]/40 text-[#8B7355] placeholder-gray-400 focus:border-[#D2691E]'
            } outline-none transition-colors`}
          />
          <div className="text-xs text-right mt-1 opacity-60">
            {message.length}/500
          </div>
        </div>

        {error && (
          <div className="text-red-500 text-xs bg-red-50 border border-red-200 rounded px-3 py-2">
            {error}
          </div>
        )}

        {success && (
          <div className="text-green-600 text-xs bg-green-50 border border-green-200 rounded px-3 py-2">
            ✓ Merci pour votre message !
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded font-semibold text-sm transition-all ${
            isHackMode
              ? 'bg-[#A855F7] text-black hover:bg-[#9333EA] disabled:bg-[#A855F7]/50'
              : 'bg-[#8B7355] text-white hover:bg-[#D2691E] disabled:bg-[#8B7355]/50'
          } disabled:cursor-not-allowed`}
        >
          {loading ? 'Envoi...' : 'Envoyer'}
        </button>
      </form>

      {/* Liste des messages */}
      <div className="space-y-3 max-h-[400px] overflow-y-auto">
        <div className={`text-xs font-semibold ${isHackMode ? 'text-[#FFD700]' : 'text-[#D2691E]'}`}>
          {entries.length > 0 ? `${entries.length} message${entries.length > 1 ? 's' : ''}` : 'Aucun message'}
        </div>

        {entries.map((entry) => (
          <div
            key={entry.id}
            className={`p-3 rounded border ${
              isHackMode
                ? 'bg-[#1a1a1a] border-[#A855F7]/20 hover:border-[#A855F7]/40'
                : 'bg-white/80 border-[#D2691E]/20 hover:border-[#D2691E]/40'
            } transition-colors`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className={`font-semibold text-sm ${isHackMode ? 'text-[#A855F7]' : 'text-[#D2691E]'}`}>
                {entry.name}
              </div>
              <div className={`text-xs ${isHackMode ? 'text-gray-500' : 'text-[#8B7355]/60'}`}>
                {formatDate(entry.timestamp)}
              </div>
            </div>
            <div className={`text-sm ${isHackMode ? 'text-gray-300' : 'text-[#8B7355]'}`}>
              {entry.message}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
