import type { NavigationMenuItem } from '@nuxt/ui';
import { dashboard } from '@/routes';

export const navigation: NavigationMenuItem[] = [
    {
        label: 'Dashboard',
        icon: 'i-lucide-layout-dashboard',
        to: dashboard.url(),
    },
];
