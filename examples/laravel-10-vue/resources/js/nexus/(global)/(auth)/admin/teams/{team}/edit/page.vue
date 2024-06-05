<script setup>
import Header from '@/components/Header.vue';
import Loading from '@/components/Loading.vue';
import PageContent from '@/components/PageContent.vue';
import { routeParams } from '@laravext/vue';
import axios from 'axios';
import { reactive, onMounted } from 'vue';

const form = reactive({
    data: {
        name: '',
    },
    errors: [],
    loading: true,
});

onMounted(() => {
    form.loading = true;

    axios.get(`/api/teams/${routeParams().team}`)
        .then(response => {
            form.data = {
                name: response.data.name,
            };

            form.loading = false;
        });
});

const updateResource = () => {
    form.errors = {};
    
    return axios.put(`/api/teams/${routeParams().team}`, form.data)
        .then(() => {
            location.href = '/admin/teams';
        })
        .catch(error => {
        });
};

</script>
<template>
    <Header>Create a team</Header>
    <Loading v-if="form.loading" />
    <PageContent v-else>
        <FormKit :submit-label="$t('Save')" @submit="updateResource" type="form" >
            <FormKit validation-visibility="live" type="text" name="name" validation="length:2,200" required id="name"
                :label="$t('Name')" :placeholder="`“${$t('The Beatles')}”`" v-model="form.data.name" />
        </FormKit>
    </PageContent>
</template>