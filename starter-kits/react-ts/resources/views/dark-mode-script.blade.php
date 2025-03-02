<script>
    // IMPORTANT: This script must be as early as possible in the head
    // to prevent any flash of incorrect theme
    (function() {
        // Function to get cookie value
        function getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
            return null;
        }

        // Check localStorage (fallback for backward compatibility)
        function getLocalStorage(name) {
            try {
                return localStorage.getItem(name);
            } catch (e) {
                return null;
            }
        }

        // Get appearance from cookie or localStorage
        const cookieValue = getCookie('appearance');
        const localStorageValue = getLocalStorage('appearance');
        const appearance = cookieValue || localStorageValue || 'system';

        // Check if system prefers dark
        const prefersDark = 1;

        // Determine if dark mode should be applied
        const isDark = appearance === 'dark' || (appearance === 'system' && prefersDark);

        // Apply appropriate class to root element
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        // Store the current theme to help prevent flash
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    })();
</script>