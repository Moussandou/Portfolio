import { useState } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';

interface CyberpunkHudProps {
    isHackMode: boolean;
}

export function CyberpunkHud({ isHackMode }: CyberpunkHudProps) {
    const { scrollYProgress } = useScroll();
    const [displayScroll, setDisplayScroll] = useState(0);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        setDisplayScroll(Math.round(latest * 100));
    });

    if (!isHackMode) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[50] overflow-hidden">
            {/* Top Left - Coordinates */}
            <div className="absolute top-4 left-4 font-mono text-[10px] text-[#5DADE2] hidden md:block">
                <div>ORD: {displayScroll.toString().padStart(3, '0')}</div>
                <div>LAT: 43.296</div>
                <div>LNG: 05.369</div>
            </div>



            {/* Bottom Left - Decorative Lines */}
            <div className="absolute bottom-4 left-4 w-32 h-32 border-l border-b border-[#5DADE2]/60 hidden md:block">
                <div className="absolute bottom-0 left-0 w-2 h-2 bg-[#5DADE2]" />
                <div className="absolute bottom-4 left-2 text-[10px] font-mono text-[#5DADE2]/80">
                    SECURE_CONN
                </div>
            </div>

            {/* Crosshairs */}
            <div className="absolute top-1/2 left-4 w-2 h-2 border-t border-l border-[#5DADE2]/60 hidden md:block" />
            <div className="absolute top-1/2 right-4 w-2 h-2 border-t border-r border-[#5DADE2]/60 hidden md:block" />
        </div>
    );
}
