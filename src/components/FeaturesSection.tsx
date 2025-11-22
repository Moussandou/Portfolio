import { ThemePicker } from './ThemePicker';

interface FeaturesSectionProps {
    isHackMode: boolean;
}

export function FeaturesSection({ isHackMode }: FeaturesSectionProps) {
    const features = [
        {
            icon: "⌨️",
            title: "Command Palette",
            cmd: "Cmd + K",
            desc: "Accès rapide à toutes les fonctions du système."
        },
        {
            icon: "🎮",
            title: "Konami Code",
            cmd: "↑ ↑ ↓ ↓ ← → ← → B A",
            desc: "Débloque le mode GOD (Admin Access)."
        },
        {
            icon: "🖱️",
            title: "Menu Système",
            cmd: "Clic-Droit",
            desc: "Menu contextuel personnalisé avec outils rapides."
        },
        {
            icon: "🔊",
            title: "Sound System",
            cmd: "Auto / Toggle",
            desc: "Effets sonores réactifs (clavier mécanique, bips)."
        },
        {
            icon: "⏰",
            title: "Live Clock",
            cmd: "Widget",
            desc: "Horloge système temps réel."
        },
        {
            icon: "🚀",
            title: "Boot Sequence",
            cmd: "Reload",
            desc: "Animation de démarrage cinématique."
        },
        {
            icon: "💀",
            title: "Don't Click",
            cmd: "DANGER",
            desc: "Ne cliquez surtout pas ici.",
            id: "bsod-trigger"
        }
    ];

    return (
        <div className="space-y-6">
            <div className={`border-b pb-2 ${isHackMode ? 'border-[#5DADE2]/30' : 'border-[#0E6655]/30'}`}>
                <h3 className={`text-lg font-bold ${isHackMode ? 'text-[#5DADE2]' : 'text-[#0E6655]'}`}>
          // SYSTEM_FEATURES_LIST
                </h3>
                <p className={`text-xs ${isHackMode ? 'text-gray-400' : 'text-[#117A65]'}`}>
                    Liste des fonctionnalités cachées et raccourcis.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-4">
                    {isHackMode && (
                        <div className="flex justify-center mb-4">
                            <ThemePicker />
                        </div>
                    )}
                    {features.map((feat, index) => (
                        <div
                            key={index}
                            id={feat.id}
                            className={`p-3 rounded border transition-all duration-300 ${isHackMode
                                ? 'bg-[var(--theme-background)]/50 border-[var(--theme-border)]/30 hover:border-[var(--theme-primary)] hover:bg-[var(--theme-primary)]/10'
                                : 'bg-white/50 border-[var(--theme-border)]/30 hover:border-[var(--theme-primary)] hover:bg-[var(--theme-primary)]/10'
                                }`}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <div className={`text-2xl mb-2 text-[var(--theme-primary)]`}>{feat.icon}</div>
                                <div className={`font-mono font-bold mb-1 text-[var(--theme-primary)]`}>
                                    {isHackMode ? `> ${feat.cmd}` : feat.title}
                                </div>
                            </div>
                            <div className={`text-xs font-mono mb-1 px-2 py-1 rounded w-fit bg-[var(--theme-border)]/10 text-[var(--theme-text)]/80`}>
                                {feat.cmd}
                            </div>
                            <p className={`text-xs ${isHackMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                {feat.desc}
                            </p>
                        </div>
                    ))}
                </div>

                <div className={`text-xs italic text-center mt-4 ${isHackMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    * D'autres secrets sont peut-être encore cachés...
                </div>
            </div>
        </div>
    );
}
