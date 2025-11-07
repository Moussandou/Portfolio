export function NeofetchSection() {
  const systemInfo = [
    { label: "Nom", value: "Moussandou Mroivili" },
    { label: "Statut", value: "Étudiant 3ème année Epitech" },
    { label: "Spécialité", value: "Développement Web & Applications" },
    { label: "Localisation", value: "Marseille, France" },
    { label: "Téléphone", value: "07 81 63 32 78" },
    { label: "Email", value: "moussandou.m@gmail.com" },
    { label: "LinkedIn", value: "linkedin.com/in/moussandou" },
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
          <pre className="text-[#A855F7] text-lg leading-tight hover-glow">
            {asciiLogo}
          </pre>
        </div>

        {/* Informations système - Couleur grise uniforme */}
        <div className="space-y-1 text-xs md:text-sm min-w-0">
          {systemInfo.map((info, index) => (
            <div key={index} className="flex hover-glow">
              <span className="text-white min-w-[110px] md:min-w-[140px] flex-shrink-0 text-xs md:text-sm">{info.label}:</span>
              <span className="ml-2 text-xs md:text-sm text-gray-400 break-words">
                {info.value}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Métriques de performance */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
        <div className="hover-glow">
          <div className="text-[#A855F7]">Projets</div>
          <div className="text-white">15+ complétés</div>
        </div>
        <div className="hover-glow">
          <div className="text-[#A855F7]">Langages</div>
          <div className="text-white">8 maîtrisés</div>
        </div>
        <div className="hover-glow">
          <div className="text-[#A855F7]">Experience</div>
          <div className="text-white">2+ ans</div>
        </div>
        <div className="hover-glow">
          <div className="text-[#A855F7]">Motivation</div>
          <div className="text-white">100%</div>
        </div>
      </div>

      {/* Palette de couleurs */}
      <div className="mt-4 flex justify-center">
        <div className="flex gap-1 text-xs opacity-60">
          <div className="text-[#A855F7]">{colorBar}</div>
          <div className="text-[#FFD700]">{colorBar}</div>
          <div className="text-[#00FFFF]">{colorBar}</div>
          <div className="text-[#FF0080]">{colorBar}</div>
        </div>
      </div>
    </div>
  );
}