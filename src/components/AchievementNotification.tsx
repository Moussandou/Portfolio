import { motion, AnimatePresence } from 'framer-motion';
import { useAchievements } from '../context/AchievementContext';
import { useTheme } from '../context/ThemeContext';

export function AchievementNotification() {
    const { latestUnlock, clearLatestUnlock } = useAchievements();
    const { isHackMode } = useTheme();

    return (
        <AnimatePresence>
            {latestUnlock && (
                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 100, opacity: 0 }}
                    className={`fixed top-24 right-4 z-[10000] p-4 rounded-lg shadow-2xl border-l-4 flex items-center gap-4 max-w-sm cursor-pointer ${isHackMode
                            ? 'bg-black/90 border-[#FFD700] text-[#FFD700] shadow-[0_0_20px_rgba(255,215,0,0.3)]'
                            : 'bg-white/95 border-yellow-500 text-gray-800 shadow-xl'
                        }`}
                    onClick={clearLatestUnlock}
                >
                    <div className="text-4xl animate-bounce">
                        🏆
                    </div>
                    <div>
                        <div className="font-bold text-xs uppercase tracking-wider mb-1 opacity-70">
                            Achievement Unlocked
                        </div>
                        <div className="font-bold text-lg leading-tight">
                            {latestUnlock.title}
                        </div>
                        <div className={`text-xs mt-1 ${isHackMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {latestUnlock.description}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
