import { createContext, useContext } from 'react';

interface ThemeContextType {
  isHackMode: boolean;
}

const ThemeContext = createContext<ThemeContextType>({ isHackMode: false });

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  isHackMode: boolean;
  children: React.ReactNode;
}

export function ThemeProvider({ isHackMode, children }: ThemeProviderProps) {
  return (
    <ThemeContext.Provider value={{ isHackMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Couleurs crème différentes pour chaque section
export const creamColors = [
  'bg-[#FFF9E8] border-[#E8DCC8]', // Crème vanille
  'bg-[#FAF0E6] border-[#D4C4B0]', // Lin
  'bg-[#F5F5DC] border-[#D9D1B8]', // Beige
  'bg-[#FAEBD7] border-[#DDD5C7]', // Blanc antique
  'bg-[#FFF8DC] border-[#E8DFC8]', // Cornsilk
  'bg-[#FFFAF0] border-[#E8E3D8]', // Blanc floral
];

export const getTerminalColors = (isHackMode: boolean, index: number) => {
  if (isHackMode) {
    return {
      bg: 'bg-black/90',
      border: 'border-[#A855F7]/30',
      text: 'text-gray-300',
      header: 'bg-[#1a1a1a] border-b-[#A855F7]/30',
      accent: 'text-[#A855F7]',
    };
  }

  const colorIndex = index % creamColors.length;
  const bgBorderClass = creamColors[colorIndex];
  const [bg, border] = bgBorderClass.split(' ');

  return {
    bg: `${bg}/95`,
    border: `${border} border-2`,
    text: 'text-[#5A4A3A]',
    header: `${bg} ${border}`,
    accent: 'text-[#8B7355]',
  };
};
