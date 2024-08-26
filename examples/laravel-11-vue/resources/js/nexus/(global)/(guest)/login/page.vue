<script setup>
import Checkbox from '@/components/Checkbox.vue';
import InputError from '@/components/InputError.vue';
import InputLabel from '@/components/InputLabel.vue';
import Link from '@/components/Link.vue';
import PrimaryButton from '@/components/PrimaryButton.vue';
import TextInput from '@/components/TextInput.vue';
import { Head } from '@laravext/vue3';
import { reactive } from 'vue'
import { visit } from '@laravext/vue3';

let form = reactive({
    email: '',
    password: '',
    remember: false,
    response: null,
    processing: false,
});

const submit = async () => {
    form.processing = true;

    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: form.email,
            password: form.password,
            remember: form.remember,
        }),
    });

    if (response.ok) {
        visit('/')
    } else {
        form.response = await response.json();
        form.processing = false;
    }
};

</script>

<template>

    <Head title="Login" />
    <div class="flex justify-center items-center min-h-[70vh]  mt-6">

        <form @submit.prevent="submit" class="w-96 ">
            <h3 class="mt-6 justify-center text-2xl font-extrabold text-gray-900 dark:text-white text-center">Login</h3>
            
            <div>
                <InputLabel for="email" :value="$t('Email')" />

                <TextInput id="email" type="email" class="mt-1 block w-full" v-model="form.email" required autofocus
                    autocomplete="username" />

                <InputError class="mt-2" :message="form.response?.errors?.email" />
            </div>

            <div class="mt-4">
                <InputLabel for="password" :value="$t('Password')" />

                <TextInput id="password" type="password" class="mt-1 block w-full" v-model="form.password" required
                    autocomplete="current-password" />

                <InputError class="mt-2" :message="form.response?.errors?.password" />
            </div>

            <div class="block mt-4">
                <label class="flex items-center">
                    <Checkbox name="remember" v-model:checked="form.remember" />
                    <span class="ms-2 text-sm text-gray-600 dark:text-gray-400">{{$t('Remember me')}}</span>
                </label>
            </div>

            <div class="flex items-center justify-end mt-4">

                <PrimaryButton class="ms-4" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                    {{$t('Login')}}
                </PrimaryButton>
            </div>
        </form>

    </div>

</template>
