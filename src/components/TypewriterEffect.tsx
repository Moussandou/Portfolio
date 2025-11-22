import { useState, useEffect, useRef } from 'react';

interface TypewriterEffectProps {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
  className?: string;
  isHackMode?: boolean;
}

export function TypewriterEffect({ text, speed = 50, delay = 0, onComplete, className = "", isHackMode = false }: TypewriterEffectProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Randomize speed slightly for human effect (±20ms)
    const randomSpeed = Math.max(10, speed + (Math.random() * 40 - 20));

    timeoutRef.current = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      } else {
        onComplete?.();
      }
    }, currentIndex === 0 ? delay : randomSpeed);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentIndex, text, speed, delay, onComplete]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span className={className}>
      {displayedText}
      <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100 ${isHackMode ? 'text-[#5DADE2]' : 'text-[#0E6655]'}`}>
        {isHackMode ? '█' : '_'}
      </span>
    </span>
  );
}
