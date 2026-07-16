<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui';
import AppBreadcrumb from './AppBreadcrumb.vue';
import AppThemeSwitcher from './AppThemeSwitcher.vue';

defineProps<{
    breadcrumbs?: BreadcrumbItem[];
}>();
</script>

<template>
    <UDashboardNavbar>
        <template #leading>
            <div class="flex items-center gap-3">
                <UDashboardSidebarCollapse variant="subtle" />
                <AppBreadcrumb :items="breadcrumbs" />
            </div>
        </template>

        <template #right>
            <AppThemeSwitcher />
        </template>
    </UDashboardNavbar>
</template>
