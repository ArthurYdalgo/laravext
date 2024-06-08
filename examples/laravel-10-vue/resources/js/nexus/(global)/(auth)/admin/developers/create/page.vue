<script setup>
import Header from '@/components/Header.vue';
import PageContent from '@/components/PageContent.vue';
import { nexusProps, } from '@laravext/vue';
import axios from 'axios';
import { reactive, inject } from 'vue';

const swal = inject('$swal')

// Reactive form state
const form = reactive({
    data: {
        name: '',
        email: '',
        role: '',
        username: '',
    },
    errors: [],
    loading: true,
});

const developerRoles = nexusProps().developer_roles;

// Update team information
const createResource = () => {
    form.errors = {};

    const data = {
        name: form.data.name,
        email: form.data.email,
        role: form.data.role,
    };

    return axios.post(`/api/developers`, data)
        .then(() => {
            swal(t('Record updated!'), 'The developer has been created.', 'success').then(() => {
                window.location.href = route('admin.developers');
            });
        })
        .catch(() => {
            swal(t('Error!'), 'An error occurred while creating the developer.', 'error');
        });
};

</script>
<template>
    <Header>{{ $t('Create developer') }}</Header>
    <PageContent >
        <FormKit :submit-label="$t('Save')" @submit="createResource" type="form">
            <div class="flex justify-start space-x-4">
                <FormKit validation-visibility="live" type="text" name="name" validation="length:2,200" required id="name"
                    :label="$t('Name')" :placeholder="`“${$t('The Beatles')}”`" v-model="form.data.name" />
                
                <FormKit validation-visibility="live" type="text" name="username" required id="username"
                    :label="$t('Username')" :placeholder="$t('cool_nickname')" v-model="form.data.username" />

                <FormKit validation-visibility="live" type="email" name="email" validation="email" required id="email"
                    :label="$t('Email')" placeholder="developer@email.com" v-model="form.data.email" />
    
                <FormKit type="select" name="role" required id="role" :label="$t('Role')" v-model="form.data.role" :options="developerRoles" />

            </div>
        </FormKit>
    </PageContent>
</template>