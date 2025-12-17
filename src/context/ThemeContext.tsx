import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeId = 'hack-blue' | 'matrix-green' | 'cyber-purple' | 'error-red' | 'gold-luxury';

interface ThemeColors {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    border: string;
    glow: string;
}

interface ThemeContextType {
    currentTheme: ThemeId;
    colors: ThemeColors;
    setTheme: (theme: ThemeId) => void;
    isHackMode: boolean; // Kept for backward compatibility logic
    toggleHackMode: () => void;
    setHackMode: (value: boolean | ((prev: boolean) => boolean)) => void;
}

const THEMES: Record<ThemeId, ThemeColors> = {
    'hack-blue': {
        primary: '#5DADE2',
        secondary: '#0F1729',
        background: '#0F1729',
        text: '#5DADE2',
        border: '#5DADE2',
        glow: 'rgba(93, 173, 226, 0.3)'
    },
    'matrix-green': {
        primary: '#00FF00',
        secondary: '#001100',
        background: '#001100',
        text: '#00FF00',
        border: '#00FF00',
        glow: 'rgba(0, 255, 0, 0.3)'
    },
    'cyber-purple': {
        primary: '#D946EF',
        secondary: '#1A0B2E',
        background: '#1A0B2E',
        text: '#D946EF',
        border: '#D946EF',
        glow: 'rgba(217, 70, 239, 0.3)'
    },
    'error-red': {
        primary: '#FF0000',
        secondary: '#1A0000',
        background: '#1A0000',
        text: '#FF0000',
        border: '#FF0000',
        glow: 'rgba(255, 0, 0, 0.3)'
    },
    'gold-luxury': {
        primary: '#FFD700',
        secondary: '#1A1A00',
        background: '#1A1A00',
        text: '#FFD700',
        border: '#FFD700',
        glow: 'rgba(255, 215, 0, 0.3)'
    }
};

// Light mode fallback colors
const LIGHT_THEME: ThemeColors = {
    primary: '#0E6655',
    secondary: '#FFFFFF',
    background: '#FFFFFF',
    text: '#0E6655',
    border: '#0E6655',
    glow: 'rgba(14, 102, 85, 0.3)'
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [currentTheme, setCurrentTheme] = useState<ThemeId>('hack-blue');
    const [isHackMode, setIsHackMode] = useState(false);

    // Apply CSS variables whenever theme changes
    useEffect(() => {
        const activeColors = isHackMode ? THEMES[currentTheme] : LIGHT_THEME;

        const root = document.documentElement;
        root.style.setProperty('--theme-primary', activeColors.primary);
        root.style.setProperty('--theme-secondary', activeColors.secondary);
        root.style.setProperty('--theme-background', activeColors.background);
        root.style.setProperty('--theme-text', activeColors.text);
        root.style.setProperty('--theme-border', activeColors.border);
        root.style.setProperty('--theme-glow', activeColors.glow);

    }, [currentTheme, isHackMode]);

    const toggleHackMode = () => {
        setIsHackMode(prev => !prev);
    };

    return (
        <ThemeContext.Provider value={{
            currentTheme,
            colors: isHackMode ? THEMES[currentTheme] : LIGHT_THEME,
            setTheme: setCurrentTheme,
            isHackMode,
            toggleHackMode,
            setHackMode: setIsHackMode
        }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
