import { useState, useEffect } from 'react';

interface CyberpunkHudProps {
    isHackMode: boolean;
}

export function CyberpunkHud({ isHackMode }: CyberpunkHudProps) {
    const [scrollPos, setScrollPos] = useState(0);

    useEffect(() => {


        const handleScroll = () => {
            setScrollPos(Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100));
        };

        window.addEventListener('scroll', handleScroll);
        return () => {

            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    if (!isHackMode) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[50] overflow-hidden">
            {/* Top Left - Coordinates */}
            <div className="absolute top-4 left-4 font-mono text-[10px] text-[var(--theme-primary)]/60 hidden md:block">
                <div>ORD: {scrollPos.toString().padStart(3, '0')}</div>
                <div>LAT: 43.296</div>
                <div>LNG: 05.369</div>
            </div>

            {/* Top Right - System Status */}
            <div className="absolute top-4 right-4 font-mono text-[10px] text-[var(--theme-primary)]/60 text-right hidden md:block">
                <div>SYS: ONLINE</div>
                <div>MEM: {Math.floor(Math.random() * 30 + 40)}%</div>
                <div>CPU: {Math.floor(Math.random() * 20 + 10)}%</div>
            </div>

            {/* Bottom Left - Decorative Lines */}
            <div className="absolute bottom-4 left-4 w-32 h-32 border-l border-b border-[var(--theme-border)]/30 hidden md:block">
                <div className="absolute bottom-0 left-0 w-2 h-2 bg-[var(--theme-primary)]/50" />
                <div className="absolute bottom-4 left-2 text-[10px] font-mono text-[var(--theme-primary)]/40">
                    SECURE_CONN
                </div>
            </div>

            {/* Bottom Right - Decorative Circle */}
            <div className="absolute bottom-4 right-4 w-24 h-24 border border-[var(--theme-border)]/20 rounded-full flex items-center justify-center hidden md:flex animate-spin-slow">
                <div className="w-20 h-20 border-t border-[var(--theme-primary)]/40 rounded-full" />
            </div>
            <div className="absolute bottom-4 right-4 w-24 h-24 flex items-center justify-center hidden md:flex">
                <span className="text-[10px] font-mono text-[var(--theme-primary)]/40 animate-pulse">SCAN</span>
            </div>

            {/* Crosshairs */}
            <div className="absolute top-1/2 left-4 w-2 h-2 border-t border-l border-[var(--theme-border)]/30 hidden md:block" />
            <div className="absolute top-1/2 right-4 w-2 h-2 border-t border-r border-[var(--theme-border)]/30 hidden md:block" />
        </div>
    );
}
