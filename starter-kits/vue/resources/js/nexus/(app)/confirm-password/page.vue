<script setup lang="ts">
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/AuthLayout.vue';
import { Head , visit } from '@laravext/vue3';
import { LoaderCircle } from 'lucide-vue-next';
import { useForm } from '@/composables/useForm';
import axios from 'axios';
import { inject } from 'vue';
const urlIntended = inject('$urlIntended') as any;

const { data, processing, setProcessing, errors, setErrors } = useForm({
    password: '',
});

const submit = () => {
    setProcessing(true);

    axios
        .post('api/confirm-password', data.value)
        .then(() => {
            visit(urlIntended() ?? route('home'));
        })
        .catch((error) => {
            setErrors(error.response.data.errors);
        })
        .finally(() => {
            setProcessing(false);
        });
};
</script>

<template>
    <AuthLayout title="Confirm your password" description="This is a secure area of the application. Please confirm your password before continuing.">
        <Head title="Confirm password" />

        <form @submit.prevent="submit">
            <div class="space-y-6">
                <div class="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        class="mt-1 block w-full"
                        v-model="data.password"
                        required
                        autocomplete="current-password"
                        autofocus
                    />

                    <InputError :message="errors.password" />
                </div>

                <div class="flex items-center">
                    <Button class="w-full" :disabled="processing">
                        <LoaderCircle v-if="processing" class="h-4 w-4 animate-spin" />
                        Confirm Password
                    </Button>
                </div>
            </div>
        </form>
    </AuthLayout>
</template>
