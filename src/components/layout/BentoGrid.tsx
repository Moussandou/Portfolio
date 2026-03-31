import React, { useRef, useCallback, useEffect } from 'react';
import { cn } from '../../lib/utils';

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

const HOVER_SCALE = 1.08;
const PUSH_STRENGTH = 35;   // px — stronger push
const PUSH_RADIUS = 600;    // px — wider radius

export function BentoGrid({ children, className }: BentoGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const activeCard = useRef<HTMLElement | null>(null);
  const rafId = useRef<number>(0);

  const resetAll = useCallback(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const cards = grid.querySelectorAll<HTMLElement>('.bento-card');
    cards.forEach((card) => {
      card.style.transform = '';
      card.style.zIndex = '';
      card.style.boxShadow = '';
      card.style.filter = '';
    });
    activeCard.current = null;
  }, []);

  const applyMagnetic = useCallback((hoveredCard: HTMLElement) => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll<HTMLElement>('.bento-card');
    const hoveredRect = hoveredCard.getBoundingClientRect();
    const hx = hoveredRect.left + hoveredRect.width / 2;
    const hy = hoveredRect.top + hoveredRect.height / 2;

    cards.forEach((card) => {
      if (card === hoveredCard) {
        card.style.transform = `scale(${HOVER_SCALE})`;
        card.style.zIndex = '10';
        card.style.boxShadow = '0 24px 64px rgba(141, 64, 116, 0.3)';
        card.style.filter = '';
        return;
      }

      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const dx = cx - hx;
      const dy = cy - hy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < PUSH_RADIUS && dist > 0) {
        const force = Math.pow(1 - dist / PUSH_RADIUS, 1.5) * PUSH_STRENGTH;
        const angle = Math.atan2(dy, dx);
        const tx = Math.cos(angle) * force;
        const ty = Math.sin(angle) * force;
        const shrink = 1 - (force / PUSH_STRENGTH) * 0.04;

        card.style.transform = `translate(${tx.toFixed(1)}px, ${ty.toFixed(1)}px) scale(${shrink.toFixed(3)})`;
        card.style.filter = `brightness(${(0.92 + (dist / PUSH_RADIUS) * 0.08).toFixed(2)})`;
        card.style.zIndex = '1';
        card.style.boxShadow = '';
      } else {
        card.style.transform = '';
        card.style.filter = '';
        card.style.zIndex = '';
        card.style.boxShadow = '';
      }
    });
  }, []);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const onMove = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest('.bento-card') as HTMLElement | null;
      if (!el) {
        if (activeCard.current) resetAll();
        return;
      }
      if (el === activeCard.current) return; // same card, skip
      activeCard.current = el;
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => applyMagnetic(el));
    };

    const onLeave = () => {
      cancelAnimationFrame(rafId.current);
      resetAll();
    };

    grid.addEventListener('mousemove', onMove);
    grid.addEventListener('mouseleave', onLeave);

    return () => {
      grid.removeEventListener('mousemove', onMove);
      grid.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(rafId.current);
    };
  }, [applyMagnetic, resetAll]);

  // Remove stagger animation class after entrance so JS transforms work
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const timer = setTimeout(() => {
      grid.classList.remove('stagger-children');
      // Also clear any residual animation on cards
      grid.querySelectorAll<HTMLElement>('.bento-card').forEach((card) => {
        card.style.animation = 'none';
      });
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={gridRef}
      className={cn(
        "grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 auto-rows-[160px] gap-8 max-w-[1080px] mx-auto stagger-children",
        className
      )}
    >
      {children}
    </div>
  );
}
