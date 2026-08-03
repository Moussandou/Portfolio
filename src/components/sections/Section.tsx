import React from 'react';
import { BentoGrid } from '../layout/BentoGrid';
import { cn } from '../../lib/utils';

interface SectionProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export function Section({ title, subtitle, children, className }: SectionProps) {
  return (
    <section className={cn('mt-20 md:mt-28 first:mt-0', className)}>
      <div className="mb-8 md:mb-10">
        <div className="flex items-center gap-3">
          <span className="h-[2px] w-8 rounded-full bg-[#6D4499]/30" />
          <h2 className="text-2xl md:text-3xl font-black font-display tracking-tight text-[#3B2356]">
            {title}
          </h2>
        </div>
        {subtitle && (
          <p className="mt-2 text-[13px] font-semibold text-[#6D4499]/70 max-w-xl leading-relaxed pl-11">
            {subtitle}
          </p>
        )}
      </div>
      <BentoGrid>{children}</BentoGrid>
    </section>
  );
}
