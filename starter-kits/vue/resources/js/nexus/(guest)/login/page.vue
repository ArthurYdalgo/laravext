<script setup lang="ts">
import InputError from '@/components/InputError.vue';
import TextLink from '@/components/TextLink.vue';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@/composables/useForm';
import AuthBase from '@/layouts/AuthLayout.vue';
import { Head, visit } from '@laravext/vue3';
import axios from 'axios';
import { LoaderCircle } from 'lucide-vue-next';
import {inject} from 'vue';
const nexusProps = inject('$nexusProps') as any;

const { data , processing, setProcessing, errors, setErrors } = useForm({
    email: '',
    password: '',
    remember: false,
});

const {canResetPassword} = nexusProps();

const submit = () => {
    setProcessing(true);

    axios.post('/api/login', data.value).then((response) => {
        visit(route('dashboard'));
    }).catch((error) => {
        setErrors(error.response.data.errors);
    }).finally(() => {
        setProcessing(false);
    });

};
</script>

<template>
    <AuthBase title="Log in to your account" description="Enter your email and password below to log in">

        <Head title="Log in" />

        <form @submit.prevent="submit" class="flex flex-col gap-6">
            <div class="grid gap-6">
                <div class="grid gap-2">
                    <Label for="email">Email address</Label>
                    <Input id="email" type="email" required autofocus tabindex="1" autocomplete="email"
                        v-model="data.email" placeholder="email@example.com" />
                    <InputError :message="errors.email" />
                </div>

                <div class="grid gap-2">
                    <div class="flex items-center justify-between">
                        <Label for="password">Password</Label>
                        <TextLink v-if="canResetPassword" :href="route('forgot-password')" class="text-sm"
                            :tabindex="5"> Forgot password? </TextLink>
                    </div>
                    <Input id="password" type="password" required tabindex="2" autocomplete="current-password"
                        v-model="data.password" placeholder="Password" />
                    <InputError :message="errors.password" />
                </div>

                <div class="flex items-center justify-between" tabindex="3">
                    <Label for="remember" class="flex items-center space-x-3">
                        <Checkbox id="remember" v-model:checked="data.remember" tabindex="4" />
                        <span>Remember me</span>
                    </Label>
                </div>

                <Button type="submit" class="mt-4 w-full" tabindex="4" :disabled="processing">
                    <LoaderCircle v-if="processing" class="h-4 w-4 animate-spin" />
                    Log in
                </Button>
            </div>

            <div class="text-center text-sm text-muted-foreground">
                Don't have an account?
                <TextLink :href="route('register')" :tabindex="5">Sign up</TextLink>
            </div>
        </form>
    </AuthBase>
</template>
