<script setup lang="ts">
import { useForm } from '@inertiajs/vue3';
import type { DropdownMenuItem } from '@nuxt/ui';
import { logout as logoutRoute } from '@/routes';
import type { User } from '@/types/auth';

defineProps<{
    collapsed: boolean;
    user: User;
}>();

const form = useForm({});

function logout() {
    form.post(logoutRoute.url());
}

const accountItems: DropdownMenuItem[] = [
    { label: 'Log Out', icon: 'i-lucide-log-out', onSelect: logout },
];
</script>

<template>
    <UDropdownMenu
        :items="accountItems"
        :content="{ side: 'top', sideOffset: 6 }"
        :ui="{ content: 'w-48' }"
    >
        <UButton
            color="neutral"
            variant="ghost"
            :class="
                collapsed ? 'rounded-full p-1.5' : 'w-full rounded-lg px-3 py-2'
            "
        >
            <template #default>
                <div v-if="!collapsed" class="flex w-full items-center gap-2.5">
                    <UAvatar
                        :text="user.name.charAt(0).toUpperCase()"
                        size="sm"
                        color="neutral"
                        class="shrink-0"
                    />
                    <div class="flex min-w-0 flex-1 flex-col text-left">
                        <span
                            class="truncate text-sm font-medium text-default"
                            >{{ user.name }}</span
                        >
                        <span class="truncate text-xs text-muted">{{
                            user.email
                        }}</span>
                    </div>
                    <UIcon
                        name="i-lucide-chevron-up"
                        class="size-4 shrink-0 text-muted"
                    />
                </div>
                <UAvatar
                    v-else
                    :text="user.name.charAt(0).toUpperCase()"
                    size="sm"
                    color="neutral"
                />
            </template>
        </UButton>
    </UDropdownMenu>
</template>
