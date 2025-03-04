<script setup lang="ts">
import InputError from '@/components/InputError.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import SettingsLayout from '@/layouts/settings/Layout.vue';
import { TransitionRoot } from '@headlessui/vue';
import { Head } from '@laravext/vue3';
import { ref } from 'vue';
import { useForm } from '@/composables/useForm';

import HeadingSmall from '@/components/HeadingSmall.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { type BreadcrumbItem } from '@/types';
import axios from 'axios';
import { set } from '@vueuse/core';

interface Props {
    className?: string;
}

defineProps<Props>();

const breadcrumbItems: BreadcrumbItem[] = [
    {
        title: 'Password settings',
        href: '/settings/password',
    },
];

const passwordInput = ref<HTMLInputElement>();
const currentPasswordInput = ref<HTMLInputElement>();

const { data, errors, setErrors, clearErrors, reset, processing, recentlySuccessful, setRecentlySuccessful } = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
});

const updatePassword = () => {
    clearErrors();

    axios.put('/api/settings/password', data.value).then(() => {
        reset();
        clearErrors();
        setRecentlySuccessful(true);
    }).catch((error) => {
        let responseErrors = error.response.data.errors;

        setErrors(responseErrors);

        if (responseErrors.password) {
            reset('password');
            reset('password_confirmation');
            passwordInput.value?.focus();
        }

        if (responseErrors.current_password) {
            reset('current_password');
            currentPasswordInput.value?.focus();
        }

    });
};
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">

        <Head title="Profile settings" />

        <SettingsLayout>
            <div class="space-y-6">
                <HeadingSmall title="Update password"
                    description="Ensure your account is using a long, random password to stay secure" />

                <form @submit.prevent="updatePassword" class="space-y-6">
                    <div class="grid gap-2">
                        <Label for="current_password">Current Password</Label>
                        <Input id="current_password" ref="currentPasswordInput" v-model="data.current_password"
                            type="password" class="mt-1 block w-full" autocomplete="current-password"
                            placeholder="Current password" />
                        <InputError :message="errors.current_password" />
                    </div>

                    <div class="grid gap-2">
                        <Label for="password">New password</Label>
                        <Input id="password" ref="passwordInput" v-model="data.password" type="password"
                            class="mt-1 block w-full" autocomplete="new-password" placeholder="New password" />
                        <InputError :message="errors.password" />
                    </div>

                    <div class="grid gap-2">
                        <Label for="password_confirmation">Confirm password</Label>
                        <Input id="password_confirmation" v-model="data.password_confirmation" type="password"
                            class="mt-1 block w-full" autocomplete="new-password" placeholder="Confirm password" />
                        <InputError :message="errors.password_confirmation" />
                    </div>

                    <div class="flex items-center gap-4">
                        <Button :disabled="processing">Save password</Button>

                        <TransitionRoot :show="recentlySuccessful" enter="transition ease-in-out"
                            enter-from="opacity-0" leave="transition ease-in-out" leave-to="opacity-0">
                            <p class="text-sm text-neutral-600">Saved</p>
                        </TransitionRoot>
                    </div>
                </form>
            </div>
        </SettingsLayout>
    </AppLayout>
</template>
