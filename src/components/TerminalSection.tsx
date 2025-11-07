import { useState } from 'react';
import { TypewriterEffect } from './TypewriterEffect';

interface TerminalSectionProps {
  command: string;
  children: React.ReactNode;
  delay?: number;
  colors?: {
    bg: string;
    border: string;
    header: string;
    accent: string;
    text: string;
  };
}

export function TerminalSection({ command, children, delay = 0, colors }: TerminalSectionProps) {
  const [showContent, setShowContent] = useState(false);

  const handleCommandComplete = () => {
    setTimeout(() => {
      setShowContent(true);
    }, 200);
  };

  return (
    <div className={`mb-8 terminal-window border ${colors ? colors.border : 'border-[#A855F7]/30'} ${colors ? colors.bg : 'bg-black/90'} backdrop-blur-sm rounded-lg shadow-lg`}>
      {/* Terminal header */}
      <div className={`flex items-center justify-between ${colors ? colors.header : 'bg-[#1a1a1a]'} border-b ${colors ? colors.border : 'border-[#A855F7]/30'} px-4 py-2 rounded-t-lg`}>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className={`${colors ? colors.accent : 'text-[#A855F7]'} text-sm font-semibold`}>moussandou@terminal:~</div>
      </div>

      {/* Terminal content */}
      <div className="p-4 font-mono">
        <div className={`${colors ? colors.accent : 'text-[#A855F7]'} mb-2`}>
          <span className="text-[#FFD700]">moussandou@localhost</span>
          <span className={colors ? colors.text : 'text-white'}>:</span>
          <span className={colors ? colors.accent : 'text-[#A855F7]'}>~</span>
          <span className={colors ? colors.text : 'text-white'}>$ </span>
          <TypewriterEffect
            text={command}
            delay={delay}
            onComplete={handleCommandComplete}
            className={colors ? colors.accent : 'text-[#A855F7]'}
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