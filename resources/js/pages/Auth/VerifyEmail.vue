<script setup lang="ts">
import { useForm, Link } from '@inertiajs/vue3';
import { Head } from '@inertiajs/vue3';
import MainLayout from '@/layouts/MainLayout.vue';
import { logout as logoutRoute } from '@/routes';

defineOptions({
    layout: MainLayout,
});

defineProps<{
    status?: string;
}>();

const form = useForm({
    email: '',
});

function resend() {
    form.post('/email/verification-notification');
}

function logout() {
    form.post(logoutRoute.url());
}
</script>

<template>
    <Head title="Verify Email" />

    <div class="text-center">
        <h1 class="text-xl font-semibold text-default">Verify your email</h1>
        <p class="mt-1 text-sm text-muted">
            Thanks for signing up! Before getting started, could you verify your
            email address by clicking the link we just emailed you?
        </p>
    </div>

    <div
        v-if="status"
        class="mt-6 rounded-md bg-success/10 p-3 text-sm text-success"
    >
        {{ status }}
    </div>

    <p v-if="form.errors.email" class="mt-6 text-sm text-error">
        {{ form.errors.email }}
    </p>

    <div class="mt-6 space-y-3">
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

    <p class="mt-6 text-center text-sm text-muted">
        <Link href="/dashboard" class="font-medium text-primary"
            >Go to dashboard</Link
        >
    </p>
</template>
