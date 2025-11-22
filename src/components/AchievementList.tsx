import { useAchievements } from '../context/AchievementContext';
import { useTheme } from '../context/ThemeContext';

export function AchievementList() {
    const { achievements, unlockedIds } = useAchievements();
    const { isHackMode } = useTheme();

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {achievements.map(achievement => {
                const isUnlocked = unlockedIds.includes(achievement.id);
                const isHidden = achievement.hidden && !isUnlocked;

                return (
                    <div
                        key={achievement.id}
                        className={`relative p-3 rounded border transition-all duration-300 flex flex-col items-center text-center gap-2 ${isUnlocked
                                ? isHackMode
                                    ? 'bg-[var(--theme-primary)]/10 border-[var(--theme-primary)] text-[var(--theme-primary)]'
                                    : 'bg-yellow-50 border-yellow-500 text-yellow-700'
                                : isHackMode
                                    ? 'bg-gray-900/50 border-gray-800 text-gray-600 grayscale'
                                    : 'bg-gray-100 border-gray-200 text-gray-400 grayscale'
                            }`}
                    >
                        <div className="text-3xl">
                            {isHidden ? '❓' : achievement.icon}
                        </div>
                        <div className="w-full">
                            <div className="font-bold text-xs sm:text-sm">
                                {isHidden ? '???' : achievement.title}
                            </div>
                            <div className="text-[10px] opacity-70 mt-1">
                                {isHidden ? 'Secret Achievement' : achievement.description}
                            </div>
                        </div>

                        {!isUnlocked && (
                            <div className="absolute top-2 right-2 text-[10px] opacity-50">
                                🔒
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
