<script setup lang="ts">
import AppLogo from './AppLogo.vue';

defineProps<{
    collapsed: boolean;
}>();
</script>

<template>
    <AppLogo :collapsed="collapsed" />
</template>
