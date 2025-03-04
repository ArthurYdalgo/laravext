<script setup lang="ts">
import { TransitionRoot } from '@headlessui/vue';
import { Link, visit } from '@laravext/vue3';

import DeleteUser from '@/components/DeleteUser.vue';
import HeadingSmall from '@/components/HeadingSmall.vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';
import SettingsLayout from '@/layouts/settings/Layout.vue';
import { type BreadcrumbItem, type SharedData, type User } from '@/types';
import { inject } from 'vue';
import { useForm } from '@/composables/useForm';
import axios from 'axios';
const sharedProps = inject('$sharedProps') as any;

const user = sharedProps().auth.user as User;

interface Props {
    mustVerifyEmail: boolean;
    status?: string;
    className?: string;
}

defineProps<Props>();

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Profile settings',
        href: '/settings/profile',
    },
];

const { data, processing, setProcessing, errors, setErrors, clearErrors } = useForm({
    name: user.name,
    email: user.email,
});

const submit = () => {
    setProcessing(true);
    clearErrors();

    axios.patch('/api/settings/profile', data.value).then(() => {
        visit('/settings/profile');
    }).catch((error) => {
        setErrors(error.response.data.errors);
    }).finally(() => {
        setProcessing(false);
    });
};

</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbs">

        <Head title="Profile settings" />

        <SettingsLayout>
            <div class="flex flex-col space-y-6">
                <HeadingSmall title="Profile information" description="Update your name and email address" />

                <form @submit.prevent="submit" class="space-y-6">
                    <div class="grid gap-2">
                        <Label for="name">Name</Label>
                        <Input id="name" class="mt-1 block w-full" v-model="data.name" required autocomplete="name"
                            placeholder="Full name" />
                        <InputError class="mt-2" :message="errors.name" />
                    </div>

                    <div class="grid gap-2">
                        <Label for="email">Email address</Label>
                        <Input id="email" type="email" class="mt-1 block w-full" v-model="data.email" required
                            autocomplete="username" placeholder="Email address" />
                        <InputError class="mt-2" :message="errors.email" />
                    </div>
                    
                    <div v-if="mustVerifyEmail && !user.email_verified_at">
                        <p class="mt-2 text-sm text-neutral-800">
                            Your email address is unverified.
                            <Link :href="route('verification.send')" method="post" as="button"
                                class="focus:outline-hidden rounded-md text-sm text-neutral-600 underline hover:text-neutral-900 focus:ring-2 focus:ring-offset-2">
                            Click here to re-send the verification email.
                            </Link>
                        </p>

                        <div v-if="status === 'verification-link-sent'" class="mt-2 text-sm font-medium text-green-600">
                            A new verification link has been sent to your email address.
                        </div>
                    </div>

                    <div class="flex items-center gap-4">
                        <Button :disabled="processing">Save</Button>
                    </div>
                </form>
            </div>

            <DeleteUser />
        </SettingsLayout>
    </AppLayout>
</template>
