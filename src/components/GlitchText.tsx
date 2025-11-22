import { useState } from 'react';

interface GlitchTextProps {
    text: string;
    className?: string;
    isHackMode?: boolean;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
}

export function GlitchText({
    text,
    className = '',
    isHackMode = true,
    as: Component = 'span'
}: GlitchTextProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Component
            className={`relative inline-block ${className} ${isHovered ? 'glitch-active' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            data-text={text}
        >
            {text}
            {isHovered && isHackMode && (
                <>
                    <span className="absolute top-0 left-0 -z-10 w-full h-full text-[#5DADE2] opacity-70 animate-glitch-1" aria-hidden="true">
                        {text}
                    </span>
                    <span className="absolute top-0 left-0 -z-10 w-full h-full text-[#FF00FF] opacity-70 animate-glitch-2" aria-hidden="true">
                        {text}
                    </span>
                </>
            )}
        </Component>
    );
}
