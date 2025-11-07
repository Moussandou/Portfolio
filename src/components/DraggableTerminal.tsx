import { useState, useRef, useEffect, useCallback } from 'react';
import { TerminalSection } from './TerminalSection';

interface DraggableTerminalProps {
  command: string;
  delay: number;
  children: React.ReactNode;
  onOrderChange?: (id: string, newIndex: number) => void;
  id: string;
  index: number;
}

export function DraggableTerminal({ 
  command, 
  delay, 
  children, 
  onOrderChange, 
  id, 
  index 
}: DraggableTerminalProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const terminalRef = useRef<HTMLDivElement>(null);
  const [zIndex, setZIndex] = useState(10);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    
    setPosition({
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y
    });
  }, [isDragging, dragOffset]);

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;
    
    setIsDragging(false);
    setZIndex(10);
    setPosition({ x: 0, y: 0 }); // Reset position
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!terminalRef.current) return;
    
    const rect = terminalRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsDragging(true);
    setZIndex(100); // Bring to front
    
    e.preventDefault();
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={terminalRef}
      className={`
        relative transition-all duration-200 
        ${isDragging ? 'scale-105 shadow-2xl cursor-grabbing' : 'cursor-auto'}
      `}
      style={{
        transform: isDragging ? `translate(${position.x}px, ${position.y}px)` : 'none',
        zIndex: zIndex,
      }}
    >
      {/* Drag handle */}
      <div
        className="absolute top-0 left-0 right-0 h-6 bg-[#9333EA]/10 border border-[#9333EA]/30 rounded-t-lg cursor-grab active:cursor-grabbing flex items-center justify-center hover:bg-[#9333EA]/20 transition-colors"
        onMouseDown={handleMouseDown}
      >
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-[#FF0080] rounded-full"></div>
          <div className="w-2 h-2 bg-[#FFD700] rounded-full"></div>
          <div className="w-2 h-2 bg-[#00FFFF] rounded-full"></div>
        </div>
        <div className="absolute right-2 text-xs text-[#9333EA]/60">
          {'///'} 
        </div>
      </div>
      
      {/* Terminal content with margin for drag handle */}
      <div className="mt-6">
        <TerminalSection command={command} delay={delay}>
          {children}
        </TerminalSection>
      </div>
    </div>
  );
}