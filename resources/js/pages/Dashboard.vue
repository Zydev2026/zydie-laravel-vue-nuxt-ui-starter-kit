<script setup lang="ts">
import { Head, setLayoutProps } from '@inertiajs/vue3';
import type { BreadcrumbItem } from '@nuxt/ui';
import AppLayout from '@/layouts/AppLayout.vue';
import type { Auth } from '@/types/auth';

defineOptions({
    layout: AppLayout,
});

defineProps<{
    auth: Auth;
}>();

setLayoutProps({
    breadcrumbs: [{ label: 'Dashboard' }] as BreadcrumbItem[],
});
</script>

<template>
    <Head title="Dashboard" />
    <p class="text-muted">Dashboard content goes here.</p>
</template>
