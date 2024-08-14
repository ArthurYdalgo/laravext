<script setup>
import { inject } from 'vue';
import { Head } from '@laravext/vue3'
const nexusProps = inject('$nexusProps');

const {teams} = nexusProps();

</script>
<template>
    <Head title="Our Teams" />
    <div class="flex justify-center items-center min-h-[70vh]  mt-6">

        <div>
            <h3 class="text-2xl mb-2">Our teams...</h3>
            <ul>
                <li v-for="team in teams" :key="team.id">
                    {{ team.name }}
                </li>
            </ul>
        </div>
    </div>
</template>
