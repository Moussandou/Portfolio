import { useState } from 'react';
import { TypewriterEffect } from './TypewriterEffect';

interface TerminalSectionProps {
  command: string;
  children: React.ReactNode;
  delay?: number;
  isHackMode?: boolean;
  colors?: {
    bg: string;
    border: string;
    header: string;
    accent: string;
    text: string;
  };
}

export function TerminalSection({ command, children, delay = 0, isHackMode = false, colors }: TerminalSectionProps) {
  const [showContent, setShowContent] = useState(false);

  const handleCommandComplete = () => {
    setTimeout(() => {
      setShowContent(true);
    }, 200);
  };

  return (
    <div className={`h-full ${colors ? colors.bg : 'bg-[#0F1729]/90'} backdrop-blur-sm rounded-b-lg transition-all duration-300`}>
      {/* Terminal content */}
      <div className="p-4 font-mono">
        <div className={`${colors ? colors.accent : 'text-[#5DADE2]'} mb-2`}>
          <span className="text-[#85C1E9]">moussandou@localhost</span>
          <span className={colors ? colors.text : 'text-white'}>:</span>
          <span className={colors ? colors.accent : 'text-[#5DADE2]'}>~</span>
          <span className={colors ? colors.text : 'text-white'}>$ </span>
          <TypewriterEffect
            text={command}
            delay={delay}
            onComplete={handleCommandComplete}
            className={colors ? colors.accent : 'text-[#5DADE2]'}
            isHackMode={isHackMode}
          />
        </div>

        {showContent && (
          <div className={`${colors ? colors.text : 'text-gray-300'} animate-fade-in`}>
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
