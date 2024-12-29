<script setup>
import { ref, reactive } from "vue";
import InputError from "@/components/InputError.vue";
import InputLabel from "@/components/InputLabel.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";
import TextInput from "@/components/TextInput.vue";
import { Head, Link, visit } from "@laravext/vue3";
import axios from "axios";

const data = reactive({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});

const errors = ref({});

const processing = ref(false);

const submit = () => {
  processing.value = true;
  axios
    .post("/api/auth/register", data)
    .then(() => {
      visit("/dashboard");
    })
    .catch((error) => {
      processing.value = false;
      if (error.response.status === 422) {
        errors.value = error.response.data.errors;
      } else {
        console.error(error);
      }
    });
};

</script>
<template>
  <div>
    <Head title="Register" />

    <form @submit.prevent="submit">
      <div>
        <InputLabel for="name" :value="'Name'" />

        <TextInput
          id="name"
          v-model="data.name"
          class="mt-1 block w-full"
          autocomplete="name"
          :is-focused="true"
          required
        />

        <InputError :message="errors.name" class="mt-2" />
      </div>

      <div class="mt-4">
        <InputLabel for="email" :value="'Email'" />

        <TextInput
          id="email"
          type="email"
          v-model="data.email"
          class="mt-1 block w-full"
          autocomplete="username"
          required
        />

        <InputError :message="errors.email" class="mt-2" />
      </div>

      <div class="mt-4">
        <InputLabel for="password" :value="'Password'" />

        <TextInput
          id="password"
          type="password"
          v-model="data.password"
          class="mt-1 block w-full"
          autocomplete="new-password"
          required
        />

        <InputError :message="errors.password" class="mt-2" />
      </div>

      <div class="mt-4">
        <InputLabel for="password_confirmation" :value="'Confirm Password'" />

        <TextInput
          id="password_confirmation"
          type="password"
          v-model="data.password_confirmation"
          class="mt-1 block w-full"
          autocomplete="new-password"
          required
        />

        <InputError :message="errors.password_confirmation" class="mt-2" />
      </div>

      <div class="flex items-center justify-end mt-4">
        <Link
          :href="route('login')"
          class="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Already registered?
        </Link>

        <PrimaryButton :class="'ms-4'" :disabled="processing">
          Register
        </PrimaryButton>
      </div>
    </form>
  </div>
</template>


