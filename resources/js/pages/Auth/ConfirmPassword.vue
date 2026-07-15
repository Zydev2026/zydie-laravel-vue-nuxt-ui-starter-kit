<script setup lang="ts">
import { useForm } from '@inertiajs/vue3'
import { Head } from '@inertiajs/vue3'

const form = useForm({
    password: '',
})

function submit() {
    form.post('/user/confirm-password', {
        preserveState: true,
        onError: () => form.reset('password'),
    })
}
</script>

<template>
    <UApp>
        <Head title="Confirm Password" />

        <div class="flex min-h-dvh items-center justify-center p-4">
            <UCard class="w-full max-w-sm">
                <template #header>
                    <div class="text-center">
                        <h1 class="text-xl font-semibold text-default">Confirm your password</h1>
                        <p class="mt-1 text-sm text-muted">
                            This is a secure area of the application. Please confirm your password before continuing.
                        </p>
                    </div>
                </template>

                <form @submit.prevent="submit" class="space-y-4">
                    <div>
                        <label for="password" class="text-sm font-medium text-default">Password</label>
                        <UInput
                            id="password"
                            v-model="form.password"
                            type="password"
                            placeholder="Enter your password"
                            class="mt-1 w-full"
                        />
                        <p v-if="form.errors.password" class="mt-1 text-sm text-error">{{ form.errors.password }}</p>
                    </div>

                    <UButton type="submit" :loading="form.processing" label="Confirm" block />
                </form>
            </UCard>
        </div>
    </UApp>
</template>
