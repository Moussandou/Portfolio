import { useState, useEffect } from 'react';

interface FakeBSODProps {
    triggerId?: string;
}

export function FakeBSOD({ triggerId = 'bsod-trigger' }: FakeBSODProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const trigger = document.getElementById(triggerId);
        if (!trigger) return;

        const handleClick = (e: MouseEvent) => {
            e.preventDefault();
            setIsVisible(true);
            document.body.style.overflow = 'hidden';

            // Simulate progress
            let p = 0;
            const interval = setInterval(() => {
                p += Math.random() * 5;
                if (p > 100) p = 100;
                setProgress(Math.floor(p));
                if (p >= 100) clearInterval(interval);
            }, 200);
        };

        trigger.addEventListener('click', handleClick);

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isVisible) {
                setIsVisible(false);
                document.body.style.overflow = 'auto';
                setProgress(0);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            trigger.removeEventListener('click', handleClick);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [triggerId, isVisible]);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[99999] bg-[#0078D7] text-white font-mono p-8 sm:p-20 cursor-none flex flex-col items-start justify-center select-none">
            <div className="text-6xl mb-8">:(</div>
            <div className="text-2xl mb-8">
                Your PC ran into a problem and needs to restart. We're just collecting some error info, and then we'll restart for you.
            </div>
            <div className="text-4xl mb-8">
                {progress}% complete
            </div>

            <div className="mt-8 flex items-center gap-4">
                <div className="w-24 h-24 bg-white p-1">
                    <div className="w-full h-full bg-black flex items-center justify-center text-[8px] text-white text-center">
                        QR CODE
                    </div>
                </div>
                <div className="text-sm">
                    <div>For more information about this issue and possible fixes, visit https://www.windows.com/stopcode</div>
                    <div className="mt-2">If you call a support person, give them this info:</div>
                    <div>Stop code: CRITICAL_PROCESS_DIED</div>
                </div>
            </div>

            <div className="absolute bottom-8 right-8 text-sm opacity-50 animate-pulse">
                Press ESC to force restart
            </div>
        </div>
    );
}
