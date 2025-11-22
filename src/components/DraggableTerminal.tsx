import { TerminalSection } from './TerminalSection';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface DraggableTerminalProps {
  command: string;
  delay: number;
  children: React.ReactNode;
  onOrderChange?: (id: string, newIndex: number) => void;
  id: string;
  index: number;
  isHackMode?: boolean;
  colors?: {
    bg: string;
    border: string;
    header: string;
    accent: string;
    text: string;
  };
}

export function DraggableTerminal({
  command,
  delay,
  children,
  isHackMode = false,
  colors,
  id
}: DraggableTerminalProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: delay * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      className={`relative transition-all duration-300 ${isActive ? 'scale-[1.02] z-30' : 'z-10'}`}
      style={{ zIndex: isActive ? 30 : 10 }}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onClick={() => setIsActive(true)}
    >
      {/* Header (Visual only) */}
      <div
        className={`absolute top-0 left-0 right-0 h-8 ${colors ? colors.header : 'bg-[#5DADE2]/10'} border-x border-t ${colors ? colors.border : 'border-[#5DADE2]/30'} rounded-t-lg flex items-center justify-between px-3 backdrop-blur-sm z-20 transition-colors duration-300 ${isActive ? 'bg-opacity-80' : ''}`}
      >
        <div className="flex gap-2">
          <div className={`w-3 h-3 rounded-full ${isHackMode ? 'bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.6)]' : 'bg-[#FF5F56]'}`}></div>
          <div className={`w-3 h-3 rounded-full ${isHackMode ? 'bg-yellow-500/80 shadow-[0_0_8px_rgba(234,179,8,0.6)]' : 'bg-[#FFBD2E]'}`}></div>
          <div className={`w-3 h-3 rounded-full ${isHackMode ? 'bg-green-500/80 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-[#27C93F]'}`}></div>
        </div>
        <div className={`text-xs font-mono ${colors ? colors.accent : 'text-[#5DADE2]'} opacity-70 select-none`}>
          {isHackMode ? 'root@kali:~' : 'user@macbook:~'}
        </div>
        <div className={`text-xs ${colors ? colors.accent : 'text-[#5DADE2]'} opacity-50`}>
          {'///'}
        </div>
      </div>

      {/* Terminal content */}
      <div className="pt-8 h-full">
        <TerminalSection command={command} delay={delay + 0.5} isHackMode={isHackMode} colors={colors}>
          {children}
        </TerminalSection>
      </div>

      {/* Active Glow Border */}
      {isActive && (
        <div className={`absolute inset-0 rounded-lg pointer-events-none border z-40 ${isHackMode
            ? 'border-[#5DADE2] shadow-[0_0_15px_rgba(93,173,226,0.3)]'
            : 'border-[#0E6655] shadow-[0_0_15px_rgba(14,102,85,0.3)]'
          }`} />
      )}
    </motion.div>
  );
}
