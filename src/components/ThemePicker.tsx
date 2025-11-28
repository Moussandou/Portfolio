import { useTheme, ThemeId } from '../context/ThemeContext';
import { useAchievements } from '../context/AchievementContext';
import { useSound } from '../context/SoundContext';

export function ThemePicker() {
    const { currentTheme, setTheme, isHackMode } = useTheme();
    const { unlockAchievement } = useAchievements();
    const { playSound } = useSound();

    if (!isHackMode) return null;

    const themes: { id: ThemeId; color: string; label: string }[] = [
        { id: 'hack-blue', color: '#5DADE2', label: 'Blue' },
        { id: 'matrix-green', color: '#00FF00', label: 'Green' },
        { id: 'cyber-purple', color: '#D946EF', label: 'Purple' },
        { id: 'error-red', color: '#FF0000', label: 'Red' },
        { id: 'gold-luxury', color: '#FFD700', label: 'Gold' },
    ];

    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-[#5DADE2]">SYSTEM_THEME</span>
                <span className="text-xs font-mono text-gray-400">
                    [{themes.find(t => t.id === currentTheme)?.label.toUpperCase() || 'DEFAULT'}]
                </span>
            </div>
            <div className="flex flex-wrap gap-3">
                {themes.map((theme) => (
                    <button
                        key={theme.id}
                        onClick={() => {
                            setTheme(theme.id);
                            unlockAchievement('theme_switcher');
                            playSound('click');
                        }}
                        className={`w-10 h-10 rounded-lg border-2 transition-all duration-300 hover:scale-110 flex items-center justify-center ${currentTheme === theme.id
                            ? 'border-white scale-110 shadow-[0_0_15px_currentColor]'
                            : 'border-transparent opacity-60 hover:opacity-100'
                            }`}
                        style={{ backgroundColor: theme.color, color: theme.color, borderColor: currentTheme === theme.id ? 'white' : theme.color }}
                        title={theme.label}
                    >
                        {currentTheme === theme.id && (
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
