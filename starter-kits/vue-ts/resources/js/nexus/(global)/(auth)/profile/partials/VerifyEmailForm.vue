<script setup>
import { ref, reactive, inject } from 'vue';
import { visit } from '@laravext/vue3';
import DangerButton from '@/components/DangerButton.vue';
import InputError from '@/components/InputError.vue';
import InputLabel from '@/components/InputLabel.vue';
import Modal from '@/components/Modal.vue';
import SecondaryButton from '@/components/SecondaryButton.vue';
import TextInput from '@/components/TextInput.vue';
import axios from 'axios';
import PrimaryButton from '@/components/PrimaryButton.vue';

const processing = ref(false);
const status = ref('');

defineProps(['classes'])

const submit = (e) => {
    e.preventDefault();
    processing.value = true;

    axios.post('/api/auth/email/verification-notification').then(({ data }) => {
        processing.value = false;
        status.value = data.status;
    }).catch((error) => {
        processing.value = false;
        if (error.response.status === 422) {
            setErrors(error.response.data?.errors);
            passwordInput.current.focus();
        }
    });
};

</script>
<template>
    <section :class="`space-y-6 ${classes}`">
        <header>
            <h2 className="text-lg font-medium text-gray-900">Verify E-mail</h2>

            <p className="mt-1 text-sm text-gray-600">
                Please verify your email address by clicking the button below.
            </p>
        </header>

        <PrimaryButton :disabled="processing" @click="submit">Verify Email</PrimaryButton>

        <div v-if="status" className="font-medium text-sm text-green-600">{{ status }}</div>

    </section>
</template>