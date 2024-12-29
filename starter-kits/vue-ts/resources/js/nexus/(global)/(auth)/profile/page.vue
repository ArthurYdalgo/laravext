<script setup>
import { inject } from 'vue';
import { Head } from '@laravext/vue3';
import Header from '@/components/Header.vue';
import VerifyEmailForm from './partials/VerifyEmailForm.vue';
import UpdateProfileInformationForm from './partials/UpdateProfileInformationForm.vue';
import UpdatePasswordForm from './partials/UpdatePasswordForm.vue';
import DeleteUserForm from './partials/DeleteUserForm.vue';
const $sharedProps = inject('$sharedProps');
const { user } = $sharedProps().auth;

</script>
<template>

    <Head title="Profile" />
    <Header>Profile</Header>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
            
            <div v-if="user.email_verified_at == null" class="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                <VerifyEmailForm classes="max-w-xl" />
            </div>
            <div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                <UpdateProfileInformationForm classes="max-w-xl" />
            </div>

            <div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                <UpdatePasswordForm classes="max-w-xl" />
            </div>

            <div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                <DeleteUserForm classes="max-w-xl" />
            </div>
        </div>
    </div>
</template>