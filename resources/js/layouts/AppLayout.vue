<script setup lang="ts">
import { usePage } from '@inertiajs/vue3';
import type { BreadcrumbItem } from '@nuxt/ui';
import { computed } from 'vue';
import AppHeader from '@/components/app/AppHeader.vue';
import AppSidebar from '@/components/app/AppSidebar.vue';

defineProps<{
    breadcrumbs?: BreadcrumbItem[];
}>();

const page = usePage();
const user = computed(() => page.props.auth?.user);
</script>

<template>
    <UApp>
        <UDashboardGroup>
            <AppSidebar v-if="user" :user="user" />

            <UDashboardPanel>
                <template #header>
                    <AppHeader :breadcrumbs="breadcrumbs" />
                </template>

                <template #body>
                    <div class="h-full overflow-y-auto p-6">
                        <slot />
                    </div>
                </template>
            </UDashboardPanel>
        </UDashboardGroup>
    </UApp>
</template>
