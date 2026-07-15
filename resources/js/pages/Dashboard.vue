<script setup lang="ts">
import { Head, useForm } from '@inertiajs/vue3'

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
</script>

<template>
    <UApp>
        <Head title="Dashboard" />

        <div class="min-h-dvh bg-[#FDFDFC] dark:bg-[#0a0a0a]">
            <header class="flex items-center justify-between border-b border-[#e3e3e0] px-6 py-4 dark:border-[#3E3E3A]">
                <h1 class="text-lg font-semibold text-default">Dashboard</h1>

                <div class="flex items-center gap-4">
                    <span class="text-sm text-muted">{{ auth.user.name }}</span>
                    <UButton variant="outline" color="neutral" label="Log out" @click="logout" />
                </div>
            </header>

            <main class="mx-auto max-w-7xl p-6">
                <UCard>
                    <template #header>
                        <h2 class="text-lg font-semibold text-default">Welcome, {{ auth.user.name }}!</h2>
                    </template>

                    <p class="text-muted">
                        You are logged in as <strong>{{ auth.user.email }}</strong>.
                    </p>
                </UCard>
            </main>
        </div>
    </UApp>
</template>
