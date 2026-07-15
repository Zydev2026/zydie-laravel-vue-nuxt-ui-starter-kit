<script setup lang="ts">
import { useForm, Link } from '@inertiajs/vue3'
import { Head } from '@inertiajs/vue3'

defineProps<{
    status?: string
}>()

const form = useForm({
    email: '',
})

function resend() {
    form.post('/email/verification-notification')
}

function logout() {
    form.post('/logout')
}
</script>

<template>
    <UApp>
        <Head title="Verify Email" />

        <div class="flex min-h-dvh items-center justify-center p-4">
            <UCard class="w-full max-w-sm">
                <template #header>
                    <div class="text-center">
                        <h1 class="text-xl font-semibold text-default">Verify your email</h1>
                        <p class="mt-1 text-sm text-muted">
                            Thanks for signing up! Before getting started, could you verify your email address by clicking the link we just emailed you?
                        </p>
                    </div>
                </template>

                <div v-if="status" class="mb-4 rounded-md bg-success/10 p-3 text-sm text-success">
                    {{ status }}
                </div>

                <p v-if="form.errors.email" class="mb-4 text-sm text-error">{{ form.errors.email }}</p>

                <div class="space-y-3">
                    <UButton
                        :loading="form.processing"
                        label="Resend verification email"
                        block
                        @click="resend"
                    />

                    <UButton
                        variant="outline"
                        color="neutral"
                        label="Log out"
                        block
                        @click="logout"
                    />
                </div>

                <template #footer>
                    <p class="text-center text-sm text-muted">
                        <Link href="/dashboard" class="text-primary font-medium">Go to dashboard</Link>
                    </p>
                </template>
            </UCard>
        </div>
    </UApp>
</template>
