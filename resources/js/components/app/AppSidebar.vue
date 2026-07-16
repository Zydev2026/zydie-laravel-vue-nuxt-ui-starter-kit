<script setup lang="ts">
import type { User } from '@/types/auth';
import AppSidebarContent from './AppSidebarContent.vue';
import AppSidebarFooter from './AppSidebarFooter.vue';
import AppSidebarHeader from './AppSidebarHeader.vue';

defineProps<{
    user: User;
}>();
</script>

<template>
    <UDashboardSidebar
        collapsible
        resizable
        auto-close
        mode="slideover"
        :default-size="18"
        :min-size="14"
        :max-size="25"
    >
        <template #header="{ collapsed }">
            <AppSidebarHeader :collapsed="collapsed" />
        </template>

        <template #default="{ collapsed }">
            <AppSidebarContent :collapsed="collapsed" />
        </template>

        <template #footer="{ collapsed }">
            <AppSidebarFooter :collapsed="collapsed" :user="user" />
        </template>
    </UDashboardSidebar>
</template>
