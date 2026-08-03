import type React from 'react';
import type { Brand } from '../../data/brands';

const FONT_STACKS: Record<Brand['fontKey'], string> = {
  display: "'Fredoka', sans-serif",
  serif: "ui-serif, Georgia, 'Times New Roman', serif",
  mono: "ui-monospace, SFMono-Regular, Menlo, monospace",
};

export function brandStyle(brand: Brand): React.CSSProperties {
  return {
    '--brand-bg': brand.bg,
    '--brand-fg': brand.fg,
    '--brand-muted': brand.muted,
    '--brand-accent': brand.accent,
    '--brand-accent-alt': brand.accentAlt ?? brand.accent,
    '--brand-radius': brand.radius,
    '--brand-border': brand.border,
    '--brand-shadow': brand.shadow,
    '--brand-font': FONT_STACKS[brand.fontKey],
  } as React.CSSProperties;
}
