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

// Couleurs Deep Ocean pour chaque section (mode clair) - Fond blanc pur
export const deepOceanColors = [
  'bg-white border-[#0E6655]', // Deep Ocean 1 - Blanc pur
  'bg-white border-[#0E6655]', // Deep Ocean 2 - Blanc pur
  'bg-white border-[#117A65]', // Deep Ocean 3 - Blanc pur
  'bg-white border-[#0E6655]', // Deep Ocean 4 - Blanc pur
  'bg-white border-[#117A65]', // Deep Ocean 5 - Blanc pur
  'bg-white border-[#0E6655]', // Deep Ocean 6 - Blanc pur
];

export const getTerminalColors = (isHackMode: boolean, index: number) => {
  if (isHackMode) {
    // Midnight Blue (Mode sombre)
    return {
      bg: 'bg-[#0F1729]/95',
      border: 'border-[#5DADE2]/30',
      text: 'text-gray-300',
      header: 'bg-[#1A2332]/90 border-b-[#5DADE2]/30',
      accent: 'text-[#5DADE2]',
    };
  }

  // Deep Ocean (Mode clair)
  const colorIndex = index % deepOceanColors.length;
  const bgBorderClass = deepOceanColors[colorIndex];
  const [bg, border] = bgBorderClass.split(' ');

  return {
    bg: bg, // Blanc pur sans opacité
    border: `${border} border-2`,
    text: 'text-[#0E6655]',
    header: `${bg} ${border}`,
    accent: 'text-[#0E6655]',
  };
};
