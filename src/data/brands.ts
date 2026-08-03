export interface Brand {
  id: string;
  name: string;
  logo?: string;
  bg: string;
  fg: string;
  muted: string;
  accent: string;
  accentAlt?: string;
  radius: string;
  border: string;
  shadow: string;
  fontKey: 'display' | 'serif' | 'mono';
  texture: 'grid' | 'dots' | 'none';
}

export const brands: Record<string, Brand> = {
  epitech: {
    id: 'epitech',
    name: 'Epitech',
    logo: '/Portfolio/assets/logos/epitech.png',
    bg: '#0B1E2D',
    fg: '#FFFFFF',
    muted: 'rgba(255,255,255,0.65)',
    accent: '#0091CE',
    radius: '20px',
    border: 'none',
    shadow: '0 12px 32px rgba(0,145,206,0.22)',
    fontKey: 'display',
    texture: 'grid',
  },
  hec: {
    id: 'hec',
    name: 'HEC Paris',
    logo: '/Portfolio/assets/logos/hec.png',
    bg: '#06427C',
    fg: '#FFFFFF',
    muted: 'rgba(255,255,255,0.70)',
    accent: '#C8A45C',
    radius: '28px',
    border: '1px solid rgba(200,164,92,0.4)',
    shadow: '0 12px 32px rgba(6,66,124,0.25)',
    fontKey: 'serif',
    texture: 'none',
  },
  yeungnam: {
    id: 'yeungnam',
    name: 'Yeungnam University',
    logo: '/Portfolio/assets/logos/YU.png',
    bg: '#05468C',
    fg: '#FFFFFF',
    muted: 'rgba(255,255,255,0.70)',
    accent: '#E8442E',
    radius: '24px',
    border: 'none',
    shadow: '0 12px 32px rgba(5,70,140,0.25)',
    fontKey: 'display',
    texture: 'none',
  },
  taker: {
    id: 'taker',
    name: 'Junior Conseil Taker',
    logo: '/Portfolio/assets/logos/taker.jpg',
    bg: '#10243D',
    fg: '#FFFFFF',
    muted: 'rgba(255,255,255,0.65)',
    accent: '#5BC8E0',
    radius: '16px',
    border: 'none',
    shadow: '0 12px 32px rgba(16,36,61,0.28)',
    fontKey: 'display',
    texture: 'dots',
  },
  bingeki: {
    id: 'bingeki',
    name: 'Bingeki',
    bg: '#F5F0E6',
    fg: '#111111',
    muted: 'rgba(17,17,17,0.65)',
    accent: '#FF2E88',
    accentAlt: '#00D9E0',
    radius: '0px',
    border: '4px solid #000000',
    shadow: '8px 8px 0 #000000',
    fontKey: 'display',
    texture: 'none',
  },
  gdg: {
    id: 'gdg',
    name: 'GDG Aix-Marseille',
    logo: '/Portfolio/assets/logos/gdg.png',
    bg: '#FFFFFF',
    fg: '#202124',
    muted: 'rgba(32,33,36,0.75)',
    accent: '#4285F4',
    accentAlt: '#EA4335',
    radius: '24px',
    border: '2px solid #202124',
    shadow: '0 12px 32px rgba(32,33,36,0.14)',
    fontKey: 'display',
    texture: 'none',
  },
  devid: {
    id: 'devid',
    name: 'Dev-id',
    bg: '#0E2A33',
    fg: '#FFFFFF',
    muted: 'rgba(255,255,255,0.65)',
    accent: '#3ECFB2',
    radius: '20px',
    border: 'none',
    shadow: '0 12px 32px rgba(14,42,51,0.26)',
    fontKey: 'display',
    texture: 'none',
  },
  neutral: {
    id: 'neutral',
    name: '',
    bg: '#E9DEF8',
    fg: '#3B2356',
    muted: 'rgba(59,35,86,0.78)',
    accent: '#6D4499',
    radius: '22px',
    border: 'none',
    shadow: '0 8px 24px rgba(109,68,153,0.14)',
    fontKey: 'display',
    texture: 'none',
  },
};

export function getBrand(id: string): Brand {
  return brands[id] ?? brands.neutral;
}
