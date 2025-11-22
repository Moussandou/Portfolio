import { useState, useEffect } from 'react';
import { useAchievements } from '../context/AchievementContext';

interface LiveClockProps {
    isHackMode: boolean;
}

export function LiveClock({ isHackMode }: LiveClockProps) {
    const [time, setTime] = useState(new Date());
    const { unlockAchievement } = useAchievements();

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div
            className={`fixed bottom-4 right-4 z-50 font-mono text-xs sm:text-sm cursor-pointer select-none transition-colors duration-300 ${isHackMode ? 'text-[#5DADE2]' : 'text-[#0E6655]'}`}
            onClick={() => unlockAchievement('time_traveler')}
        >
            <span className="mr-2 opacity-70">SYS.TIME</span>
            {time.toLocaleTimeString()}
        </div>
    );
}
