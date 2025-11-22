import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BootSequenceProps {
    onComplete: () => void;
}

export function BootSequence({ onComplete }: BootSequenceProps) {
    const [lines, setLines] = useState<string[]>([]);
    const [isComplete, setIsComplete] = useState(false);

    const bootLines = useMemo(() => [
        "[████████████] 100% BOOTING MOUSSANDOU_OS...",
        "Loading portfolio modules...",
        "Init: React Framework v18.3",
        "Init: TypeScript Engine",
        "Init: Tailwind CSS Renderer",
        "Mounting Components...",
        "[OK] System Ready",
        "Welcome to my portfolio."
    ], []);

    useEffect(() => {
        let delay = 0;
        bootLines.forEach((line, index) => {
            delay += Math.random() * 300 + 100;
            setTimeout(() => {
                setLines(prev => [...prev, line]);
                if (index === bootLines.length - 1) {
                    setTimeout(() => {
                        setIsComplete(true);
                        setTimeout(onComplete, 500);
                    }, 800);
                }
            }, delay);
        });
    }, [bootLines, onComplete]);

    return (
        <AnimatePresence>
            {!isComplete && (
                <motion.div
                    exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                    transition={{ duration: 0.8 }}
                    className="fixed inset-0 z-[9999] bg-black text-[#5DADE2] font-mono p-8 flex flex-col justify-end pb-20 cursor-wait"
                >
                    <div className="max-w-2xl w-full mx-auto">
                        {lines.map((line, i) => (
                            <div key={i} className="mb-1">
                                <span className="text-gray-500 mr-2">[{new Date().toLocaleTimeString()}]</span>
                                {line}
                            </div>
                        ))}
                        <div className="mt-2 animate-pulse">_</div>
                    </div>

                    {/* Scanline effect */}
                    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none" />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
