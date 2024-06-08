<script setup>
import Header from '@/components/Header.vue';
import PageContent from '@/components/PageContent.vue';
import { reactive } from 'vue';

const form = reactive({
    data: {
        name: '',
    },
    errors: [],
    loading: false,
});

const createResource = () => {
    form.loading = true;
    form.errors = {};
    
    return axios.post('/api/teams', form.data)
        .then(() => {
            form.loading = false;
            location.href = '/admin/teams';
        })
        .catch(error => {
            form.loading = false;
        });
};

</script>
<template>
    <Header>{{$t('Create a team')}}</Header>
    <PageContent>
        <FormKit :submit-label="$t('Save')" @submit="createResource" type="form" >
            <FormKit validation-visibility="live" type="text" name="name" validation="length:2,200" required id="name"
                :label="$t('Name')" :placeholder="`“${$t('The Beatles')}”`" v-model="form.data.name" />

        </FormKit>
    </PageContent>
</template>