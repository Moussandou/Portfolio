import { useRef, useState } from 'react';
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
                    className="px-4 py-2 bg-red-500/20 text-red-500 border border-red-500 rounded hover:bg-red-500/40 transition-colors"
                >
                    CLOSE [ESC]
                </button>
            </div>

            <div className="absolute top-4 left-4 z-[100] text-white pointer-events-none">
                <h2 className="text-2xl font-bold mb-2">GITHUB CITY</h2>
                <p className="opacity-70 text-sm">Drag to rotate view</p>
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
                        className={`absolute inset-0 transform -translate-x-1/2 -translate-y-1/2 ${isHackMode ? 'bg-[#0d1117]/90 border-[#30363d]' : 'bg-white/90 border-gray-200'} border-4`}
                        style={{
                            width: '800px',
                            height: '800px',
                            transform: 'translate(-50%, -50%)'
                        }}
                    />

                    {/* City Blocks */}
                    <div className="grid grid-cols-52 gap-1" style={{ width: '700px', height: '100px', transform: 'translate(-350px, -50px)' }}>
                        {cityData.map((week, wIndex) => (
                            <div key={wIndex} className="flex flex-col gap-1">
                                {week.map((count, dIndex) => (
                                    <div
                                        key={`${wIndex}-${dIndex}`}
                                        className="w-3 h-3 relative transform-style-3d transition-all duration-300 hover:brightness-125"
                                        style={{
                                            transform: `translateZ(${count * 2}px)`,
                                        }}
                                    >
                                        {/* Top Face */}
                                        <div
                                            className="absolute inset-0"
                                            style={{
                                                backgroundColor: getBlockColor(count),
                                                boxShadow: count > 0 ? `0 0 ${count}px ${getBlockColor(count)}` : 'none'
                                            }}
                                        />

                                        {/* Side Faces (only for tall blocks to save DOM/GPU) */}
                                        {count > 0 && (
                                            <>
                                                <div
                                                    className="absolute inset-0 origin-bottom"
                                                    style={{
                                                        height: `${count * 4}px`,
                                                        transform: 'rotateX(-90deg)',
                                                        backgroundColor: getBlockColor(count),
                                                        filter: 'brightness(0.7)'
                                                    }}
                                                />
                                                <div
                                                    className="absolute inset-0 origin-right"
                                                    style={{
                                                        width: `${count * 4}px`,
                                                        transform: 'rotateY(90deg)',
                                                        backgroundColor: getBlockColor(count),
                                                        filter: 'brightness(0.8)'
                                                    }}
                                                />
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
