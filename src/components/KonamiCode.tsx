import { useEffect, useState } from 'react';
import { useSound } from '../context/SoundContext';

interface KonamiCodeProps {
    onUnlock: () => void;
}

// Up, Up, Down, Down, Left, Right, Left, Right, B, A
const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

export function KonamiCode({ onUnlock }: KonamiCodeProps) {
    const [_sequence, setSequence] = useState<string[]>([]);
    const { playSound } = useSound();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const key = e.key;

            setSequence(prev => {
                const newSequence = [...prev, key];

                // Check if the new sequence matches the beginning of the Konami code
                const isMatch = newSequence.every((k, i) => k === KONAMI_CODE[i]);

                if (!isMatch) {
                    // If mistake, reset but keep the last key if it starts the sequence
                    return key === 'ArrowUp' ? ['ArrowUp'] : [];
                }

                if (newSequence.length === KONAMI_CODE.length) {
                    playSound('success');
                    onUnlock();
                    return [];
                }

                playSound('typing');
                return newSequence;
            });
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onUnlock, playSound]);

    return null;
}
