<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui';

defineProps<{
    items?: BreadcrumbItem[];
}>();
</script>

<template>
    <UBreadcrumb v-if="items" :items="items" />
</template>
