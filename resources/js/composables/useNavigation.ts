import { usePage } from '@inertiajs/vue3';
import { computed } from 'vue';
import { navigation } from '@/lib/navigation';

export function useNavigation() {
    const { url } = usePage();

    const items = computed(() => navigation);

    function isActive(path: string): boolean {
        if (!path || path === '#') {
            return false;
        }

        return url === path || url.startsWith(path + '/');
    }

    function isActiveRoute(path: string): boolean {
        if (!path || path === '#') {
            return false;
        }

        return url === path;
    }

    return { items, isActive, isActiveRoute };
}
