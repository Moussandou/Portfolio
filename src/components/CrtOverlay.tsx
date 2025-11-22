import { useState, useEffect } from 'react';

export function CrtOverlay() {
    const [intensity, setIntensity] = useState<'off' | 'low' | 'high'>('low');

    useEffect(() => {
        // Default to low on mount
        setIntensity('low');
    }, []);

    const toggleIntensity = () => {
        setIntensity(prev => prev === 'low' ? 'high' : prev === 'high' ? 'off' : 'low');
    };

    if (intensity === 'off') return null;

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
                    className="text-[10px] font-mono text-[var(--theme-primary)] opacity-50 hover:opacity-100 border border-[var(--theme-border)]/30 px-2 py-1 rounded bg-[var(--theme-background)]/80 backdrop-blur"
                >
                    CRT: {intensity.toUpperCase()}
                </button>
            </div>
        </div>
    );
}
