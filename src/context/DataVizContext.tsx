import React, { createContext, useContext, useState } from 'react';

export type VizType = 'github-city' | 'skill-graph' | null;

interface DataVizContextType {
    activeViz: VizType;
    showViz: (type: VizType) => void;
    closeViz: () => void;
}

const DataVizContext = createContext<DataVizContextType | undefined>(undefined);

export function DataVizProvider({ children }: { children: React.ReactNode }) {
    const [activeViz, setActiveViz] = useState<VizType>(null);

    const showViz = (type: VizType) => setActiveViz(type);
    const closeViz = () => setActiveViz(null);

    return (
        <DataVizContext.Provider value={{ activeViz, showViz, closeViz }}>
            {children}
        </DataVizContext.Provider>
    );
}

export function useDataViz() {
    const context = useContext(DataVizContext);
    if (context === undefined) {
        throw new Error('useDataViz must be used within a DataVizProvider');
    }
    return context;
}
