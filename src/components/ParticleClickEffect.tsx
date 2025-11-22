import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
    id: number;
    x: number;
    y: number;
    color: string;
}

interface ParticleClickEffectProps {
    isHackMode: boolean;
}

export function ParticleClickEffect({ isHackMode }: ParticleClickEffectProps) {
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const newParticles = Array.from({ length: 8 }).map((_, i) => ({
                id: Date.now() + i,
                x: e.clientX,
                y: e.clientY,
                color: isHackMode
                    ? ['#5DADE2', '#A855F7', '#FFFFFF'][Math.floor(Math.random() * 3)]
                    : ['#0E6655', '#117A65', '#2ECC71'][Math.floor(Math.random() * 3)]
            }));

            setParticles(prev => [...prev, ...newParticles]);

            // Cleanup particles after animation
            setTimeout(() => {
                setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
            }, 1000);
        };

        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, [isHackMode]);

    return (
        <AnimatePresence>
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    initial={{ x: particle.x, y: particle.y, opacity: 1, scale: 0 }}
                    animate={{
                        x: particle.x + (Math.random() - 0.5) * 100,
                        y: particle.y + (Math.random() - 0.5) * 100,
                        opacity: 0,
                        scale: 1
                    }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="fixed w-2 h-2 rounded-full pointer-events-none z-[9999]"
                    style={{ backgroundColor: particle.color }}
                />
            ))}
        </AnimatePresence>
    );
}
