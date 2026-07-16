<script setup lang="ts">
import AppSidebarNavigation from './AppSidebarNavigation.vue';

defineProps<{
    collapsed: boolean;
}>();
</script>

<template>
    <AppSidebarNavigation :collapsed="collapsed" />
</template>
