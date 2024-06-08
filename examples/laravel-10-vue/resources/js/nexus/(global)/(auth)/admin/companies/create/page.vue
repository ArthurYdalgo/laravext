<script setup>
import Header from '@/components/Header.vue';
import PageContent from '@/components/PageContent.vue';
import { reactive } from 'vue';

const form = reactive({
    data: {
        name: '',
        email: '',
        website: '',
    },
    errors: [],
    loading: false,
});

const createResource = () => {
    form.loading = true;
    form.errors = {};
    
    return axios.post('/api/companies', form.data)
        .then(() => {
            form.loading = false;
            location.href = '/admin/companies';
        })
        .catch(error => {
            form.loading = false;
        });
};

</script>
<template>
    <Header>{{$t('Create a company')}}</Header>
    <PageContent>
        <FormKit :submit-label="$t('Save')" @submit="createResource" type="form" >
            <div class="flex justify-start space-x-4">
            <FormKit validation-visibility="live" type="text" name="name" validation="length:2,200" required id="name"
                :label="$t('Name')" placeholder="Coca-Cola" v-model="form.data.name" />

            <FormKit validation-visibility="live" type="email" name="email" validation="email" required id="email"
                :label="$t('Email')" placeholder="coca.coca@email.com" v-model="form.data.email" />
            
            <FormKit validation-visibility="live" type="text" name="website" validation="length:2,200" required id="website"
                :label="$t('Website')" placeholder="https://www.coca-cola.com" v-model="form.data.website" />
            </div>
        </FormKit>
    </PageContent>
</template>