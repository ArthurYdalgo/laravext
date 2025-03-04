import { onMounted, ref } from 'vue';
import Cookies from 'js-cookie';

type Appearance = 'light' | 'dark';

export function updateTheme(value: Appearance) {
    document.documentElement.classList.toggle('dark', value === 'dark');
}

const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

const handleSystemThemeChange = () => {
    const currentAppearance = Cookies.get('appearance') as Appearance | null;
    updateTheme(currentAppearance || 'light');
};

export function initializeTheme() {
    // Initialize theme from saved preference or default to system...
    const savedAppearance = Cookies.get('appearance') as Appearance | null;
    updateTheme(savedAppearance || 'light');

    // Set up system theme change listener...
    mediaQuery.addEventListener('change', handleSystemThemeChange);
}

export function useAppearance() {
    const appearance = ref<Appearance>('light');

    onMounted(() => {
        initializeTheme();

        const savedAppearance = Cookies.get('appearance') as Appearance | null;

        if (savedAppearance) {
            appearance.value = savedAppearance;
        }
    });

    function updateAppearance(value: Appearance) {
        appearance.value = value;
        Cookies.set('appearance', value);
        updateTheme(value);
    }

    return {
        appearance,
        updateAppearance,
    };
}
