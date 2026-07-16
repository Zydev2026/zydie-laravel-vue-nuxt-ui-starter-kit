<script setup lang="ts">
import type { User } from '@/types/auth';
import AppUserMenu from './AppUserMenu.vue';

defineProps<{
    collapsed: boolean;
    user: User;
}>();
</script>

<template>
    <AppUserMenu :collapsed="collapsed" :user="user" />
</template>
