import { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import { sharedProps } from '@laravext/react';

export type Appearance = 'light' | 'dark';

const applyTheme = (appearance: Appearance) => {
    const isDark = appearance === 'dark';

    document.documentElement.classList.toggle('dark', isDark);
};

const getCookieAppearance = () => {
    let cookieAppearance = Cookies.get('appearance') ?? 'dark';
    return cookieAppearance as Appearance;
}

export function initializeTheme() {
    const savedAppearance = (getCookieAppearance() as Appearance) || 'system';

    applyTheme(savedAppearance);
}

export function useAppearance() {
    const { appearance: initialAppearance } = sharedProps()
    const [appearance, setAppearance] = useState<Appearance>(initialAppearance);

    const updateAppearance = (mode: Appearance) => {
        setAppearance(mode);
        Cookies.set('appearance', mode);
        applyTheme(mode);
    };

    useEffect(() => {
        const savedAppearance = getCookieAppearance() as Appearance;
        updateAppearance(savedAppearance);
    }, []);

    return { appearance, updateAppearance };
}
