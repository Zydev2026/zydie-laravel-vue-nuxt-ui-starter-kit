<script setup lang="ts">
import { useForm, Link } from '@inertiajs/vue3';
import { Head } from '@inertiajs/vue3';
import MainLayout from '@/layouts/MainLayout.vue';

defineOptions({
    layout: MainLayout,
});

const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
});

function submit() {
    form.post('/register', {
        preserveState: true,
        onError: () => form.reset('password', 'password_confirmation'),
    });
}
</script>

<template>
    <Head title="Create Account" />

    <div class="text-center">
        <h1 class="text-xl font-semibold text-default">Create an account</h1>
        <p class="mt-1 text-sm text-muted">
            Get started with your free account
        </p>
    </div>

    <form @submit.prevent="submit" class="mt-6 space-y-4">
        <div>
            <label for="name" class="text-sm font-medium text-default"
                >Name</label
            >
            <UInput
                id="name"
                v-model="form.name"
                type="text"
                placeholder="John Doe"
                class="mt-1 w-full"
            />
            <p v-if="form.errors.name" class="mt-1 text-sm text-error">
                {{ form.errors.name }}
            </p>
        </div>

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
                placeholder="Min 8 characters"
                class="mt-1 w-full"
            />
            <p v-if="form.errors.password" class="mt-1 text-sm text-error">
                {{ form.errors.password }}
            </p>
        </div>

        <div>
            <label
                for="password_confirmation"
                class="text-sm font-medium text-default"
                >Confirm Password</label
            >
            <UInput
                id="password_confirmation"
                v-model="form.password_confirmation"
                type="password"
                placeholder="Confirm your password"
                class="mt-1 w-full"
            />
            <p
                v-if="form.errors.password_confirmation"
                class="mt-1 text-sm text-error"
            >
                {{ form.errors.password_confirmation }}
            </p>
        </div>

        <UButton
            type="submit"
            :loading="form.processing"
            label="Create account"
            block
        />
    </form>

    <p class="mt-6 text-center text-sm text-muted">
        Already have an account?
        <Link href="/login" class="font-medium text-primary">Log in</Link>
    </p>
</template>
