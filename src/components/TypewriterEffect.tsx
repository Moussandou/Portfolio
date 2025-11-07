import { useState, useEffect } from 'react';

interface TypewriterEffectProps {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
  className?: string;
}

export function TypewriterEffect({ text, speed = 50, delay = 0, onComplete, className = "" }: TypewriterEffectProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      } else {
        onComplete?.();
      }
    }, currentIndex === 0 ? delay : speed);

    return () => clearTimeout(timeout);
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
      {showCursor && (currentIndex <= text.length) && <span className="animate-pulse text-[#9333EA]">_</span>}
    </span>
  );
}