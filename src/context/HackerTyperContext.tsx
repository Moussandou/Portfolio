import React, { createContext, useContext, useState } from 'react';

interface HackerTyperContextType {
    isActive: boolean;
    startHackerTyper: () => void;
    stopHackerTyper: () => void;
}

const HackerTyperContext = createContext<HackerTyperContextType | undefined>(undefined);

export function HackerTyperProvider({ children }: { children: React.ReactNode }) {
    const [isActive, setIsActive] = useState(false);

    const startHackerTyper = () => setIsActive(true);
    const stopHackerTyper = () => setIsActive(false);

    return (
        <HackerTyperContext.Provider value={{ isActive, startHackerTyper, stopHackerTyper }}>
            {children}
        </HackerTyperContext.Provider>
    );
}

export function useHackerTyper() {
    const context = useContext(HackerTyperContext);
    if (context === undefined) {
        throw new Error('useHackerTyper must be used within a HackerTyperProvider');
    }
    return context;
}
