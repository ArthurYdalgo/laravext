<script setup>
import InputLabel from '@/components/InputLabel.vue';
import PrimaryButton from '@/components/PrimaryButton.vue';
import TextArea from '@/components/TextArea.vue';
import TextInput from '@/components/TextInput.vue';
import { Head } from '@laravext/vue'
import { reactive, inject } from 'vue'
import axios from 'axios'
const swal = inject('$swal')

let form = reactive({
    name: '',
    email: '',
    message: '',
    subject: '',
    processing: false,
});

const submit = async () => {
    form.processing = true;

    try {
        axios.post('/api/contact-requests', {
            name: form.name,
            email: form.email,
            message: form.message,
            subject: form.subject,
        }).then(() => {
            swal('Message Sent!', 'We will get back to you soon.', 'success');
            form.processing = false;
        }).catch(() => {
            swal('Error!', 'An error occurred while sending the message.', 'error');
            form.processing = false;
        });
        
    } catch (error) {
        swal('Error!', 'An error occurred while sending the message.', 'error');
        form.processing = false;
    }
};

</script>

<template>

    <Head title="Contact" />
    <div class=" min-h-[70vh] flex justify-center mt-6">
        <div>


            <div class="flex justify-center    mt-6">
                Contact Us at our email

                <a href="mailto:fake@email.com"
                    class="text-blue-500 hover:text-blue-600 transition duration-300 ease-in-out mx-2">
                    fake@email.com
                </a>
                <span>|</span>
                <a href="https://twitter.com" target="_blank"
                    class="text-blue-500 hover:text-blue-600 transition duration-300 ease-in-out mx-2">
                    Twitter
                </a>
                <span>|</span>
                <a href="https://facebook.com" target="_blank"
                    class="text-blue-500 hover:text-blue-600 transition duration-300 ease-in-out mx-2">
                    Facebook
                </a>
                <span>|</span>
                <a href="https://instagram.com" target="_blank"
                    class="text-blue-500 hover:text-blue-600 transition duration-300 ease-in-out mx-2">
                    Instagram
                </a>
            </div>
            <br>

            <div class="flex justify-center mt-6">


                <form @submit.prevent="submit" class="w-96 ">
                    <h3 class="mt-6 justify-center font-extrabold text-gray-900 dark:text-white text-center">Or
                        submit a message below, we'll get back to you:</h3>
                    <div class="mt-4">
                        <InputLabel for="name" value="Name" />

                        <TextInput max="200" id="name" type="text" class="mt-1 block w-full" v-model="form.name" required
                            autofocus />

                        <InputError class="mt-2" :message="form.response?.errors?.name" />
                    </div>
                    <div class="mt-4">
                        <InputLabel for="email" value="Email" />

                        <TextInput max="200" id="email" type="email" class="mt-1 block w-full" v-model="form.email" required
                            autofocus autocomplete="username" />

                        <InputError class="mt-2" :message="form.response?.errors?.email" />
                    </div>
                    <div class="mt-4">
                        <InputLabel for="subject" value="Subject" />

                        <TextInput max="200" id="subject" type="text" class="mt-1 block w-full" v-model="form.subject" required
                            autofocus />

                        <InputError class="mt-2" :message="form.response?.errors?.subject" />
                    </div>

                    <div class="mt-4">
                        <InputLabel for="message" value="Message" />

                        <TextArea max="5000" id="message" type="text" class="mt-1 block w-full max-h-40" v-model="form.message"
                            required autocomplete="current-message" />

                        <InputError class="mt-2" :message="form.response?.errors?.password" />
                    </div>

                    <div class="flex items-center justify-end mt-4">

                        <PrimaryButton class="ms-4" :class="{ 'opacity-25': form.processing }"
                            :disabled="form.processing">
                            Send
                        </PrimaryButton>
                    </div>
                </form>

            </div>
        </div>
    </div>

</template>
