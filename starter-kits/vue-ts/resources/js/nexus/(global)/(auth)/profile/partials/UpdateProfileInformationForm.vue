<script setup>
import InputError from "@/components/InputError.vue";
import InputLabel from "@/components/InputLabel.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";
import TextInput from "@/components/TextInput.vue";
import { reactive, ref, inject } from "vue";
import axios from "axios";
const $sharedProps = inject('$sharedProps');

defineProps(['classes'])

const { user } = $sharedProps().auth;

const data = reactive({
    name: user.name,
    email: user.email,
});

const errors = ref({
    name: "",
    email: "",
});

const processing = ref(false);
const recentlySuccessful = ref(false);

const submit = (e) => {
    e.preventDefault();
    processing.value = true;

    axios.put("/api/auth/user", data).then(() => {
        recentlySuccessful.value = true;
        processing.value = false;
        
    }).catch((error) => {
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
    <section :class="classes">
        <header>
            <h2 class="text-lg font-medium text-gray-900">
                Profile Information
            </h2>

            <p class="mt-1 text-sm text-gray-600">
                Update your account's profile information and email address.
            </p>
        </header>

        <form @submit.prevent="submit" class="mt-6 space-y-6">
            <div>
                <InputLabel htmlFor="name" value="Name" />

                <TextInput id="name" class="mt-1 block w-full" v-model="data.name"
                    required
                    isFocused
                    autoComplete="name"
                    />

                    <InputError class="mt-2" :message="errors.name" />
            </div>

            <div>
                <InputLabel htmlFor="email" value="Email" />

                <TextInput id="email" type="email" class="mt-1 block w-full" v-model="data.email" />

                    <InputError class="mt-2" :message="errors.email" />
            </div>

            <div class="flex items-center gap-4">
                <PrimaryButton :disabled="processing">Save</PrimaryButton>

                <Transition
                    enter-active-class="transition ease-in-out"
                    enter-from-class="opacity-0"
                    leave-active-class="transition ease-in-out"
                    leave-to-class="opacity-0"
                >
                    <p v-if="recentlySuccessful" class="text-sm text-gray-600">Saved.</p>
                </Transition>
            </div>
        </form>
    </section>
</template>