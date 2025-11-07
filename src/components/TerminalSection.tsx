import { useState } from 'react';
import { TypewriterEffect } from './TypewriterEffect';

interface TerminalSectionProps {
  command: string;
  children: React.ReactNode;
  delay?: number;
}

export function TerminalSection({ command, children, delay = 0 }: TerminalSectionProps) {
  const [showContent, setShowContent] = useState(false);

  const handleCommandComplete = () => {
    setTimeout(() => {
      setShowContent(true);
    }, 200);
  };

  return (
    <div className="mb-8 terminal-window border border-[#9333EA]/30 bg-black/90 backdrop-blur-sm">
      {/* Terminal header */}
      <div className="flex items-center justify-between bg-[#1a1a1a] border-b border-[#9333EA]/30 px-4 py-2">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-[#9333EA] text-sm">moussandou@terminal:~</div>
      </div>
      
      {/* Terminal content */}
      <div className="p-4 font-mono">
        <div className="text-[#9333EA] mb-2">
          <span className="text-[#FFD700]">moussandou@localhost</span>
          <span className="text-white">:</span>
          <span className="text-[#9333EA]">~</span>
          <span className="text-white">$ </span>
          <TypewriterEffect 
            text={command} 
            delay={delay}
            onComplete={handleCommandComplete}
            className="text-[#9333EA]"
          />
        </div>
        
        {showContent && (
          <div className="text-gray-300 animate-fade-in">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}