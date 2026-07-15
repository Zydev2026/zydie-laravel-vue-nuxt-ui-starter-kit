<script setup lang="ts">
import { useForm, Link } from '@inertiajs/vue3'
import { Head } from '@inertiajs/vue3'

defineProps<{
    status?: string
}>()

const form = useForm({
    email: '',
})

function submit() {
    form.post('/forgot-password')
}
</script>

<template>
    <UApp>
        <Head title="Forgot Password" />

        <div class="flex min-h-dvh items-center justify-center p-4">
            <UCard class="w-full max-w-sm">
                <template #header>
                    <div class="text-center">
                        <h1 class="text-xl font-semibold text-default">Forgot password?</h1>
                        <p class="mt-1 text-sm text-muted">
                            No problem. Just let us know your email address and we will email you a password reset link.
                        </p>
                    </div>
                </template>

                <div v-if="status" class="mb-4 rounded-md bg-success/10 p-3 text-sm text-success">
                    {{ status }}
                </div>

                <form @submit.prevent="submit" class="space-y-4">
                    <div>
                        <label for="email" class="text-sm font-medium text-default">Email</label>
                        <UInput
                            id="email"
                            v-model="form.email"
                            type="email"
                            placeholder="you@example.com"
                            class="mt-1 w-full"
                        />
                        <p v-if="form.errors.email" class="mt-1 text-sm text-error">{{ form.errors.email }}</p>
                    </div>

                    <UButton type="submit" :loading="form.processing" label="Email password reset link" block />
                </form>

                <template #footer>
                    <p class="text-center text-sm text-muted">
                        <Link href="/login" class="text-primary font-medium">Back to sign in</Link>
                    </p>
                </template>
            </UCard>
        </div>
    </UApp>
</template>
