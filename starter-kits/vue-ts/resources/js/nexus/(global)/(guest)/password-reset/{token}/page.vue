<script setup>
import { inject, ref, reactive } from 'vue';
import InputError from '@/components/InputError.vue';
import InputLabel from '@/components/InputLabel.vue';
import PrimaryButton from '@/components/PrimaryButton.vue';
import TextInput from '@/components/TextInput.vue';
import { Head, visit } from '@laravext/vue3';
import axios from 'axios';

const $routeParams = inject('$routeParams');
const $queryParams = inject('$queryParams');

const { token } = $routeParams();
const { email } = $queryParams();

const data = reactive({
    token: token,
    email: email,
    password: '',
    password_confirmation: '',
});

const processing = ref(false);
const errors = ref({})

const submit = (e) => {
    e.preventDefault();
    processing.value = true;

    axios.post('/api/auth/reset-password', data)
        .then(({ data }) => {
            visit(route('login'));
        }).catch((error) => {
            if (error.response.status === 422) {
                errors.value = error.response.data.errors;
            }

            processing.value = false
        });
};

</script>
<template>

    <Head title="Reset Password" />

    <form @submit.prevent="submit">
        <div>
            <InputLabel htmlFor="email" value="Email" />

            <TextInput id="email" type="email" name="email" readOnly class="mt-1 block w-full"
                autoComplete="username" v-model="data.email" />

            <InputError :message="errors.email" class="mt-2" />
        </div>

        <div class="mt-4">
            <InputLabel htmlFor="password" value="Password" />

            <TextInput id="password" type="password" name="password" class="mt-1 block w-full"
                autoComplete="new-password" isFocused={true} v-model="data.password" />

            <InputError :message="errors.password" class="mt-2" />
        </div>

        <div class="mt-4">
            <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

            <TextInput type="password" id="password_confirmation" name="password_confirmation"
                class="mt-1 block w-full" autoComplete="new-password" v-model="data.password_confirmation" />

            <InputError :message="errors.password_confirmation" class="mt-2" />
        </div>

        <div class="flex items-center justify-end mt-4">
            <PrimaryButton class="ms-4" :disabled="processing">
                Reset Password
            </PrimaryButton>
        </div>
    </form>
</template>
