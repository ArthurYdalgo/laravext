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

const company = reactive({
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
                axios.delete(`/api/companies/${id}`)
                    .then(() => {
                        swal(t('Record deleted!'), t('The company has been deleted.'), 'success').then(() => {
                            window.location.href = '/admin/companies';
                        });
                    })
                    .catch(error => {
                        console.error(error);
                        swal(t('Error!'), t('An error occurred while deleting the company.'), 'error');
                    });
            }
        });
}

onMounted(() => {
    axios.get(`/api/companies/${routeParams().company}`)
        .then(response => {
            company.data = {
                id: response.data.id,
                name: response.data.name,
                email: response.data.email,
                website: response.data.website,
            };

            company.loading = false;
        });
});

</script>
<template>
    <Header>{{ company.loading ? $t('Loading...') : `#${company.data.id} - ${company.data.name}` }}</Header>
    <div class="mt-3 mx-4 flex justify-end space-x-2">
        <Link :href="`/admin/companies/${routeParams().company}/edit`">
            <PrimaryButton>{{ $t('Edit') }}</PrimaryButton>
        </Link>

        <DangerButton @click="destroyResource(routeParams().company)" class="hover:text-red-900">{{ $t('Delete') }}</DangerButton>
    </div>
    <Loading v-if="company.loading" />
    <PageContent v-else>
        <Link :href="`/admin/companies/${routeParams().company}/projects`" class="text-blue-600 text-xl font-bold">{{ $t('Click to view projects of Company') }} #{{
            routeParams().company }}</Link>
        <br>
        <span class="text-lg font-bold">{{$t('Name')}}: </span>{{ company.data.name }}
        <br>
        <span class="text-lg font-bold">Email: </span>{{ privacy.active ? '***@***' : company.data.email }}
        <br>
        <span class="text-lg font-bold">Website: </span><Link v-if="company.data.website" :href="company.data.website" class="text-blue-600">{{ company.data.website }}</Link>
        <span v-else class="text-gray-400">{{ $t('No website') }}</span>
    </PageContent>
</template>