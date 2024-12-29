<script setup>
import InputError from '@/components/InputError.vue';
import InputLabel from '@/components/InputLabel.vue';
import PrimaryButton from '@/components/PrimaryButton.vue';
import TextInput from '@/components/TextInput.vue';
import axios from 'axios';
import { ref, reactive } from 'vue';

defineProps(['classes'])

const passwordInput = ref(null);
const currentPasswordInput = ref(null);

const data = reactive({
    current_password: '',
    password: '',
    password_confirmation: '',
});

const errors = ref({})
const processing = ref(false);
const recentlySuccessful = ref(false);

const updatePassword = () => {
    axios.put('/api/auth/password', data)
        .then(() => {
            recentlySuccessful.value = true;
            processing.value = false;
            data.current_password = '';
            data.password = '';
            data.password_confirmation = '';

            errors.value = {};
        })
        .catch((error) => {
            if (error.response.status === 422) {
                errors.value = error.response.data.errors;
            } else {
                console.error(error);
            }
            processing.value = false;
        });
};
</script>

<template>
    <section>
        <header>
            <h2 class="text-lg font-medium text-gray-900">Update Password</h2>

            <p class="mt-1 text-sm text-gray-600">
                Ensure your account is using a long, random password to stay secure.
            </p>
        </header>

        <form @submit.prevent="updatePassword" class="mt-6 space-y-6">
            <div>
                <InputLabel for="current_password" value="Current Password" />

                <TextInput id="current_password" ref="currentPasswordInput" v-model="data.current_password"
                    type="password" class="mt-1 block w-full" autocomplete="current-password" />

                <InputError :message="errors.current_password" class="mt-2" />
            </div>

            <div>
                <InputLabel for="password" value="New Password" />

                <TextInput id="password" ref="passwordInput" v-model="data.password" type="password"
                    class="mt-1 block w-full" autocomplete="new-password" />

                <InputError :message="errors.password" class="mt-2" />
            </div>

            <div>
                <InputLabel for="password_confirmation" value="Confirm Password" />

                <TextInput id="password_confirmation" v-model="data.password_confirmation" type="password"
                    class="mt-1 block w-full" autocomplete="new-password" />

                <InputError :message="errors.password_confirmation" class="mt-2" />
            </div>

            <div class="flex items-center gap-4">
                <PrimaryButton :disabled="processing">Save</PrimaryButton>

                <Transition enter-active-class="transition ease-in-out" enter-from-class="opacity-0"
                    leave-active-class="transition ease-in-out" leave-to-class="opacity-0">
                    <p v-if="recentlySuccessful" class="text-sm text-gray-600">Saved.</p>
                </Transition>
            </div>
        </form>
    </section>
</template>
