import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSound } from './SoundContext';

export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    hidden?: boolean;
}

export const ACHIEVEMENTS: Achievement[] = [
    { id: 'konami_master', title: 'God Mode', description: 'Activate the Konami Code.', icon: '🎮', hidden: true },
    { id: 'theme_switcher', title: 'Chameleon', description: 'Change the interface theme.', icon: '🎨' },
    { id: 'terminal_wizard', title: 'Script Kiddie', description: 'Run a command in the terminal.', icon: '💻' },
    { id: 'curious_cat', title: 'Curiosity Killed the Cat', description: 'Trigger the Blue Screen of Death.', icon: '💀', hidden: true },
    { id: 'hacker_mode', title: 'Red Pill', description: 'Enter Hack Mode for the first time.', icon: '🕶️' },
    { id: 'time_traveler', title: 'Time Traveler', description: 'Click on the system clock.', icon: '⏰' },
];

interface AchievementContextType {
    achievements: Achievement[];
    unlockedIds: string[];
    unlockAchievement: (id: string) => void;
    latestUnlock: Achievement | null;
    clearLatestUnlock: () => void;
}

const AchievementContext = createContext<AchievementContextType | undefined>(undefined);

export function AchievementProvider({ children }: { children: React.ReactNode }) {
    const [unlockedIds, setUnlockedIds] = useState<string[]>(() => {
        const saved = localStorage.getItem('unlocked_achievements');
        return saved ? JSON.parse(saved) : [];
    });
    const [latestUnlock, setLatestUnlock] = useState<Achievement | null>(null);
    const { playSound } = useSound();

    useEffect(() => {
        localStorage.setItem('unlocked_achievements', JSON.stringify(unlockedIds));
    }, [unlockedIds]);

    const unlockAchievement = (id: string) => {
        if (!unlockedIds.includes(id)) {
            const achievement = ACHIEVEMENTS.find(a => a.id === id);
            if (achievement) {
                setUnlockedIds(prev => [...prev, id]);
                setLatestUnlock(achievement);
                playSound('success'); // Or a specific achievement sound if available

                // Auto-clear notification after 5 seconds
                setTimeout(() => {
                    setLatestUnlock(null);
                }, 5000);
            }
        }
    };

    const clearLatestUnlock = () => setLatestUnlock(null);

    return (
        <AchievementContext.Provider value={{
            achievements: ACHIEVEMENTS,
            unlockedIds,
            unlockAchievement,
            latestUnlock,
            clearLatestUnlock
        }}>
            {children}
        </AchievementContext.Provider>
    );
}

export function useAchievements() {
    const context = useContext(AchievementContext);
    if (context === undefined) {
        throw new Error('useAchievements must be used within an AchievementProvider');
    }
    return context;
}
