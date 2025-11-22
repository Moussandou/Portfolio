import { useState, useEffect } from 'react';

interface CrtOverlayProps {
    isHackMode: boolean;
}

export function CrtOverlay({ isHackMode }: CrtOverlayProps) {
    const [intensity, setIntensity] = useState<'off' | 'low' | 'high'>('low');

    useEffect(() => {
        // Reset to low when hack mode changes, or keep user preference?
        // Let's keep it simple for now: if hack mode is off, CRT is off.
        if (!isHackMode) {
            setIntensity('off');
        } else {
            setIntensity('low');
        }
    }, [isHackMode]);

    const toggleIntensity = () => {
        if (!isHackMode) return;
        setIntensity(prev => prev === 'low' ? 'high' : prev === 'high' ? 'off' : 'low');
    };

    if (!isHackMode || intensity === 'off') return null;

    return (
        <div className={`pointer-events-none fixed inset-0 z-[9999] overflow-hidden ${intensity === 'high' ? 'opacity-100' : 'opacity-50'}`}>
            {/* Scanlines */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none" />

            {/* Flicker */}
            <div className="absolute inset-0 bg-white opacity-[0.02] animate-flicker pointer-events-none" />

            {/* Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />

            {/* Control Button (Visible and clickable) */}
            <div className="fixed bottom-4 left-4 pointer-events-auto z-[10000]">
                <button
                    onClick={toggleIntensity}
                    className="text-[10px] font-mono text-[#5DADE2] opacity-50 hover:opacity-100 border border-[#5DADE2]/30 px-2 py-1 rounded bg-[#0F1729]/80 backdrop-blur"
                >
                    CRT: {intensity.toUpperCase()}
                </button>
            </div>
        </div>
    );
}
