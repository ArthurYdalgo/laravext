<script setup>
import DangerButton from '@/components/DangerButton.vue';
import Header from '@/components/Header.vue';
import Link from '@/components/Link.vue';
import Loading from '@/components/Loading.vue';
import PageContent from '@/components/PageContent.vue';
import PrimaryButton from '@/components/PrimaryButton.vue';
import { privacy } from '@/composables/usePrivacy';
import axios from 'axios';
import { reactive, onMounted, inject } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const swal = inject('$swal')
const routeParams = inject('$routeParams');

const team = reactive({
    data: {
    },
    loading: true,
});


const destroyResource = (id) => {
    swal({
        title: t('Are you sure?'),
        icon: 'warning',
        confirmButtonText: t('Yes, delete it!'),
        cancelButtonText: t('No, cancel!'),
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        showCancelButton: true,
        showCloseButton: true,

    })
        .then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/api/teams/${id}`)
                    .then(() => {
                        swal(t('Record deleted!'), t('The team has been deleted.'), 'success').then(() => {
                            window.location.href = '/admin/teams';
                        });
                    })
                    .catch(error => {
                        console.error(error);
                        swal(t('Error!'), t('An error occurred while deleting the team.'), 'error');
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
    <div class="mt-3 mx-4 flex justify-end space-x-2">
        <Link :href="`/admin/teams/${routeParams().team}/edit`">
        <PrimaryButton>{{ $t('Edit') }}</PrimaryButton>
        </Link>

        <DangerButton @click="destroyResource(routeParams().team)" class="hover:text-red-900">{{ $t('Delete') }}</DangerButton>
    </div>
    <Loading v-if="team.loading" />
    <PageContent v-else>
        <Link :href="`/admin/teams/${routeParams().team}/projects`" class="text-blue-600 text-xl font-bold">{{ $t('Click to view projects of Team') }} #{{
            routeParams().team }}</Link>
        <br>
        <span class="text-lg font-bold">{{$t('Name')}}: </span>{{ team.data.name }}
        <br>
        <span class="text-lg font-bold">{{ $t('Developers') }}:</span>
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            <div class="bg-white rounded-lg shadow p-4" v-for="developer in team.data.developers.sort((a, b) => a.name.localeCompare(b.name))" :key="developer.id">
                <div class="font-bold">@{{ developer.username }}</div>
                <div class="border-b-2 border-gray-200 my-2"></div>
                <div class="text-sm">{{$t('Name')}}: {{ $t(developer.name) }}</div>
                <div class="text-sm">{{$t('Role')}}: {{ $t(developer.role_label) }}</div>
                <div class="text-sm">Email: {{ privacy.active ? '***@***' : developer.email }}</div>
            </div>
        </div>

    </PageContent>
</template>