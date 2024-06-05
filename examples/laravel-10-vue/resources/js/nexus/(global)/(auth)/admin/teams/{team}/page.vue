<script setup>
import Header from '@/components/Header.vue';
import Loading from '@/components/Loading.vue';
import PageContent from '@/components/PageContent.vue';
import { routeParams } from '@laravext/vue';
import axios from 'axios';
import { reactive, onMounted } from 'vue';

const team = reactive({
    data: {
        name: '',
    },
    loading: true,
});


onMounted(() => {
    team.loading = true;

    axios.get(`/api/teams/${routeParams().team}`)
        .then(response => {
            team.data = {
                name: response.data.name,
                developers: response.data.developers,
            };

            team.loading = false;
        });
});

</script>
<template>
    <Header>{{team.loading ? $t('Loading...') : team.data.name}}</Header>
    <Loading v-if="team.loading" />
    <PageContent v-else>
        <span>{{team.data.name}}</span>
        <br>
        <span>{{$t('Developers')}}:</span>
        <ul>
            <li v-for="developer in team.data.developers" :key="developer.id">
                - {{$t('Name: ')}} {{developer.name}}. {{$t('Email: ')}} {{developer.email}}. {{$t('Role: ')}} {{developer.role}}
            </li>
        </ul>
    </PageContent>
</template>