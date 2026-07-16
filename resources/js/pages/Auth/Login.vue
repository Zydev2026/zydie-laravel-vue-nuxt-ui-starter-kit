<script setup lang="ts">
import { useForm, Link } from '@inertiajs/vue3';
import { Head } from '@inertiajs/vue3';
import MainLayout from '@/layouts/MainLayout.vue';

defineOptions({
    layout: MainLayout,
});

const form = useForm({
    email: '',
    password: '',
    remember: false,
});

function submit() {
    form.post('/login', {
        preserveState: true,
        onError: () => form.reset('password'),
    });
}
</script>

<template>
    <Head title="Sign In" />

    <div class="text-center">
        <h1 class="text-xl font-semibold text-default">Welcome back</h1>
        <p class="mt-1 text-sm text-muted">Sign in to your account</p>
    </div>

    <form @submit.prevent="submit" class="mt-6 space-y-4">
        <div>
            <label for="email" class="text-sm font-medium text-default"
                >Email</label
            >
            <UInput
                id="email"
                v-model="form.email"
                type="email"
                placeholder="you@example.com"
                class="mt-1 w-full"
            />
            <p v-if="form.errors.email" class="mt-1 text-sm text-error">
                {{ form.errors.email }}
            </p>
        </div>

        <div>
            <label for="password" class="text-sm font-medium text-default"
                >Password</label
            >
            <UInput
                id="password"
                v-model="form.password"
                type="password"
                placeholder="Enter your password"
                class="mt-1 w-full"
            />
            <p v-if="form.errors.password" class="mt-1 text-sm text-error">
                {{ form.errors.password }}
            </p>
        </div>

        <div class="flex items-center justify-between">
            <UCheckbox
                v-model="form.remember"
                label="Remember me"
                name="remember"
            />
            <Link
                href="/forgot-password"
                class="text-sm font-medium text-primary"
            >
                Forgot password?
            </Link>
        </div>

        <UButton
            type="submit"
            :loading="form.processing"
            label="Log in"
            block
        />
    </form>

    <p class="mt-6 text-center text-sm text-muted">
        Don't have an account?
        <Link href="/register" class="font-medium text-primary">Sign up</Link>
    </p>
</template>
