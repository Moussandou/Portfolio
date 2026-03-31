interface NeofetchSectionProps {
  isHackMode?: boolean;
}

export function NeofetchSection({ isHackMode = false }: NeofetchSectionProps) {
  const systemInfo = [
    { label: "Nom", value: "Moussandou Mroivili" },
    { label: "Statut", value: "Étudiant 3ème année Epitech" },
    { label: "Spécialité", value: "Développement Web & Applications" },
    { label: "Localisation", value: "Marseille, France" },
    { label: "Téléphone", value: "07 81 63 32 78", link: "tel:+33781633278" },
    { label: "Email", value: "moussandou.mroivili@epitech.eu", link: "mailto:moussandou.mroivili@epitech.eu" },
    { label: "LinkedIn", value: "linkedin.com/in/moussandou", link: "https://www.linkedin.com/in/moussandou/" },
    { label: "Langues", value: "Français (Natif), Anglais (Professionnel)" },
    { label: "Personnalité", value: "Curieux, Passionné, Autonome" },
    { label: "Uptime", value: "20 ans de fonctionnement optimal" }
  ];

  // Logo M ASCII unifié
  const asciiLogo = `
    ███╗   ███╗
    ████╗ ████║
    ██╔████╔██║
    ██║╚██╔╝██║
    ██║ ╚═╝ ██║
    ╚═╝     ╚═╝
  `;

  const colorBar = "████████";

  return (
    <div className="font-mono text-sm">
      <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-4 lg:gap-8">
        {/* Logo ASCII */}
        <div className="flex flex-col items-center lg:items-start">
          <pre className={`text-lg leading-tight ${isHackMode ? 'text-[#5DADE2] hover-glow' : 'text-[#0E6655]'}`}>
            {asciiLogo}
          </pre>
        </div>

        {/* Informations système - Couleur grise uniforme */}
        <div className="space-y-1 text-xs md:text-sm min-w-0">
          {systemInfo.map((info, index) => (
            <div key={index} className={`flex ${isHackMode ? 'hover-glow' : ''}`}>
              <span className={`min-w-[110px] md:min-w-[140px] flex-shrink-0 text-xs md:text-sm ${isHackMode ? 'text-white' : 'text-[#117A65]'}`}>{info.label}:</span>
              {info.link ? (
                <a
                  href={info.link}
                  target={info.link.startsWith('http') ? '_blank' : undefined}
                  rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={`ml-2 text-xs md:text-sm break-all underline decoration-dotted ${isHackMode ? 'text-[#85C1E9] hover:text-[#5DADE2]' : 'text-[#117A65] hover:text-[#0E6655]'} transition-colors`}
                >
                  {info.value}
                </a>
              ) : (
                <span className={`ml-2 text-xs md:text-sm break-words ${isHackMode ? 'text-gray-400' : 'text-[#117A65]'}`}>
                  {info.value}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Métriques de performance */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
        <div className={isHackMode ? 'hover-glow' : ''}>
          <div className={isHackMode ? 'text-[#5DADE2]' : 'text-[#0E6655] font-semibold'}>Projets</div>
          <div className={isHackMode ? 'text-white' : 'text-[#117A65]'}>15+ complétés</div>
        </div>
        <div className={isHackMode ? 'hover-glow' : ''}>
          <div className={isHackMode ? 'text-[#5DADE2]' : 'text-[#0E6655] font-semibold'}>Langages</div>
          <div className={isHackMode ? 'text-white' : 'text-[#117A65]'}>8 maîtrisés</div>
        </div>
        <div className={isHackMode ? 'hover-glow' : ''}>
          <div className={isHackMode ? 'text-[#5DADE2]' : 'text-[#0E6655] font-semibold'}>Experience</div>
          <div className={isHackMode ? 'text-white' : 'text-[#117A65]'}>2+ ans</div>
        </div>
        <div className={isHackMode ? 'hover-glow' : ''}>
          <div className={isHackMode ? 'text-[#5DADE2]' : 'text-[#0E6655] font-semibold'}>Motivation</div>
          <div className={isHackMode ? 'text-white' : 'text-[#117A65]'}>100%</div>
        </div>
      </div>

      {/* Palette de couleurs */}
      <div className="mt-4 flex justify-center">
        <div className="flex gap-1 text-xs opacity-60">
          <div className={isHackMode ? 'text-[#5DADE2]' : 'text-[#0E6655]'}>{colorBar}</div>
          <div className={isHackMode ? 'text-[#85C1E9]' : 'text-[#C9A961]'}>{colorBar}</div>
          <div className={isHackMode ? 'text-[#85C1E9]' : 'text-[#117A65]'}>{colorBar}</div>
          <div className={isHackMode ? 'text-[#5DADE2]' : 'text-[#CC7A5C]'}>{colorBar}</div>
        </div>
      </div>
    </div>
  );
}