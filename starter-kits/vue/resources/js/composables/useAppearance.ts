import { onMounted, ref } from 'vue';
import Cookies from 'js-cookie';

type Appearance = 'light' | 'dark';

export function updateTheme(value: Appearance) {
    document.documentElement.classList.toggle('dark', value === 'dark');
}

export function initializeTheme() {
    // Initialize theme from saved preference or default to system...
    const savedAppearance = Cookies.get('appearance') as Appearance | null;
    updateTheme(savedAppearance || 'dark');
}

const getCookieAppearance = () => {
    let cookieAppearance = Cookies.get('appearance') ?? 'dark';
    return cookieAppearance as Appearance;
}

export function useAppearance() {
    const appearance = ref<Appearance>(getCookieAppearance());

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
