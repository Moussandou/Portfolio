import { useRef, useState, useEffect } from 'react';
// import { useDataViz } from '../context/DataVizContext'; // Removed unused
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
    // const { activeViz, closeViz } = useDataViz(); // Removed unused
    const { isHackMode } = useTheme();
    const [rotation, setRotation] = useState({ x: 60, z: 45 });
    const [isDragging, setIsDragging] = useState(false);
    const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
    const cityData = useRef(generateCityData()).current;
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [scale, setScale] = useState(0.6);

    useEffect(() => {
        if (!containerRef.current) return;

        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect;
                setDimensions({ width, height });

                // Calculate scale to fit the 900px city into the container
                // Add some padding (e.g. 40px)
                const targetScale = Math.min(0.6, (width - 40) / 900);
                setScale(Math.max(0.25, targetScale)); // Minimum scale 0.25
            }
        });

        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

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

    const handleTouchStart = (e: React.TouchEvent) => {
        const touch = e.touches[0];
        setIsDragging(true);
        setLastMousePos({ x: touch.clientX, y: touch.clientY });
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return;
        const touch = e.touches[0];
        const deltaX = touch.clientX - lastMousePos.x;
        const deltaY = touch.clientY - lastMousePos.y;

        setRotation(prev => ({
            x: Math.max(0, Math.min(90, prev.x - deltaY * 0.5)),
            z: prev.z + deltaX * 0.5
        }));

        setLastMousePos({ x: touch.clientX, y: touch.clientY });
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
    };

    const getBlockColor = (count: number) => {
        if (count === 0) return isHackMode ? 'rgba(13, 17, 23, 0.8)' : 'rgba(235, 237, 240, 0.8)';
        if (count < 5) return isHackMode ? '#0e4429' : '#9be9a8';
        if (count < 10) return isHackMode ? '#006d32' : '#40c463';
        if (count < 20) return isHackMode ? '#26a641' : '#30a14e';
        return isHackMode ? '#39d353' : '#216e39';
    };

    const [isEnabled, setIsEnabled] = useState(false);

    // ... existing hooks ...

    // If disabled, show placeholder
    if (!isEnabled) {
        return (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-transparent">
                <div className={`p-6 rounded-lg border backdrop-blur-sm flex flex-col items-center gap-4 ${isHackMode ? 'bg-[#0A0E1A]/80 border-[#5DADE2]/30' : 'bg-white/80 border-gray-300'}`}>
                    <div className={`text-4xl mb-2 ${isHackMode ? 'text-[#5DADE2]' : 'text-[#0E6655]'}`}>🏙️</div>
                    <h3 className={`text-xl font-bold font-mono ${isHackMode ? 'text-white' : 'text-[#0E6655]'}`}>GITHUB_CITY_VIZ</h3>
                    <p className={`text-sm text-center max-w-xs ${isHackMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        3D visualization of commit activity.
                        <br />
                        High resource usage warning.
                    </p>
                    <button
                        onClick={() => setIsEnabled(true)}
                        className={`px-6 py-2 rounded font-bold font-mono transition-all ${isHackMode
                            ? 'bg-[#5DADE2]/20 text-[#5DADE2] border border-[#5DADE2] hover:bg-[#5DADE2]/30'
                            : 'bg-[#0E6655]/10 text-[#0E6655] border border-[#0E6655] hover:bg-[#0E6655]/20'
                            }`}
                    >
                        [ INITIALIZE_RENDER ]
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div ref={containerRef} className="absolute inset-0 z-10 flex items-center justify-center bg-transparent overflow-hidden">
            <div className="absolute top-4 left-4 z-20 pointer-events-none">
                <div className={`p-2 rounded backdrop-blur-md ${isHackMode ? 'bg-black/40 border border-[#5DADE2]/30' : 'bg-white/40 border border-gray-200'}`}>
                    <h2 className={`text-lg font-bold mb-1 font-mono ${isHackMode ? 'text-[#5DADE2]' : 'text-[#0E6655]'}`}>GITHUB CITY</h2>
                    <p className={`text-xs font-mono mb-2 ${isHackMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className={isHackMode ? 'text-[#5DADE2]' : 'text-[#0E6655]'}>Drag & Drop</span> to explore.
                    </p>
                </div>
            </div>

            {/* Stop Button */}
            <div className="absolute top-4 right-4 z-30">
                <button
                    onClick={() => setIsEnabled(false)}
                    className={`p-2 rounded-full transition-colors ${isHackMode
                        ? 'bg-red-500/20 text-red-400 hover:bg-red-500/40'
                        : 'bg-red-500/10 text-red-600 hover:bg-red-500/20'}`}
                    title="Stop Visualization"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>

            <div
                className="w-full h-full flex items-center justify-center cursor-move touch-none"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{ perspective: '800px' }}
            >
                {/* ... existing 3D content ... */}
                <div
                    className="relative transform-style-3d transition-transform duration-75"
                    style={{
                        transform: `rotateX(${rotation.x}deg) rotateZ(${rotation.z}deg) scale(${scale})`,
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
