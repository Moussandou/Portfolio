import { useRef, useState, useEffect } from 'react';
import { useDataViz } from '../context/DataVizContext';
import { useTheme } from '../context/ThemeContext';

// Mock data for the city
const generateCityData = () => {
    const weeks = 52;
    const days = 7;
    const data = [];
    for (let w = 0; w < weeks; w++) {
        const week = [];
        for (let d = 0; d < days; d++) {
            // Random commit count with some "activity bursts"
            const base = Math.random() > 0.7 ? Math.floor(Math.random() * 10) : 0;
            const count = Math.random() > 0.9 ? base + 15 : base;
            week.push(count);
        }
        data.push(week);
    }
    return data;
};

export function GithubCity() {
    const { activeViz, closeViz } = useDataViz();
    const { isHackMode } = useTheme();
    const [rotation, setRotation] = useState({ x: 60, z: 45 });
    const [isDragging, setIsDragging] = useState(false);
    const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
    const cityData = useRef(generateCityData()).current;

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeViz();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [closeViz]);

    if (activeViz !== 'github-city') return null;

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setLastMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        const deltaX = e.clientX - lastMousePos.x;
        const deltaY = e.clientY - lastMousePos.y;

        setRotation(prev => ({
            x: Math.max(0, Math.min(90, prev.x - deltaY * 0.5)),
            z: prev.z + deltaX * 0.5
        }));

        setLastMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const getBlockColor = (count: number) => {
        if (count === 0) return isHackMode ? 'rgba(13, 17, 23, 0.8)' : 'rgba(235, 237, 240, 0.8)';
        if (count < 5) return isHackMode ? '#0e4429' : '#9be9a8';
        if (count < 10) return isHackMode ? '#006d32' : '#40c463';
        if (count < 20) return isHackMode ? '#26a641' : '#30a14e';
        return isHackMode ? '#39d353' : '#216e39';
    };

    return (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="absolute top-4 right-4 z-[100]">
                <button
                    onClick={closeViz}
                    className="px-4 py-2 bg-red-500/20 text-red-500 border border-red-500 rounded hover:bg-red-500/40 transition-colors font-mono"
                >
                    FERMER [ESC]
                </button>
            </div>

            <div className="absolute top-4 left-4 z-[100] max-w-md pointer-events-none">
                <div className="p-4 bg-black/60 border border-[#5DADE2]/30 rounded backdrop-blur-md">
                    <h2 className="text-2xl font-bold mb-2 text-[#5DADE2] font-mono">GITHUB CITY</h2>
                    <p className="text-gray-300 text-sm mb-2 font-mono">
                        Visualisation 3D de l'activité GitHub.
                    </p>
                    <p className="text-gray-400 text-xs font-mono border-t border-gray-700 pt-2 mt-2">
                        Chaque "gratte-ciel" représente une journée de code. <br />
                        La hauteur correspond au nombre de contributions.<br />
                        <span className="text-[#5DADE2]">Drag & Drop</span> pour explorer la ville.
                    </p>
                </div>
            </div>

            <div
                className="w-full h-full flex items-center justify-center overflow-hidden cursor-move"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                style={{ perspective: '1000px' }}
            >
                <div
                    className="relative transform-style-3d transition-transform duration-75"
                    style={{
                        transform: `rotateX(${rotation.x}deg) rotateZ(${rotation.z}deg) translateZ(-100px)`,
                        transformStyle: 'preserve-3d'
                    }}
                >
                    {/* Base Platform */}
                    <div
                        className={`absolute inset-0 transform -translate-x-1/2 -translate-y-1/2 ${isHackMode ? 'bg-[#0d1117]/90 border-[#30363d]' : 'bg-white/90 border-gray-200'} border-4 shadow-2xl`}
                        style={{
                            width: '900px',
                            height: '220px',
                            transform: 'translate(-50%, -50%)',
                            boxShadow: isHackMode ? '0 0 50px rgba(0,0,0,0.5)' : '0 0 50px rgba(0,0,0,0.1)'
                        }}
                    />

                    {/* City Blocks */}
                    <div
                        className="grid gap-1"
                        style={{
                            gridTemplateColumns: 'repeat(52, 1fr)',
                            width: 'max-content',
                            transform: 'translate(-50%, -50%)',
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transformStyle: 'preserve-3d'
                        }}
                    >
                        {cityData.map((week, wIndex) => (
                            <div key={wIndex} className="flex flex-col gap-1" style={{ transformStyle: 'preserve-3d' }}>
                                {week.map((count, dIndex) => {
                                    const height = Math.max(2, count * 12); // Minimum height for visibility
                                    return (
                                        <div
                                            key={`${wIndex}-${dIndex}`}
                                            className="w-3 h-3 relative transform-style-3d transition-all duration-300"
                                            style={{
                                                transform: `translateZ(${height}px)`,
                                                transformStyle: 'preserve-3d'
                                            }}
                                        >
                                            {/* Roof (Top Face) */}
                                            <div
                                                className="absolute inset-0"
                                                style={{
                                                    backgroundColor: getBlockColor(count),
                                                    boxShadow: count > 0 ? `0 0 ${count}px ${getBlockColor(count)}` : 'none',
                                                    backfaceVisibility: 'hidden'
                                                }}
                                            />

                                            {/* Sides - Only render if height > 0 */}
                                            {count > 0 && (
                                                <>
                                                    {/* Front (South) */}
                                                    <div
                                                        className="absolute inset-x-0 top-full origin-top"
                                                        style={{
                                                            height: `${height}px`,
                                                            transform: 'rotateX(-90deg)',
                                                            backgroundColor: getBlockColor(count),
                                                            filter: 'brightness(0.6)'
                                                        }}
                                                    />
                                                    {/* Back (North) */}
                                                    <div
                                                        className="absolute inset-x-0 bottom-full origin-bottom"
                                                        style={{
                                                            height: `${height}px`,
                                                            transform: 'rotateX(90deg)',
                                                            backgroundColor: getBlockColor(count),
                                                            filter: 'brightness(0.8)'
                                                        }}
                                                    />
                                                    {/* Right (East) */}
                                                    <div
                                                        className="absolute inset-y-0 left-full origin-left"
                                                        style={{
                                                            width: `${height}px`,
                                                            transform: 'rotateY(90deg)',
                                                            backgroundColor: getBlockColor(count),
                                                            filter: 'brightness(0.5)'
                                                        }}
                                                    />
                                                    {/* Left (West) */}
                                                    <div
                                                        className="absolute inset-y-0 right-full origin-right"
                                                        style={{
                                                            width: `${height}px`,
                                                            transform: 'rotateY(-90deg)',
                                                            backgroundColor: getBlockColor(count),
                                                            filter: 'brightness(0.7)'
                                                        }}
                                                    />
                                                </>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
