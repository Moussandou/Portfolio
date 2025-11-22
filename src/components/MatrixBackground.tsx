import { useEffect, useRef } from 'react';

interface MatrixBackgroundProps {
    isHackMode: boolean;
}

export function MatrixBackground({ isHackMode }: MatrixBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let width = window.innerWidth;
        let height = window.innerHeight;

        // Configuration
        const fontSize = 14;
        const columns = Math.ceil(width / fontSize);
        const drops: number[] = [];
        const chars = "0123456789ABCDEF";

        // Initialize drops
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.random() * -100; // Start above screen
        }

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener('resize', resize);
        resize();

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener('mousemove', handleMouseMove);

        const draw = () => {
            // Semi-transparent black for trail effect
            ctx.fillStyle = isHackMode ? 'rgba(10, 14, 26, 0.1)' : 'rgba(232, 248, 245, 0.2)';
            ctx.fillRect(0, 0, width, height);

            ctx.font = `${fontSize}px 'Share Tech Mono', monospace`;

            for (let i = 0; i < drops.length; i++) {
                // Random character
                const text = chars[Math.floor(Math.random() * chars.length)];

                // Interaction with mouse
                const x = i * fontSize;
                const y = drops[i] * fontSize;

                const dist = Math.hypot(x - mouseRef.current.x, y - mouseRef.current.y);
                const isNearMouse = dist < 100;

                // Color logic
                if (isHackMode) {
                    if (isNearMouse) {
                        ctx.fillStyle = '#FFFFFF'; // White near mouse
                        ctx.shadowBlur = 15;
                        ctx.shadowColor = '#FFFFFF';
                    } else {
                        ctx.fillStyle = Math.random() > 0.95 ? '#A855F7' : '#5DADE2'; // Purple/Blue mix
                        ctx.shadowBlur = 0;
                    }
                } else {
                    // Light mode colors
                    ctx.fillStyle = isNearMouse ? '#0E6655' : '#117A65';
                    ctx.shadowBlur = 0;
                }

                ctx.fillText(text, x, y);

                // Reset drop or move down
                if (y > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }

                drops[i]++;
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [isHackMode]);

    if (!isHackMode) return null;

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-40"
        />
    );
}
