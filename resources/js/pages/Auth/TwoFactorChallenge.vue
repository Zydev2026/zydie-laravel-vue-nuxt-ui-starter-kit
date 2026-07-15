<script setup lang="ts">
import { useForm } from '@inertiajs/vue3'
import { Head } from '@inertiajs/vue3'
import { ref } from 'vue'

const form = useForm({
    code: '',
    recovery_code: '',
})

const mode = ref<'code' | 'recovery'>('code')

function submit() {
    form.post('/two-factor-challenge', {
        preserveState: true,
        onError: () => form.reset('code', 'recovery_code'),
    })
}
</script>

<template>
    <UApp>
        <Head title="Two-Factor Authentication" />

        <div class="flex min-h-dvh items-center justify-center p-4">
            <UCard class="w-full max-w-sm">
                <template #header>
                    <div class="text-center">
                        <h1 class="text-xl font-semibold text-default">Two-factor authentication</h1>
                        <p class="mt-1 text-sm text-muted">
                            {{ mode === 'code' ? 'Enter the authentication code from your authenticator app.' : 'Enter one of your emergency recovery codes.' }}
                        </p>
                    </div>
                </template>

                <form @submit.prevent="submit" class="space-y-4">
                    <div v-if="mode === 'code'">
                        <label for="code" class="text-sm font-medium text-default">Code</label>
                        <UInput
                            id="code"
                            v-model="form.code"
                            type="text"
                            placeholder="123456"
                            class="mt-1 w-full"
                        />
                        <p v-if="form.errors.code" class="mt-1 text-sm text-error">{{ form.errors.code }}</p>
                    </div>

                    <div v-else>
                        <label for="recovery_code" class="text-sm font-medium text-default">Recovery Code</label>
                        <UInput
                            id="recovery_code"
                            v-model="form.recovery_code"
                            type="text"
                            placeholder="xxxx-xxxx-xxxx-xxxx"
                            class="mt-1 w-full"
                        />
                        <p v-if="form.errors.recovery_code" class="mt-1 text-sm text-error">{{ form.errors.recovery_code }}</p>
                    </div>

                    <UButton type="submit" :loading="form.processing" :label="mode === 'code' ? 'Authenticate' : 'Recover access'" block />

                    <UButton
                        variant="outline"
                        color="neutral"
                        block
                        @click="mode = mode === 'code' ? 'recovery' : 'code'"
                    >
                        {{ mode === 'code' ? 'Use a recovery code' : 'Use an authentication code' }}
                    </UButton>
                </form>
            </UCard>
        </div>
    </UApp>
</template>
