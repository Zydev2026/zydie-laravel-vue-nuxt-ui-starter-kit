<script setup lang="ts">
import { useForm, Link } from '@inertiajs/vue3'
import { Head } from '@inertiajs/vue3'

const props = defineProps<{
    token: string
    email: string
}>()

const form = useForm({
    token: props.token,
    email: props.email,
    password: '',
    password_confirmation: '',
})

function submit() {
    form.post('/reset-password', {
        onError: () => form.reset('password', 'password_confirmation'),
    })
}
</script>

<template>
    <UApp>
        <Head title="Reset Password" />

        <div class="flex min-h-dvh items-center justify-center p-4">
            <UCard class="w-full max-w-sm">
                <template #header>
                    <div class="text-center">
                        <h1 class="text-xl font-semibold text-default">Reset password</h1>
                        <p class="mt-1 text-sm text-muted">Choose a new password for your account</p>
                    </div>
                </template>

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

                    <div>
                        <label for="password" class="text-sm font-medium text-default">Password</label>
                        <UInput
                            id="password"
                            v-model="form.password"
                            type="password"
                            placeholder="Min 8 characters"
                            class="mt-1 w-full"
                        />
                        <p v-if="form.errors.password" class="mt-1 text-sm text-error">{{ form.errors.password }}</p>
                    </div>

                    <div>
                        <label for="password_confirmation" class="text-sm font-medium text-default">Confirm Password</label>
                        <UInput
                            id="password_confirmation"
                            v-model="form.password_confirmation"
                            type="password"
                            placeholder="Confirm your password"
                            class="mt-1 w-full"
                        />
                        <p v-if="form.errors.password_confirmation" class="mt-1 text-sm text-error">{{ form.errors.password_confirmation }}</p>
                    </div>

                    <UButton type="submit" :loading="form.processing" label="Reset password" block />
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
