import { Appearance, useAppearance } from '@/hooks/use-appearance';
import React, { createContext, useContext } from 'react';

// Create context for appearance
interface AppearanceContextType {
    appearance: Appearance;
    updateAppearance: (mode: Appearance) => void;
}

const AppearanceContext = createContext<AppearanceContextType | undefined>(undefined);

interface AppearanceProviderProps {
    children: React.ReactNode;
    initialAppearance?: Appearance;
}

export function AppearanceProvider({ children, initialAppearance }: AppearanceProviderProps) {
    // Use our hook for managing appearance
    const { appearance, updateAppearance } = useAppearance(initialAppearance);

    return <AppearanceContext.Provider value={{ appearance, updateAppearance }}>{children}</AppearanceContext.Provider>;
}

// Hook to use appearance context
export function useAppearanceContext() {
    const context = useContext(AppearanceContext);

    if (context === undefined) {
        throw new Error('useAppearanceContext must be used within an AppearanceProvider');
    }

    return context;
}