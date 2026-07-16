<script setup lang="ts">
import { useNavigation } from '@/composables/useNavigation';

defineProps<{
    collapsed: boolean;
}>();

const { items } = useNavigation();
</script>

<template>
    <UNavigationMenu
        :collapsed="collapsed"
        :items="items"
        orientation="vertical"
    />
</template>
