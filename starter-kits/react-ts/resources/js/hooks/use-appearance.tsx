import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

export type Appearance = 'light' | 'dark' | 'system';

// Cookie settings
const COOKIE_NAME = 'appearance';
const COOKIE_EXPIRY_DAYS = 365;

// Helper function to check if browser prefers dark mode
const prefersDark = () => {
    if (typeof window === 'undefined') {
        return false;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

// Apply theme to document
const applyTheme = (appearance: Appearance) => {
    if (typeof document === 'undefined') {
        return;
    }

    const isDark = appearance === 'dark' || (appearance === 'system' && prefersDark());
    document.documentElement.classList.toggle('dark', isDark);
};

// Get media query for system theme changes
const getMediaQuery = () => {
    if (typeof window === 'undefined') {
        return null;
    }

    return window.matchMedia('(prefers-color-scheme: dark)');
};

// Helper to set a cookie
const setCookie = (name: string, value: string, days: number) => {
    if (typeof document === 'undefined') {
        return;
    }

    Cookies.set(name, value, {
        expires: days,
    });
};

// Helper to get a cookie
const getCookie = (name: string): string | null => {
    return Cookies.get(name) || null;
};

// Initialize theme on page load (both server and client side)
export function initializeTheme() {
    // Server-side: the actual SSR mechanism will handle this
    if (typeof window === 'undefined') {
        return;
    }

    // Client-side: apply theme immediately to prevent flash
    const savedAppearance = getAppearanceFromStorage();

    // Apply theme immediately
    const isDark = savedAppearance === 'dark' || (savedAppearance === 'system' && prefersDark());

    // Set both class and data-theme attribute for double protection against flash
    if (isDark) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');

    // Listen for system theme changes
    const mediaQuery = getMediaQuery();

    if (mediaQuery && savedAppearance === 'system') {
        const handleChange = () => {
            const newIsDark = prefersDark();

            if (newIsDark) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }

            document.documentElement.setAttribute('data-theme', newIsDark ? 'dark' : 'light');
        };

        mediaQuery.addEventListener('change', handleChange);
    }
}

// Get appearance from cookie or localStorage
export function getAppearanceFromStorage(): Appearance {
    if (typeof document === 'undefined') {
        return 'system'; // Default for SSR
    }

    // Try to get from cookie first
    const fromCookie = getCookie(COOKIE_NAME) as Appearance | null;
    if (fromCookie && ['light', 'dark', 'system'].includes(fromCookie)) {
        return fromCookie as Appearance;
    }

    // If not in cookie, check localStorage for backward compatibility
    if (typeof window !== 'undefined') {
        const fromLocalStorage = localStorage.getItem(COOKIE_NAME) as Appearance | null;
        if (fromLocalStorage && ['light', 'dark', 'system'].includes(fromLocalStorage)) {
            // Migrate from localStorage to cookie
            setCookie(COOKIE_NAME, fromLocalStorage, COOKIE_EXPIRY_DAYS);
            return fromLocalStorage as Appearance;
        }
    }

    return 'system';
}

// React hook for appearance management
export function useAppearance(initialAppearance?: Appearance) {
    // Initialize state with provided initial value or from storage
    const [appearance, setAppearance] = useState<Appearance>(() => {
        console.log({initialAppearance})
        if (initialAppearance) {
            return initialAppearance;
        }

        return typeof window !== 'undefined'
            ? getAppearanceFromStorage()
            : 'system';
    });

    // Update appearance both in state and storage
    const updateAppearance = (mode: Appearance) => {
        setAppearance(mode);

        // Update cookie for SSR persistence
        setCookie(COOKIE_NAME, mode, COOKIE_EXPIRY_DAYS);

        // Also update localStorage for backward compatibility
        if (typeof window !== 'undefined') {
            localStorage.setItem(COOKIE_NAME, mode);
        }

        applyTheme(mode);
    };

    // Apply theme on initial render and set up event listeners
    useEffect(() => {
        const mediaQuery = getMediaQuery();
        const savedAppearance = getAppearanceFromStorage();

        // Sync state with stored value
        if (savedAppearance !== appearance) {
            setAppearance(savedAppearance);
        }

        applyTheme(savedAppearance);

        // Add listener for system theme changes
        const handleChange = () => {
            if (appearance === 'system') {
                applyTheme('system');
            }
        };

        mediaQuery?.addEventListener('change', handleChange);

        return () => {
            mediaQuery?.removeEventListener('change', handleChange);
        };
    }, [appearance]);

    return { appearance, updateAppearance };
}