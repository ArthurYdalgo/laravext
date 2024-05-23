<script setup>
import { Head } from '@laravext/vue'
import axios from 'axios';
import { reactive, onMounted } from 'vue'

const data = reactive({
    teams: [],
    loading: true,
});

onMounted(async () => {
    axios.get('/api/teams')
        .then(response => {
            data.teams = response.data.data;
            data.loading = false;
        })
        .catch(error => {
            console.error(error);
            data.loading = false;
        });
});

</script>
<template>
    <Head title="Our Teams" />
    <div v-if="data.loading" class="flex justify-center items-center min-h-[70vh] mt-6">
        Loading...
    </div>
    <div v-else class="flex justify-center items-center min-h-[70vh]  mt-6">

        <div>
            <h3 class="text-2xl mb-2">Our teams...</h3>
            <ul>
                <li v-for="team in data.teams" :key="team.id">
                    {{ team.name }}
                </li>
            </ul>
        </div>
    </div>
</template>
