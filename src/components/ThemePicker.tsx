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
        <div className="flex gap-2 p-2 bg-black/20 rounded-lg backdrop-blur-sm border border-[var(--theme-border)]/30">
            {themes.map((theme) => (
                <button
                    key={theme.id}
                    onClick={() => {
                        setTheme(theme.id);
                        unlockAchievement('theme_switcher');
                        playSound('click');
                    }}
                    className={`w - 6 h - 6 rounded - full border - 2 transition - all duration - 300 hover: scale - 110 ${currentTheme === theme.id
                            ? 'border-white scale-110 shadow-[0_0_10px_currentColor]'
                            : 'border-transparent opacity-70 hover:opacity-100'
                        } `}
                    style={{ backgroundColor: theme.color, color: theme.color }}
                    title={theme.label}
                />
            ))}
        </div>
    );
}
