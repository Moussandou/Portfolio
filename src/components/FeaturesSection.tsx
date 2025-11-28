import { ThemePicker } from './ThemePicker';
import { AchievementList } from './AchievementList';
import { useAchievements } from '../context/AchievementContext';

interface FeaturesSectionProps {
    isHackMode: boolean;
}

export function FeaturesSection({ isHackMode }: FeaturesSectionProps) {
    const { unlockAchievement } = useAchievements();
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
            id: "bsod-trigger",
            action: () => unlockAchievement('curious_cat')
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

            {isHackMode && (
                <div className="space-y-6 mb-8">
                    {/* Theme Picker Section */}
                    <div className="p-4 rounded-lg border border-[#5DADE2]/30 bg-[var(--theme-background)]/50 backdrop-blur-sm">
                        <ThemePicker />
                    </div>

                    {/* Achievements Section */}
                    <div className="p-4 rounded-lg border border-[#5DADE2]/30 bg-[var(--theme-background)]/50 backdrop-blur-sm">
                        <div className="flex items-center justify-between mb-4 border-b border-[#5DADE2]/20 pb-2">
                            <h4 className="text-sm font-bold text-[#5DADE2]">SYSTEM_ACHIEVEMENTS</h4>
                            <span className="text-xs font-mono text-gray-400">STATUS: UNLOCKED</span>
                        </div>
                        <AchievementList />
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {features.map((feat, index) => (
                    <div
                        key={index}
                        id={feat.id}
                        onClick={() => {
                            const feature = feat as { action?: () => void };
                            if (feature.action) feature.action();
                        }}
                        className={`p-3 rounded border transition-all duration-300 h-full flex flex-col ${isHackMode
                            ? 'bg-[var(--theme-background)]/50 border-[var(--theme-border)]/30 hover:border-[var(--theme-primary)] hover:bg-[var(--theme-primary)]/10'
                            : 'bg-white/50 border-[var(--theme-border)]/30 hover:border-[var(--theme-primary)] hover:bg-[var(--theme-primary)]/10'
                            }`}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <div className={`text-2xl text-[var(--theme-primary)]`}>{feat.icon}</div>
                            <div className={`font-mono font-bold text-[var(--theme-primary)]`}>
                                {isHackMode ? `> ${feat.cmd}` : feat.title}
                            </div>
                        </div>
                        <div className={`text-xs font-mono mb-2 px-2 py-1 rounded w-fit bg-[var(--theme-border)]/10 text-[var(--theme-text)]/80`}>
                            {feat.cmd}
                        </div>
                        <p className={`text-xs ${isHackMode ? 'text-gray-400' : 'text-gray-600'} flex-grow`}>
                            {feat.desc}
                        </p>
                    </div>
                ))}
            </div>

            <div className={`text-xs italic text-center mt-4 ${isHackMode ? 'text-gray-500' : 'text-gray-400'}`}>
                * D'autres secrets sont peut-être encore cachés...
            </div>
        </div>
    );
}
