<script setup lang="ts">
defineProps<{
    collapsed: boolean;
}>();
</script>

<template>
    <div
        class="flex items-center"
        :class="collapsed ? 'mx-auto' : 'gap-2 px-1'"
    >
        <div
            class="text-primary-foreground flex shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold"
            :class="collapsed ? 'size-6' : 'size-8'"
        >
            L
        </div>
        <span v-if="!collapsed" class="text-sm font-semibold text-default">{{
            $page.props.name
        }}</span>
    </div>
</template>
