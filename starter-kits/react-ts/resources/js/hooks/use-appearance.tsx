import { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import { laravext } from '@laravext/react';

export type Appearance = 'light' | 'dark' | 'system';

const prefersDark = () => {
    console.log(laravext().app);
    if (typeof window === 'undefined') {
        return laravext().app.appearance === 'dark';
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const applyTheme = (appearance: Appearance) => {
    console.log(laravext().app);
    const isDark = appearance === 'dark' || (appearance === 'system' && prefersDark());

    document.documentElement.classList.toggle('dark', isDark);
};

const mediaQuery = () => {
    console.log(laravext().app);
    if (typeof window === 'undefined') {
        return null;
    }

    return window.matchMedia('(prefers-color-scheme: dark)');
};

const handleSystemThemeChange = () => {
    Cookies.set('appearance', prefersDark() ? 'dark' : 'light');
    const currentAppearance = Cookies.get('appearance') as Appearance;
    applyTheme(currentAppearance || 'system');
};

export function initializeTheme() {
    console.log(laravext().app);
    const savedAppearance = (Cookies.get('appearance') as Appearance) || 'system';

    applyTheme(savedAppearance);

    // Add the event listener for system theme changes...
    mediaQuery()?.addEventListener('change', handleSystemThemeChange);
}

export function useAppearance() {
    const [appearance, setAppearance] = useState<Appearance>('system');

    console.log(laravext().app);

    const updateAppearance = (mode: Appearance) => {
        setAppearance(mode);
        Cookies.set('appearance', mode);
        applyTheme(mode);
    };

    useEffect(() => {
        const savedAppearance = Cookies.get('appearance') as Appearance | null;
        updateAppearance(savedAppearance || 'system');

        return () => mediaQuery()?.removeEventListener('change', handleSystemThemeChange);
    }, []);

    return { appearance, updateAppearance };
}
