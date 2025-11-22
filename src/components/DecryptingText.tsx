import { useState, useEffect, useRef } from 'react';

interface DecryptingTextProps {
    text: string;
    speed?: number;
    className?: string;
    revealSpeed?: number;
    startDelay?: number;
    isHackMode?: boolean;
}

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

export function DecryptingText({
    text,
    speed = 50,
    className = '',
    revealSpeed = 3, // Characters revealed per step
    startDelay = 0,
    isHackMode = true
}: DecryptingTextProps) {
    const [displayText, setDisplayText] = useState('');
    const [isComplete, setIsComplete] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const iterationRef = useRef(0);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const startDecryption = () => {
            if (intervalRef.current) clearInterval(intervalRef.current);

            iterationRef.current = 0;
            setIsComplete(false);

            intervalRef.current = setInterval(() => {
                setDisplayText((_prev) => {
                    let result = '';
                    const currentIteration = iterationRef.current;

                    for (let i = 0; i < text.length; i++) {
                        if (i < currentIteration) {
                            result += text[i];
                        } else {
                            result += CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
                        }
                    }

                    if (currentIteration >= text.length) {
                        if (intervalRef.current) clearInterval(intervalRef.current);
                        setIsComplete(true);
                        return text;
                    }

                    iterationRef.current += 1 / revealSpeed; // Control speed of reveal
                    return result;
                });
            }, speed);
        };

        if (startDelay > 0) {
            timeoutId = setTimeout(startDecryption, startDelay);
        } else {
            startDecryption();
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [text, speed, revealSpeed, startDelay]);

    return (
        <span className={`${className} font-mono`}>
            {displayText}
            {!isComplete && (
                <span className={`inline-block w-2 h-4 ml-1 align-middle ${isHackMode ? 'bg-[#5DADE2]' : 'bg-[#0E6655]'} animate-pulse`} />
            )}
        </span>
    );
}
