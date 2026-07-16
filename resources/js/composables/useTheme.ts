import { ref, watch, onMounted } from 'vue';

const THEME_STORAGE_KEY = 'theme';

export function useTheme() {
    const isDark = ref(false);

    onMounted(() => {
        const stored = localStorage.getItem(THEME_STORAGE_KEY);

        if (stored) {
            isDark.value = stored === 'dark';
        } else {
            isDark.value = document.documentElement.classList.contains('dark');
        }
    });

    function toggle() {
        isDark.value = !isDark.value;
    }

    function setDark(dark: boolean) {
        isDark.value = dark;
    }

    watch(isDark, (dark) => {
        document.documentElement.classList.toggle('dark', dark);
        localStorage.setItem(THEME_STORAGE_KEY, dark ? 'dark' : 'light');
    });

    return { isDark, toggle, setDark };
}
