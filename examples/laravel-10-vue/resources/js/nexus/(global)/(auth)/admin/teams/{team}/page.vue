<script setup>
import DangerButton from '@/components/DangerButton.vue';
import Header from '@/components/Header.vue';
import Link from '@/components/Link.vue';
import Loading from '@/components/Loading.vue';
import PageContent from '@/components/PageContent.vue';
import PrimaryButton from '@/components/PrimaryButton.vue';
import { routeParams } from '@laravext/vue';
import axios from 'axios';
import { reactive, onMounted, inject } from 'vue';
const swal = inject('$swal')

const team = reactive({
    data: {
        name: '',
    },
    loading: true,
});


const destroyResource = (id) => {
    swal({
        title: 'Are you sure?',
        icon: 'warning',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        showCancelButton: true,
        showCloseButton: true,

    })
        .then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/api/teams/${id}`)
                    .then(() => {
                        swal('Deleted!', 'The team has been deleted.', 'success').then(() => {
                            window.location.href = '/admin/teams';
                        });
                    })
                    .catch(error => {
                        console.error(error);
                        swal('Error!', 'An error occurred while deleting the team.', 'error');
                    });
            }
        });
}

onMounted(() => {
    team.loading = true;

    axios.get(`/api/teams/${routeParams().team}`)
        .then(response => {
            team.data = {
                id: response.data.id,
                name: response.data.name,
                developers: response.data.developers,
            };

            team.loading = false;
        });
});

</script>
<template>
    <Header>{{ team.loading ? $t('Loading...') : `#${team.data.id} - ${team.data.name}` }}</Header>
    <div class="mt-6 mx-4 flex justify-end space-x-2">
        <Link :href="`/admin/teams/${routeParams().team}/edit`">
            <PrimaryButton>{{ $t('Edit') }}</PrimaryButton>
        </Link>

        <DangerButton @click="destroyResource(routeParams().team)" class="hover:text-red-900">Delete</DangerButton>
    </div>
    <Loading v-if="team.loading" />
    <PageContent v-else>
        <span class="text-lg font-bold">Name: </span>{{ team.data.name }}
        <br>
        <span class="text-lg font-bold">{{ $t('Developers') }}:</span>
        <ul>
            <li v-for="developer in team.data.developers" :key="developer.id">
                - {{ $t('Name: ') }} {{ developer.name }}. {{ $t('Email: ') }} {{ developer.email }}. {{ $t('Role: ') }}
                {{ developer.role }}
            </li>
        </ul>
        <br>
        <Link :href="`/admin/teams/${routeParams().team}/projects`" class="text-blue-600 text-xl font-bold">{{ $t('Click to view') }} {{ $t('projects of Team') }} #{{
            routeParams().team }}</Link>
    </PageContent>
</template>