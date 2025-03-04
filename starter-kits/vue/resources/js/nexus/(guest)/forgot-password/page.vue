<script setup lang="ts">
import InputError from '@/components/InputError.vue';
import TextLink from '@/components/TextLink.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/AuthLayout.vue';
import { Head } from '@laravext/vue3';
import { useForm } from '@/composables/useForm';
import { LoaderCircle } from 'lucide-vue-next';
import { ref } from 'vue';
import axios from 'axios';

defineProps<{
    status?: string;
}>();

const { data, reset, processing, setProcessing, errors, setErrors, clearErrors } = useForm({
    email: '',
});

const status = ref('');

const submit = () => {
    clearErrors();
    setProcessing(true);

    axios.post('/api/forgot-password', data.value).then((response) => {
        reset();
        clearErrors();

        status.value = response.data.status;
    }).catch((error) => {
        setErrors(error.response.data.errors);
    }).finally(() => {
        setProcessing(false);
    });
};
</script>

<template>
    <AuthLayout title="Forgot password" description="Enter your email to receive a password reset link">
        <Head title="Forgot password" />

        <div v-if="status" class="mb-4 text-center text-sm font-medium text-green-600">
            {{ status }}
        </div>

        <div class="space-y-6">
            <form @submit.prevent="submit">
                <div class="grid gap-2">
                    <Label for="email">Email address</Label>
                    <Input id="email" type="email" name="email" autocomplete="off" v-model="data.email" autofocus placeholder="email@example.com" />
                    <InputError :message="errors.email" />
                </div>

                <div class="my-6 flex items-center justify-start">
                    <Button class="w-full" :disabled="processing">
                        <LoaderCircle v-if="processing" class="h-4 w-4 animate-spin" />
                        Email password reset link
                    </Button>
                </div>
            </form>

            <div class="space-x-1 text-center text-sm text-muted-foreground">
                <span>Or, return to</span>
                <TextLink :href="route('login')">log in</TextLink>
            </div>
        </div>
    </AuthLayout>
</template>
