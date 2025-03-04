<script setup lang="ts">
import TextLink from '@/components/TextLink.vue';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/layouts/AuthLayout.vue';
import { Head , visit } from '@laravext/vue3';
import { LoaderCircle } from 'lucide-vue-next';
import { inject, ref } from 'vue';
import { useForm } from '@/composables/useForm';
import axios from 'axios';
const nexusProps = inject('$nexusProps') as any;

const status = ref(nexusProps().status ?? '');
const {processing, setProcessing} = useForm();

const submit = () => {
    setProcessing(true);

    axios.post('/api/email/verification-notification').then((response) => {
        status.value = response.data.status;
    }).finally(() => {
        setProcessing(false);
    });
};

const logout = (e: any) => {
    e.preventDefault();

    axios.post('/api/logout').then(() => {
        
        visit(route('home'));
    });
};

</script>

<template>
    <AuthLayout title="Verify email" description="Please verify your email address by clicking on the link we just emailed to you.">
        <Head title="Email verification" />

        <div v-if="status === 'verification-link-sent'" class="mb-4 text-center text-sm font-medium text-green-600">
            A new verification link has been sent to the email address you provided during registration.
        </div>

        <form @submit.prevent="submit" class="space-y-6 text-center">
            <Button :disabled="processing" variant="secondary">
                <LoaderCircle v-if="processing" class="h-4 w-4 animate-spin" />
                Resend verification email
            </Button>

            <span @click="logout" as="button" class="hover:decoration-current! text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out dark:decoration-neutral-500 mx-auto block text-sm"> Log out </span>
        </form>
    </AuthLayout>
</template>
