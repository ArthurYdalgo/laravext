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
    data: {
        name: '',
        email: '',
        message: '',
        subject: '',
    },
    errors: [],
    loading: true,
});

const submit = async () => {
    form.errors = {}

    const data = {
        name: form.data.name,
        email: form.data.email,
        message: form.data.message,
        subject: form.data.subject,
    }

    return axios.post(`/api/contact-requests`, data)
        .then(() => {
            swal('Message Sent!', 'We will get back to you soon.', 'success').then(() => {
                window.location.href = route('contact');
            });
        })
        .catch(() => {
            swal('Error!', 'An error occurred while sending the message.', 'error');
        });

};

</script>

<template>

    <Head title="Contact" />
    <div class=" min-h-[70vh] flex justify-center mt-6">
        <div class="flex flex-col justify-center">
            <div class="flex justify-center mt-6">
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

            <div class="mt-6 w-full flex justify-center items-center">
                <FormKit :actions="false" submit-label="Send" @submit="submit" type="form">
                    <div class="flex flex-col items-center">
                        <h3 class="mt-6 font-extrabold text-gray-900 dark:text-white">Or submit a message below, we'll
                            get back to you:</h3>

                        <FormKit validation-visibility="live" type="text" name="name" validation="length:2,200" required
                            id="name" outer-class="w-full" :label="$t('Name')" placeholder="Your beautiful name here"
                            v-model="form.data.name" />

                        <FormKit validation-visibility="live" type="email" name="email" validation="email" required
                            id="email" outer-class="w-full" :label="$t('Email')" placeholder="Your email here"
                            v-model="form.data.email" />

                        <FormKit validation-visibility="live" type="text" name="subject" validation="length:2,200"
                            required outer-class="w-full" id="subject" :label="$t('Subject')"
                            placeholder="Your subject here" v-model="form.data.subject" />

                        <FormKit validation-visibility="live" type="textarea" name="message" validation="length:2,5000"
                            required outer-class="w-full" id="message" :label="$t('Message')"
                            input-class="w-full max-h-[300px]" placeholder="Your message here"
                            v-model="form.data.message" />
                        
                        <FormKit type="submit" class="mt-6" />
                        
                    </div>
                </FormKit>
            </div>
        </div>
    </div>

</template>
