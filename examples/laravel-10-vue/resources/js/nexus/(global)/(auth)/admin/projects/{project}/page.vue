<script setup>
import DangerButton from '@/components/DangerButton.vue';
import Header from '@/components/Header.vue';
import Link from '@/components/Link.vue';
import Loading from '@/components/Loading.vue';
import PageContent from '@/components/PageContent.vue';
import PrimaryButton from '@/components/PrimaryButton.vue';
import { privacy } from '@/composables/usePrivacy';
import { routeParams } from '@laravext/vue';
import axios from 'axios';
import { reactive, onMounted, inject } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const swal = inject('$swal')

const project = reactive({
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
                axios.delete(`/api/projects/${id}`)
                    .then(() => {
                        swal(t('Record deleted!'), t('The projects has been deleted.'), 'success').then(() => {
                            window.location.href = '/admin/projects';
                        });
                    })
                    .catch(error => {
                        console.error(error);
                        swal(t('Error!'), t('An error occurred while deleting the project.'), 'error');
                    });
            }
        });
}

onMounted(() => {
    project.loading = true;

    axios.get(`/api/projects/${routeParams().project}`)
        .then(response => {
            project.data = {
                id: response.data.id,
                name: response.data.name,
            };

            project.loading = false;
        });
});

</script>
<template>
    <Header>{{ project.loading ? $t('Loading...') : `#${project.data.id} - ${project.data.name}` }}</Header>
    <div class="mt-3 mx-4 flex justify-end space-x-2">
        <Link :href="`/admin/projects/${routeParams().project}/edit`">
            <PrimaryButton>{{ $t('Edit') }}</PrimaryButton>
        </Link>

        <DangerButton @click="destroyResource(routeParams().project)" class="hover:text-red-900">{{ $t('Delete') }}</DangerButton>
    </div>
    <Loading v-if="project.loading" />
    <PageContent v-else>
        <span class="text-lg font-bold">{{$t('Name')}}: </span>{{ project.data.name }}
        <br>
        <span class="text-lg font-bold">Email: </span>{{ privacy.active ? '***@***' : project.data.email }}
        <br>
        <span class="text-lg font-bold">Website: </span><Link v-if="project.data.website" :href="project.data.website" class="text-blue-600">{{ project.data.website }}</Link>
        <span v-else class="text-gray-400">{{ $t('No website') }}</span>
    </PageContent>
</template>