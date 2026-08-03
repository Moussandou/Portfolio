import { useState } from 'react';
import type { Brand } from '../../data/brands';

interface BrandAvatarProps {
  brand: Brand;
  size?: number;
}

export function BrandAvatar({ brand, size = 44 }: BrandAvatarProps) {
  const [failed, setFailed] = useState(false);
  const showLogo = Boolean(brand.logo) && !failed;

  return (
    <div
      className="shrink-0 rounded-xl overflow-hidden flex items-center justify-center"
      style={{
        width: size,
        height: size,
        background: showLogo ? '#FFFFFF' : 'var(--brand-accent)',
      }}
    >
      {showLogo ? (
        <img
          src={brand.logo}
          alt={brand.name}
          className="w-full h-full object-contain p-1"
          onError={() => setFailed(true)}
        />
      ) : (
        <span
          className="font-display font-black text-lg leading-none"
          style={{ color: 'var(--brand-bg)' }}
        >
          {brand.name.charAt(0).toUpperCase()}
        </span>
      )}
    </div>
  );
}
