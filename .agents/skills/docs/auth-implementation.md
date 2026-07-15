# Authentication Implementation Guide

This guide covers implementing the full authentication flow for the HRIS app using **Laravel Fortify** (backend) + **Inertia v3** (routing) + **Vue 3** (frontend) + **Nuxt UI** (components) + **Wayfinder** (typed route functions).

---

## 1. Stack Overview

| Layer | Technology |
|-------|-----------|
| Auth backend | Laravel Fortify (headless auth API) |
| Server-side rendering | Inertia v3 |
| Frontend framework | Vue 3 (Composition API, `<script setup>`) |
| UI components | Nuxt UI (`UFormField`, `UInput`, `UButton`, etc.) |
| Route functions | Wayfinder (`@/routes/...`) |
| Form handling | Inertia `useForm` composable or `<Form>` component |

---

## 2. What's Already Implemented

### Backend (`app/Providers/FortifyServiceProvider.php`)

All Fortify actions are wired:
- `CreateNewUser` — validates name, email, password; creates user
- `UpdateUserProfileInformation` — updates name/email
- `UpdateUserPasswords` — current password confirmation + new password
- `ResetUserPassword` — password reset (no current password check)
- `RedirectIfTwoFactorAuthenticatable` — 2FA challenge pipeline

Rate limiting configured (5 attempts/minute for login, 5/min for 2FA).

### Config (`config/fortify.php`)

Enabled features:
- `Features::registration()`
- `Features::resetPasswords()`
- `Features::updateProfileInformation()`
- `Features::updatePasswords()`
- `Features::twoFactorAuthentication()` (with `confirm` and `confirmPassword`)
- `Features::emailVerification()` — **enabled** (see Section 8)

`'views' => true` — Fortify is allowed to serve Inertia views via callbacks.



### Wayfinder Routes Available

All Fortify routes are already generated as typed functions:

- `@/routes/login` — `login`, `login.store`
- `@/routes/register` — `register`, `register.store`
- `@/routes/password` — `password.request`, `password.email`, `password.reset`, `password.update`, `password.confirm`, `password.confirmation`
- `@/routes/password/confirm` — `confirm.store`
- `@/routes/two-factor` — `twoFactor.login`, `twoFactor.enable`, `twoFactor.confirm`, `twoFactor.disable`, `twoFactor.qrCode`, `twoFactor.secretKey`, `twoFactor.recoveryCodes`, `twoFactor.regenerateRecoveryCodes`
- `@/routes/two-factor/login` — `login.store`
- `@/routes` — `login`, `logout`, `register`, `home`

### Shared Inertia Props

- `auth.user` — authenticated user (shared globally via `HandleInertiaRequests`)
- `access.roles`, `access.permissions` — shared on `core.*` routes via `DataLoader` middleware

---

## 3. Pages to Create

### 3.1 Registration — `resources/js/pages/auth/Register.vue`

```vue
<script setup lang="ts">
import { useForm } from '@inertiajs/vue3';
import register from '@/routes/register';

const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
});

const submit = () => {
    form.submit(register.store());
};
</script>

<template>
    <UApp>
        <main class="flex min-h-screen items-center justify-center">
            <div class="mx-auto w-full max-w-sm space-y-4">
                <img src="/images/dostlogo.png" alt="logo" class="mx-auto h-10 w-auto" />
                <div class="text-center">
                    <p class="text-lg font-bold">Create an account</p>
                    <p class="text-sm text-muted">Fill in the details to get started.</p>
                </div>
                <form @submit.prevent="submit" class="space-y-4">
                    <UFormField label="Name" :error="form.errors.name">
                        <UInput v-model="form.name" class="w-full" />
                    </UFormField>
                    <UFormField label="Email" :error="form.errors.email">
                        <UInput v-model="form.email" type="email" class="w-full" />
                    </UFormField>
                    <UFormField label="Password" :error="form.errors.password">
                        <UInput v-model="form.password" type="password" class="w-full" />
                    </UFormField>
                    <UFormField label="Confirm Password" :error="form.errors.password_confirmation">
                        <UInput v-model="form.password_confirmation" type="password" class="w-full" />
                    </UFormField>
                    <UButton label="Register" type="submit" :loading="form.processing" block />
                </form>
                <p class="text-center text-sm text-muted">
                    Already have an account?
                    <a :href="login().url" class="text-primary font-medium">Sign in</a>
                </p>
            </div>
        </main>
    </UApp>
</template>
```

> Import `login` from `@/routes` for the "Sign in" link.

### 3.2 Forgot Password — `resources/js/pages/auth/ForgotPassword.vue`

```vue
<script setup lang="ts">
import { useForm } from '@inertiajs/vue3';
import { password } from '@/routes/password';

const form = useForm({
    email: '',
});

const submit = () => {
    form.submit(password.email());
};
</script>

<template>
    <UApp>
        <main class="flex min-h-screen items-center justify-center">
            <div class="mx-auto w-full max-w-sm space-y-4">
                <img src="/images/dostlogo.png" alt="logo" class="mx-auto h-10 w-auto" />
                <div class="text-center">
                    <p class="text-lg font-bold">Forgot password</p>
                    <p class="text-sm text-muted">Enter your email and we'll send you a reset link.</p>
                </div>
                <form @submit.prevent="submit" class="space-y-4">
                    <UFormField label="Email" :error="form.errors.email">
                        <UInput v-model="form.email" type="email" class="w-full" />
                    </UFormField>
                    <UButton label="Send Reset Link" type="submit" :loading="form.processing" block />
                    <p v-if="form.wasSuccessful" class="text-sm text-green-600">
                        Password reset link sent! Check your email.
                    </p>
                </form>
                <p class="text-center text-sm text-muted">
                    <a :href="login().url" class="text-primary font-medium">Back to sign in</a>
                </p>
            </div>
        </main>
    </UApp>
</template>
```

### 3.3 Reset Password — `resources/js/pages/auth/ResetPassword.vue`

```vue
<script setup lang="ts">
import { useForm, usePage } from '@inertiajs/vue3';
import { password } from '@/routes/password';

const { token, email } = usePage().props;

const form = useForm({
    email: email ?? '',
    password: '',
    password_confirmation: '',
});

const submit = () => {
    form.submit(password.update({ token }));
};
</script>

<template>
    <UApp>
        <main class="flex min-h-screen items-center justify-center">
            <div class="mx-auto w-full max-w-sm space-y-4">
                <img src="/images/dostlogo.png" alt="logo" class="mx-auto h-10 w-auto" />
                <div class="text-center">
                    <p class="text-lg font-bold">Reset password</p>
                    <p class="text-sm text-muted">Enter your new password below.</p>
                </div>
                <form @submit.prevent="submit" class="space-y-4">
                    <UFormField label="Email" :error="form.errors.email">
                        <UInput v-model="form.email" type="email" class="w-full" />
                    </UFormField>
                    <UFormField label="Password" :error="form.errors.password">
                        <UInput v-model="form.password" type="password" class="w-full" />
                    </UFormField>
                    <UFormField label="Confirm Password" :error="form.errors.password_confirmation">
                        <UInput v-model="form.password_confirmation" type="password" class="w-full" />
                    </UFormField>
                    <UButton label="Reset Password" type="submit" :loading="form.processing" block />
                </form>
            </div>
        </main>
    </UApp>
</template>
```

> The `token` prop comes from the route parameter in `FortifyServiceProvider::resetPasswordView()` (see Section 4).

### 3.4 Two-Factor Challenge — `resources/js/pages/auth/TwoFactorChallenge.vue`

```vue
<script setup lang="ts">
import { useForm } from '@inertiajs/vue3';
import login from '@/routes/two-factor/login';

const form = useForm({
    code: '',
    recovery_code: '',
});

const mode = ref<'code' | 'recovery'>('code');

const submit = () => {
    form.clearErrors();
    if (mode.value === 'recovery') {
        form.transform(data => ({ recovery_code: data.recovery_code }));
    }
    form.submit(login.store());
};
</script>

<template>
    <UApp>
        <main class="flex min-h-screen items-center justify-center">
            <div class="mx-auto w-full max-w-sm space-y-4">
                <img src="/images/dostlogo.png" alt="logo" class="mx-auto h-10 w-auto" />
                <div class="text-center">
                    <p class="text-lg font-bold">Two-factor authentication</p>
                    <p class="text-sm text-muted">Enter the code from your authenticator app.</p>
                </div>
                <form @submit.prevent="submit" class="space-y-4">
                    <template v-if="mode === 'code'">
                        <UFormField label="Authentication Code" :error="form.errors.code">
                            <UInput v-model="form.code" class="w-full" />
                        </UFormField>
                    </template>
                    <template v-else>
                        <UFormField label="Recovery Code" :error="form.errors.recovery_code">
                            <UInput v-model="form.recovery_code" class="w-full" />
                        </UFormField>
                    </template>
                    <UButton label="Confirm" type="submit" :loading="form.processing" block />
                    <UButton
                        :label="mode === 'code' ? 'Use recovery code' : 'Use authentication code'"
                        variant="link"
                        block
                        @click="mode = mode === 'code' ? 'recovery' : 'code'"
                    />
                </form>
            </div>
        </main>
    </UApp>
</template>
```

### 3.5 Password Confirmation — `resources/js/pages/auth/ConfirmPassword.vue`

```vue
<script setup lang="ts">
import { useForm } from '@inertiajs/vue3';
import confirm from '@/routes/password/confirm';

const form = useForm({
    password: '',
});

const submit = () => {
    form.submit(confirm.store());
};
</script>

<template>
    <UApp>
        <main class="flex min-h-screen items-center justify-center">
            <div class="mx-auto w-full max-w-sm space-y-4">
                <div class="text-center">
                    <p class="text-lg font-bold">Confirm your password</p>
                    <p class="text-sm text-muted">For your security, please confirm your password.</p>
                </div>
                <form @submit.prevent="submit" class="space-y-4">
                    <UFormField label="Password" :error="form.errors.password">
                        <UInput v-model="form.password" type="password" class="w-full" />
                    </UFormField>
                    <UButton label="Confirm" type="submit" :loading="form.processing" block />
                </form>
            </div>
        </main>
    </UApp>
</template>
```

### 3.6 Email Verification Notice — `resources/js/pages/auth/VerifyEmail.vue`

Email verification routes (`/email/verify`, `/email/verification-notification`) are not yet generated by Wayfinder. You can use `router.post()` with the correct URL, or generate routes:

```bash
php artisan wayfinder:generate
```

```vue
<script setup lang="ts">
import { router, usePage, useForm } from '@inertiajs/vue3';

const { auth } = usePage().props;
const form = useForm({});

const resend = () => {
    form.post('/email/verification-notification', {
        onSuccess: () => form.defaults({}),
    });
};

const logout = () => {
    router.post('/logout');
};
</script>

<template>
    <UApp>
        <main class="flex min-h-screen items-center justify-center">
            <div class="mx-auto w-full max-w-sm space-y-4 text-center">
                <div class="text-center">
                    <p class="text-lg font-bold">Verify your email</p>
                    <p class="text-sm text-muted">
                        A verification link was sent to <strong>{{ auth?.user?.email }}</strong>.
                    </p>
                </div>
                <UButton label="Resend Verification Email" @click="resend" :loading="form.processing" block />
                <p v-if="form.wasSuccessful" class="text-sm text-green-600">
                    A new verification link has been sent.
                </p>
                <UButton label="Log out" variant="link" block @click="logout" />
            </div>
        </main>
    </UApp>
</template>
```

---

## 4. FortifyServiceProvider Updates

Register Inertia view callbacks for each auth page in `app/Providers/FortifyServiceProvider.php`:

```php
use Laravel\Fortify\Fortify;

public function boot(): void
{
    // ... existing action bindings and rate limiting ...

    Fortify::loginView(fn () => inertia('auth/Login'));

    Fortify::registerView(fn () => inertia('auth/Register'));

    Fortify::requestPasswordResetLinkView(fn () => inertia('auth/ForgotPassword'));

    Fortify::resetPasswordView(function (Request $request) {
        return inertia('auth/ResetPassword', [
            'token' => $request->route('token'),
            'email' => $request->email,
        ]);
    });

    Fortify::twoFactorChallengeView(fn () => inertia('auth/TwoFactorChallenge'));

    Fortify::confirmPasswordView(fn () => inertia('auth/ConfirmPassword'));

    // Only needed if Features::emailVerification() is enabled:
    Fortify::verifyEmailView(fn () => inertia('auth/VerifyEmail'));
}
```

---

## 5. Navigation Wiring

### 5.1 Login → Register / Forgot Password

In `auth/Login.vue`, add links:

```vue
<script setup>
import { login } from '@/routes';
import register from '@/routes/register';
import { password } from '@/routes/password';
</script>

<template>
    <!-- ... -->
    <UButton
        label="Forgot password?"
        variant="link"
        block
        @click="router.visit(password.request().url)"
    />
    <p class="text-center text-sm text-muted">
        Don't have an account?
        <a :href="register().url" class="text-primary font-medium">Sign up</a>
    </p>
</template>
```

### 5.2 Post-Login Redirect

After successful login, Fortify redirects to `config('fortify.home')` which is `/core/dashboard`. If you need to customize this, bind `Laravel\Fortify\Contracts\LoginResponse` in `AppServiceProvider`:

```php
use Laravel\Fortify\Contracts\LoginResponse;

$this->app->singleton(LoginResponse::class, function () {
    return new class implements LoginResponse {
        public function toResponse($request)
        {
            return $request->wantsJson()
                ? response()->json(['two_factor' => false])
                : redirect()->intended(route('core.dashboard'));
        }
    };
});
```

### 5.3 Logout (Already Working)

`CoreLayout.vue` already implements logout:

```ts
import { logout } from '@/routes';
router.post(logout().url);
```

---

## 6. Email Verification

`Features::emailVerification()` is enabled in `config/fortify.php`. To make it work:

### 6.1 User Model

Uncomment `MustVerifyEmail` on the User model:

```php
use Illuminate\Contracts\Auth\MustVerifyEmail;

class User extends Authenticatable implements MustVerifyEmail
{
    // ...
}
```

### 6.2 Route Middleware

The `verified` middleware is already applied to all `core.*` and `api.locations.*` routes. With `MustVerifyEmail` implemented, unverified users will be redirected to the email verification notice page.

### 6.3 Factory

The `UserFactory` has an `unverified()` state — use it in tests/seeds to create unverified users:

```php
User::factory()->unverified()->create();
```

### 6.4 VerifyEmail View Callback

Already covered in Section 4 — register `Fortify::verifyEmailView()`.

---

## 7. Two-Factor Authentication (2FA)

### 7.1 Database

The migration `add_two_factor_columns_to_users_table` already exists. Run it:

```bash
php artisan migrate
```

### 7.2 User Setup UI

Create a settings/security page under `core/*` routes where authenticated users can:
- Enable 2FA (POST to `twoFactor.enable()`)
- Confirm 2FA with code (POST to `twoFactor.confirm()`)
- View QR code (GET `twoFactor.qrCode()`) — returns JSON with SVG
- View recovery codes (GET `twoFactor.recoveryCodes()`)
- Regenerate recovery codes (POST `twoFactor.regenerateRecoveryCodes()`)
- Disable 2FA (DELETE to `twoFactor.disable()`)

### 7.3 Confirm Password

`twoFactorAuthentication` config has `'confirmPassword' => true`, so users must confirm their password before enabling 2FA. The `ConfirmPassword.vue` page (Section 3.5) handles this.

---

## 8. Reusable Component Patterns

### 8.1 Standard Form Pattern (useForm)

```vue
<script setup lang="ts">
import { useForm } from '@inertiajs/vue3';
import someRoute from '@/routes/some-route';

const form = useForm({ field: '' });

const submit = () => {
    form.submit(someRoute.store());
};
</script>

<template>
    <UFormField label="Field" :error="form.errors.field">
        <UInput v-model="form.field" class="w-full" />
    </UFormField>
</template>
```

### 8.2 Inertia `<Form>` Component Alternative

```vue
<script setup lang="ts">
import { Form } from '@inertiajs/vue3';
import someRoute from '@/routes/some-route';
</script>

<template>
    <Form
        :action="someRoute.store().url"
        method="post"
        #default="{ errors, processing, wasSuccessful }"
    >
        <UFormField label="Field" :error="errors.field">
            <UInput name="field" class="w-full" />
        </UFormField>
        <UButton type="submit" :loading="processing" label="Submit" block />
    </Form>
</template>
```

### 8.3 Error Display

Each `UFormField` receives the `:error` prop with `form.errors.fieldName`. For global errors, check `hasErrors`:

```vue
<UBanner v-if="form.hasErrors" color="error" variant="solid" icon="i-lucide-alert-circle">
    Please correct the errors below.
</UBanner>
```

### 8.4 Guest Layout

All auth pages share the same wrapper pattern: `<UApp>` wrapping a centered flex container with logo. Consider extracting a shared guest layout (`resources/js/layouts/GuestLayout.vue`):

```vue
<!-- resources/js/layouts/GuestLayout.vue -->
<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
</script>

<template>
    <UApp>
        <main class="flex min-h-screen items-center justify-center">
            <div class="mx-auto w-full max-w-sm space-y-4">
                <img src="/images/dostlogo.png" alt="logo" class="mx-auto h-10 w-auto" />
                <slot />
            </div>
        </main>
    </UApp>
</template>
```

Then use it in each auth page:

```vue
<script setup>
import GuestLayout from '@/layouts/GuestLayout.vue';
</script>

<template>
    <GuestLayout>
        <!-- page-specific content -->
    </GuestLayout>
</template>
```

---

## 9. Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| `Vite manifest: Unable to locate file` | Frontend assets not built | Run `pnpm run build` or `php artisan composer run dev` |
| Fortify returns 404 on auth pages | View callback not registered | Add `Fortify::*View()` in `FortifyServiceProvider` |
| `verified` middleware blocks access | User not verified | Enable `MustVerifyEmail` on User model, or remove `verified` from route middleware |
| Wayfinder route not found | Routes not generated | Run `php artisan wayfinder:generate` |
| 2FA returns JSON instead of redirect | `views: true` but no Inertia view registered | Register `Fortify::twoFactorChallengeView()` |
| Login takes 5+ attempts then locks | Rate limiter hit | Wait 1 minute or run `php artisan cache:clear` |
| Reset password link returns 404 | `password.reset` named route not registered | Fortify registers it automatically; verify with `php artisan route:list --name=password` |

---

## 10. Checklist

- [ ] Create `auth/Register.vue`
- [ ] Create `auth/ForgotPassword.vue`
- [ ] Create `auth/ResetPassword.vue`
- [ ] Create `auth/TwoFactorChallenge.vue`
- [ ] Create `auth/ConfirmPassword.vue`
- [ ] Create `auth/VerifyEmail.vue`
- [ ] Register all view callbacks in `FortifyServiceProvider`
- [ ] Add navigation links between auth pages
- [ ] Uncomment `MustVerifyEmail` on User model
- [ ] Uncomment `Features::emailVerification()` in `config/fortify.php`
- [ ] (Optional) Extract `GuestLayout.vue`
- [ ] (Optional) Customize `LoginResponse` contract for redirects
- [ ] Verify all pages: `php artisan route:list --except-vendor`
- [ ] Run `pnpm run build` or `php artisan composer run dev`
