<script setup>
import Checkbox from '@/components/Checkbox.vue';
import InputError from '@/components/InputError.vue';
import InputLabel from '@/components/InputLabel.vue';
import PrimaryButton from '@/components/PrimaryButton.vue';
import TextInput from '@/components/TextInput.vue';
import { Head, Link, visit } from '@laravext/vue3';
import axios from 'axios';
import { ref , reactive } from 'vue';

const data = reactive({
    email: '',
    password: '',
    remember: false,
});

const processing = ref(false);

const errors = ref({});

const submit = () => {
    processing.value = true;

    axios.post('/api/auth/login', {
            email: data.email,
            password: data.password,
            remember: data.remember,
        }).then(() => {
            visit('/dashboard');
        }).catch((error) => {
            processing.value = false;
            if (error.response.status === 422) {
                console.log(error.response.data.errors);
                errors.value = error.response.data.errors;
            } else {
                console.error(error);
            }
        }); 
};
</script>

<template>

    <Head title="Log in" />

    <div v-if="status" class="mb-4 font-medium text-sm text-green-600">
        {{ status }}
    </div>

    <form @submit.prevent="submit">
        <div>
            <InputLabel for="email" value="Email" />

            <TextInput id="email" type="email" class="mt-1 block w-full" v-model="data.email" required autofocus
                autocomplete="username" />

            <InputError class="mt-2" :message="errors.email" />
        </div>

        <div class="mt-4">
            <InputLabel for="password" value="Password" />

            <TextInput id="password" type="password" class="mt-1 block w-full" v-model="data.password" required
                autocomplete="current-password" />

            <InputError class="mt-2" :message="errors.password" />
        </div>

        <div class="block mt-4">
            <label class="flex items-center">
                <Checkbox name="remember" v-model:checked="data.remember" />
                <span class="ms-2 text-sm text-gray-600">Remember me</span>
            </label>
        </div>

        <div class="flex items-center justify-end space-x-3 mt-4">
            <Link :href="route('register')"
                class="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Need an account?
            </Link>

            <Link :href="route('forgot-password')"
                class="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Forgot your password?
            </Link>

            <PrimaryButton class="ms-4" :class="{ 'opacity-25': processing }" :disabled="processing">
                Log in
            </PrimaryButton>
        </div>
    </form>

</template>
