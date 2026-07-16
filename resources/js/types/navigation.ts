import type { NavigationMenuItem } from '@nuxt/ui';
import type { BreadcrumbItem } from '@nuxt/ui';

export type NavItem = NavigationMenuItem;

export type BreadcrumbItems = BreadcrumbItem[];

export interface AccountMenuItem {
    label: string;
    icon?: string;
    to?: string;
    type?: 'label' | 'separator' | 'link';
    onSelect?: () => void;
    disabled?: boolean;
}

export interface PageMeta {
    title: string;
    breadcrumbs: BreadcrumbItems;
}
