import React, { useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  // Remove the stagger class once the entrance animation is done,
  // otherwise the cards keep their animated transform.
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const timer = setTimeout(() => {
      grid.classList.remove('stagger-children');
      grid.querySelectorAll<HTMLElement>('.bento-card, .brand-card').forEach((card) => {
        card.style.animation = 'none';
      });
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={gridRef}
      className={cn(
        'grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 auto-rows-auto md:auto-rows-[160px] gap-6 md:gap-8 max-w-[1080px] mx-auto stagger-children',
        className
      )}
    >
      {children}
    </div>
  );
}
