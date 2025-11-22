import { useState, useEffect } from 'react';

interface LiveClockProps {
    isHackMode: boolean;
}

export function LiveClock({ isHackMode }: LiveClockProps) {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className={`fixed top-4 left-4 sm:top-6 sm:left-6 z-50 font-mono text-xs sm:text-sm px-3 py-1 rounded border backdrop-blur-sm transition-colors duration-300 ${isHackMode
                ? 'bg-[#0F1729]/80 border-[#5DADE2] text-[#5DADE2] shadow-[0_0_10px_rgba(93,173,226,0.3)]'
                : 'bg-white/80 border-[#0E6655] text-[#0E6655] shadow-md'
            }`}>
            <span className="mr-2 opacity-70">SYS.TIME</span>
            {time.toLocaleTimeString()}
        </div>
    );
}
