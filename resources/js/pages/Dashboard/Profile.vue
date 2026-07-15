<script setup lang="ts">
import { Head, useForm } from '@inertiajs/vue3'
import { computed } from 'vue'
import type { NavigationMenuItem } from '@nuxt/ui'

defineProps<{
    auth: {
        user: {
            name: string
            email: string
        }
    }
}>()

const form = useForm({})

function logout() {
    form.post('/logout')
}

const items = computed<NavigationMenuItem[]>(() => [
    {
        label: 'Home',
        icon: 'i-lucide-house',
        to: '/dashboard',
    },
    {
        label: 'Profile',
        icon: 'i-lucide-user',
        to: '/dashboard/profile',
    },
    {
        label: 'Settings',
        icon: 'i-lucide-settings',
        to: '/dashboard/settings',
    },
])
</script>

<template>
    <UApp>
        <Head title="Profile" />

        <UDashboardGroup>
            <UDashboardSidebar collapsible resizable>
                <template #header="{ collapsed }">
                    <div class="flex items-center gap-2 px-2" :class="collapsed ? 'justify-center' : ''">
                        <span class="text-xl font-bold text-default">L</span>
                        <span v-if="!collapsed" class="text-sm font-semibold text-default">{{ $page.props.name }}</span>
                    </div>
                </template>

                <template #default="{ collapsed }">
                    <UNavigationMenu
                        :collapsed="collapsed"
                        :items="items"
                        orientation="vertical"
                    />
                </template>

                <template #footer="{ collapsed }">
                    <div class="border-t border-muted p-2">
                        <UButton
                            :icon="collapsed ? 'i-lucide-log-out' : undefined"
                            :label="collapsed ? undefined : 'Sign out'"
                            color="neutral"
                            variant="ghost"
                            block
                            @click="logout"
                        />
                    </div>
                </template>
            </UDashboardSidebar>

            <UDashboardPanel>
                <template #header>
                    <UDashboardNavbar title="Profile">
                        <template #leading>
                            <UDashboardSidebarCollapse />
                        </template>
                    </UDashboardNavbar>
                </template>

                <template #body>
                    <div class="p-6">
                        <UCard>
                            <template #header>
                                <h2 class="text-lg font-semibold text-default">Profile</h2>
                            </template>

                            <p class="text-muted">Profile settings coming soon.</p>
                        </UCard>
                    </div>
                </template>
            </UDashboardPanel>
        </UDashboardGroup>
    </UApp>
</template>
