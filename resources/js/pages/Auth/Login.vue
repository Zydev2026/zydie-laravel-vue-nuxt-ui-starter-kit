<script setup lang="ts">
import { useForm, Link } from '@inertiajs/vue3'
import { Head } from '@inertiajs/vue3'

const form = useForm({
    email: '',
    password: '',
    remember: false,
})

function submit() {
    form.post('/login', {
        preserveState: true,
        onError: () => form.reset('password'),
    })
}
</script>

<template>
    <UApp>
        <Head title="Sign In" />

        <div class="flex min-h-dvh items-center justify-center p-4">
            <UCard class="w-full max-w-sm">
                <!-- <template #header>
                    <div class="text-center">
                        <h1 class="text-xl font-semibold text-default">Welcome back</h1>
                        <p class="mt-1 text-sm text-muted">Sign in to your account</p>
                    </div>
                </template> -->

                <form @submit.prevent="submit" class="space-y-4">
                    <div>
                        <label for="email" class="text-sm font-medium text-default">Email</label>
                        <UInput
                            id="email"
                            v-model="form.email"
                            type="email"
                            placeholder="you@example.com"
                            :class="{ 'border-error': form.errors.email }"
                            class="mt-1 w-full"
                        />
                        <p v-if="form.errors.email" class="mt-1 text-sm text-error">{{ form.errors.email }}</p>
                    </div>

                    <div>
                        <div class="flex items-center justify-between">
                            <label for="password" class="text-sm font-medium text-default">Password</label>
                            <Link href="/forgot-password" class="text-sm text-primary font-medium">
                                Forgot password?
                            </Link>
                        </div>
                        <UInput
                            id="password"
                            v-model="form.password"
                            type="password"
                            placeholder="Enter your password"
                            class="mt-1 w-full"
                        />
                        <p v-if="form.errors.password" class="mt-1 text-sm text-error">{{ form.errors.password }}</p>
                    </div>

                    <UCheckbox v-model="form.remember" label="Remember me" name="remember" />

                    <UButton type="submit" :loading="form.processing" label="Sign in" block />
                </form>

                <template #footer>
                    <p class="text-center text-sm text-muted">
                        Don't have an account?
                        <Link href="/register" class="text-primary font-medium">Sign up</Link>
                    </p>
                </template>
            </UCard>
        </div>
    </UApp>
</template>
