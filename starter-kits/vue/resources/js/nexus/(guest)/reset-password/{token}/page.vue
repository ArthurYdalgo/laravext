<script setup lang="ts">
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/AuthLayout.vue';
import { Head, visit } from '@laravext/vue3';
import { LoaderCircle } from 'lucide-vue-next';
import {inject} from 'vue';
import { useForm } from '@/composables/useForm';
import axios from 'axios';
const routeParams = inject('$routeParams') as any;
const queryParams = inject('$queryParams') as any;

const { data, processing, setProcessing, errors, setErrors, reset } = useForm({
    token: routeParams().token,
    email: queryParams().email,
    password: '',
    password_confirmation: '',
});

const submit = () => {
    setProcessing(true);

    axios
        .post('/api/reset-password', data.value)
        .then((response) => {
            reset();
            setErrors({});
            visit(route("login"));
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
    <AuthLayout title="Reset password" description="Please enter your new password below">
        <Head title="Reset password" />

        <form @submit.prevent="submit">
            <div class="grid gap-6">
                <div class="grid gap-2">
                    <Label for="email">Email</Label>
                    <Input id="email" type="email" name="email" autocomplete="email" v-model="data.email" class="mt-1 block w-full" readonly />
                    <InputError :message="errors.email" class="mt-2" />
                </div>

                <div class="grid gap-2">
                    <Label for="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        name="password"
                        autocomplete="new-password"
                        v-model="data.password"
                        class="mt-1 block w-full"
                        autofocus
                        placeholder="Password"
                    />
                    <InputError :message="errors.password" />
                </div>

                <div class="grid gap-2">
                    <Label for="password_confirmation"> Confirm Password </Label>
                    <Input
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        autocomplete="new-password"
                        v-model="data.password_confirmation"
                        class="mt-1 block w-full"
                        placeholder="Confirm password"
                    />
                    <InputError :message="errors.password_confirmation" />
                </div>

                <Button type="submit" class="mt-4 w-full" :disabled="processing">
                    <LoaderCircle v-if="processing" class="h-4 w-4 animate-spin" />
                    Reset password
                </Button>
            </div>
        </form>
    </AuthLayout>
</template>
