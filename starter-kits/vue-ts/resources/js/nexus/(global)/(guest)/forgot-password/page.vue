<script setup>
import { ref, reactive } from "vue";
import InputError from "@/components/InputError.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";
import TextInput from "@/components/TextInput.vue";
import { Head, Link } from "@laravext/vue3";
import axios from "axios";

const data = reactive({
    email: "",
});

const errors = ref({
    email: '',
});

const processing = ref(false);
const status = ref("");

const submit = (e) => {
    e.preventDefault();
    processing.value = true;
    errors.value = {}

    axios
        .post("/api/auth/forgot-password", {
            email: data.email,
        })
        .then(({ data }) => {
            processing.value = false;
            status.value = data.status;
        })
        .catch((error) => {
            processing.value = false;
            if (error.response.status === 422) {
                errors.value = error.response.data.errors;
            }else{
                console.error(error);
            }
        });
};
</script>
<template>
    <Head title="Forgot Password" />

    <div className="mb-4 text-sm text-gray-600">
        Forgot your password? No problem. Just let us know your email address
        and we will email you a password reset link that will allow you to
        choose a new one.
    </div>

    <div v-if="status" className="mb-4 font-medium text-sm text-green-600">{{status}}</div>    

    <form @submit.prevent="submit">
        <TextInput
            id="email"
            type="email"
            name="email"
            class="mt-1 block w-full"
            v-model="data.email"
        />

        <InputError :message="errors.email" className="mt-2" />

        <div className="flex items-center justify-between mt-4">
            <Link
                :href="route('login')"
                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Login
            </Link>

            <PrimaryButton :disabled="processing">
                Email Password Reset Link
            </PrimaryButton>
        </div>
    </form>
</template>;
