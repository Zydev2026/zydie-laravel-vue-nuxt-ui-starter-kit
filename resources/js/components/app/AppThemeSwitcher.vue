<script setup lang="ts">
import { useTheme } from '@/composables/useTheme';

const { isDark, toggle } = useTheme();
</script>

<template>
    <UButton
        :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
        color="neutral"
        variant="ghost"
        :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        @click="toggle"
    />
</template>
